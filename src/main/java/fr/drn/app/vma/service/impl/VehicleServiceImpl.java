package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.domain.Vehicle;
import fr.drn.app.vma.repository.VehicleRepository;
import fr.drn.app.vma.service.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Vehicle.
 */
@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {

    private final Logger log = LoggerFactory.getLogger(VehicleServiceImpl.class);

    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    /**
     * Save a vehicle.
     *
     * @param vehicle the entity to save
     * @return the persisted entity
     */
    @Override
    public Vehicle save(Vehicle vehicle) {
        log.debug("Request to save Vehicle : {}", vehicle);
        return vehicleRepository.save(vehicle);
    }

    /**
     * Get all the vehicles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Vehicle> findAll(Pageable pageable) {
        log.debug("Request to get all Vehicles");
        return vehicleRepository.findAll(pageable);
    }

    /**
     * Get all the vehicles with star and end date
     *
     * @param startDateTime of vehicles
     * @param endDateTime   of vehicles
     * @return the list of entities
     */

    @Transactional(readOnly = true)
    public Page<Vehicle> findAll(ZonedDateTime startDateTime, ZonedDateTime endDateTime, Pageable pageable) {
        log.debug("Request to get all Vehicles with start {} and end {} datetime.", startDateTime, endDateTime);
        List<Vehicle> list = vehicleRepository.findAllByTasksStartDateTimeLessThanEqualAndTasksEndDateTimeGreaterThanEqual(startDateTime, endDateTime);
        if (list.size() > 0) {
            List<Long> listOfIds = list.stream().map(v -> v.getId()).collect(Collectors.toList());
            return vehicleRepository.findAllByIdNotIn(listOfIds, pageable);
        }
        return vehicleRepository.findAll(pageable);
    }

    /**
     * Get one vehicle by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Vehicle findOne(Long id) {
        log.debug("Request to get Vehicle : {}", id);
        return vehicleRepository.findOne(id);
    }

    /**
     * Delete the vehicle by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Vehicle : {}", id);
        vehicleRepository.delete(id);
    }
}
