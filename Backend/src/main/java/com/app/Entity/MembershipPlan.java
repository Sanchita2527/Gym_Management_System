package com.app.Entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Id;

@Entity
public class MembershipPlan {

	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private long membershipId;

	    @ManyToOne
	    @JoinColumn(name = "customer_Id", nullable = false) // Foreign key to Customer
	    private Customer customer; // Each membership plan is associated with one customer
	    
	    @ManyToOne
	    @JoinColumn(name = "trainer_id", nullable = false) // Foreign key to Trainer
	    private Trainner trainer; // Each membership plan is associated with one trainer


	   // @Enumerated(EnumType.STRING) // ENUM PLATINUM, GOLD, SILVER
	    private String planname;

	    private LocalDate startDate; // membership starting date 
	   // private LocalDate endDate;   // membership ending date 
	    
	    private String period;
	    
	    private double totalPrice;
	 

		public long getMembershipId() {
			return membershipId;
		}

		public void setMembershipId(long membershipId) {
			this.membershipId = membershipId;
		}

		public Customer getCustomer() {
			return customer;
		}

		public void setCustomer(Customer customer) {
			this.customer = customer;
		}

		public Trainner getTrainer() {
			return trainer;
		}

		public void setTrainer(Trainner trainer) {
			this.trainer = trainer;
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

		public String getPeriod() {
			return period;
		}

		public void setPeriod(String period) {
			this.period = period;
		}

		public double getTotalPrice() {
			return totalPrice;
		}

		public void setTotalPrice(double totalPrice) {
			this.totalPrice = totalPrice;
		}

		@Override
		public String toString() {
			return "MembershipPlan [membershipId=" + membershipId + ", customer=" + customer + ", trainer=" + trainer
					+ ", planname=" + planname + ", startDate=" + startDate + ", period=" + period + ", totalPrice="
					+ totalPrice + "]";
		}
	    
	    

}
