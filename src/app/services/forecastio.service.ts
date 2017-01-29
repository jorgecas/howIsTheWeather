import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { Formats, Protocols, UnitSystems, Requests } from '../enums';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ForecastIoService {
  private name: string = 'Forecast.io';
  private key: string = '190d407798689ca273761f908a46c40d';

  private format: string;
  private protocol: string;
  private url: string;
  private defaultQuery: string;
  private unitSystem: string;

  constructor(private http: Http) {
  	this.defaultQuery = '-32.8894587,-68.84583859999998';
    this.unitSystem = UnitSystems[UnitSystems.metric];
  }

  private getUrl(query = this.defaultQuery, exclude?: string, request = Requests[Requests.forecast], format = Formats[Formats.json], protocol = Protocols[Protocols.https]) {
    return `${protocol}://api.darksky.net/${request}/${this.key}/${query}`;
    //https://api.darksky.net/forecast/190d407798689ca273761f908a46c40d/37.8267,-122.4233
  }

  setProtocol(protocol = Protocols[Protocols.https]) {
    this.protocol = protocol;
  }

  setResponseFormat(format = Formats[Formats.json]) {
    this.format = format;
  }

  getCurrent(query = this.defaultQuery): Observable<any> {
    let url = this.getUrl(query, 'daily');
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