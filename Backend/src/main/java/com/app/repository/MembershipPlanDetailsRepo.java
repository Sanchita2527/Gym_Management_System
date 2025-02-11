package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.MembershipPlanDetails;

public interface MembershipPlanDetailsRepo extends JpaRepository<MembershipPlanDetails, Long> {

}
