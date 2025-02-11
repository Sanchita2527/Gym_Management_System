package com.app.service;

import java.util.List;

import com.app.DTO.TrainnerDTO;

public interface TrainnerService {

	TrainnerDTO createTrainner(TrainnerDTO trainnerDTO);

	TrainnerDTO updateTrainner(Long id, TrainnerDTO trainnerDTO);

	TrainnerDTO getTrainnerById(Long id);

	List<TrainnerDTO> getAllTrainners();

	void deleteTrainner(Long id);

	List<TrainnerDTO> getTrainnersByTimeSlot(String timeSlot);

	//TrainnerDTO getTrainerByCustomerId(long customerId);

	
}
