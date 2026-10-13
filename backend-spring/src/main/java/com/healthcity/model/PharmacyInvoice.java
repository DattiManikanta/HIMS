package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pharmacy_invoices")
public class PharmacyInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "invoice_no", unique = true, length = 100)
    private String invoiceNo;

    @Column(length = 50)
    private String token;

    @Column(name = "op_id", length = 50)
    private String opId;

    @Column(name = "patient_name", length = 100)
    private String patientName;

    @Column(length = 100)
    private String doctor;

    @Column(length = 100)
    private String department;

    @Column(name = "pharmacist_name", length = 100)
    private String pharmacistName;

    @Column(columnDefinition = "TEXT")
    private String items;

    private Double subtotal;
    private Double tax;

    @Column(name = "grand_total")
    private Double grandTotal;

    @Column(name = "dispense_date", length = 50)
    private String dispenseDate;

    @Column(name = "dispense_time", length = 50)
    private String dispenseTime;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", insertable = false, updatable = false)
    private Date createdAt;

    public PharmacyInvoice() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvoiceNo() { return invoiceNo; }
    public void setInvoiceNo(String invoiceNo) { this.invoiceNo = invoiceNo; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getOpId() { return opId; }
    public void setOpId(String opId) { this.opId = opId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getPharmacistName() { return pharmacistName; }
    public void setPharmacistName(String pharmacistName) { this.pharmacistName = pharmacistName; }

    public String getItems() { return items; }
    public void setItems(String items) { this.items = items; }

    public Double getSubtotal() { return subtotal; }
    public void setSubtotal(Double subtotal) { this.subtotal = subtotal; }

    public Double getTax() { return tax; }
    public void setTax(Double tax) { this.tax = tax; }

    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }

    public String getDispenseDate() { return dispenseDate; }
    public void setDispenseDate(String dispenseDate) { this.dispenseDate = dispenseDate; }

    public String getDispenseTime() { return dispenseTime; }
    public void setDispenseTime(String dispenseTime) { this.dispenseTime = dispenseTime; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
