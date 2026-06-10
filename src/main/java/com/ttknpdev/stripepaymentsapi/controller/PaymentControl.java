package com.ttknpdev.stripepaymentsapi.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.ttknpdev.stripepaymentsapi.entity.PaymentInformation;
import com.ttknpdev.stripepaymentsapi.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin({"http://localhost:4200", "http://thitikorn-nupan.com"})
@RestController
@RequestMapping(value = "/api/payment")
@Slf4j
public class PaymentControl {

    private final PaymentService paymentService;

    @Autowired
    public PaymentControl(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Remember we send infor about card in part of frontend
    @PostMapping(value = "/intent")
    private ResponseEntity<String> generatePaymentIntent(@RequestBody PaymentInformation paymentInformation) throws StripeException {
        log.info("paymentInformation {}", paymentInformation); // paymentInformation PaymentInformation(amount=7999, currency=THB, sendToEmail=thitikorn-n@rmutp.ac.th)
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInformation);
        return ResponseEntity.ok(paymentIntent.toJson());
    }

}
