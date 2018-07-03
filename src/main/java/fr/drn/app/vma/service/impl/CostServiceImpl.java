package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.domain.Cost;
import fr.drn.app.vma.repository.CostRepository;
import fr.drn.app.vma.service.CostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing Cost.
 */
@Service
@Transactional
public class CostServiceImpl implements CostService {

    private final Logger log = LoggerFactory.getLogger(CostServiceImpl.class);

    private final CostRepository costRepository;

    public CostServiceImpl(CostRepository costRepository) {
        this.costRepository = costRepository;
    }

    /**
     * Save a cost.
     *
     * @param cost the entity to save
     * @return the persisted entity
     */
    @Override
    public Cost save(Cost cost) {
        log.debug("Request to save Cost : {}", cost);
        return costRepository.save(cost);
    }

    /**
     * Get all the costs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Cost> findAll(Pageable pageable) {
        log.debug("Request to get all Costs");
        return costRepository.findAll(pageable);
    }

    /**
     * Get all the costs.
     *
     * @param taskId task id
     * @return the list of entities
     */
    @Override
    public List<Cost> findAllByTaskId(Long taskId) {
        return this.costRepository.findAllByVehicleTaskId(taskId);
    }

    /**
     * Get one cost by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Cost findOne(Long id) {
        log.debug("Request to get Cost : {}", id);
        return costRepository.findOne(id);
    }

    /**
     * Delete the cost by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cost : {}", id);
        costRepository.delete(id);
    }
}
