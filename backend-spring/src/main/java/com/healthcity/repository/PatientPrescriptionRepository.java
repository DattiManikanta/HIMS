package com.healthcity.repository;

import com.healthcity.model.PatientPrescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientPrescriptionRepository extends JpaRepository<PatientPrescription, Long> {
    List<PatientPrescription> findByTokenOrderByIdDesc(String token);
}
