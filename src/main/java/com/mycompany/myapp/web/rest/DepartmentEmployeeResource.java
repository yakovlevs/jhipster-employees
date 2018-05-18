package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.DepartmentEmployee;

import com.mycompany.myapp.repository.DepartmentEmployeeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DepartmentEmployee.
 */
@RestController
@RequestMapping("/api")
public class DepartmentEmployeeResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentEmployeeResource.class);

    private static final String ENTITY_NAME = "departmentEmployee";

    private final DepartmentEmployeeRepository departmentEmployeeRepository;

    public DepartmentEmployeeResource(DepartmentEmployeeRepository departmentEmployeeRepository) {
        this.departmentEmployeeRepository = departmentEmployeeRepository;
    }

    /**
     * POST  /department-employees : Create a new departmentEmployee.
     *
     * @param departmentEmployee the departmentEmployee to create
     * @return the ResponseEntity with status 201 (Created) and with body the new departmentEmployee, or with status 400 (Bad Request) if the departmentEmployee has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/department-employees")
    @Timed
    public ResponseEntity<DepartmentEmployee> createDepartmentEmployee(@Valid @RequestBody DepartmentEmployee departmentEmployee) throws URISyntaxException {
        log.debug("REST request to save DepartmentEmployee : {}", departmentEmployee);
        if (departmentEmployee.getId() != null) {
            throw new BadRequestAlertException("A new departmentEmployee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepartmentEmployee result = departmentEmployeeRepository.save(departmentEmployee);
        return ResponseEntity.created(new URI("/api/department-employees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /department-employees : Updates an existing departmentEmployee.
     *
     * @param departmentEmployee the departmentEmployee to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated departmentEmployee,
     * or with status 400 (Bad Request) if the departmentEmployee is not valid,
     * or with status 500 (Internal Server Error) if the departmentEmployee couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/department-employees")
    @Timed
    public ResponseEntity<DepartmentEmployee> updateDepartmentEmployee(@Valid @RequestBody DepartmentEmployee departmentEmployee) throws URISyntaxException {
        log.debug("REST request to update DepartmentEmployee : {}", departmentEmployee);
        if (departmentEmployee.getId() == null) {
            return createDepartmentEmployee(departmentEmployee);
        }
        DepartmentEmployee result = departmentEmployeeRepository.save(departmentEmployee);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, departmentEmployee.getId().toString()))
            .body(result);
    }

    /**
     * GET  /department-employees : get all the departmentEmployees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of departmentEmployees in body
     */
    @GetMapping("/department-employees")
    @Timed
    public List<DepartmentEmployee> getAllDepartmentEmployees() {
        log.debug("REST request to get all DepartmentEmployees");
        return departmentEmployeeRepository.findAll();
        }

    /**
     * GET  /department-employees/:id : get the "id" departmentEmployee.
     *
     * @param id the id of the departmentEmployee to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the departmentEmployee, or with status 404 (Not Found)
     */
    @GetMapping("/department-employees/{id}")
    @Timed
    public ResponseEntity<DepartmentEmployee> getDepartmentEmployee(@PathVariable Long id) {
        log.debug("REST request to get DepartmentEmployee : {}", id);
        DepartmentEmployee departmentEmployee = departmentEmployeeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(departmentEmployee));
    }

    /**
     * DELETE  /department-employees/:id : delete the "id" departmentEmployee.
     *
     * @param id the id of the departmentEmployee to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/department-employees/{id}")
    @Timed
    public ResponseEntity<Void> deleteDepartmentEmployee(@PathVariable Long id) {
        log.debug("REST request to delete DepartmentEmployee : {}", id);
        departmentEmployeeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
