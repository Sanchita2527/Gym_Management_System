package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class DietPlan 
{
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;

	    private String type;

	    @Lob
	    private byte[] data;

	    public DietPlan() {
	    }

	    public DietPlan(String name, String type, byte[] data) {
	        this.name = name;
	        this.type = type;
	        this.data = data;
	    }

	    // Getters and Setters
	    public Long getId() {
	        return id;
	    }

	    public String getName() {
	        return name;
	    }

	    public String getType() {
	        return type;
	    }

	    public byte[] getData() {
	        return data;
	    }
}
