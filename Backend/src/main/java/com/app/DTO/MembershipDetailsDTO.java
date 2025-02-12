package com.app.DTO;

import java.time.LocalDate;

public class MembershipDetailsDTO {
    private long membershipId;
    private String period;
    private String planname;
    private LocalDate startDate;
    private String trainerName; // Trainer name instead of ID
    private double totalPrice;

    // Constructor
    public MembershipDetailsDTO(long membershipId, String period, String planname, LocalDate startDate, String trainerName, double totalPrice) {
        this.membershipId = membershipId;
        this.period = period;
        this.planname = planname;
        this.startDate = startDate;
        this.trainerName = trainerName;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public long getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(long membershipId) {
        this.membershipId = membershipId;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getPlanname() {
        return planname;
    }

    public void setPlanname(String planname) {
        this.planname = planname;
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

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}

