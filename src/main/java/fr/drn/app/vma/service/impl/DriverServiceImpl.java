package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.service.DriverService;
import fr.drn.app.vma.domain.Driver;
import fr.drn.app.vma.repository.DriverRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Driver.
 */
@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    private final Logger log = LoggerFactory.getLogger(DriverServiceImpl.class);

    private final DriverRepository driverRepository;

    public DriverServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    /**
     * Save a driver.
     *
     * @param driver the entity to save
     * @return the persisted entity
     */
    @Override
    public Driver save(Driver driver) {
        log.debug("Request to save Driver : {}", driver);
        return driverRepository.save(driver);
    }

    /**
     * Get all the drivers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Driver> findAll(Pageable pageable) {
        log.debug("Request to get all Drivers");
        return driverRepository.findAll(pageable);
    }

    /**
     * Get one driver by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Driver findOne(Long id) {
        log.debug("Request to get Driver : {}", id);
        return driverRepository.findOne(id);
    }

    /**
     * Delete the driver by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Driver : {}", id);
        driverRepository.delete(id);
    }
}
