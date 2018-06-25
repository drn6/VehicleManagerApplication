package fr.drn.app.vma.web.rest;

import fr.drn.app.vma.VehicleManagerApplicationApp;

import fr.drn.app.vma.domain.VehicleTask;
import fr.drn.app.vma.repository.VehicleTaskRepository;
import fr.drn.app.vma.service.VehicleTaskService;
import fr.drn.app.vma.web.rest.errors.ExceptionTranslator;

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
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.drn.app.vma.web.rest.TestUtil.sameInstant;
import static fr.drn.app.vma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.drn.app.vma.domain.enumeration.VehicleTaskType;
import fr.drn.app.vma.domain.enumeration.StatusType;
/**
 * Test class for the VehicleTaskResource REST controller.
 *
 * @see VehicleTaskResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleManagerApplicationApp.class)
public class VehicleTaskResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final VehicleTaskType DEFAULT_TYPE = VehicleTaskType.JOURNEY;
    private static final VehicleTaskType UPDATED_TYPE = VehicleTaskType.MAINTENANCE;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_MAX_DRIVERS = 1;
    private static final Integer UPDATED_MAX_DRIVERS = 2;

    private static final ZonedDateTime DEFAULT_START_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final StatusType DEFAULT_STATUS = StatusType.ENABLED;
    private static final StatusType UPDATED_STATUS = StatusType.DISABLED;

    @Autowired
    private VehicleTaskRepository vehicleTaskRepository;

    @Autowired
    private VehicleTaskService vehicleTaskService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVehicleTaskMockMvc;

    private VehicleTask vehicleTask;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehicleTaskResource vehicleTaskResource = new VehicleTaskResource(vehicleTaskService);
        this.restVehicleTaskMockMvc = MockMvcBuilders.standaloneSetup(vehicleTaskResource)
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
    public static VehicleTask createEntity(EntityManager em) {
        VehicleTask vehicleTask = new VehicleTask()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .description(DEFAULT_DESCRIPTION)
            .maxDrivers(DEFAULT_MAX_DRIVERS)
            .startDateTime(DEFAULT_START_DATE_TIME)
            .endDateTime(DEFAULT_END_DATE_TIME)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .status(DEFAULT_STATUS);
        return vehicleTask;
    }

    @Before
    public void initTest() {
        vehicleTask = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleTask() throws Exception {
        int databaseSizeBeforeCreate = vehicleTaskRepository.findAll().size();

        // Create the VehicleTask
        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isCreated());

        // Validate the VehicleTask in the database
        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleTask testVehicleTask = vehicleTaskList.get(vehicleTaskList.size() - 1);
        assertThat(testVehicleTask.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleTask.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testVehicleTask.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVehicleTask.getMaxDrivers()).isEqualTo(DEFAULT_MAX_DRIVERS);
        assertThat(testVehicleTask.getStartDateTime()).isEqualTo(DEFAULT_START_DATE_TIME);
        assertThat(testVehicleTask.getEndDateTime()).isEqualTo(DEFAULT_END_DATE_TIME);
        assertThat(testVehicleTask.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testVehicleTask.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testVehicleTask.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testVehicleTask.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testVehicleTask.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createVehicleTaskWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleTaskRepository.findAll().size();

        // Create the VehicleTask with an existing ID
        vehicleTask.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleTask in the database
        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskRepository.findAll().size();
        // set the field null
        vehicleTask.setName(null);

        // Create the VehicleTask, which fails.

        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskRepository.findAll().size();
        // set the field null
        vehicleTask.setType(null);

        // Create the VehicleTask, which fails.

        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskRepository.findAll().size();
        // set the field null
        vehicleTask.setDescription(null);

        // Create the VehicleTask, which fails.

        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMaxDriversIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskRepository.findAll().size();
        // set the field null
        vehicleTask.setMaxDrivers(null);

        // Create the VehicleTask, which fails.

        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskRepository.findAll().size();
        // set the field null
        vehicleTask.setStartDateTime(null);

        // Create the VehicleTask, which fails.

        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskRepository.findAll().size();
        // set the field null
        vehicleTask.setEndDateTime(null);

        // Create the VehicleTask, which fails.

        restVehicleTaskMockMvc.perform(post("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isBadRequest());

        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleTasks() throws Exception {
        // Initialize the database
        vehicleTaskRepository.saveAndFlush(vehicleTask);

        // Get all the vehicleTaskList
        restVehicleTaskMockMvc.perform(get("/api/vehicle-tasks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleTask.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].maxDrivers").value(hasItem(DEFAULT_MAX_DRIVERS)))
            .andExpect(jsonPath("$.[*].startDateTime").value(hasItem(sameInstant(DEFAULT_START_DATE_TIME))))
            .andExpect(jsonPath("$.[*].endDateTime").value(hasItem(sameInstant(DEFAULT_END_DATE_TIME))))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getVehicleTask() throws Exception {
        // Initialize the database
        vehicleTaskRepository.saveAndFlush(vehicleTask);

        // Get the vehicleTask
        restVehicleTaskMockMvc.perform(get("/api/vehicle-tasks/{id}", vehicleTask.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleTask.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.maxDrivers").value(DEFAULT_MAX_DRIVERS))
            .andExpect(jsonPath("$.startDateTime").value(sameInstant(DEFAULT_START_DATE_TIME)))
            .andExpect(jsonPath("$.endDateTime").value(sameInstant(DEFAULT_END_DATE_TIME)))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVehicleTask() throws Exception {
        // Get the vehicleTask
        restVehicleTaskMockMvc.perform(get("/api/vehicle-tasks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleTask() throws Exception {
        // Initialize the database
        vehicleTaskService.save(vehicleTask);

        int databaseSizeBeforeUpdate = vehicleTaskRepository.findAll().size();

        // Update the vehicleTask
        VehicleTask updatedVehicleTask = vehicleTaskRepository.findOne(vehicleTask.getId());
        // Disconnect from session so that the updates on updatedVehicleTask are not directly saved in db
        em.detach(updatedVehicleTask);
        updatedVehicleTask
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .description(UPDATED_DESCRIPTION)
            .maxDrivers(UPDATED_MAX_DRIVERS)
            .startDateTime(UPDATED_START_DATE_TIME)
            .endDateTime(UPDATED_END_DATE_TIME)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .status(UPDATED_STATUS);

        restVehicleTaskMockMvc.perform(put("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleTask)))
            .andExpect(status().isOk());

        // Validate the VehicleTask in the database
        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeUpdate);
        VehicleTask testVehicleTask = vehicleTaskList.get(vehicleTaskList.size() - 1);
        assertThat(testVehicleTask.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleTask.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testVehicleTask.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVehicleTask.getMaxDrivers()).isEqualTo(UPDATED_MAX_DRIVERS);
        assertThat(testVehicleTask.getStartDateTime()).isEqualTo(UPDATED_START_DATE_TIME);
        assertThat(testVehicleTask.getEndDateTime()).isEqualTo(UPDATED_END_DATE_TIME);
        assertThat(testVehicleTask.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testVehicleTask.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testVehicleTask.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testVehicleTask.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testVehicleTask.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleTask() throws Exception {
        int databaseSizeBeforeUpdate = vehicleTaskRepository.findAll().size();

        // Create the VehicleTask

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVehicleTaskMockMvc.perform(put("/api/vehicle-tasks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTask)))
            .andExpect(status().isCreated());

        // Validate the VehicleTask in the database
        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVehicleTask() throws Exception {
        // Initialize the database
        vehicleTaskService.save(vehicleTask);

        int databaseSizeBeforeDelete = vehicleTaskRepository.findAll().size();

        // Get the vehicleTask
        restVehicleTaskMockMvc.perform(delete("/api/vehicle-tasks/{id}", vehicleTask.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VehicleTask> vehicleTaskList = vehicleTaskRepository.findAll();
        assertThat(vehicleTaskList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleTask.class);
        VehicleTask vehicleTask1 = new VehicleTask();
        vehicleTask1.setId(1L);
        VehicleTask vehicleTask2 = new VehicleTask();
        vehicleTask2.setId(vehicleTask1.getId());
        assertThat(vehicleTask1).isEqualTo(vehicleTask2);
        vehicleTask2.setId(2L);
        assertThat(vehicleTask1).isNotEqualTo(vehicleTask2);
        vehicleTask1.setId(null);
        assertThat(vehicleTask1).isNotEqualTo(vehicleTask2);
    }
}
