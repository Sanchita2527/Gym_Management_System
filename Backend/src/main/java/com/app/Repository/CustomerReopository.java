package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.Entity.Customer;
@Repository
public interface CustomerReopository extends JpaRepository<Customer, Long> {

	Optional<Customer>  findByEmail(String email);

}
