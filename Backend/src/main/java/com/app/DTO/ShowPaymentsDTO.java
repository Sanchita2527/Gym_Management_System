package com.app.DTO;

import java.time.LocalDate;

public class ShowPaymentsDTO {

	private LocalDate paymentDate;
	
	private String name;
	
	private double totalamount;

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getTotalamount() {
		return totalamount;
	}

	public void setTotalamount(double totalamount) {
		this.totalamount = totalamount;
	}
	
}
