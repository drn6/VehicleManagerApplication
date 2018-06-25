package fr.drn.app.vma.web.rest;

import fr.drn.app.vma.VehicleManagerApplicationApp;

import fr.drn.app.vma.domain.VehicleTaskDetails;
import fr.drn.app.vma.repository.VehicleTaskDetailsRepository;
import fr.drn.app.vma.service.VehicleTaskDetailsService;
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

import fr.drn.app.vma.domain.enumeration.StatusType;
/**
 * Test class for the VehicleTaskDetailsResource REST controller.
 *
 * @see VehicleTaskDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleManagerApplicationApp.class)
public class VehicleTaskDetailsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

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
    private VehicleTaskDetailsRepository vehicleTaskDetailsRepository;

    @Autowired
    private VehicleTaskDetailsService vehicleTaskDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVehicleTaskDetailsMockMvc;

    private VehicleTaskDetails vehicleTaskDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehicleTaskDetailsResource vehicleTaskDetailsResource = new VehicleTaskDetailsResource(vehicleTaskDetailsService);
        this.restVehicleTaskDetailsMockMvc = MockMvcBuilders.standaloneSetup(vehicleTaskDetailsResource)
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
    public static VehicleTaskDetails createEntity(EntityManager em) {
        VehicleTaskDetails vehicleTaskDetails = new VehicleTaskDetails()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .startDateTime(DEFAULT_START_DATE_TIME)
            .endDateTime(DEFAULT_END_DATE_TIME)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .status(DEFAULT_STATUS);
        return vehicleTaskDetails;
    }

    @Before
    public void initTest() {
        vehicleTaskDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleTaskDetails() throws Exception {
        int databaseSizeBeforeCreate = vehicleTaskDetailsRepository.findAll().size();

        // Create the VehicleTaskDetails
        restVehicleTaskDetailsMockMvc.perform(post("/api/vehicle-task-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTaskDetails)))
            .andExpect(status().isCreated());

        // Validate the VehicleTaskDetails in the database
        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleTaskDetails testVehicleTaskDetails = vehicleTaskDetailsList.get(vehicleTaskDetailsList.size() - 1);
        assertThat(testVehicleTaskDetails.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleTaskDetails.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVehicleTaskDetails.getStartDateTime()).isEqualTo(DEFAULT_START_DATE_TIME);
        assertThat(testVehicleTaskDetails.getEndDateTime()).isEqualTo(DEFAULT_END_DATE_TIME);
        assertThat(testVehicleTaskDetails.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testVehicleTaskDetails.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testVehicleTaskDetails.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testVehicleTaskDetails.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testVehicleTaskDetails.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createVehicleTaskDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleTaskDetailsRepository.findAll().size();

        // Create the VehicleTaskDetails with an existing ID
        vehicleTaskDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleTaskDetailsMockMvc.perform(post("/api/vehicle-task-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTaskDetails)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleTaskDetails in the database
        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskDetailsRepository.findAll().size();
        // set the field null
        vehicleTaskDetails.setName(null);

        // Create the VehicleTaskDetails, which fails.

        restVehicleTaskDetailsMockMvc.perform(post("/api/vehicle-task-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTaskDetails)))
            .andExpect(status().isBadRequest());

        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleTaskDetailsRepository.findAll().size();
        // set the field null
        vehicleTaskDetails.setDescription(null);

        // Create the VehicleTaskDetails, which fails.

        restVehicleTaskDetailsMockMvc.perform(post("/api/vehicle-task-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTaskDetails)))
            .andExpect(status().isBadRequest());

        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleTaskDetails() throws Exception {
        // Initialize the database
        vehicleTaskDetailsRepository.saveAndFlush(vehicleTaskDetails);

        // Get all the vehicleTaskDetailsList
        restVehicleTaskDetailsMockMvc.perform(get("/api/vehicle-task-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleTaskDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
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
    public void getVehicleTaskDetails() throws Exception {
        // Initialize the database
        vehicleTaskDetailsRepository.saveAndFlush(vehicleTaskDetails);

        // Get the vehicleTaskDetails
        restVehicleTaskDetailsMockMvc.perform(get("/api/vehicle-task-details/{id}", vehicleTaskDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleTaskDetails.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
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
    public void getNonExistingVehicleTaskDetails() throws Exception {
        // Get the vehicleTaskDetails
        restVehicleTaskDetailsMockMvc.perform(get("/api/vehicle-task-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleTaskDetails() throws Exception {
        // Initialize the database
        vehicleTaskDetailsService.save(vehicleTaskDetails);

        int databaseSizeBeforeUpdate = vehicleTaskDetailsRepository.findAll().size();

        // Update the vehicleTaskDetails
        VehicleTaskDetails updatedVehicleTaskDetails = vehicleTaskDetailsRepository.findOne(vehicleTaskDetails.getId());
        // Disconnect from session so that the updates on updatedVehicleTaskDetails are not directly saved in db
        em.detach(updatedVehicleTaskDetails);
        updatedVehicleTaskDetails
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .startDateTime(UPDATED_START_DATE_TIME)
            .endDateTime(UPDATED_END_DATE_TIME)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .status(UPDATED_STATUS);

        restVehicleTaskDetailsMockMvc.perform(put("/api/vehicle-task-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleTaskDetails)))
            .andExpect(status().isOk());

        // Validate the VehicleTaskDetails in the database
        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeUpdate);
        VehicleTaskDetails testVehicleTaskDetails = vehicleTaskDetailsList.get(vehicleTaskDetailsList.size() - 1);
        assertThat(testVehicleTaskDetails.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleTaskDetails.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVehicleTaskDetails.getStartDateTime()).isEqualTo(UPDATED_START_DATE_TIME);
        assertThat(testVehicleTaskDetails.getEndDateTime()).isEqualTo(UPDATED_END_DATE_TIME);
        assertThat(testVehicleTaskDetails.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testVehicleTaskDetails.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testVehicleTaskDetails.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testVehicleTaskDetails.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testVehicleTaskDetails.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleTaskDetails() throws Exception {
        int databaseSizeBeforeUpdate = vehicleTaskDetailsRepository.findAll().size();

        // Create the VehicleTaskDetails

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVehicleTaskDetailsMockMvc.perform(put("/api/vehicle-task-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleTaskDetails)))
            .andExpect(status().isCreated());

        // Validate the VehicleTaskDetails in the database
        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVehicleTaskDetails() throws Exception {
        // Initialize the database
        vehicleTaskDetailsService.save(vehicleTaskDetails);

        int databaseSizeBeforeDelete = vehicleTaskDetailsRepository.findAll().size();

        // Get the vehicleTaskDetails
        restVehicleTaskDetailsMockMvc.perform(delete("/api/vehicle-task-details/{id}", vehicleTaskDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VehicleTaskDetails> vehicleTaskDetailsList = vehicleTaskDetailsRepository.findAll();
        assertThat(vehicleTaskDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleTaskDetails.class);
        VehicleTaskDetails vehicleTaskDetails1 = new VehicleTaskDetails();
        vehicleTaskDetails1.setId(1L);
        VehicleTaskDetails vehicleTaskDetails2 = new VehicleTaskDetails();
        vehicleTaskDetails2.setId(vehicleTaskDetails1.getId());
        assertThat(vehicleTaskDetails1).isEqualTo(vehicleTaskDetails2);
        vehicleTaskDetails2.setId(2L);
        assertThat(vehicleTaskDetails1).isNotEqualTo(vehicleTaskDetails2);
        vehicleTaskDetails1.setId(null);
        assertThat(vehicleTaskDetails1).isNotEqualTo(vehicleTaskDetails2);
    }
}
