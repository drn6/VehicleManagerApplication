package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.VehicleTaskDetails;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the VehicleTaskDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleTaskDetailsRepository extends JpaRepository<VehicleTaskDetails, Long> {

}
