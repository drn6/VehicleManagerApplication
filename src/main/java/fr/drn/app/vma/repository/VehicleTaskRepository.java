package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.VehicleTask;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

import static org.springframework.data.jpa.repository.EntityGraph.EntityGraphType.FETCH;

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

    @EntityGraph(value = "fullTasks", type = FETCH)
    List<VehicleTask> findAllByStartDateTimeGreaterThanEqualAndEndDateTimeLessThanEqual(@Param("startDateTime") ZonedDateTime startDateTime, @Param("endDateTime") ZonedDateTime endDateTime);

}
