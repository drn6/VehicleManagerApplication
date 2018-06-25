package fr.drn.app.vma.web.rest;

import fr.drn.app.vma.VehicleManagerApplicationApp;

import fr.drn.app.vma.domain.Cost;
import fr.drn.app.vma.repository.CostRepository;
import fr.drn.app.vma.service.CostService;
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

import fr.drn.app.vma.domain.enumeration.CostType;
import fr.drn.app.vma.domain.enumeration.StatusType;
/**
 * Test class for the CostResource REST controller.
 *
 * @see CostResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VehicleManagerApplicationApp.class)
public class CostResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final CostType DEFAULT_TYPE = CostType.KM;
    private static final CostType UPDATED_TYPE = CostType.DRIVER;

    private static final Double DEFAULT_COST = 1D;
    private static final Double UPDATED_COST = 2D;

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
    private CostRepository costRepository;

    @Autowired
    private CostService costService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCostMockMvc;

    private Cost cost;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CostResource costResource = new CostResource(costService);
        this.restCostMockMvc = MockMvcBuilders.standaloneSetup(costResource)
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
    public static Cost createEntity(EntityManager em) {
        Cost cost = new Cost()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .cost(DEFAULT_COST)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .status(DEFAULT_STATUS);
        return cost;
    }

    @Before
    public void initTest() {
        cost = createEntity(em);
    }

    @Test
    @Transactional
    public void createCost() throws Exception {
        int databaseSizeBeforeCreate = costRepository.findAll().size();

        // Create the Cost
        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cost)))
            .andExpect(status().isCreated());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeCreate + 1);
        Cost testCost = costList.get(costList.size() - 1);
        assertThat(testCost.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCost.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCost.getCost()).isEqualTo(DEFAULT_COST);
        assertThat(testCost.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testCost.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCost.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testCost.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testCost.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createCostWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = costRepository.findAll().size();

        // Create the Cost with an existing ID
        cost.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cost)))
            .andExpect(status().isBadRequest());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = costRepository.findAll().size();
        // set the field null
        cost.setName(null);

        // Create the Cost, which fails.

        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cost)))
            .andExpect(status().isBadRequest());

        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = costRepository.findAll().size();
        // set the field null
        cost.setType(null);

        // Create the Cost, which fails.

        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cost)))
            .andExpect(status().isBadRequest());

        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCostIsRequired() throws Exception {
        int databaseSizeBeforeTest = costRepository.findAll().size();
        // set the field null
        cost.setCost(null);

        // Create the Cost, which fails.

        restCostMockMvc.perform(post("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cost)))
            .andExpect(status().isBadRequest());

        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCosts() throws Exception {
        // Initialize the database
        costRepository.saveAndFlush(cost);

        // Get all the costList
        restCostMockMvc.perform(get("/api/costs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cost.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].cost").value(hasItem(DEFAULT_COST.doubleValue())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getCost() throws Exception {
        // Initialize the database
        costRepository.saveAndFlush(cost);

        // Get the cost
        restCostMockMvc.perform(get("/api/costs/{id}", cost.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cost.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.cost").value(DEFAULT_COST.doubleValue()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCost() throws Exception {
        // Get the cost
        restCostMockMvc.perform(get("/api/costs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCost() throws Exception {
        // Initialize the database
        costService.save(cost);

        int databaseSizeBeforeUpdate = costRepository.findAll().size();

        // Update the cost
        Cost updatedCost = costRepository.findOne(cost.getId());
        // Disconnect from session so that the updates on updatedCost are not directly saved in db
        em.detach(updatedCost);
        updatedCost
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .cost(UPDATED_COST)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .status(UPDATED_STATUS);

        restCostMockMvc.perform(put("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCost)))
            .andExpect(status().isOk());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeUpdate);
        Cost testCost = costList.get(costList.size() - 1);
        assertThat(testCost.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCost.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCost.getCost()).isEqualTo(UPDATED_COST);
        assertThat(testCost.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testCost.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCost.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testCost.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testCost.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingCost() throws Exception {
        int databaseSizeBeforeUpdate = costRepository.findAll().size();

        // Create the Cost

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCostMockMvc.perform(put("/api/costs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cost)))
            .andExpect(status().isCreated());

        // Validate the Cost in the database
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCost() throws Exception {
        // Initialize the database
        costService.save(cost);

        int databaseSizeBeforeDelete = costRepository.findAll().size();

        // Get the cost
        restCostMockMvc.perform(delete("/api/costs/{id}", cost.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cost> costList = costRepository.findAll();
        assertThat(costList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cost.class);
        Cost cost1 = new Cost();
        cost1.setId(1L);
        Cost cost2 = new Cost();
        cost2.setId(cost1.getId());
        assertThat(cost1).isEqualTo(cost2);
        cost2.setId(2L);
        assertThat(cost1).isNotEqualTo(cost2);
        cost1.setId(null);
        assertThat(cost1).isNotEqualTo(cost2);
    }
}
