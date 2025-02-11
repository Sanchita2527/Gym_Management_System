package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.DietPlan;

public interface DietPlanRepo extends JpaRepository<DietPlan,Long> {

	DietPlan findByName(String filename);

}
