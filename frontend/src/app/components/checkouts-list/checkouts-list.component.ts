import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Page, SortDirection } from '../../models/page';
import { Checkout } from '../../models/checkout';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkouts-list',
  templateUrl: './checkouts-list.component.html',
  styleUrls: ['./checkouts-list.component.scss'],
})
export class CheckoutsListComponent {
  checkouts$!: Observable<Page<Checkout>>;
  page!: number;

  constructor(
    private checkoutService: CheckoutService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      this.page = +(params.get('page') ?? 1);
      if (this.page < 1) this.page = 1;

      const sort =
        params.get('sort') === 'asc' || params.get('sort') === 'desc';

      this.checkouts$ = this.checkoutService.getCheckouts({
        pageIndex: this.page - 1,
        sort: sort ? 'borrowedBook.title' : undefined,
        direction: sort ? <SortDirection>params.get('sort') : undefined,
      });
    });
  }
}
