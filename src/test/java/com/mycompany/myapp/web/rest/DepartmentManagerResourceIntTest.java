package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.EmployeesApp;

import com.mycompany.myapp.domain.DepartmentManager;
import com.mycompany.myapp.repository.DepartmentManagerRepository;
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
 * Test class for the DepartmentManagerResource REST controller.
 *
 * @see DepartmentManagerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EmployeesApp.class)
public class DepartmentManagerResourceIntTest {

    private static final Instant DEFAULT_FROM_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FROM_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_TO_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TO_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DepartmentManagerRepository departmentManagerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDepartmentManagerMockMvc;

    private DepartmentManager departmentManager;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DepartmentManagerResource departmentManagerResource = new DepartmentManagerResource(departmentManagerRepository);
        this.restDepartmentManagerMockMvc = MockMvcBuilders.standaloneSetup(departmentManagerResource)
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
    public static DepartmentManager createEntity(EntityManager em) {
        DepartmentManager departmentManager = new DepartmentManager()
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE);
        return departmentManager;
    }

    @Before
    public void initTest() {
        departmentManager = createEntity(em);
    }

    @Test
    @Transactional
    public void createDepartmentManager() throws Exception {
        int databaseSizeBeforeCreate = departmentManagerRepository.findAll().size();

        // Create the DepartmentManager
        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isCreated());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeCreate + 1);
        DepartmentManager testDepartmentManager = departmentManagerList.get(departmentManagerList.size() - 1);
        assertThat(testDepartmentManager.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testDepartmentManager.getToDate()).isEqualTo(DEFAULT_TO_DATE);
    }

    @Test
    @Transactional
    public void createDepartmentManagerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = departmentManagerRepository.findAll().size();

        // Create the DepartmentManager with an existing ID
        departmentManager.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isBadRequest());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFromDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = departmentManagerRepository.findAll().size();
        // set the field null
        departmentManager.setFromDate(null);

        // Create the DepartmentManager, which fails.

        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isBadRequest());

        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkToDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = departmentManagerRepository.findAll().size();
        // set the field null
        departmentManager.setToDate(null);

        // Create the DepartmentManager, which fails.

        restDepartmentManagerMockMvc.perform(post("/api/department-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isBadRequest());

        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDepartmentManagers() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);

        // Get all the departmentManagerList
        restDepartmentManagerMockMvc.perform(get("/api/department-managers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(departmentManager.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(DEFAULT_TO_DATE.toString())));
    }

    @Test
    @Transactional
    public void getDepartmentManager() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);

        // Get the departmentManager
        restDepartmentManagerMockMvc.perform(get("/api/department-managers/{id}", departmentManager.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(departmentManager.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.toDate").value(DEFAULT_TO_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDepartmentManager() throws Exception {
        // Get the departmentManager
        restDepartmentManagerMockMvc.perform(get("/api/department-managers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDepartmentManager() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);
        int databaseSizeBeforeUpdate = departmentManagerRepository.findAll().size();

        // Update the departmentManager
        DepartmentManager updatedDepartmentManager = departmentManagerRepository.findOne(departmentManager.getId());
        // Disconnect from session so that the updates on updatedDepartmentManager are not directly saved in db
        em.detach(updatedDepartmentManager);
        updatedDepartmentManager
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE);

        restDepartmentManagerMockMvc.perform(put("/api/department-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDepartmentManager)))
            .andExpect(status().isOk());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeUpdate);
        DepartmentManager testDepartmentManager = departmentManagerList.get(departmentManagerList.size() - 1);
        assertThat(testDepartmentManager.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testDepartmentManager.getToDate()).isEqualTo(UPDATED_TO_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDepartmentManager() throws Exception {
        int databaseSizeBeforeUpdate = departmentManagerRepository.findAll().size();

        // Create the DepartmentManager

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDepartmentManagerMockMvc.perform(put("/api/department-managers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(departmentManager)))
            .andExpect(status().isCreated());

        // Validate the DepartmentManager in the database
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDepartmentManager() throws Exception {
        // Initialize the database
        departmentManagerRepository.saveAndFlush(departmentManager);
        int databaseSizeBeforeDelete = departmentManagerRepository.findAll().size();

        // Get the departmentManager
        restDepartmentManagerMockMvc.perform(delete("/api/department-managers/{id}", departmentManager.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DepartmentManager> departmentManagerList = departmentManagerRepository.findAll();
        assertThat(departmentManagerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DepartmentManager.class);
        DepartmentManager departmentManager1 = new DepartmentManager();
        departmentManager1.setId(1L);
        DepartmentManager departmentManager2 = new DepartmentManager();
        departmentManager2.setId(departmentManager1.getId());
        assertThat(departmentManager1).isEqualTo(departmentManager2);
        departmentManager2.setId(2L);
        assertThat(departmentManager1).isNotEqualTo(departmentManager2);
        departmentManager1.setId(null);
        assertThat(departmentManager1).isNotEqualTo(departmentManager2);
    }
}
