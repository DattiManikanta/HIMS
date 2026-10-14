package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "at_pr_patient")
public class AtPrPatient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Integer patientId;

    @Column(name = "umr_num", length = 50, unique = true)
    private String umrNum;

    @Column(name = "patient_name", length = 150)
    private String patientName;

    @Column(name = "last_name", length = 150)
    private String lastName;

    @Column(name = "title", length = 20)
    private String title;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "dob", length = 30)
    private String dob;

    @Column(name = "age", length = 20)
    private String age;

    @Column(name = "age_m", length = 20)
    private String ageMonths;

    @Column(name = "age_d", length = 20)
    private String ageDays;

    @Column(name = "mob_num", length = 30)
    private String mobNum;

    @Column(name = "land_phn", length = 30)
    private String landNum;

    @Column(name = "addr", length = 255)
    private String addr;

    @Column(name = "village", length = 100)
    private String village;

    @Column(name = "city", length = 100)
    private String city;

    @Column(name = "state", length = 100)
    private String state;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "pin", length = 20)
    private String pin;

    @Column(name = "marital_status", length = 30)
    private String maritalStatus;

    @Column(name = "blood_grp", length = 20)
    private String bloodGrp;

    @Column(name = "nationality", length = 50)
    private String nationality;

    @Column(name = "religion", length = 50)
    private String religion;

    @Column(name = "parent_name", length = 150)
    private String parentName;

    @Column(name = "care_by", length = 50)
    private String careBy;

    @Column(name = "care_by_name", length = 150)
    private String careByName;

    @Column(name = "id_proof_type", length = 50)
    private String idProofType;

    @Column(name = "id_proof_num", length = 100)
    private String idProofNum;

    @Column(name = "patient_category", length = 50)
    private String patientCategory;

    @Column(name = "patient_category_name", length = 100)
    private String patientCategoryName;

    @Column(name = "credit_org_id", length = 50)
    private String creditOrgId;

    @Column(name = "org_id", length = 50)
    private String orgId;

    @Column(name = "ref_type", length = 50)
    private String refType;

    @Column(name = "ref_id", length = 50)
    private String refId;

    @Column(name = "ref_name", length = 150)
    private String refName;

    @Column(name = "other_staff_id", length = 50)
    private String otherStaffId;

    @Column(name = "other_staff_name", length = 150)
    private String otherStaffName;

    @Column(name = "other_hosp_id", length = 50)
    private String otherHospId;

    @Column(name = "other_hosp_name", length = 150)
    private String otherHospName;

    @Column(name = "occupation", length = 100)
    private String occupation;

    @Column(name = "sms_status", length = 10)
    private String smsStatus;

    @Column(name = "sms_alert", length = 10)
    private String smsAlert;

    @Column(name = "status_id")
    private Integer statusId = 34;

    @Column(name = "doc_status", length = 10)
    private String docStatus = "y";

    @Column(name = "emp_id")
    private Integer empId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reg_dt")
    private Date regDt;

    @Column(name = "added_by", length = 100)
    private String addedBy;

    @Column(name = "added_ip", length = 100)
    private String addedIp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "added_on")
    private Date addedOn;

    @Column(name = "modified_by", length = 100)
    private String modifiedBy;

    @Column(name = "modified_ip", length = 100)
    private String modifiedIp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_on")
    private Date modifiedOn;

    public AtPrPatient() {
        this.regDt = new Date();
        this.addedOn = new Date();
    }

    // Getters and Setters
    public Integer getPatientId() { return patientId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }

    public String getUmrNum() { return umrNum; }
    public void setUmrNum(String umrNum) { this.umrNum = umrNum; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getDob() { return dob; }
    public void setDob(String dob) { this.dob = dob; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getAgeMonths() { return ageMonths; }
    public void setAgeMonths(String ageMonths) { this.ageMonths = ageMonths; }

    public String getAgeDays() { return ageDays; }
    public void setAgeDays(String ageDays) { this.ageDays = ageDays; }

    public String getMobNum() { return mobNum; }
    public void setMobNum(String mobNum) { this.mobNum = mobNum; }

    public String getLandNum() { return landNum; }
    public void setLandNum(String landNum) { this.landNum = landNum; }

    public String getAddr() { return addr; }
    public void setAddr(String addr) { this.addr = addr; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getPin() { return pin; }
    public void setPin(String pin) { this.pin = pin; }

    public String getMaritalStatus() { return maritalStatus; }
    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getBloodGrp() { return bloodGrp; }
    public void setBloodGrp(String bloodGrp) { this.bloodGrp = bloodGrp; }

    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }

    public String getReligion() { return religion; }
    public void setReligion(String religion) { this.religion = religion; }

    public String getParentName() { return parentName; }
    public void setParentName(String parentName) { this.parentName = parentName; }

    public String getCareBy() { return careBy; }
    public void setCareBy(String careBy) { this.careBy = careBy; }

    public String getCareByName() { return careByName; }
    public void setCareByName(String careByName) { this.careByName = careByName; }

    public String getIdProofType() { return idProofType; }
    public void setIdProofType(String idProofType) { this.idProofType = idProofType; }

    public String getIdProofNum() { return idProofNum; }
    public void setIdProofNum(String idProofNum) { this.idProofNum = idProofNum; }

    public String getPatientCategory() { return patientCategory; }
    public void setPatientCategory(String patientCategory) { this.patientCategory = patientCategory; }

    public String getPatientCategoryName() { return patientCategoryName; }
    public void setPatientCategoryName(String patientCategoryName) { this.patientCategoryName = patientCategoryName; }

    public String getCreditOrgId() { return creditOrgId; }
    public void setCreditOrgId(String creditOrgId) { this.creditOrgId = creditOrgId; }

    public String getOrgId() { return orgId; }
    public void setOrgId(String orgId) { this.orgId = orgId; }

    public String getRefType() { return refType; }
    public void setRefType(String refType) { this.refType = refType; }

    public String getRefId() { return refId; }
    public void setRefId(String refId) { this.refId = refId; }

    public String getRefName() { return refName; }
    public void setRefName(String refName) { this.refName = refName; }

    public String getOtherStaffId() { return otherStaffId; }
    public void setOtherStaffId(String otherStaffId) { this.otherStaffId = otherStaffId; }

    public String getOtherStaffName() { return otherStaffName; }
    public void setOtherStaffName(String otherStaffName) { this.otherStaffName = otherStaffName; }

    public String getOtherHospId() { return otherHospId; }
    public void setOtherHospId(String otherHospId) { this.otherHospId = otherHospId; }

    public String getOtherHospName() { return otherHospName; }
    public void setOtherHospName(String otherHospName) { this.otherHospName = otherHospName; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public String getSmsStatus() { return smsStatus; }
    public void setSmsStatus(String smsStatus) { this.smsStatus = smsStatus; }

    public String getSmsAlert() { return smsAlert; }
    public void setSmsAlert(String smsAlert) { this.smsAlert = smsAlert; }

    public Integer getStatusId() { return statusId; }
    public void setStatusId(Integer statusId) { this.statusId = statusId; }

    public String getDocStatus() { return docStatus; }
    public void setDocStatus(String docStatus) { this.docStatus = docStatus; }

    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }

    public Date getRegDt() { return regDt; }
    public void setRegDt(Date regDt) { this.regDt = regDt; }

    public String getAddedBy() { return addedBy; }
    public void setAddedBy(String addedBy) { this.addedBy = addedBy; }

    public String getAddedIp() { return addedIp; }
    public void setAddedIp(String addedIp) { this.addedIp = addedIp; }

    public Date getAddedOn() { return addedOn; }
    public void setAddedOn(Date addedOn) { this.addedOn = addedOn; }

    public String getModifiedBy() { return modifiedBy; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }

    public String getModifiedIp() { return modifiedIp; }
    public void setModifiedIp(String modifiedIp) { this.modifiedIp = modifiedIp; }

    public Date getModifiedOn() { return modifiedOn; }
    public void setModifiedOn(Date modifiedOn) { this.modifiedOn = modifiedOn; }
}
