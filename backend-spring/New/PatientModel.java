/*@author: Swetha S
 * @created date: 20-Dec-2015
 * @Modified date: 2 May-2015
 * @modified by S.Veena
 * @File Name: "PatientModel.java" class file
 * @version: 1.0
 * @Copyright (c) 2014-2015 Atri Business Solutions, Inc.
   All Rights Reserved.
 *
    This software is the confidential and proprietary information of Atri
    Business Solutions, Inc. ("Confidential Information"). You shall not
    disclose such Confidential Information and shall use it only in
    accordance with the terms of the license agreement you entered into
    with Atri Business Solutions.*/

package com.atri.hms.patientmanagement.opregistration.model;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.atri.hms.patientmanagement.appointment.model.AppointmentModel;

public class PatientModel {
	private Integer anyEmiId;
	private String PAYSTAROrderId;
	private String paymentmode;
	private String bankid;
	private String regAmoCash;
	private String regAmoUpi;
	private String regAmoCard;	private String conAmoCash;
	private String conAmoCard;
	private String conAmoUpi;
	private String DateTime;
	private String orderId;
	private String billIddd;
	private String corpRegId;
	private String paymentrefernceid;
	private String refundId;
	private String cashAmtTotal;
	private String refID;
	private String status_msg;
	private String patNamee;
	private String ref_amount;
	private String txnId;
	private Integer idDoctorVal;
	private String investigationName;
	private String mrVisitDrugDet;
	    private String drugName;
	    private String drugFrequency;
	    private String drugInTakeTime;
	    private String drugNoOfDy;
	    private String drugPrescQty;
	    private String remark;
	    private String visitDate;
	    private String drugFormulation;
	    private String visitInvStat;
	private String restrictResubmission;
	private String roundofBillAmt;
	private String amtInwords;
	private String consAmtInwords;
	private String roundofAmtReceived;
	private String patientCode; // Object for Patient Code
	private String pntType; // Object for Patient Type
	private String pntCat; // Object for Patient Category
	private String ptitle; // Object for Title
	private String pntCatt;
	//private String patientTitle; // Object for Title
	private String pname; // Object for Patient Name
	private String lName;
	private String dob; // Object for Date of Birth
	private String gender; // Object for Gender
	private String age; // Object for Age
	private String mobNum; // Object for Mobile Number
	private String landNum; // Object for Land line Number
	private String text; // Object for Text
	private String photo; // Object for Photo
	private String relation; // Object for Relation
	private String orgName; // Object for Organization Name
	private String creditEmpId; // Object for Credit Employee Id
	private Integer empId; // Object for Employee Id
	private Integer docId; // for doctor id
	private String empName; // Object for Employee Id
	private String email; // Object for Email
	private String altEmail; // Object for Alternate Email
	private String preCom; // Object for Preferred Communication
	private String remLang; // Object for Remainder Language
	private String country; // Object for Country
	private String state; // Object for State
	private String city; // Object for city
	private String addr; // Object for Address
	private String pinCode; // Object for PinCode
	private String maritalStatus; // Object for Marital Status
	private String emrName; // Object for Emergency Name
	private String emrPhone; // Object for Emergency Phone
	private String emrRel; // Object for Emergency Relation
	private String priCarePhysician; // Object for Primary Care Physician
	private String refType; // Object for Reference Type
	private Integer refTypeId;
	private Integer reffeId;
	private String refName; // Object for Reference Name
	private String bloodGrp; // Object for Blood Group
	private String nationality; // Object for Nationality
	private String pntNationality;
	private String religion; // Object for Relation
	private String motherName; // Object for Mother Name
	private String fatherName; // Object for Father Name
	private String tpaCode; // Object for TPA Code
	private String idNum; // Object for ID Number
	private String grpNum; // Object for Group Number
	private String planName; // Object for Plan Name
	private String planType; // Object for Plan Type
	private String ofcNum; // Object for Office Number
	private String notes; // Object for Notes
	private String cmpny; // Object for Company
	private String addedBy; // Object for Added By
	private String addedOn; // Object for Added On
	private String addedIp; // Object for Added Ip
	private String modifiedBy; // Object for Modified By
	private String modifiedOn; // Object for Modified On
	private String modifiedIp; // Object for Modified Ip
	private String docStatus; // Object for Documents Status
	private Integer refCity; // Object for Reference City
	private Integer refCountry; // Object for Reference Country
	private Integer refState; // Object for Reference State
	private String refAddr; // Object for Reference Address
	private Integer refPIN; // Object for Reference Pin
	private String picName; // Object for Photo name
	private Integer count; // Object to store count
	private List<MultipartFile> files; // Object for Files
	private String[] fileType; // Object for File Type
	private String docType; // Object for Document Type
	private String fileName; // Object for File Name
	private String fromDate; // Object for From Date
	private String toDate; // Object for To Date
	private Integer patientId; // Object for Patient Id
	private String selectDate; // Object for Select Date
	private Integer documentId;
	private String status;
	private String regCode;
	private String validity;
	private String umrNo;
	private String searchBy;
	private String pntCatId;
	private String regNum;
	private String regDt; // Object for Registered Date
	private String regValidDt;
	private Integer refId;
	private Integer refBy;
	private Integer buildId;
	private String building;
	private String fee;
	private String balance;
	private String amountReceived;
	private String changeGiven;
	private String billId;
	private String billNum;
	private String billDate;
	private String billAmt;
	private String recptNo;
	private String recptDate;
	private String billType;
	private String patientCategory;
	private String patientCategoryOrgId; //to get the patient category from at_pr_appt
	private String stateId;
	private String countryId;
	private String cityId;
	private String type;
	private String patientLike;
	private String catValue; // swathi added

	private String finalAmt;
	private String discAmt;
	private String patientDetailsSplit;
	private Integer userId;
	private String serviceName;
	private Integer patientCategoryId;

	private Integer serviceChargeId;
	private String scheduleDt;

	private String idType;
	private String occupation;
	private boolean smsAlert;
	private String smsStatus;

	private Integer locId;
	private Integer orgId;
	private String visitType;

	private FeeModel feeModel;
	private AppointmentModel apptModel;
    private String regPatientName;
	private String feeStatus;
	private String consStatus;

	private String village;

	private String visitStatus;
	private String statusIcon;
	private String statusBgColor;

	private String apptFromDate;
	private String apptToDate;

	private String category;

	private String idProofType;
	private String idProofNum;

	private String[] cardBankNames;
	private String cardBankName;


	private String billStatus;

	private String pntStatus;

	private String authPerson;

	private String parentName;
	private String careBy;
	private String careByName;
	private String specName;
	private String empCode;
	private String idDoctor;
	private String consFees;
	private String regFees;
	private String regDivSts;
	private String consDivSts;
	
	//sandhya
	private String consFee;
	private String regDisAmnt;
	private String regDisPer;
	private String conDisAmnt;
	private String conDisPer;
	private String conFinalAmnt;
    private String totalDisAmnt;
    private String opBillAmnt;
	private String cardNumber;
	private String transNum;
	private Integer billDetId;

	private Integer charges;
	private int billLogId;
	private String labBillAmt;
	private String labTotAmt;
	private String conValidDt;


	private String opBalAmt;
	private String refundAmt;
	private String totDiscountAmt;
	
	private String expiryDt;
	private String checkDt;
    private String chequebankName;
    private String outSideOrg;
    private String pntUpdtStatus;
    private String customerId;
    private Integer consultationOpId;
    private Integer modalPatientId;
	private String modalPatMobNo;
	private String modalPatUmr;
	private String modalPatName;
	private String modalPatGender;
	private String modalPataptId;
	private String staffName;
	private Integer organiId;
	
	private String cashAmt;
	private String creditAmt;
	private String upiAmt;
	private String lastInsert;
	private String regAmountss;
	private String print;
	private String regprint;
	private String creditPt;
	private String[] creditPts;
	private String[] creditAmounts;
	private String[] cardcardTypes;
	private String[] creditNoss;
	private String[] cardBankNamess;
	private String[] creditDates;
	private String[] creditUpiNoss;
	private String authorizedBy;
	
	
	
	public String[] getCreditUpiNoss() {
		return creditUpiNoss;
	}
	public void setCreditUpiNoss(String[] creditUpiNoss) {
		this.creditUpiNoss = creditUpiNoss;
	}
	public String[] getCreditAmounts() {
		return creditAmounts;
	}
	public void setCreditAmounts(String[] creditAmounts) {
		this.creditAmounts = creditAmounts;
	}
	public String[] getCardcardTypes() {
		return cardcardTypes;
	}
	public void setCardcardTypes(String[] cardcardTypes) {
		this.cardcardTypes = cardcardTypes;
	}
	public String[] getCreditNoss() {
		return creditNoss;
	}
	public void setCreditNoss(String[] creditNoss) {
		this.creditNoss = creditNoss;
	}
	public String[] getCardBankNamess() {
		return cardBankNamess;
	}
	public void setCardBankNamess(String[] cardBankNamess) {
		this.cardBankNamess = cardBankNamess;
	}
	public String[] getCreditDates() {
		return creditDates;
	}
	public void setCreditDates(String[] creditDates) {
		this.creditDates = creditDates;
	}
	public String getCreditPt() {
		return creditPt;
	}
	public void setCreditPt(String creditPt) {
		this.creditPt = creditPt;
	}
	public String[] getCreditPts() {
		return creditPts;
	}
	public void setCreditPts(String[] creditPts) {
		this.creditPts = creditPts;
	}
	public String getRegprint() {
		return regprint;
	}
	public void setRegprint(String regprint) {
		this.regprint = regprint;
	}
	public String getPrint() {
		return print;
	}
	public void setPrint(String print) {
		this.print = print;
	}
	public String getLastInsert() {
		return lastInsert;
	}
	public void setLastInsert(String lastInsert) {
		this.lastInsert = lastInsert;
	}
	public Integer getOrganiId() {
		return organiId;
	}
	public void setOrganiId(Integer organiId) {
		this.organiId = organiId;
	}
	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}

	public String getModalPataptId() {
		return modalPataptId;
	}

	public void setModalPataptId(String modalPataptId) {
		this.modalPataptId = modalPataptId;
	}

	private String doctorId;
	private Integer manualBillId;
	private Integer dummyBillId;
	private Integer modalDummyBillId;
    private Integer statusId;
    private String pataptId;
    
    private String medicalCardNo;
    private String employeeNo;
    private String referralLetterNo;
    private String relationType;
    private String branch;
    private String letterDateValid;
    private String purpose;
    private String designation;
    private String ageCalc;
    private String card;
    
    
    private String[] creditNo;
    private String creditNos;
    private String umrSec;
    
	public String[] getCreditNo() {
		return creditNo;
	}

	public void setCreditNo(String[] creditNo) {
		this.creditNo = creditNo;
	}

	public String getCreditNos() {
		return creditNos;
	}

	public void setCreditNos(String creditNos) {
		this.creditNos = creditNos;
	}

	public String getMedicalCardNo() {
		return medicalCardNo;
	}

	public void setMedicalCardNo(String medicalCardNo) {
		this.medicalCardNo = medicalCardNo;
	}

	public String getEmployeeNo() {
		return employeeNo;
	}

	public void setEmployeeNo(String employeeNo) {
		this.employeeNo = employeeNo;
	}

	public String getReferralLetterNo() {
		return referralLetterNo;
	}

	public void setReferralLetterNo(String referralLetterNo) {
		this.referralLetterNo = referralLetterNo;
	}

	public String getRelationType() {
		return relationType;
	}

	public void setRelationType(String relationType) {
		this.relationType = relationType;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getLetterDateValid() {
		return letterDateValid;
	}

	public void setLetterDateValid(String letterDateValid) {
		this.letterDateValid = letterDateValid;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getPataptId() {
		return pataptId;
	}

	public void setPataptId(String pataptId) {
		this.pataptId = pataptId;
	}

	public Integer getStatusId() {
		return statusId;
	}

	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
	}

	public Integer getModalDummyBillId() {
		return modalDummyBillId;
	}

	public void setModalDummyBillId(Integer modalDummyBillId) {
		this.modalDummyBillId = modalDummyBillId;
	}

	public Integer getDummyBillId() {
		return dummyBillId;
	}

	public void setDummyBillId(Integer dummyBillId) {
		this.dummyBillId = dummyBillId;
	}
	
	
	public String getTotalDisAmnt() {
		return totalDisAmnt;
	}

	public void setTotalDisAmnt(String totalDisAmnt) {
		this.totalDisAmnt = totalDisAmnt;
	}

	public String getOpBillAmnt() {
		return opBillAmnt;
	}

	public void setOpBillAmnt(String opBillAmnt) {
		this.opBillAmnt = opBillAmnt;
	}

	private String serviceType;
	
	private Integer stfId;
	private String stfName;
	private Integer hspId;
	private String hspName;
	
	private String opNum;
	private String schDt;
	
	private String patVisit;

	private int otherHospId;
	private String otherHospCode;
	private String otherHospName;
	
	private int otherStaffId;
	private String otherStaffCode;
	private String otherStaffName;
	private String otherStaffMob;
	private String otherStaffAddr;
	
    private String aliasName;
	
	private int userOrgStatus;
	private int userLocStatus;
	private int userDeptStatus;
	
	private String locName;
	
	private int deptId;
	private String deptName;

	private Integer userOrgId;
	private Integer userLocId;
	private Integer userDeptId;

	private String pntPortalId;
	private String pntPortalRegSts;
	private String pntPortalSts;
	private String patientName;
	private String pntMobNum;
	private String regUmr;
	private String regPatientId;
	private String ageDays;
	private String ageMonths;
	private String doctorDetails;
	private String pntOccupation;
	
	private Integer patVisitId;
	private String totAmt;
	private Integer serviceChargeIdd;
	private Integer visitTypee;
	private Double feee;
	private String patVisite;
	
	private Integer catOrgId;
	private String amount;
	private String totalAmount;
	private String billAmount;
	private String billCount; // to get the billids count 
	private String tokenNum;
	private String pntDob; // patient DOB
	private String dateSch;
	private String patApptId;
	
	private int otherDoctorId;
	private String otherDoctorCode;
	private String otherDoctorName;
	private String otherDoctorMob;
	private String otherDoctorAddr;
	private String passportNum;
	private String passportIssuedDt;
	private String passportExpiryDt;  
	private String qualification;
	
	//private String patFileNames;
	 private List<MultipartFile> patFileNames;
	 
	 private String patFile;
	 
	
	private String picNamee;
	
    private Integer specializationId;
    private String specializationCode;
    private String specialization;
    
    private List<MultipartFile> ticketFileNames;
    private String attachmentName;
	private String[] descriptions;
	private String description;
	private Integer attachmentId;
	private Integer attachmentCount;
	private String[] descriptionss;
	private String[] attachmentIds;
	private String attachId;
	private Integer patientIdForFile;
	private String umrId;
	private Integer picId;
	private String[] patientTypes;
    private String patientType;
    
    
    
    
    //kept by habi 
    private String tariffName;
    private String tariffId;
	/* private String outSideOrg; */
    private String newOsideOrgId;
    private String  serviceIdNew;
    private String tarrifIdNew;
    private String serviceNameNew;
    private String amountNew;
    private String tarrifNew;
    private String tarrifType;
    private String totDiscount;

    private String  patientTitle;

    private String patientCat;
    private String reConAmount;
    private String disPercentge;
    private String discountAmount;
    private String regFinalAmnt;
    private String regFee;

    private String PatientUmrNo;
    private String organizationName;
    private String organizationCode;
    private String patientMobi;
	private String patientDummy;
    
    
    public String getPatientMobi() {
		return patientMobi;
	}
	public void setPatientMobi(String patientMobi) {
		this.patientMobi = patientMobi;
	}
	public String getPatientDummy() {
		return patientDummy;
	}
	public void setPatientDummy(String patientDummy) {
		this.patientDummy = patientDummy;
	}
	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getOrganizationCode() {
		return organizationCode;
	}

	public void setOrganizationCode(String organizationCode) {
		this.organizationCode = organizationCode;
	}

	public String getPatientTitle() {
		return patientTitle;
	}

	public void setPatientTitle(String patientTitle) {
		this.patientTitle = patientTitle;
	}

	public String getPatientCat() {
		return patientCat;
	}

	public void setPatientCat(String patientCat) {
		this.patientCat = patientCat;
	}

	public String getServiceIdNew() {
		return serviceIdNew;
	}

	public void setServiceIdNew(String serviceIdNew) {
		this.serviceIdNew = serviceIdNew;
	}

	public String getTarrifIdNew() {
		return tarrifIdNew;
	}

	public void setTarrifIdNew(String tarrifIdNew) {
		this.tarrifIdNew = tarrifIdNew;
	}


	public String getServiceNameNew() {
		return serviceNameNew;
	}

	public void setServiceNameNew(String serviceNameNew) {
		this.serviceNameNew = serviceNameNew;
	}

	public String getAmountNew() {
		return amountNew;
	}

	public void setAmountNew(String amountNew) {
		this.amountNew = amountNew;
	}

	public String getTarrifNew() {
		return tarrifNew;
	}

	public void setTarrifNew(String tarrifNew) {
		this.tarrifNew = tarrifNew;
	}

	private String tarrifName;
    

   private String updtLastName;
   private String updtPatientTitle; 

	
	private  List<MultipartFile> prescFileNames;
	private String attachmentPicNameMobile;
	
	private List<MultipartFile> patientPics;
	private List<MultipartFile> attendeePics;
	
	
	private String[] allNames;
	private String attachmentPicName;
	private Integer prescIdForInsert;
	private String ipId;
    private String prescDate;
	private String prescNum;
	private Integer prescId;
	private String lastName;
	private String conName;
	private String consName;
	private String picNames;
	private String vType;
	private String appDate;
	private String vsType;
	private String apDate;
	private String patDetails;
	private Integer pntId;
	private String pntName;
	private String patName;
	private String pntCode;
	private String userRole;
	private String patIpId;
	private String apptId;
	private Integer suvRegPatientId;
    private Integer filsiz; //to get the validation mgs in passport file upload
    private Integer userEmpId;
    private String fromDt;
    private String toDt;
    private String patCatName;
    private String updtPatCatName;
    
    private Integer umrUpdateSts;
    private Integer payTypeId;
    private String payTypeName;
    private Integer paymentType;
   
    private String bank;
    private String bankId;
    
    private Integer[] cashPt;
	private String[] amounts;
	private String[] transNo;
	private String[] chequeDate;
	private String[] bankName;
	private Integer cashPts;
	private String amountss;
	private String transNos;
	private String bankNames;
	private String chequeDates;
	private String disStaffId;
	private String remarks;
	private Integer visitId;
	private String vitalValue;
	private String vitalId;
	private String vitalName;
	private String uom;
	
	private Integer pbillId;
	private String consAmount;
	private String serviceIdCon;
	private String serviceIdReg;
	

	private String regAmount;
    private int vitalStatus;
    private int fileStatus;
    
	private String docNameNew;
	private String deliverDtNew;
	private String docTypeNew;
	private String uploadedByNew;

	private String[] docNameNews;
	private String[] deliverDtNews;
	private String[] docTypeNews;
	private String[] uploadedByNews;
	private String docTypeId;
	private String user;
	private String docCode;
	private String userName;
	
	private String allergyCode;
	private String allergyName;
	private String allergyType;
	private Integer allergyTypeId;
	
	private String allergyNote;
	private String allergyReaction;
	private String allergyReactionId;
	private String allergyId;
	private String[] allergyIds;
	
	private String[] allergyReactions;
	private String[] allergyTypes;
	private String[] allergyNotes;
	private String[] allergyNames;
	private Integer[] allergyTypeIds;
	
	private Integer stdCodeId;
	private Integer stdCodeValId;
	private String stdCodeValueName;
	
/* canteen */
	
	private Integer menuId;
	private String menuName;
	private Integer itemId;
	private String itemName;
	private String price;
	private String itemAvilStatus;
	private String counter;
	private String idlycount;
	private String pohacount;
	private String price1;
	private String price2;
	private String price3;
	private String price4;
	private String price5;
	private String price6;
	private String price7;
	private String price8;
	private String price9;
	private String price10;
	private String price11;
	private String price12;
	private String price13;
	private String price14;
	private String price15;
	private String price16;
	private String price17;
	private String price18;
	private String price19;
	private String price20;
	private String price21;
	private String price22;
	private String bedNum;
	private String omletcount;
	private String butMilkcount;
	private String dummcount;
	private String frycount;
	private String cofeecount;
	private String dosacount;
	private String fruitcount;
	//private String idlycount;
	private String kaboolcount;
	private String kommucount;
	private String lemoncount;
	private String mealscount;
	private String mealsEggcount;
	private String milkcount;
	private String millDosacount;
	private String millIdlycount;
	private String pongalcount;
	private String pulkacount;
	private String sweetcount;
	private String teacount;
	private String tomotocount;
	private String upmacount;
	private String grandTot;
	private String grandTotal;
	private String selectDt;
	private String orderStatus;
	private String changeStatus;
	private Integer changeId;
	private String pntAge;
	private String pntGender;
	private Integer organizationsId;
	private String empRegNo;
	 private String umrNoNew;
	 private String billPayAmount;
	 private String referNumber;
	 private String locationId;
	 private String vitalIds[];
	    private String vitalValues[];
	    private String visitVitals[];
	    private String pulse;
	    private String NutritionalStatuss;
	    private String Temp;
	    private String weight;
	    private String bp;
	    private String serviceId;
	    private String packageId;
	    private String serviceGroup;
		private String labPaidAmt;
		private String labBalAmt;
		private String transactionNumber;
		private String discountReason;
		private String billDt;
		private String patId;
		private String doctorName;
		private String serviceGroupName;
		
		private int serviceGroupId; 
		
		private String serviceGroupCode;
		private String headParameter;
		private String headResultVal;
		private String headNormalVal;
		private String headMethod;
		private String headUom;
		private String noteOne;
		private String noteTwo;
		private String noteThree;
		private String serviceCode;
		
		private int investigationId;
		private Integer opInvservId;
		private String departId;
		private String department;
		private String tarrifId;
		
		private Integer billIdAppt;
		private Integer apptIdAppt;
		private String checkStatus;
		private String sourceServiceId;
		private String visitTypeId;
		private String finalAmount;
		private String active;
	
	
	  public String getActive() {
			return active;
		}
		public void setActive(String active) {
			this.active = active;
		}
	public String getFinalAmount() {
			return finalAmount;
		}

		public void setFinalAmount(String finalAmount) {
			this.finalAmount = finalAmount;
		}

	public String getVisitTypeId() {
			return visitTypeId;
		}

		public void setVisitTypeId(String visitTypeId) {
			this.visitTypeId = visitTypeId;
		}

	public String getSourceServiceId() {
			return sourceServiceId;
		}

		public void setSourceServiceId(String sourceServiceId) {
			this.sourceServiceId = sourceServiceId;
		}

	public String getCheckStatus() {
			return checkStatus;
		}

		public void setCheckStatus(String checkStatus) {
			this.checkStatus = checkStatus;
		}

	public String getPntAge() {
		return pntAge;
	}

	public void setPntAge(String pntAge) {
		this.pntAge = pntAge;
	}

	public String getPntGender() {
		return pntGender;
	}

	public void setPntGender(String pntGender) {
		this.pntGender = pntGender;
	}

	public Integer getOrganizationsId() {
		return organizationsId;
	}

	public void setOrganizationsId(Integer organizationsId) {
		this.organizationsId = organizationsId;
	}

	private String empCodeVal;//Used to store and get emp_code
	  private String empDate;//Used to store and get emp_date
	  private String empDept;//Used to store and get emp_dept
	  private String empQual;//Used to store and get emp_qual
	  private String empMob;//Used to store and get emp_mob
	  private String empEmail;
	  private String employeeName;
	  private String employeeId;
	 private String departmentName;
	 private Integer departmentId;
	 private String mobile;
	 
	 private String cardTypes;
	 private String[] cardType;
	 private String[] expDate;
	 private String expDates;
	 private String transNumber;
	 private String bankNameMn;
	 
	 
	 
	 

	private String version; 
	    private String incompChange;
		private String newFunctionality;
		private String bugFixed;
		private String changeDesc;
		private String commitDate;
		private Integer fileLength;
		
		private String[] versions; 
	    private String[] incompChanges;
		private String[] newFunctionalitys;
		private String[] bugFixeds;
		private String[] changeDescs;
		private String[] commitDates;
		private String patCatNameId;
		 private String areaName;
		private String barcodeNumber;
	    private String finalDiagnosis;
	    private String diagnosis;
	  private  String orgAddress;
	  private String printDt;
	  private String OrgNameOne;
	 
	  private String tariffUpdt;
		private String updtOrgNames;
	public String getTariffUpdt() {
			return tariffUpdt;
		}

		public String getUpdtOrgNames() {
			return updtOrgNames;
		}

		public void setTariffUpdt(String tariffUpdt) {
			this.tariffUpdt = tariffUpdt;
		}

		public void setUpdtOrgNames(String updtOrgNames) {
			this.updtOrgNames = updtOrgNames;
		}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public String getConsAmount() {
		return consAmount;
	}

	public void setConsAmount(String consAmount) {
		this.consAmount = consAmount;
	}

	public String getServiceIdCon() {
		return serviceIdCon;
	}

	public void setServiceIdCon(String serviceIdCon) {
		this.serviceIdCon = serviceIdCon;
	}

	public String getServiceIdReg() {
		return serviceIdReg;
	}

	public void setServiceIdReg(String serviceIdReg) {
		this.serviceIdReg = serviceIdReg;
	}

	public String getRegAmount() {
		return regAmount;
	}

	public void setRegAmount(String regAmount) {
		this.regAmount = regAmount;
	}

	/**
	 * @return the pbillId
	 */
	public Integer getPbillId() {
		return pbillId;
	}

	/**
	 * @param pbillId the pbillId to set
	 */
	public void setPbillId(Integer pbillId) {
		this.pbillId = pbillId;
	}

	public String getVitalValue() {
		return vitalValue;
	}

	public void setVitalValue(String vitalValue) {
		this.vitalValue = vitalValue;
	}

	public String getVitalId() {
		return vitalId;
	}

	public void setVitalId(String vitalId) {
		this.vitalId = vitalId;
	}

	public String getVitalName() {
		return vitalName;
	}

	public void setVitalName(String vitalName) {
		this.vitalName = vitalName;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getBankId() {
		return bankId;
	}

	public void setBankId(String bankId) {
		this.bankId = bankId;
	}

	public Integer[] getCashPt() {
		return cashPt;
	}

	public void setCashPt(Integer[] cashPt) {
		this.cashPt = cashPt;
	}

	public String[] getAmounts() {
		return amounts;
	}

	public void setAmounts(String[] amounts) {
		this.amounts = amounts;
	}

	public String[] getTransNo() {
		return transNo;
	}

	public void setTransNo(String[] transNo) {
		this.transNo = transNo;
	}

	public String[] getChequeDate() {
		return chequeDate;
	}

	public void setChequeDate(String[] chequeDate) {
		this.chequeDate = chequeDate;
	}

	public String[] getBankName() {
		return bankName;
	}

	public void setBankName(String[] bankName) {
		this.bankName = bankName;
	}

	public Integer getCashPts() {
		return cashPts;
	}

	public void setCashPts(Integer cashPts) {
		this.cashPts = cashPts;
	}

	public String getAmountss() {
		return amountss;
	}

	public void setAmountss(String amountss) {
		this.amountss = amountss;
	}

	public String getTransNos() {
		return transNos;
	}

	public void setTransNos(String transNos) {
		this.transNos = transNos;
	}

	public String getBankNames() {
		return bankNames;
	}

	public void setBankNames(String bankNames) {
		this.bankNames = bankNames;
	}

	public String getChequeDates() {
		return chequeDates;
	}

	public void setChequeDates(String chequeDates) {
		this.chequeDates = chequeDates;
	}

	public String getDisStaffId() {
		return disStaffId;
	}

	public void setDisStaffId(String disStaffId) {
		this.disStaffId = disStaffId;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	/**
	 * @return the paymentType
	 */
	public Integer getPaymentType() {
		return paymentType;
	}

	/**
	 * @param paymentType the paymentType to set
	 */
	public void setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
	}

	public Integer getUmrUpdateSts() {
		return umrUpdateSts;
	}

	public void setUmrUpdateSts(Integer umrUpdateSts) {
		this.umrUpdateSts = umrUpdateSts;
	}

	/**
	 * @return the updtPatCatName
	 */
	public String getUpdtPatCatName() {
		return updtPatCatName;
	}

	/**
	 * @param updtPatCatName the updtPatCatName to set
	 */
	public void setUpdtPatCatName(String updtPatCatName) {
		this.updtPatCatName = updtPatCatName;
	}

	/**
	 * @return the patCatName
	 */
	public String getPatCatName() {
		return patCatName;
	}

	/**
	 * @param patCatName the patCatName to set
	 */
	public void setPatCatName(String patCatName) {
		this.patCatName = patCatName;
	}

	/**
	 * @return the serviceChargeIdd
	 */
	public Integer getServiceChargeIdd() {
		return serviceChargeIdd;
	}

	/**
	 * @param serviceChargeIdd the serviceChargeIdd to set
	 */
	public void setServiceChargeIdd(Integer serviceChargeIdd) {
		this.serviceChargeIdd = serviceChargeIdd;
	}

	/**
	 * @return the visitTypee
	 */
	public Integer getVisitTypee() {
		return visitTypee;
	}

	/**
	 * @param visitTypee the visitTypee to set
	 */
	public void setVisitTypee(Integer visitTypee) {
		this.visitTypee = visitTypee;
	}

	/**
	 * @return the feee
	 */
	public Double getFeee() {
		return feee;
	}

	/**
	 * @param feee the feee to set
	 */
	public void setFeee(Double feee) {
		this.feee = feee;
	}

	/**
	 * @return the patVisite
	 */
	public String getPatVisite() {
		return patVisite;
	}

	/**
	 * @param patVisite the patVisite to set
	 */
	public void setPatVisite(String patVisite) {
		this.patVisite = patVisite;
	}

	/**
	 * @return the billStatus
	 */
	public String getBillStatus() {
		return billStatus;
	}

	/**
	 * @param billStatus
	 *            the billStatus to set
	 */
	public void setBillStatus(String billStatus) {
		this.billStatus = billStatus;
	}

	/**
	 * @return the idProofType
	 */
	public String getIdProofType() {
		return idProofType;
	}

	/**
	 * @param idProofType
	 *            the idProofType to set
	 */
	public void setIdProofType(String idProofType) {
		this.idProofType = idProofType;
	}

	/**
	 * @return the idProofNum
	 */
	public String getIdProofNum() {
		return idProofNum;
	}

	/**
	 * @param idProofNum
	 *            the idProofNum to set
	 */
	public void setIdProofNum(String idProofNum) {
		this.idProofNum = idProofNum;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @param category
	 *            the category to set
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return the apptFromDate
	 */
	public String getApptFromDate() {
		return apptFromDate;
	}

	/**
	 * @param apptFromDate
	 *            the apptFromDate to set
	 */
	public void setApptFromDate(String apptFromDate) {
		this.apptFromDate = apptFromDate;
	}

	/**
	 * @return the apptToDate
	 */
	public String getApptToDate() {
		return apptToDate;
	}

	/**
	 * @param apptToDate
	 *            the apptToDate to set
	 */
	public void setApptToDate(String apptToDate) {
		this.apptToDate = apptToDate;
	}

	/**
	 * @return the visitStatus
	 */
	public String getVisitStatus() {
		return visitStatus;
	}

	/**
	 * @param visitStatus
	 *            the visitStatus to set
	 */
	public void setVisitStatus(String visitStatus) {
		this.visitStatus = visitStatus;
	}

	/**
	 * @return the statusIcon
	 */
	public String getStatusIcon() {
		return statusIcon;
	}

	/**
	 * @param statusIcon
	 *            the statusIcon to set
	 */
	public void setStatusIcon(String statusIcon) {
		this.statusIcon = statusIcon;
	}

	/**
	 * @return the statusBgColor
	 */
	public String getStatusBgColor() {
		return statusBgColor;
	}

	/**
	 * @param statusBgColor
	 *            the statusBgColor to set
	 */
	public void setStatusBgColor(String statusBgColor) {
		this.statusBgColor = statusBgColor;
	}

	/**
	 * @return the village
	 */
	public String getVillage() {
		return village;
	}

	/**
	 * @param village
	 *            the village to set
	 */
	public void setVillage(String village) {
		this.village = village;
	}

	/**
	 * @return the feeStatus
	 */
	public String getFeeStatus() {
		return feeStatus;
	}

	/**
	 * @param feeStatus
	 *            the feeStatus to set
	 */
	public void setFeeStatus(String feeStatus) {
		this.feeStatus = feeStatus;
	}

	/**
	 * @return the consStatus
	 */
	public String getConsStatus() {
		return consStatus;
	}

	/**
	 * @param consStatus
	 *            the consStatus to set
	 */
	public void setConsStatus(String consStatus) {
		this.consStatus = consStatus;
	}

	/**
	 * @return the apptModel
	 */
	public AppointmentModel getApptModel() {
		return apptModel;
	}

	/**
	 * @param apptModel
	 *            the apptModel to set
	 */
	public void setApptModel(AppointmentModel apptModel) {
		this.apptModel = apptModel;
	}

	/**
	 * @return the visitType
	 */
	public String getVisitType() {
		return visitType;
	}

	/**
	 * @param visitType
	 *            the visitType to set
	 */
	public void setVisitType(String visitType) {
		this.visitType = visitType;
	}

	/**
	 * @return the feeModel
	 */
	public FeeModel getFeeModel() {
		return feeModel;
	}

	/**
	 * @param feeModel
	 *            the feeModel to set
	 */
	public void setFeeModel(FeeModel feeModel) {
		this.feeModel = feeModel;
	}

	/**
	 * @return the locId
	 */
	public Integer getLocId() {
		return locId;
	}

	/**
	 * @param locId
	 *            the locId to set
	 */
	public void setLocId(Integer locId) {
		this.locId = locId;
	}

	/**
	 * @return the orgId
	 */
	public Integer getOrgId() {
		return orgId;
	}

	/**
	 * @param orgId
	 *            the orgId to set
	 */
	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	/**
	 * @return the smsAlert
	 */
	public boolean isSmsAlert() {
		return smsAlert;
	}

	/**
	 * @param smsAlert
	 *            the smsAlert to set
	 */
	public void setSmsAlert(boolean smsAlert) {
		this.smsAlert = smsAlert;
	}

	/**
	 * @return the smsStatus
	 */
	public String getSmsStatus() {
		return smsStatus;
	}

	/**
	 * @param smsStatus
	 *            the smsStatus to set
	 */
	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}

	/**
	 * @return the occupation
	 */
	public String getOccupation() {
		return occupation;
	}

	/**
	 * @param occupation
	 *            the occupation to set
	 */
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	/**
	 * @return the idType
	 */
	public String getIdType() {
		return idType;
	}

	/**
	 * @param idType
	 *            the idType to set
	 */
	public void setIdType(String idType) {
		this.idType = idType;
	}

	/**
	 * @return the scheduleDt
	 */
	public String getScheduleDt() {
		return scheduleDt;
	}

	/**
	 * @param dbFrmt1
	 *            the scheduleDt to set
	 */
	public void setScheduleDt(String dbFrmt1) {
		this.scheduleDt = dbFrmt1;
	}

	/**
	 * @return the serviceChargeId
	 */
	public Integer getServiceChargeId() {
		return serviceChargeId;
	}

	/**
	 * @param serviceChargeId
	 *            the serviceChargeId to set
	 */
	public void setServiceChargeId(Integer serviceChargeId) {
		this.serviceChargeId = serviceChargeId;
	}

	/**
	 * @return the patientCategoryId
	 */
	public Integer getPatientCategoryId() {
		return patientCategoryId;
	}

	/**
	 * @param patientCategoryId
	 *            the patientCategoryId to set
	 */
	public void setPatientCategoryId(Integer patientCategoryId) {
		this.patientCategoryId = patientCategoryId;
	}

	/**
	 * @return the serviceName
	 */
	public String getServiceName() {
		return serviceName;
	}

	/**
	 * @param serviceName
	 *            the serviceName to set
	 */
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getCatValue() {
		return catValue;
	}

	public void setCatValue(String catValue) {
		this.catValue = catValue;
	}

	/**
	 * .
	 * 
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * .
	 * 
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the stateId
	 */
	public String getStateId() {
		return stateId;
	}

	/**
	 * @param stateId
	 *            the stateId to set
	 */
	public void setStateId(String stateId) {
		this.stateId = stateId;
	}

	/**
	 * @return the countryId
	 */
	public String getCountryId() {
		return countryId;
	}

	/**
	 * @param countryId
	 *            the countryId to set
	 */
	public void setCountryId(String countryId) {
		this.countryId = countryId;
	}

	/**
	 * @return the cityId
	 */
	public String getCityId() {
		return cityId;
	}

	/**
	 * @paaaram cityId
	 *            the cityId to set
	 */
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status
	 *            the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return the changeGiven
	 */
	public String getChangeGiven() {
		return changeGiven;
	}

	/**
	 * @param changeGiven
	 *            the changeGiven to set
	 */
	public void setChangeGiven(String changeGiven) {
		this.changeGiven = changeGiven;
	}

	/**
	 * @return the patientCategory
	 */
	public String getPatientCategory() {
		return patientCategory;
	}

	/**
	 * @param patientCategory
	 *            the patientCategory to set
	 */
	public void setPatientCategory(String patientCategory) {
		this.patientCategory = patientCategory;
	}

	/**
	 * @return the billType
	 */
	public String getBillType() {
		return billType;
	}

	/**
	 * @param billType
	 *            the billType to set
	 */
	public void setBillType(String billType) {
		this.billType = billType;
	}

	/**
	 * @return the billNum
	 */
	public String getBillNum() {
		return billNum;
	}

	/**
	 * @param billNum
	 *            the billNum to set
	 */
	public void setBillNum(String billNum) {
		this.billNum = billNum;
	}

	/**
	 * @return the billDate
	 */
	public String getBillDate() {
		return billDate;
	}

	/**
	 * @param billDate
	 *            the billDate to set
	 */
	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	/**
	 * @return the recptNo
	 */
	public String getRecptNo() {
		return recptNo;
	}

	/**
	 * @param recptNo
	 *            the recptNo to set
	 */
	public void setRecptNo(String recptNo) {
		this.recptNo = recptNo;
	}

	/**
	 * @return the recptDate
	 */
	public String getRecptDate() {
		return recptDate;
	}

	/**
	 * @param recptDate
	 *            the recptDate to set
	 */
	public void setRecptDate(String recptDate) {
		this.recptDate = recptDate;
	}

	/**
	 * @return the amountReceived
	 */
	public String getAmountReceived() {
		return amountReceived;
	}

	/**
	 * @param amountReceived
	 *            the amountReceived to set
	 */
	public void setAmountReceived(String amountReceived) {
		this.amountReceived = amountReceived;
	}

	/**
	 * @return the fee
	 */
	public String getFee() {
		return fee;
	}

	/**
	 * @param fee
	 *            the fee to set
	 */
	public void setFee(String fee) {
		this.fee = fee;
		System.out.println("fee" + fee);
	}

	/**
	 * @return the balance
	 */
	public String getBalance() {
		return balance;
	}

	/**
	 * @param balance
	 *            the balance to set
	 */
	public void setBalance(String balance) {
		this.balance = balance;
	}

	/**
	 * @return the buildId
	 */
	public Integer getBuildId() {
		return buildId;
	}

	/**
	 * @param buildId
	 *            the buildId to set
	 */
	public void setBuildId(Integer buildId) {
		this.buildId = buildId;
	}

	/**
	 * @return the building
	 */
	public String getBuilding() {
		return building;
	}

	/**
	 * @param building
	 *            the building to set
	 */
	public void setBuilding(String building) {
		this.building = building;
	}

	/**
	 * @return the refId
	 */
	public Integer getRefId() {
		return refId;
	}

	/**
	 * @param refId
	 *            the refId to set
	 */
	public void setRefId(Integer refId) {
		this.refId = refId;
	}

	/**
	 * @return the refBy
	 */
	public Integer getRefBy() {
		return refBy;
	}

	/**
	 * @param refBy
	 *            the refBy to set
	 */
	public void setRefBy(Integer refBy) {
		this.refBy = refBy;
	}

	/**
	 * @return the regNum
	 */
	public String getRegNum() {
		return regNum;
	}

	/**
	 * @param regNum
	 *            the regNum to set
	 */
	public void setRegNum(String regNum) {
		this.regNum = regNum;
	}

	/**
	 * @return the pntCatId
	 */
	public String getPntCatId() {
		return pntCatId;
	}

	/**
	 * @param pntCatId
	 *            the pntCatId to set
	 */
	public void setPntCatId(String pntCatId) {
		this.pntCatId = pntCatId;
	}

	/**
	 * .
	 * 
	 * @return the umrNo
	 */
	public String getUmrNo() {
		return umrNo;
	}

	/**
	 * .
	 * 
	 * @param umrNo
	 *            the umrNo to set
	 */
	public void setUmrNo(String umrNo) {
		this.umrNo = umrNo;
	}

	/**
	 * .
	 * 
	 * @return the validity
	 */
	public String getValidity() {
		return validity;
	}

	/**
	 * .
	 * 
	 * @param validity
	 *            the validity to set
	 */
	public void setValidity(String validity) {
		this.validity = validity;
	}

	/**
	 * .
	 * 
	 * @return the regCode
	 */
	public String getRegCode() {
		return regCode;
	}

	/**
	 * .
	 * 
	 * @param regCode
	 *            the regCode to set
	 */
	public void setRegCode(String regCode) {
		this.regCode = regCode;
	}

	/**
	 * .
	 * 
	 * @return the documentId
	 */
	public Integer getDocumentId() {
		return documentId;
	}

	/**
	 * .
	 * 
	 * @param documentId
	 *            the documentId to set
	 */
	public void setDocumentId(Integer documentId) {
		this.documentId = documentId;
	}

	/**
	 * .
	 * 
	 * @return the selectDate
	 */
	public String getSelectDate() {
		return selectDate;
	}

	/**
	 * .
	 * 
	 * @param selectDate
	 *            the selectDate to set
	 */
	public void setSelectDate(String selectDate) {
		this.selectDate = selectDate;
	}

	/**
	 * .
	 * 
	 * @return the patientId
	 */
	public Integer getPatientId() {
		return patientId;
	}

	/**
	 * .
	 * 
	 * @param patientId
	 *            the patientId to set
	 */
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	/**
	 * .
	 * 
	 * @return the regDt
	 */
	public String getRegDt() {
		return regDt;
	}

	/**
	 * .
	 * 
	 * @param regDt
	 *            the regDt to set
	 */
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}

	/**
	 * .
	 * 
	 * @return the fromDate
	 */
	public String getFromDate() {
		return fromDate;
	}

	/**
	 * .
	 * 
	 * @param fromDate
	 *            the fromDate to set
	 */
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	/**
	 * .
	 * 
	 * @return the toDate
	 */
	public String getToDate() {
		return toDate;
	}

	/**
	 * .
	 * 
	 * @param toDate
	 *            the toDate to set
	 */
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	/**
	 * .
	 * 
	 * @return the docType
	 */
	public String getDocType() {
		return docType;
	}

	/**
	 * .
	 * 
	 * @param docType
	 *            the docType to set
	 */
	public void setDocType(String docType) {
		this.docType = docType;
	}

	/**
	 * .
	 * 
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * .
	 * 
	 * @param fileName
	 *            the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * .
	 * 
	 * @return the fileType
	 */
	public String[] getFileType() {
		return fileType;
	}

	/**
	 * .
	 * 
	 * @param fileType
	 *            the fileType to set
	 */
	public void setFileType(String[] fileType) {
		this.fileType = fileType;
	}

	/**
	 * .
	 * 
	 * @return the files
	 */
	public List<MultipartFile> getFiles() {
		return files;
	}

	/**
	 * .
	 * 
	 * @param files
	 *            the files to set
	 */
	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}

	/**
	 * .
	 * 
	 * @return the count
	 */
	public Integer getCount() {
		return count;
	}

	/**
	 * .
	 * 
	 * @param count
	 *            the count to set
	 */
	public void setCount(Integer count) {
		this.count = count;
	}

	/**
	 * .
	 * 
	 * @return the picName
	 */
	public String getPicName() {
		return picName;
	}

	/**
	 * .
	 * 
	 * @param picName
	 *            the picName to set
	 */
	public void setPicName(String picName) {
		this.picName = picName;
	}

	/**
	 * .
	 * 
	 * @return the patientCode
	 */
	public String getPatientCode() {
		return patientCode;
	}

	/**
	 * .
	 * 
	 * @param patientCode
	 *            the patientCode to set
	 */
	public void setPatientCode(String patientCode) {
		this.patientCode = patientCode;
	}

	/**
	 * .
	 * 
	 * @return the pntType
	 */
	public String getPntType() {
		return pntType;
	}

	/**
	 * .
	 * 
	 * @param pntType
	 *            the pntType to set
	 */
	public void setPntType(String pntType) {
		this.pntType = pntType;
	}

	/**
	 * .
	 * 
	 * @return the pntCat
	 */
	public String getPntCat() {
		return pntCat;
	}

	/**
	 * .
	 * 
	 * @param pntCat
	 *            the pntCat to set
	 */
	public void setPntCat(String pntCat) {
		this.pntCat = pntCat;
	}

	/**
	 * .
	 * 
	 * @return the pname
	 */
	public String getPname() {
		return pname;
	}

	/**
	 * .
	 * 
	 * @param pname
	 *            the pname to set
	 */
	public void setPname(String pname) {
		this.pname = pname;
	}

	/**
	 * .
	 * 
	 * @return the dob
	 */
	public String getDob() {
		return dob;
	}

	/**
	 * .
	 * 
	 * @param dob
	 *            the dob to set
	 */
	public void setDob(String dob) {
		this.dob = dob;
	}

	/**
	 * .
	 * 
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}

	/**
	 * .
	 * 
	 * @param gender
	 *            the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	/**
	 * .
	 * 
	 * @return the age
	 */
	public String getAge() {
		return age;
	}

	/**
	 * .
	 * 
	 * @param age
	 *            the age to set
	 */
	public void setAge(String age) {
		this.age = age;
	}

	/**
	 * .
	 * 
	 * @return the mobNum
	 */
	public String getMobNum() {
		return mobNum;
	}

	/**
	 * .
	 * 
	 * @param mobNum
	 *            the mobNum to set
	 */
	public void setMobNum(String mobNum) {
		this.mobNum = mobNum;
	}

	/**
	 * .
	 * 
	 * @return the landNum
	 */
	public String getLandNum() {
		return landNum;
	}

	/**
	 * .
	 * 
	 * @param landNum
	 *            the landNum to set
	 */
	public void setLandNum(String landNum) {
		this.landNum = landNum;
	}

	/**
	 * .
	 * 
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * .
	 * 
	 * @param text
	 *            the text to set
	 */
	public void setText(String text) {
		this.text = text;
	}

	/**
	 * .
	 * 
	 * @return the photo
	 */
	public String getPhoto() {
		return photo;
	}

	/**
	 * .
	 * 
	 * @param photo
	 *            the photo to set
	 */
	public void setPhoto(String photo) {
		this.photo = photo;
	}

	/**
	 * .
	 * 
	 * @return the orgName
	 */
	public String getOrgName() {
		return orgName;
	}

	/**
	 * .
	 * 
	 * @param orgName
	 *            the orgName to set
	 */
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	/**
	 * .
	 * 
	 * @return the empId
	 */
	public Integer getEmpId() {
		return empId;
	}

	/**
	 * .
	 * 
	 * @param empId
	 *            the empId to set
	 */
	public void setEmpId(Integer empId) {
		this.empId = empId;
	}

	/**
	 * .
	 * 
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * .
	 * 
	 * @param email
	 *            the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * .
	 * 
	 * @return the altEmail
	 */
	public String getAltEmail() {
		return altEmail;
	}

	/**
	 * .
	 * 
	 * @param altEmail
	 *            the altEmail to set
	 */
	public void setAltEmail(String altEmail) {
		this.altEmail = altEmail;
	}

	/**
	 * .
	 * 
	 * @return the preCom
	 */
	public String getPreCom() {
		return preCom;
	}

	/**
	 * .
	 * 
	 * @param preCom
	 *            the preCom to set
	 */
	public void setPreCom(String preCom) {
		this.preCom = preCom;
	}

	/**
	 * .
	 * 
	 * @return the remLang
	 */
	public String getRemLang() {
		return remLang;
	}

	/**
	 * .
	 * 
	 * @param remLang
	 *            the remLang to set
	 */
	public void setRemLang(String remLang) {
		this.remLang = remLang;
	}

	/**
	 * .
	 * 
	 * @return the country
	 */
	public String getCountry() {
		return country;
	}

	/**
	 * .
	 * 
	 * @param country
	 *            the country to set
	 */
	public void setCountry(String country) {
		this.country = country;
	}

	/**
	 * .
	 * 
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * .
	 * 
	 * @param state
	 *            the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * .
	 * 
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * .
	 * 
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * .
	 * 
	 * @return the addr
	 */
	public String getAddr() {
		return addr;
	}

	/**
	 * .
	 * 
	 * @param addr
	 *            the addr to set
	 */
	public void setAddr(String addr) {
		this.addr = addr;
	}

	/**
	 * .
	 * 
	 * @return the pinCode
	 */
	public String getPinCode() {
		return pinCode;
	}

	/**
	 * .
	 * 
	 * @param pinCode
	 *            the pinCode to set
	 */
	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	/**
	 * .
	 * 
	 * @return the maritalStatus
	 */
	public String getMaritalStatus() {
		return maritalStatus;
	}

	/**
	 * .
	 * 
	 * @param maritalStatus
	 *            the maritalStatus to set
	 */
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	/**
	 * .
	 * 
	 * @return the emrName
	 */
	public String getEmrName() {
		return emrName;
	}

	/**
	 * .
	 * 
	 * @param emrName
	 *            the emrName to set
	 */
	public void setEmrName(String emrName) {
		this.emrName = emrName;
	}

	/**
	 * .
	 * 
	 * @return the emrPhone
	 */
	public String getEmrPhone() {
		return emrPhone;
	}

	/**
	 * .
	 * 
	 * @param emrPhone
	 *            the emrPhone to set
	 */
	public void setEmrPhone(String emrPhone) {
		this.emrPhone = emrPhone;
	}

	/**
	 * .
	 * 
	 * @return the emrRel
	 */
	public String getEmrRel() {
		return emrRel;
	}

	/**
	 * .
	 * 
	 * @param emrRel
	 *            the emrRel to set
	 */
	public void setEmrRel(String emrRel) {
		this.emrRel = emrRel;
	}

	/**
	 * .
	 * 
	 * @return the priCarePhysician
	 */
	public String getPriCarePhysician() {
		return priCarePhysician;
	}

	/**
	 * .
	 * 
	 * @param priCarePhysician
	 *            the priCarePhysician to set
	 */
	public void setPriCarePhysician(String priCarePhysician) {
		this.priCarePhysician = priCarePhysician;
	}

	/**
	 * .
	 * 
	 * @return the bloodGrp
	 */
	public String getBloodGrp() {
		return bloodGrp;
	}

	/**
	 * .
	 * 
	 * @param bloodGrp
	 *            the bloodGrp to set
	 */
	public void setBloodGrp(String bloodGrp) {
		this.bloodGrp = bloodGrp;
	}

	/**
	 * .
	 * 
	 * @return the nationality
	 */
	public String getNationality() {
		return nationality;
	}

	/**
	 * .
	 * 
	 * @param nationality
	 *            the nationality to set
	 */
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	/**
	 * .
	 * 
	 * @return the religion
	 */
	public String getReligion() {
		return religion;
	}

	/**
	 * .
	 * 
	 * @param religion
	 *            the religion to set
	 */
	public void setReligion(String religion) {
		this.religion = religion;
	}

	/**
	 * .
	 * 
	 * @return the motherName
	 */
	public String getMotherName() {
		return motherName;
	}

	/**
	 * .
	 * 
	 * @param motherName
	 *            the motherName to set
	 */
	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	/**
	 * .
	 * 
	 * @return the fatherName
	 */
	public String getFatherName() {
		return fatherName;
	}

	/**
	 * .
	 * 
	 * @param fatherName
	 *            the fatherName to set
	 */
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	/**
	 * .
	 * 
	 * @return the refType
	 */
	public String getRefType() {
		return refType;
	}

	/**
	 * .
	 * 
	 * @param refType
	 *            the refType to set
	 */
	public void setRefType(String refType) {
		this.refType = refType;
	}

	/**
	 * .
	 * 
	 * @return the refName
	 */
	public String getRefName() {
		return refName;
	}

	/**
	 * .
	 * 
	 * @param refName
	 *            the refName to set
	 */
	public void setRefName(String refName) {
		this.refName = refName;
	}

	/**
	 * .
	 * 
	 * @return the tpaCode
	 */
	public String getTpaCode() {
		return tpaCode;
	}

	/**
	 * .
	 * 
	 * @param tpaCode
	 *            the tpaCode to set
	 */
	public void setTpaCode(String tpaCode) {
		this.tpaCode = tpaCode;
	}

	/**
	 * .
	 * 
	 * @return the idNum
	 */
	public String getIdNum() {
		return idNum;
	}

	/**
	 * .
	 * 
	 * @param idNum
	 *            the idNum to set
	 */
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}

	/**
	 * .
	 * 
	 * @return the grpNum
	 */
	public String getGrpNum() {
		return grpNum;
	}

	/**
	 * .
	 * 
	 * @param grpNum
	 *            the grpNum to set
	 */
	public void setGrpNum(String grpNum) {
		this.grpNum = grpNum;
	}

	/**
	 * .
	 * 
	 * @return the planName
	 */
	public String getPlanName() {
		return planName;
	}

	/**
	 * .
	 * 
	 * @param planName
	 *            the planName to set
	 */
	public void setPlanName(String planName) {
		this.planName = planName;
	}

	/**
	 * .
	 * 
	 * @return the planType
	 */
	public String getPlanType() {
		return planType;
	}

	/**
	 * .
	 * 
	 * @param planType
	 *            the planType to set
	 */
	public void setPlanType(String planType) {
		this.planType = planType;
	}

	/**
	 * .
	 * 
	 * @return the ofcNum
	 */
	public String getOfcNum() {
		return ofcNum;
	}

	/**
	 * .
	 * 
	 * @param ofcNum
	 *            the ofcNum to set
	 */
	public void setOfcNum(String ofcNum) {
		this.ofcNum = ofcNum;
	}

	/**
	 * .
	 * 
	 * @return the notes
	 */
	public String getNotes() {
		return notes;
	}

	/**
	 * .
	 * 
	 * @param notes
	 *            the notes to set
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}

	/**
	 * .
	 * 
	 * @return the cmpny
	 */
	public String getCmpny() {
		return cmpny;
	}

	/**
	 * .
	 * 
	 * @param cmpny
	 *            the cmpny to set
	 */
	public void setCmpny(String cmpny) {
		this.cmpny = cmpny;
	}

	/**
	 * .
	 * 
	 * @return the addedBy
	 */
	public String getAddedBy() {
		return addedBy;
	}

	/**
	 * .
	 * 
	 * @param addedBy
	 *            the addedBy to set
	 */
	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	/**
	 * .
	 * 
	 * @return the addedOn
	 */
	public String getAddedOn() {
		return addedOn;
	}

	/**
	 * .
	 * 
	 * @param addedOn
	 *            the addedOn to set
	 */
	public void setAddedOn(String addedOn) {
		this.addedOn = addedOn;
	}

	/**
	 * .
	 * 
	 * @return the addedIp
	 */
	public String getAddedIp() {
		return addedIp;
	}

	/**
	 * .
	 * 
	 * @param addedIp
	 *            the addedIp to set
	 */
	public void setAddedIp(String addedIp) {
		this.addedIp = addedIp;
	}

	/**
	 * .
	 * 
	 * @return the modifiedBy
	 */
	public String getModifiedBy() {
		return modifiedBy;
	}

	/**
	 * .
	 * 
	 * @param modifiedBy
	 *            the modifiedBy to set
	 */
	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	/**
	 * .
	 * 
	 * @return the modifiedOn
	 */
	public String getModifiedOn() {
		return modifiedOn;
	}

	/**
	 * .
	 * 
	 * @param modifiedOn
	 *            the modifiedOn to set
	 */
	public void setModifiedOn(String modifiedOn) {
		this.modifiedOn = modifiedOn;
	}

	/**
	 * .
	 * 
	 * @return the modifiedIp
	 */
	public String getModifiedIp() {
		return modifiedIp;
	}

	/**
	 * .
	 * 
	 * @param modifiedIp
	 *            the modifiedIp to set
	 */
	public void setModifiedIp(String modifiedIp) {
		this.modifiedIp = modifiedIp;
	}

	/**
	 * .
	 * 
	 * @return the docStatus
	 */
	public String getDocStatus() {
		return docStatus;
	}

	/**
	 * .
	 * 
	 * @param docStatus
	 *            the docStatus to set
	 */
	public void setDocStatus(String docStatus) {
		this.docStatus = docStatus;
	}

	/**
	 * .
	 * 
	 * @return the refCity
	 */
	public Integer getRefCity() {
		return refCity;
	}

	/**
	 * .
	 * 
	 * @param refCity
	 *            the refCity to set
	 */
	public void setRefCity(Integer refCity) {
		this.refCity = refCity;
	}

	/**
	 * .
	 * 
	 * @return the refCountry
	 */
	public Integer getRefCountry() {
		return refCountry;
	}

	/**
	 * .
	 * 
	 * @param refCountry
	 *            the refCountry to set
	 */
	public void setRefCountry(Integer refCountry) {
		this.refCountry = refCountry;
	}

	/**
	 * .
	 * 
	 * @return the refState
	 */
	public Integer getRefState() {
		return refState;
	}

	/**
	 * .
	 * 
	 * @param refState
	 *            the refState to set
	 */
	public void setRefState(Integer refState) {
		this.refState = refState;
	}

	/**
	 * .
	 * 
	 * @return the refAddr
	 */
	public String getRefAddr() {
		return refAddr;
	}

	/**
	 * .
	 * 
	 * @param refAddr
	 *            the refAddr to set
	 */
	public void setRefAddr(String refAddr) {
		this.refAddr = refAddr;
	}

	/**
	 * .
	 * 
	 * @return the refPIN
	 */
	public Integer getRefPIN() {
		return refPIN;
	}

	/**
	 * .
	 * 
	 * @param refPIN
	 *            the refPIN to set
	 */
	public void setRefPIN(Integer refPIN) {
		this.refPIN = refPIN;
	}

	/**
	 * .
	 * 
	 * @return the relation
	 */
	public String getRelation() {
		return relation;
	}

	/**
	 * .
	 * 
	 * @param relation
	 *            the relation to set
	 */
	public void setRelation(String relation) {
		this.relation = relation;
	}

	/**
	 * .
	 * 
	 * @return the creditEmpId
	 */
	public String getCreditEmpId() {
		return creditEmpId;
	}

	/**
	 * .
	 * 
	 * @param creditEmpId
	 *            the creditEmpId to set
	 */
	public void setCreditEmpId(String creditEmpId) {
		this.creditEmpId = creditEmpId;
	}

	/**
	 * @return the searchBy
	 */
	public String getSearchBy() {
		return searchBy;
	}

	/**
	 * @param searchBy
	 *            the searchBy to set
	 */
	public void setSearchBy(String searchBy) {
		this.searchBy = searchBy;
	}

	/**
	 * @return the refTypeId
	 */
	public Integer getRefTypeId() {
		return refTypeId;
	}

	/**
	 * @param refTypeId
	 *            the refTypeId to set
	 */
	public void setRefTypeId(Integer refTypeId) {
		this.refTypeId = refTypeId;
	}

	public String getPatientLike() {
		return patientLike;
	}

	public void setPatientLike(String patientLike) {
		this.patientLike = patientLike;
	}

	/**
	 * @return the pntStatus
	 */
	public String getPntStatus() {
		return pntStatus;
	}

	/**
	 * @param pntStatus
	 *            the pntStatus to set
	 */
	public void setPntStatus(String pntStatus) {
		this.pntStatus = pntStatus;
	}

	/**
	 * @return the lName
	 */
	public String getlName() {
		return lName;
	}

	/**
	 * @param lName the lName to set
	 */
	public void setlName(String lName) {
		this.lName = lName;
	}

	/**
	 * @return the empName
	 */
	public String getEmpName() {
		return empName;
	}

	/**
	 * @param empName
	 *            the empName to set
	 */
	public void setEmpName(String empName) {
		this.empName = empName;
	}

	/**
	 * @return the authPerson
	 */
	public String getAuthPerson() {
		return authPerson;
	}

	/**
	 * @param authPerson
	 *            the authPerson to set
	 */
	public void setAuthPerson(String authPerson) {
		this.authPerson = authPerson;
	}

	/**
	 * .
	 * 
	 * @return the parentName
	 */
	public String getParentName() {
		return parentName;
	}

	/**
	 * .
	 * 
	 * @param parentName
	 *            the parentName to set
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	/**
	 * @return the careBy
	 */
	public String getCareBy() {
		return careBy;
	}

	/**
	 * @param careBy
	 *            the careBy to set
	 */
	public void setCareBy(String careBy) {
		this.careBy = careBy;
	}

	/**
	 * @return the careByName
	 */
	public String getCareByName() {
		return careByName;
	}

	/**
	 * @param carByName
	 *            the carebyName to set
	 */
	public void setCareByName(String careByName) {
		this.careByName = careByName;
	}

	/**
	 * @return the specName
	 */
	public String getSpecName() {
		return specName;
	}

	/**
	 * @param specName
	 *            the specName to set
	 */
	public void setSpecName(String specName) {
		this.specName = specName;
	}

	/**
	 * @return the empCode
	 */
	public String getEmpCode() {
		return empCode;
	}

	/**
	 * @param empCode
	 *            the empCode to set
	 */
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}

	/**
	 * @return the idDoctor
	 */
	public String getIdDoctor() {
		return idDoctor;
	}

	/**
	 * @param idDoctor
	 *            the idDoctor to set
	 */
	public void setIdDoctor(String idDoctor) {
		this.idDoctor = idDoctor;
	}

	/**
	 * @return the ptitle
	 */
	public String getPtitle() {
		return ptitle;
	}

	/**
	 * @param ptitle the ptitle to set
	 */
	public void setPtitle(String ptitle) {
		this.ptitle = ptitle;
	}

	/**
	 * @return the consFees
	 */
	public String getConsFees() {
		return consFees;
	}

	/**
	 * @param consFees the consFees to set
	 */
	public void setConsFees(String consFees) {
		this.consFees = consFees;
	}

	/**
	 * @return the regFees
	 */
	public String getRegFees() {
		return regFees;
	}

	/**
	 * @param regFees the regFees to set
	 */
	public void setRegFees(String regFees) {
		this.regFees = regFees;
	}

	/**
	 * @return the stfId
	 */
	public Integer getStfId() {
		return stfId;
	}

	/**
	 * @param stfId the stfId to set
	 */
	public void setStfId(Integer stfId) {
		this.stfId = stfId;
	}

	/**
	 * @return the stfName
	 */
	public String getStfName() {
		return stfName;
	}

	/**
	 * @param stfName the stfName to set
	 */
	public void setStfName(String stfName) {
		this.stfName = stfName;
	}

	/**
	 * @return the hspId
	 */
	public Integer getHspId() {
		return hspId;
	}

	/**
	 * @param hspId the hspId to set
	 */
	public void setHspId(Integer hspId) {
		this.hspId = hspId;
	}

	/**
	 * @return the hspName
	 */
	public String getHspName() {
		return hspName;
	}

	/**
	 * @param hspName the hspName to set
	 */
	public void setHspName(String hspName) {
		this.hspName = hspName;
	}

	public String getRegDivSts() {
		return regDivSts;
	}

	public void setRegDivSts(String regDivSts) {
		this.regDivSts = regDivSts;
	}

	public String getConsDivSts() {
		return consDivSts;
	}

	public void setConsDivSts(String consDivSts) {
		this.consDivSts = consDivSts;
	}

	/**
	 * @return the billId
	 */
	public String getBillId() {
		return billId;
	}

	/**
	 * @param billId the billId to set
	 */
	public void setBillId(String billId) {
		this.billId = billId;
	}

	public String getOpNum() {
		return opNum;
	}

	public void setOpNum(String opNum) {
		this.opNum = opNum;
	}

	public String getSchDt() {
		return schDt;
	}

	public void setSchDt(String schDt) {
		this.schDt = schDt;
	}

	/**
	 * @return the patVisit
	 */
	public String getPatVisit() {
		return patVisit;
	}

	/**
	 * @param patVisit the patVisit to set
	 */
	public void setPatVisit(String patVisit) {
		this.patVisit = patVisit;
	}

	/**
	 * @return the billAmt
	 */
	public String getBillAmt() {
		return billAmt;
	}

	/**
	 * @param billAmt the billAmt to set
	 */
	public void setBillAmt(String billAmt) {
		this.billAmt = billAmt;
	}

	/**
	 * @return the finalAmt
	 */
	public String getFinalAmt() {
		return finalAmt;
	}

	/**
	 * @param finalAmt the finalAmt to set
	 */
	public void setFinalAmt(String finalAmt) {
		this.finalAmt = finalAmt;
	}

	/**
	 * @return the discAmt
	 */
	public String getDiscAmt() {
		return discAmt;
	}

	/**
	 * @param discAmt the discAmt to set
	 */
	public void setDiscAmt(String discAmt) {
		this.discAmt = discAmt;
	}

	/**
	 * @return the restrictResubmission
	 */
	public String getRestrictResubmission() {
		return restrictResubmission;
	}

	/**
	 * @param restrictResubmission the restrictResubmission to set
	 */
	public void setRestrictResubmission(String restrictResubmission) {
		this.restrictResubmission = restrictResubmission;
	}

	/**
	 * @return the regValidDt
	 */
	public String getRegValidDt() {
		return regValidDt;
	}

	/**
	 * @param regValidDt the regValidDt to set
	 */
	public void setRegValidDt(String regValidDt) {
		this.regValidDt = regValidDt;
	}

	/**
	 * @return the otherHospId
	 */
	public int getOtherHospId() {
		return otherHospId;
	}

	/**
	 * @param otherHospId the otherHospId to set
	 */
	public void setOtherHospId(int otherHospId) {
		this.otherHospId = otherHospId;
	}

	/**
	 * @return the otherStaffId
	 */
	public int getOtherStaffId() {
		return otherStaffId;
	}

	/**
	 * @param otherStaffId the otherStaffId to set
	 */
	public void setOtherStaffId(int otherStaffId) {
		this.otherStaffId = otherStaffId;
	}

	/**
	 * @return the otherHospCode
	 */
	public String getOtherHospCode() {
		return otherHospCode;
	}

	/**
	 * @param otherHospCode the otherHospCode to set
	 */
	public void setOtherHospCode(String otherHospCode) {
		this.otherHospCode = otherHospCode;
	}

	/**
	 * @return the otherHospName
	 */
	public String getOtherHospName() {
		return otherHospName;
	}

	/**
	 * @param otherHospName the otherHospName to set
	 */
	public void setOtherHospName(String otherHospName) {
		this.otherHospName = otherHospName;
	}

	/**
	 * @return the otherStaffCode
	 */
	public String getOtherStaffCode() {
		return otherStaffCode;
	}

	/**
	 * @param otherStaffCode the otherStaffCode to set
	 */
	public void setOtherStaffCode(String otherStaffCode) {
		this.otherStaffCode = otherStaffCode;
	}

	/**
	 * @return the otherStaffName
	 */
	public String getOtherStaffName() {
		return otherStaffName;
	}

	/**
	 * @param otherStaffName the otherStaffName to set
	 */
	public void setOtherStaffName(String otherStaffName) {
		this.otherStaffName = otherStaffName;
	}

	/**
	 * @return the aliasName
	 */
	public String getAliasName() {
		return aliasName;
	}

	/**
	 * @param aliasName the aliasName to set
	 */
	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}

	/**
	 * @return the userOrgStatus
	 */
	public int getUserOrgStatus() {
		return userOrgStatus;
	}

	/**
	 * @param userOrgStatus the userOrgStatus to set
	 */
	public void setUserOrgStatus(int userOrgStatus) {
		this.userOrgStatus = userOrgStatus;
	}

	/**
	 * @return the userLocStatus
	 */
	public int getUserLocStatus() {
		return userLocStatus;
	}

	/**
	 * @param userLocStatus the userLocStatus to set
	 */
	public void setUserLocStatus(int userLocStatus) {
		this.userLocStatus = userLocStatus;
	}

	/**
	 * @return the userDeptStatus
	 */
	public int getUserDeptStatus() {
		return userDeptStatus;
	}

	/**
	 * @param userDeptStatus the userDeptStatus to set
	 */
	public void setUserDeptStatus(int userDeptStatus) {
		this.userDeptStatus = userDeptStatus;
	}

	/**
	 * @return the locName
	 */
	public String getLocName() {
		return locName;
	}

	/**
	 * @param locName the locName to set
	 */
	public void setLocName(String locName) {
		this.locName = locName;
	}

	/**
	 * @return the deptId
	 */
	public int getDeptId() {
		return deptId;
	}

	/**
	 * @param deptId the deptId to set
	 */
	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	/**
	 * @return the deptName
	 */
	public String getDeptName() {
		return deptName;
	}

	/**
	 * @param deptName the deptName to set
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	/**
	 * @return the userOrgId
	 */
	public Integer getUserOrgId() {
		return userOrgId;
	}

	/**
	 * @param userOrgId the userOrgId to set
	 */
	public void setUserOrgId(Integer userOrgId) {
		this.userOrgId = userOrgId;
	}

	/**
	 * @return the userLocId
	 */
	public Integer getUserLocId() {
		return userLocId;
	}

	/**
	 * @param userLocId the userLocId to set
	 */
	public void setUserLocId(Integer userLocId) {
		this.userLocId = userLocId;
	}

	/**
	 * @return the userDeptId
	 */
	public Integer getUserDeptId() {
		return userDeptId;
	}

	/**
	 * @param userDeptId the userDeptId to set
	 */
	public void setUserDeptId(Integer userDeptId) {
		this.userDeptId = userDeptId;
	}

	/**
	 * @return the serviceType
	 */
	public String getServiceType() {
		return serviceType;
	}

	/**
	 * @param serviceType the serviceType to set
	 */
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	/**
	 * @return the pntPortalSts
	 */
	public String getPntPortalSts() {
		return pntPortalSts;
	}

	/**
	 * @param pntPortalSts the pntPortalSts to set
	 */
	public void setPntPortalSts(String pntPortalSts) {
		this.pntPortalSts = pntPortalSts;
	}

	/**
	 * @return the pntPortalId
	 */
	public String getPntPortalId() {
		return pntPortalId;
	}

	/**
	 * @param pntPortalId the pntPortalId to set
	 */
	public void setPntPortalId(String pntPortalId) {
		this.pntPortalId = pntPortalId;
	}

	/**
	 * @return the pntPortalRegSts
	 */
	public String getPntPortalRegSts() {
		return pntPortalRegSts;
	}

	/**
	 * @param pntPortalRegSts the pntPortalRegSts to set
	 */
	public void setPntPortalRegSts(String pntPortalRegSts) {
		this.pntPortalRegSts = pntPortalRegSts;
	}

	/**
	 * @return the otherStaffMob
	 */
	public String getOtherStaffMob() {
		return otherStaffMob;
	}

	/**
	 * @param otherStaffMob the otherStaffMob to set
	 */
	public void setOtherStaffMob(String otherStaffMob) {
		this.otherStaffMob = otherStaffMob;
	}

	/**
	 * @return the otherStaffAddr
	 */
	public String getOtherStaffAddr() {
		return otherStaffAddr;
	}

	/**
	 * @param otherStaffAddr the otherStaffAddr to set
	 */
	public void setOtherStaffAddr(String otherStaffAddr) {
		this.otherStaffAddr = otherStaffAddr;
	}

	public String getPatientDetailsSplit() {
		return patientDetailsSplit;
	}

	public void setPatientDetailsSplit(String patientDetailsSplit) {
		this.patientDetailsSplit = patientDetailsSplit;
	}

	public String getRegPatientName() {
		return regPatientName;
	}

	public void setRegPatientName(String regPatientName) {
		this.regPatientName = regPatientName;
	}

	/**
	 * @return the patientName
	 */
	public String getPatientName() {
		return patientName;
	}

	/**
	 * @param patientName the patientName to set
	 */
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	/**
	 * @return the pntMobNum
	 */
	public String getPntMobNum() {
		return pntMobNum;
	}

	/**
	 * @param pntMobNum the pntMobNum to set
	 */
	public void setPntMobNum(String pntMobNum) {
		this.pntMobNum = pntMobNum;
	}

	/**
	 * @return the regUmr
	 */
	public String getRegUmr() {
		return regUmr;
	}

	/**
	 * @param regUmr the regUmr to set
	 */
	public void setRegUmr(String regUmr) {
		this.regUmr = regUmr;
	}

	/**
	 * @return the regPatientId
	 */
	public String getRegPatientId() {
		return regPatientId;
	}

	/**
	 * @param regPatientId the regPatientId to set
	 */
	public void setRegPatientId(String regPatientId) {
		this.regPatientId = regPatientId;
	}

	/**
	 * @return the ageDays
	 */
	public String getAgeDays() {
		return ageDays;
	}

	/**
	 * @param ageDays the ageDays to set
	 */
	public void setAgeDays(String ageDays) {
		this.ageDays = ageDays;
	}

	/**
	 * @return the ageMonths
	 */
	public String getAgeMonths() {
		return ageMonths;
	}

	/**
	 * @param ageMonths the ageMonths to set
	 */
	public void setAgeMonths(String ageMonths) {
		this.ageMonths = ageMonths;
	}

	/**
	 * @return the doctorDetails
	 */
	public String getDoctorDetails() {
		return doctorDetails;
	}

	/**
	 * @param doctorDetails the doctorDetails to set
	 */
	public void setDoctorDetails(String doctorDetails) {
		this.doctorDetails = doctorDetails;
	}

	/**
	 * @return the pntOccupation
	 */
	public String getPntOccupation() {
		return pntOccupation;
	}

	/**
	 * @param pntOccupation the pntOccupation to set
	 */
	public void setPntOccupation(String pntOccupation) {
		this.pntOccupation = pntOccupation;
	}

	/**
	 * @return the patVisitId
	 */
	public Integer getPatVisitId() {
		return patVisitId;
	}

	/**
	 * @param patVisitId the patVisitId to set
	 */
	public void setPatVisitId(Integer patVisitId) {
		this.patVisitId = patVisitId;
	}

	/**
	 * @return the catOrgId
	 */
	public Integer getCatOrgId() {
		return catOrgId;
	}

	/**
	 * @param catOrgId the catOrgId to set
	 */
	public void setCatOrgId(Integer catOrgId) {
		this.catOrgId = catOrgId;
	}

	/**
	 * @return the docId
	 */
	public Integer getDocId() {
		return docId;
	}

	/**
	 * @param docId the docId to set
	 */
	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	/**
	 * @return the patientCategoryOrgId
	 */
	public String getPatientCategoryOrgId() {
		return patientCategoryOrgId;
	}

	/**
	 * @param patientCategoryOrgId the patientCategoryOrgId to set
	 */
	public void setPatientCategoryOrgId(String patientCategoryOrgId) {
		this.patientCategoryOrgId = patientCategoryOrgId;
	}

	/**
	 * @return the amount
	 */
	public String getAmount() {
		return amount;
	}

	/**
	 * @param amount the amount to set
	 */
	public void setAmount(String amount) {
		this.amount = amount;
	}

	/**
	 * @return the totalAmount
	 */
	public String getTotalAmount() {
		return totalAmount;
	}

	/**
	 * @param totalAmount the totalAmount to set
	 */
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	/**
	 * @return the billAmount
	 */
	public String getBillAmount() {
		return billAmount;
	}

	/**
	 * @param billAmount the billAmount to set
	 */
	public void setBillAmount(String billAmount) {
		this.billAmount = billAmount;
	}

	
	public String getBillCount() {
		return billCount;
	}

	public void setBillCount(String billCount) {
		this.billCount = billCount;
	}

	/**
	 * @return the tokenNum
	 */
	public String getTokenNum() {
		return tokenNum;
	}

	/**
	 * @param tokenNum the tokenNum to set
	 */
	public void setTokenNum(String tokenNum) {
		this.tokenNum = tokenNum;
	}

	/**
	 * @return the pntDob
	 */
	public String getPntDob() {
		return pntDob;
	}

	/**
	 * @param pntDob the pntDob to set
	 */
	public void setPntDob(String pntDob) {
		this.pntDob = pntDob;
	}

	/**
	 * @return the dateSch
	 */
	public String getDateSch() {
		return dateSch;
	}

	/**
	 * @param dateSch the dateSch to set
	 */
	public void setDateSch(String dateSch) {
		this.dateSch = dateSch;
	}

	/**
	 * @return the patApptId
	 */
	public String getPatApptId() {
		return patApptId;
	}

	/**
	 * @param patApptId the patApptId to set
	 */
	public void setPatApptId(String patApptId) {
		this.patApptId = patApptId;
	}

	/**
	 * @return the otherDoctorId
	 */
	public int getOtherDoctorId() {
		return otherDoctorId;
	}

	/**
	 * @param otherDoctorId the otherDoctorId to set
	 */
	public void setOtherDoctorId(int otherDoctorId) {
		this.otherDoctorId = otherDoctorId;
	}

	/**
	 * @return the otherDoctorCode
	 */
	public String getOtherDoctorCode() {
		return otherDoctorCode;
	}

	/**
	 * @param otherDoctorCode the otherDoctorCode to set
	 */
	public void setOtherDoctorCode(String otherDoctorCode) {
		this.otherDoctorCode = otherDoctorCode;
	}

	/**
	 * @return the otherDoctorName
	 */
	public String getOtherDoctorName() {
		return otherDoctorName;
	}

	/**
	 * @param otherDoctorName the otherDoctorName to set
	 */
	public void setOtherDoctorName(String otherDoctorName) {
		this.otherDoctorName = otherDoctorName;
	}

	/**
	 * @return the otherDoctorMob
	 */
	public String getOtherDoctorMob() {
		return otherDoctorMob;
	}

	/**
	 * @param otherDoctorMob the otherDoctorMob to set
	 */
	public void setOtherDoctorMob(String otherDoctorMob) {
		this.otherDoctorMob = otherDoctorMob;
	}

	/**
	 * @return the otherDoctorAddr
	 */
	public String getOtherDoctorAddr() {
		return otherDoctorAddr;
	}

	/**
	 * @param otherDoctorAddr the otherDoctorAddr to set
	 */
	public void setOtherDoctorAddr(String otherDoctorAddr) {
		this.otherDoctorAddr = otherDoctorAddr;
	}



	


	/**
	 * @return the passportNum
	 */
	public String getPassportNum() {
		return passportNum;
	}

	/**
	 * @param passportNum the passportNum to set
	 */
	public void setPassportNum(String passportNum) {
		this.passportNum = passportNum;
	}

	/**
	 * @return the passportIssuedDt
	 */
	public String getPassportIssuedDt() {
		return passportIssuedDt;
	}

	/**
	 * @param passportIssuedDt the passportIssuedDt to set
	 */
	public void setPassportIssuedDt(String passportIssuedDt) {
		this.passportIssuedDt = passportIssuedDt;
	}

	/**
	 * @return the passportExpiryDt
	 */
	public String getPassportExpiryDt() {
		return passportExpiryDt;
	}

	/**
	 * @param passportExpiryDt the passportExpiryDt to set
	 */
	public void setPassportExpiryDt(String passportExpiryDt) {
		this.passportExpiryDt = passportExpiryDt;
	}

	

	/**
	 * @return the patFileNames
	 */
	public List<MultipartFile> getPatFileNames() {
		return patFileNames;
	}

	/**
	 * @param patFileNames the patFileNames to set
	 */
	public void setPatFileNames(List<MultipartFile> patFileNames) {
		this.patFileNames = patFileNames;
	}

	/**
	 * @return the patFile
	 */
	public String getPatFile() {
		return patFile;
	}

	/**
	 * @param patFile the patFile to set
	 */
	public void setPatFile(String patFile) {
		this.patFile = patFile;
	}

	/**
	 * @return the picNamee
	 */
	public String getPicNamee() {
		return picNamee;
	}

	/**
	 * @param picNamee the picNamee to set
	 */
	public void setPicNamee(String picNamee) {
		this.picNamee = picNamee;
	}

	/**
	 * @return the specializationId
	 */
	public Integer getSpecializationId() {
		return specializationId;
	}

	/**
	 * @param specializationId the specializationId to set
	 */
	public void setSpecializationId(Integer specializationId) {
		this.specializationId = specializationId;
	}

	/**
	 * @return the specializationCode
	 */
	public String getSpecializationCode() {
		return specializationCode;
	}

	/**
	 * @param specializationCode the specializationCode to set
	 */
	public void setSpecializationCode(String specializationCode) {
		this.specializationCode = specializationCode;
	}

	/**
	 * @return the specialization
	 */
	public String getSpecialization() {
		return specialization;
	}

	/**
	 * @param specialization the specialization to set
	 */
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	/**
	 * @return the ticketFileNames
	 */
	public List<MultipartFile> getTicketFileNames() {
		return ticketFileNames;
	}

	/**
	 * @param ticketFileNames the ticketFileNames to set
	 */
	public void setTicketFileNames(List<MultipartFile> ticketFileNames) {
		this.ticketFileNames = ticketFileNames;
	}

	/**
	 * @return the attachmentName
	 */
	public String getAttachmentName() {
		return attachmentName;
	}

	/**
	 * @param attachmentName the attachmentName to set
	 */
	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}

	/**
	 * @return the descriptions
	 */
	public String[] getDescriptions() {
		return descriptions;
	}

	/**
	 * @param descriptions the descriptions to set
	 */
	public void setDescriptions(String[] descriptions) {
		this.descriptions = descriptions;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the attachmentId
	 */
	public Integer getAttachmentId() {
		return attachmentId;
	}

	/**
	 * @param attachmentId the attachmentId to set
	 */
	public void setAttachmentId(Integer attachmentId) {
		this.attachmentId = attachmentId;
	}

	/**
	 * @return the attachmentCount
	 */
	public Integer getAttachmentCount() {
		return attachmentCount;
	}

	/**
	 * @param attachmentCount the attachmentCount to set
	 */
	public void setAttachmentCount(Integer attachmentCount) {
		this.attachmentCount = attachmentCount;
	}

	/**
	 * @return the descriptionss
	 */
	public String[] getDescriptionss() {
		return descriptionss;
	}

	/**
	 * @param descriptionss the descriptionss to set
	 */
	public void setDescriptionss(String[] descriptionss) {
		this.descriptionss = descriptionss;
	}

	/**
	 * @return the attachmentIds
	 */
	public String[] getAttachmentIds() {
		return attachmentIds;
	}

	/**
	 * @param attachmentIds the attachmentIds to set
	 */
	public void setAttachmentIds(String[] attachmentIds) {
		this.attachmentIds = attachmentIds;
	}

	/**
	 * @return the attachId
	 */
	public String getAttachId() {
		return attachId;
	}

	/**
	 * @param attachId the attachId to set
	 */
	public void setAttachId(String attachId) {
		this.attachId = attachId;
	}

	/**
	 * @return the patientIdForFile
	 */
	public Integer getPatientIdForFile() {
		return patientIdForFile;
	}

	/**
	 * @param patientIdForFile the patientIdForFile to set
	 */
	public void setPatientIdForFile(Integer patientIdForFile) {
		this.patientIdForFile = patientIdForFile;
	}

	/**
	 * @return the umrId
	 */
	public String getUmrId() {
		return umrId;
	}

	/**
	 * @param umrId the umrId to set
	 */
	public void setUmrId(String umrId) {
		this.umrId = umrId;
	}

	/**
	 * @return the picId
	 */
	public Integer getPicId() {
		return picId;
	}

	/**
	 * @param picId the picId to set
	 */
	public void setPicId(Integer picId) {
		this.picId = picId;
	}

	/**
	 * @return the allNames
	 */
	public String[] getAllNames() {
		return allNames;
	}

	/**
	 * @param allNames the allNames to set
	 */
	public void setAllNames(String[] allNames) {
		this.allNames = allNames;
	}

	/**
	 * @return the attachmentPicName
	 */
	public String getAttachmentPicName() {
		return attachmentPicName;
	}

	/**
	 * @param attachmentPicName the attachmentPicName to set
	 */
	public void setAttachmentPicName(String attachmentPicName) {
		this.attachmentPicName = attachmentPicName;
	}

	/**
	 * @return the prescIdForInsert
	 */
	public Integer getPrescIdForInsert() {
		return prescIdForInsert;
	}

	/**
	 * @param prescIdForInsert the prescIdForInsert to set
	 */
	public void setPrescIdForInsert(Integer prescIdForInsert) {
		this.prescIdForInsert = prescIdForInsert;
	}

	/**
	 * @return the ipId
	 */
	public String getIpId() {
		return ipId;
	}

	/**
	 * @param ipId the ipId to set
	 */
	public void setIpId(String ipId) {
		this.ipId = ipId;
	}

	/**
	 * @return the prescDate
	 */
	public String getPrescDate() {
		return prescDate;
	}

	/**
	 * @param prescDate the prescDate to set
	 */
	public void setPrescDate(String prescDate) {
		this.prescDate = prescDate;
	}

	/**
	 * @return the prescNum
	 */
	public String getPrescNum() {
		return prescNum;
	}

	/**
	 * @param prescNum the prescNum to set
	 */
	public void setPrescNum(String prescNum) {
		this.prescNum = prescNum;
	}

	/**
	 * @return the prescId
	 */
	public Integer getPrescId() {
		return prescId;
	}

	/**
	 * @param prescId the prescId to set
	 */
	public void setPrescId(Integer prescId) {
		this.prescId = prescId;
	}

	/**
	 * @return the lastName
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * @param lastName the lastName to set
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * @return the conName
	 */
	public String getConName() {
		return conName;
	}

	/**
	 * @param conName the conName to set
	 */
	public void setConName(String conName) {
		this.conName = conName;
	}

	/**
	 * @return the consName
	 */
	public String getConsName() {
		return consName;
	}

	/**
	 * @param consName the consName to set
	 */
	public void setConsName(String consName) {
		this.consName = consName;
	}

	/**
	 * @return the picNames
	 */
	public String getPicNames() {
		return picNames;
	}

	/**
	 * @param picNames the picNames to set
	 */
	public void setPicNames(String picNames) {
		this.picNames = picNames;
	}

	/**
	 * @return the vType
	 */
	public String getvType() {
		return vType;
	}

	/**
	 * @param vType the vType to set
	 */
	public void setvType(String vType) {
		this.vType = vType;
	}

	/**
	 * @return the appDate
	 */
	public String getAppDate() {
		return appDate;
	}

	/**
	 * @param appDate the appDate to set
	 */
	public void setAppDate(String appDate) {
		this.appDate = appDate;
	}

	/**
	 * @return the vsType
	 */
	public String getVsType() {
		return vsType;
	}

	/**
	 * @param vsType the vsType to set
	 */
	public void setVsType(String vsType) {
		this.vsType = vsType;
	}

	/**
	 * @return the apDate
	 */
	public String getApDate() {
		return apDate;
	}

	/**
	 * @param apDate the apDate to set
	 */
	public void setApDate(String apDate) {
		this.apDate = apDate;
	}

	/**
	 * @return the patDetails
	 */
	public String getPatDetails() {
		return patDetails;
	}

	/**
	 * @param patDetails the patDetails to set
	 */
	public void setPatDetails(String patDetails) {
		this.patDetails = patDetails;
	}

	/**
	 * @return the pntId
	 */
	public Integer getPntId() {
		return pntId;
	}

	/**
	 * @param pntId the pntId to set
	 */
	public void setPntId(Integer pntId) {
		this.pntId = pntId;
	}

	/**
	 * @return the pntName
	 */
	public String getPntName() {
		return pntName;
	}

	/**
	 * @param pntName the pntName to set
	 */
	public void setPntName(String pntName) {
		this.pntName = pntName;
	}

	/**
	 * @return the patName
	 */
	public String getPatName() {
		return patName;
	}

	/**
	 * @param patName the patName to set
	 */
	public void setPatName(String patName) {
		this.patName = patName;
	}

	/**
	 * @return the pntCode
	 */
	public String getPntCode() {
		return pntCode;
	}

	/**
	 * @param pntCode the pntCode to set
	 */
	public void setPntCode(String pntCode) {
		this.pntCode = pntCode;
	}

	/**
	 * @return the userRole
	 */
	public String getUserRole() {
		return userRole;
	}

	/**
	 * @param userRole the userRole to set
	 */
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	/**
	 * @return the patIpId
	 */
	public String getPatIpId() {
		return patIpId;
	}

	/**
	 * @param patIpId the patIpId to set
	 */
	public void setPatIpId(String patIpId) {
		this.patIpId = patIpId;
	}

	/**
	 * @return the suvRegPatientId
	 */
	public Integer getSuvRegPatientId() {
		return suvRegPatientId;
	}

	/**
	 * @param suvRegPatientId the suvRegPatientId to set
	 */
	public void setSuvRegPatientId(Integer suvRegPatientId) {
		this.suvRegPatientId = suvRegPatientId;
	}

	/**
	 * @return the filsiz
	 */
	public Integer getFilsiz() {
		return filsiz;
	}

	/**
	 * @param filsiz the filsiz to set
	 */
	public void setFilsiz(Integer filsiz) {
		this.filsiz = filsiz;
	}

	public Integer getUserEmpId() {
		return userEmpId;
	}

	public void setUserEmpId(Integer userEmpId) {
		this.userEmpId = userEmpId;
	}

	public String getFromDt() {
		return fromDt;
	}

	public void setFromDt(String fromDt) {
		this.fromDt = fromDt;
	}

	public String getToDt() {
		return toDt;
	}

	public void setToDt(String toDt) {
		this.toDt = toDt;
	}

	/**
	 * @return the prescFileNames
	 */
	public List<MultipartFile> getPrescFileNames() {
		return prescFileNames;
	}

	/**
	 * @param prescFileNames the prescFileNames to set
	 */
	public void setPrescFileNames(List<MultipartFile> prescFileNames) {
		this.prescFileNames = prescFileNames;
	}

	/**
	 * @return the attachmentPicNameMobile
	 */
	public String getAttachmentPicNameMobile() {
		return attachmentPicNameMobile;
	}

	/**
	 * @param attachmentPicNameMobile the attachmentPicNameMobile to set
	 */
	public void setAttachmentPicNameMobile(String attachmentPicNameMobile) {
		this.attachmentPicNameMobile = attachmentPicNameMobile;
	}

	public List<MultipartFile> getPatientPics() {
		return patientPics;
	}

	public void setPatientPics(List<MultipartFile> patientPics) {
		this.patientPics = patientPics;
	}

	public List<MultipartFile> getAttendeePics() {
		return attendeePics;
	}

	public void setAttendeePics(List<MultipartFile> attendeePics) {
		this.attendeePics = attendeePics;
	}

	/**
	 * @return the payTypeId
	 */
	public Integer getPayTypeId() {
		return payTypeId;
	}

	/**
	 * @param payTypeId the payTypeId to set
	 */
	public void setPayTypeId(Integer payTypeId) {
		this.payTypeId = payTypeId;
	}

	/**
	 * @return the payTypeName
	 */
	public String getPayTypeName() {
		return payTypeName;
	}

	/**
	 * @param payTypeName the payTypeName to set
	 */
	public void setPayTypeName(String payTypeName) {
		this.payTypeName = payTypeName;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	/**
	 * @return the visitId
	 */
	public Integer getVisitId() {
		return visitId;
	}

	/**
	 * @param visitId the visitId to set
	 */
	public void setVisitId(Integer visitId) {
		this.visitId = visitId;
	}

	public String getAmtInwords() {
		return amtInwords;
	}

	public void setAmtInwords(String amtInwords) {
		this.amtInwords = amtInwords;
	}

	public String getRoundofAmtReceived() {
		return roundofAmtReceived;
	}

	public void setRoundofAmtReceived(String roundofAmtReceived) {
		this.roundofAmtReceived = roundofAmtReceived;
	}

	public String getRoundofBillAmt() {
		return roundofBillAmt;
	}

	public void setRoundofBillAmt(String roundofBillAmt) {
		this.roundofBillAmt = roundofBillAmt;
	}

	public String getConsAmtInwords() {
		return consAmtInwords;
	}

	public void setConsAmtInwords(String consAmtInwords) {
		this.consAmtInwords = consAmtInwords;
	}

	/**
	 * @return the anyEmiId
	 */
	public Integer getAnyEmiId() {
		return anyEmiId;
	}

	/**
	 * @return the pAYSTAROrderId
	 */
	public String getPAYSTAROrderId() {
		return PAYSTAROrderId;
	}

	/**
	 * @return the paymentmode
	 */
	public String getPaymentmode() {
		return paymentmode;
	}

	/**
	 * @return the bankid
	 */
	public String getBankid() {
		return bankid;
	}

	/**
	 * @return the dateTime
	 */
	public String getDateTime() {
		return DateTime;
	}

	/**
	 * @return the orderId
	 */
	public String getOrderId() {
		return orderId;
	}

	/**
	 * @return the paymentrefernceid
	 */
	public String getPaymentrefernceid() {
		return paymentrefernceid;
	}

	/**
	 * @param anyEmiId the anyEmiId to set
	 */
	public void setAnyEmiId(Integer anyEmiId) {
		this.anyEmiId = anyEmiId;
	}

	/**
	 * @param pAYSTAROrderId the pAYSTAROrderId to set
	 */
	public void setPAYSTAROrderId(String pAYSTAROrderId) {
		PAYSTAROrderId = pAYSTAROrderId;
	}

	/**
	 * @param paymentmode the paymentmode to set
	 */
	public void setPaymentmode(String paymentmode) {
		this.paymentmode = paymentmode;
	}

	/**
	 * @param bankid the bankid to set
	 */
	public void setBankid(String bankid) {
		this.bankid = bankid;
	}

	/**
	 * @param dateTime the dateTime to set
	 */
	public void setDateTime(String dateTime) {
		DateTime = dateTime;
	}

	/**
	 * @param orderId the orderId to set
	 */
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	/**
	 * @param paymentrefernceid the paymentrefernceid to set
	 */
	public void setPaymentrefernceid(String paymentrefernceid) {
		this.paymentrefernceid = paymentrefernceid;
	}

	public String getRefundId() {
		return refundId;
	}

	public void setRefundId(String refundId) {
		this.refundId = refundId;
	}

	public String getRefID() {
		return refID;
	}

	public void setRefID(String refID) {
		this.refID = refID;
	}

	public String getStatus_msg() {
		return status_msg;
	}

	public void setStatus_msg(String status_msg) {
		this.status_msg = status_msg;
	}

	public String getRef_amount() {
		return ref_amount;
	}

	public void setRef_amount(String ref_amount) {
		this.ref_amount = ref_amount;
	}

	public String getTxnId() {
		return txnId;
	}

	public void setTxnId(String txnId) {
		this.txnId = txnId;
	}

	public int getVitalStatus() {
		return vitalStatus;
	}

	public void setVitalStatus(int vitalStatus) {
		this.vitalStatus = vitalStatus;
	}

	/**
	 * @return the docNameNew
	 */
	public String getDocNameNew() {
		return docNameNew;
	}

	/**
	 * @param docNameNew the docNameNew to set
	 */
	public void setDocNameNew(String docNameNew) {
		this.docNameNew = docNameNew;
	}

	/**
	 * @return the deliverDtNew
	 */
	public String getDeliverDtNew() {
		return deliverDtNew;
	}

	/**
	 * @param deliverDtNew the deliverDtNew to set
	 */
	public void setDeliverDtNew(String deliverDtNew) {
		this.deliverDtNew = deliverDtNew;
	}

	/**
	 * @return the docTypeNew
	 */
	public String getDocTypeNew() {
		return docTypeNew;
	}

	/**
	 * @param docTypeNew the docTypeNew to set
	 */
	public void setDocTypeNew(String docTypeNew) {
		this.docTypeNew = docTypeNew;
	}

	/**
	 * @return the uploadedByNew
	 */
	public String getUploadedByNew() {
		return uploadedByNew;
	}

	/**
	 * @param uploadedByNew the uploadedByNew to set
	 */
	public void setUploadedByNew(String uploadedByNew) {
		this.uploadedByNew = uploadedByNew;
	}

	/**
	 * @return the docNameNews
	 */
	public String[] getDocNameNews() {
		return docNameNews;
	}

	/**
	 * @param docNameNews the docNameNews to set
	 */
	public void setDocNameNews(String[] docNameNews) {
		this.docNameNews = docNameNews;
	}

	/**
	 * @return the deliverDtNews
	 */
	public String[] getDeliverDtNews() {
		return deliverDtNews;
	}

	/**
	 * @param deliverDtNews the deliverDtNews to set
	 */
	public void setDeliverDtNews(String[] deliverDtNews) {
		this.deliverDtNews = deliverDtNews;
	}

	/**
	 * @return the docTypeNews
	 */
	public String[] getDocTypeNews() {
		return docTypeNews;
	}

	/**
	 * @param docTypeNews the docTypeNews to set
	 */
	public void setDocTypeNews(String[] docTypeNews) {
		this.docTypeNews = docTypeNews;
	}

	/**
	 * @return the uploadedByNews
	 */
	public String[] getUploadedByNews() {
		return uploadedByNews;
	}

	/**
	 * @param uploadedByNews the uploadedByNews to set
	 */
	public void setUploadedByNews(String[] uploadedByNews) {
		this.uploadedByNews = uploadedByNews;
	}

	/**
	 * @return the docTypeId
	 */
	public String getDocTypeId() {
		return docTypeId;
	}

	/**
	 * @param docTypeId the docTypeId to set
	 */
	public void setDocTypeId(String docTypeId) {
		this.docTypeId = docTypeId;
	}

	/**
	 * @return the user
	 */
	public String getUser() {
		return user;
	}

	/**
	 * @param user the user to set
	 */
	public void setUser(String user) {
		this.user = user;
	}

	/**
	 * @return the docCode
	 */
	public String getDocCode() {
		return docCode;
	}

	/**
	 * @param docCode the docCode to set
	 */
	public void setDocCode(String docCode) {
		this.docCode = docCode;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getFileStatus() {
		return fileStatus;
	}

	public void setFileStatus(int fileStatus) {
		this.fileStatus = fileStatus;
	}

	/**
	 * @return the allergyCode
	 */
	public String getAllergyCode() {
		return allergyCode;
	}

	/**
	 * @param allergyCode the allergyCode to set
	 */
	public void setAllergyCode(String allergyCode) {
		this.allergyCode = allergyCode;
	}

	/**
	 * @return the allergyName
	 */
	public String getAllergyName() {
		return allergyName;
	}

	/**
	 * @param allergyName the allergyName to set
	 */
	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}

	/**
	 * @return the allergyType
	 */
	public String getAllergyType() {
		return allergyType;
	}

	/**
	 * @param allergyType the allergyType to set
	 */
	public void setAllergyType(String allergyType) {
		this.allergyType = allergyType;
	}

	/**
	 * @return the allergyTypeId
	 */
	public Integer getAllergyTypeId() {
		return allergyTypeId;
	}

	/**
	 * @param allergyTypeId the allergyTypeId to set
	 */
	public void setAllergyTypeId(Integer allergyTypeId) {
		this.allergyTypeId = allergyTypeId;
	}

	/**
	 * @return the allergyNote
	 */
	public String getAllergyNote() {
		return allergyNote;
	}

	/**
	 * @param allergyNote the allergyNote to set
	 */
	public void setAllergyNote(String allergyNote) {
		this.allergyNote = allergyNote;
	}

	/**
	 * @return the allergyReaction
	 */
	public String getAllergyReaction() {
		return allergyReaction;
	}

	/**
	 * @param allergyReaction the allergyReaction to set
	 */
	public void setAllergyReaction(String allergyReaction) {
		this.allergyReaction = allergyReaction;
	}

	/**
	 * @return the allergyReactionId
	 */
	public String getAllergyReactionId() {
		return allergyReactionId;
	}

	/**
	 * @param allergyReactionId the allergyReactionId to set
	 */
	public void setAllergyReactionId(String allergyReactionId) {
		this.allergyReactionId = allergyReactionId;
	}

	/**
	 * @return the allergyId
	 */
	public String getAllergyId() {
		return allergyId;
	}

	/**
	 * @param allergyId the allergyId to set
	 */
	public void setAllergyId(String allergyId) {
		this.allergyId = allergyId;
	}

	/**
	 * @return the allergyIds
	 */
	public String[] getAllergyIds() {
		return allergyIds;
	}

	/**
	 * @param allergyIds the allergyIds to set
	 */
	public void setAllergyIds(String[] allergyIds) {
		this.allergyIds = allergyIds;
	}

	/**
	 * @return the allergyReactions
	 */
	public String[] getAllergyReactions() {
		return allergyReactions;
	}

	/**
	 * @param allergyReactions the allergyReactions to set
	 */
	public void setAllergyReactions(String[] allergyReactions) {
		this.allergyReactions = allergyReactions;
	}

	/**
	 * @return the allergyTypes
	 */
	public String[] getAllergyTypes() {
		return allergyTypes;
	}

	/**
	 * @param allergyTypes the allergyTypes to set
	 */
	public void setAllergyTypes(String[] allergyTypes) {
		this.allergyTypes = allergyTypes;
	}

	/**
	 * @return the allergyNotes
	 */
	public String[] getAllergyNotes() {
		return allergyNotes;
	}

	/**
	 * @param allergyNotes the allergyNotes to set
	 */
	public void setAllergyNotes(String[] allergyNotes) {
		this.allergyNotes = allergyNotes;
	}

	/**
	 * @return the allergyNames
	 */
	public String[] getAllergyNames() {
		return allergyNames;
	}

	/**
	 * @param allergyNames the allergyNames to set
	 */
	public void setAllergyNames(String[] allergyNames) {
		this.allergyNames = allergyNames;
	}

	/**
	 * @return the allergyTypeIds
	 */
	public Integer[] getAllergyTypeIds() {
		return allergyTypeIds;
	}

	/**
	 * @param allergyTypeIds the allergyTypeIds to set
	 */
	public void setAllergyTypeIds(Integer[] allergyTypeIds) {
		this.allergyTypeIds = allergyTypeIds;
	}

	/**
	 * @return the stdCodeId
	 */
	public Integer getStdCodeId() {
		return stdCodeId;
	}

	/**
	 * @param stdCodeId the stdCodeId to set
	 */
	public void setStdCodeId(Integer stdCodeId) {
		this.stdCodeId = stdCodeId;
	}

	/**
	 * @return the stdCodeValId
	 */
	public Integer getStdCodeValId() {
		return stdCodeValId;
	}

	/**
	 * @param stdCodeValId the stdCodeValId to set
	 */
	public void setStdCodeValId(Integer stdCodeValId) {
		this.stdCodeValId = stdCodeValId;
	}

	/**
	 * @return the stdCodeValueName
	 */
	public String getStdCodeValueName() {
		return stdCodeValueName;
	}

	/**
	 * @param stdCodeValueName the stdCodeValueName to set
	 */
	public void setStdCodeValueName(String stdCodeValueName) {
		this.stdCodeValueName = stdCodeValueName;
	}

	public Integer getMenuId() {
		return menuId;
	}

	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getItemAvilStatus() {
		return itemAvilStatus;
	}

	public void setItemAvilStatus(String itemAvilStatus) {
		this.itemAvilStatus = itemAvilStatus;
	}

	public String getCounter() {
		return counter;
	}

	public void setCounter(String counter) {
		this.counter = counter;
	}

	public String getIdlycount() {
		return idlycount;
	}

	public void setIdlycount(String idlycount) {
		this.idlycount = idlycount;
	}

	public String getPohacount() {
		return pohacount;
	}

	public void setPohacount(String pohacount) {
		this.pohacount = pohacount;
	}

	public String getPrice1() {
		return price1;
	}

	public void setPrice1(String price1) {
		this.price1 = price1;
	}

	public String getPrice2() {
		return price2;
	}

	public void setPrice2(String price2) {
		this.price2 = price2;
	}

	public String getEmpCodeVal() {
		return empCodeVal;
	}

	public void setEmpCodeVal(String empCodeVal) {
		this.empCodeVal = empCodeVal;
	}

	public String getEmpDate() {
		return empDate;
	}

	public void setEmpDate(String empDate) {
		this.empDate = empDate;
	}

	public String getEmpDept() {
		return empDept;
	}

	public void setEmpDept(String empDept) {
		this.empDept = empDept;
	}

	public String getEmpQual() {
		return empQual;
	}

	public void setEmpQual(String empQual) {
		this.empQual = empQual;
	}

	public String getEmpMob() {
		return empMob;
	}

	public void setEmpMob(String empMob) {
		this.empMob = empMob;
	}

	public String getEmpEmail() {
		return empEmail;
	}

	public void setEmpEmail(String empEmail) {
		this.empEmail = empEmail;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getBedNum() {
		return bedNum;
	}

	public void setBedNum(String bedNum) {
		this.bedNum = bedNum;
	}

	public String getPrice3() {
		return price3;
	}

	public void setPrice3(String price3) {
		this.price3 = price3;
	}

	public String getPrice4() {
		return price4;
	}

	public void setPrice4(String price4) {
		this.price4 = price4;
	}

	public String getPrice5() {
		return price5;
	}

	public void setPrice5(String price5) {
		this.price5 = price5;
	}

	public String getPrice6() {
		return price6;
	}

	public void setPrice6(String price6) {
		this.price6 = price6;
	}

	public String getPrice7() {
		return price7;
	}

	public void setPrice7(String price7) {
		this.price7 = price7;
	}

	public String getPrice8() {
		return price8;
	}

	public void setPrice8(String price8) {
		this.price8 = price8;
	}

	public String getPrice9() {
		return price9;
	}

	public void setPrice9(String price9) {
		this.price9 = price9;
	}

	public String getPrice10() {
		return price10;
	}

	public void setPrice10(String price10) {
		this.price10 = price10;
	}

	public String getPrice11() {
		return price11;
	}

	public void setPrice11(String price11) {
		this.price11 = price11;
	}

	public String getPrice12() {
		return price12;
	}

	public void setPrice12(String price12) {
		this.price12 = price12;
	}

	public String getPrice13() {
		return price13;
	}

	public void setPrice13(String price13) {
		this.price13 = price13;
	}

	public String getPrice14() {
		return price14;
	}

	public void setPrice14(String price14) {
		this.price14 = price14;
	}

	public String getPrice15() {
		return price15;
	}

	public void setPrice15(String price15) {
		this.price15 = price15;
	}

	public String getPrice16() {
		return price16;
	}

	public void setPrice16(String price16) {
		this.price16 = price16;
	}

	public String getPrice17() {
		return price17;
	}

	public void setPrice17(String price17) {
		this.price17 = price17;
	}

	public String getPrice18() {
		return price18;
	}

	public void setPrice18(String price18) {
		this.price18 = price18;
	}

	public String getPrice19() {
		return price19;
	}

	public void setPrice19(String price19) {
		this.price19 = price19;
	}

	public String getPrice20() {
		return price20;
	}

	public void setPrice20(String price20) {
		this.price20 = price20;
	}

	public String getPrice21() {
		return price21;
	}

	public void setPrice21(String price21) {
		this.price21 = price21;
	}

	public String getPrice22() {
		return price22;
	}

	public void setPrice22(String price22) {
		this.price22 = price22;
	}

	public String getOmletcount() {
		return omletcount;
	}

	public void setOmletcount(String omletcount) {
		this.omletcount = omletcount;
	}

	public String getButMilkcount() {
		return butMilkcount;
	}

	public void setButMilkcount(String butMilkcount) {
		this.butMilkcount = butMilkcount;
	}

	public String getDummcount() {
		return dummcount;
	}

	public void setDummcount(String dummcount) {
		this.dummcount = dummcount;
	}

	public String getFrycount() {
		return frycount;
	}

	public void setFrycount(String frycount) {
		this.frycount = frycount;
	}

	public String getCofeecount() {
		return cofeecount;
	}

	public void setCofeecount(String cofeecount) {
		this.cofeecount = cofeecount;
	}

	public String getDosacount() {
		return dosacount;
	}

	public void setDosacount(String dosacount) {
		this.dosacount = dosacount;
	}

	public String getFruitcount() {
		return fruitcount;
	}

	public void setFruitcount(String fruitcount) {
		this.fruitcount = fruitcount;
	}

	public String getKaboolcount() {
		return kaboolcount;
	}

	public void setKaboolcount(String kaboolcount) {
		this.kaboolcount = kaboolcount;
	}

	public String getKommucount() {
		return kommucount;
	}

	public void setKommucount(String kommucount) {
		this.kommucount = kommucount;
	}

	public String getLemoncount() {
		return lemoncount;
	}

	public void setLemoncount(String lemoncount) {
		this.lemoncount = lemoncount;
	}

	public String getMealscount() {
		return mealscount;
	}

	public void setMealscount(String mealscount) {
		this.mealscount = mealscount;
	}

	public String getMealsEggcount() {
		return mealsEggcount;
	}

	public void setMealsEggcount(String mealsEggcount) {
		this.mealsEggcount = mealsEggcount;
	}

	public String getMilkcount() {
		return milkcount;
	}

	public void setMilkcount(String milkcount) {
		this.milkcount = milkcount;
	}

	public String getMillDosacount() {
		return millDosacount;
	}

	public void setMillDosacount(String millDosacount) {
		this.millDosacount = millDosacount;
	}

	public String getPongalcount() {
		return pongalcount;
	}

	public void setPongalcount(String pongalcount) {
		this.pongalcount = pongalcount;
	}

	public String getPulkacount() {
		return pulkacount;
	}

	public void setPulkacount(String pulkacount) {
		this.pulkacount = pulkacount;
	}

	public String getSweetcount() {
		return sweetcount;
	}

	public void setSweetcount(String sweetcount) {
		this.sweetcount = sweetcount;
	}

	public String getTeacount() {
		return teacount;
	}

	public void setTeacount(String teacount) {
		this.teacount = teacount;
	}

	public String getTomotocount() {
		return tomotocount;
	}

	public void setTomotocount(String tomotocount) {
		this.tomotocount = tomotocount;
	}

	public String getUpmacount() {
		return upmacount;
	}

	public void setUpmacount(String upmacount) {
		this.upmacount = upmacount;
	}

	

	public String getMillIdlycount() {
		return millIdlycount;
	}

	public void setMillIdlycount(String millIdlycount) {
		this.millIdlycount = millIdlycount;
	}

	public String getGrandTot() {
		return grandTot;
	}

	public void setGrandTot(String grandTot) {
		this.grandTot = grandTot;
	}

	public String getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(String grandTotal) {
		this.grandTotal = grandTotal;
	}

	public String getSelectDt() {
		return selectDt;
	}

	public void setSelectDt(String selectDt) {
		this.selectDt = selectDt;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getChangeStatus() {
		return changeStatus;
	}

	public void setChangeStatus(String changeStatus) {
		this.changeStatus = changeStatus;
	}

	public Integer getChangeId() {
		return changeId;
	}

	public void setChangeId(Integer changeId) {
		this.changeId = changeId;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getIncompChange() {
		return incompChange;
	}

	public void setIncompChange(String incompChange) {
		this.incompChange = incompChange;
	}

	public String getNewFunctionality() {
		return newFunctionality;
	}

	public void setNewFunctionality(String newFunctionality) {
		this.newFunctionality = newFunctionality;
	}

	public String getBugFixed() {
		return bugFixed;
	}

	public void setBugFixed(String bugFixed) {
		this.bugFixed = bugFixed;
	}

	public String getChangeDesc() {
		return changeDesc;
	}

	public void setChangeDesc(String changeDesc) {
		this.changeDesc = changeDesc;
	}

	public String getCommitDate() {
		return commitDate;
	}

	public void setCommitDate(String commitDate) {
		this.commitDate = commitDate;
	}

	public Integer getFileLength() {
		return fileLength;
	}

	public void setFileLength(Integer fileLength) {
		this.fileLength = fileLength;
	}

	public String[] getVersions() {
		return versions;
	}

	public void setVersions(String[] versions) {
		this.versions = versions;
	}

	public String[] getIncompChanges() {
		return incompChanges;
	}

	public void setIncompChanges(String[] incompChanges) {
		this.incompChanges = incompChanges;
	}

	public String[] getNewFunctionalitys() {
		return newFunctionalitys;
	}

	public void setNewFunctionalitys(String[] newFunctionalitys) {
		this.newFunctionalitys = newFunctionalitys;
	}

	public String[] getBugFixeds() {
		return bugFixeds;
	}

	public void setBugFixeds(String[] bugFixeds) {
		this.bugFixeds = bugFixeds;
	}

	public String[] getChangeDescs() {
		return changeDescs;
	}

	public void setChangeDescs(String[] changeDescs) {
		this.changeDescs = changeDescs;
	}

	public String[] getCommitDates() {
		return commitDates;
	}

	public void setCommitDates(String[] commitDates) {
		this.commitDates = commitDates;
	}

	/**
	 * @return the patCatNameId
	 */
	public String getPatCatNameId() {
		return patCatNameId;
	}

	/**
	 * @param patCatNameId the patCatNameId to set
	 */
	public void setPatCatNameId(String patCatNameId) {
		this.patCatNameId = patCatNameId;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getEmpRegNo() {
		return empRegNo;
	}

	public void setEmpRegNo(String empRegNo) {
		this.empRegNo = empRegNo;
	}

	public String getBarcodeNumber() {
		return barcodeNumber;
	}

	public void setBarcodeNumber(String barcodeNumber) {
		this.barcodeNumber = barcodeNumber;
	}

	public String getFinalDiagnosis() {
		return finalDiagnosis;
	}

	public void setFinalDiagnosis(String finalDiagnosis) {
		this.finalDiagnosis = finalDiagnosis;
	}

	public String getDiagnosis() {
		return diagnosis;
	}

	public void setDiagnosis(String diagnosis) {
		this.diagnosis = diagnosis;
	}

	public String getUmrNoNew() {
		return umrNoNew;
	}

	public void setUmrNoNew(String umrNoNew) {
		this.umrNoNew = umrNoNew;
	}

	public String getBillPayAmount() {
		return billPayAmount;
	}

	public void setBillPayAmount(String billPayAmount) {
		this.billPayAmount = billPayAmount;
	}

	public String getReferNumber() {
		return referNumber;
	}

	public void setReferNumber(String referNumber) {
		this.referNumber = referNumber;
	}

	/**
	 * @return the apptId
	 */
	

	/**
	 * @return the locationId
	 */
	public String getLocationId() {
		return locationId;
	}

	/**
	 * @param locationId the locationId to set
	 */
	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}

	/**
	 * @return the vitalIds
	 */
	public String[] getVitalIds() {
		return vitalIds;
	}

	/**
	 * @param vitalIds the vitalIds to set
	 */
	public void setVitalIds(String[] vitalIds) {
		this.vitalIds = vitalIds;
	}

	/**
	 * @return the vitalValues
	 */
	public String[] getVitalValues() {
		return vitalValues;
	}

	/**
	 * @param vitalValues the vitalValues to set
	 */
	public void setVitalValues(String[] vitalValues) {
		this.vitalValues = vitalValues;
	}

	/**
	 * @return the visitVitals
	 */
	public String[] getVisitVitals() {
		return visitVitals;
	}

	/**
	 * @param visitVitals the visitVitals to set
	 */
	public void setVisitVitals(String[] visitVitals) {
		this.visitVitals = visitVitals;
	}

	/**
	 * @return the pulse
	 */
	public String getPulse() {
		return pulse;
	}

	/**
	 * @param pulse the pulse to set
	 */
	public void setPulse(String pulse) {
		this.pulse = pulse;
	}

	/**
	 * @return the nutritionalStatuss
	 */
	public String getNutritionalStatuss() {
		return NutritionalStatuss;
	}

	/**
	 * @param nutritionalStatuss the nutritionalStatuss to set
	 */
	public void setNutritionalStatuss(String nutritionalStatuss) {
		NutritionalStatuss = nutritionalStatuss;
	}

	/**
	 * @return the temp
	 */
	public String getTemp() {
		return Temp;
	}

	/**
	 * @param temp the temp to set
	 */
	public void setTemp(String temp) {
		Temp = temp;
	}

	/**
	 * @return the weight
	 */
	public String getWeight() {
		return weight;
	}

	/**
	 * @param weight the weight to set
	 */
	public void setWeight(String weight) {
		this.weight = weight;
	}

	/**
	 * @return the bp
	 */
	public String getBp() {
		return bp;
	}

	/**
	 * @param bp the bp to set
	 */
	public void setBp(String bp) {
		this.bp = bp;
	}

	public String getApptId() {
		return apptId;
	}

	public void setApptId(String apptId) {
		this.apptId = apptId;
	}

	/**
	 * @return the orgAddress
	 */
	public String getOrgAddress() {
		return orgAddress;
	}

	/**
	 * @param orgAddress the orgAddress to set
	 */
	public void setOrgAddress(String orgAddress) {
		this.orgAddress = orgAddress;
	}

	/**
	 * @return the printDt
	 */
	public String getPrintDt() {
		return printDt;
	}

	/**
	 * @param printDt the printDt to set
	 */
	public void setPrintDt(String printDt) {
		this.printDt = printDt;
	}

	public String getOrgNameOne() {
		return OrgNameOne;
	}

	public void setOrgNameOne(String orgNameOne) {
		OrgNameOne = orgNameOne;
	}

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	/**
	 * @return the packageId
	 */
	public String getPackageId() {
		return packageId;
	}

	/**
	 * @param packageId the packageId to set
	 */
	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}

	/**
	 * @return the serviceGroup
	 */
	public String getServiceGroup() {
		return serviceGroup;
	}

	/**
	 * @param serviceGroup the serviceGroup to set
	 */
	public void setServiceGroup(String serviceGroup) {
		this.serviceGroup = serviceGroup;
	}

	/**
	 * @return the labPaidAmt
	 */
	public String getLabPaidAmt() {
		return labPaidAmt;
	}

	/**
	 * @param labPaidAmt the labPaidAmt to set
	 */
	public void setLabPaidAmt(String labPaidAmt) {
		this.labPaidAmt = labPaidAmt;
	}

	/**
	 * @return the labBalAmt
	 */
	public String getLabBalAmt() {
		return labBalAmt;
	}

	/**
	 * @param labBalAmt the labBalAmt to set
	 */
	public void setLabBalAmt(String labBalAmt) {
		this.labBalAmt = labBalAmt;
	}

	/**
	 * @return the transactionNumber
	 */
	public String getTransactionNumber() {
		return transactionNumber;
	}

	/**
	 * @param transactionNumber the transactionNumber to set
	 */
	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	/**
	 * @return the discountReason
	 */
	public String getDiscountReason() {
		return discountReason;
	}

	/**
	 * @param discountReason the discountReason to set
	 */
	public void setDiscountReason(String discountReason) {
		this.discountReason = discountReason;
	}

	/**
	 * @return the billDt
	 */
	public String getBillDt() {
		return billDt;
	}

	/**
	 * @param billDt the billDt to set
	 */
	public void setBillDt(String billDt) {
		this.billDt = billDt;
	}

	/**
	 * @return the patId
	 */
	public String getPatId() {
		return patId;
	}

	/**
	 * @param patId the patId to set
	 */
	public void setPatId(String patId) {
		this.patId = patId;
	}

	/**
	 * @return the doctorName
	 */
	public String getDoctorName() {
		return doctorName;
	}

	/**
	 * @param doctorName the doctorName to set
	 */
	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	/**
	 * @return the serviceGroupName
	 */
	public String getServiceGroupName() {
		return serviceGroupName;
	}

	/**
	 * @param serviceGroupName the serviceGroupName to set
	 */
	public void setServiceGroupName(String serviceGroupName) {
		this.serviceGroupName = serviceGroupName;
	}

	/**
	 * @return the serviceGroupId
	 */
	public int getServiceGroupId() {
		return serviceGroupId;
	}

	/**
	 * @param serviceGroupId the serviceGroupId to set
	 */
	public void setServiceGroupId(int serviceGroupId) {
		this.serviceGroupId = serviceGroupId;
	}

	/**
	 * @return the serviceGroupCode
	 */
	public String getServiceGroupCode() {
		return serviceGroupCode;
	}

	/**
	 * @param serviceGroupCode the serviceGroupCode to set
	 */
	public void setServiceGroupCode(String serviceGroupCode) {
		this.serviceGroupCode = serviceGroupCode;
	}

	/**
	 * @return the headParameter
	 */
	public String getHeadParameter() {
		return headParameter;
	}

	/**
	 * @param headParameter the headParameter to set
	 */
	public void setHeadParameter(String headParameter) {
		this.headParameter = headParameter;
	}

	/**
	 * @return the headResultVal
	 */
	public String getHeadResultVal() {
		return headResultVal;
	}

	/**
	 * @param headResultVal the headResultVal to set
	 */
	public void setHeadResultVal(String headResultVal) {
		this.headResultVal = headResultVal;
	}

	/**
	 * @return the headNormalVal
	 */
	public String getHeadNormalVal() {
		return headNormalVal;
	}

	/**
	 * @param headNormalVal the headNormalVal to set
	 */
	public void setHeadNormalVal(String headNormalVal) {
		this.headNormalVal = headNormalVal;
	}

	/**
	 * @return the headMethod
	 */
	public String getHeadMethod() {
		return headMethod;
	}

	/**
	 * @param headMethod the headMethod to set
	 */
	public void setHeadMethod(String headMethod) {
		this.headMethod = headMethod;
	}

	/**
	 * @return the headUom
	 */
	public String getHeadUom() {
		return headUom;
	}

	/**
	 * @param headUom the headUom to set
	 */
	public void setHeadUom(String headUom) {
		this.headUom = headUom;
	}

	/**
	 * @return the noteOne
	 */
	public String getNoteOne() {
		return noteOne;
	}

	/**
	 * @param noteOne the noteOne to set
	 */
	public void setNoteOne(String noteOne) {
		this.noteOne = noteOne;
	}

	/**
	 * @return the noteTwo
	 */
	public String getNoteTwo() {
		return noteTwo;
	}

	/**
	 * @param noteTwo the noteTwo to set
	 */
	public void setNoteTwo(String noteTwo) {
		this.noteTwo = noteTwo;
	}

	/**
	 * @return the noteThree
	 */
	public String getNoteThree() {
		return noteThree;
	}

	/**
	 * @param noteThree the noteThree to set
	 */
	public void setNoteThree(String noteThree) {
		this.noteThree = noteThree;
	}

	/**
	 * @return the serviceCode
	 */
	public String getServiceCode() {
		return serviceCode;
	}

	/**
	 * @param serviceCode the serviceCode to set
	 */
	public void setServiceCode(String serviceCode) {
		this.serviceCode = serviceCode;
	}

	/**
	 * @return the investigationId
	 */
	public int getInvestigationId() {
		return investigationId;
	}

	/**
	 * @param investigationId the investigationId to set
	 */
	public void setInvestigationId(int investigationId) {
		this.investigationId = investigationId;
	}

	/**
	 * @return the opInvservId
	 */
	public Integer getOpInvservId() {
		return opInvservId;
	}

	/**
	 * @param opInvservId the opInvservId to set
	 */
	public void setOpInvservId(Integer opInvservId) {
		this.opInvservId = opInvservId;
	}

	/**
	 * @return the departId
	 */
	public String getDepartId() {
		return departId;
	}

	/**
	 * @param departId the departId to set
	 */
	public void setDepartId(String departId) {
		this.departId = departId;
	}

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	/**
	 * @return the tarrifId
	 */
	public String getTarrifId() {
		return tarrifId;
	}

	/**
	 * @param tarrifId the tarrifId to set
	 */
	public void setTarrifId(String tarrifId) {
		this.tarrifId = tarrifId;
	}

	/**
	 * @return the tarrifName
	 */
	public String getTarrifName() {
		return tarrifName;
	}

	/**
	 * @param tarrifName the tarrifName to set
	 */
	public void setTarrifName(String tarrifName) {
		this.tarrifName = tarrifName;
	}

	/**
	 * @return the billIdAppt
	 */
	public Integer getBillIdAppt() {
		return billIdAppt;
	}

	/**
	 * @param billIdAppt the billIdAppt to set
	 */
	public void setBillIdAppt(Integer billIdAppt) {
		this.billIdAppt = billIdAppt;
	}

	/**
	 * @return the apptIdAppt
	 */
	public Integer getApptIdAppt() {
		return apptIdAppt;
	}

	/**
	 * @param apptIdAppt the apptIdAppt to set
	 */
	public void setApptIdAppt(Integer apptIdAppt) {
		this.apptIdAppt = apptIdAppt;
	}

	public String[] getPatientTypes() {
		return patientTypes;
	}

	public void setPatientTypes(String[] patientTypes) {
		this.patientTypes = patientTypes;
	}

	public String getPatientType() {
		return patientType;
	}

	public void setPatientType(String patientType) {
		this.patientType = patientType;
	}

	public String getTariffName() {
		return tariffName;
	}

	public void setTariffName(String tariffName) {
		this.tariffName = tariffName;
	}

	public String getTariffId() {
		return tariffId;
	}

	public void setTariffId(String tariffId) {
		this.tariffId = tariffId;
	}

	public String getNewOsideOrgId() {
		return newOsideOrgId;
	}

	public void setNewOsideOrgId(String newOsideOrgId) {
		this.newOsideOrgId = newOsideOrgId;
	}

	public String getTarrifType() {
		return tarrifType;
	}

	public void setTarrifType(String tarrifType) {
		this.tarrifType = tarrifType;
	}

	public String getTotAmt() {
		return totAmt;
	}

	public void setTotAmt(String totAmt) {
		this.totAmt = totAmt;
	}

	public String getTotDiscount() {
		return totDiscount;
	}

	public void setTotDiscount(String totDiscount) {
		this.totDiscount = totDiscount;
	}

	public String getReConAmount() {
		return reConAmount;
	}

	public void setReConAmount(String reConAmount) {
		this.reConAmount = reConAmount;
	}

	public String getDisPercentge() {
		return disPercentge;
	}

	public void setDisPercentge(String disPercentge) {
		this.disPercentge = disPercentge;
	}

	public String getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(String discountAmount) {
		this.discountAmount = discountAmount;
	}

	public String getRegFinalAmnt() {
		return regFinalAmnt;
	}

	public void setRegFinalAmnt(String regFinalAmnt) {
		this.regFinalAmnt = regFinalAmnt;
	}

	public String getConsFee() {
		return consFee;
	}

	public void setConsFee(String consFee) {
		this.consFee = consFee;
	}

	public String getRegFee() {
		return regFee;
	}

	public void setRegFee(String regFee) {
		this.regFee = regFee;
	}

	public String getRegDisAmnt() {
		return regDisAmnt;
	}

	public void setRegDisAmnt(String regDisAmnt) {
		this.regDisAmnt = regDisAmnt;
	}

	public String getRegDisPer() {
		return regDisPer;
	}

	public void setRegDisPer(String regDisPer) {
		this.regDisPer = regDisPer;
	}

	public String getConDisAmnt() {
		return conDisAmnt;
	}

	public void setConDisAmnt(String conDisAmnt) {
		this.conDisAmnt = conDisAmnt;
	}

	public String getConDisPer() {
		return conDisPer;
	}

	public void setConDisPer(String conDisPer) {
		this.conDisPer = conDisPer;
	}

	public String getConFinalAmnt() {
		return conFinalAmnt;
	}

	public void setConFinalAmnt(String conFinalAmnt) {
		this.conFinalAmnt = conFinalAmnt;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getTransNum() {
		return transNum;
	}

	public void setTransNum(String transNum) {
		this.transNum = transNum;
	}

	public Integer getBillDetId() {
		return billDetId;
	}

	public void setBillDetId(Integer billDetId) {
		this.billDetId = billDetId;
	}

	public int getBillLogId() {
		return billLogId;
	}

	public void setBillLogId(int billLogId) {
		this.billLogId = billLogId;
	}

	public Integer getCharges() {
		return charges;
	}

	public void setCharges(Integer charges) {
		this.charges = charges;
	}

	public String getLabBillAmt() {
		return labBillAmt;
	}

	public void setLabBillAmt(String labBillAmt) {
		this.labBillAmt = labBillAmt;
	}

	public String getLabTotAmt() {
		return labTotAmt;
	}

	public void setLabTotAmt(String labTotAmt) {
		this.labTotAmt = labTotAmt;
	}

	public String getOpBalAmt() {
		return opBalAmt;
	}

	public void setOpBalAmt(String opBalAmt) {
		this.opBalAmt = opBalAmt;
	}

	public String getRefundAmt() {
		return refundAmt;
	}

	public void setRefundAmt(String refundAmt) {
		this.refundAmt = refundAmt;
	}

	public String getTotDiscountAmt() {
		return totDiscountAmt;
	}

	public void setTotDiscountAmt(String totDiscountAmt) {
		this.totDiscountAmt = totDiscountAmt;
	}

	public String getConValidDt() {
		return conValidDt;
	}

	public void setConValidDt(String conValidDt) {
		this.conValidDt = conValidDt;
	}

	public String getExpiryDt() {
		return expiryDt;
	}

	public void setExpiryDt(String expiryDt) {
		this.expiryDt = expiryDt;
	}

	public String getCheckDt() {
		return checkDt;
	}

	public void setCheckDt(String checkDt) {
		this.checkDt = checkDt;
	}

	public String getChequebankName() {
		return chequebankName;
	}

	public void setChequebankName(String chequebankName) {
		this.chequebankName = chequebankName;
	}

	public String getOutSideOrg() {
		return outSideOrg;
	}

	public void setOutSideOrg(String outSideOrg) {
		this.outSideOrg = outSideOrg;
	}

	public String getPntUpdtStatus() {
		return pntUpdtStatus;
	}

	public void setPntUpdtStatus(String pntUpdtStatus) {
		this.pntUpdtStatus = pntUpdtStatus;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getPatientUmrNo() {
		return PatientUmrNo;
	}

	public void setPatientUmrNo(String patientUmrNo) {
		PatientUmrNo = patientUmrNo;
	}

	public Integer getConsultationOpId() {
		return consultationOpId;
	}

	public void setConsultationOpId(Integer consultationOpId) {
		this.consultationOpId = consultationOpId;
	}

	public Integer getModalPatientId() {
		return modalPatientId;
	}

	public void setModalPatientId(Integer modalPatientId) {
		this.modalPatientId = modalPatientId;
	}

	public String getModalPatMobNo() {
		return modalPatMobNo;
	}

	public void setModalPatMobNo(String modalPatMobNo) {
		this.modalPatMobNo = modalPatMobNo;
	}

	public String getModalPatUmr() {
		return modalPatUmr;
	}

	public void setModalPatUmr(String modalPatUmr) {
		this.modalPatUmr = modalPatUmr;
	}

	public String getModalPatName() {
		return modalPatName;
	}

	public void setModalPatName(String modalPatName) {
		this.modalPatName = modalPatName;
	}

	public String getModalPatGender() {
		return modalPatGender;
	}

	public void setModalPatGender(String modalPatGender) {
		this.modalPatGender = modalPatGender;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public Integer getManualBillId() {
		return manualBillId;
	}

	public void setManualBillId(Integer manualBillId) {
		this.manualBillId = manualBillId;
	}

	public String getVisitInvStat() {
		return visitInvStat;
	}
	/**
	 * @param visitInvStat the visitInvStat to set
	 */
	public void setVisitInvStat(String visitInvStat) {
		this.visitInvStat = visitInvStat;
	}

	public String getInvestigationName() {
		return investigationName;
	}

	public void setInvestigationName(String investigationName) {
		this.investigationName = investigationName;
	}

	public String getMrVisitDrugDet() {
		return mrVisitDrugDet;
	}

	public void setMrVisitDrugDet(String mrVisitDrugDet) {
		this.mrVisitDrugDet = mrVisitDrugDet;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public String getDrugFrequency() {
		return drugFrequency;
	}

	public void setDrugFrequency(String drugFrequency) {
		this.drugFrequency = drugFrequency;
	}

	public String getDrugInTakeTime() {
		return drugInTakeTime;
	}

	public void setDrugInTakeTime(String drugInTakeTime) {
		this.drugInTakeTime = drugInTakeTime;
	}

	public String getDrugNoOfDy() {
		return drugNoOfDy;
	}

	public void setDrugNoOfDy(String drugNoOfDy) {
		this.drugNoOfDy = drugNoOfDy;
	}

	public String getDrugPrescQty() {
		return drugPrescQty;
	}

	public void setDrugPrescQty(String drugPrescQty) {
		this.drugPrescQty = drugPrescQty;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getVisitDate() {
		return visitDate;
	}

	public void setVisitDate(String visitDate) {
		this.visitDate = visitDate;
	}
	public String getDrugFormulation() {
		return drugFormulation;
	}

	public void setDrugFormulation(String drugFormulation) {
		this.drugFormulation = drugFormulation;
	}

	public String getAgeCalc() {
		return ageCalc;
	}

	public void setAgeCalc(String ageCalc) {
		this.ageCalc = ageCalc;
	}
	public String getPatNamee() {
		return patNamee;
	}

	public void setPatNamee(String patNamee) {
		this.patNamee = patNamee;
	}

	public String getUpdtLastName() {
		return updtLastName;
	}

	public void setUpdtLastName(String updtLastName) {
		this.updtLastName = updtLastName;
	}

	public String getUpdtPatientTitle() {
		return updtPatientTitle;
	}

	public void setUpdtPatientTitle(String updtPatientTitle) {
		this.updtPatientTitle = updtPatientTitle;
	}

	public String getCardTypes() {
		return cardTypes;
	}

	public void setCardTypes(String cardTypes) {
		this.cardTypes = cardTypes;
	}
	
	
	public String[] getExpDate() {
		return expDate;
	}

	public void setExpDate(String[] expDate) {
		this.expDate = expDate;
	}

	public String getExpDates() {
		return expDates;
	}

	public void setExpDates(String expDates) {
		this.expDates = expDates;
	}

	public String[] getCardType() {
		return cardType;
	}

	public void setCardType(String[] cardType) {
		this.cardType = cardType;
	}

	public String getTransNumber() {
		return transNumber;
	}

	public void setTransNumber(String transNumber) {
		this.transNumber = transNumber;
	}

	public String getBankNameMn() {
		return bankNameMn;
	}

	public void setBankNameMn(String bankNameMn) {
		this.bankNameMn = bankNameMn;
	}

	public String getCard() {
		return card;
	}

	public void setCardNo(String card) {
		this.card = card;
	}

	public String getUmrSec() {
		return umrSec;
	}

	public void setUmrSec(String umrSec) {
		this.umrSec = umrSec;
	}

	public Integer getIdDoctorVal() {
		return idDoctorVal;
	}

	public void setIdDoctorVal(Integer idDoctorVal) {
		this.idDoctorVal = idDoctorVal;
	}
	
	public String[] getCardBankNames() {
		return cardBankNames;
	}

	public void setCardBankNames(String[] cardBankNames) {
		this.cardBankNames = cardBankNames;
	}

	public String getCardBankName() {
		return cardBankName;
	}

	public void setCardBankName(String cardBankName) {
		this.cardBankName = cardBankName;
	}
	
	public String getCashAmt() {
		return cashAmt;
	}
	public void setCashAmt(String cashAmt) {
		this.cashAmt = cashAmt;
	}
	public String getCreditAmt() {
		return creditAmt;
	}
	public void setCreditAmt(String creditAmt) {
		this.creditAmt = creditAmt;
	}
	public String getUpiAmt() {
		return upiAmt;
	}
	public void setUpiAmt(String upiAmt) {
		this.upiAmt = upiAmt;
	}
	public String getPntNationality() {
		return pntNationality;
	}
	public void setPntNationality(String pntNationality) {
		this.pntNationality = pntNationality;
	}
	public String getRegAmountss() {
		return regAmountss;
	}
	public void setRegAmountss(String regAmountss) {
		this.regAmountss = regAmountss;
	}
	public String getCashAmtTotal() {
		return cashAmtTotal;
	}
	public void setCashAmtTotal(String cashAmtTotal) {
		this.cashAmtTotal = cashAmtTotal;
	}
	public String getRegAmoCash() {
		return regAmoCash;
	}
	public void setRegAmoCash(String regAmoCash) {
		this.regAmoCash = regAmoCash;
	}
	public String getRegAmoUpi() {
		return regAmoUpi;
	}
	public void setRegAmoUpi(String regAmoUpi) {
		this.regAmoUpi = regAmoUpi;
	}	
	public String getRegAmoCard() {
		return regAmoCard;
	}
	public void setRegAmoCard(String regAmoCard) {
		this.regAmoCard = regAmoCard;
	}
	public String getConAmoCash() {
		return conAmoCash;
	}
	public void setConAmoCash(String conAmoCash) {
		this.conAmoCash = conAmoCash;
	}
	public String getConAmoCard() {
		return conAmoCard;
	}
	public void setConAmoCard(String conAmoCard) {
		this.conAmoCard = conAmoCard;
	}
	public String getConAmoUpi() {
		return conAmoUpi;
	}
	public void setConAmoUpi(String conAmoUpi) {
		this.conAmoUpi = conAmoUpi;
	}
	public String getPntCatt() {
		return pntCatt;
	}
	public void setPntCatt(String pntCatt) {
		this.pntCatt = pntCatt;
	}
	public String getCorpRegId() {
		return corpRegId;
	}
	public void setCorpRegId(String corpRegId) {
		this.corpRegId = corpRegId;
	}
	public Integer getReffeId() {
		return reffeId;
	}
	public void setReffeId(Integer reffeId) {
		this.reffeId = reffeId;
	}
	
	private String uomCode;
	public String getUomCode() {
		return uomCode;
	}
	public void setUomCode(String uomCode) {
		this.uomCode = uomCode;
	}
	 private String updateOtherStaffId;
	  
	  
	  public String getUpdateOtherStaffId() {
		return updateOtherStaffId;
	}
	public void setUpdateOtherStaffId(String updateOtherStaffId) {
		this.updateOtherStaffId = updateOtherStaffId;
	}
	public String getBillIddd() {
		return billIddd;
	}
	public void setBillIddd(String billIddd) {
		this.billIddd = billIddd;
	}
	public String getAuthorizedBy() {
		return authorizedBy;
	}
	public void setAuthorizedBy(String authorizedBy) {
		this.authorizedBy = authorizedBy;
	}
	
	
	
}