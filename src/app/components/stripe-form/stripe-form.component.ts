import {Component, OnInit} from '@angular/core';
import {loadStripe, PaymentIntentResult, Stripe, StripeCardElement, StripeCardElementOptions} from "@stripe/stripe-js";
import {PaymentInfo} from "../../entities/payment-info";
import {PaymentIntentService} from "../../services/payment-intent.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrl: './stripe-form.component.css'
})
export class StripeFormComponent implements OnInit {

  private declare cardElement: StripeCardElement;
  private stripePromise: Promise<Stripe | null> = loadStripe(environment.stripePublicKey);
  private readonly cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#2f3ae8',
        color: '#000000',
        fontWeight: '500',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '25px'
      }
    },
    hidePostalCode: true,
  };
  protected paymentInfo = new PaymentInfo();
  private paymentIntentService: PaymentIntentService;

  constructor(paymentIntentService: PaymentIntentService) {
    this.paymentIntentService = paymentIntentService;
  }

  ngOnInit(): void {
    this.loadStripeElements()
  }

  protected onSubmit() {
    this.purchase();
  }

  private loadStripeElements() {
    this.stripePromise
      .then((stripe: Stripe | null) => {
        // get handler to stripe element
        const elements = stripe?.elements()
        // create a cart elements and hind the zip code,set style cart it means debit,credit cart type
        this.cardElement = elements!.create('card', this.cardOptions)
        // add an instance of card UI component (mapped id)
        this.cardElement.mount('#card-element')
        // it's optional
        this.cardElement.on('change', (event: any) => {
          console.log(event)
          // good css
          let displayError: HTMLElement | null = document.getElementById('card-errors')
          if (event.complete) {
            displayError!.textContent = ""
          } else if (event.error) {
            displayError!.textContent = "card number was correct"
          }
        }) // end on()
      }) // end then()
  }

  private purchase() {
    // set up params for confirmCardPayment(...)
    const optionPaymentMethod = {
      payment_method: {
        card: this.cardElement, // reference the stripe element component
        // importance for getting status succeeded when credit card was worked
        // key is const
        billing_details: {
          email: this.paymentInfo.sendToEmail,
          name: `Mr. Thitikorn Nupan`,
          address: {
            line1: '169/63 Ratchadaphisek Road Dindaeng',
            city: `Bangkok`,
            country: 'TH', // can't thailand use only 2 char
            postal_code: '10400'
          }
        } // billing detail
      }  // payment method
    }
    const optionHandlerAction = {handleActions: false}
    // this basic step
    this.paymentIntentService.getPaymentIntent(this.paymentInfo).subscribe(
      response => {
        // console.log(response)
        this.stripePromise.then(
          (stripe : Stripe | null) => {
            stripe?.confirmCardPayment(response.client_secret, optionPaymentMethod, optionHandlerAction).then(
              (response : PaymentIntentResult) => {
                if (!response.error) {
                  alert(response.paymentIntent.status)
                }
                window.location.reload() // if failed reload page
              })
          })
      })
  }
}
