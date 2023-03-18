import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BooksListComponent } from './components/book/books-list/books-list.component';
import { BookDetailComponent } from './components/book/book-detail/book-detail.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { SortComponent } from './components/shared/sort/sort.component';
import { CheckoutsListComponent } from './components/checkout/checkouts-list/checkouts-list.component';
import { BookCheckoutComponent } from './components/book/book-checkout/book-checkout.component';
import { CheckoutDetailComponent } from './components/checkout/checkout-detail/checkout-detail.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';

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
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
