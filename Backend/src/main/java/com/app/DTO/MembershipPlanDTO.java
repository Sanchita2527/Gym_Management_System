package com.app.DTO;

import java.time.LocalDate;

import com.app.Entity.PlanName;

public class MembershipPlanDTO {

	private long membershipId;

	private long trainnerId;

	private long customerId;

	private PlanName planname;

	private LocalDate startDate;
	
	private double totalPrice;
	

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public long getMembershipId() {
		return membershipId;
	}

	public void setMembershipId(long membershipId) {
		this.membershipId = membershipId;
	}

	public long getTrainnerId() {
		return trainnerId;
	}

	public void setTrainnerId(long trainnerId) {
		this.trainnerId = trainnerId;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public PlanName getPlanname() {
		return planname;
	}

	public void setPlanname(PlanName planname) {
		this.planname = planname;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	
	
	

}
