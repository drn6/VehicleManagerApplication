package fr.drn.app.vma.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.drn.app.vma.domain.VehicleServiceCost;
import fr.drn.app.vma.security.AuthoritiesConstants;
import fr.drn.app.vma.service.VehicleServiceCostService;
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
 * REST controller for managing VehicleServiceCost.
 */
@RestController
@RequestMapping("/api")
public class VehicleServiceCostResource {

    private final Logger log = LoggerFactory.getLogger(VehicleServiceCostResource.class);

    private static final String ENTITY_NAME = "vehicleServiceCost";

    private final VehicleServiceCostService vehicleServiceCostService;

    public VehicleServiceCostResource(VehicleServiceCostService vehicleServiceCostService) {
        this.vehicleServiceCostService = vehicleServiceCostService;
    }

    /**
     * POST  /vehicle-service-costs : Create a new vehicleServiceCost.
     *
     * @param vehicleServiceCost the vehicleServiceCost to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vehicleServiceCost, or with status 400 (Bad Request) if the vehicleServiceCost has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehicle-service-costs")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleServiceCost> createVehicleServiceCost(@Valid @RequestBody VehicleServiceCost vehicleServiceCost) throws URISyntaxException {
        log.debug("REST request to save VehicleServiceCost : {}", vehicleServiceCost);
        if (vehicleServiceCost.getId() != null) {
            throw new BadRequestAlertException("A new vehicleServiceCost cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleServiceCost result = vehicleServiceCostService.save(vehicleServiceCost);
        return ResponseEntity.created(new URI("/api/vehicle-service-costs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehicle-service-costs : Updates an existing vehicleServiceCost.
     *
     * @param vehicleServiceCost the vehicleServiceCost to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleServiceCost,
     * or with status 400 (Bad Request) if the vehicleServiceCost is not valid,
     * or with status 500 (Internal Server Error) if the vehicleServiceCost couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-service-costs")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleServiceCost> updateVehicleServiceCost(@Valid @RequestBody VehicleServiceCost vehicleServiceCost) throws URISyntaxException {
        log.debug("REST request to update VehicleServiceCost : {}", vehicleServiceCost);
        if (vehicleServiceCost.getId() == null) {
            return createVehicleServiceCost(vehicleServiceCost);
        }
        VehicleServiceCost result = vehicleServiceCostService.save(vehicleServiceCost);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicleServiceCost.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vehicle-service-costs : get all the vehicleServiceCosts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleServiceCosts in body
     */
    @GetMapping("/vehicle-service-costs")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<VehicleServiceCost>> getAllVehicleServiceCosts(Pageable pageable) {
        log.debug("REST request to get a page of VehicleServiceCosts");
        Page<VehicleServiceCost> page = vehicleServiceCostService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicle-service-costs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /vehicle-service-costs/:id : get the "id" vehicleServiceCost.
     *
     * @param id the id of the vehicleServiceCost to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehicleServiceCost, or with status 404 (Not Found)
     */
    @GetMapping("/vehicle-service-costs/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<VehicleServiceCost> getVehicleServiceCost(@PathVariable Long id) {
        log.debug("REST request to get VehicleServiceCost : {}", id);
        VehicleServiceCost vehicleServiceCost = vehicleServiceCostService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleServiceCost));
    }

    /**
     * DELETE  /vehicle-service-costs/:id : delete the "id" vehicleServiceCost.
     *
     * @param id the id of the vehicleServiceCost to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehicle-service-costs/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteVehicleServiceCost(@PathVariable Long id) {
        log.debug("REST request to delete VehicleServiceCost : {}", id);
        vehicleServiceCostService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
