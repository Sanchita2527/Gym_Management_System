package com.app.controller;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.CustomerDTO;
import com.app.DTO.CustomerMembershipDetailsDTO;
import com.app.DTO.MachineDTO;
import com.app.DTO.ShowMachineDTO;
import com.app.DTO.TrainnerDTO;
import com.app.Entity.Customer;
import com.app.service.CustomerService;
import com.app.service.MachineService;
import com.app.service.TrainnerService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {

	@Autowired
	private CustomerService customerservice;

	@Autowired
	private TrainnerService trainnerservice;
	
	@Autowired
	private MachineService machineService;
	
	@Autowired
	private PasswordEncoder passwordEncode;
	
//	@PostMapping("/addAdmin")
//    public ResponseEntity<?> addAdmin(@RequestBody User user) {
//        try {
//            User newAdmin = customerservice.addAdmin(user);
//            return ResponseEntity.status(HttpStatus.CREATED).body(newAdmin);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
//        }
//    }

	// create a new customer
	@PostMapping("/createcustomer")
	public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO customerDTO) {

		customerDTO.setPassword(passwordEncode.encode(customerDTO.getPassword()));
		CustomerDTO savedCustomer = customerservice.createCustomer(customerDTO);

		return ResponseEntity.ok(savedCustomer);
	}

	// delete customer
	@DeleteMapping("/deletecustomer/{id}")
	public ResponseEntity<Void> deletecustomer(@PathVariable long id) {
		try {
			customerservice.deletecustomer(id);
			return ResponseEntity.noContent().build(); // 204 No Content
		} catch (Exception e) {
			// Log the exception (optional)
			// logger.error("Error deleting customer", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PutMapping("/updateCustomer/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable long id, @RequestBody CustomerDTO customerDTO) {
	    Customer updatedCustomer = customerservice.updateCustomer(id, customerDTO);
	    return ResponseEntity.ok(updatedCustomer);
	}


	// Fetch customer details using ID
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

	//get all customer
	@GetMapping("/getAllCustomers")
	public ResponseEntity<List<CustomerMembershipDetailsDTO>> getAllCustomers() {
		List<CustomerMembershipDetailsDTO> received = customerservice.getAllCustomers();
		
		return ResponseEntity.ok(received);
	}

	// create a new trainner
	@PostMapping("/createTrainer")
	public ResponseEntity<TrainnerDTO> createTrainner(@RequestBody TrainnerDTO trainnerDTO) {

		trainnerDTO.setPassword(passwordEncode.encode(trainnerDTO.getPassword()));
		TrainnerDTO savedCustomer = trainnerservice.createTrainner(trainnerDTO);

		return ResponseEntity.ok(savedCustomer);
	}

	// update trainner
	@PutMapping("/updateTrainer/{id}")
	public ResponseEntity<TrainnerDTO> updateTrainner(@PathVariable long id, @RequestBody TrainnerDTO trainnerdto) {
		try {
			TrainnerDTO updatedCustomer = trainnerservice.updateTrainner(id, trainnerdto);
			if (updatedCustomer != null) {
				
				return ResponseEntity.ok(updatedCustomer);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
		} catch (Exception e) {
			// Log the exception (optional)
			// logger.error("Error updating customer", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	//get trainner by id

	@GetMapping("/getTrainerById/{id}")
	public ResponseEntity<?> getTrainnerById(@PathVariable Long id) {
		try {
			TrainnerDTO trainner = trainnerservice.getTrainnerById(id);
			return ResponseEntity.ok(trainner);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trainner with ID " + id + " not found.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching the trainner.");
		}
	}

	// get all trainner
	@GetMapping("/getAllTrainers")
	public ResponseEntity<List<TrainnerDTO>> getAllTrainners() {
		try {
			List<TrainnerDTO> trainners = trainnerservice.getAllTrainners();
			return ResponseEntity.ok(trainners);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}
	}
//delete trainner by id 
	@DeleteMapping("/deleteTrainer/{id}")
	public ResponseEntity<?> deleteTrainner(@PathVariable Long id) {
		try {
			trainnerservice.deleteTrainner(id);
			return ResponseEntity.noContent().build();
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Trainner with ID " + id + " not found.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while deleting the trainner.");
		}
	}
	
	//Add machine 
	
	@PostMapping("/addMachine")
	public ResponseEntity<MachineDTO> addMachine(@RequestBody MachineDTO machinedto){
		
		MachineDTO savedDto = machineService.addMachine(machinedto);
		
		return ResponseEntity.ok(savedDto);
		
	}
	@PutMapping("/editMachineStatus/{id}")
    public ResponseEntity<MachineDTO> editMachineStatus(@PathVariable long id, @RequestParam String machineStatus) {
        try {
            // Call service method to update machine status
            MachineDTO updatedMachine = machineService.updateMachineStatus(id, machineStatus);

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
	@GetMapping("/getAllMachines")
	public ResponseEntity<List<ShowMachineDTO>> getAllMachines() {
	    try {
	        List<ShowMachineDTO> machines = machineService.getAllMachines();
	        return ResponseEntity.ok(machines);  // Return the list of machines with HTTP 200 status
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Handle errors
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
	
	 @DeleteMapping("/deleteMachine/{id}")
	    public ResponseEntity<Void> deleteMachine(@PathVariable long id) {
	        try {
	            machineService.deleteMachine(id);
	            return ResponseEntity.noContent().build();
	        } catch (EntityNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body(null);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(null);
	        }
	    }
	 
	

}
