package com.healthcity.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @Value("${spring.datasource.url:}")
    private String jdbcUrl;

    @Value("${spring.datasource.username:}")
    private String dbUser;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "INDUS HEALTH CITY Spring Boot HIMS Backend");
        response.put("engine", "Spring Boot 2.7.18 + Java 8 / Java 17");
        response.put("db_engine", "mysql");
        response.put("jdbc_url", jdbcUrl);
        response.put("db_user", dbUser);

        boolean dbConnected = false;
        long totalPatients = 0;
        String dbError = null;

        try (Connection conn = dataSource.getConnection()) {
            if (conn.isValid(3)) {
                dbConnected = true;
                try (PreparedStatement ps = conn.prepareStatement("SELECT COUNT(*) FROM patients")) {
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            totalPatients = rs.getLong(1);
                        }
                    }
                } catch (Exception ignored) {
                    // Table might not exist yet before first insert
                }
            }
        } catch (Exception e) {
            dbError = e.getMessage();
        }

        response.put("database_connected", dbConnected);
        response.put("database_type", dbConnected ? "MySQL (at_healthcity)" : "Offline / Local Fallback Active");
        response.put("total_patients", totalPatients);
        response.put("last_error", dbError);

        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/db/retry", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<Map<String, Object>> retryDb() {
        Map<String, Object> response = new HashMap<>();
        boolean connected = false;
        String error = null;

        try (Connection conn = dataSource.getConnection()) {
            connected = conn.isValid(3);
        } catch (Exception e) {
            error = e.getMessage();
        }

        response.put("success", connected);
        response.put("database_connected", connected);
        response.put("db_engine", "mysql");
        response.put("last_error", error);

        return ResponseEntity.ok(response);
    }
}
