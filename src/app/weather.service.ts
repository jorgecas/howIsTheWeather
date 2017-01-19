import { Injectable } from '@angular/core';

import { ApixuService } from './services/apixu.service';

@Injectable()
export class WeatherService {
  
  constructor(private apixuService: ApixuService) {
    
   }

  getCurrentWeather(query?: string) {
    return this.apixuService.getCurrent(query);
  }
  getForecast(query?: string) {
    return this.apixuService.getForecast(query);
  }
}
