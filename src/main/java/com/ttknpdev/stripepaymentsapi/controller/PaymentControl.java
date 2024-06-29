package com.ttknpdev.stripepaymentsapi.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.ttknpdev.stripepaymentsapi.entity.PaymentInformation;
import com.ttknpdev.stripepaymentsapi.service.PaymentService;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping(value = "/api/payment")
public class PaymentControl {
    private Logger logger = LoggerFactory.getLogger(PaymentControl.class);
    private PaymentService paymentService;
    @Autowired
    public PaymentControl(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    // remember we send infor about card in part of frontend
    @PostMapping(value = "/intent")
    private ResponseEntity<String> generatePaymentIntent(@RequestBody PaymentInformation paymentInformation) throws StripeException {
        logger.info("paymentInformation {}",paymentInformation); // paymentInformation PaymentInformation(amount=7999, currency=THB, sendToEmail=thitikorn-n@rmutp.ac.th)
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentInformation);
        return ResponseEntity.ok(paymentIntent.toJson());
    }
}
