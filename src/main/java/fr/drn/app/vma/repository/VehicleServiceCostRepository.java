package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.VehicleServiceCost;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the VehicleServiceCost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleServiceCostRepository extends JpaRepository<VehicleServiceCost, Long> {

}
