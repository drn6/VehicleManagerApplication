package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.service.VehicleServiceCostService;
import fr.drn.app.vma.domain.VehicleServiceCost;
import fr.drn.app.vma.repository.VehicleServiceCostRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing VehicleServiceCost.
 */
@Service
@Transactional
public class VehicleServiceCostServiceImpl implements VehicleServiceCostService {

    private final Logger log = LoggerFactory.getLogger(VehicleServiceCostServiceImpl.class);

    private final VehicleServiceCostRepository vehicleServiceCostRepository;

    public VehicleServiceCostServiceImpl(VehicleServiceCostRepository vehicleServiceCostRepository) {
        this.vehicleServiceCostRepository = vehicleServiceCostRepository;
    }

    /**
     * Save a vehicleServiceCost.
     *
     * @param vehicleServiceCost the entity to save
     * @return the persisted entity
     */
    @Override
    public VehicleServiceCost save(VehicleServiceCost vehicleServiceCost) {
        log.debug("Request to save VehicleServiceCost : {}", vehicleServiceCost);
        return vehicleServiceCostRepository.save(vehicleServiceCost);
    }

    /**
     * Get all the vehicleServiceCosts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VehicleServiceCost> findAll(Pageable pageable) {
        log.debug("Request to get all VehicleServiceCosts");
        return vehicleServiceCostRepository.findAll(pageable);
    }

    /**
     * Get one vehicleServiceCost by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VehicleServiceCost findOne(Long id) {
        log.debug("Request to get VehicleServiceCost : {}", id);
        return vehicleServiceCostRepository.findOne(id);
    }

    /**
     * Delete the vehicleServiceCost by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VehicleServiceCost : {}", id);
        vehicleServiceCostRepository.delete(id);
    }
}
