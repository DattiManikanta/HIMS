package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @Column(length = 50)
    private String token;

    @Column(name = "op_id", length = 50)
    private String opId;

    @Column(name = "patient_name", length = 100)
    private String patientName;

    private Integer age;

    @Column(length = 20)
    private String gender;

    @Column(length = 30)
    private String phone;

    @Column(name = "blood_group", length = 10)
    private String bloodGroup;

    @Column(length = 100)
    private String department;

    @Column(name = "department_code", length = 20)
    private String departmentCode;

    @Column(length = 100)
    private String doctor;

    @Column(length = 50)
    private String room;

    @Column(length = 50)
    private String priority;

    @Column(name = "visit_date", length = 50)
    private String visitDate;

    @Column(name = "visit_type", length = 100)
    private String visitType;

    @Column(columnDefinition = "TEXT")
    private String symptoms;

    @Column(columnDefinition = "TEXT")
    private String diagnosis;

    @Column(name = "doctor_notes", columnDefinition = "TEXT")
    private String doctorNotes;

    @Column(name = "payment_json", columnDefinition = "TEXT")
    private String paymentJson;

    @Column(name = "vitals_json", columnDefinition = "TEXT")
    private String vitalsJson;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", insertable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    public Patient() {}

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getOpId() { return opId; }
    public void setOpId(String opId) { this.opId = opId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDepartmentCode() { return departmentCode; }
    public void setDepartmentCode(String departmentCode) { this.departmentCode = departmentCode; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getRoom() { return room; }
    public void setRoom(String room) { this.room = room; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getVisitDate() { return visitDate; }
    public void setVisitDate(String visitDate) { this.visitDate = visitDate; }

    public String getVisitType() { return visitType; }
    public void setVisitType(String visitType) { this.visitType = visitType; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

    public String getPaymentJson() { return paymentJson; }
    public void setPaymentJson(String paymentJson) { this.paymentJson = paymentJson; }

    public String getVitalsJson() { return vitalsJson; }
    public void setVitalsJson(String vitalsJson) { this.vitalsJson = vitalsJson; }

    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public Date getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
}
