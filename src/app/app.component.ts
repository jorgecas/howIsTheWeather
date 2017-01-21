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
  public title: string;
  public currentYear: number;
  public currentWeather;
  public forecastWeather;
  constructor(private weatherService: WeatherService) {
    this.init();
  }
  init() {
    this.title = 'How is the weather?'
    this.currentWeather = [];
    this.forecastWeather = [];
    this.currentYear = new Date().getFullYear();
    let current = this.weatherService.getCurrentWeather();
    let forecast = this.weatherService.getForecast();

    current.subscribe(result => this.currentWeather.push(result));

    forecast.subscribe(result => {
      debugger;
      this.forecastWeather.push(result)
    });
  }
}
