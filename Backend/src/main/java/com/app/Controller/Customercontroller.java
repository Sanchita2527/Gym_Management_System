package com.app.controller;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.CustomerDTO;
import com.app.DTO.MembershipDetailsDTO;
import com.app.DTO.MembershipPlanDetailsDTO;
import com.app.DTO.TrainnerDTO;
import com.app.Entity.Customer;
import com.app.Entity.MembershipPlan;
import com.app.service.CustomerService;
import com.app.service.MembershipPlanService;
import com.app.service.PlanDetailsService;
import com.app.service.TrainnerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("http://localhost:3000")
public class Customercontroller {

	@Autowired
	private CustomerService customerservice;
	

    @Autowired
    private PlanDetailsService planDetailsService;
    
	
	 @Autowired
	    private MembershipPlanService membershipPlanService;
	 
	 @Autowired
		private TrainnerService  trainnerService;
	 
	 @Autowired
		private PasswordEncoder passwordEncode;
	
	
	// create a new customer
		@PostMapping("/CreateCustomer")
		public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {

			System.out.println("-----Before Encoder-----");
			customerDTO.setPassword(passwordEncode.encode(customerDTO.getPassword()));
			System.out.println("-----After Encoder-----");
			System.out.println("/n ----------------------- password: "+customerDTO.getPassword());
			CustomerDTO savedCustomer = customerservice.createCustomer(customerDTO);

			return ResponseEntity.ok(savedCustomer);
		}
		
		// Endpoint to buy a membership
		@PostMapping("/buyMembership")
		public ResponseEntity<MembershipPlan> buyMembership(@RequestParam Long customerId,
		                                                     @RequestParam Long trainerId,
		                                                     @RequestParam String planName,
		                                                     @RequestParam String period,
		                                                     @RequestParam double totalPrice) {
		    MembershipPlan membershipPlan = membershipPlanService.buyMembership(customerId, trainerId, planName, period,totalPrice);
		    return ResponseEntity.ok(membershipPlan);
		}
		
		@GetMapping("/getTrainnersByTimeSlot/{timeSlot}")
		public ResponseEntity<List<TrainnerDTO>> getTrainnersByTimeSlot(@PathVariable String timeSlot) {
		    try {
		        List<TrainnerDTO> trainners = trainnerService.getTrainnersByTimeSlot(timeSlot);
		        return ResponseEntity.ok(trainners);  // Return the list of trainers for the given time slot
		    } catch (EntityNotFoundException e) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Handle case where no trainers are found
		    }
		}
		
		 // Endpoint to view all plans
	    @GetMapping("/getAllPlans")
	    public ResponseEntity<List<MembershipPlanDetailsDTO>> getAllPlans() {
	        List<MembershipPlanDetailsDTO> allPlans = planDetailsService.getAllPlans();
	        return ResponseEntity.ok(allPlans);
	    }
	    @GetMapping("/getCustomerById/{id}")
		public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable long id) {
			// System.out.println("Received ID: " + id);
			if (id <= 0) {
				throw new IllegalArgumentException("Invalid ID provided.");
			}

			CustomerDTO received = customerservice.getCustomerById(id);
			if (received == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}

			System.out.println("Incoming CustomerDTO: " + received);
			return ResponseEntity.ok(received);
		}
	  @PutMapping("/updateCustomer/{id}")
		public ResponseEntity<Customer> updateCustomer(@PathVariable long id, @RequestBody CustomerDTO customerDTO) {
		  customerDTO.setPassword(passwordEncode.encode(customerDTO.getPassword()));
		    Customer updatedCustomer = customerservice.updateCustomer(id, customerDTO);
		    return ResponseEntity.ok(updatedCustomer);
		}

	  
	  @GetMapping("/getMembershipDetailsByCustomerId/{customerId}")
	  public ResponseEntity<?> getMembershipDetailsByCustomerId(@PathVariable long customerId) {
	      try {
	          List<MembershipDetailsDTO> membershipDetails = membershipPlanService.getMembershipDetailsByCustomerId(customerId);
	          return ResponseEntity.ok(membershipDetails);
	      } catch (Exception e) {
	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
	      }
	  }

}
