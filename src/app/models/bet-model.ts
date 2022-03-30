import { Ball } from "./ball-model";

export class Bet {
    ball: Ball
    amount: number;
    result: boolean;

    constructor(ball: Ball, amount: number, result: boolean) {
        this.ball = ball;
        this.amount = amount;
        this.result = result;
    }
}