import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination[currentPage][totalPages]',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
}
