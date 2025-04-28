import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CellComponent} from '../cell/cell.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  imports: [
    CellComponent,
    NgForOf
  ],
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board!: string[];
  @Output() cellClicked = new EventEmitter<number>();

  onCellClick(index: number) {
    this.cellClicked.emit(index);
  }
}
