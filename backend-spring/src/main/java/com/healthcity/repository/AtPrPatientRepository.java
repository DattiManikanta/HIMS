package com.healthcity.repository;

import com.healthcity.model.AtPrPatient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AtPrPatientRepository extends JpaRepository<AtPrPatient, Integer> {

    Optional<AtPrPatient> findByUmrNum(String umrNum);

    List<AtPrPatient> findByStatusIdOrderByPatientIdDesc(Integer statusId);

    @Query("SELECT p FROM AtPrPatient p WHERE p.statusId = 34 AND (" +
           "LOWER(p.umrNum) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
           "LOWER(p.patientName) LIKE LOWER(CONCAT('%', :term, '%')) OR " +
           "LOWER(p.mobNum) LIKE LOWER(CONCAT('%', :term, '%')))")
    List<AtPrPatient> searchPatients(@Param("term") String term);
}
