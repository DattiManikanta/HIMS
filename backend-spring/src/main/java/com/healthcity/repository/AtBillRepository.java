package com.healthcity.repository;

import com.healthcity.model.AtBill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AtBillRepository extends JpaRepository<AtBill, Integer> {

    List<AtBill> findByPatientIdOrderByBillIdDesc(Integer patientId);

    Optional<AtBill> findByBillNo(String billNo);
}
