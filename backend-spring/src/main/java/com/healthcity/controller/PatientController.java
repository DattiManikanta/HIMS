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
            long count = 334253;
            try {
                count += atPrPatientRepository.count();
            } catch (Exception ignored) {}
            umrNo = "UMR" + (count + 1);
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

        // 1. Try to save in MySQL/PostgreSQL via JPA
        try {
            // Save at_pr_patient
            AtPrPatient pat = new AtPrPatient();
            pat.setUmrNum(umrNo);
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
            pat.setPatientCategory(category);
            pat.setPatientCategoryName(category);
            pat.setDob(dob);
            pat.setStatusId(34);
            pat.setDocStatus("y");
            pat.setAddedBy(userName);
            pat.setAddedIp(userIp);
            pat.setRegDt(new Date());
            pat.setAddedOn(new Date());

            AtPrPatient savedPat = atPrPatientRepository.save(pat);
            savedPatientId = savedPat.getPatientId();

            // Save at_pr_appt
            AtPrAppt appt = new AtPrAppt();
            appt.setPatientId(savedPatientId);
            appt.setUmrNum(umrNo);
            appt.setOpNum(opId);
            appt.setTokenNum(token);
            appt.setDocName(doctor);
            appt.setDeptName(department);
            appt.setVisitType("174");
            appt.setApptStatusId("159");
            appt.setBillStatus("17"); // Paid
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

            // Save at_bills
            AtBill bill = new AtBill();
            bill.setPatientId(savedPatientId);
            bill.setApptId(savedApptId);
            bill.setUmrNum(umrNo);
            bill.setBillNo("BL-" + System.currentTimeMillis() % 100000);
            bill.setBillAmt(totAmt);
            bill.setAmtReceived(amtRecd);
            bill.setPaymentType(paymentMode.isEmpty() ? "Cash" : paymentMode);
            bill.setAddedBy(userName);
            bill.setAddedIp(userIp);
            atBillRepository.save(bill);

            // Also synchronize with patients table
            Patient p = new Patient();
            p.setToken(token);
            p.setOpId(umrNo);
            p.setPatientName(fullName);
            p.setAge(age);
            p.setGender(gender);
            p.setPhone(mobNum);
            p.setBloodGroup(bloodGroup);
            p.setDepartment(department);
            p.setDepartmentCode("GEN");
            p.setDoctor(doctor);
            p.setRoom("Cabin 101");
            p.setPriority("Regular");
            p.setVisitDate(visitDate);
            p.setVisitType("OPD Consultation");
            p.setSymptoms(str(data.get("healthIssue")));
            p.setDiagnosis("OP Intake Completed");
            p.setDoctorNotes("Registered in at_pr_patient / at_pr_appt");
            p.setPaymentJson(toJson(data.get("payment")));
            p.setVitalsJson(toJson(data.get("vitals")));
            p.setUpdatedAt(new Date());
            patientRepository.save(p);

            savedToDb = true;
            logger.info("✓ Patient {} (UMR: {}) saved to database (at_pr_patient, at_pr_appt, at_bills, patients)", fullName, umrNo);
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

        // 1. Try fetching from DB (at_pr_appt joined with at_pr_patient)
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

        // 2. Fallback Queue
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> fallbackQueue = (List<Map<String, Object>>) fallback.get("patientQueue");
        if (fallbackQueue != null && !fallbackQueue.isEmpty()) {
            return ResponseEntity.ok(fallbackQueue);
        }

        // Initialize default seed queue if empty
        List<Map<String, Object>> seedQueue = createSeedQueue();
        fallback.put("patientQueue", seedQueue);
        fallbackStorageService.saveFallbackData(fallback);

        return ResponseEntity.ok(seedQueue);
    }

    // =========================================================================
    // 4. SEARCH PATIENTS (By UMR, Phone, or Name)
    // =========================================================================
    @GetMapping(value = {"/api/patient/search", "/patient/searchPatients"})
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
                m.put("category", p.getPatientCategory());
                matches.add(m);
            }
            if (!matches.isEmpty()) return ResponseEntity.ok(matches);
        } catch (Exception ignored) {}

        // Fallback search
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

        try {
            Optional<AtPrPatient> opt = Optional.empty();
            if (patientId != null) opt = atPrPatientRepository.findById(patientId);
            if (!opt.isPresent() && umrNo != null) opt = atPrPatientRepository.findByUmrNum(umrNo);

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

        // Fallback
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

    private List<Map<String, Object>> createSeedQueue() {
        List<Map<String, Object>> list = new ArrayList<>();
        list.add(createSeedItem(1, "UMR334253", "1", "VENKATA RAMANA", "MALE/45yrs", "MALE", 45, "09-Oct-2026", "SATYANARAYANA V VSN", "GENERAL", "Paid", 50, 0, 0, 1000, 0, 0, "9848022334"));
        list.add(createSeedItem(2, "UMR334252", "CAR-104", "TOTA RAMANA", "MALE/45yrs", "MALE", 45, "08-Oct-2026", "R LALITHA LA", "GENERAL", "Paid", 50, 0, 0, 800, 0, 0, "9848123456"));
        list.add(createSeedItem(3, "UMR334251", "ORT-082", "JAYANTI PANIGRAHI", "FEMALE/58yrs", "FEMALE", 58, "08-Oct-2026", "RAKESH TUMULA RT", "GENERAL", "Paid", 0, 0, 0, 1450, 0, 0, "9440112233"));
        list.add(createSeedItem(4, "UMR334249", "CAR-105", "LANKE DURGA", "FEMALE/35yrs", "FEMALE", 35, "08-Oct-2026", "ANIL KUMAR MAHAPATRO AKM", "GENERAL", "Paid", 50, 0, 0, 850, 0, 0, "9989445566"));
        list.add(createSeedItem(5, "UMR334248", "GEN-211", "ASHOK KUMAR JENA", "MALE/48yrs", "MALE", 48, "08-Oct-2026", "R LALITHA LA", "GENERAL", "Paid", 50, 0, 0, 850, 0, 0, "9866123987"));
        list.add(createSeedItem(6, "UMR334247", "GEN-212", "KAMA MAJHI", "MALE/31yrs", "MALE", 31, "08-Oct-2026", "RAMESH NAIDU M RNM", "GENERAL", "Paid", 50, 0, 0, 600, 0, 0, "9701234567"));
        return list;
    }

    private Map<String, Object> createSeedItem(int id, String umr, String token, String name, String genderAge, String gender, int age, String dt, String doc, String cat, String billSts, double rc, double rcr, double ru, double cc, double ccr, double cu, String phone) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("patientId", id);
        m.put("apptId", 100 + id);
        m.put("umrNo", umr);
        m.put("patientCode", umr);
        m.put("tokenNum", token);
        m.put("token", token);
        m.put("patientName", name);
        m.put("pname", name);
        m.put("genderAge", genderAge);
        m.put("gender", gender);
        m.put("age", age);
        m.put("appointmentDate", dt);
        m.put("apptDt", dt);
        m.put("consultant", doc);
        m.put("docName", doc);
        m.put("category", cat);
        m.put("patientCategory", cat);
        m.put("billStatus", billSts);
        m.put("statusInfo", "Waiting");
        m.put("regFee", rc + rcr + ru);
        m.put("consFee", cc + ccr + cu);
        m.put("totAmt", rc + rcr + ru + cc + ccr + cu);
        m.put("amtRecd", rc + rcr + ru + cc + ccr + cu);
        m.put("regAmoCash", rc);
        m.put("regCash", rc);
        m.put("regAmoCard", rcr);
        m.put("regCredit", rcr);
        m.put("regAmoUpi", ru);
        m.put("regUpi", ru);
        m.put("conAmoCash", cc);
        m.put("conCash", cc);
        m.put("conAmoCard", ccr);
        m.put("conCredit", ccr);
        m.put("conAmoUpi", cu);
        m.put("conUpi", cu);
        m.put("phone", phone);
        m.put("mobNum", phone);
        return m;
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
