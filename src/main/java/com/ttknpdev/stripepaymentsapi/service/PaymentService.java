package com.ttknpdev.stripepaymentsapi.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.ttknpdev.stripepaymentsapi.entity.PaymentInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Autowired
    public PaymentService(@Value("${STRIPE.SECRET.KEY}") final String STRIPE_SECRET_KEY) {
        //  Sets the Stripe API key to authenticate requests. This is a one-time setup when the service is instantiated.
        Stripe.apiKey = STRIPE_SECRET_KEY;
    }

    public PaymentIntent createPaymentIntent(final PaymentInformation paymentInformation) throws StripeException {
        List<String> paymentMethodTypes = new ArrayList<>(); //  Defines the types of payment methods accepted, in this case, just "card".
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>(); //  params Constructs a map containing parameters required to create a payment intent, such as amount, currency, and payment_method_types
        // *** key is fix named
        params.put("amount", paymentInformation.getAmount());
        params.put("currency", paymentInformation.getCurrency());
        params.put("receipt_email", paymentInformation.getSendToEmail());
        params.put("payment_method_types", paymentMethodTypes);

        return PaymentIntent.create(params); //  Calls the Stripe API to create a payment intent with the provided parameters.
    }
}
