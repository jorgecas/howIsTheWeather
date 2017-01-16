import { Injectable } from '@angular/core';

import { ApixuService } from './services/apixu.service';

@Injectable(providers: const [ApixuService])
export class WeatherService {

  constructor(private apixuService: ApixuService) { }

  getForecastByCoordinates(coordinates = {lat: 0.0, long: 0.0}) {
  	return this.apixuService.getForecastByCoordinates().then(r => console.log(r));
  }
  getForecastByAddress(address = {}){

  }
}
