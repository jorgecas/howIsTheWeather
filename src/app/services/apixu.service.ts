import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApixuService {
  private name: string;
  private key: string;
  private requests;
  private formats;
  private format;
  private protocols;
  private protocol;
  private url: string;
  public query: string;

  constructor(private http: Http) {
    this.name = 'Apixu Service';
    this.key = 'a885581ca7e4469faa8221724171501';
  	this.formats = {json: 'json', xml: 'xml'};
  	this.protocols = {http: 'http', https: 'https'};
    this.requests = {current: 'current', forecast: 'forecast', search: 'search', history: 'history'};
  	this.query = 'auto:ip';

  }

  getUrl(query = this.query, request = this.requests.current, format = this.formats.json, protocol = this.protocols.http) {
    return `${protocol}://api.apixu.com/v1/${request}.${format}?key=${this.key}&q=${query}`
  }

  setProtocol(protocol = 'http') {
    this.protocol = this.protocols.prototype.hasOwnProperty(protocol) && this.protocols[protocol];
  }
  setResponseFormat(format = 'json') {
    this.format = this.formats.prototype.hasOwnProperty(format) && this.formats[format];
  }

  getCurrent(query = 'auto:ip'): Observable<Response> {
    let url = this.getUrl(query);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);
  }

  getForecast(query = 'auto:ip'): Observable<Response> {
    let url = this.getUrl(query, this.requests.forecast);
    return this.http.get(url)
                    .map(this.handleResponse)
                    .catch(this.handleError);

  }

  handleResponse(value: Response ){
    return value.json()
  }

  handleError(error:any) {
    return Observable.throw(error.json().error || `There was an error fetching data from ${this.name}`);
  }
}