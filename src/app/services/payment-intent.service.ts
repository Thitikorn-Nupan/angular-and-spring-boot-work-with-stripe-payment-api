import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {PaymentInfo} from "../entities/payment-info";


@Injectable({
  providedIn: 'root'
})
export class PaymentIntentService {
  private readonly httpClient: HttpClient
  private readonly basePath = environment.basePath;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public getPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<any>(`${this.basePath}/payment/intent`, paymentInfo);
  }
}
