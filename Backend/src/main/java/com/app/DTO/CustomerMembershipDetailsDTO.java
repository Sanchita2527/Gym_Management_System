package com.app.DTO;

import java.time.LocalDate;

public class CustomerMembershipDetailsDTO {
    private long customerId;
    private String name;
    private String mobileNumber;
    private String email;
    private String gender;
    private long membershipId;
    private String membership;
    private String period;
    private LocalDate startDate;
  //  private LocalDate endDate;
    private String trainerName;
	public CustomerMembershipDetailsDTO(long customerId, String name, String mobileNumber, String email, String gender,
			long membershipId, String membership, String period, LocalDate startDate, String trainerName) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.mobileNumber = mobileNumber;
		this.email = email;
		this.gender = gender;
		this.membershipId = membershipId;
		this.membership = membership;
		this.period = period;
		this.startDate = startDate;
		this.trainerName = trainerName;
	}
	public long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public long getMembershipId() {
		return membershipId;
	}
	public void setMembershipId(long membershipId) {
		this.membershipId = membershipId;
	}
	public String getMembership() {
		return membership;
	}
	public void setMembership(String membership) {
		this.membership = membership;
	}
	public String getPeriod() {
		return period;
	}
	public void setPeriod(String period) {
		this.period = period;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public String getTrainerName() {
		return trainerName;
	}
	public void setTrainerName(String trainerName) {
		this.trainerName = trainerName;
	}

   
}