package com.healthcity.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcity.config.FallbackStorageService;
import com.healthcity.model.PharmacyInvoice;
import com.healthcity.repository.PharmacyInvoiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pharmacy")
@CrossOrigin(origins = "*")
public class PharmacyController {

    private static final Logger logger = LoggerFactory.getLogger(PharmacyController.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private PharmacyInvoiceRepository pharmacyInvoiceRepository;

    @Autowired
    private FallbackStorageService fallbackStorageService;

    @PostMapping("/dispense")
    public ResponseEntity<Map<String, Object>> savePharmacyInvoice(@RequestBody Map<String, Object> invoice) {
        String invNo = invoice.get("invoiceNo") != null ? invoice.get("invoiceNo").toString() 
                : "PHARM-INV-" + (System.currentTimeMillis() % 100000);

        boolean savedToDb = false;
        try {
            PharmacyInvoice pi = new PharmacyInvoice();
            pi.setInvoiceNo(invNo);
            pi.setToken(str(invoice.get("token")));
            pi.setOpId(str(invoice.get("opId")));
            pi.setPatientName(str(invoice.get("patientName")));
            pi.setDoctor(str(invoice.get("doctor")));
            pi.setDepartment(str(invoice.get("department")));
            pi.setPharmacistName(str(invoice.get("pharmacistName")));
            pi.setItems(objectMapper.writeValueAsString(invoice.get("items")));
            pi.setSubtotal(toDouble(invoice.get("subtotal")));
            pi.setTax(toDouble(invoice.get("tax")));
            pi.setGrandTotal(toDouble(invoice.get("grandTotal")));
            pi.setDispenseDate(str(invoice.get("dispenseDate")));
            pi.setDispenseTime(str(invoice.get("dispenseTime")));

            pharmacyInvoiceRepository.save(pi);
            savedToDb = true;
            logger.info("✓ Pharmacy invoice {} saved to database via Spring Boot.", invNo);
        } catch (Exception e) {
            logger.error("Error saving pharmacy invoice: {}", e.getMessage());
        }

        // Update fallback
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        Map<String, Object> invoices = (Map<String, Object>) fallback.computeIfAbsent("pharmacy_invoices", k -> new HashMap<>());
        invoices.put(invNo, invoice);
        fallbackStorageService.saveFallbackData(fallback);

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("savedToDatabase", savedToDb);
        res.put("invoiceNo", invNo);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    private String str(Object val) {
        return val != null ? val.toString() : "";
    }

    private Double toDouble(Object val) {
        if (val == null) return 0.0;
        try {
            return Double.parseDouble(val.toString());
        } catch (Exception e) {
            return 0.0;
        }
    }
}
