package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "patient_prescriptions")
public class PatientPrescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String token;

    @Column(name = "prescription_items", columnDefinition = "TEXT")
    private String prescriptionItems;

    @Column(name = "recommended_tests", columnDefinition = "TEXT")
    private String recommendedTests;

    @Column(name = "doctor_notes", columnDefinition = "TEXT")
    private String doctorNotes;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", insertable = false, updatable = false)
    private Date createdAt;

    public PatientPrescription() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getPrescriptionItems() { return prescriptionItems; }
    public void setPrescriptionItems(String prescriptionItems) { this.prescriptionItems = prescriptionItems; }

    public String getRecommendedTests() { return recommendedTests; }
    public void setRecommendedTests(String recommendedTests) { this.recommendedTests = recommendedTests; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}
