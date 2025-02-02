package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Machine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long machineId;

	@ManyToOne
	@JoinColumn(name = "trainner_Id", nullable = false)
	
	private Trainner trainner;

	private boolean isAvailable;
	@NotNull
	private String name;
	@NotNull
	private double price;
	public long getMachineId() {
		return machineId;
	}
	public void setMachineId(long machineId) {
		this.machineId = machineId;
	}
	public Trainner getTrainner() {
		return trainner;
	}
	public void setTrainner(Trainner trainner) {
		this.trainner = trainner;
	}
	public boolean isAvailable() {
		return isAvailable;
	}
	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	

}
