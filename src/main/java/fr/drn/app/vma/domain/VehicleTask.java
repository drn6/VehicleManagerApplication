package fr.drn.app.vma.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fr.drn.app.vma.domain.enumeration.StatusType;
import fr.drn.app.vma.domain.enumeration.VehicleTaskType;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A VehicleTask.
 */
@Entity
@Table(name = "vehicle_task")
@NamedEntityGraphs(
    @NamedEntityGraph(
        name = "fullTasks",
        attributeNodes = {
            @NamedAttributeNode(value = "details"),
            @NamedAttributeNode(value = "drivers")
        }
    )
)
public class VehicleTask extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private VehicleTaskType type;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Min(value = 1)
    @Max(value = 3)
    @Column(name = "max_drivers", nullable = false)
    private Integer maxDrivers;

    @NotNull
    @Column(name = "start_date_time", nullable = false)
    private ZonedDateTime startDateTime;

    @NotNull
    @Column(name = "end_date_time", nullable = false)
    private ZonedDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusType status;

    @ManyToOne
    private Vehicle vehicle;

    @OneToMany(mappedBy = "vehicleTask")
    @JsonIgnore
    private Set<VehicleTaskDetails> details = new HashSet<>();

    @OneToMany(mappedBy = "vehicleTask")
    @JsonIgnore
    private Set<Cost> costs = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "vehicle_task_driver",
        joinColumns = @JoinColumn(name = "vehicle_tasks_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "drivers_id", referencedColumnName = "id"))
    @BatchSize(size = 5)
    private Set<Driver> drivers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public VehicleTask name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public VehicleTaskType getType() {
        return type;
    }

    public VehicleTask type(VehicleTaskType type) {
        this.type = type;
        return this;
    }

    public void setType(VehicleTaskType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public VehicleTask description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMaxDrivers() {
        return maxDrivers;
    }

    public VehicleTask maxDrivers(Integer maxDrivers) {
        this.maxDrivers = maxDrivers;
        return this;
    }

    public void setMaxDrivers(Integer maxDrivers) {
        this.maxDrivers = maxDrivers;
    }

    public ZonedDateTime getStartDateTime() {
        return startDateTime;
    }

    public VehicleTask startDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
        return this;
    }

    public void setStartDateTime(ZonedDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public ZonedDateTime getEndDateTime() {
        return endDateTime;
    }

    public VehicleTask endDateTime(ZonedDateTime endDateTime) {
        this.endDateTime = endDateTime;
        return this;
    }

    public void setEndDateTime(ZonedDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    public StatusType getStatus() {
        return status;
    }

    public VehicleTask status(StatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public VehicleTask vehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Set<VehicleTaskDetails> getDetails() {
        return details;
    }

    public VehicleTask details(Set<VehicleTaskDetails> vehicleTaskDetails) {
        this.details = vehicleTaskDetails;
        return this;
    }

    public VehicleTask addDetail(VehicleTaskDetails vehicleTaskDetails) {
        this.details.add(vehicleTaskDetails);
        vehicleTaskDetails.setVehicleTask(this);
        return this;
    }

    public VehicleTask removeDetail(VehicleTaskDetails vehicleTaskDetails) {
        this.details.remove(vehicleTaskDetails);
        vehicleTaskDetails.setVehicleTask(null);
        return this;
    }

    public void setDetails(Set<VehicleTaskDetails> vehicleTaskDetails) {
        this.details = vehicleTaskDetails;
    }

    public Set<Cost> getCosts() {
        return costs;
    }

    public VehicleTask costs(Set<Cost> costs) {
        this.costs = costs;
        return this;
    }

    public VehicleTask addCost(Cost cost) {
        this.costs.add(cost);
        cost.setVehicleTask(this);
        return this;
    }

    public VehicleTask removeCost(Cost cost) {
        this.costs.remove(cost);
        cost.setVehicleTask(null);
        return this;
    }

    public void setCosts(Set<Cost> costs) {
        this.costs = costs;
    }

    public Set<Driver> getDrivers() {
        return drivers;
    }

    public VehicleTask drivers(Set<Driver> drivers) {
        this.drivers = drivers;
        return this;
    }

    public VehicleTask addDriver(Driver driver) {
        this.drivers.add(driver);
        return this;
    }

    public VehicleTask removeDriver(Driver driver) {
        this.drivers.remove(driver);
        return this;
    }

    public void setDrivers(Set<Driver> drivers) {
        this.drivers = drivers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        VehicleTask vehicleTask = (VehicleTask) o;
        if (vehicleTask.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleTask.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleTask{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", description='" + getDescription() + "'" +
            ", maxDrivers=" + getMaxDrivers() +
            ", startDateTime='" + getStartDateTime() + "'" +
            ", endDateTime='" + getEndDateTime() + "'" +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
