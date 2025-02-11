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
import com.app.DTO.MachineDTO;
import com.app.DTO.ShowMachineDTO;
import com.app.service.CustomerService;
import com.app.service.MachineService;
import com.app.service.MembershipPlanService;


@RestController
@RequestMapping("/trainer")
@CrossOrigin("http://localhost:3000")
public class TrainnerController {

	
	
	@Autowired
	private CustomerService customerservice;
	
	@Autowired
	private MembershipPlanService membershipPlanservice;
	
	@Autowired
	private MachineService machineService;
	
	@Autowired
	private PasswordEncoder passwordEncode;
	
	
	// create a new customer
		@PostMapping("/CreateCustomer")
		public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {
			customerDTO.setPassword(passwordEncode.encode(customerDTO.getPassword()));
			CustomerDTO savedCustomer = customerservice.createCustomer(customerDTO);

			return ResponseEntity.ok(savedCustomer);
		}
		
	// get customer by trainer id 
		
		@GetMapping("/getCustomersByTrainerId/{trainerId}")
		public ResponseEntity<List<CustomerDTO>> getCustomersByTrainerId(@PathVariable long trainerId) {
		    try {
		        List<CustomerDTO> members = membershipPlanservice.getCustomersByTrainerId(trainerId);
		        return ResponseEntity.ok(members);
		    } catch (EntityNotFoundException ex) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		    } catch (Exception ex) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		    }
		}

		@GetMapping("/getMachinesByTrainerId/{trainerId}")
		public ResponseEntity<List<MachineDTO>> getMachinesByTrainerId(@PathVariable long trainerId) {
		    try {
		        // Fetch machines by trainerId from the service layer
		        List<MachineDTO> machines = machineService.getMachinesByTrainerId(trainerId);
		        
		        // Return a successful response with the list of machines
		        return ResponseEntity.ok(machines);
		    } catch (EntityNotFoundException ex) {
		        // Return 404 Not Found if no machines are found for the trainer
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		    } catch (Exception ex) {
		        // Handle other unexpected exceptions
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		    }
		}
		
		
		@GetMapping("/getMachineById/{id}")
		public ResponseEntity<ShowMachineDTO> getMachineById(@PathVariable long id) {
		    try {
		        ShowMachineDTO machines = machineService.getMachineById(id);
		        return ResponseEntity.ok(machines);  // Return the list of machines with HTTP 200 status
		    } catch (Exception e) {
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Handle errors
		    }
		}

		@PutMapping("/editMachineStatus/{id}")
	    public ResponseEntity<MachineDTO> editMachineStatus(@PathVariable long id, @RequestParam String machineStatus) {
	        try {
	            // Call service method to update machine status
	        	System.out.println(machineStatus);
	            MachineDTO updatedMachine = machineService.updateMachineStatust(id, machineStatus);

	            // Return the updated machine with HTTP 200 status
	            return ResponseEntity.ok(updatedMachine);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the machine is not found
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body(null);
	        } catch (Exception e) {
	            // Handle any other unexpected errors
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(null);
	        }
	    }

		
	
	
}
