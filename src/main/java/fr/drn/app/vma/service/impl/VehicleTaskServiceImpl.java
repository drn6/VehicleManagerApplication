package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.service.VehicleTaskService;
import fr.drn.app.vma.domain.VehicleTask;
import fr.drn.app.vma.repository.VehicleTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing VehicleTask.
 */
@Service
@Transactional
public class VehicleTaskServiceImpl implements VehicleTaskService {

    private final Logger log = LoggerFactory.getLogger(VehicleTaskServiceImpl.class);

    private final VehicleTaskRepository vehicleTaskRepository;

    public VehicleTaskServiceImpl(VehicleTaskRepository vehicleTaskRepository) {
        this.vehicleTaskRepository = vehicleTaskRepository;
    }

    /**
     * Save a vehicleTask.
     *
     * @param vehicleTask the entity to save
     * @return the persisted entity
     */
    @Override
    public VehicleTask save(VehicleTask vehicleTask) {
        log.debug("Request to save VehicleTask : {}", vehicleTask);
        return vehicleTaskRepository.save(vehicleTask);
    }

    /**
     * Get all the vehicleTasks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VehicleTask> findAll(Pageable pageable) {
        log.debug("Request to get all VehicleTasks");
        return vehicleTaskRepository.findAll(pageable);
    }

    /**
     * Get one vehicleTask by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VehicleTask findOne(Long id) {
        log.debug("Request to get VehicleTask : {}", id);
        return vehicleTaskRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the vehicleTask by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VehicleTask : {}", id);
        vehicleTaskRepository.delete(id);
    }
}
