package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MembershipPlanDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long planDetailsId;

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

	public Long getPlanDetailsId() {
		return planDetailsId;
	}

	public void setPlanDetailsId(Long planDetailsId) {
		this.planDetailsId = planDetailsId;
	}

	
	
	
}
