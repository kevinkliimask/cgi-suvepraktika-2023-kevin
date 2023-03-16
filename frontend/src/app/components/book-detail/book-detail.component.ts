import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    author: new FormControl({ value: '', disabled: true }),
    year: new FormControl({ value: '', disabled: true }),
    genre: new FormControl({ value: '', disabled: true }),
    status: new FormControl({ value: '', disabled: true }),
    checkoutCount: new FormControl({ value: '', disabled: true }),
    dueDate: new FormControl({ value: '', disabled: true }),
    comment: new FormControl({ value: '', disabled: true }),
    added: new FormControl({ value: '', disabled: true }),
  });

  editing = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(map((params) => params['id']))
      .pipe(
        switchMap((id) => this.bookService.getBook(id)),
        take(1)
      )
      .subscribe((book) => this.initializeBookData(book));
  }

  toggleEditing(): void {
    if (this.form.controls.title.disabled) this.form.enable();
    else this.form.disable();
    this.editing = !this.editing;
  }

  private initializeBookData(book: Book): void {
    this.form.setValue({
      title: book.title ?? '',
      author: book.author ?? '',
      year: book.year.toString() ?? '',
      genre: book.genre ?? '',
      status: book.status ?? '',
      checkoutCount: book.checkOutCount.toString() ?? '',
      dueDate: book.dueDate ?? '',
      comment: book.comment ?? '',
      added: book.added ?? '',
    });
  }
}
