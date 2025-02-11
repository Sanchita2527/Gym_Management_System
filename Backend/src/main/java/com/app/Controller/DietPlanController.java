package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.app.Entity.DietPlan;
import com.app.service.DietPlanService;

@RestController
@CrossOrigin("http://localhost:3000")
public class DietPlanController {

	
	@Autowired
	private DietPlanService dservice;
	
	@PostMapping("trainer/uploadDietPlan/{customerId}")
	public ResponseEntity<String> uploadFile(@PathVariable long customerId, @RequestParam("file") MultipartFile file) {
	    try {
	        // Set the file name to the customerId
	        String fileName = String.valueOf(customerId);

	        // Create a new DietPlan object with the customerId as the file name
	        DietPlan dietplan = new DietPlan(
	            fileName,
	            file.getContentType(),
	            file.getBytes()
	        );

	        // Save the diet plan
	        DietPlan d = dservice.saveDietPlan(dietplan);

	        return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

	 
	 

	
	@GetMapping("/customer/download/{customerId}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable long customerId) {
	    try {
	        String fileName = String.valueOf(customerId);
	        DietPlan diet = dservice.findfile(fileName);

	        if (diet != null) {
	            System.out.println("Retrieved file: " + diet.getName());
	            System.out.println("File size: " + diet.getData().length);
	            System.out.println("File type: " + diet.getType());

	            HttpHeaders headers = new HttpHeaders();
	            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + diet.getName());
	            headers.add(HttpHeaders.CONTENT_TYPE, diet.getType());

	            return new ResponseEntity<>(diet.getData(), headers, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


}
