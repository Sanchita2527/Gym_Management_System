package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.DTO.TrainnerDTO;
import com.app.Entity.Role;
import com.app.Entity.Trainner;
import com.app.repository.TrainnerRepository;

@Service
public class TrainnerServiceImpl implements TrainnerService {

	
	@Autowired
	private PasswordEncoder passwordEncode;
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TrainnerRepository trainnerRepo;

	@Override
	public TrainnerDTO createTrainner(TrainnerDTO trainnerDTO) {
		// Map DTO to entity
		Trainner trainner = modelMapper.map(trainnerDTO, Trainner.class);

		// Set default role for the trainner
		trainner.setRole(Role.ROLE_TRAINER);

		// Save the trainner
		Trainner savedTrainner = trainnerRepo.save(trainner);

		// Map back to DTO and return
		return modelMapper.map(savedTrainner, TrainnerDTO.class);
	}

	@Override
	public TrainnerDTO updateTrainner(Long id, TrainnerDTO trainnerDTO) {
		// Fetch existing trainner
		Trainner trainner = trainnerRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Trainner with ID " + id + " not found"));

		// Map DTO fields to the existing trainner entity
		trainner.setContact(trainnerDTO.getContact());
		trainner.setEmail(trainnerDTO.getEmail());
		trainner.setGender(trainnerDTO.getGender());
		trainner.setName(trainnerDTO.getName());
		trainner.setPassword(passwordEncode.encode(trainnerDTO.getPassword()));
		trainner.setTimeSlot(trainnerDTO.getTimeSlot());
		//trainner.setRole(Role.ROLE_TRAINER);
		// Save the updated trainner
		Trainner updatedTrainner = trainnerRepo.save(trainner);

		// Map back to DTO and return
		return modelMapper.map(updatedTrainner, TrainnerDTO.class);
	}

	@Override
	public TrainnerDTO getTrainnerById(Long id) {
		// Fetch trainner by ID
		Trainner trainner = trainnerRepo.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Trainner with ID " + id + " not found"));

		// Map to DTO and return
		return modelMapper.map(trainner, TrainnerDTO.class);
	}

	@Override
	public List<TrainnerDTO> getAllTrainners() {
		// Fetch all trainners
		List<Trainner> trainners = trainnerRepo.findAll();

		// Map each trainner to DTO
		return trainners.stream().map(trainner -> modelMapper.map(trainner, TrainnerDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public void deleteTrainner(Long id) {
		// Check if trainner exists
		if (!trainnerRepo.existsById(id)) {
			throw new EntityNotFoundException("Trainner with ID " + id + " not found");
		}

		// Delete trainner
		trainnerRepo.deleteById(id);
	}
	
	public List<TrainnerDTO> getTrainnersByTimeSlot(String timeSlot) {
	    // Fetch all trainers by their timeSlot
	    List<Trainner> trainners = trainnerRepo.findByTimeSlot(timeSlot);

	    if (trainners.isEmpty()) {
	        throw new EntityNotFoundException("No trainners found for time slot " + timeSlot);
	    }

	    return trainners.stream()
	            .map(trainner -> modelMapper.map(trainner, TrainnerDTO.class)) // Convert to DTO
	            .collect(Collectors.toList());  // Return list of TrainnerDTOs
	}
//	public TrainnerDTO getTrainerByCustomerId(long customerId) {
//        // Find the trainer by customer ID and handle cases where it is not found
//        Trainner trainer = trainnerRepo.findByCustomerId(customerId);
//        if (trainer == null) {
//            throw new ResourceNotFoundException("No trainer found for customerId: " + customerId);
//        }
//        return convertEntityToDTO(trainer);
//    }
//
//    private TrainnerDTO convertEntityToDTO(Trainner trainer) {
//        // Convert Trainer entity to TrainnerDTO
//        TrainnerDTO dto = new TrainnerDTO();
//        dto.setTrainnerId(trainer.getTrainnerId());
//        dto.setEmail(trainer.getEmail());
//        dto.setPassword(trainer.getPassword());
//        dto.setContact(trainer.getContact());
//        dto.setName(trainer.getName());
//        dto.setGender(trainer.getGender());
//        dto.setTimeSlot(trainer.getTimeSlot());
//        return dto;
//    }

}
