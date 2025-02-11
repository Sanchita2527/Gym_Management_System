package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.DietPlan;
import com.app.repository.DietPlanRepo;


@Service
@Transactional
public class DietPlanServiceImpl implements DietPlanService {

	@Autowired
	private DietPlanRepo drepo;

	@Override
	public DietPlan saveDietPlan(DietPlan dietplan) {
		return drepo.save(dietplan);
		
	}

	@Override
	public DietPlan findfile(String filename) {
		
		return drepo.findByName(filename);
	}
}
