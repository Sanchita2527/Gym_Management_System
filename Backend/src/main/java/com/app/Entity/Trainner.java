package com.app.Entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Trainner {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long trainnerId;

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

	@OneToMany(mappedBy = "trainner", cascade = CascadeType.ALL, orphanRemoval = true) // one trainner can have many
	 	@JsonIgnore																			// machine
	private List<Machine> machine;

	private String timeSlot; // trainner shift starting time

	public long getTrainnerId() {
		return trainnerId;
	}

	public void setTrainnerId(long trainnerId) {
		this.trainnerId = trainnerId;
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

	public List<Machine> getMachine() {
		return machine;
	}

	public void setMachine(List<Machine> machine) {
		this.machine = machine;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	

}
