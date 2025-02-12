package com.app.DTO;

public class MembershipPlanDetailsDTO {

	private long planDetailsId;
	
	private String planName;
	
	private double planPrice;


	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public double getPlanPrice() {
		return planPrice;
	}

	public void setPlanPrice(double planPrice) {
		this.planPrice = planPrice;
	}

	public long getPlanDetailsId() {
		return planDetailsId;
	}

	public void setPlanDetailsId(long planDetailsId) {
		this.planDetailsId = planDetailsId;
	}
	
	
}
