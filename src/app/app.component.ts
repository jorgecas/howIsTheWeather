import { Component } from '@angular/core';

import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService]
})
export class AppComponent {
  public title: string;
  constructor(private weatherService: WeatherService) {
    console.log(`I'm on the constructor`);
    this.init();
  }
  init() {
    console.log(`i'm on init method`);
    this.weatherService.getForecast().then(result => {
      console.log(result);
      this.title = result.forecast;
    });
  }
}
