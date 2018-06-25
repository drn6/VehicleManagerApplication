package fr.drn.app.vma.service;

import fr.drn.app.vma.domain.VehicleServiceCost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing VehicleServiceCost.
 */
public interface VehicleServiceCostService {

    /**
     * Save a vehicleServiceCost.
     *
     * @param vehicleServiceCost the entity to save
     * @return the persisted entity
     */
    VehicleServiceCost save(VehicleServiceCost vehicleServiceCost);

    /**
     * Get all the vehicleServiceCosts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<VehicleServiceCost> findAll(Pageable pageable);

    /**
     * Get the "id" vehicleServiceCost.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VehicleServiceCost findOne(Long id);

    /**
     * Delete the "id" vehicleServiceCost.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
