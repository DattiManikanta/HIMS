package com.healthcity.repository;

import com.healthcity.model.DummyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DummyRecordRepository extends JpaRepository<DummyRecord, Long> {
    List<DummyRecord> findAllByOrderByIdDesc();
}
