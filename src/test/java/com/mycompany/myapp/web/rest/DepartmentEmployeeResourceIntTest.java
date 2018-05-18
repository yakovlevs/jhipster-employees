package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EmployeesApp;

import com.mycompany.myapp.domain.DepartmentEmployee;
import com.mycompany.myapp.repository.DepartmentEmployeeRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DepartmentEmployeeResource REST controller.
 *
 * @see DepartmentEmployeeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmployeesApp.class)
public class DepartmentEmployeeResourceIntTest {

    private static final Instant DEFAULT_FROM_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FROM_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_TO_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TO_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DepartmentEmployeeRepository departmentEmployeeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDepartmentEmployeeMockMvc;

    private DepartmentEmployee departmentEmployee;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DepartmentEmployeeResource departmentEmployeeResource = new DepartmentEmployeeResource(departmentEmployeeRepository);
        this.restDepartmentEmployeeMockMvc = MockMvcBuilders.standaloneSetup(departmentEmployeeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DepartmentEmployee createEntity(EntityManager em) {
        DepartmentEmployee departmentEmployee = new DepartmentEmployee()
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        return departmentEmployee;
    }

    @Before
    public void initTest() {
        departmentEmployee = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepartmentEmployee() throws Exception {
        int databaseSizeBeforeCreate = departmentEmployeeRepository.findAll().size();

        // Create the DepartmentEmployee
        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isCreated());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeCreate + 1);
        DepartmentEmployee testDepartmentEmployee = departmentEmployeeList.get(departmentEmployeeList.size() - 1);
        assertThat(testDepartmentEmployee.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testDepartmentEmployee.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createDepartmentEmployeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = departmentEmployeeRepository.findAll().size();

        // Create the DepartmentEmployee with an existing ID
        departmentEmployee.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isBadRequest());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = departmentEmployeeRepository.findAll().size();
        // set the field null
        departmentEmployee.setFromDate(null);

        // Create the DepartmentEmployee, which fails.

        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isBadRequest());

        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkToDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = departmentEmployeeRepository.findAll().size();
        // set the field null
        departmentEmployee.setToDate(null);

        // Create the DepartmentEmployee, which fails.

        restDepartmentEmployeeMockMvc.perform(post("/api/department-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isBadRequest());

        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepartmentEmployees() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);

        // Get all the departmentEmployeeList
        restDepartmentEmployeeMockMvc.perform(get("/api/department-employees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departmentEmployee.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(DEFAULT_TO_DATE.toString())));
    }

    @Test
    @Transactional
    public void getDepartmentEmployee() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);

        // Get the departmentEmployee
        restDepartmentEmployeeMockMvc.perform(get("/api/department-employees/{id}", departmentEmployee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(departmentEmployee.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.toDate").value(DEFAULT_TO_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDepartmentEmployee() throws Exception {
        // Get the departmentEmployee
        restDepartmentEmployeeMockMvc.perform(get("/api/department-employees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepartmentEmployee() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);
        int databaseSizeBeforeUpdate = departmentEmployeeRepository.findAll().size();

        // Update the departmentEmployee
        DepartmentEmployee updatedDepartmentEmployee = departmentEmployeeRepository.findOne(departmentEmployee.getId());
        // Disconnect from session so that the updates on updatedDepartmentEmployee are not directly saved in db
        em.detach(updatedDepartmentEmployee);
        updatedDepartmentEmployee
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restDepartmentEmployeeMockMvc.perform(put("/api/department-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepartmentEmployee)))
            .andExpect(status().isOk());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeUpdate);
        DepartmentEmployee testDepartmentEmployee = departmentEmployeeList.get(departmentEmployeeList.size() - 1);
        assertThat(testDepartmentEmployee.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testDepartmentEmployee.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDepartmentEmployee() throws Exception {
        int databaseSizeBeforeUpdate = departmentEmployeeRepository.findAll().size();

        // Create the DepartmentEmployee

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDepartmentEmployeeMockMvc.perform(put("/api/department-employees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentEmployee)))
            .andExpect(status().isCreated());

        // Validate the DepartmentEmployee in the database
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDepartmentEmployee() throws Exception {
        // Initialize the database
        departmentEmployeeRepository.saveAndFlush(departmentEmployee);
        int databaseSizeBeforeDelete = departmentEmployeeRepository.findAll().size();

        // Get the departmentEmployee
        restDepartmentEmployeeMockMvc.perform(delete("/api/department-employees/{id}", departmentEmployee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DepartmentEmployee> departmentEmployeeList = departmentEmployeeRepository.findAll();
        assertThat(departmentEmployeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DepartmentEmployee.class);
        DepartmentEmployee departmentEmployee1 = new DepartmentEmployee();
        departmentEmployee1.setId(1L);
        DepartmentEmployee departmentEmployee2 = new DepartmentEmployee();
        departmentEmployee2.setId(departmentEmployee1.getId());
        assertThat(departmentEmployee1).isEqualTo(departmentEmployee2);
        departmentEmployee2.setId(2L);
        assertThat(departmentEmployee1).isNotEqualTo(departmentEmployee2);
        departmentEmployee1.setId(null);
        assertThat(departmentEmployee1).isNotEqualTo(departmentEmployee2);
    }
}
