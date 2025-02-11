package com.app.service;

import java.util.List;

import com.app.DTO.MachineDTO;
import com.app.DTO.ShowMachineDTO;

public interface MachineService {

	MachineDTO addMachine(MachineDTO machinedto);

	void deleteMachine(long machineId);

	

	List<ShowMachineDTO> getAllMachines();

	ShowMachineDTO getMachineById(long id);

	List<MachineDTO> getMachinesByTrainerId(long trainerId);

	MachineDTO updateMachineStatus(long machineId, String machineStatus);

	MachineDTO updateMachineStatust(long id, String machineStatus);

	

	

}
