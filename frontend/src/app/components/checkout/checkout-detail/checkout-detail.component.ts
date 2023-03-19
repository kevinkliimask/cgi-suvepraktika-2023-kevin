import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';

import { Checkout } from '../../../models/checkout';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss'],
})
export class CheckoutDetailComponent implements OnInit {
  form = new FormGroup({
    borrowerFirstName: new FormControl({ value: '', disabled: true }),
    borrowerLastName: new FormControl({ value: '', disabled: true }),
    borrowedBookTitle: new FormControl({ value: '', disabled: true }),
    checkedOutDate: new FormControl({ value: '', disabled: true }),
    dueDate: new FormControl({ value: '', disabled: true }),
  });

  checkout!: Checkout;

  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.checkoutService.getCheckout(id))
      )
      .subscribe((checkout) => {
        this.checkout = checkout;
        this.initializeCheckoutData();
      });
  }

  private initializeCheckoutData(): void {
    this.form.setValue({
      borrowerFirstName: this.checkout.borrowerFirstName,
      borrowerLastName: this.checkout.borrowerLastName,
      borrowedBookTitle: this.checkout.borrowedBook.title,
      checkedOutDate: this.checkout.checkedOutDate.toString(),
      dueDate: this.checkout.dueDate.toString(),
    });
  }
}
