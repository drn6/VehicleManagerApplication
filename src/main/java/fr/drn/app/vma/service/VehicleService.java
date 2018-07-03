package fr.drn.app.vma.service;

import fr.drn.app.vma.domain.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;

/**
 * Service Interface for managing Vehicle.
 */
public interface VehicleService {

    /**
     * Save a vehicle.
     *
     * @param vehicle the entity to save
     * @return the persisted entity
     */
    Vehicle save(Vehicle vehicle);

    /**
     * Get all the vehicles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Vehicle> findAll(Pageable pageable);

    Page<Vehicle> findAll(ZonedDateTime startDateTime, ZonedDateTime endDateTime, Pageable pageable);

    /**
     * Get the "id" vehicle.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Vehicle findOne(Long id);

    /**
     * Delete the "id" vehicle.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
