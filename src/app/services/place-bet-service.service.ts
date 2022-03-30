import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceBetServiceService {

constructor() { }
  getRandomNumber():BehaviorSubject<number> {
    return new BehaviorSubject(Math.floor(Math.random() * (10 - 1 + 1) + 1));
  }
}
