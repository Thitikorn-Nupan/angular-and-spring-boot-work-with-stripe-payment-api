package com.ttknpdev.stripepaymentsapi.entity;

import lombok.Data;
// **** for capturing payment information  from the client-side. It contains attributes such as amount, currency, and receiptEmail, which are essential for processing payments.
@Data
public class PaymentInformation {
    private Long amount;
    private String currency;
    private String sendToEmail;
}
