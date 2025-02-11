package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Trainner;

public interface TrainnerRepository extends JpaRepository<Trainner, Long> {

	List<Trainner> findByTimeSlot(String timeSlot);

	Optional<Trainner> findByEmail(String username);

//	Trainner findByCustomerId(long customerId);

	

}
