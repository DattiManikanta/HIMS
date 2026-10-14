package com.atri.hms.patientmanagement.opregistration.model;

/**
 * @author atri
 *
 */
public class PatientQueueModel {

	private String addedBy;
	private Integer patientId;
	private String regAmoCash;
	private String regAmoUpi;
	private String regAmoCard;
	private String conAmoCash;
	private String status;
	private String conAmoCard;
	private String conAmoUpi;
	private Integer apptId;
	private String patientCode;
	private Integer priorityNo;
	private String pname;
	private String locationId;
	private String employeeId;
	private String title;
	private String patientName;
	private String lastName;
	private String gender;
	private String age;
	private String parentName;
	private String mobNum;
	private String statusInfo;
	private String opCode;
	private String patientCategory;
	private String startTime;
	private String statusInfoId;
	private Integer empId;
	private String city;
	private String village;
	private String visitType;
	private String docName;
	private String problem;
	private String tokenNum;
	private String apptDt;
	private String billStatus;
	private Integer locId;
	private String locName;
	private String location;
	private String regFee;
	private String patientCategoryId;
	private String amountReceived;
	private String fromDt;
	private String toDt;
	private int orgId;
	private String orgName;
	private Integer dummyBillId;
	private String patApptId;
	private String cashAmtTotal;
	private String specialization;
	private String refundAmt;
	private String paidAmt;
	private String authorizedBy;
	private String consFee;
	private String consDiscount;
	private String consDiscountAmount;
	private String consAmount;
	private String totAmt;
	private String totDiscount;
	private String totDiscountAmt;
	private String balance;
	private String amtRecd;
	private String billAmt;
	private String disStaffId ;
	private String remarks;



	
	public String getSpecialization() {
		return specialization;
	}
	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}
	
	public Integer getDummyBillId() {
		return dummyBillId;
	}
	public void setDummyBillId(Integer dummyBillId) {
		this.dummyBillId = dummyBillId;
	}
	public String getPatApptId() {
		return patApptId;
	}
	public void setPatApptId(String patApptId) {
		this.patApptId = patApptId;
	}
	private int deptId;
	private String deptName;
	
	private int userId;
	private String billCount; // to get the billids count 
	private String scheduleDt;
	private String bloodGrp;
	private String ageDays;
	private String ageMonths;
	private String state;
	private String addr;
	private String maritalStatus;
	private String religion;
	private String idProofType;
	private String idProofNum;
	private String occupation;
	private String refType;
	private String smsStatus;
	private String smsAlert;
	private String nationality;
	private String dob;
	private String refId;
	private String otherStaffId;
	private String otherHospId;
	private Integer paymentType;
	private String payTypeName;
	private int vitalStatus;
	private int fileStatus;
	private int visitId;
	private String sourceServiceId;
	private String visitTypeId;
	private String ptitle;
	private String lName;
	private String careByName;
	private String careBy;
	private String pntCat;
	private String organizationsId;
	private String staffName;
	private String otherHospName;
	private String otherStaffName;
	//sandhya
	
	private String billId;
	private String outSideOrg;
	private String cashAmt;
	private String creditAmt;
	private String upiAmt;
	
	private String regOpCashAmt;
	private String regOpCreditAmt;
	private String regOpUpiAmt;
	  private String tariffName;
	  private String paidAmount;
		
		public String getPaidAmount() {
			return paidAmount;
		}
		public void setPaidAmount(String paidAmount) {
			this.paidAmount = paidAmount;
		}
	  public String getTariffName() {
	  	return tariffName;
	  }
	  public void setTariffName(String tariffName) {
	  	this.tariffName = tariffName;
	  }
	    
	
	public String getOrganizationsId() {
		return organizationsId;
	}
	public void setOrganizationsId(String organizationsId) {
		this.organizationsId = organizationsId;
	}
	public String getPntCat() {
		return pntCat;
	}
	public void setPntCat(String pntCat) {
		this.pntCat = pntCat;
	}
	public String getCareByName() {
		return careByName;
	}
	public void setCareByName(String careByName) {
		this.careByName = careByName;
	}
	public String getCareBy() {
		return careBy;
	}
	public void setCareBy(String careBy) {
		this.careBy = careBy;
	}
	public String getlName() {
		return lName;
	}
	public void setlName(String lName) {
		this.lName = lName;
	}
	public String getPtitle() {
		return ptitle;
	}
	public void setPtitle(String ptitle) {
		this.ptitle = ptitle;
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
	public int getFileStatus() {
		return fileStatus;
	}
	public void setFileStatus(int fileStatus) {
		this.fileStatus = fileStatus;
	}
	public int getVitalStatus() {
		return vitalStatus;
	}
	public void setVitalStatus(int vitalStatus) {
		this.vitalStatus = vitalStatus;
	}
	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	/**
	 * @return the locId
	 */
	public Integer getLocId() {
		return locId;
	}
	/**
	 * @param locId the locId to set
	 */
	public void setLocId(Integer locId) {
		this.locId = locId;
	}
	/**
	 * @return the billStatus
	 */
	public String getBillStatus() {
		return billStatus;
	}
	/**
	 * @param billStatus the billStatus to set
	 */
	public void setBillStatus(String billStatus) {
		this.billStatus = billStatus;
	}
	/**
	 * @return the patientId
	 */
	public Integer getPatientId() {
		return patientId;
	}
	/**
	 * @param patientId the patientId to set
	 */
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	/**
	 * @return the apptId
	 */
	public Integer getApptId() {
		return apptId;
	}
	/**
	 * @param apptId the apptId to set
	 */
	public void setApptId(Integer apptId) {
		this.apptId = apptId;
	}
	/**
	 * @return the patientCode
	 */
	public String getPatientCode() {
		return patientCode;
	}
	/**
	 * @param patientCode the patientCode to set
	 */
	public void setPatientCode(String patientCode) {
		this.patientCode = patientCode;
	}
	/**
	 * @return the priorityNo
	 */
	public Integer getPriorityNo() {
		return priorityNo;
	}
	/**
	 * @param priorityNo the priorityNo to set
	 */
	public void setPriorityNo(Integer priorityNo) {
		this.priorityNo = priorityNo;
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
	 * @return the patientName
	 */
	public String getParentName() {
		return parentName;
	}
	/**
	 * @param parentName the parentName to set
	 */
	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}
	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}
	/**
	 * @return the age
	 */
	public String getAge() {
		return age;
	}
	/**
	 * @param age the age to set
	 */
	public void setAge(String age) {
		this.age = age;
	}
	/**
	 * @return the mobNum
	 */
	public String getMobNum() {
		return mobNum;
	}
	/**
	 * @param mobNum the mobNum to set
	 */
	public void setMobNum(String mobNum) {
		this.mobNum = mobNum;
	}
	/**
	 * @return the statusInfo
	 */
	public String getStatusInfo() {
		return statusInfo;
	}
	/**
	 * @param statusInfo the statusInfo to set
	 */
	public void setStatusInfo(String statusInfo) {
		this.statusInfo = statusInfo;
	}
	/**
	 * @return the opCode
	 */
	public String getOpCode() {
		return opCode;
	}
	/**
	 * @param opCode the opCode to set
	 */
	public void setOpCode(String opCode) {
		this.opCode = opCode;
	}
	/**
	 * @return the patientCategory
	 */
	public String getPatientCategory() {
		return patientCategory;
	}
	/**
	 * @param patientCategory the patientCategory to set
	 */
	public void setPatientCategory(String patientCategory) {
		this.patientCategory = patientCategory;
	}
	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}
	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	/**
	 * @return the statusInfoId
	 */
	public String getStatusInfoId() {
		return statusInfoId;
	}
	/**
	 * @param statusInfoId the statusInfoId to set
	 */
	public void setStatusInfoId(String statusInfoId) {
		this.statusInfoId = statusInfoId;
	}
	/**
	 * @return the empId
	 */
	public Integer getEmpId() {
		return empId;
	}
	/**
	 * @param empId the empId to set
	 */
	public void setEmpId(Integer empId) {
		this.empId = empId;
	}
	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}
	/**
	 * @param city the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}
	/**
	 * @return the village
	 */
	public String getVillage() {
		return village;
	}
	/**
	 * @param village the village to set
	 */
	public void setVillage(String village) {
		this.village = village;
	}
	/**
	 * @return the visitType
	 */
	public String getVisitType() {
		return visitType;
	}
	/**
	 * @param visitType the visitType to set
	 */
	public void setVisitType(String visitType) {
		this.visitType = visitType;
	}
	/**
	 * @return the docName
	 */
	public String getDocName() {
		return docName;
	}
	/**
	 * @param docName the docName to set
	 */
	public void setDocName(String docName) {
		this.docName = docName;
	}
	/**
	 * @return the problem
	 */
	public String getProblem() {
		return problem;
	}
	/**
	 * @param problem the problem to set
	 */
	public void setProblem(String problem) {
		this.problem = problem;
	}
	
	/**
	 * @return the apptDt
	 */
	public String getApptDt() {
		return apptDt;
	}
	/**
	 * @param apptDt the apptDt to set
	 */
	public void setApptDt(String apptDt) {
		this.apptDt = apptDt;
	}
	/**
	 * @return the title
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title the title to set
	 */
	public void setTitle(String title) {
		this.title = title;
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
	 * @return the orgId
	 */
	public int getOrgId() {
		return orgId;
	}
	/**
	 * @param orgId the orgId to set
	 */
	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}
	/**
	 * @return the orgName
	 */
	public String getOrgName() {
		return orgName;
	}
	/**
	 * @param orgName the orgName to set
	 */
	public void setOrgName(String orgName) {
		this.orgName = orgName;
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
	 * @return the userId
	 */
	public int getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getRegFee() {
		return regFee;
	}
	public void setRegFee(String regFee) {
		this.regFee = regFee;
	}
	
	public String getBillCount() {
		return billCount;
	}
	public void setBillCount(String billCount) {
		this.billCount = billCount;
	}
	/**
	 * @return the scheduleDt
	 */
	public String getScheduleDt() {
		return scheduleDt;
	}
	/**
	 * @param scheduleDt the scheduleDt to set
	 */
	public void setScheduleDt(String scheduleDt) {
		this.scheduleDt = scheduleDt;
	}
	/**
	 * @return the bloodGrp
	 */
	public String getBloodGrp() {
		return bloodGrp;
	}
	/**
	 * @param bloodGrp the bloodGrp to set
	 */
	public void setBloodGrp(String bloodGrp) {
		this.bloodGrp = bloodGrp;
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
	 * @return the state
	 */
	public String getState() {
		return state;
	}
	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}
	/**
	 * @return the addr
	 */
	public String getAddr() {
		return addr;
	}
	/**
	 * @param addr the addr to set
	 */
	public void setAddr(String addr) {
		this.addr = addr;
	}
	/**
	 * @return the maritalStatus
	 */
	public String getMaritalStatus() {
		return maritalStatus;
	}
	/**
	 * @param maritalStatus the maritalStatus to set
	 */
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	/**
	 * @return the religion
	 */
	public String getReligion() {
		return religion;
	}
	/**
	 * @param religion the religion to set
	 */
	public void setReligion(String religion) {
		this.religion = religion;
	}
	/**
	 * @return the idProofType
	 */
	public String getIdProofType() {
		return idProofType;
	}
	/**
	 * @param idProofType the idProofType to set
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
	 * @param idProofNum the idProofNum to set
	 */
	public void setIdProofNum(String idProofNum) {
		this.idProofNum = idProofNum;
	}
	/**
	 * @return the occupation
	 */
	public String getOccupation() {
		return occupation;
	}
	/**
	 * @param occupation the occupation to set
	 */
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	/**
	 * @return the refType
	 */
	public String getRefType() {
		return refType;
	}
	/**
	 * @param refType the refType to set
	 */
	public void setRefType(String refType) {
		this.refType = refType;
	}
	/**
	 * @return the smsStatus
	 */
	public String getSmsStatus() {
		return smsStatus;
	}
	/**
	 * @param smsStatus the smsStatus to set
	 */
	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}
	/**
	 * @return the smsAlert
	 */
	public String getSmsAlert() {
		return smsAlert;
	}
	/**
	 * @param smsAlert the smsAlert to set
	 */
	public void setSmsAlert(String smsAlert) {
		this.smsAlert = smsAlert;
	}
	/**
	 * @return the nationality
	 */
	public String getNationality() {
		return nationality;
	}
	/**
	 * @param nationality the nationality to set
	 */
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	/**
	 * @return the dob
	 */
	public String getDob() {
		return dob;
	}
	/**
	 * @param dob the dob to set
	 */
	public void setDob(String dob) {
		this.dob = dob;
	}
	/**
	 * @return the refId
	 */
	public String getRefId() {
		return refId;
	}
	/**
	 * @param refId the refId to set
	 */
	public void setRefId(String refId) {
		this.refId = refId;
	}
	/**
	 * @return the patientCategoryId
	 */
	public String getPatientCategoryId() {
		return patientCategoryId;
	}
	/**
	 * @param patientCategoryId the patientCategoryId to set
	 */
	public void setPatientCategoryId(String patientCategoryId) {
		this.patientCategoryId = patientCategoryId;
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
	public String getOtherStaffId() {
		return otherStaffId;
	}
	public void setOtherStaffId(String otherStaffId) {
		this.otherStaffId = otherStaffId;
	}
	public String getOtherHospId() {
		return otherHospId;
	}
	public void setOtherHospId(String otherHospId) {
		this.otherHospId = otherHospId;
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
	/**
	 * @return the visitId
	 */
	public int getVisitId() {
		return visitId;
	}
	/**
	 * @param visitId the visitId to set
	 */
	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getOutSideOrg() {
		return outSideOrg;
	}
	public void setOutSideOrg(String outSideOrg) {
		this.outSideOrg = outSideOrg;
	}
	public String getAmountReceived() {
		return amountReceived;
	}
	public void setAmountReceived(String amountReceived) {
		this.amountReceived = amountReceived;
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
	public String getLocationId() {
		return locationId;
	}
	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getAddedBy() {
		return addedBy;
	}
	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getOtherHospName() {
		return otherHospName;
	}
	public void setOtherHospName(String otherHospName) {
		this.otherHospName = otherHospName;
	}
	public String getOtherStaffName() {
		return otherStaffName;
	}
	public void setOtherStaffName(String otherStaffName) {
		this.otherStaffName = otherStaffName;
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
	
	public String getRegOpCashAmt() {
		return regOpCashAmt;
	}
	public void setRegOpCashAmt(String regOpCashAmt) {
		this.regOpCashAmt = regOpCashAmt;
	}
	public String getRegOpCreditAmt() {
		return regOpCreditAmt;
	}
	public void setRegOpCreditAmt(String regOpCreditAmt) {
		this.regOpCreditAmt = regOpCreditAmt;
	}
	public String getRegOpUpiAmt() {
		return regOpUpiAmt;
	}
	public void setRegOpUpiAmt(String regOpUpiAmt) {
		this.regOpUpiAmt = regOpUpiAmt;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRefundAmt() {
		return refundAmt;
	}
	public void setRefundAmt(String refundAmt) {
		this.refundAmt = refundAmt;
	}
	public String getPaidAmt() {
		return paidAmt;
	}
	public void setPaidAmt(String paidAmt) {
		this.paidAmt = paidAmt;
	}
	public String getAuthorizedBy() {
		return authorizedBy;
	}
	public void setAuthorizedBy(String authorizedBy) {
		this.authorizedBy = authorizedBy;
	}
	public String getConsFee() {
		return consFee;
	}
	public void setConsFee(String consFee) {
		this.consFee = consFee;
	}
	public String getConsDiscount() {
		return consDiscount;
	}
	public void setConsDiscount(String consDiscount) {
		this.consDiscount = consDiscount;
	}
	public String getConsDiscountAmount() {
		return consDiscountAmount;
	}
	public void setConsDiscountAmount(String consDiscountAmount) {
		this.consDiscountAmount = consDiscountAmount;
	}
	public String getConsAmount() {
		return consAmount;
	}
	public void setConsAmount(String consAmount) {
		this.consAmount = consAmount;
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
	public String getTotDiscountAmt() {
		return totDiscountAmt;
	}
	public void setTotDiscountAmt(String totDiscountAmt) {
		this.totDiscountAmt = totDiscountAmt;
	}
	public String getBalance() {
		return balance;
	}
	public void setBalance(String balance) {
		this.balance = balance;
	}
	public String getAmtRecd() {
		return amtRecd;
	}
	public void setAmtRecd(String amtRecd) {
		this.amtRecd = amtRecd;
	}
	public String getBillAmt() {
		return billAmt;
	}
	public void setBillAmt(String billAmt) {
		this.billAmt = billAmt;
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
	
	
}