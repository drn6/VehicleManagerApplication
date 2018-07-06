package fr.drn.app.vma.service.impl;

import fr.drn.app.vma.domain.Driver;
import fr.drn.app.vma.domain.User;
import fr.drn.app.vma.domain.VehicleTask;
import fr.drn.app.vma.repository.DriverRepository;
import fr.drn.app.vma.repository.UserRepository;
import fr.drn.app.vma.repository.VehicleTaskRepository;
import fr.drn.app.vma.security.AuthoritiesConstants;
import fr.drn.app.vma.security.SecurityUtils;
import fr.drn.app.vma.service.MailService;
import fr.drn.app.vma.service.VehicleTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


/**
 * Service Implementation for managing VehicleTask.
 */
@Service
@Transactional
public class VehicleTaskServiceImpl implements VehicleTaskService {

    private final Logger log = LoggerFactory.getLogger(VehicleTaskServiceImpl.class);

    private static final Integer PAGE_SIZE = 100;
    private final VehicleTaskRepository vehicleTaskRepository;
    private final DriverRepository driverRepository;
    private final UserRepository userRepository;
    private final MailService mailService;

    public VehicleTaskServiceImpl(VehicleTaskRepository vehicleTaskRepository, DriverRepository driverRepository, UserRepository userRepository, MailService mailService) {
        this.vehicleTaskRepository = vehicleTaskRepository;
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    /**
     * Save a vehicleTask.
     *
     * @param vehicleTask the entity to save
     * @return the persisted entity
     */
    @Override
    public VehicleTask save(VehicleTask vehicleTask) {
        log.debug("Request to save VehicleTask : {}", vehicleTask);
        vehicleTask = vehicleTaskRepository.save(vehicleTask);
        return vehicleTask;
    }

    public void sendMailNewTaskAvailable(Long id) {
        log.debug("Request to sendMailNewTaskAvailable VehicleTask : {}", id);
        VehicleTask vehicleTask = vehicleTaskRepository.findOneWithEagerRelationships(id);
        if (vehicleTask != null) {
            sendMailNewTaskAvailable(vehicleTask);
        }
    }

    @Async
    private void sendMailNewTaskAvailable(VehicleTask vehicleTask) {
        Page<User> allActivatedUser = null;
        List<String> allAdresseEmail = new ArrayList<>();
        int pageNumber = 0;
        do {
            allActivatedUser = userRepository.findAllByActivated(true, new PageRequest(pageNumber, PAGE_SIZE));
            allAdresseEmail.addAll(allActivatedUser.getContent().stream().map(u -> u.getEmail()).collect(Collectors.toList()));
            pageNumber++;
        } while (allActivatedUser.hasNext());
        String[] emailAddress = new String[allAdresseEmail.size()];
        allAdresseEmail.toArray(emailAddress);
        mailService.sendMailNewTaskAvailable(vehicleTask, emailAddress);
    }

    /**
     * Get all the vehicleTasks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<VehicleTask> findAll(Pageable pageable) {
        log.debug("Request to get all VehicleTasks");
        return vehicleTaskRepository.findAll(pageable);
    }

    /**
     * Get all the vehicles with star and end date
     *
     * @param startDateTime of vehicles
     * @param endDateTime   of vehicles
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<VehicleTask> findAll(ZonedDateTime startDateTime, ZonedDateTime endDateTime) {
        log.debug("Request to get all VehicleTasks with start {} and end {} datetime.", startDateTime, endDateTime);
        return vehicleTaskRepository.findAllByStartDateTimeGreaterThanEqualAndEndDateTimeLessThanEqual(startDateTime, endDateTime);
    }

    @Transactional(readOnly = true)
    public Map<LocalDate, List<VehicleTask>> findAllTaskPerDays(ZonedDateTime startDateTime, ZonedDateTime endDateTime) {
        log.debug("Request to get all VehicleTasks with start {} and end {} datetime.", startDateTime, endDateTime);
        List<VehicleTask> tasks = findAll(startDateTime, endDateTime);
        long numOfDaysBetween = ChronoUnit.DAYS.between(startDateTime, endDateTime);
        List<LocalDate> days = IntStream.iterate(0, i -> i + 1)
            .limit(numOfDaysBetween)
            .mapToObj(i -> startDateTime.toLocalDate().plusDays(i))
            .collect(Collectors.toList());
        Map<LocalDate, List<VehicleTask>> tasksPerDays = new TreeMap<>();
        for (LocalDate day : days) {
            List<VehicleTask> collect = tasks.stream()
                .filter(t -> (t.getStartDateTime().toLocalDate().toEpochDay() == day.toEpochDay()))
                .collect(Collectors.toList());
            tasksPerDays.put(day, collect);
        }

        return tasksPerDays;
    }


    /**
     * Get one vehicleTask by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VehicleTask findOne(Long id) {
        log.debug("Request to get VehicleTask : {}", id);
        return vehicleTaskRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public VehicleTask addDriver(Long taskId, Long driverId) {
        VehicleTask vt = vehicleTaskRepository.findOneWithEagerRelationships(taskId);
        Driver d = driverRepository.findOne(driverId);
        if (vt != null && d != null) {
            Set<Driver> drivers = vt.getDrivers();
            boolean allowToAdd = allowToUpdateUser(d.getEmail().toLowerCase());
            log.debug("AllowToUpdate to addDriver: {}", allowToAdd);
            if (allowToAdd && drivers != null && drivers.size() < vt.getMaxDrivers()) {
                vt = vt.addDriver(d);
                return save(vt);
            }
        }
        return null;
    }

    /**
     * Return true if user allow to add user
     *
     * @return
     */
    private Boolean allowToUpdateUser(String email) {
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneWithAuthoritiesByLogin);
        if (user.isPresent()) {
            List<String> authorities = user.get().getAuthorities().stream().map(authority -> authority.getName()).collect(Collectors.toList());
            return (authorities.contains(AuthoritiesConstants.ADMIN)) ? true : user.get().getEmail() != null && user.get().getEmail().toLowerCase().equals(email);
        }
        return false;
    }


    @Override
    public VehicleTask removeDriver(Long taskId, Long driverId) {
        VehicleTask vt = vehicleTaskRepository.findOneWithEagerRelationships(taskId);
        Driver d = driverRepository.findOne(driverId);
        if (vt != null && d != null) {
            Set<Driver> drivers = vt.getDrivers();
            boolean allowToAdd = allowToUpdateUser(d.getEmail().toLowerCase());
            log.debug("AllowToUpdate to removeDriver: {}", allowToAdd);
            if (allowToAdd && drivers != null && !drivers.isEmpty()) {
                vt = vt.removeDriver(d);
                return save(vt);
            }
        }
        return null;
    }

    /**
     * Delete the vehicleTask by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete VehicleTask : {}", id);
        vehicleTaskRepository.delete(id);
    }
}
