package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DepartmentManager;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DepartmentManager entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentManagerRepository extends JpaRepository<DepartmentManager, Long> {

}
