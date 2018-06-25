package fr.drn.app.vma.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import fr.drn.app.vma.domain.enumeration.VehicleServiceCostType;

import fr.drn.app.vma.domain.enumeration.StatusType;

/**
 * A VehicleServiceCost.
 */
@Entity
@Table(name = "vehicle_service_cost")
public class VehicleServiceCost extends AbstractAuditingEntity  implements Serializable {

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
    private VehicleServiceCostType type;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "per_day", nullable = false)
    private Double perDay;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "per_km", nullable = false)
    private Double perKM;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "per_diver", nullable = false)
    private Double perDiver;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusType status;

    @ManyToOne
    private Vehicle vehicle;

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

    public VehicleServiceCost name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public VehicleServiceCostType getType() {
        return type;
    }

    public VehicleServiceCost type(VehicleServiceCostType type) {
        this.type = type;
        return this;
    }

    public void setType(VehicleServiceCostType type) {
        this.type = type;
    }

    public Double getPerDay() {
        return perDay;
    }

    public VehicleServiceCost perDay(Double perDay) {
        this.perDay = perDay;
        return this;
    }

    public void setPerDay(Double perDay) {
        this.perDay = perDay;
    }

    public Double getPerKM() {
        return perKM;
    }

    public VehicleServiceCost perKM(Double perKM) {
        this.perKM = perKM;
        return this;
    }

    public void setPerKM(Double perKM) {
        this.perKM = perKM;
    }

    public Double getPerDiver() {
        return perDiver;
    }

    public VehicleServiceCost perDiver(Double perDiver) {
        this.perDiver = perDiver;
        return this;
    }

    public void setPerDiver(Double perDiver) {
        this.perDiver = perDiver;
    }

    public StatusType getStatus() {
        return status;
    }

    public VehicleServiceCost status(StatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public VehicleServiceCost vehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
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
        VehicleServiceCost vehicleServiceCost = (VehicleServiceCost) o;
        if (vehicleServiceCost.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleServiceCost.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleServiceCost{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", perDay=" + getPerDay() +
            ", perKM=" + getPerKM() +
            ", perDiver=" + getPerDiver() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
