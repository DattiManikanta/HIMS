package com.healthcity.repository;

import com.healthcity.model.DepartmentQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentQueueRepository extends JpaRepository<DepartmentQueue, String> {
}
