package com.healthcity.repository;

import com.healthcity.model.PharmacyInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PharmacyInvoiceRepository extends JpaRepository<PharmacyInvoice, Long> {
    Optional<PharmacyInvoice> findByInvoiceNo(String invoiceNo);
}
