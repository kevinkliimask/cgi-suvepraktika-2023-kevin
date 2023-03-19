import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';

import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-detail',
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
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getBook();
  }

  onSubmit(): void {
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
    this.bookService.saveBook(body).subscribe(() => this.getBook());
    this.toggleEditing();
  }

  async deleteBook(): Promise<void> {
    this.bookService.deleteBook(this.book.id).subscribe();
    await this.router.navigateByUrl('/');
  }

  toggleEditing(): void {
    this.editing = !this.editing;
    const affectedControls = ['title', 'author', 'genre', 'year', 'comment'];

    affectedControls.forEach((control) =>
      this.editing
        ? this.form.get(control)!.enable()
        : this.form.get(control)!.disable()
    );

    this.initializeBookData();
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

  private getBook(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.bookService.getBook(id))
      )
      .subscribe((book) => {
        this.book = book;
        this.initializeBookData();
      });
  }
}
