import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PaymentInfo} from "../entities/payment-info";


@Injectable({
  providedIn: 'root'
})
export class PaymentIntentService {

  private httpClient : HttpClient

  private readonly baseUrl = environment.apiUri;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getPaymentIntent(paymentInfo : PaymentInfo): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/payment/intent`, paymentInfo);
  }
}
