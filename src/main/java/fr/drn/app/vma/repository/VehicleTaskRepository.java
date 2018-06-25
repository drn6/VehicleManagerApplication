package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.VehicleTask;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the VehicleTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleTaskRepository extends JpaRepository<VehicleTask, Long> {
    @Query("select distinct vehicle_task from VehicleTask vehicle_task left join fetch vehicle_task.drivers")
    List<VehicleTask> findAllWithEagerRelationships();

    @Query("select vehicle_task from VehicleTask vehicle_task left join fetch vehicle_task.drivers where vehicle_task.id =:id")
    VehicleTask findOneWithEagerRelationships(@Param("id") Long id);

}
