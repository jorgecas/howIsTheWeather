/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForecastioService } from './forecastio.service';

describe('ForecastioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForecastioService]
    });
  });

  it('should ...', inject([ForecastioService], (service: ForecastioService) => {
    expect(service).toBeTruthy();
  }));
});
