package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "at_pr_appt")
public class AtPrAppt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_appt_id")
    private Integer patientApptId;

    @Column(name = "patient_id")
    private Integer patientId;

    @Column(name = "umr_num", length = 50)
    private String umrNum;

    @Column(name = "op_num", length = 50)
    private String opNum;

    @Column(name = "token_num", length = 50)
    private String tokenNum;

    @Column(name = "priority_no")
    private Integer priorityNo = 1;

    @Column(name = "emp_id")
    private Integer empId;

    @Column(name = "doc_name", length = 150)
    private String docName;

    @Column(name = "dept_id")
    private Integer deptId;

    @Column(name = "dept_name", length = 100)
    private String deptName;

    @Column(name = "loc_id")
    private Integer locId = 1;

    @Column(name = "loc_name", length = 100)
    private String locName = "Main Hospital";

    @Column(name = "visit_type", length = 50)
    private String visitType = "174"; // 174 = NEWVISIT, 175 = REVISIT

    @Column(name = "appt_status_id", length = 50)
    private String apptStatusId = "159"; // 159 = Waiting, 39 = Scheduled, 42 = Visited

    @Column(name = "bill_status", length = 50)
    private String billStatus = "17"; // 17 = Paid, 18 = Pending, 177 = Cancelled

    @Column(name = "diseases_desc", columnDefinition = "TEXT")
    private String diseasesDesc;

    @Column(name = "schedule_dt", length = 50)
    private String scheduleDt;

    @Column(name = "start_time", length = 20)
    private String startTime;

    @Column(name = "reg_fee")
    private Double regFee = 0.0;

    @Column(name = "cons_fee")
    private Double consFee = 0.0;

    @Column(name = "tot_amt")
    private Double totAmt = 0.0;

    @Column(name = "amt_recd")
    private Double amtRecd = 0.0;

    @Column(name = "reg_cash")
    private Double regCash = 0.0;

    @Column(name = "reg_card")
    private Double regCard = 0.0;

    @Column(name = "reg_upi")
    private Double regUpi = 0.0;

    @Column(name = "con_cash")
    private Double conCash = 0.0;

    @Column(name = "con_card")
    private Double conCard = 0.0;

    @Column(name = "con_upi")
    private Double conUpi = 0.0;

    @Column(name = "ref_type", length = 50)
    private String refType;

    @Column(name = "ref_id", length = 50)
    private String refId;

    @Column(name = "other_staff_id", length = 50)
    private String otherStaffId;

    @Column(name = "other_hosp_id", length = 50)
    private String otherHospId;

    @Column(name = "status_id")
    private Integer statusId = 34;

    @Column(name = "added_by", length = 100)
    private String addedBy;

    @Column(name = "added_ip", length = 100)
    private String addedIp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "added_on")
    private Date addedOn;

    public AtPrAppt() {
        this.addedOn = new Date();
    }

    // Getters and Setters
    public Integer getPatientApptId() { return patientApptId; }
    public void setPatientApptId(Integer patientApptId) { this.patientApptId = patientApptId; }

    public Integer getPatientId() { return patientId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }

    public String getUmrNum() { return umrNum; }
    public void setUmrNum(String umrNum) { this.umrNum = umrNum; }

    public String getOpNum() { return opNum; }
    public void setOpNum(String opNum) { this.opNum = opNum; }

    public String getTokenNum() { return tokenNum; }
    public void setTokenNum(String tokenNum) { this.tokenNum = tokenNum; }

    public Integer getPriorityNo() { return priorityNo; }
    public void setPriorityNo(Integer priorityNo) { this.priorityNo = priorityNo; }

    public Integer getEmpId() { return empId; }
    public void setEmpId(Integer empId) { this.empId = empId; }

    public String getDocName() { return docName; }
    public void setDocName(String docName) { this.docName = docName; }

    public Integer getDeptId() { return deptId; }
    public void setDeptId(Integer deptId) { this.deptId = deptId; }

    public String getDeptName() { return deptName; }
    public void setDeptName(String deptName) { this.deptName = deptName; }

    public Integer getLocId() { return locId; }
    public void setLocId(Integer locId) { this.locId = locId; }

    public String getLocName() { return locName; }
    public void setLocName(String locName) { this.locName = locName; }

    public String getVisitType() { return visitType; }
    public void setVisitType(String visitType) { this.visitType = visitType; }

    public String getApptStatusId() { return apptStatusId; }
    public void setApptStatusId(String apptStatusId) { this.apptStatusId = apptStatusId; }

    public String getBillStatus() { return billStatus; }
    public void setBillStatus(String billStatus) { this.billStatus = billStatus; }

    public String getDiseasesDesc() { return diseasesDesc; }
    public void setDiseasesDesc(String diseasesDesc) { this.diseasesDesc = diseasesDesc; }

    public String getScheduleDt() { return scheduleDt; }
    public void setScheduleDt(String scheduleDt) { this.scheduleDt = scheduleDt; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public Double getRegFee() { return regFee; }
    public void setRegFee(Double regFee) { this.regFee = regFee; }

    public Double getConsFee() { return consFee; }
    public void setConsFee(Double consFee) { this.consFee = consFee; }

    public Double getTotAmt() { return totAmt; }
    public void setTotAmt(Double totAmt) { this.totAmt = totAmt; }

    public Double getAmtRecd() { return amtRecd; }
    public void setAmtRecd(Double amtRecd) { this.amtRecd = amtRecd; }

    public Double getRegCash() { return regCash; }
    public void setRegCash(Double regCash) { this.regCash = regCash; }

    public Double getRegCard() { return regCard; }
    public void setRegCard(Double regCard) { this.regCard = regCard; }

    public Double getRegUpi() { return regUpi; }
    public void setRegUpi(Double regUpi) { this.regUpi = regUpi; }

    public Double getConCash() { return conCash; }
    public void setConCash(Double conCash) { this.conCash = conCash; }

    public Double getConCard() { return conCard; }
    public void setConCard(Double conCard) { this.conCard = conCard; }

    public Double getConUpi() { return conUpi; }
    public void setConUpi(Double conUpi) { this.conUpi = conUpi; }

    public String getRefType() { return refType; }
    public void setRefType(String refType) { this.refType = refType; }

    public String getRefId() { return refId; }
    public void setRefId(String refId) { this.refId = refId; }

    public String getOtherStaffId() { return otherStaffId; }
    public void setOtherStaffId(String otherStaffId) { this.otherStaffId = otherStaffId; }

    public String getOtherHospId() { return otherHospId; }
    public void setOtherHospId(String otherHospId) { this.otherHospId = otherHospId; }

    public Integer getStatusId() { return statusId; }
    public void setStatusId(Integer statusId) { this.statusId = statusId; }

    public String getAddedBy() { return addedBy; }
    public void setAddedBy(String addedBy) { this.addedBy = addedBy; }

    public String getAddedIp() { return addedIp; }
    public void setAddedIp(String addedIp) { this.addedIp = addedIp; }

    public Date getAddedOn() { return addedOn; }
    public void setAddedOn(Date addedOn) { this.addedOn = addedOn; }
}
