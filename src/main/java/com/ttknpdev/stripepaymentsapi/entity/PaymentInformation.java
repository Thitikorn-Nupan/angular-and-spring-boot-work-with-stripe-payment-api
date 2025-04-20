package com.ttknpdev.stripepaymentsapi.entity;

import lombok.Data;
import lombok.ToString;

/**
// for capturing payment information  from the client-side.
// It contains attributes such as amount, currency, and receiptEmail, which are essential for processing payments.
*/
@Data
@ToString
public class PaymentInformation {
    private Long amount;
    private String currency;
    private String sendToEmail;
}
