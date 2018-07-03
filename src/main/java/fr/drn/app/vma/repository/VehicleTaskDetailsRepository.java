package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.VehicleTaskDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the VehicleTaskDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleTaskDetailsRepository extends JpaRepository<VehicleTaskDetails, Long> {

    List<VehicleTaskDetails> findByVehicleTaskId(Long id);
}
