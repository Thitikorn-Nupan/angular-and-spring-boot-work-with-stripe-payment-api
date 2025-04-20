export class PaymentInfo {
  public amount: number;
  public currency: string;
  public sendToEmail: string;
  // have to * 100 cause payment /100 first
  constructor(amount: number = Math.round(10.00*100), currency: string = "THB") {
    this.amount = amount;
    this.currency = currency;
    this.sendToEmail =''
  }

}
