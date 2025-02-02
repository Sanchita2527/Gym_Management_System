package com.app.DTO;

public class MachineDTO {

	private long machineId;

	private long trainnerId;

	private boolean status;

	private String name;

	private double price;

	public long getMachineId() {
		return machineId;
	}

	public void setMachineId(long machineId) {
		this.machineId = machineId;
	}

	public long getTrainnerId() {
		return trainnerId;
	}

	public void setTrainnerId(long trainnerId) {
		this.trainnerId = trainnerId;
	}



	public boolean isAvailable() {
		return status;
	}

	public void setAvailable(boolean isAvailable) {
		this.status = isAvailable;
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
