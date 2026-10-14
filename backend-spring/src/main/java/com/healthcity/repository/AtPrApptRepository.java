package com.healthcity.repository;

import com.healthcity.model.AtPrAppt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AtPrApptRepository extends JpaRepository<AtPrAppt, Integer> {

    List<AtPrAppt> findByPatientIdOrderByPatientApptIdDesc(Integer patientId);

    Optional<AtPrAppt> findByTokenNum(String tokenNum);

    List<AtPrAppt> findAllByOrderByPatientApptIdDesc();

    List<AtPrAppt> findByStatusIdOrderByPatientApptIdDesc(Integer statusId);
}
