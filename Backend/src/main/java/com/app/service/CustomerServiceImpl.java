package com.app.service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.DTO.CustomerDTO;
import com.app.DTO.CustomerMembershipDetailsDTO;
import com.app.Entity.Customer;
import com.app.Entity.MembershipPlan;
import com.app.Entity.Role;
import com.app.repository.CustomerReopository;
import com.app.repository.MembershipPlanRepository;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerReopository customerReopository;

	@Autowired
	private MembershipPlanRepository membershipPlanRepository;

	@Autowired
	private ModelMapper modelmapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override

	public CustomerDTO createCustomer(CustomerDTO customerDTO) {
		// Log the incoming DTO

		System.out.println("Incoming CustomerDTO: " + customerDTO);

		// Convert DTO to entity using ModelMapper
		Customer customer = modelmapper.map(customerDTO, Customer.class);
		System.out.println("Mapped Customer: " + customer);

		// Set additional properties if needed
		customer.setRole(Role.ROLE_MEMBER);

		// Save the customer entity
		Customer savedCustomer = customerReopository.save(customer);
		System.out.println("Saved Customer: " + savedCustomer);

		// Convert back to DTO and return
		return modelmapper.map(savedCustomer, CustomerDTO.class);
	}

	@Override
	public void deletecustomer(long id) {
		customerReopository.deleteById(id);

	}

	public List<CustomerMembershipDetailsDTO> getAllCustomers() {
		List<Customer> customers = Optional.ofNullable(customerReopository.findAll()).orElse(Collections.emptyList());
		List<MembershipPlan> memberships = Optional.ofNullable(membershipPlanRepository.findAll())
				.orElse(Collections.emptyList());

		return mapCustomersToDTO(customers, memberships);
	}

	private List<CustomerMembershipDetailsDTO> mapCustomersToDTO(List<Customer> customers,
			List<MembershipPlan> memberships) {
		return customers.stream().map(customer -> {
			MembershipPlan membership = memberships.stream()
					.filter(m -> m.getCustomer().getCustomerId() == customer.getId()).findFirst().orElse(null);

			return new CustomerMembershipDetailsDTO(customer.getId(), customer.getName(), customer.getContact(),
					customer.getEmail(), customer.getGender(), membership != null ? membership.getMembershipId() : 0,
					membership != null ? membership.getPlanname() : "N/A",
					membership != null ? membership.getPeriod() : "N/A",
					membership != null ? membership.getStartDate() : null,
					membership != null ? membership.getTrainer().getName() : "N/A");
		}).collect(Collectors.toList());
	}

	@Override
	public CustomerDTO getCustomerById(long id) {
		Optional<Customer> optionalcustomer = customerReopository.findById(id);

		if (optionalcustomer.isPresent()) {
			// Map the Customer entity to CustomerDTO
			return modelmapper.map(optionalcustomer.get(), CustomerDTO.class);
		} else {
			// Handle the case where the customer is not found
			throw new EntityNotFoundException("Customer with ID " + id + " not found");
		}
	}

	@Override
	public Customer updateCustomer(long id, CustomerDTO customerDTO) {
		// Fetch the existing customer by ID or throw an exception
		Customer existingCustomer = customerReopository.findById(id)
				.orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

		// Log the existing customer (optional for debugging)
		System.out.println("Existing Customer: " + existingCustomer);

		// Update the fields of the existing customer from the DTO
		existingCustomer.setName(customerDTO.getName());
		existingCustomer.setEmail(customerDTO.getEmail());
		existingCustomer.setContact(customerDTO.getContact());
		existingCustomer.setGender(customerDTO.getGender());
		existingCustomer.setPassword(customerDTO.getPassword());

		// Save the updated customer
		Customer updatedCustomer = customerReopository.save(existingCustomer);

		// Log the updated customer (optional for debugging)
		System.out.println("Updated Customer: " + updatedCustomer);

		// Return the updated customer
		return updatedCustomer;
	}

}
