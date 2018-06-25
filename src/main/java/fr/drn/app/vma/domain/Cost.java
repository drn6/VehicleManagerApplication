package fr.drn.app.vma.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

import fr.drn.app.vma.domain.enumeration.CostType;

import fr.drn.app.vma.domain.enumeration.StatusType;

/**
 * A Cost.
 */
@Entity
@Table(name = "cost")
public class Cost extends AbstractAuditingEntity implements Serializable {

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
    private CostType type;

    @NotNull
    @Column(name = "jhi_cost", nullable = false)
    private Double cost;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusType status;

    @ManyToOne
    private VehicleTask vehicleTask;

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

    public Cost name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CostType getType() {
        return type;
    }

    public Cost type(CostType type) {
        this.type = type;
        return this;
    }

    public void setType(CostType type) {
        this.type = type;
    }

    public Double getCost() {
        return cost;
    }

    public Cost cost(Double cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public StatusType getStatus() {
        return status;
    }

    public Cost status(StatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public VehicleTask getVehicleTask() {
        return vehicleTask;
    }

    public Cost vehicleTask(VehicleTask vehicleTask) {
        this.vehicleTask = vehicleTask;
        return this;
    }

    public void setVehicleTask(VehicleTask vehicleTask) {
        this.vehicleTask = vehicleTask;
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
        Cost cost = (Cost) o;
        if (cost.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cost.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cost{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", cost=" + getCost() +
            ", createdBy='" + getCreatedBy() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedBy='" + getLastModifiedBy() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
