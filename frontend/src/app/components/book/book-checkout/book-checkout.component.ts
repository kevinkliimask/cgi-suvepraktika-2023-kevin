import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'app-book-checkout',
  templateUrl: './book-checkout.component.html',
  styleUrls: ['./book-checkout.component.scss'],
})
export class BookCheckoutComponent implements OnInit {
  form = new FormGroup({
    borrowerFirstName: new FormControl('', Validators.required),
    borrowerLastName: new FormControl('', Validators.required),
  });

  bookId!: string;

  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe()
      .subscribe((params) => (this.bookId = params['id']));
  }

  async onSubmit(): Promise<void> {
    this.checkoutService
      .checkout({
        borrowerFirstName: this.form.value.borrowerFirstName!,
        borrowerLastName: this.form.value.borrowerLastName!,
        borrowedBookId: this.bookId,
      })
      .subscribe(() => this.router.navigateByUrl('/'));
  }
}
