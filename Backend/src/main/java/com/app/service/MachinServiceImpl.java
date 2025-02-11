package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.MachineDTO;
import com.app.DTO.ShowMachineDTO;
import com.app.Entity.Machine;
import com.app.Entity.Trainner;
import com.app.exception.ResourceNotFoundException;
import com.app.repository.MachineRepository;
import com.app.repository.TrainnerRepository;

@Service
@Transactional
public class MachinServiceImpl implements MachineService {

	@Autowired
	private ModelMapper modelmapper;

	@Autowired
	private TrainnerRepository trainnerRepository;

	@Autowired
	private MachineRepository machineRepository;

	@Override
	public MachineDTO addMachine(MachineDTO machineDTO) {
	    // Log the received MachineDTO to verify trainnerId
	    System.out.println("Received machineDTO: " + machineDTO);
	    
	    System.out.println("Received Trainer ID: " + machineDTO.getTrainnerId());
	    


	    // Check for available trainer
	    Trainner availableTrainer = trainnerRepository.findById(machineDTO.getTrainnerId())
	            .orElseThrow(() -> new IllegalArgumentException("Trainer not found"));

	    // Create new machine and assign the available trainer
	    Machine machine = new Machine();
	    machine.setName(machineDTO.getName());
	    machine.setPrice(machineDTO.getPrice());
	    machine.setMachineStatus(machineDTO.getMachineStatus());
	    machine.setTrainner(availableTrainer);

	    // Save the machine to the repository
	    Machine savedMachine = machineRepository.save(machine);

	    // Convert to DTO and return the saved machine
	    MachineDTO savedmachineDTO = modelmapper.map(savedMachine, MachineDTO.class);
	    // Set the trainerId in the saved DTO (make sure it's not the initial machineDTO)
	    savedmachineDTO.setTrainnerId(savedMachine.getTrainner().getTrainnerId());

	    System.out.println("Received Trainer ID: " + savedmachineDTO.getTrainnerId());

	    // Return the DTO with the correct trainerId
	    return savedmachineDTO;
	}



	@Override
	public void deleteMachine(long machineId) {
		// Check if machine exists
		if (!machineRepository.existsById(machineId)) {
			throw new EntityNotFoundException("Machine with ID " + machineId + " not found");
		}

		// Delete the machine by its ID
		machineRepository.deleteById(machineId);
	}

    @Override
    public MachineDTO updateMachineStatus(long machineId, String machineStatus) {
        // Find the machine by ID
        Machine machine = machineRepository.findById(machineId)
                .orElseThrow(() -> new EntityNotFoundException("Machine with ID " + machineId + " not found"));
        System.out.println("status :"+machineStatus);
        // Update the machine's availability status
        machine.setMachineStatus(machineStatus);

        // Save the updated machine
        Machine updatedMachine = machineRepository.save(machine);

        // Convert the updated machine entity to DTO and return it
        return modelmapper.map(updatedMachine, MachineDTO.class);
    }
    @Override
    public List<ShowMachineDTO> getAllMachines() {
        List<Machine> machines = machineRepository.findAll();  // Fetch all machines from the repository
        return machines.stream()
                .map(machine -> {
                    ShowMachineDTO dto = new ShowMachineDTO();
                    dto.setId(machine.getMachineId());
                    dto.setMachinename(machine.getName());
                    dto.setName(machine.getTrainner().getName());
                    dto.setPrice(machine.getPrice());
                    dto.setMachineStatus(machine.getMachineStatus());
                    return dto;  // Return the populated ShowMachineDTO
                })
                .collect(Collectors.toList());  // Collect the list of ShowMachineDTOs
    }

	@Override
	public ShowMachineDTO getMachineById(long id) {
		Optional<Machine> machine = machineRepository.findById(id);
		Machine machine1 = machine.get();
		ShowMachineDTO dto = new ShowMachineDTO();
        dto.setId(machine1.getMachineId());
        dto.setMachinename(machine1.getName());
        dto.setName(machine1.getTrainner().getName());
        dto.setPrice(machine1.getPrice());
        dto.setMachineStatus(machine1.getMachineStatus());
        return dto; 
	}

	@Override
	public List<MachineDTO> getMachinesByTrainerId(long trainerId) {
	    // Check if the trainer exists
	    Trainner trainner = trainnerRepository.findById(trainerId)
	            .orElseThrow(() -> new ResourceNotFoundException("Trainer not found for ID: " + trainerId));

	    // Retrieve machines associated with the trainer
	    List<Machine> machines = machineRepository.findByTrainner_TrainnerId(trainerId);

	    // If no machines are found, you might want to return an empty list or throw an exception
	    if (machines.isEmpty()) {
	        throw new ResourceNotFoundException("No machines found for Trainer ID: " + trainerId);
	    }

	    // Map Machine entities to MachineDTO
	    return machines.stream()
	            .map(machine -> {
	                MachineDTO dto = new MachineDTO();
	                dto.setMachineId(machine.getMachineId());
	                dto.setName(machine.getName());
	                dto.setTrainnerId(machine.getTrainner().getTrainnerId());
	                dto.setPrice(machine.getPrice());
	                dto.setMachineStatus(machine.getMachineStatus());
	                return dto;
	            })
	            .collect(Collectors.toList());
	}



		 @Override
		    public MachineDTO updateMachineStatust(long machineId, String machineStatus) {
		        // Find the machine by ID
		        Machine machine = machineRepository.findById(machineId)
		                .orElseThrow(() -> new EntityNotFoundException("Machine with ID " + machineId + " not found"));
		        System.out.println("status :"+machineStatus);
		        // Update the machine's availability status
		        machine.setMachineStatus(machineStatus);

		        // Save the updated machine
		        Machine updatedMachine = machineRepository.save(machine);

		        // Convert the updated machine entity to DTO and return it
		        return modelmapper.map(updatedMachine, MachineDTO.class);
		    }
	

	



}
