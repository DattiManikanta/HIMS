package com.healthcity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class HealthCityApplication {

    private static final Logger logger = LoggerFactory.getLogger(HealthCityApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(HealthCityApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(DataSource dataSource) {
        return args -> {
            logger.info("==================================================================");
            logger.info("   INDUS HEALTH CITY - Spring Boot Enterprise HIMS REST API      ");
            logger.info("==================================================================");
            try (Connection conn = dataSource.getConnection()) {
                logger.info("✓ Connected successfully to MySQL Database: {}", conn.getCatalog());
                logger.info("✓ Product: {} (Version {})", conn.getMetaData().getDatabaseProductName(), conn.getMetaData().getDatabaseProductVersion());
            } catch (Exception e) {
                logger.warn("! Remote MySQL Database unavailable or offline: {}", e.getMessage());
                logger.info("✓ Local JSON Fallback Mode is ACTIVE to ensure seamless UI functionality.");
            }
            logger.info("✓ Server listening on http://localhost:5000");
            logger.info("✓ Health check available at http://localhost:5000/api/health");
            logger.info("==================================================================");
        };
    }
}
