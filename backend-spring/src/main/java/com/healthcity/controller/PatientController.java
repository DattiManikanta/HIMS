package com.healthcity.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcity.config.FallbackStorageService;
import com.healthcity.model.*;
import com.healthcity.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class PatientController {

    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientVitalRepository patientVitalRepository;

    @Autowired
    private PatientPrescriptionRepository patientPrescriptionRepository;

    @Autowired
    private AtPrPatientRepository atPrPatientRepository;

    @Autowired
    private AtPrApptRepository atPrApptRepository;

    @Autowired
    private AtBillRepository atBillRepository;

    @Autowired
    private FallbackStorageService fallbackStorageService;

    private static final java.util.concurrent.atomic.AtomicLong umrCounter = 
        new java.util.concurrent.atomic.AtomicLong(334260L + (System.currentTimeMillis() % 100000L));

    @Autowired(required = false)
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    // Real MySQL query joining at_pr_patient, at_pr_appt, and at_hr_emp
    private static final String PATIENT_QUEUE_QUERY =
            "SELECT " +
            "    p.patient_id AS patientId, " +
            "    a.patient_appt_id AS apptId, " +
            "    p.last_name AS lName, " +
            "    p.patient_name AS pname, " +
            "    TRIM(CONCAT(COALESCE(p.title, ''), ' ', COALESCE(p.patient_name, ''), ' ', COALESCE(p.last_name, ''))) AS patientName, " +
            "    p.umr_num AS patientCode, " +
            "    p.umr_num AS umrNo, " +
            "    COALESCE(a.token_num, 0) AS tokenNum, " +
            "    CONCAT('OPD-', COALESCE(a.token_num, 0)) AS token, " +
            "    COALESCE(e.emp_name, 'General Physician') AS docName, " +
            "    COALESCE(e.emp_name, 'General Physician') AS consultant, " +
            "    COALESCE(a.diseases_desc, 'General Medicine') AS department, " +
            "    p.gender AS gender, " +
            "    p.blood_grp AS bloodGrp, " +
            "    p.blood_grp AS bloodGroup, " +
            "    p.mob_num AS mobNum, " +
            "    p.mob_num AS phone, " +
            "    p.age AS age, " +
            "    CONCAT(UPPER(COALESCE(p.gender, 'MALE')), '/', COALESCE(p.age, '0'), 'yrs') AS genderAge, " +
            "    p.title AS ptitle, " +
            "    p.title AS title, " +
            "    p.parent_name AS parentName, " +
            "    COALESCE(p.patient_category_name, 'GENERAL') AS pntCat, " +
            "    COALESCE(p.patient_category_name, 'GENERAL') AS patientCategory, " +
            "    COALESCE(p.patient_category_name, 'GENERAL') AS category, " +
            "    CASE " +
            "        WHEN a.appt_status_id = 42 THEN 'Visited' " +
            "        WHEN a.appt_status_id = 41 THEN 'Cancelled' " +
            "        ELSE 'Waiting' " +
            "    END AS statusInfo, " +
            "    'Paid' AS billStatus, " +
            "    COALESCE(a.op_num, p.umr_num) AS opCode, " +
            "    COALESCE(a.op_num, p.umr_num) AS opId, " +
            "    a.schedule_dt AS apptDt, " +
            "    a.schedule_dt AS appointmentDate, " +
            "    p.state AS state, " +
            "    p.city AS city, " +
            "    p.village AS village, " +
            "    p.addr AS addr, " +
            "    p.addr AS address, " +
            "    p.marital_status AS maritalStatus, " +
            "    p.religion AS religion, " +
            "    p.id_proof_type AS idProofType, " +
            "    p.id_proof_num AS idProofNum, " +
            "    p.occupation AS occupation, " +
            "    p.dob AS dob, " +
            "    50.0 AS regFee, " +
            "    850.0 AS consFee, " +
            "    900.0 AS totAmt, " +
            "    900.0 AS amtRecd " +
            "FROM at_pr_patient p " +
            "JOIN at_pr_appt a ON p.patient_id = a.patient_id " +
            "LEFT JOIN at_hr_emp e ON a.emp_id = e.emp_id " +
            "ORDER BY a.patient_appt_id DESC LIMIT 100";

    // =========================================================================
    // 1. LEGACY & MODERN REGISTRATION (Save Patient & Create Appointment/Bill)
    // =========================================================================
    @PostMapping(value = {"/api/register", "/api/patient/register", "/patient/registerPatient"})
    public ResponseEntity<Map<String, Object>> registerPatient(
            @RequestBody(required = false) Map<String, Object> bodyData,
            @RequestParam(required = false) Map<String, String> paramData,
            HttpServletRequest request) {

        Map<String, Object> data = bodyData != null ? new HashMap<>(bodyData) : new HashMap<>();
        if (paramData != null) {
            for (Map.Entry<String, String> e : paramData.entrySet()) {
                if (!data.containsKey(e.getKey())) {
                    data.put(e.getKey(), e.getValue());
                }
            }
        }

        String userIp = request != null ? request.getRemoteAddr() : "127.0.0.1";
        String userName = "RECEPTIONIST";

        // Generate UMR Number if missing
        String umrNo = str(data.get("umrNo"));
        if (umrNo.isEmpty()) umrNo = str(data.get("patientCode"));
        if (umrNo.isEmpty()) umrNo = str(data.get("opId"));
        if (umrNo.isEmpty()) {
            umrNo = "UMR" + umrCounter.incrementAndGet();
        }

        String token = str(data.get("token"));
        if (token.isEmpty()) token = str(data.get("tokenNum"));
        if (token.isEmpty()) {
            token = "OPD-" + (120 + (int)(System.currentTimeMillis() % 1000));
        }

        String opId = str(data.get("opId"));
        if (opId.isEmpty()) opId = umrNo;

        String ptitle = str(data.get("title"));
        if (ptitle.isEmpty()) ptitle = str(data.get("ptitle"));
        if (ptitle.isEmpty()) ptitle = "Mr";

        String pname = str(data.get("patientName"));
        if (pname.isEmpty()) pname = str(data.get("pname"));
        if (pname.isEmpty()) pname = "Unknown Patient";

        String lastName = str(data.get("lastName"));
        if (lastName.isEmpty()) lastName = str(data.get("lName"));

        String fullName = (ptitle + " " + pname + " " + lastName).trim();

        int age = parseInt(data.get("age"), parseInt(data.get("years"), 30));
        String gender = str(data.get("gender"));
        if (gender.isEmpty()) gender = "Male";

        String mobNum = str(data.get("phone"));
        if (mobNum.isEmpty()) mobNum = str(data.get("mobile"));
        if (mobNum.isEmpty()) mobNum = str(data.get("mobNum"));

        String bloodGroup = str(data.get("bloodGroup"));
        if (bloodGroup.isEmpty()) bloodGroup = str(data.get("bloodGrp"));
        if (bloodGroup.isEmpty()) bloodGroup = "B+";

        String category = str(data.get("category"));
        if (category.isEmpty()) category = str(data.get("pntCat"));
        if (category.isEmpty()) category = "GENERAL";

        String doctor = str(data.get("doctor"));
        if (doctor.isEmpty()) doctor = str(data.get("consultant"));
        if (doctor.isEmpty()) doctor = str(data.get("docName"));
        if (doctor.isEmpty()) doctor = "SATYANARAYANA V VSN";

        String department = str(data.get("department"));
        if (department.isEmpty()) department = str(data.get("departmentName"));
        if (department.isEmpty()) department = "General Medicine";

        String address = str(data.get("address"));
        if (address.isEmpty()) address = str(data.get("addr"));

        String village = str(data.get("village"));
        String city = str(data.get("city"));
        if (city.isEmpty()) city = "Visakhapatnam";
        String state = str(data.get("state"));
        if (state.isEmpty()) state = "Andhra Pradesh";
        String country = str(data.get("country"));
        if (country.isEmpty()) country = "India";

        String parentName = str(data.get("parentName"));
        if (parentName.isEmpty()) parentName = str(data.get("parentOrHusband"));

        String idProofType = str(data.get("idProofType"));
        if (idProofType.isEmpty()) idProofType = str(data.get("idType"));
        if (idProofType.isEmpty()) idProofType = "Aadhaar Card";

        String idProofNum = str(data.get("idProofNum"));
        if (idProofNum.isEmpty()) idProofNum = str(data.get("idNumber"));

        String maritalStatus = str(data.get("maritalStatus"));
        String occupation = str(data.get("occupation"));
        String dob = str(data.get("dob"));

        // Fees Breakdown
        double regFee = parseDouble(data.get("regFee"), parseDouble(data.get("regAmount"), 50.0));
        double consFee = parseDouble(data.get("consFee"), parseDouble(data.get("consAmount"), 850.0));
        double totAmt = parseDouble(data.get("totAmt"), parseDouble(data.get("totalAmount"), regFee + consFee));
        double amtRecd = parseDouble(data.get("amtRecd"), parseDouble(data.get("amountReceived"), totAmt));

        double regCash = parseDouble(data.get("regCash"), parseDouble(data.get("regAmoCash"), 0.0));
        double regCard = parseDouble(data.get("regCard"), parseDouble(data.get("regAmoCard"), 0.0));
        double regUpi = parseDouble(data.get("regUpi"), parseDouble(data.get("regAmoUpi"), 0.0));

        double conCash = parseDouble(data.get("conCash"), parseDouble(data.get("conAmoCash"), 0.0));
        double conCard = parseDouble(data.get("conCard"), parseDouble(data.get("conAmoCard"), 0.0));
        double conUpi = parseDouble(data.get("conUpi"), parseDouble(data.get("conAmoUpi"), 0.0));

        String paymentMode = str(data.get("paymentMode"));
        if (regCash == 0 && regCard == 0 && regUpi == 0 && conCash == 0 && conCard == 0 && conUpi == 0) {
            if ("UPI".equalsIgnoreCase(paymentMode)) {
                regUpi = regFee;
                conUpi = consFee;
            } else if ("Credit".equalsIgnoreCase(paymentMode) || "Card".equalsIgnoreCase(paymentMode)) {
                regCard = regFee;
                conCard = consFee;
            } else {
                regCash = regFee;
                conCash = consFee;
            }
        }

        String todayStr = new SimpleDateFormat("dd-MMM-yyyy").format(new Date());
        String visitDate = str(data.get("visitDate"));
        if (visitDate.isEmpty()) visitDate = str(data.get("appointmentDate"));
        if (visitDate.isEmpty()) visitDate = todayStr;

        boolean savedToDb = false;
        Integer savedPatientId = null;
        Integer savedApptId = null;

        // Resolve doctor emp_id matching MySQL at_hr_emp
        int empId = 21586; // default Dr. R Lalitha
        if (doctor.toUpperCase().contains("ANIL") || doctor.toUpperCase().contains("MAHAPATRO")) empId = 21306;
        else if (doctor.toUpperCase().contains("RAKESH") || doctor.toUpperCase().contains("TUMULA")) empId = 21461;
        else if (doctor.toUpperCase().contains("LALITHA")) empId = 21586;
        else if (doctor.toUpperCase().contains("SRIDHAR")) empId = 21261;
        else if (doctor.toUpperCase().contains("SUJATHA")) empId = 21262;
        else if (doctor.toUpperCase().contains("RAMESH")) empId = 21465;
        else if (doctor.toUpperCase().contains("GANGARAJU")) empId = 21431;

        // 1. Try to save in MySQL via JPA
        try {
            // Check if patient with this UMR already exists in MySQL
            AtPrPatient pat = null;
            if (!umrNo.isEmpty()) {
                try {
                    String clean = umrNo.replaceAll("(?i)^UMR", "");
                    String pref = umrNo.toUpperCase().startsWith("UMR") ? umrNo : ("UMR" + umrNo);
                    Optional<AtPrPatient> existingOpt = atPrPatientRepository.findByUmrNum(umrNo);
                    if (!existingOpt.isPresent()) existingOpt = atPrPatientRepository.findByUmrNum(clean);
                    if (!existingOpt.isPresent()) existingOpt = atPrPatientRepository.findByUmrNum(pref);
                    if (existingOpt.isPresent()) {
                        pat = existingOpt.get();
                        logger.info("Reusing existing patient record ID {} for UMR {}", pat.getPatientId(), umrNo);
                    }
                } catch (Exception ignored) {}
            }
            if (pat == null) {
                pat = new AtPrPatient();
                pat.setUmrNum(umrNo);
                pat.setRegDt(new Date());
            }
            pat.setPatientName(pname);
            pat.setLastName(lastName);
            pat.setTitle(ptitle);
            pat.setGender(gender);
            pat.setAge(String.valueOf(age));
            pat.setMobNum(mobNum);
            pat.setAddr(address);
            pat.setVillage(village);
            pat.setCity(city);
            pat.setState(state);
            pat.setCountry(country);
            pat.setBloodGrp(bloodGroup);
            pat.setMaritalStatus(maritalStatus);
            pat.setParentName(parentName);
            pat.setIdProofType(idProofType);
            pat.setIdProofNum(idProofNum);
            pat.setOccupation(occupation);
            pat.setPatientCategory(0);
            pat.setPatientCategoryName(category.isEmpty() ? "GENERAL" : category);
            pat.setDob(dob);
            pat.setStatusId(34);
            pat.setEmpId(empId);
            pat.setAddedBy(userName);
            pat.setAddedIp(userIp);
            pat.setAddedOn(new Date());

            AtPrPatient savedPat = atPrPatientRepository.save(pat);
            savedPatientId = savedPat.getPatientId();
            savedToDb = true;
            logger.info("✓ Patient {} (UMR: {}) saved directly to MySQL 'at_pr_patient' table with ID: {}", fullName, umrNo, savedPatientId);

            // Save at_pr_appt
            try {
                AtPrAppt appt = new AtPrAppt();
                appt.setPatientId(savedPatientId);
                appt.setUmrNum(umrNo);
                appt.setOpNum(opId);
                appt.setTokenNum(token);
                appt.setEmpId(empId);
                appt.setDocName(doctor);
                appt.setDeptName(department);
                appt.setVisitType(174);
                appt.setApptStatusId(159);
                appt.setBillStatus(17); // Paid
                appt.setScheduleDt(visitDate);
                appt.setRegFee(regFee);
                appt.setConsFee(consFee);
                appt.setTotAmt(totAmt);
                appt.setAmtRecd(amtRecd);
                appt.setRegCash(regCash);
                appt.setRegCard(regCard);
                appt.setRegUpi(regUpi);
                appt.setConCash(conCash);
                appt.setConCard(conCard);
                appt.setConUpi(conUpi);
                appt.setAddedBy(userName);
                appt.setAddedIp(userIp);
                appt.setAddedOn(new Date());

                AtPrAppt savedAppt = atPrApptRepository.save(appt);
                savedApptId = savedAppt.getPatientApptId();
                logger.info("✓ Appointment/Token saved directly to MySQL 'at_pr_appt' table with Appt ID: {}", savedApptId);
            } catch (Exception apptEx) {
                logger.warn("Could not save to at_pr_appt: {}", apptEx.getMessage());
            }

            // Save at_bills (optional)
            try {
                AtBill bill = new AtBill();
                bill.setPatientId(savedPatientId);
                bill.setApptId(savedApptId != null ? savedApptId : 0);
                bill.setUmrNum(umrNo);
                bill.setBillNo("BL-" + System.currentTimeMillis() % 100000);
                bill.setBillAmt(totAmt);
                bill.setAmtReceived(amtRecd);
                bill.setPaymentType(paymentMode.isEmpty() ? "Cash" : paymentMode);
                bill.setAddedBy(userName);
                bill.setAddedIp(userIp);
                atBillRepository.save(bill);
            } catch (Exception billEx) {
                logger.debug("Optional at_bills save skipped: {}", billEx.getMessage());
            }


        } catch (Exception e) {
            logger.warn("Could not write directly to DB, updating local fallback cache: {}", e.getMessage());
        }

        // 2. Persist to Fallback JSON Cache
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> queueList = (List<Map<String, Object>>) fallback.computeIfAbsent("patientQueue", k -> new ArrayList<>());

        Map<String, Object> queueRecord = new LinkedHashMap<>();
        queueRecord.put("patientId", savedPatientId != null ? savedPatientId : (1000 + queueList.size() + 1));
        queueRecord.put("apptId", savedApptId != null ? savedApptId : (2000 + queueList.size() + 1));
        queueRecord.put("patientCode", umrNo);
        queueRecord.put("umrNo", umrNo);
        queueRecord.put("tokenNum", token);
        queueRecord.put("token", token);
        queueRecord.put("pname", pname);
        queueRecord.put("lastName", lastName);
        queueRecord.put("title", ptitle);
        queueRecord.put("patientName", fullName);
        queueRecord.put("gender", gender);
        queueRecord.put("genderAge", gender.toUpperCase() + "/" + age + "yrs");
        queueRecord.put("age", age);
        queueRecord.put("mobNum", mobNum);
        queueRecord.put("phone", mobNum);
        queueRecord.put("docName", doctor);
        queueRecord.put("consultant", doctor);
        queueRecord.put("department", department);
        queueRecord.put("appointmentDate", visitDate);
        queueRecord.put("apptDt", visitDate);
        queueRecord.put("statusInfo", "Waiting");
        queueRecord.put("billStatus", "Paid");
        queueRecord.put("patientCategory", category);
        queueRecord.put("category", category);
        queueRecord.put("regFee", regFee);
        queueRecord.put("consFee", consFee);
        queueRecord.put("totAmt", totAmt);
        queueRecord.put("amtRecd", amtRecd);
        queueRecord.put("regAmoCash", regCash);
        queueRecord.put("regCash", regCash);
        queueRecord.put("regAmoCard", regCard);
        queueRecord.put("regCredit", regCard);
        queueRecord.put("regAmoUpi", regUpi);
        queueRecord.put("regUpi", regUpi);
        queueRecord.put("conAmoCash", conCash);
        queueRecord.put("conCash", conCash);
        queueRecord.put("conAmoCard", conCard);
        queueRecord.put("conCredit", conCard);
        queueRecord.put("conAmoUpi", conUpi);
        queueRecord.put("conUpi", conUpi);
        queueRecord.put("address", address);
        queueRecord.put("village", village);
        queueRecord.put("city", city);
        queueRecord.put("idProofType", idProofType);
        queueRecord.put("idProofNum", idProofNum);
        queueRecord.put("bloodGroup", bloodGroup);
        queueRecord.put("parentName", parentName);

        // Prepend to top of queue
        queueList.add(0, queueRecord);

        // Also update fallback patients map
        @SuppressWarnings("unchecked")
        Map<String, Object> fallbackPatients = (Map<String, Object>) fallback.computeIfAbsent("patients", k -> new HashMap<>());
        fallbackPatients.put(token, queueRecord);

        fallbackStorageService.saveFallbackData(fallback);

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("success", true);
        response.put("savedToDatabase", savedToDb);
        response.put("patientId", queueRecord.get("patientId"));
        response.put("apptId", queueRecord.get("apptId"));
        response.put("patientCode", umrNo);
        response.put("umrNo", umrNo);
        response.put("tokenNum", token);
        response.put("token", token);
        response.put("patientName", fullName);
        response.put("message", "Patient registered successfully (" + umrNo + ").");
        response.put("record", queueRecord);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // =========================================================================
    // 2. PATIENT UPDATE (Update Patient Record in at_pr_patient & at_pr_appt)
    // =========================================================================
    @PostMapping(value = {"/api/update", "/api/patient/update", "/patient/updatePatientRecord"})
    public ResponseEntity<Map<String, Object>> updatePatientRecord(
            @RequestBody(required = false) Map<String, Object> bodyData,
            @RequestParam(required = false) Map<String, String> paramData,
            HttpServletRequest request) {

        Map<String, Object> data = bodyData != null ? new HashMap<>(bodyData) : new HashMap<>();
        if (paramData != null) {
            for (Map.Entry<String, String> e : paramData.entrySet()) {
                if (!data.containsKey(e.getKey())) {
                    data.put(e.getKey(), e.getValue());
                }
            }
        }

        String userIp = request != null ? request.getRemoteAddr() : "127.0.0.1";
        String userName = "RECEPTIONIST";

        String umrNo = str(data.get("umrNo"));
        if (umrNo.isEmpty()) umrNo = str(data.get("patientCode"));
        Integer patientId = parseIntObj(data.get("patientId"));

        String pname = str(data.get("patientName"));
        if (pname.isEmpty()) pname = str(data.get("pname"));

        String lastName = str(data.get("lastName"));
        if (lastName.isEmpty()) lastName = str(data.get("lName"));

        String title = str(data.get("title"));
        if (title.isEmpty()) title = str(data.get("ptitle"));

        String fullName = (title + " " + pname + " " + lastName).trim();

        String mobNum = str(data.get("phone"));
        if (mobNum.isEmpty()) mobNum = str(data.get("mobile"));
        if (mobNum.isEmpty()) mobNum = str(data.get("mobNum"));

        String gender = str(data.get("gender"));
        int age = parseInt(data.get("age"), parseInt(data.get("years"), 30));
        String bloodGroup = str(data.get("bloodGroup"));
        if (bloodGroup.isEmpty()) bloodGroup = str(data.get("bloodGrp"));

        String address = str(data.get("address"));
        if (address.isEmpty()) address = str(data.get("addr"));
        String village = str(data.get("village"));
        String city = str(data.get("city"));
        String category = str(data.get("category"));
        if (category.isEmpty()) category = str(data.get("pntCat"));
        String consultant = str(data.get("consultant"));
        if (consultant.isEmpty()) consultant = str(data.get("doctor"));
        if (consultant.isEmpty()) consultant = str(data.get("docName"));

        boolean updatedInDb = false;

        // 1. Try DB Update
        try {
            Optional<AtPrPatient> opt = Optional.empty();
            if (patientId != null) {
                opt = atPrPatientRepository.findById(patientId);
            }
            if (!opt.isPresent() && !umrNo.isEmpty()) {
                opt = atPrPatientRepository.findByUmrNum(umrNo);
            }

            if (opt.isPresent()) {
                AtPrPatient pat = opt.get();
                if (!pname.isEmpty()) pat.setPatientName(pname);
                if (!lastName.isEmpty()) pat.setLastName(lastName);
                if (!title.isEmpty()) pat.setTitle(title);
                if (!gender.isEmpty()) pat.setGender(gender);
                if (age > 0) pat.setAge(String.valueOf(age));
                if (!mobNum.isEmpty()) pat.setMobNum(mobNum);
                if (!address.isEmpty()) pat.setAddr(address);
                if (!village.isEmpty()) pat.setVillage(village);
                if (!city.isEmpty()) pat.setCity(city);
                if (!bloodGroup.isEmpty()) pat.setBloodGrp(bloodGroup);
                if (!category.isEmpty()) {
                    pat.setPatientCategory(category);
                    pat.setPatientCategoryName(category);
                }
                pat.setModifiedBy(userName);
                pat.setModifiedIp(userIp);
                pat.setModifiedOn(new Date());
                atPrPatientRepository.save(pat);

                // Update appointment if doctor or fee changed
                List<AtPrAppt> appts = atPrApptRepository.findByPatientIdOrderByPatientApptIdDesc(pat.getPatientId());
                if (!appts.isEmpty()) {
                    AtPrAppt appt = appts.get(0);
                    if (!consultant.isEmpty()) appt.setDocName(consultant);
                    atPrApptRepository.save(appt);
                }

                updatedInDb = true;
                logger.info("✓ Patient {} (UMR: {}) updated successfully in database", fullName, pat.getUmrNum());
            }
        } catch (Exception e) {
            logger.warn("Could not update directly in DB: {}", e.getMessage());
        }

        // 2. Update Fallback Cache
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> queueList = (List<Map<String, Object>>) fallback.computeIfAbsent("patientQueue", k -> new ArrayList<>());

        boolean foundInQueue = false;
        for (Map<String, Object> item : queueList) {
            String itemUmr = str(item.get("umrNo"));
            if (itemUmr.isEmpty()) itemUmr = str(item.get("patientCode"));
            String itemId = str(item.get("patientId"));

            if ((!umrNo.isEmpty() && umrNo.equalsIgnoreCase(itemUmr)) ||
                (patientId != null && String.valueOf(patientId).equals(itemId))) {

                if (!pname.isEmpty()) item.put("pname", pname);
                if (!lastName.isEmpty()) item.put("lastName", lastName);
                if (!title.isEmpty()) item.put("title", title);
                item.put("patientName", fullName.isEmpty() ? item.get("patientName") : fullName);
                if (!gender.isEmpty()) item.put("gender", gender);
                if (age > 0) item.put("age", age);
                item.put("genderAge", gender.toUpperCase() + "/" + age + "yrs");
                if (!mobNum.isEmpty()) {
                    item.put("mobNum", mobNum);
                    item.put("phone", mobNum);
                }
                if (!address.isEmpty()) item.put("address", address);
                if (!village.isEmpty()) item.put("village", village);
                if (!city.isEmpty()) item.put("city", city);
                if (!bloodGroup.isEmpty()) item.put("bloodGroup", bloodGroup);
                if (!category.isEmpty()) {
                    item.put("category", category);
                    item.put("patientCategory", category);
                }
                if (!consultant.isEmpty()) {
                    item.put("consultant", consultant);
                    item.put("docName", consultant);
                }
                foundInQueue = true;
                break;
            }
        }

        fallbackStorageService.saveFallbackData(fallback);

        Map<String, Object> res = new LinkedHashMap<>();
        res.put("success", true);
        res.put("updatedInDatabase", updatedInDb);
        res.put("patientCode", umrNo);
        res.put("umrNo", umrNo);
        res.put("patientName", fullName);
        res.put("message", "Patient " + fullName + " details updated successfully.");
        res.put("legacyResult", "1^<div class='col-md-12 alert alert-success alert-dismissable'><h5 style='color:white;' class='fa fa-check'></h5>Patient Details Updated.</div>^1");

        return ResponseEntity.ok(res);
    }

    // =========================================================================
    // 3. PATIENT QUEUE (Fetch Appointment Queue with UMR, Vitals & Fee Breakdown)
    // =========================================================================
    @GetMapping(value = {"/api/queue", "/api/patient/queue", "/patient/patientQueue"})
    public ResponseEntity<List<Map<String, Object>>> getPatientQueue(
            @RequestParam(required = false) String apptFromDate,
            @RequestParam(required = false) String apptToDate) {

        List<Map<String, Object>> result = new ArrayList<>();

        // 1. Try Native SQL Query directly from PatientMapper.xml
        if (jdbcTemplate != null) {
            try {
                List<Map<String, Object>> rows = jdbcTemplate.queryForList(PATIENT_QUEUE_QUERY);
                if (rows != null && !rows.isEmpty()) {
                    return ResponseEntity.ok(rows);
                }
            } catch (Exception e) {
                logger.warn("Native query on at_hospital failed, checking JPA repository: {}", e.getMessage());
            }
        }

        // 2. Try fetching from JPA repositories (at_pr_appt joined with at_pr_patient)
        try {
            List<AtPrAppt> appts = atPrApptRepository.findAllByOrderByPatientApptIdDesc();
            if (!appts.isEmpty()) {
                for (AtPrAppt a : appts) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("apptId", a.getPatientApptId());
                    row.put("patientId", a.getPatientId());
                    row.put("patientCode", a.getUmrNum());
                    row.put("umrNo", a.getUmrNum());
                    row.put("tokenNum", a.getTokenNum());
                    row.put("token", a.getTokenNum());
                    row.put("docName", a.getDocName());
                    row.put("consultant", a.getDocName());
                    row.put("department", a.getDeptName());
                    row.put("appointmentDate", a.getScheduleDt());
                    row.put("apptDt", a.getScheduleDt());
                    row.put("billStatus", "17".equals(a.getBillStatus()) ? "Paid" : "Pending");
                    row.put("statusInfo", "159".equals(a.getApptStatusId()) ? "Waiting" : "Visited");
                    row.put("regFee", a.getRegFee());
                    row.put("consFee", a.getConsFee());
                    row.put("totAmt", a.getTotAmt());
                    row.put("amtRecd", a.getAmtRecd());
                    row.put("regAmoCash", a.getRegCash());
                    row.put("regCash", a.getRegCash());
                    row.put("regAmoCard", a.getRegCard());
                    row.put("regCredit", a.getRegCard());
                    row.put("regAmoUpi", a.getRegUpi());
                    row.put("regUpi", a.getRegUpi());
                    row.put("conAmoCash", a.getConCash());
                    row.put("conCash", a.getConCash());
                    row.put("conAmoCard", a.getConCard());
                    row.put("conCredit", a.getConCard());
                    row.put("conAmoUpi", a.getConUpi());
                    row.put("conUpi", a.getConUpi());

                    // Get patient details
                    if (a.getPatientId() != null) {
                        Optional<AtPrPatient> patOpt = atPrPatientRepository.findById(a.getPatientId());
                        if (patOpt.isPresent()) {
                            AtPrPatient p = patOpt.get();
                            row.put("pname", p.getPatientName());
                            row.put("lastName", p.getLastName());
                            row.put("title", p.getTitle());
                            row.put("patientName", (str(p.getTitle()) + " " + str(p.getPatientName()) + " " + str(p.getLastName())).trim());
                            row.put("gender", p.getGender());
                            row.put("age", p.getAge());
                            row.put("genderAge", str(p.getGender()).toUpperCase() + "/" + str(p.getAge()) + "yrs");
                            row.put("mobNum", p.getMobNum());
                            row.put("phone", p.getMobNum());
                            row.put("category", p.getPatientCategory());
                            row.put("patientCategory", p.getPatientCategory());
                            row.put("address", p.getAddr());
                            row.put("village", p.getVillage());
                            row.put("city", p.getCity());
                        }
                    }

                    result.add(row);
                }
                if (!result.isEmpty()) {
                    return ResponseEntity.ok(result);
                }
            }
        } catch (Exception e) {
            logger.warn("Database queue lookup failed, using fallback queue: {}", e.getMessage());
        }

        // 3. Fallback Queue (strictly real registered records from cache, NO fake dummy seed)
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> fallbackQueue = (List<Map<String, Object>>) fallback.get("patientQueue");
        if (fallbackQueue != null && !fallbackQueue.isEmpty()) {
            return ResponseEntity.ok(fallbackQueue);
        }

        // Return empty list if no patient records exist (zero dummy mock records)
        return ResponseEntity.ok(Collections.emptyList());
    }

    // =========================================================================
    // 4. SEARCH PATIENTS (By UMR, Phone, or Name - Supports Legacy getPatDetOldDataaa)
    // =========================================================================
    @GetMapping(value = {"/api/patient/search", "/patient/searchPatients", "/patient/getPatDetOldDataaa", "/getPatDetOldDataaa"})
    public ResponseEntity<List<Map<String, Object>>> searchPatients(
            @RequestParam(required = false) String term,
            @RequestParam(required = false) String umrNo,
            @RequestParam(required = false) String mobNum,
            @RequestParam(required = false) String pname) {

        String searchTerm = str(term);
        if (searchTerm.isEmpty()) searchTerm = str(umrNo);
        if (searchTerm.isEmpty()) searchTerm = str(mobNum);
        if (searchTerm.isEmpty()) searchTerm = str(pname);

        List<Map<String, Object>> matches = new ArrayList<>();

        // 1. Native direct SQL search via JdbcTemplate (fast, searches all records regardless of status)
        if (jdbcTemplate != null && !searchTerm.trim().isEmpty()) {
            try {
                String cleanTerm = searchTerm.trim().replaceAll("(?i)^UMR", "");
                String sql = "SELECT " +
                        "    p.patient_id AS patientId, " +
                        "    p.umr_num AS umrNo, " +
                        "    p.umr_num AS patientCode, " +
                        "    p.patient_name AS pname, " +
                        "    COALESCE(p.last_name, '') AS lastName, " +
                        "    COALESCE(p.title, 'Mr.') AS title, " +
                        "    TRIM(CONCAT(COALESCE(p.title, ''), ' ', COALESCE(p.patient_name, ''), ' ', COALESCE(p.last_name, ''))) AS patientName, " +
                        "    COALESCE(p.gender, 'Male') AS gender, " +
                        "    COALESCE(p.age, '40') AS age, " +
                        "    COALESCE(p.mob_num, '') AS mobNum, " +
                        "    COALESCE(p.mob_num, '') AS phone, " +
                        "    COALESCE(p.addr, '') AS addr, " +
                        "    COALESCE(p.addr, '') AS address, " +
                        "    COALESCE(p.village, '') AS village, " +
                        "    COALESCE(p.city, 'Visakhapatnam') AS city, " +
                        "    COALESCE(p.state, 'Andhra Pradesh') AS state, " +
                        "    COALESCE(p.country, 'India') AS country, " +
                        "    COALESCE(p.blood_grp, 'B+') AS bloodGrp, " +
                        "    COALESCE(p.blood_grp, 'B+') AS bloodGroup, " +
                        "    COALESCE(p.patient_category_name, 'GENERAL - TRI') AS category, " +
                        "    COALESCE(p.patient_category_name, 'GENERAL - TRI') AS patientCategory, " +
                        "    COALESCE(p.id_proof_type, 'Aadhaar') AS idProofType, " +
                        "    COALESCE(p.id_proof_num, '') AS idProofNum, " +
                        "    COALESCE(p.parent_name, '') AS parentName, " +
                        "    COALESCE(p.dob, '') AS dob " +
                        "FROM at_pr_patient p " +
                        "WHERE p.umr_num LIKE ? " +
                        "   OR p.umr_num LIKE ? " +
                        "   OR p.patient_name LIKE ? " +
                        "   OR p.last_name LIKE ? " +
                        "   OR p.mob_num LIKE ? " +
                        "ORDER BY p.patient_id DESC LIMIT 50";

                String p1 = "%" + searchTerm.trim() + "%";
                String p2 = "%" + (cleanTerm.isEmpty() ? searchTerm.trim() : cleanTerm) + "%";
                List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, p1, p2, p1, p1, p1);
                if (rows != null && !rows.isEmpty()) {
                    return ResponseEntity.ok(rows);
                }
            } catch (Exception e) {
                logger.warn("Native SQL patient search failed, trying JPA: {}", e.getMessage());
            }
        }

        // 2. JPA Repository Search
        try {
            List<AtPrPatient> dbList = atPrPatientRepository.searchPatients(searchTerm);
            for (AtPrPatient p : dbList) {
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("patientId", p.getPatientId());
                m.put("umrNo", p.getUmrNum());
                m.put("patientCode", p.getUmrNum());
                m.put("pname", p.getPatientName());
                m.put("lastName", p.getLastName());
                m.put("title", p.getTitle());
                m.put("patientName", (str(p.getTitle()) + " " + str(p.getPatientName()) + " " + str(p.getLastName())).trim());
                m.put("gender", p.getGender());
                m.put("age", p.getAge());
                m.put("mobNum", p.getMobNum());
                m.put("phone", p.getMobNum());
                m.put("addr", p.getAddr());
                m.put("village", p.getVillage());
                m.put("city", p.getCity());
                m.put("state", p.getState());
                m.put("country", p.getCountry());
                m.put("bloodGrp", p.getBloodGrp());
                m.put("bloodGroup", p.getBloodGrp());
                m.put("category", p.getPatientCategory());
                m.put("patientCategory", p.getPatientCategoryName());
                m.put("idProofType", p.getIdProofType());
                m.put("idProofNum", p.getIdProofNum());
                m.put("parentName", p.getParentName());
                m.put("dob", p.getDob());
                matches.add(m);
            }
            if (!matches.isEmpty()) return ResponseEntity.ok(matches);
        } catch (Exception ignored) {}

        // 3. Fallback search
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> queue = (List<Map<String, Object>>) fallback.getOrDefault("patientQueue", Collections.emptyList());

        for (Map<String, Object> item : queue) {
            String u = str(item.get("umrNo")).toLowerCase();
            String n = str(item.get("patientName")).toLowerCase();
            String p = str(item.get("phone")).toLowerCase();
            String s = searchTerm.toLowerCase();

            if (s.isEmpty() || u.contains(s) || n.contains(s) || p.contains(s)) {
                matches.add(item);
            }
        }

        return ResponseEntity.ok(matches);
    }

    // =========================================================================
    // 5. GET PATIENT DETAILS (By patientId or umrNo)
    // =========================================================================
    @GetMapping(value = {"/api/patient/details", "/patient/getPatientDetails"})
    public ResponseEntity<Object> getPatientDetails(
            @RequestParam(required = false) Integer patientId,
            @RequestParam(required = false) String umrNo) {

        // 1. Native SQL query via JdbcTemplate
        if (jdbcTemplate != null && (umrNo != null || patientId != null)) {
            try {
                String rawUmr = str(umrNo);
                String cleanUmr = rawUmr.replaceAll("(?i)^UMR", "");
                String prefUmr = rawUmr.toUpperCase().startsWith("UMR") ? rawUmr : ("UMR" + rawUmr);
                String sql = "SELECT " +
                        "    p.patient_id AS patientId, " +
                        "    p.umr_num AS umrNo, " +
                        "    p.umr_num AS patientCode, " +
                        "    p.patient_name AS pname, " +
                        "    COALESCE(p.last_name, '') AS lastName, " +
                        "    COALESCE(p.title, 'Mr.') AS title, " +
                        "    TRIM(CONCAT(COALESCE(p.title, ''), ' ', COALESCE(p.patient_name, ''), ' ', COALESCE(p.last_name, ''))) AS patientName, " +
                        "    COALESCE(p.gender, 'Male') AS gender, " +
                        "    COALESCE(p.age, '40') AS age, " +
                        "    COALESCE(p.mob_num, '') AS mobNum, " +
                        "    COALESCE(p.mob_num, '') AS phone, " +
                        "    COALESCE(p.addr, '') AS addr, " +
                        "    COALESCE(p.addr, '') AS address, " +
                        "    COALESCE(p.village, '') AS village, " +
                        "    COALESCE(p.city, 'Visakhapatnam') AS city, " +
                        "    COALESCE(p.state, 'Andhra Pradesh') AS state, " +
                        "    COALESCE(p.country, 'India') AS country, " +
                        "    COALESCE(p.blood_grp, 'B+') AS bloodGrp, " +
                        "    COALESCE(p.blood_grp, 'B+') AS bloodGroup, " +
                        "    COALESCE(p.patient_category_name, 'GENERAL - TRI') AS category, " +
                        "    COALESCE(p.patient_category_name, 'GENERAL - TRI') AS patientCategory, " +
                        "    COALESCE(p.id_proof_type, 'Aadhaar') AS idProofType, " +
                        "    COALESCE(p.id_proof_num, '') AS idProofNum, " +
                        "    COALESCE(p.parent_name, '') AS parentName, " +
                        "    COALESCE(p.dob, '') AS dob " +
                        "FROM at_pr_patient p " +
                        "WHERE p.umr_num = ? OR p.umr_num = ? OR p.umr_num = ? OR p.patient_id = ? " +
                        "LIMIT 1";

                List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql, rawUmr, cleanUmr, prefUmr, patientId != null ? patientId : 0);
                if (rows != null && !rows.isEmpty()) {
                    return ResponseEntity.ok(rows.get(0));
                }
            } catch (Exception e) {
                logger.warn("Native SQL patient details failed: {}", e.getMessage());
            }
        }

        // 2. JPA Repository lookup
        try {
            Optional<AtPrPatient> opt = Optional.empty();
            if (patientId != null) opt = atPrPatientRepository.findById(patientId);
            if (!opt.isPresent() && umrNo != null) {
                opt = atPrPatientRepository.findByUmrNum(umrNo);
                if (!opt.isPresent()) opt = atPrPatientRepository.findByUmrNum(umrNo.replaceAll("(?i)^UMR", ""));
                if (!opt.isPresent()) opt = atPrPatientRepository.findByUmrNum("UMR" + umrNo.replaceAll("(?i)^UMR", ""));
            }

            if (opt.isPresent()) {
                AtPrPatient p = opt.get();
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("patientId", p.getPatientId());
                m.put("umrNo", p.getUmrNum());
                m.put("patientCode", p.getUmrNum());
                m.put("pname", p.getPatientName());
                m.put("lastName", p.getLastName());
                m.put("title", p.getTitle());
                m.put("patientName", (str(p.getTitle()) + " " + str(p.getPatientName()) + " " + str(p.getLastName())).trim());
                m.put("gender", p.getGender());
                m.put("age", p.getAge());
                m.put("mobNum", p.getMobNum());
                m.put("phone", p.getMobNum());
                m.put("addr", p.getAddr());
                m.put("village", p.getVillage());
                m.put("city", p.getCity());
                m.put("state", p.getState());
                m.put("country", p.getCountry());
                m.put("bloodGrp", p.getBloodGrp());
                m.put("category", p.getPatientCategory());
                m.put("idProofType", p.getIdProofType());
                m.put("idProofNum", p.getIdProofNum());
                m.put("parentName", p.getParentName());
                return ResponseEntity.ok(m);
            }
        } catch (Exception ignored) {}

        // 3. Fallback
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> queue = (List<Map<String, Object>>) fallback.getOrDefault("patientQueue", Collections.emptyList());

        for (Map<String, Object> item : queue) {
            String u = str(item.get("umrNo"));
            String pid = str(item.get("patientId"));
            if ((umrNo != null && umrNo.equalsIgnoreCase(u)) ||
                (patientId != null && String.valueOf(patientId).equals(pid))) {
                return ResponseEntity.ok(item);
            }
        }

        Map<String, Object> err = new HashMap<>();
        err.put("error", "Patient not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    // =========================================================================
    // 6. DELETE PATIENT RECORD (Soft Delete / Inactivate)
    // =========================================================================
    @PostMapping(value = {"/api/patient/delete", "/patient/deletePatientRecord"})
    public ResponseEntity<Map<String, Object>> deletePatientRecord(
            @RequestParam(required = false) Integer patientId,
            @RequestParam(required = false) String umrNo) {

        boolean deleted = false;
        try {
            if (patientId != null) {
                Optional<AtPrPatient> opt = atPrPatientRepository.findById(patientId);
                if (opt.isPresent()) {
                    AtPrPatient p = opt.get();
                    p.setStatusId(0); // Inactive
                    atPrPatientRepository.save(p);
                    deleted = true;
                }
            }
        } catch (Exception ignored) {}

        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> queue = (List<Map<String, Object>>) fallback.get("patientQueue");
        if (queue != null) {
            queue.removeIf(item -> {
                String u = str(item.get("umrNo"));
                String pid = str(item.get("patientId"));
                return (umrNo != null && umrNo.equalsIgnoreCase(u)) ||
                       (patientId != null && String.valueOf(patientId).equals(pid));
            });
            fallbackStorageService.saveFallbackData(fallback);
        }

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("deleted", deleted);
        res.put("message", "Patient record deleted / removed from active queue.");
        return ResponseEntity.ok(res);
    }

    // =========================================================================
    // EXISTING REST ENDPOINTS FOR COMPATIBILITY
    // =========================================================================
    @GetMapping("/api/records")
    public ResponseEntity<Map<String, Object>> getAllRecords() {
        Map<String, Object> result = new LinkedHashMap<>();
        try {
            List<Patient> patients = patientRepository.findAll();
            if (!patients.isEmpty()) {
                for (Patient p : patients) {
                    Map<String, Object> record = convertPatientToRecord(p);
                    result.put(p.getToken(), record);
                }
                return ResponseEntity.ok(result);
            }
        } catch (Exception e) {
            logger.warn("Database fetch failed in /api/records, falling back: {}", e.getMessage());
        }

        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        Map<String, Object> fallbackPatients = (Map<String, Object>) fallback.getOrDefault("patients", new HashMap<>());
        return ResponseEntity.ok(fallbackPatients);
    }

    @GetMapping("/api/records/{token}")
    public ResponseEntity<Object> getRecordByToken(@PathVariable("token") String token) {
        try {
            Optional<Patient> opt = patientRepository.findByToken(token);
            if (opt.isPresent()) {
                return ResponseEntity.ok(convertPatientToRecord(opt.get()));
            }
        } catch (Exception e) {
            logger.warn("Database lookup failed for token {}: {}", token, e.getMessage());
        }

        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        Map<String, Object> fallbackPatients = (Map<String, Object>) fallback.getOrDefault("patients", new HashMap<>());
        if (fallbackPatients.containsKey(token)) {
            return ResponseEntity.ok(fallbackPatients.get(token));
        }

        Map<String, Object> err = new HashMap<>();
        err.put("error", "Record with token " + token + " not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @PostMapping("/api/vitals")
    public ResponseEntity<Map<String, Object>> saveVitals(@RequestBody Map<String, Object> body) {
        String token = body.get("token") != null ? body.get("token").toString() : null;
        if (token == null || token.isEmpty()) {
            Map<String, Object> err = new HashMap<>();
            err.put("error", "Token is required");
            return ResponseEntity.badRequest().body(err);
        }

        Object vitalsData = body.get("vitalsData");
        String triageNotes = body.get("triageNotes") != null ? body.get("triageNotes").toString() : "Nursing station";
        String vitalsJson = toJson(vitalsData);

        boolean savedToDb = false;
        try {
            Optional<Patient> opt = patientRepository.findByToken(token);
            if (opt.isPresent()) {
                Patient p = opt.get();
                p.setVitalsJson(vitalsJson);
                p.setUpdatedAt(new Date());
                patientRepository.save(p);
            }

            if (vitalsData instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, Object> vm = (Map<String, Object>) vitalsData;
                PatientVital pv = new PatientVital();
                pv.setToken(token);
                pv.setBp(str(vm.get("bp")));
                pv.setPulse(str(vm.get("pulse")));
                pv.setSpo2(str(vm.get("spo2")));
                pv.setTemp(str(vm.get("temp")));
                pv.setWeight(str(vm.get("weight")));
                pv.setBmi(str(vm.get("bmi")));
                pv.setBloodSugar(str(vm.get("bloodSugar")));
                pv.setTriageNotes(triageNotes);
                patientVitalRepository.save(pv);
            }
            savedToDb = true;
        } catch (Exception e) {
            logger.error("Error saving vitals for token {}: {}", token, e.getMessage());
        }

        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        Map<String, Object> patients = (Map<String, Object>) fallback.get("patients");
        if (patients != null && patients.containsKey(token)) {
            @SuppressWarnings("unchecked")
            Map<String, Object> p = (Map<String, Object>) patients.get(token);
            p.put("vitals", vitalsData);
            fallbackStorageService.saveFallbackData(fallback);
        }

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("savedToDatabase", savedToDb);
        res.put("token", token);
        res.put("vitals", vitalsData);
        return ResponseEntity.ok(res);
    }

    private Map<String, Object> convertPatientToRecord(Patient p) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("token", p.getToken());
        m.put("opId", p.getOpId());
        m.put("patientName", p.getPatientName());
        m.put("age", p.getAge());
        m.put("gender", p.getGender());
        m.put("phone", p.getPhone());
        m.put("bloodGroup", p.getBloodGroup());
        m.put("department", p.getDepartment());
        m.put("departmentCode", p.getDepartmentCode());
        m.put("doctor", p.getDoctor());
        m.put("room", p.getRoom());
        m.put("priority", p.getPriority());
        m.put("visitDate", p.getVisitDate());
        m.put("visitType", p.getVisitType());
        m.put("symptoms", p.getSymptoms());
        m.put("diagnosis", p.getDiagnosis());
        m.put("doctorNotes", p.getDoctorNotes());
        m.put("payment", parseJson(p.getPaymentJson(), Map.class, Collections.emptyMap()));
        m.put("vitals", parseJson(p.getVitalsJson(), Map.class, Collections.emptyMap()));
        return m;
    }

    private String toJson(Object obj) {
        if (obj == null) return "{}";
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "{}";
        }
    }

    private <T> T parseJson(String json, Class<T> clazz, T fallback) {
        if (json == null || json.trim().isEmpty()) return fallback;
        try {
            return objectMapper.readValue(json, clazz);
        } catch (Exception e) {
            return fallback;
        }
    }

    private String str(Object val) {
        return val != null ? val.toString().trim() : "";
    }

    private int parseInt(Object val, int fallback) {
        if (val == null) return fallback;
        try {
            return Integer.parseInt(val.toString().trim());
        } catch (Exception e) {
            return fallback;
        }
    }

    private Integer parseIntObj(Object val) {
        if (val == null) return null;
        try {
            return Integer.valueOf(val.toString().trim());
        } catch (Exception e) {
            return null;
        }
    }

    private double parseDouble(Object val, double fallback) {
        if (val == null) return fallback;
        try {
            return Double.parseDouble(val.toString().trim());
        } catch (Exception e) {
            return fallback;
        }
    }
}
