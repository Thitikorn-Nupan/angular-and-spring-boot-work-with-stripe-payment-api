package com.ttknpdev.stripepaymentsapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.model.PaymentIntent;
import com.ttknpdev.stripepaymentsapi.controller.PaymentControl;
import com.ttknpdev.stripepaymentsapi.entity.PaymentInformation;
import com.ttknpdev.stripepaymentsapi.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PaymentControl.class)
class UnderstandStripePaymentsApiApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean // For injects this bean
    private PaymentService paymentService;

    @Test
    public void testGeneratePaymentIntent() throws Exception {
        // Payment req
        PaymentInformation paymentInformation = new PaymentInformation();
        paymentInformation.setAmount(1000L);
        paymentInformation.setCurrency("THB");
        paymentInformation.setSendToEmail("demo@email.com");

        // Payment Res
        PaymentIntent paymentIntent = new PaymentIntent();
        paymentIntent.setAmount(1000L);
        paymentIntent.setCurrency("THB");

        // mock req/res
        given(paymentService.createPaymentIntent(paymentInformation)).willReturn(paymentIntent);

        // convert java to json as string
        String requestBody = new ObjectMapper().writeValueAsString(paymentInformation);

        RequestBuilder request = MockMvcRequestBuilders
                .post("/api/payment/intent")
                .contentType("application/json")
                .content(requestBody);

        // ** ResultActions class to handle the response of the REST API.
        ResultActions response = mockMvc.perform(request);

        // then - verify the output
        response
                .andExpect(status().isOk())
                .andExpect(header().stringValues("Content-Type", "text/plain;charset=UTF-8"))
                .andDo(print());
    }

}
