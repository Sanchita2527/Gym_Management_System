package com.app.service;

import com.app.Entity.DietPlan;

public interface DietPlanService {

	DietPlan saveDietPlan(DietPlan dietplan);

	DietPlan findfile(String filename);

}