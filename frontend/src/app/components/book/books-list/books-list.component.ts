import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { Page, SortDirection } from '../../../models/page';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books$!: Observable<Page<Book>>;
  page!: number;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.page = +(params.get('page') ?? 1);
      if (this.page < 1) this.page = 1;

      const sort =
        params.get('sort') === 'asc' || params.get('sort') === 'desc';

      this.books$ = this.bookService.getBooks({
        pageIndex: this.page - 1,
        sort: sort ? 'title' : undefined,
        direction: sort ? <SortDirection>params.get('sort') : undefined,
        searchQuery: params.get('search_query') ?? undefined,
      });
    });
  }
}
