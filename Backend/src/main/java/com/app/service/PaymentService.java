package com.app.service;

import java.time.LocalDate;
import java.util.List;

import com.app.DTO.PaymentDTO;
import com.app.DTO.ShowPaymentsDTO;

public interface PaymentService {

	
	List<ShowPaymentsDTO> getAllPayments();

	List<ShowPaymentsDTO> getPaymentsByDate(LocalDate paymentDate);

	PaymentDTO createPayment(PaymentDTO paymentdto, long customerId);

}
