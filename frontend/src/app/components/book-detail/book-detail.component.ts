import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl({ value: '', disabled: true }),
    author: new FormControl({ value: '', disabled: true }),
    genre: new FormControl({ value: '', disabled: true }),
    year: new FormControl({ value: '', disabled: true }),
    added: new FormControl({ value: '', disabled: true }),
    checkoutCount: new FormControl({ value: '', disabled: true }),
    status: new FormControl({ value: '', disabled: true }),
    dueDate: new FormControl({ value: '', disabled: true }),
    comment: new FormControl({ value: '', disabled: true }),
  });

  book!: Book;
  editing = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(map((params) => params['id']))
      .pipe(
        switchMap((id) => this.bookService.getBook(id)),
        take(1)
      )
      .subscribe((book) => {
        this.book = book;
        this.initializeBookData();
      });
  }

  onSubmit(): void {
    this.toggleEditing();

    const { title, author, genre, year, comment, ...unchangedValues } =
      this.book;
    const body = <Book>{
      ...unchangedValues,
      title: this.form.value.title,
      author: this.form.value.author,
      genre: this.form.value.genre,
      year: this.form.value.year ? +this.form.value.year : null,
      comment: this.form.value.comment,
    };
    this.bookService.saveBook(body).subscribe();
  }

  toggleEditing(): void {
    this.editing = !this.editing;

    if (this.editing) {
      this.form.controls.title.enable();
      this.form.controls.author.enable();
      this.form.controls.genre.enable();
      this.form.controls.year.enable();
      this.form.controls.comment.enable();
    } else {
      this.form.controls.title.disable();
      this.form.controls.author.disable();
      this.form.controls.genre.disable();
      this.form.controls.year.disable();
      this.form.controls.comment.disable();
    }
  }

  private initializeBookData(): void {
    this.form.setValue({
      title: this.book.title ?? '',
      author: this.book.author ?? '',
      genre: this.book.genre ?? '',
      year: this.book.year.toString() ?? '',
      added: this.book.added ?? '',
      checkoutCount: this.book.checkOutCount.toString() ?? '',
      status: this.book.status ?? '',
      dueDate: this.book.dueDate ?? '',
      comment: this.book.comment ?? '',
    });
  }
}
