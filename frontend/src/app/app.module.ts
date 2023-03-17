import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SortComponent } from './components/sort/sort.component';
import { CheckoutsListComponent } from './components/checkouts-list/checkouts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookCheckoutComponent } from './components/book-checkout/book-checkout.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    PaginationComponent,
    SortComponent,
    CheckoutsListComponent,
    BookCheckoutComponent,
    CheckoutDetailComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
