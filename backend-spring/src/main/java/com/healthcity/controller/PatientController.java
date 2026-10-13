package com.healthcity.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcity.config.FallbackStorageService;
import com.healthcity.model.Patient;
import com.healthcity.model.PatientPrescription;
import com.healthcity.model.PatientVital;
import com.healthcity.repository.PatientPrescriptionRepository;
import com.healthcity.repository.PatientRepository;
import com.healthcity.repository.PatientVitalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
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
    private FallbackStorageService fallbackStorageService;

    @GetMapping("/records")
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
            logger.warn("Database fetch failed in /api/records, falling back to local JSON: {}", e.getMessage());
        }

        // Fallback
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        Map<String, Object> fallbackPatients = (Map<String, Object>) fallback.getOrDefault("patients", new HashMap<>());
        return ResponseEntity.ok(fallbackPatients);
    }

    @GetMapping("/records/{token}")
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

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerPatient(@RequestBody Map<String, Object> data) {
        String token = data.get("token") != null ? data.get("token").toString() : "TOK-" + (System.currentTimeMillis() % 10000);
        String opId = data.get("opId") != null ? data.get("opId").toString() : "OP-2026-" + (System.currentTimeMillis() % 10000);
        String patientName = data.get("patientName") != null ? data.get("patientName").toString() : "Unknown";
        int age = data.get("age") != null ? Integer.parseInt(data.get("age").toString()) : 0;
        String gender = data.get("gender") != null ? data.get("gender").toString() : "Other";
        String phone = data.get("phone") != null ? data.get("phone").toString() : "";
        String bloodGroup = data.get("bloodGroup") != null ? data.get("bloodGroup").toString() : "B+";
        String department = data.get("department") != null ? data.get("department").toString() : "General Medicine";
        String departmentCode = data.get("departmentCode") != null ? data.get("departmentCode").toString() : "GEN";
        String doctor = data.get("doctor") != null ? data.get("doctor").toString() : "Consultant Doctor";
        String room = data.get("room") != null ? data.get("room").toString() : "OP Cabin";
        String priority = data.get("priority") != null ? data.get("priority").toString() : "Regular";
        String visitDate = data.get("visitDate") != null ? data.get("visitDate").toString() : new SimpleDateFormat("dd-MMM-yyyy").format(new Date());
        String visitType = data.get("visitType") != null ? data.get("visitType").toString() : "OPD Consultation";
        String symptoms = data.get("symptoms") != null ? data.get("symptoms").toString() : "General Outpatient checkup";
        String diagnosis = data.get("diagnosis") != null ? data.get("diagnosis").toString() : "Initial OP Intake";
        String doctorNotes = data.get("doctorNotes") != null ? data.get("doctorNotes").toString() : "Registered at OPD Desk";

        Object vitalsObj = data.get("vitals");
        Object prescriptionObj = data.get("prescription");
        Object testsObj = data.get("recommendedTests");
        Object paymentObj = data.get("payment");

        String vitalsJson = toJson(vitalsObj);
        String prescriptionJson = toJson(prescriptionObj);
        String testsJson = toJson(testsObj);
        String paymentJson = toJson(paymentObj);

        boolean savedToDb = false;
        try {
            Patient patient = new Patient();
            patient.setToken(token);
            patient.setOpId(opId);
            patient.setPatientName(patientName);
            patient.setAge(age);
            patient.setGender(gender);
            patient.setPhone(phone);
            patient.setBloodGroup(bloodGroup);
            patient.setDepartment(department);
            patient.setDepartmentCode(departmentCode);
            patient.setDoctor(doctor);
            patient.setRoom(room);
            patient.setPriority(priority);
            patient.setVisitDate(visitDate);
            patient.setVisitType(visitType);
            patient.setSymptoms(symptoms);
            patient.setDiagnosis(diagnosis);
            patient.setDoctorNotes(doctorNotes);
            patient.setPaymentJson(paymentJson);
            patient.setVitalsJson(vitalsJson);
            patient.setUpdatedAt(new Date());
            patientRepository.save(patient);

            // Save vitals
            if (vitalsObj instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, Object> vm = (Map<String, Object>) vitalsObj;
                PatientVital pv = new PatientVital();
                pv.setToken(token);
                pv.setBp(str(vm.get("bp")));
                pv.setPulse(str(vm.get("pulse")));
                pv.setSpo2(str(vm.get("spo2")));
                pv.setTemp(str(vm.get("temp")));
                pv.setWeight(str(vm.get("weight")));
                pv.setBmi(str(vm.get("bmi")));
                pv.setBloodSugar(str(vm.get("bloodSugar")));
                pv.setTriageNotes("Registration desk triage");
                patientVitalRepository.save(pv);
            }

            // Save prescriptions
            PatientPrescription pp = new PatientPrescription();
            pp.setToken(token);
            pp.setPrescriptionItems(prescriptionJson);
            pp.setRecommendedTests(testsJson);
            pp.setDoctorNotes(doctorNotes);
            patientPrescriptionRepository.save(pp);

            savedToDb = true;
            logger.info("✓ Patient {} ({}) registered successfully in MySQL via Spring Boot", patientName, token);
        } catch (Exception e) {
            logger.error("Could not register patient in database: {}", e.getMessage());
        }

        // Update fallback
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        Map<String, Object> pMap = (Map<String, Object>) fallback.computeIfAbsent("patients", k -> new HashMap<>());
        pMap.put(token, data);
        fallbackStorageService.saveFallbackData(fallback);

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("savedToDatabase", savedToDb);
        res.put("token", token);
        res.put("opId", opId);
        res.put("record", data);

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/vitals")
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

        // Update fallback
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

        try {
            List<PatientPrescription> list = patientPrescriptionRepository.findByTokenOrderByIdDesc(p.getToken());
            if (!list.isEmpty()) {
                PatientPrescription pp = list.get(0);
                m.put("prescription", parseJson(pp.getPrescriptionItems(), List.class, Collections.emptyList()));
                m.put("recommendedTests", parseJson(pp.getRecommendedTests(), List.class, Collections.emptyList()));
            } else {
                m.put("prescription", Collections.emptyList());
                m.put("recommendedTests", Collections.emptyList());
            }
        } catch (Exception ignored) {
            m.put("prescription", Collections.emptyList());
            m.put("recommendedTests", Collections.emptyList());
        }

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
        return val != null ? val.toString() : "";
    }
}
