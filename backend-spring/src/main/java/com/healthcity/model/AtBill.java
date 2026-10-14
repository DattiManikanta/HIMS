package com.healthcity.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "at_bills")
public class AtBill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private Integer billId;

    @Column(name = "patient_id")
    private Integer patientId;

    @Column(name = "appt_id")
    private Integer apptId;

    @Column(name = "umr_num", length = 50)
    private String umrNum;

    @Column(name = "bill_no", length = 50)
    private String billNo;

    @Column(name = "bill_amt")
    private Double billAmt = 0.0;

    @Column(name = "amt_received")
    private Double amtReceived = 0.0;

    @Column(name = "payment_type", length = 50)
    private String paymentType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "bill_date")
    private Date billDate;

    @Column(name = "added_by", length = 100)
    private String addedBy;

    @Column(name = "added_ip", length = 100)
    private String addedIp;

    @Column(name = "modified_by", length = 100)
    private String modifiedBy;

    @Column(name = "modified_ip", length = 100)
    private String modifiedIp;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_on")
    private Date modifiedOn;

    public AtBill() {
        this.billDate = new Date();
    }

    // Getters and Setters
    public Integer getBillId() { return billId; }
    public void setBillId(Integer billId) { this.billId = billId; }

    public Integer getPatientId() { return patientId; }
    public void setPatientId(Integer patientId) { this.patientId = patientId; }

    public Integer getApptId() { return apptId; }
    public void setApptId(Integer apptId) { this.apptId = apptId; }

    public String getUmrNum() { return umrNum; }
    public void setUmrNum(String umrNum) { this.umrNum = umrNum; }

    public String getBillNo() { return billNo; }
    public void setBillNo(String billNo) { this.billNo = billNo; }

    public Double getBillAmt() { return billAmt; }
    public void setBillAmt(Double billAmt) { this.billAmt = billAmt; }

    public Double getAmtReceived() { return amtReceived; }
    public void setAmtReceived(Double amtReceived) { this.amtReceived = amtReceived; }

    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }

    public Date getBillDate() { return billDate; }
    public void setBillDate(Date billDate) { this.billDate = billDate; }

    public String getAddedBy() { return addedBy; }
    public void setAddedBy(String addedBy) { this.addedBy = addedBy; }

    public String getAddedIp() { return addedIp; }
    public void setAddedIp(String addedIp) { this.addedIp = addedIp; }

    public String getModifiedBy() { return modifiedBy; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }

    public String getModifiedIp() { return modifiedIp; }
    public void setModifiedIp(String modifiedIp) { this.modifiedIp = modifiedIp; }

    public Date getModifiedOn() { return modifiedOn; }
    public void setModifiedOn(Date modifiedOn) { this.modifiedOn = modifiedOn; }
}
