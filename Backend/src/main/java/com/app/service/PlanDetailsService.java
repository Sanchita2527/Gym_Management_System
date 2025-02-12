package com.app.service;

import java.util.List;

import com.app.DTO.MembershipPlanDetailsDTO;

public interface PlanDetailsService {

	public MembershipPlanDetailsDTO createMembershipPlan(MembershipPlanDetailsDTO membershipPlanDetailsDTO);

	public List<MembershipPlanDetailsDTO> getAllPlans();

	public MembershipPlanDetailsDTO updatePlan(long planDetailsId, MembershipPlanDetailsDTO updatedPlanDTO);

	public void deletePlan(long planDetailsId);

	public MembershipPlanDetailsDTO getPlanById(long planDetailsId);

}
