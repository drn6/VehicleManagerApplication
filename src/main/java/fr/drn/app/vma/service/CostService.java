package fr.drn.app.vma.service;

import fr.drn.app.vma.domain.Cost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Cost.
 */
public interface CostService {

    /**
     * Save a cost.
     *
     * @param cost the entity to save
     * @return the persisted entity
     */
    Cost save(Cost cost);

    /**
     * Get all the costs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Cost> findAll(Pageable pageable);

    /**
     * Get the "id" cost.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Cost findOne(Long id);

    /**
     * Delete the "id" cost.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
