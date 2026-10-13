package com.healthcity.repository;

import com.healthcity.model.PatientVital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientVitalRepository extends JpaRepository<PatientVital, Long> {
    List<PatientVital> findByTokenOrderByIdDesc(String token);
}
