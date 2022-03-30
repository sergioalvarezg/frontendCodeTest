import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ball } from 'src/app/models/ball-model';
import { Bet } from 'src/app/models/bet-model';
import { PlaceBetServiceService } from 'src/app/services/place-bet-service.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  betBalls!: Array<Ball>;
  ballCount = 0;
  total = 0;
  betForm!: FormGroup;
  disablePlaceBet: boolean = true;
  disablePlaceAmount: boolean = true;

  @Input() ballSelected: Subject<Ball>;
  @Input() clearSelection: Subject<any>;
  @Input() placeBetResult: Subject<Bet>;

  constructor(
    // private fb: FormBuilder,
    private placeBetServiceService: PlaceBetServiceService
  ) {

    this.ballSelected = new Subject<Ball>();
    this.clearSelection = new Subject<any>();
    this.placeBetResult = new Subject<Bet>();
   }

  ngOnInit() {
    // this.betForm = this.fb.group({
    //   amount: [null, Validators.required]
    // });
    this.betForm = new FormGroup({
      amount: new FormControl({value: null, Validators: Validators.required})
    })
    this.generateBetBalls();
    this.ballSelected.subscribe(b => {
      this.handleSelectedBalls(b);
    });
    this.clearSelection.subscribe(c => {
      this.handleClearSelection();
    })
  }

  generateBetBalls() {
    this.betBalls = new Array<Ball>();
    for (let index = 1; index < 9; index++) {
      let ball = new Ball("", 'color_0');
      this.betBalls.push(ball);
    }
  }

  getTotal() {
    if(this.betForm.status != "INVALID") {
      if (this.betForm.get("amount")?.value >= 5) {
        this.total = this.betForm.get("amount")?.value * this.ballCount;
        this.disablePlaceBet = false;
      } else {
        this.betForm.get("amount")?.setErrors({invalidAmount: true});
      }
    } 
  }

  handleSelectedBalls(selectedBall: Ball) {
    if (this.betBalls.find(b => b.Number == selectedBall.Number) == undefined && this.ballCount < 8) {
      let firstEmptyIndex = this.betBalls.indexOf(this.betBalls.filter(b => b.Number == "")[0]);
      if(firstEmptyIndex !== undefined && firstEmptyIndex !== null) {
        this.betBalls[firstEmptyIndex] = selectedBall;
        this.ballCount++;
        this.disablePlaceAmount = false;
      }
    }
  }

  handleClearSelection() {
    this.generateBetBalls();
    this.ballCount = 0;
    this.total = 0;
    this.betForm.get("amount")?.setValue("");
    this.betForm.get("amount")?.setErrors(null);
    this.disablePlaceBet = true;
    this.disablePlaceAmount = true;
  }

  placeBet() {
    if (this.total != 0) {
      this.placeBetServiceService.getRandomNumber().subscribe(resp => {
        if (resp != 0) {
          let ballResult = new Ball(resp.toString(), 'color_' + resp);
          let amountResult = this.total * 1.5;
          let result = this.betBalls.find(b => b.Number === resp.toString()) != undefined;
          let betResult = new Bet(ballResult, amountResult, result);
          
          this.disablePlaceBet = true;
          this.disablePlaceAmount = true;
          
          this.placeBetResult.next(betResult);
        }
      });
    }
  }

}
