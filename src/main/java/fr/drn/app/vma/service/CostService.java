package fr.drn.app.vma.service;

import fr.drn.app.vma.domain.Cost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

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
     * Get all the costs by task id.
     *
     * @param taskId task id
     * @return the list of entities
     */
    List<Cost> findAllByTaskId(Long taskId);

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
