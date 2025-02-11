package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.DTO.MembershipDetailsDTO;
import com.app.Entity.MembershipPlan;
import com.app.Entity.Trainner;

public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Long> {

	List<MembershipPlan> findByTrainer(Trainner trainer);

	   @Query("SELECT new com.app.DTO.MembershipDetailsDTO(m.membershipId, m.period, m.planname, m.startDate, m.trainer.name, m.totalPrice) " +
	           "FROM MembershipPlan m " +
	           "WHERE m.customer.customerId = :customerId")
	    List<MembershipDetailsDTO> findMembershipDetailsByCustomerId(@Param("customerId") long customerId);

}
