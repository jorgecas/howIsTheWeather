import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Formats, Protocols, UnitSystems, Requests } from '../enums';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApixuService {
  private name: string = 'Apixu';
  private key: string = 'a885581ca7e4469faa8221724171501';

  private url: string;
  private defaultQuery: string;
  private unitSystem: string;

  constructor(private http: Http) {
  	this.defaultQuery = 'auto:ip';
    this.unitSystem = UnitSystems[UnitSystems.metric];
  }

  private getUrl(query = this.defaultQuery, request = Requests[Requests.current], format = Formats[Formats.json], protocol = Protocols[Protocols.https]) {
    return `${protocol}://api.apixu.com/v1/${request}.${format}?key=${this.key}&q=${query}`;
  }

  getCurrent(query = this.defaultQuery): Observable<any> {
    let url = this.getUrl(query);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);
  }

  getForecast(query = this.defaultQuery): Observable<any> {
    let url = this.getUrl(query, Requests[Requests.forecast]);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);

  }

  searchLocation(query = this.defaultQuery): Observable<any> {
    let url = this.getUrl(query, Requests[Requests.search]);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);
  }

  private handleResponse(value: Response ){
    return value.json();
  }

  private handleError(error:any) {
    return Observable.throw(error.json().error || `There was an error fetching data from ${this.name} service`);
  }
}