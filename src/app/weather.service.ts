import { Injectable } from '@angular/core';

import { ApixuService } from './services/apixu.service';
import { ForecastIoService } from './services/forecastio.service';

@Injectable()
export class WeatherService {
  private selectedService: any;
  constructor(private apixuService: ApixuService, private forecastIoService: ForecastIoService) {
    this.selectedService = forecastIoService;
   }

  getCurrentWeather(query?: string) {
    return this.selectedService.getCurrent(query);
  }
  getForecast(query?: string) {
    return this.selectedService.getForecast(query);
  }

  searchLocation(query?: string) {
    return this.selectedService.searchLocation(query);
  }
}
