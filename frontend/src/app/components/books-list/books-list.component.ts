import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';

import { BookService } from '../../services/book.service';
import {Page, SortDirection} from '../../models/page';
import { Book } from '../../models/book';

@Component({
  selector: 'app-books-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  page!: number;

  constructor(
    private bookService: BookService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      this.page = +(params.get('page') ?? 1);
      if (this.page < 1) this.page = 1;

      const sort = params.get('sort') === 'asc' || params.get('sort') === 'desc';

      this.books$ = this.bookService.getBooks({pageIndex: this.page - 1, sort: sort ? 'title' : undefined, direction: sort ? <SortDirection>params.get('sort') : undefined});
    })
  }
}
