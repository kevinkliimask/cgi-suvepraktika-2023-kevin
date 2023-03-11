import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination[currentIndex][minIndex][maxIndex]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentIndex!: number;
  @Input() minIndex!: number;
  @Input() maxIndex!: number;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  changePage(count: number): void {
    this.pageChanged.emit(count);
  }
}
