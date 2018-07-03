package fr.drn.app.vma.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.drn.app.vma.domain.VehicleTask;
import fr.drn.app.vma.security.AuthoritiesConstants;
import fr.drn.app.vma.service.VehicleTaskService;
import fr.drn.app.vma.web.rest.errors.BadRequestAlertException;
import fr.drn.app.vma.web.rest.util.HeaderUtil;
import fr.drn.app.vma.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing VehicleTask.
 */
@RestController
@RequestMapping("/api")
public class VehicleTaskResource {

    private final Logger log = LoggerFactory.getLogger(VehicleTaskResource.class);

    private static final String ENTITY_NAME = "vehicleTask";

    private final VehicleTaskService vehicleTaskService;

    public VehicleTaskResource(VehicleTaskService vehicleTaskService) {
        this.vehicleTaskService = vehicleTaskService;
    }


    @GetMapping("/vehicle-tasks/dashboard")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Map<LocalDate, List<VehicleTask>>> createVehicleTask(@RequestParam(defaultValue = "", required = false) LocalDateTime startDateTime, @RequestParam(defaultValue = "", required = false) LocalDateTime endDateTime) throws URISyntaxException {
        log.debug("REST request to save VehicleTask dashboard : {}", startDateTime, endDateTime);
        if (startDateTime == null || endDateTime == null) {
            throw new BadRequestAlertException("Error to parse date", ENTITY_NAME, "parse-date");
        }
        Map<LocalDate, List<VehicleTask>> result = vehicleTaskService.findAllTaskPerDays(startDateTime.atZone(ZoneId.systemDefault()), endDateTime.atZone(ZoneId.systemDefault()));

        return ResponseEntity.ok()
            .body(result);
    }

    /**
     * POST  /vehicle-tasks : Create a new vehicleTask.
     *
     * @param vehicleTask the vehicleTask to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vehicleTask, or with status 400 (Bad Request) if the vehicleTask has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehicle-tasks")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTask> createVehicleTask(@Valid @RequestBody VehicleTask vehicleTask) throws URISyntaxException {
        log.debug("REST request to save VehicleTask : {}", vehicleTask);
        if (vehicleTask.getId() != null) {
            throw new BadRequestAlertException("A new vehicleTask cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleTask result = vehicleTaskService.save(vehicleTask);
        return ResponseEntity.created(new URI("/api/vehicle-tasks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehicle-tasks : Updates an existing vehicleTask.
     *
     * @param vehicleTask the vehicleTask to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleTask,
     * or with status 400 (Bad Request) if the vehicleTask is not valid,
     * or with status 500 (Internal Server Error) if the vehicleTask couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-tasks")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTask> updateVehicleTask(@Valid @RequestBody VehicleTask vehicleTask) throws URISyntaxException {
        log.debug("REST request to update VehicleTask : {}", vehicleTask);
        if (vehicleTask.getId() == null) {
            return createVehicleTask(vehicleTask);
        }
        VehicleTask result = vehicleTaskService.save(vehicleTask);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicleTask.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehicle-tasks : Add driver
     *
     * @param taskId   the vehicleTask id to update
     * @param driverId the vehicleTask add driver id
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleTask,
     * or with status 400 (Bad Request) if the vehicleTask is not valid,
     * or with status 500 (Internal Server Error) if the vehicleTask couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-tasks/{taskId}/addDriver/{driverId}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTask> vehicleTaskAddDriver(@PathVariable Long taskId, @PathVariable Long driverId) throws URISyntaxException {
        log.debug("REST request to update vehicleTaskAddDriver : {} driver id:{}", taskId, driverId);
        VehicleTask result = vehicleTaskService.addDriver(taskId, driverId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

    /**
     * PUT  /vehicle-tasks : Add driver
     *
     * @param taskId   the vehicleTask id to update
     * @param driverId the vehicleTask add driver id
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleTask,
     * or with status 400 (Bad Request) if the vehicleTask is not valid,
     * or with status 500 (Internal Server Error) if the vehicleTask couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-tasks/{taskId}/removeDriver/{driverId}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTask> vehicleTaskRemoveDriver(@PathVariable Long taskId, @PathVariable Long driverId) throws URISyntaxException {
        log.debug("REST request to vehicleTaskRemoveDriver : {} driver id:{}", taskId, driverId);
        VehicleTask result = vehicleTaskService.removeDriver(taskId, driverId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

    /**
     * GET  /vehicle-tasks : get all the vehicleTasks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleTasks in body
     */
    @GetMapping("/vehicle-tasks")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<VehicleTask>> getAllVehicleTasks(Pageable pageable) {
        log.debug("REST request to get a page of VehicleTasks");
        Page<VehicleTask> page = vehicleTaskService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicle-tasks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /vehicle-tasks/:id : get the "id" vehicleTask.
     *
     * @param id the id of the vehicleTask to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehicleTask, or with status 404 (Not Found)
     */
    @GetMapping("/vehicle-tasks/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTask> getVehicleTask(@PathVariable Long id) {
        log.debug("REST request to get VehicleTask : {}", id);
        VehicleTask vehicleTask = vehicleTaskService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleTask));
    }

    /**
     * DELETE  /vehicle-tasks/:id : delete the "id" vehicleTask.
     *
     * @param id the id of the vehicleTask to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehicle-tasks/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteVehicleTask(@PathVariable Long id) {
        log.debug("REST request to delete VehicleTask : {}", id);
        vehicleTaskService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
