package com.app.service;

import java.util.List;

import com.app.DTO.CustomerDTO;
import com.app.DTO.MembershipDetailsDTO;
import com.app.Entity.MembershipPlan;

public interface MembershipPlanService {

	//List<MembershipPlanDTO> getCustomerByTrainnerId(long trainnerId);

	List<CustomerDTO> getCustomersByTrainerId(long trainerId);

	//MembershipPlan buyMembership(Long customerId, Long trainerId, PlanName planName);

	MembershipPlan buyMembership(Long customerId, Long trainerId, String planName, String period, double totalPrice);

//	MembershipPlanSummaryDTO getMembershipSummaryByCustomerId(long customerId);

	List<MembershipDetailsDTO> getMembershipDetailsByCustomerId(long customerId);

	//List<MembershipPlanDTO> getCustomersByTrainnerId(long trainnerId);

}
