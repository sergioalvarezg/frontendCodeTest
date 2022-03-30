import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Ball } from 'src/app/models/ball-model';
import { Bet } from 'src/app/models/bet-model';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  showResult: boolean = false;
  ballList!: Array<Ball>;
  resultBall!: Ball;
  resultText: string = "";
  resultAmount!: number;
  result!: boolean;

  @Input() ballSelected: Subject<Ball>;
  @Input() clearSelection: Subject<any>;
  @Input() placeBetResult: Subject<Bet>;

  constructor() { 
    this.ballSelected = new Subject<Ball>();
    this.clearSelection = new Subject<any>();
    this.placeBetResult = new Subject<Bet>();
  }

  ngOnInit() {

    this.generateBalls();

    this.placeBetResult.subscribe(resp => {
      if (resp != null && resp != undefined) {
        this.showResult = true;
        this.resultBall = resp.ball;
        this.resultText = resp.result ? "You Won!" : "You Lost!";
        this.resultAmount = resp.amount;
        this.result = resp.result;
      }
    });
  }

  generateBalls() {
    this.ballList = new Array<Ball>();
    for (let index = 1; index < 11; index++) {
      let ball = new Ball(index.toString(), 'color_' + index);
      this.ballList.push(ball);
    }
  }

  ballClick(ball: Ball) {
    this.ballSelected.next(ball);
  }

  clear() {
    this.clearSelection.next(true);
  }

  playAgain() {
    this.showResult = false;
    this.clear();
  }

}
