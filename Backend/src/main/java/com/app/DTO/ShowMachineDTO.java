package com.app.DTO;

public class ShowMachineDTO {

	private long id;
	private String name;
	
	private String machinename;
	
	private double price;
	
	private String MachineStatus;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMachinename() {
		return machinename;
	}

	public void setMachinename(String machinename) {
		this.machinename = machinename;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}




	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public String getMachineStatus() {
		return MachineStatus;
	}

	public void setMachineStatus(String machineStatus) {
		MachineStatus = machineStatus;
	}
	
	
}
