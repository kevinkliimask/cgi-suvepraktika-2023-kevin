import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookCheckoutComponent } from './components/book/book-checkout/book-checkout.component';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { BooksListComponent } from './components/book/books-list/books-list.component';
import { CheckoutDetailComponent } from './components/checkout/checkout-detail/checkout-detail.component';
import { CheckoutsListComponent } from './components/checkout/checkouts-list/checkouts-list.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { MaterialModule } from './material/material.module';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { SortComponent } from './components/shared/sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    BookCheckoutComponent,
    BookDetailComponent,
    BooksListComponent,
    CheckoutDetailComponent,
    CheckoutsListComponent,
    FilterComponent,
    PaginationComponent,
    SearchBarComponent,
    SortComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
