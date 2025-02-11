package com.app.service;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.Entity.Customer;
import com.app.Entity.Trainner;

import lombok.ToString;

@SuppressWarnings("serial")
@ToString
public class TrainerUserDetails implements UserDetails {
	 private Trainner trainer;

	 public TrainerUserDetails(Trainner trainner) {
		    if (trainner == null) {
		        throw new IllegalArgumentException("Trainer cannot be null");
		    }
		    this.trainer = trainner;
		}


	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        return Arrays.asList(new SimpleGrantedAuthority(trainer.getRole().name()));
	    }

	    @Override
	    public String getPassword() {
	        return trainer.getPassword();
	    }

	    @Override
	    public String getUsername() {
	        return trainer.getEmail();
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    public Long getId() {
	        return trainer.getTrainnerId();
	    }

	    public String getName() {
	        return trainer.getName();
	    }

	    public String getRole() {
	        return trainer.getRole().name();
	    }
}
