package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Salary;

import com.mycompany.myapp.repository.SalaryRepository;
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
 * REST controller for managing Salary.
 */
@RestController
@RequestMapping("/api")
public class SalaryResource {

    private final Logger log = LoggerFactory.getLogger(SalaryResource.class);

    private static final String ENTITY_NAME = "salary";

    private final SalaryRepository salaryRepository;

    public SalaryResource(SalaryRepository salaryRepository) {
        this.salaryRepository = salaryRepository;
    }

    /**
     * POST  /salaries : Create a new salary.
     *
     * @param salary the salary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new salary, or with status 400 (Bad Request) if the salary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/salaries")
    @Timed
    public ResponseEntity<Salary> createSalary(@Valid @RequestBody Salary salary) throws URISyntaxException {
        log.debug("REST request to save Salary : {}", salary);
        if (salary.getId() != null) {
            throw new BadRequestAlertException("A new salary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Salary result = salaryRepository.save(salary);
        return ResponseEntity.created(new URI("/api/salaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /salaries : Updates an existing salary.
     *
     * @param salary the salary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated salary,
     * or with status 400 (Bad Request) if the salary is not valid,
     * or with status 500 (Internal Server Error) if the salary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/salaries")
    @Timed
    public ResponseEntity<Salary> updateSalary(@Valid @RequestBody Salary salary) throws URISyntaxException {
        log.debug("REST request to update Salary : {}", salary);
        if (salary.getId() == null) {
            return createSalary(salary);
        }
        Salary result = salaryRepository.save(salary);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, salary.getId().toString()))
            .body(result);
    }

    /**
     * GET  /salaries : get all the salaries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of salaries in body
     */
    @GetMapping("/salaries")
    @Timed
    public List<Salary> getAllSalaries() {
        log.debug("REST request to get all Salaries");
        return salaryRepository.findAll();
        }

    /**
     * GET  /salaries/:id : get the "id" salary.
     *
     * @param id the id of the salary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the salary, or with status 404 (Not Found)
     */
    @GetMapping("/salaries/{id}")
    @Timed
    public ResponseEntity<Salary> getSalary(@PathVariable Long id) {
        log.debug("REST request to get Salary : {}", id);
        Salary salary = salaryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(salary));
    }

    /**
     * DELETE  /salaries/:id : delete the "id" salary.
     *
     * @param id the id of the salary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/salaries/{id}")
    @Timed
    public ResponseEntity<Void> deleteSalary(@PathVariable Long id) {
        log.debug("REST request to delete Salary : {}", id);
        salaryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
