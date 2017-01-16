import { Injectable } from '@angular/core';

@Injectable()
export class ApixuService {
  private key: string;
  private formats;
  private protocols;
  private url: string;
  public query: string;

  constructor(options = {format: 'json', protocol: 'https'}) { 
  	this.key = 'a885581ca7e4469faa8221724171501';
  	this.formats = {json: 'json', xml: 'xml'};
  	this.protocols = {http: 'http', https: 'https'};
  	this.query = '';
  	
  	let {format, protocol} = options;

  	this.url = `${this.protocols[protocol]}://api.apixu.com/v1/current.${this.formats[format]}?key={this.key}&q=${this.query}`;
  }

  getForecastByCoordinates(coordinates = {lat: 0.0, long: 0.0}) {
  	return Promise.resolve('Hello');
  }
  getForecastByAddress(address = {}){

  }
}
