package com.app.service;

import java.util.List;

import com.app.DTO.CustomerDTO;
import com.app.DTO.CustomerMembershipDetailsDTO;
import com.app.Entity.Customer;

public interface CustomerService {

	CustomerDTO createCustomer(CustomerDTO customerDTO);

	Customer updateCustomer(long id, CustomerDTO  customer1);

	CustomerDTO getCustomerById(long id);

	void deletecustomer(long id);

	List<CustomerMembershipDetailsDTO> getAllCustomers();

}
