package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Machine;

public interface MachineRepository extends JpaRepository<Machine, Long> {

	 List<Machine> findByTrainner_TrainnerId(long trainnerId);
	

}
