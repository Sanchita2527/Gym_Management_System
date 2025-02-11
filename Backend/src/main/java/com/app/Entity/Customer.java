package com.app.Entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long customerId;

	@NotBlank(message = "Email is mandatory")
	@NotNull
	@Email
	private String email;

	@NotBlank(message = "Password is mandatory")
	@NotNull
	private String password;

	@NotNull
	private String contact;
	@NotNull
	private String name;
	@NotNull
	private String gender;

	@Enumerated(EnumType.STRING)
	private Role role; // ENUM ROLE_MEMBER, ROLE_ADMIN, ROLE_TRAINER

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Payment> payments; // Each customer can have multiple payments

	@OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<MembershipPlan> memberships;

	public List<MembershipPlan> getMemberships() {
		return memberships;
	}

	public void setMemberships(List<MembershipPlan> memberships) {
		this.memberships = memberships;
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public List<Payment> getPayments() {
		return payments;
	}

	public void setPayments(List<Payment> payments) {
		this.payments = payments;
	}

	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", email=" + email + ", password=" + password + ", contact="
				+ contact + ", name=" + name + ", gender=" + gender + ", role=" + role + ", payments=" + payments + "]";
	}

	public long getId() {
		// TODO Auto-generated method stub
		return customerId;
	}


	
	

}
