package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.PaymentDTO;
import com.app.DTO.ShowPaymentsDTO;
import com.app.service.PaymentService;

@RestController
//@RequestMapping("/payment")
@CrossOrigin("http://localhost:3000")
public class PaymentController {

	@Autowired
	private PaymentService paymentservice;

	@PostMapping("/customer/makePayment/{Id}")
	public ResponseEntity<PaymentDTO> makePayment(@RequestBody PaymentDTO paymentdto, @PathVariable long Id) {
	    PaymentDTO savedPayment = paymentservice.createPayment(paymentdto, Id);

	    // Return the saved payment with HTTP 201 status
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedPayment);
	}

	
	 @GetMapping("/admin/getPaymentsByDate/{date}")
	    public ResponseEntity<List<ShowPaymentsDTO>> getPaymentsByDate(@PathVariable String date) {
	        // Parse the date string to LocalDate
	        LocalDate paymentDate = LocalDate.parse(date);

	        // Fetch payments by date
	        List<ShowPaymentsDTO> payments = paymentservice.getPaymentsByDate(paymentDate);

	        // Return the list of payments
	        return ResponseEntity.ok(payments);
	    }

	  @GetMapping("/admin/getAllPayments")
	    public ResponseEntity<List<ShowPaymentsDTO>> getAllPayments() {
	        // Call service to fetch all payments
	        List<ShowPaymentsDTO> paymentList = paymentservice.getAllPayments();

	        // Return the list of payments
	        return ResponseEntity.ok(paymentList);
	    }

}
