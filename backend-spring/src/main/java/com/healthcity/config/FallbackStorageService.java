package com.healthcity.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class FallbackStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FallbackStorageService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    private File getFallbackFile() {
        // Check current directory first, then parent directory
        File local = new File("storage_fallback.json");
        if (local.exists()) {
            return local;
        }
        File parent = new File("../storage_fallback.json");
        if (parent.exists()) {
            return parent;
        }
        return local;
    }

    public synchronized Map<String, Object> loadFallbackData() {
        File file = getFallbackFile();
        if (file.exists()) {
            try {
                return objectMapper.readValue(file, new TypeReference<Map<String, Object>>() {});
            } catch (Exception e) {
                logger.warn("Could not read storage_fallback.json: {}", e.getMessage());
            }
        }
        Map<String, Object> defaultData = new HashMap<>();
        defaultData.put("patients", new HashMap<String, Object>());
        defaultData.put("pharmacy_invoices", new HashMap<String, Object>());
        return defaultData;
    }

    public synchronized void saveFallbackData(Map<String, Object> data) {
        File file = getFallbackFile();
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, data);
        } catch (Exception e) {
            logger.error("Failed to write to fallback storage: {}", e.getMessage());
        }
    }
}
