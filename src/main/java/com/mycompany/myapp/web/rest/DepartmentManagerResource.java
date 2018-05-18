package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.DepartmentManager;

import com.mycompany.myapp.repository.DepartmentManagerRepository;
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
 * REST controller for managing DepartmentManager.
 */
@RestController
@RequestMapping("/api")
public class DepartmentManagerResource {

    private final Logger log = LoggerFactory.getLogger(DepartmentManagerResource.class);

    private static final String ENTITY_NAME = "departmentManager";

    private final DepartmentManagerRepository departmentManagerRepository;

    public DepartmentManagerResource(DepartmentManagerRepository departmentManagerRepository) {
        this.departmentManagerRepository = departmentManagerRepository;
    }

    /**
     * POST  /department-managers : Create a new departmentManager.
     *
     * @param departmentManager the departmentManager to create
     * @return the ResponseEntity with status 201 (Created) and with body the new departmentManager, or with status 400 (Bad Request) if the departmentManager has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/department-managers")
    @Timed
    public ResponseEntity<DepartmentManager> createDepartmentManager(@Valid @RequestBody DepartmentManager departmentManager) throws URISyntaxException {
        log.debug("REST request to save DepartmentManager : {}", departmentManager);
        if (departmentManager.getId() != null) {
            throw new BadRequestAlertException("A new departmentManager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepartmentManager result = departmentManagerRepository.save(departmentManager);
        return ResponseEntity.created(new URI("/api/department-managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /department-managers : Updates an existing departmentManager.
     *
     * @param departmentManager the departmentManager to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated departmentManager,
     * or with status 400 (Bad Request) if the departmentManager is not valid,
     * or with status 500 (Internal Server Error) if the departmentManager couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/department-managers")
    @Timed
    public ResponseEntity<DepartmentManager> updateDepartmentManager(@Valid @RequestBody DepartmentManager departmentManager) throws URISyntaxException {
        log.debug("REST request to update DepartmentManager : {}", departmentManager);
        if (departmentManager.getId() == null) {
            return createDepartmentManager(departmentManager);
        }
        DepartmentManager result = departmentManagerRepository.save(departmentManager);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, departmentManager.getId().toString()))
            .body(result);
    }

    /**
     * GET  /department-managers : get all the departmentManagers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of departmentManagers in body
     */
    @GetMapping("/department-managers")
    @Timed
    public List<DepartmentManager> getAllDepartmentManagers() {
        log.debug("REST request to get all DepartmentManagers");
        return departmentManagerRepository.findAll();
        }

    /**
     * GET  /department-managers/:id : get the "id" departmentManager.
     *
     * @param id the id of the departmentManager to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the departmentManager, or with status 404 (Not Found)
     */
    @GetMapping("/department-managers/{id}")
    @Timed
    public ResponseEntity<DepartmentManager> getDepartmentManager(@PathVariable Long id) {
        log.debug("REST request to get DepartmentManager : {}", id);
        DepartmentManager departmentManager = departmentManagerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(departmentManager));
    }

    /**
     * DELETE  /department-managers/:id : delete the "id" departmentManager.
     *
     * @param id the id of the departmentManager to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/department-managers/{id}")
    @Timed
    public ResponseEntity<Void> deleteDepartmentManager(@PathVariable Long id) {
        log.debug("REST request to delete DepartmentManager : {}", id);
        departmentManagerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
