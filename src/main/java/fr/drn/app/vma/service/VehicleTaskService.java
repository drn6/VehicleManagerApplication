package fr.drn.app.vma.service;

import fr.drn.app.vma.domain.VehicleTask;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

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

    VehicleTask addDriver(Long taskId, Long driverId);

    VehicleTask removeDriver(Long taskId, Long driverId);

    void sendMailNewTaskAvailable(Long id);

    /**
     * Get all the vehicleTasks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VehicleTask> findAll(Pageable pageable);

    /**
     * Get all the vehicleTasks with period.
     *
     * @param startDateTime start datetime
     * @param endDateTime   end datetime
     * @return the list of entities
     */
    List<VehicleTask> findAll(ZonedDateTime startDateTime, ZonedDateTime endDateTime);

    /**
     * Get tasks dashboard with period
     *
     * @param startDateTime
     * @param endDateTime
     * @return
     */
    Map<LocalDate, List<VehicleTask>> findAllTaskPerDays(ZonedDateTime startDateTime, ZonedDateTime endDateTime);

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
