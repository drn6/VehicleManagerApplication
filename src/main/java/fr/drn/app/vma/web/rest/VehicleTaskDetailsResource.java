package fr.drn.app.vma.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.drn.app.vma.domain.VehicleTaskDetails;
import fr.drn.app.vma.security.AuthoritiesConstants;
import fr.drn.app.vma.service.VehicleTaskDetailsService;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing VehicleTaskDetails.
 */
@RestController
@RequestMapping("/api")
public class VehicleTaskDetailsResource {

    private final Logger log = LoggerFactory.getLogger(VehicleTaskDetailsResource.class);

    private static final String ENTITY_NAME = "vehicleTaskDetails";

    private final VehicleTaskDetailsService vehicleTaskDetailsService;

    public VehicleTaskDetailsResource(VehicleTaskDetailsService vehicleTaskDetailsService) {
        this.vehicleTaskDetailsService = vehicleTaskDetailsService;
    }

    /**
     * POST  /vehicle-task-details : Create a new vehicleTaskDetails.
     *
     * @param vehicleTaskDetails the vehicleTaskDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vehicleTaskDetails, or with status 400 (Bad Request) if the vehicleTaskDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehicle-task-details")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTaskDetails> createVehicleTaskDetails(@Valid @RequestBody VehicleTaskDetails vehicleTaskDetails) throws URISyntaxException {
        log.debug("REST request to save VehicleTaskDetails : {}", vehicleTaskDetails);
        if (vehicleTaskDetails.getId() != null) {
            throw new BadRequestAlertException("A new vehicleTaskDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleTaskDetails result = vehicleTaskDetailsService.save(vehicleTaskDetails);
        return ResponseEntity.created(new URI("/api/vehicle-task-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehicle-task-details : Updates an existing vehicleTaskDetails.
     *
     * @param vehicleTaskDetails the vehicleTaskDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleTaskDetails,
     * or with status 400 (Bad Request) if the vehicleTaskDetails is not valid,
     * or with status 500 (Internal Server Error) if the vehicleTaskDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-task-details")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTaskDetails> updateVehicleTaskDetails(@Valid @RequestBody VehicleTaskDetails vehicleTaskDetails) throws URISyntaxException {
        log.debug("REST request to update VehicleTaskDetails : {}", vehicleTaskDetails);
        if (vehicleTaskDetails.getId() == null) {
            return createVehicleTaskDetails(vehicleTaskDetails);
        }
        VehicleTaskDetails result = vehicleTaskDetailsService.save(vehicleTaskDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicleTaskDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vehicle-task-details : get all the vehicleTaskDetails.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleTaskDetails in body
     */
    @GetMapping("/vehicle-task-details")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<VehicleTaskDetails>> getAllVehicleTaskDetails(Pageable pageable) {
        log.debug("REST request to get a page of VehicleTaskDetails");
        Page<VehicleTaskDetails> page = vehicleTaskDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicle-task-details");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /vehicle-task-details/task/{taskId} : get all the vehicleTaskDetails.
     *
     * @param taskId task id
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleTaskDetails in body
     */
    @GetMapping("/vehicle-task-details/task/{taskId}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<VehicleTaskDetails>> getAllVehicleTaskDetailsByTaskId(@PathVariable Long taskId) {
        log.debug("REST request to get a page of VehicleTaskDetails");
        List<VehicleTaskDetails> vehicleTaskDetails = vehicleTaskDetailsService.findAllByTaskId(taskId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleTaskDetails));
    }

    /**
     * GET  /vehicle-task-details/:id : get the "id" vehicleTaskDetails.
     *
     * @param id the id of the vehicleTaskDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehicleTaskDetails, or with status 404 (Not Found)
     */
    @GetMapping("/vehicle-task-details/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleTaskDetails> getVehicleTaskDetails(@PathVariable Long id) {
        log.debug("REST request to get VehicleTaskDetails : {}", id);
        VehicleTaskDetails vehicleTaskDetails = vehicleTaskDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleTaskDetails));
    }

    /**
     * DELETE  /vehicle-task-details/:id : delete the "id" vehicleTaskDetails.
     *
     * @param id the id of the vehicleTaskDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehicle-task-details/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteVehicleTaskDetails(@PathVariable Long id) {
        log.debug("REST request to delete VehicleTaskDetails : {}", id);
        vehicleTaskDetailsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
