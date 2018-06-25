package fr.drn.app.vma.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import fr.drn.app.vma.domain.enumeration.StatusType;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
public class Vehicle extends AbstractAuditingEntity  implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @NotNull
    @Size(max = 50)
    @Column(name = "number_plate", length = 50, nullable = false)
    private String numberPlate;

    @NotNull
    @Min(value = 1)
    @Max(value = 300)
    @Column(name = "number_of_place", nullable = false)
    private Integer numberOfPlace;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusType status;

    @OneToMany(mappedBy = "vehicle")
    @JsonIgnore
    private Set<VehicleServiceCost> costs = new HashSet<>();

    @OneToMany(mappedBy = "vehicle")
    @JsonIgnore
    private Set<VehicleTask> tasks = new HashSet<>();

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

    public Vehicle name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public Vehicle numberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
        return this;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public Integer getNumberOfPlace() {
        return numberOfPlace;
    }

    public Vehicle numberOfPlace(Integer numberOfPlace) {
        this.numberOfPlace = numberOfPlace;
        return this;
    }

    public void setNumberOfPlace(Integer numberOfPlace) {
        this.numberOfPlace = numberOfPlace;
    }

    public StatusType getStatus() {
        return status;
    }

    public Vehicle status(StatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public Set<VehicleServiceCost> getCosts() {
        return costs;
    }

    public Vehicle costs(Set<VehicleServiceCost> vehicleServiceCosts) {
        this.costs = vehicleServiceCosts;
        return this;
    }

    public Vehicle addCost(VehicleServiceCost vehicleServiceCost) {
        this.costs.add(vehicleServiceCost);
        vehicleServiceCost.setVehicle(this);
        return this;
    }

    public Vehicle removeCost(VehicleServiceCost vehicleServiceCost) {
        this.costs.remove(vehicleServiceCost);
        vehicleServiceCost.setVehicle(null);
        return this;
    }

    public void setCosts(Set<VehicleServiceCost> vehicleServiceCosts) {
        this.costs = vehicleServiceCosts;
    }

    public Set<VehicleTask> getTasks() {
        return tasks;
    }

    public Vehicle tasks(Set<VehicleTask> vehicleTasks) {
        this.tasks = vehicleTasks;
        return this;
    }

    public Vehicle addTask(VehicleTask vehicleTask) {
        this.tasks.add(vehicleTask);
        vehicleTask.setVehicle(this);
        return this;
    }

    public Vehicle removeTask(VehicleTask vehicleTask) {
        this.tasks.remove(vehicleTask);
        vehicleTask.setVehicle(null);
        return this;
    }

    public void setTasks(Set<VehicleTask> vehicleTasks) {
        this.tasks = vehicleTasks;
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
        Vehicle vehicle = (Vehicle) o;
        if (vehicle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", numberPlate='" + getNumberPlate() + "'" +
            ", numberOfPlace=" + getNumberOfPlace() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
