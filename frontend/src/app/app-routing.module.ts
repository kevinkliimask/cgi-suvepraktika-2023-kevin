import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CheckoutsListComponent } from './components/checkouts-list/checkouts-list.component';
import { BookCheckoutComponent } from './components/book-checkout/book-checkout.component';
import { CheckoutDetailComponent } from './components/checkout-detail/checkout-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksListComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'books/:id/checkout', component: BookCheckoutComponent },
  { path: 'checkouts', component: CheckoutsListComponent },
  { path: 'checkouts/:id', component: CheckoutDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
