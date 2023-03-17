import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Page, PageRequest } from '../models/page';
import { RestUtil } from './rest-util';
import { Checkout } from '../models/checkout';
import { environment } from '../../environments/environment';
import { CreateCheckout } from '../models/create-checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(private http: HttpClient) {}

  getCheckouts(filter: Partial<PageRequest>): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Checkout>>(url, { params });
  }

  getCheckout(checkoutId: string): Observable<Checkout> {
    const url = this.baseUrl + '/getCheckout';
    const params = new HttpParams().set('checkOutId', checkoutId);
    return this.http.get<Checkout>(url, { params });
  }

  checkout(checkout: CreateCheckout): Observable<void> {
    const url = this.baseUrl + '/checkout';
    return this.http.post<void>(url, checkout);
  }
}
