package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.app.Entity.*;
import com.app.Entity.Customer;
import com.app.repository.CustomerReopository;
import com.app.repository.TrainnerRepository;

@Service // or @Component also works!
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	// dep : user repository : based upon spring data JPA
//	@Autowired
//	private CustomerReopository userRepo;
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		System.out.println("in load by user nm " + email);
//
//		Customer user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID "));
//		System.out.println(user.getName());
//		System.out.println("lifted user dtls from db " + user);
//		return new CustomerUserDetails(user);
//	}
	
	 @Autowired
	    private CustomerReopository customerRepository;

	    @Autowired
	    private TrainnerRepository trainerRepository;

	    @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	        // Check in Customer entity
	        Optional<Customer> customer = customerRepository.findByEmail(email);
	        if (customer.isPresent()) {
	        	System.out.println(customer.get().getName());
	            return new CustomerUserDetails(customer.get());
	        }

	        // Check in Trainer entity
	        Optional<Trainner> trainer = trainerRepository.findByEmail(email);
	        if (trainer.isPresent()) {
	        	System.out.println(trainer.get().getName());
	            return new TrainerUserDetails(trainer.get());
	        }

	        // If neither found
	        throw new UsernameNotFoundException("User not found with email: " + email);
	    }

}
