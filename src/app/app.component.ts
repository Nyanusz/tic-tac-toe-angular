import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GameComponent} from './game/game.component';
import {BoardComponent} from './board/board.component';
import {CellComponent} from './cell/cell.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameComponent, BoardComponent, CellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tic-tac-toe-angular';
}
