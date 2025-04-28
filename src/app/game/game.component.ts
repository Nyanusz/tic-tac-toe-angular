import { Component } from '@angular/core';
import {BoardComponent} from '../board/board.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  imports: [
    BoardComponent,
    NgIf
  ],
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  board: string[] = Array(9).fill('');
  playerSymbol: string = 'X';
  aiSymbol: string = 'O';
  currentPlayer: 'player' | 'ai' = 'player';
  winner: string | null = null;
  gameStarted = false;

  chooseSymbol(symbol: 'X' | 'O') {
    this.playerSymbol = symbol;
    this.aiSymbol = symbol === 'X' ? 'O' : 'X';
    this.resetGame();
    this.gameStarted = true;
  }

  makeMove(index: number) {
    if (!this.board[index] && !this.winner && this.currentPlayer === 'player') {
      this.board[index] = this.playerSymbol;
      if (this.checkWinner(this.playerSymbol)) {
        this.winner = 'Te nyertél!';
      } else if (this.board.every(cell => cell)) {
        this.winner = 'Döntetlen!';
      } else {
        this.currentPlayer = 'ai';
        setTimeout(() => this.aiMove(), 500);
      }
    }
  }

  aiMove() {
    const emptyIndices = this.board
      .map((cell, i) => cell === '' ? i : -1)
      .filter(i => i !== -1);

    if (emptyIndices.length > 0 && !this.winner) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      this.board[randomIndex] = this.aiSymbol;

      if (this.checkWinner(this.aiSymbol)) {
        this.winner = 'A gép nyert!';
      } else if (this.board.every(cell => cell)) {
        this.winner = 'Döntetlen!';
      } else {
        this.currentPlayer = 'player';
      }
    }
  }

  checkWinner(symbol: string): boolean {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return lines.some(([a, b, c]) =>
      this.board[a] === symbol && this.board[b] === symbol && this.board[c] === symbol
    );
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.winner = null;
    this.currentPlayer = 'player';
  }
}
