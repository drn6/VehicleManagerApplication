package fr.drn.app.vma.service;

import fr.drn.app.vma.domain.VehicleTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing VehicleTask.
 */
public interface VehicleTaskService {

    /**
     * Save a vehicleTask.
     *
     * @param vehicleTask the entity to save
     * @return the persisted entity
     */
    VehicleTask save(VehicleTask vehicleTask);

    /**
     * Get all the vehicleTasks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VehicleTask> findAll(Pageable pageable);

    /**
     * Get the "id" vehicleTask.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VehicleTask findOne(Long id);

    /**
     * Delete the "id" vehicleTask.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
