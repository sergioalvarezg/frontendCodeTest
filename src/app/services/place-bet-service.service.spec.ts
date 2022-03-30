/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaceBetServiceService } from './place-bet-service.service';

describe('Service: PlaceBetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceBetServiceService]
    });
  });

  it('should ...', inject([PlaceBetServiceService], (service: PlaceBetServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should be more than 0', inject([PlaceBetServiceService], (service: PlaceBetServiceService) => {
    expect(service.getRandomNumber().getValue() > 0).toBeTrue();
  }));

  it('should be less than 11', inject([PlaceBetServiceService], (service: PlaceBetServiceService) => {
    expect(service.getRandomNumber().getValue()).toBeLessThan(11);
  }));

});
