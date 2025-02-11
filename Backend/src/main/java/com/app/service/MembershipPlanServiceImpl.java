package com.app.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.CustomerDTO;
import com.app.DTO.MembershipDetailsDTO;
import com.app.Entity.Customer;
import com.app.Entity.MembershipPlan;
import com.app.Entity.Trainner;
import com.app.repository.CustomerReopository;
import com.app.repository.MembershipPlanRepository;
import com.app.repository.TrainnerRepository;
@Service
@Transactional
public class MembershipPlanServiceImpl implements MembershipPlanService {
	@Autowired
    private TrainnerRepository trainnerRepository;

    @Autowired
    private MembershipPlanRepository membershipPlanRepository;
    
    @Autowired
    private CustomerReopository customerReopository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CustomerDTO> getCustomersByTrainerId(long trainerId) {
        Trainner trainer = trainnerRepository.findById(trainerId)
                .orElseThrow(() -> new EntityNotFoundException("Trainer with ID " + trainerId + " not found"));

        List<MembershipPlan> membershipPlans = membershipPlanRepository.findByTrainer(trainer);

        List<Customer> customers = membershipPlans.stream()
                .map(MembershipPlan::getCustomer)
                .distinct()
                .collect(Collectors.toList());

        return customers.stream()
                .map(customer -> modelMapper.map(customer, CustomerDTO.class))
                .collect(Collectors.toList());
    }

//   

	@Override
	public MembershipPlan buyMembership(Long customerId, Long trainerId, String planName, String period,double totalPrice) {
		Customer customer = customerReopository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        Trainner trainer = trainnerRepository.findById(trainerId)
                .orElseThrow(() -> new IllegalArgumentException("Trainer not found"));

        // Create a new membership plan
        MembershipPlan membershipPlan = new MembershipPlan();
        membershipPlan.setCustomer(customer);
        membershipPlan.setTrainer(trainer);
        membershipPlan.setPlanname(planName);
        membershipPlan.setPeriod(period);
        membershipPlan.setStartDate(LocalDate.now());
        membershipPlan.setTotalPrice(totalPrice);

        // Save to the database
        MembershipPlan savedmember= membershipPlanRepository.save(membershipPlan);
        return savedmember;
	}
	
	 public List<MembershipDetailsDTO> getMembershipDetailsByCustomerId(long customerId) {
	        return membershipPlanRepository.findMembershipDetailsByCustomerId(customerId);
	    }

	

}
