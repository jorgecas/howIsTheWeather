import { Component } from '@angular/core';

import { WeatherService } from './weather.service';
import { ApixuService } from './services/apixu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApixuService, WeatherService]
})
export class AppComponent {
  public title: string = 'How is the weather?';
  public currentYear: number;
  public currentWeather = [];
  public forecastWeather = [];

  public location;
  public locations = [];

  private timeout;
  private timeoutInterval = 1000;

  constructor(private weatherService: WeatherService) {
    this.init();
  }
  init() {
    this.currentYear = new Date().getFullYear();

    this.getCurrentWeather();
  }

  searchLocation(location) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      var searchResult = this.weatherService.searchLocation(location);
      this.locations = [];
      searchResult.subscribe(result => {
        result.forEach(r => {
          this.locations.push(r);          
        });
      })
    }, this.timeoutInterval);
  }
  getCurrentWeather(location?: string) {
    let current = this.weatherService.getCurrentWeather(location);
    current.subscribe(result => {
      this.currentWeather = [];
      this.currentWeather.push(result)
    });
  }
  getForecastWeather(location?: string) {
    let forecast = this.weatherService.getForecast(location);
    forecast.subscribe(result => {
      this.forecastWeather = [];
      this.forecastWeather.push(result)
    });
  }
}
