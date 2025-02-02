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

	 
	 
//	 @GetMapping("/customer/download/{customerId}")
//	    public ResponseEntity<byte[]> downloadFile(@PathVariable long customerId) {
//	    	String fileName = String.valueOf(customerId);
//	        DietPlan diet = dservice.findfile(fileName);
//	        if (diet != null) {
//	            HttpHeaders headers = new HttpHeaders();
//	            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + diet.getName());
//	            return new ResponseEntity<>(diet.getData(), headers, HttpStatus.OK);
//	        } else {
//	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	        }
//	    }
	
	@GetMapping("/customer/download/{customerId}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable long customerId) {
	    try {
	        // Use customerId as the file name
	        String fileName = String.valueOf(customerId);

	        // Retrieve the DietPlan associated with the customerId (as the filename)
	        DietPlan diet = dservice.findfile(fileName);

	        // If the file exists, return it with the correct headers for download
	        if (diet != null) {
	            // Determine the file extension based on the file type
	            String extension = "";
	            if ("application/pdf".equals(diet.getType())) {
	                extension = ".pdf";
	            } else if ("application/msword".equals(diet.getType()) || "application/vnd.openxmlformats-officedocument.wordprocessingml.document".equals(diet.getType())) {
	                extension = ".docx";
	            }

	            // Set the full file name with the extension
	            String fullFileName = diet.getName() + extension;

	            // Set the correct content type for the response
	            HttpHeaders headers = new HttpHeaders();
	            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fullFileName);
	            headers.add(HttpHeaders.CONTENT_TYPE, diet.getType());  // Ensure correct MIME type

	            return new ResponseEntity<>(diet.getData(), headers, HttpStatus.OK);
	        } else {
	            // If the file is not found, return a 404 Not Found status
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        // Log and handle any unexpected errors
	        e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}

}
