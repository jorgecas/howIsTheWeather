import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Formats, Protocols, UnitSystems, Requests } from '../enums';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApixuService {
  private name: string;
  private key: string;

  private format: string;
  private protocol: string;
  private url: string;
  private defaultQuery: string;
  private unitSystem: string;

  constructor(private http: Http) {
    this.name = 'Apixu';
    this.key = 'a885581ca7e4469faa8221724171501';
  	this.defaultQuery = 'auto:ip';
    this.format = Formats[Formats.json];
    this.unitSystem = UnitSystems[UnitSystems.metric];
    this.protocol = Protocols[Protocols.https];
  }

  private getUrl(query = this.defaultQuery, request = Requests[Requests.current], format = this.format, protocol = this.protocol) {
    return `${protocol}://api.apixu.com/v1/${request}.${format}?key=${this.key}&q=${query}`
  }

  setProtocol(protocol = Protocols[Protocols.https]) {
    this.protocol = protocol;
  }

  setResponseFormat(format = Formats[Formats.json]) {
    this.format = format;
  }

  getCurrent(query = this.defaultQuery): Observable<Response> {
    let url = this.getUrl(query);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);
  }

  getForecast(query = this.defaultQuery): Observable<Response> {
    let url = this.getUrl(query, Requests[Requests.forecast]);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);

  }

  handleResponse(value: Response ){
    return value.json()
  }

  handleError(error:any) {
    return Observable.throw(error.json().error || `There was an error fetching data from ${this.name} service`);
  }
}