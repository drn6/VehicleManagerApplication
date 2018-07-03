package fr.drn.app.vma.repository;

import fr.drn.app.vma.domain.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;


/**
 * Spring Data JPA repository for the Vehicle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {



    //StartDateLessThanEqualAndEndDateGreaterThanEqual
    Page<Vehicle> findAllByIdNotIn(Collection<Long> ids, Pageable pageable);

    List<Vehicle> findAllByTasksStartDateTimeLessThanEqualAndTasksEndDateTimeGreaterThanEqual(ZonedDateTime startDateTime, ZonedDateTime endDateTime);
}
