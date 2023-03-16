import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Page, PageRequest } from '../models/page';
import { Book } from '../models/book';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly baseUrl = environment.backendUrl + '/api/book';

  constructor(private http: HttpClient) {}

  getBooks(filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooks';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Book>>(url, { params });
  }

  getBook(bookId: string): Observable<Book> {
    const url = this.baseUrl + '/getBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>(url, { params });
  }

  saveBook(book: Book): Observable<string> {
    const url = this.baseUrl + '/saveBook';
    return this.http.post(url, book, { responseType: 'text' });
  }

  deleteBook(bookId: string): Observable<void> {
    const url = this.baseUrl + '/deleteBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete<void>(url, { params });
  }
}
