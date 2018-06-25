package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.service.VehicleTaskDetailsService;
import fr.drn.app.vma.domain.VehicleTaskDetails;
import fr.drn.app.vma.repository.VehicleTaskDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing VehicleTaskDetails.
 */
@Service
@Transactional
public class VehicleTaskDetailsServiceImpl implements VehicleTaskDetailsService {

    private final Logger log = LoggerFactory.getLogger(VehicleTaskDetailsServiceImpl.class);

    private final VehicleTaskDetailsRepository vehicleTaskDetailsRepository;

    public VehicleTaskDetailsServiceImpl(VehicleTaskDetailsRepository vehicleTaskDetailsRepository) {
        this.vehicleTaskDetailsRepository = vehicleTaskDetailsRepository;
    }

    /**
     * Save a vehicleTaskDetails.
     *
     * @param vehicleTaskDetails the entity to save
     * @return the persisted entity
     */
    @Override
    public VehicleTaskDetails save(VehicleTaskDetails vehicleTaskDetails) {
        log.debug("Request to save VehicleTaskDetails : {}", vehicleTaskDetails);
        return vehicleTaskDetailsRepository.save(vehicleTaskDetails);
    }

    /**
     * Get all the vehicleTaskDetails.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VehicleTaskDetails> findAll(Pageable pageable) {
        log.debug("Request to get all VehicleTaskDetails");
        return vehicleTaskDetailsRepository.findAll(pageable);
    }

    /**
     * Get one vehicleTaskDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VehicleTaskDetails findOne(Long id) {
        log.debug("Request to get VehicleTaskDetails : {}", id);
        return vehicleTaskDetailsRepository.findOne(id);
    }

    /**
     * Delete the vehicleTaskDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VehicleTaskDetails : {}", id);
        vehicleTaskDetailsRepository.delete(id);
    }
}
