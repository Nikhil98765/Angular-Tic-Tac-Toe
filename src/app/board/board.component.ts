import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  public squares: string[];
  public winner: string;
  public isNext: boolean;
  public gameEnds: boolean;

  constructor() {
    this.startNewGame();
  }

  startNewGame(): void {
    this.squares = Array(9).fill(null);
    this.winner='';
    this.isNext = true;
    this.gameEnds = false;
  }

  get currentPlayer() {
    return this.isNext ? 'O': 'X';
  }

  onSelectSquare(sqId: number): void {
    if(!this.squares[sqId]) {
      this.squares.splice(sqId, 1, this.currentPlayer);
      this.isNext = !this.isNext;
      this.winner = this.checkWinner();
      this.gameEnds = !this.winner && !this.squares.includes(null);
    }
  }

  checkWinner(): string {
    const winStreak = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let line of winStreak) {
      let [a, b, c] = line;
      if((this.squares[a] === this.squares[b]) && (this.squares[b] === this.squares[c])) {
        return this.squares[a];
      }
    }
  }
}
