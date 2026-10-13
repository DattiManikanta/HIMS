package com.healthcity.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthcity.config.FallbackStorageService;
import com.healthcity.model.DepartmentQueue;
import com.healthcity.repository.DepartmentQueueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    private static final Logger logger = LoggerFactory.getLogger(DepartmentController.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private DepartmentQueueRepository departmentQueueRepository;

    @Autowired
    private FallbackStorageService fallbackStorageService;

    @GetMapping
    public ResponseEntity<List<Object>> getDepartments() {
        try {
            List<DepartmentQueue> list = departmentQueueRepository.findAll();
            if (!list.isEmpty()) {
                List<Object> res = new ArrayList<>();
                for (DepartmentQueue dq : list) {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", dq.getDepartmentId());
                    m.put("name", dq.getDepartmentName());
                    m.put("code", dq.getCode());
                    m.put("currentToken", dq.getCurrentToken());
                    m.put("nextToken", dq.getNextToken());
                    m.put("status", dq.getStatus());
                    try {
                        m.put("queue", objectMapper.readValue(dq.getQueueItems(), new TypeReference<List<Object>>() {}));
                    } catch (Exception e) {
                        m.put("queue", Collections.emptyList());
                    }
                    res.add(m);
                }
                return ResponseEntity.ok(res);
            }
        } catch (Exception e) {
            logger.warn("Could not load departments from DB, using fallback: {}", e.getMessage());
        }

        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        @SuppressWarnings("unchecked")
        List<Object> deps = (List<Object>) fallback.getOrDefault("departments", Collections.emptyList());
        return ResponseEntity.ok(deps);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> updateDepartments(@RequestBody List<Map<String, Object>> departments) {
        boolean savedToDb = false;
        try {
            for (Map<String, Object> dep : departments) {
                String id = dep.get("id") != null ? dep.get("id").toString() : "";
                if (!id.isEmpty()) {
                    DepartmentQueue dq = new DepartmentQueue();
                    dq.setDepartmentId(id);
                    dq.setDepartmentName(dep.get("name") != null ? dep.get("name").toString() : "");
                    dq.setCode(dep.get("code") != null ? dep.get("code").toString() : "");
                    dq.setCurrentToken(dep.get("currentToken") != null ? dep.get("currentToken").toString() : "");
                    dq.setNextToken(dep.get("nextToken") != null ? dep.get("nextToken").toString() : "");
                    dq.setStatus(dep.get("status") != null ? dep.get("status").toString() : "");
                    dq.setQueueItems(objectMapper.writeValueAsString(dep.get("queue")));
                    dq.setUpdatedAt(new Date());
                    departmentQueueRepository.save(dq);
                }
            }
            savedToDb = true;
        } catch (Exception e) {
            logger.error("Error saving departments to DB: {}", e.getMessage());
        }

        // Update fallback
        Map<String, Object> fallback = fallbackStorageService.loadFallbackData();
        fallback.put("departments", departments);
        fallbackStorageService.saveFallbackData(fallback);

        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("savedToDatabase", savedToDb);
        return ResponseEntity.ok(res);
    }
}
