package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "patient_vitals")
public class PatientVital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String token;

    @Column(length = 30)
    private String bp;

    @Column(length = 20)
    private String pulse;

    @Column(length = 20)
    private String spo2;

    @Column(length = 20)
    private String temp;

    @Column(length = 20)
    private String weight;

    @Column(length = 30)
    private String bmi;

    @Column(name = "blood_sugar", length = 30)
    private String bloodSugar;

    @Column(name = "triage_notes", columnDefinition = "TEXT")
    private String triageNotes;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "recorded_at", insertable = false, updatable = false)
    private Date recordedAt;

    public PatientVital() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getBp() { return bp; }
    public void setBp(String bp) { this.bp = bp; }

    public String getPulse() { return pulse; }
    public void setPulse(String pulse) { this.pulse = pulse; }

    public String getSpo2() { return spo2; }
    public void setSpo2(String spo2) { this.spo2 = spo2; }

    public String getTemp() { return temp; }
    public void setTemp(String temp) { this.temp = temp; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getBmi() { return bmi; }
    public void setBmi(String bmi) { this.bmi = bmi; }

    public String getBloodSugar() { return bloodSugar; }
    public void setBloodSugar(String bloodSugar) { this.bloodSugar = bloodSugar; }

    public String getTriageNotes() { return triageNotes; }
    public void setTriageNotes(String triageNotes) { this.triageNotes = triageNotes; }

    public Date getRecordedAt() { return recordedAt; }
    public void setRecordedAt(Date recordedAt) { this.recordedAt = recordedAt; }
}
