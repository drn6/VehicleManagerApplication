package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.Cost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Cost entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CostRepository extends JpaRepository<Cost, Long> {
    List<Cost> findAllByVehicleTaskId(Long taskId);
}
