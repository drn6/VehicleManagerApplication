package fr.drn.app.vma.web.rest;

import fr.drn.app.vma.VehicleManagerApplicationApp;

import fr.drn.app.vma.domain.VehicleServiceCost;
import fr.drn.app.vma.repository.VehicleServiceCostRepository;
import fr.drn.app.vma.service.VehicleServiceCostService;
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
import java.time.temporal.ChronoUnit;
import java.util.List;

import static fr.drn.app.vma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.drn.app.vma.domain.enumeration.VehicleServiceCostType;
import fr.drn.app.vma.domain.enumeration.StatusType;
/**
 * Test class for the VehicleServiceCostResource REST controller.
 *
 * @see VehicleServiceCostResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleManagerApplicationApp.class)
public class VehicleServiceCostResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final VehicleServiceCostType DEFAULT_TYPE = VehicleServiceCostType.SPECIAL;
    private static final VehicleServiceCostType UPDATED_TYPE = VehicleServiceCostType.REGULAR;

    private static final Double DEFAULT_PER_DAY = 1D;
    private static final Double UPDATED_PER_DAY = 2D;

    private static final Double DEFAULT_PER_KM = 1D;
    private static final Double UPDATED_PER_KM = 2D;

    private static final Double DEFAULT_PER_DIVER = 1D;
    private static final Double UPDATED_PER_DIVER = 2D;

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
    private VehicleServiceCostRepository vehicleServiceCostRepository;

    @Autowired
    private VehicleServiceCostService vehicleServiceCostService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVehicleServiceCostMockMvc;

    private VehicleServiceCost vehicleServiceCost;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VehicleServiceCostResource vehicleServiceCostResource = new VehicleServiceCostResource(vehicleServiceCostService);
        this.restVehicleServiceCostMockMvc = MockMvcBuilders.standaloneSetup(vehicleServiceCostResource)
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
    public static VehicleServiceCost createEntity(EntityManager em) {
        VehicleServiceCost vehicleServiceCost = new VehicleServiceCost()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .perDay(DEFAULT_PER_DAY)
            .perKM(DEFAULT_PER_KM)
            .perDiver(DEFAULT_PER_DIVER)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .status(DEFAULT_STATUS);
        return vehicleServiceCost;
    }

    @Before
    public void initTest() {
        vehicleServiceCost = createEntity(em);
    }

    @Test
    @Transactional
    public void createVehicleServiceCost() throws Exception {
        int databaseSizeBeforeCreate = vehicleServiceCostRepository.findAll().size();

        // Create the VehicleServiceCost
        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isCreated());

        // Validate the VehicleServiceCost in the database
        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeCreate + 1);
        VehicleServiceCost testVehicleServiceCost = vehicleServiceCostList.get(vehicleServiceCostList.size() - 1);
        assertThat(testVehicleServiceCost.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVehicleServiceCost.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testVehicleServiceCost.getPerDay()).isEqualTo(DEFAULT_PER_DAY);
        assertThat(testVehicleServiceCost.getPerKM()).isEqualTo(DEFAULT_PER_KM);
        assertThat(testVehicleServiceCost.getPerDiver()).isEqualTo(DEFAULT_PER_DIVER);
        assertThat(testVehicleServiceCost.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testVehicleServiceCost.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testVehicleServiceCost.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testVehicleServiceCost.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testVehicleServiceCost.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createVehicleServiceCostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vehicleServiceCostRepository.findAll().size();

        // Create the VehicleServiceCost with an existing ID
        vehicleServiceCost.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isBadRequest());

        // Validate the VehicleServiceCost in the database
        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleServiceCostRepository.findAll().size();
        // set the field null
        vehicleServiceCost.setName(null);

        // Create the VehicleServiceCost, which fails.

        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isBadRequest());

        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleServiceCostRepository.findAll().size();
        // set the field null
        vehicleServiceCost.setType(null);

        // Create the VehicleServiceCost, which fails.

        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isBadRequest());

        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPerDayIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleServiceCostRepository.findAll().size();
        // set the field null
        vehicleServiceCost.setPerDay(null);

        // Create the VehicleServiceCost, which fails.

        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isBadRequest());

        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPerKMIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleServiceCostRepository.findAll().size();
        // set the field null
        vehicleServiceCost.setPerKM(null);

        // Create the VehicleServiceCost, which fails.

        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isBadRequest());

        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPerDiverIsRequired() throws Exception {
        int databaseSizeBeforeTest = vehicleServiceCostRepository.findAll().size();
        // set the field null
        vehicleServiceCost.setPerDiver(null);

        // Create the VehicleServiceCost, which fails.

        restVehicleServiceCostMockMvc.perform(post("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isBadRequest());

        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVehicleServiceCosts() throws Exception {
        // Initialize the database
        vehicleServiceCostRepository.saveAndFlush(vehicleServiceCost);

        // Get all the vehicleServiceCostList
        restVehicleServiceCostMockMvc.perform(get("/api/vehicle-service-costs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vehicleServiceCost.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].perDay").value(hasItem(DEFAULT_PER_DAY.doubleValue())))
            .andExpect(jsonPath("$.[*].perKM").value(hasItem(DEFAULT_PER_KM.doubleValue())))
            .andExpect(jsonPath("$.[*].perDiver").value(hasItem(DEFAULT_PER_DIVER.doubleValue())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getVehicleServiceCost() throws Exception {
        // Initialize the database
        vehicleServiceCostRepository.saveAndFlush(vehicleServiceCost);

        // Get the vehicleServiceCost
        restVehicleServiceCostMockMvc.perform(get("/api/vehicle-service-costs/{id}", vehicleServiceCost.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vehicleServiceCost.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.perDay").value(DEFAULT_PER_DAY.doubleValue()))
            .andExpect(jsonPath("$.perKM").value(DEFAULT_PER_KM.doubleValue()))
            .andExpect(jsonPath("$.perDiver").value(DEFAULT_PER_DIVER.doubleValue()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVehicleServiceCost() throws Exception {
        // Get the vehicleServiceCost
        restVehicleServiceCostMockMvc.perform(get("/api/vehicle-service-costs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVehicleServiceCost() throws Exception {
        // Initialize the database
        vehicleServiceCostService.save(vehicleServiceCost);

        int databaseSizeBeforeUpdate = vehicleServiceCostRepository.findAll().size();

        // Update the vehicleServiceCost
        VehicleServiceCost updatedVehicleServiceCost = vehicleServiceCostRepository.findOne(vehicleServiceCost.getId());
        // Disconnect from session so that the updates on updatedVehicleServiceCost are not directly saved in db
        em.detach(updatedVehicleServiceCost);
        updatedVehicleServiceCost
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .perDay(UPDATED_PER_DAY)
            .perKM(UPDATED_PER_KM)
            .perDiver(UPDATED_PER_DIVER)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .status(UPDATED_STATUS);

        restVehicleServiceCostMockMvc.perform(put("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVehicleServiceCost)))
            .andExpect(status().isOk());

        // Validate the VehicleServiceCost in the database
        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeUpdate);
        VehicleServiceCost testVehicleServiceCost = vehicleServiceCostList.get(vehicleServiceCostList.size() - 1);
        assertThat(testVehicleServiceCost.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVehicleServiceCost.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testVehicleServiceCost.getPerDay()).isEqualTo(UPDATED_PER_DAY);
        assertThat(testVehicleServiceCost.getPerKM()).isEqualTo(UPDATED_PER_KM);
        assertThat(testVehicleServiceCost.getPerDiver()).isEqualTo(UPDATED_PER_DIVER);
        assertThat(testVehicleServiceCost.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testVehicleServiceCost.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testVehicleServiceCost.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testVehicleServiceCost.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testVehicleServiceCost.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingVehicleServiceCost() throws Exception {
        int databaseSizeBeforeUpdate = vehicleServiceCostRepository.findAll().size();

        // Create the VehicleServiceCost

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVehicleServiceCostMockMvc.perform(put("/api/vehicle-service-costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vehicleServiceCost)))
            .andExpect(status().isCreated());

        // Validate the VehicleServiceCost in the database
        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVehicleServiceCost() throws Exception {
        // Initialize the database
        vehicleServiceCostService.save(vehicleServiceCost);

        int databaseSizeBeforeDelete = vehicleServiceCostRepository.findAll().size();

        // Get the vehicleServiceCost
        restVehicleServiceCostMockMvc.perform(delete("/api/vehicle-service-costs/{id}", vehicleServiceCost.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VehicleServiceCost> vehicleServiceCostList = vehicleServiceCostRepository.findAll();
        assertThat(vehicleServiceCostList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VehicleServiceCost.class);
        VehicleServiceCost vehicleServiceCost1 = new VehicleServiceCost();
        vehicleServiceCost1.setId(1L);
        VehicleServiceCost vehicleServiceCost2 = new VehicleServiceCost();
        vehicleServiceCost2.setId(vehicleServiceCost1.getId());
        assertThat(vehicleServiceCost1).isEqualTo(vehicleServiceCost2);
        vehicleServiceCost2.setId(2L);
        assertThat(vehicleServiceCost1).isNotEqualTo(vehicleServiceCost2);
        vehicleServiceCost1.setId(null);
        assertThat(vehicleServiceCost1).isNotEqualTo(vehicleServiceCost2);
    }
}
