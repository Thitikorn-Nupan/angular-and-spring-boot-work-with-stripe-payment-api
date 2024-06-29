export class PaymentInfo {
  public amount: number;
  public currency: string;
  public declare sendToEmail: string;
  // have to * 100 cause payment /100 first
  constructor(amount: number = Math.round(1111.11*100), currency: string = "THB") {
    this.amount = amount;
    this.currency = currency;
  }

  toString() {
    console.log(`${this.amount} ${this.currency} ${this.sendToEmail}`);
  }

}
