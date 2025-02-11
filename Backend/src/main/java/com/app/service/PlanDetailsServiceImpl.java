package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.MembershipPlanDetailsDTO;
import com.app.Entity.MembershipPlanDetails;
import com.app.repository.MembershipPlanDetailsRepo;

@Service
@Transactional
public class PlanDetailsServiceImpl implements PlanDetailsService {

	@Autowired
	private MembershipPlanDetailsRepo MembershipPlanDetailsRepo;
	

	public MembershipPlanDetailsDTO createMembershipPlan(MembershipPlanDetailsDTO membershipPlanDetailsDTO) {
	    MembershipPlanDetails membershipPlanDetails = new MembershipPlanDetails();
	    membershipPlanDetails.setPlanName(membershipPlanDetailsDTO.getPlanName());
	    membershipPlanDetails.setPlanPrice(membershipPlanDetailsDTO.getPlanPrice());

	    MembershipPlanDetails savedPlan = MembershipPlanDetailsRepo.save(membershipPlanDetails);

	    MembershipPlanDetailsDTO response = new MembershipPlanDetailsDTO();
	    response.setPlanDetailsId(savedPlan.getPlanDetailsId());
	    response.setPlanName(savedPlan.getPlanName());
	    response.setPlanPrice(savedPlan.getPlanPrice());

	    return response;
	}


	   // Method to get all plans
    public List<MembershipPlanDetailsDTO> getAllPlans() {
        List<MembershipPlanDetails> plans = MembershipPlanDetailsRepo.findAll();
        return plans.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Method to update a plan
    public MembershipPlanDetailsDTO updatePlan(long planDetailsId, MembershipPlanDetailsDTO updatedPlanDTO) {
        MembershipPlanDetails plan = MembershipPlanDetailsRepo.findById(planDetailsId)
                .orElseThrow(() -> new RuntimeException("Plan not found with ID: " + planDetailsId));

        plan.setPlanName(updatedPlanDTO.getPlanName());
        plan.setPlanPrice(updatedPlanDTO.getPlanPrice());
        MembershipPlanDetails updatedPlan = MembershipPlanDetailsRepo.save(plan);

        return convertToDTO(updatedPlan);
    }

    // Method to delete a plan
    public void deletePlan(long planDetailsId) {
       
        MembershipPlanDetailsRepo.deleteById(planDetailsId);
    }

    // Utility method to convert entity to DTO
    private MembershipPlanDetailsDTO convertToDTO(MembershipPlanDetails planDetails) {
        MembershipPlanDetailsDTO dto = new MembershipPlanDetailsDTO();
        dto.setPlanDetailsId(planDetails.getPlanDetailsId());
        dto.setPlanName(planDetails.getPlanName());
        dto.setPlanPrice(planDetails.getPlanPrice());
        return dto;
    }
    
    public MembershipPlanDetailsDTO getPlanById(long planDetailsId) {
        MembershipPlanDetails plan = MembershipPlanDetailsRepo.findById(planDetailsId)
                .orElseThrow(() -> new RuntimeException("Plan not found with ID: " + planDetailsId));
        return convertToDTO(plan);
    }


	
}
