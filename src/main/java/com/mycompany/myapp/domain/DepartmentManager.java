package com.mycompany.myapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DepartmentManager.
 */
@Entity
@Table(name = "department_manager")
public class DepartmentManager implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "from_date", nullable = false)
    private Instant fromDate;

    @NotNull
    @Column(name = "to_date", nullable = false)
    private Instant toDate;

    @ManyToOne
    private Employee employee;

    @ManyToOne
    private Department department;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFromDate() {
        return fromDate;
    }

    public DepartmentManager fromDate(Instant fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(Instant fromDate) {
        this.fromDate = fromDate;
    }

    public Instant getToDate() {
        return toDate;
    }

    public DepartmentManager toDate(Instant toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(Instant toDate) {
        this.toDate = toDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public DepartmentManager employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Department getDepartment() {
        return department;
    }

    public DepartmentManager department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
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
        DepartmentManager departmentManager = (DepartmentManager) o;
        if (departmentManager.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), departmentManager.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DepartmentManager{" +
            "id=" + getId() +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            "}";
    }
}
