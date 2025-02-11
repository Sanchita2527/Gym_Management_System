package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.MembershipPlanDetailsDTO;
import com.app.service.PlanDetailsService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class MembershipPlanController {

    @Autowired
    private PlanDetailsService planDetailsService;

    @PostMapping("/createPlan")
    public ResponseEntity<MembershipPlanDetailsDTO> createPlan(@RequestBody MembershipPlanDetailsDTO membershipPlanDetailsDTO) {
        try {
            // Call the service to create a membership plan
            MembershipPlanDetailsDTO newPlanDetails = planDetailsService.createMembershipPlan(membershipPlanDetailsDTO);
            
            // Return the created MembershipPlanDetailsDTO with HTTP 201 status
            return ResponseEntity.status(HttpStatus.CREATED).body(newPlanDetails);
        } catch (Exception e) {
            // Log the exception for debugging (optional)
            e.printStackTrace();
            
            // Return an internal server error with no body
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint to view all plans
    @GetMapping("/getAllPlans")
    public ResponseEntity<List<MembershipPlanDetailsDTO>> getAllPlans() {
        List<MembershipPlanDetailsDTO> allPlans = planDetailsService.getAllPlans();
        return ResponseEntity.ok(allPlans);
    }

    // Endpoint to update a plan
    @PutMapping("/updatePlan/{id}")
    public ResponseEntity<MembershipPlanDetailsDTO> updatePlan(@PathVariable("id") long planDetailsId,
                                                               @RequestBody MembershipPlanDetailsDTO updatedPlanDTO) {
        MembershipPlanDetailsDTO updatedPlan = planDetailsService.updatePlan(planDetailsId, updatedPlanDTO);
        return ResponseEntity.ok(updatedPlan);
    }

    // Endpoint to delete a plan
    @DeleteMapping("/deletePlan/{id}")
    public ResponseEntity<String> deletePlan(@PathVariable("id") long planDetailsId) {
        planDetailsService.deletePlan(planDetailsId);
        return ResponseEntity.ok("Plan deleted successfully");
    }
    
 // Endpoint to get a plan by ID
    @GetMapping("/getPlanById/{id}")
    public ResponseEntity<MembershipPlanDetailsDTO> getPlanById(@PathVariable("id") long planDetailsId) {
        MembershipPlanDetailsDTO planDetailsDTO = planDetailsService.getPlanById(planDetailsId);

        // If the plan doesn't exist, return 404 Not Found
        if (planDetailsDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // Return the plan with 200 OK if found
        return ResponseEntity.ok(planDetailsDTO);
    }

}