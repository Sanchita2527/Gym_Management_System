package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.PaymentDTO;
import com.app.DTO.ShowPaymentsDTO;
import com.app.Entity.Customer;
import com.app.Entity.Payment;
import com.app.repository.CustomerReopository;
import com.app.repository.PaymentRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	  @Autowired
	    private PaymentRepository paymentRepository;
	  
	  @Autowired
	  private CustomerReopository customerReopository;

	    @Autowired
	    private ModelMapper modelMapper;


	    @Override
	    public List<ShowPaymentsDTO> getPaymentsByDate(LocalDate paymentDate) {
	        List<Payment> payments = paymentRepository.findByPaymentDate(paymentDate);

	        if (payments.isEmpty()) {
	            throw new EntityNotFoundException("No payments found for date " + paymentDate);
	        }

	        return payments.stream()
	                .map(payment -> {
	                    ShowPaymentsDTO dto = new ShowPaymentsDTO();
	                    dto.setPaymentDate(payment.getPaymentDate());
	                    dto.setName(payment.getCustomer().getName()); 
	                    dto.setTotalamount(payment.getTotalPrice());
	                    return dto;
	                })
	                .collect(Collectors.toList());
	    }

	    @Override
	    public List<ShowPaymentsDTO> getAllPayments() {
	        // Fetch all payments from the repository
	        List<Payment> payments = paymentRepository.findAll();

	        return payments.stream()
	                .map(payment -> {
	                    ShowPaymentsDTO dto = new ShowPaymentsDTO();
	                    dto.setPaymentDate(payment.getPaymentDate());
	                    dto.setName(payment.getCustomer().getName()); 
	                    dto.setTotalamount(payment.getTotalPrice());
	                    return dto;
	                })
	                .collect(Collectors.toList());
	    }

	    @Override
	    public PaymentDTO createPayment(PaymentDTO paymentdto, long customerId) {
	        // Fetch the customer by ID
	        Customer customer = customerReopository.findById(customerId)
	                .orElseThrow(() -> new EntityNotFoundException("Customer with ID " + customerId + " not found"));

	        // Create and populate payment
	        Payment payment = new Payment();
	        payment.setCustomer(customer);
	        payment.setTotalPrice(paymentdto.getTotalPrice());
	        payment.setPaymentDate(LocalDate.now());

	        // Save the payment entity
	        Payment savedPayment = paymentRepository.save(payment);

	        // Convert the saved entity to DTO
	        PaymentDTO savedPaymentDTO = modelMapper.map(savedPayment, PaymentDTO.class);

	        // Return the DTO
	        return savedPaymentDTO;
	    }


}
