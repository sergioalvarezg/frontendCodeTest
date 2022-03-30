import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Ball } from './models/ball-model';
import { Bet } from './models/bet-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendCodeTest';
  ballSelected = new Subject<Ball>();
  clearSelection = new Subject<any>();
  placeBetResult = new Subject<Bet>();
  
  handleBallSelected = (ball: Ball) => {
    this.ballSelected.next(ball);
  };

}
