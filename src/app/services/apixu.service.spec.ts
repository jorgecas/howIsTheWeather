/* tslint:disable:no-unused-variable */

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TestBed, async, inject } from '@angular/core/testing';
import { ApixuService } from './apixu.service';

describe('ApixuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApixuService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }]
    });
  });

  it('should provide a getCurrent method', inject([ApixuService], (service: ApixuService) => {
    expect(service.getCurrent).toBeTruthy();
  }));

  it('should provide a getForecast method', inject([ApixuService], (service: ApixuService) => {
    expect(service.getForecast).toBeTruthy();
  }));

  it('should provide a searchLocation method', inject([ApixuService], (service: ApixuService) => {
    expect(service.searchLocation).toBeTruthy();
  }));

  it('should return a default current weather status if no query is provided', inject([ApixuService], (service: ApixuService) => {
    let result = service.getCurrent();
    
  }));
});
