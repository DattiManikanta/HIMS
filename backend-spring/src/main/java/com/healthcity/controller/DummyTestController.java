package com.healthcity.controller;

import com.healthcity.config.FallbackStorageService;
import com.healthcity.model.DummyRecord;
import com.healthcity.repository.DummyRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dummy-test")
@CrossOrigin(origins = "*")
public class DummyTestController {

    private static final Logger logger = LoggerFactory.getLogger(DummyTestController.class);

    @Autowired
    private DummyRecordRepository dummyRecordRepository;

    @Autowired
    private FallbackStorageService fallbackStorageService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> saveDummyRecord(@RequestBody Map<String, Object> body) {
        String name = body.get("name") != null ? body.get("name").toString().trim() : "";
        if (name.isEmpty()) {
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("error", "Client Name is required");
            return ResponseEntity.badRequest().body(err);
        }

        try {
            DummyRecord record = new DummyRecord(name);
            DummyRecord saved = dummyRecordRepository.save(record);

            Map<String, Object> res = new HashMap<>();
            res.put("success", true);
            res.put("id", saved.getId());
            res.put("name", saved.getName());
            res.put("table", "at_dummy_table");
            res.put("column", "name");
            res.put("message", "Successfully inserted '" + name + "' into MySQL table 'at_dummy_table' via Spring Boot JPA!");
            logger.info("✓ Inserted into MySQL at_dummy_table: id={}, name='{}'", saved.getId(), name);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            logger.error("Error inserting into at_dummy_table: {}", e.getMessage());
            Map<String, Object> err = new HashMap<>();
            err.put("success", false);
            err.put("error", "MySQL Database Error: Could not save to 'at_dummy_table': " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDummyRecords() {
        Map<String, Object> res = new HashMap<>();
        try {
            List<DummyRecord> records = dummyRecordRepository.findAllByOrderByIdDesc();
            List<Map<String, Object>> list = new ArrayList<>();
            for (DummyRecord r : records) {
                Map<String, Object> m = new HashMap<>();
                m.put("id", r.getId());
                m.put("name", r.getName());
                m.put("created_at", r.getCreatedAt() != null ? r.getCreatedAt().toString() : "");
                m.put("source", "Live MySQL (at_healthcity.at_dummy_table via Spring Boot)");
                m.put("savedToMySQL", true);
                list.add(m);
            }
            res.put("source", "Live MySQL (at_healthcity.at_dummy_table via Spring Boot)");
            res.put("connected", true);
            res.put("count", list.size());
            res.put("records", list);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            logger.warn("MySQL read failed for at_dummy_table, loading local fallback: {}", e.getMessage());
            Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
            @SuppressWarnings("unchecked")
            List<Object> cached = (List<Object>) fallback.getOrDefault("dummy_records", new ArrayList<>());
            res.put("source", "Local Fallback Cache (MySQL currently offline)");
            res.put("connected", false);
            res.put("count", cached.size());
            res.put("records", cached);
            return ResponseEntity.ok(res);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteDummyRecord(@PathVariable("id") Long id) {
        boolean deletedFromMysql = false;
        try {
            dummyRecordRepository.deleteById(id);
            deletedFromMysql = true;
        } catch (Exception e) {
            logger.error("Error deleting record {}: {}", id, e.getMessage());
        }

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("deletedFromMySQL", deletedFromMysql);
        res.put("id", id);
        return ResponseEntity.ok(res);
    }
}
