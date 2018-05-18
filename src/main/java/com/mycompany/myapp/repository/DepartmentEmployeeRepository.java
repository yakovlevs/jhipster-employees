package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DepartmentEmployee;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DepartmentEmployee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepartmentEmployeeRepository extends JpaRepository<DepartmentEmployee, Long> {

}
