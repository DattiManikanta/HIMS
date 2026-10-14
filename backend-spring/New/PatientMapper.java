/*@author: Swetha S
 * @created date: 20-Dec-2015
 * @Modified date: 2 May-2015
 * @modified by S.Veena
 * @File Name: "PatientMapper.java" class file
 * @version: 1.0
 * @Copyright (c) 2014-2015 Atri Business Solutions, Inc.
    All Rights Reserved.
 *
    This software is the confidential and proprietary information of Atri
    Business Solutions, Inc. ("Confidential Information"). You shall not
    disclose such Confidential Information and shall use it only in
    accordance with the terms of the license agreement you entered into
    with Atri Business Solutions.*/

package com.atri.hms.patientmanagement.opregistration.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.atri.hms.common.countries.model.CityModel;
import com.atri.hms.creditbilling.patient.corporateregistration.model.ConsultationOpModel;
import com.atri.hms.creditbilling.patient.corporateregistration.model.CorpRegistrationModel;
import com.atri.hms.hr.model.DoctorModel;
import com.atri.hms.lab.billing.model.LabBillingModel;
import com.atri.hms.lab.samples.model.SampleCollectionModel;
import com.atri.hms.patientmanagement.appointment.model.AppointmentModel;
import com.atri.hms.patientmanagement.opregistration.model.ExtraDoctorSlots;
import com.atri.hms.patientmanagement.opregistration.model.FeeModel;
import com.atri.hms.patientmanagement.opregistration.model.LocationModel;
import com.atri.hms.patientmanagement.opregistration.model.PatientModel;
import com.atri.hms.patientmanagement.opregistration.model.PatientQueueModel;
import com.atri.hms.patientmanagement.opregistration.model.PaymentEnqPayloadModel;
import com.atri.hms.patientmanagement.opregistration.model.PaymentReqPayloadModel;
import com.atri.hms.patientmanagement.patientReports.model.PatientReportsModel;
import com.atri.hms.sms.model.SMSModel;

public interface PatientMapper {

	// To get patient unique umr code
	//Object callSetPatientDetails(PatientModel patient);
	Object callSetPatientDetails(PatientModel patientModel);

	// To get unique code to store patient photos
	Object callGetPhotoDetails(PatientModel patient);

	//for attendee pic
	Object callGetAttendeePhotoDetails(PatientModel patient);

	void callGetinsertchequeRegType(PatientModel patientModel);

	Object setSuvPrescription(PatientModel patientModel);


	String getAllStaff = "select concat(emp_name,'-',emp_code) as name, "
			+ "emp_id as id from at_hr_emp where status_id = 34 "
			+ " and role = fn_getcodevalue_id('EMPROLE', 'Doctor')";

	String UPT_STATUS_N = "update at_pr_patient set doc_status = 'n' "
			+ "where umr_num = #{patientCode}";

	String DEL_DOCS = "delete from at_pr_documents where patient_id = "
			+ "(select patient_id from at_pr_patient where umr_num=#{patientCode})";

	String UPT_STATUS_Y = "update at_pr_patient set doc_status = 'y' "
			+ "where umr_num = #{patientCode}";


	String DEL_PNT = "update at_pr_patient set status_id = fn_getcodevalue_id('STS','Inactive') "
			+ "where patient_id = #{patientId}";

	String SELECT_STATUS = "select v.code_val_id as statusId,v.val_name as status"
			+ " from at_std_code s,at_std_code_values v "
			+ " where s.std_code ='SCH' and s.std_code_id = v.std_code_id ";

	String GET_PATIENT_DOCS = "select doc_id as documentId,doc_type as docType,"
			+ "doc_details as fileName from at_pr_documents where patient_id = #{patientId}";

	String DetailedView = "SELECT p.patient_id as patientId,p.umr_num as umrNo,"
			+ "p.pic_details as picName,"
			+ "p.patient_id as patientId,p.title AS title,p.patient_name AS pname,p.gender AS gender,"
			+ "p.mob_num AS mobNum,p.age AS age,p.dob AS dob,p.land_phn AS landNum,"
			+ "p.addr AS addr,p.city AS city,"
			+ "s.state_code as stateId,c.country_code as countryId,s.state AS state,c.country AS country,"
			+ "p.pin AS pinCode,p.marital_status AS maritalStatus,p.er_contact AS emrName,"
			+ "p.contact_phn AS emrPhone,p.how_related AS emrRel,p.email AS email,"
			+ "p.alt_email AS altEmail,p.pref_comm AS preCom,p.rem_lang AS remLang,"
			+ "p.patient_category AS pntCatId, p.ref_type as refTypeId,"
			+ "e.emp_name AS priCarePhysician,p.ref_type as refType,"
			+ "p.credit_org_id AS orgId,p.emp_id AS empId,p.blood_grp AS bloodGrp,"
			+ "p.mother_name AS motherName,p.father_husband_name AS fatherName,p.nationality AS nationality,"
			+ "p.religion AS religion,p.reg_dt AS regDt,p.doc_status AS docStatus, "
			+ "p.credit_emp_id AS creditEmp,p.relation AS relation "
			+ "from at_pr_patient p LEFT JOIN at_country c ON c.country_code = p.country "
			+ "LEFT JOIN at_state s ON s.state_code = p.state LEFT JOIN at_hr_emp e "
			+ "ON e.emp_id = p.emp_id where " + "p.umr_num=#{umrNo}";





	String updatePatients = "update at_pr_patient set title=#{title},patient_name=#{pname},"
			+ "gender=#{gender},mob_num=#{mobNum},age=#{age},dob=#{dob},"
			+ "land_phn=#{landNum},"
			+ "addr=#{addr},city=#{city},state=#{state},country=#{country},"
			+ "pin=#{pinCode},marital_status=#{maritalStatus},"
			+ "er_contact=#{emrName},contact_phn=#{emrPhone},"
			+ "how_related=#{emrRel},email=#{email},alt_email=#{altEmail},"
			+ "pref_comm=#{preCom},rem_lang=#{remLang},"
			+ "patient_category=#{pntCat}, "
			+ "pri_care_physician=#{priCarePhysician},"
			+ "emp_id=#{empId},blood_grp=#{bloodGrp},mother_name=#{motherName},"
			+ "father_husband_name=#{fatherName},nationality=#{nationality},"
			+ "religion=#{religion},ref_type=#{refType},"
			+ "credit_emp_id=#{creditEmpId},modified_by=#{modifiedBy},"
			+ "modified_on = #{modifiedOn},modified_ip = #{modifiedIp} where "
			+ "patient_id=#{patientId}";

	String GET_APPT = "select patient_id as patientId,emp_id as empId ,diseases_desc as problem ,"
			+ "schedule_dt as schDt ,loc_id as locId ,added_by as addedBy ,added_on as addedOn "
			+ "from at_pr_appt where patient_appt_id = #{apptId}";

	@Select(GET_APPT)
	PatientModel getAppointmentDetails(String apptId);

	List<PatientModel> getSearchDetails();

	// To delete patient documents
	@Delete(DEL_DOCS)
	int deletePatientDocs(String patientCode);

	// To update document status based on patient number
	@Update(UPT_STATUS_N)
	int setDocStatus(String patientCode);

	// To update document status as yes based on patient number
	@Update(UPT_STATUS_Y)
	int setDocStatusY(String patientCode);

	// To select documents of a patient
	/*
	 * @Select(GET_UMR) List<PatientDocumentsModel> getPatientUmr();
	 */

	// To get list of patients
	List<PatientModel> getPatientList(PatientModel patient);

	// To delete patient details
	@Update(DEL_PNT)
	int deletePatient(int patientId);

	// Update patients queue system
	int updateQueue(PatientModel PatientModel);

	//To get patient queue data on change query
	List<PatientQueueModel> getPatientQueue(PatientModel PatientModel);

	List<PatientQueueModel> getPatientQueuee(PatientModel patientModel);

	// To get status from standard code tables
	@Select(SELECT_STATUS)
	List<PatientModel> getStandardStatus();

	// To get patient file name
	String getPatientFileName(PatientModel patient);

	// To get patient documents name
	/* PatientDocsModel getDocumentName(PatientDocsModel patientModel); */

	// To get patient documents
	@Select(GET_PATIENT_DOCS)
	List<PatientModel> getPatientDocuments(String patientId);

	List<PatientModel> getCategoryList(PatientModel patient);

	List<PatientModel> getQueue(String selectDate);

	List<PatientModel> getCategories();

	@Select(DetailedView)
	PatientModel detailedView(String umrNo);

	@Update(updatePatients)
	int updatePatientDetails(PatientModel patientModel);

	/*
	 * @Select(getAllStaff) List<DoctorAvailModel> getAllStaff();
	 */

	List<PatientModel> getVisitQueue(PatientModel PatientModel);

	List<PatientModel> getCancelQueue(PatientModel PatientModel);

	List<PatientModel> getRescheduleQueue(PatientModel PatientModel);

	int updateQueueStatus(PatientModel PatientModelList);

	List<PatientModel> getStatusCount();

	PatientModel updateFollowup(PatientModel PatientModelList);

	List<PatientModel> getRefTypes();

	Object updtRefdetails(PatientModel patientModel);

	List<PatientModel> getCategories(String type);

	List<PatientModel> getPatientQueueUsers(PatientModel PatientModel);

	// To search all the patients
	List<PatientModel> searchPatients(PatientModel patient);

	PatientModel getPatientResch();

	int updateRescheduleQueue(AppointmentModel appttModel);

	int updtReschSts(PatientModel PatientModel);

	List<PatientModel> getApptStatusDetails();

	List<PatientModel> getUpdatedPatientQueue(PatientModel PatientModel);

	int updtCancelledSts(PatientModel PatientModel);


	// To get Referral Doctors

	String GETDOCTORS = "select concat(emp_name) as doctorName, emp_id as doctorId from at_hr_emp where emp_id!=0  "
			+ "and role=fn_getcodevalue_id('EMPROLE','REFERRAL') or role=fn_getcodevalue_id('EMPROLE','DOCTOR') ";

	@Select(GETDOCTORS)
	List<DoctorModel> getListOfDoctors();

	String GET_STAFF = "select concat(emp_name,'-',emp_code) as doctorName, emp_id as doctorId from at_hr_emp where emp_id!=0  "
			+ "and role=fn_getcodevalue_id('EMPROLE','REFERRAL')";

	@Select(GET_STAFF)
	List<DoctorModel> getListOfReferals();

	String GET_AVAIL_DOCTORS = "Select REPLACE(concat(e.emp_name,' ',e.last_name, ' / ', ifnull(e.doc_short_names, '')), '.', ' ') as doctorName,e.emp_id as doctorId,"
			+ "concat(e.emp_id, ':', e.emp_code, ':', spec.spec_name) as doctorDetails from "
			+ "at_pr_doc_availability a , at_hr_emp e left join "
			+ "at_hr_specialization spec on e.spec_id=spec.spec_id "
			+ "where a.emp_id=e.emp_id and a.status_id = 34  group by e.emp_id";

	@Select(GET_AVAIL_DOCTORS)
	List<DoctorModel> getAvailableDoctors();


	/*	String GETORGDETAILS = "select tariff_id as orgId, concat(r_chart_name, ' - ' , r_chart_code) as orgName " + 
			"	 		 from at_cb_tariff  where status_id=34";
	@Select(GETORGDETAILS)*/
	String getOrgDetails="SELECT  tariff_id AS orgId, CONCAT(r_chart_name, ' - ', r_chart_code) AS orgName "
			+ "FROM at_cb_tariff WHERE status_id = 34 and status_wise =1 ORDER BY "
			+ "CASE WHEN r_chart_name = 'General' THEN 0 ELSE 1 END, orgName";
	@Select(getOrgDetails)
	List<PatientModel> getOrgDetails();


	String GETORGLOCS = "select loc.loc_id as locId, loc.loc_name as location from at_location loc, " 
		    + "at_company comp where loc.company_id=comp.company_id and loc.status_id=34 " 
		    + "and comp.status_id=34 and loc.loc_name = 'INDUS HOSPITALS'";
	@Select(GETORGLOCS)
	List<LocationModel> getLocations(String orgName);


	String GET_LOC_WISE_DOCTORS = "select e.emp_id as doctorId, e.emp_name as doctorName, " 
			+ "concat(e.emp_id, ':', e.emp_code, ':', spec.spec_name) as doctorDetails from " 
			+ "at_hr_emp e, at_pr_doc_availability d, at_location h, at_hr_specialization spec " 
			+ "where e.spec_id=spec.spec_id and e.emp_id = d.emp_id and " 
			+ "d.location_id = h.loc_id and h.loc_id = #{locId} group by e.emp_id";
	@Select(GET_LOC_WISE_DOCTORS)
	List<DoctorModel> getLocationWiseDoctors(Integer locId);

	/*String GET_DOC_WISE_LOCATIONS = "select l.building_id as locId, concat(l.building_name, l.addr) as location "
			+ "from at_pr_doc_availability d, at_hk_building l where d.location_id = l.building_id and "
			+ "d.emp_id = #{doctorId}  group by l.building_id";*/
	String GET_DOC_WISE_LOCATIONS = "select loc.loc_id as locId, loc.loc_name as location from at_location loc, " 
			+ "at_pr_doc_availability d where d.location_id=loc.loc_id and d.emp_id = #{doctorId} " 
			+ "and loc.status_id=34  group by loc.loc_id";

	@Select(GET_DOC_WISE_LOCATIONS)
	List<LocationModel> getDoctorsWiseLocations(Integer doctorId);

	Object callGetRegistrationFee(PatientModel patientModel);

	Object callGetDocDetails(PatientModel patientModel);

	Object callGetConsultationFee(PatientModel patientModel);
	Object callExtraDoctorAvailTokens(ExtraDoctorSlots slots);

	//Object callGetConsultationFeee(PatientModel patientModel);

	FeeModel callSetBillDetails(FeeModel feeModel);

	Object setRegistrationFeeDetails(FeeModel feeModel);

	Object setConsultationFeeDetails(FeeModel feeModel);

	PatientModel getPatientDetails(@Param("patientId") Integer patientId);

	String UPDT_PATIENT = " update at_pr_patient  set patient_name = #{pname}, gender = #{gender}, mob_num = #{mobNum}, age = #{age}, "
			+ " dob =#{dob} ,age_m = #{ageMonths},age_d = #{ageDays}, sms_alert = #{smsStatus}, addr = #{addr},city = #{city}, state = #{state}, country = #{country}, "
			+ "marital_status = #{maritalStatus}, patient_category = #{patientCategory}, credit_org_id = #{orgId}, blood_grp = #{bloodGrp}, "
			+ "nationality = #{nationality}, religion = #{religion}, ref_type = #{refType}, village = #{village}, "
			+ "id_proof_type = #{idProofType}, id_proof_num = #{idProofNum},patient_category_name=#{updtPatCatName}, ref_type = #{refType},last_name=#{lName},title=#{ptitle}, "
			+ "occupation = #{occupation}, ref_id=#{refId},other_hosp_id=#{otherHospId},other_staff_id=#{updateOtherStaffId}, "
			+ "other_staff_name = #{otherStaffName},  other_hosp_name = #{otherHospName},org_id =#{updtOrgNames}, "
			+ "modified_by = #{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = now() "
			+ "where patient_id = #{patientId}";

	@Update(UPDT_PATIENT)
	int updatePatientRecord(PatientModel patientModel);


	String UPDATEPAYMENTTYPE= "update at_bills set payment_type =#{paymentType} ,modified_by =#{modifiedBy},modified_ip=#{modifiedIp},"
			+ "modified_on=now() where bill_id=#{billId}";
	@Update(UPDATEPAYMENTTYPE)
	int updatePatientPaymentType(PatientModel patientModel);

	String DEL_PATIENT = "update at_pr_patient set status_id = fn_getcodevalue_id('PATSTS','Inactive'), modified_by = #{modifiedBy}, "
			+ "modified_ip = #{modifiedIp}, modified_on = curdate() where patient_id = #{patientId}";

	@Update(DEL_PATIENT)
	int deletePatientRecord(PatientModel delPatient);

	String GET_PNT_INFO = "select patient_id as patientId, umr_num as patientCode, patient_name as pname, patient_category as patientCategoryId, "
			+ "fn_getcodevalue(patient_category) as patientCategory from at_pr_patient where patient_id = #{patientId}";

	@Select(GET_PNT_INFO)
	PatientModel getPatientInfo(@Param("patientId") Integer patientId);

	String CHK_PNT_BILL_STS = "select fn_getcodevalue(bill_status_id) from at_pr_patient where patient_id = #{patientId}";

	@Select(CHK_PNT_BILL_STS)
	String checkPatientBillStatus(@Param("patientId") Integer patientId);

	String CHK_APPT_BILL_STS = "select fn_getcodevalue(bill_status) from at_pr_appt where patient_appt_id = #{apptId}";

	@Select(CHK_APPT_BILL_STS)
	String checkAppointmentBillStatus(@Param("apptId") Integer apptId);

	String GET_BAL = "select bill_id as billId, bill_dt as billDt, tot_amt as totAmt, tot_discount as totDiscount, "
			+ "bill_amt as billAmt, paid_amt as paidAmt, balance "
			+ "from at_bills "
			+ "where bill_status = fn_getcodevalue_id('BILLSTS','pending') and patient_id = #{patientId}"
			+ "order by bill_id";

	@Select(GET_BAL)
	List<FeeModel> getPendingBills(@Param("patientId") Integer patientId);

	String GET_BILL_ID = "select bill_id as billId from at_bill_details where patient_appt_id = #{apptId} group by bill_id";

	@Select(GET_BILL_ID)
	Integer getBillId(Integer apptId);

	List<FeeModel> getBillDetails(@Param("billId") Integer billId);

	FeeModel getBill(@Param("billId") Integer billId);

	String GET_PNT_CAT = "select fn_getcodevalue_id('PATCAT',#{category}) as patientCategoryId";

	@Select(GET_PNT_CAT)
	int getPatientCategoryId(@Param("category") String category);

	Object updateBill(FeeModel feeModel);

	String UPDT_APPT_STS = "update at_pr_appt set appt_status_id = fn_getcodevalue_id('SCH', #{visitStatus}),"
			+ "waiting_time = if (#{visitStatus} = 'Waiting', now(), waiting_time), " 
			+ "waiting_time = if (#{visitStatus} = 'CheckUp' && waiting_time is NULL, now(), waiting_time), " 
			+ "checkup_time = if (#{visitStatus} = 'CheckUp', now(), checkup_time), " 
			+ "checkup_time = if (#{visitStatus} = 'Visited' && checkup_time is NULL, now(), checkup_time), " 
			+ "visited_time = if (visited_time is NULL,  if (#{visitStatus} = 'Visited', now(), visited_time), " 
			+ "visited_time), lab_billed_time = if (#{visitStatus} = 'LabBill', now(), lab_billed_time), " 
			+ "cons_visit_time_1 = if (visited_time is not NULL,  if (#{visitStatus} = 'ConsReVisit', " 
			+ "now(), cons_visit_time_1), cons_visit_time_1), " 
			+ "phar_billed_time = if (#{visitStatus} = 'PharBill', now(), phar_billed_time), " 
			+ "con_visit_time_n = if (visited_time is not NULL && cons_visit_time_1 is not NULL,  " 
			+ "if (#{visitStatus} = 'ConsReVisitN', now(), con_visit_time_n), con_visit_time_n), " 
			+ "actual_start_time = if (#{visitStatus} = 'CheckUp', now(), actual_start_time), " 
			+ "actual_end_time = if (#{visitStatus} = 'Visited', now(), actual_end_time), " 
			+ "modified_by =#{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = now() " 
			+ "where patient_appt_id = #{apptId}";

	@Update(UPDT_APPT_STS)
	int updateAppointmentStatus(AppointmentModel apptModel);

	Object updateCancellationBillDetails(AppointmentModel apptModel);

	Object billRefundStatus(AppointmentModel apptModel);

	String CAN_APPT_BILL = "update at_pr_appt set bill_status = fn_getcodevalue_id('BILLSTS','Cancelled'),"
			+ "modified_by =#{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = curdate() "
			+ "where patient_appt_id = #{apptId}";

	@Update(CAN_APPT_BILL)
	int cancelApptBill(AppointmentModel apptModel);

	String BILL_AMT = "select paid_amt as paidAmt from at_bills where bill_id = #{billId}";
	@Select(BILL_AMT)
	String getBillAmount(@Param("billId") Integer billId);

	Object rescheduleAppointment(AppointmentModel apptModel);

	List<PatientModel> getRefCategories(String string);

	String GETEMPLIST = "select emp_id as empId, emp_name as empName from at_hr_emp where "
			+ "status_id=34  and emp_id not in (1,2,3,4,5)";

	@Select(GETEMPLIST)
	List<PatientModel> getEmpList();

	String GETDOCTORDETAILS = "select spec_name as specName,he.emp_code as empCode "
			+ "from at_hr_specialization hs, at_hr_emp he "
			+ "where hs.spec_id=he.spec_id and he.emp_id=#{idDoctor}";

	@Select(GETDOCTORDETAILS)
	PatientModel getDoctorDetails(PatientModel docModel);

	String GETCONSFEE = "select charge_per_unit as consFees from at_bill_details where bill_id = 1";
	@Select(GETCONSFEE)
	List<PatientModel> getConsultationFee(PatientModel patientModel);

	String GETSTFLIST = "select emp_id as stfId, emp_name as stfName from at_hr_emp where emp_id!=0 "
			+ "and role=fn_getcodevalue_id('REFTYPE','Other Staff')";

	@Select(GETSTFLIST)
	List<PatientModel> getStfList();


	String GETHOSPLIST = "select hospital_id as hspId, hospital_name as hspName from at_other_hospitals where "
			+ " hospital_type=fn_getcodevalue_id('REFTYPE','Other Hospitals')";

	@Select(GETHOSPLIST)
	List<PatientModel> getHospList();

	String GETREGBILLDET = "select pat.patient_id as patId, pat.patient_name as pname, pat.title as ptitle, pat.umr_num as umrNo, " 
			+ "pat.age as age,pat.age_d as ageDays,pat.age_m as ageMonths, pat.gender as gender, pat.mob_num as mobNum, pat.religion as religion, reg.reg_num as regNum, " 
			+ "date_format(reg.reg_dt, '%d-%b-%Y') as regDt, date_format(reg.reg_valid_upto, '%d-%b-%Y') as regValidDt, " 
			+ "fn_get_emp_name(pat.emp_id) as empName, spec_name as specName, pat.last_name as lName, pat.care_by as careBy, " 
			+ "pat.care_by_name as careByName, pat.marital_status as maritalStatus, pat.nationality as nationality, " 
			+ "pat.occupation as occupation, pat.addr as addr, pat.city as city, fn_getcodevalue(pat.ref_type) as refType, " 
			+ "rec.receipt_no as recptNo, rec.receipt_date as recptDate, charge_per_unit as regFees, bill.discount_amt as discAmt, " 
			+ "amt_received as amountReceived from at_pr_patient pat, at_hr_emp emp, at_hr_specialization spec, " 
			+ "at_bills bills, at_bill_details bill, at_bill_receipts rec, at_services ass, at_pr_reg reg " 
			+ "where pat.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and pat.patient_id=bills.patient_id and " 
			+ "bills.bill_id=bill.bill_id and bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id and " 
			+ "ass.service_id=bill.service_id and reg.patient_id=pat.patient_id and reg.reg_status=34 " 
			+ "and service_type = fn_getcodevalue_id('SERTYPE', 'Registration') and bills.bill_id=#{billId}";
	@Select(GETREGBILLDET)
	PatientModel getRegBillDetails(Integer billId);


	String GETOPBILLDET = "select pat.patient_id as patId, pat.patient_name as pname, pat.title as ptitle, " 
			+ "pat.umr_num as umrNo, pat.age as age, pat.gender as gender, pat.mob_num as mobNum, " 
			+ "fn_get_emp_name(appt.emp_id) as empName, spec_name as specName, fn_getcodevalue(appt.ref_type) as refType, " 
			+ "op_num as opNum, date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, " 
			+ "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, rec.receipt_date as recptDate, " 
			+ "charge_per_unit as consFees, bill.discount_amt as discAmt, final_amt as finalAmt, " 
			+ "(bill.final_amt-bills.balance) as billAmt, amt_received as amountReceived, rec.balance as balance " 
			+ "from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, at_hr_specialization spec, at_bills bills, at_bill_details bill, " 
			+ "at_bill_receipts rec, at_services ass where appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and pat.patient_id=bills.patient_id and " 
			+ "bills.bill_id=bill.bill_id and bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id  " 
			+ "and ass.service_id=bill.service_id and appt.patient_appt_id=bill.patient_appt_id and service_type = " 
			+ "fn_getcodevalue_id('SERTYPE', 'Consultation') and bills.bill_id=#{billId} group by bills.bill_id order by receipt_id asc";
	@Select(GETOPBILLDET)
	PatientModel getOpBillDetails(Integer billId);

	String GETOPBILLRECDET = "select pat.patient_id as patId, pat.patient_name as pname, pat.title as ptitle, " 
			+ "pat.umr_num as umrNo, pat.age as age, pat.gender as gender, pat.mob_num as mobNum, " 
			+ "fn_get_emp_name(appt.emp_id) as empName, spec_name as specName, fn_getcodevalue(pat.ref_type) as refType, " 
			+ "op_num as opNum, date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, " 
			+ "fn_get_std_value(pat.patient_category) as pntCat, rec.receipt_no as recptNo, rec.receipt_date as recptDate, " 
			+ "charge_per_unit as consFees, bill.discount_amt as discAmt, final_amt as finalAmt, " 
			+ "(bill.final_amt-bills.balance) as billAmt, amt_received as amountReceived, rec.balance as balance " 
			+ "from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, at_hr_specialization spec, at_bills bills, at_bill_details bill, " 
			+ "at_bill_receipts rec, at_services ass where appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and " 
			+ "pat.patient_id=bills.patient_id and bills.bill_id=bill.bill_id and bill.bill_id=rec.bill_id and " 
			+ "bill.bill_details_id=rec.bill_details_id and ass.service_id=bill.service_id and appt.patient_appt_id=bill.patient_appt_id" 
			+ " and service_type = fn_getcodevalue_id('SERTYPE', 'Consultation') and rec.receipt_id=#{recptNo} " 
			+ "group by bills.bill_id order by receipt_id asc";
	@Select(GETOPBILLRECDET)  
	PatientModel getOpBillReceiptDetails(String string);

	//void setPatientRegistration(PatientModel patientModel);
	void setPatientRegistration(PatientModel patientModel);

	String GETPATREGFEE = "select if(date(now()) >= date_format(reg_valid_upto, '%Y-%m-%d'), '0', '0')" 
			+ " as regFees, if(date(now()) >= date_format(reg_valid_upto, '%Y-%m-%d'), '1', '0') as regDivSts " 
			+ "from at_pr_reg where patient_id=#{patientId}";
	@Select(GETPATREGFEE)
	PatientModel getPatRegFeeDetails(PatientModel patientModel);


	/*** EXISTED COMMENTED ON 06TH JULY 2019 ***/
	String GETPATREGFEECATLOC ="select if(date_format(#{scheduleDt},'%Y-%m-%d') >= date_format(reg_valid_upto, '%Y-%m-%d'), "
			+ "(select charge from at_source_service_consult assc, at_source_service ass "
			+ "where ass.source_service_id=assc.source_service_id and assc.visit_type_id=#{patVisitId} "
			+ " and ass.equp_service_id=#{empId} "
			+ "and assc.location_id=#{locId} and assc.tariff_id=#{pntCat} and  assc.status_id=34 "
			+ " and ass.status_id=34 ), '0') as regFees,"
			+ " if(date_format(#{scheduleDt},'%Y-%m-%d') >= date_format(reg_valid_upto, '%Y-%m-%d'), '1', '0') as regDivSts, "
			+ "date_format(reg_valid_upto, '%d-%b-%Y') as regValidDt from at_pr_reg where patient_id=#{patientId} "
			+ "and reg_status=34 ";

	@Select(GETPATREGFEECATLOC)
	PatientModel getPatRegFeeCatLocDetails(PatientModel patientModel);


	String GETSUVPATREGFEECATLOC="select if(date_format(str_to_date(#{scheduleDt},'%d-%M-%Y'),'%Y-%m-%d') >= date_format(REGISTRATIONVALIDDT, '%Y-%m-%d'),"
			+ "(select charge from at_source_service_consult assc inner join  at_source_service ass"
			+ " on ass.source_service_id=assc.source_service_id and ass.tariff_id= assc.tariff_id"
			+ " where ass.equp_service_id=#{docId} and assc.visit_type_id=174 and assc.location_id=#{locId}"
			+ " and assc.tariff_id=#{patientCategory} and assc.status_id=34  "
			+ " and ass.status_id=34 ), '0.00') as regFees,"
			+ " if(date_format(str_to_date(#{scheduleDt},'%d-%M-%Y'),'%Y-%m-%d') >= date_format(REGISTRATIONVALIDDT, '%Y-%m-%d'), '1', '0') as regDivSts,"
			+ "date_format(REGISTRATIONVALIDDT, '%d-%b-%Y') as regValidDt from at_pat_details_suv where pat_details_suv_id=#{regPatientId}";

	@Select(GETSUVPATREGFEECATLOC)
	PatientModel getSuvPatRegFeeCatLocDetails(PatientModel patientModel);

	String GETSUVPATREGFEEYORN="select if(date_format(str_to_date(#{scheduleDt},'%d-%M-%Y'),'%Y-%m-%d') >= date_format(REGISTRATIONVALIDDT, '%Y-%m-%d'),"
			+ "(select charge from at_source_service_consult assc inner join  at_source_service ass"
			+ " on ass.source_service_id=assc.source_service_id and ass.tariff_id= assc.tariff_id"
			+ " where ass.equp_service_id=#{docId} and assc.visit_type_id=174 and assc.location_id=#{locId}"
			+ " and assc.tariff_id=#{patientCategory} and assc.status_id=34  "
			+ " and ass.status_id=34 ), '0') as regFees,"
			+ " if(date_format(str_to_date(#{scheduleDt},'%d-%M-%Y'),'%Y-%m-%d') >= date_format(REGISTRATIONVALIDDT, '%Y-%m-%d'), '1', '0') as regDivSts,"
			+ "date_format(REGISTRATIONVALIDDT, '%d-%b-%Y') as regValidDt from at_pat_details_suv where pat_details_suv_id=#{regPatientId}";

	@Select(GETSUVPATREGFEEYORN)
	PatientModel getSuvPatRegFeeCatYorN(PatientModel patientModel);





	String GETOTHERHOSPLST = "select other_hosp_id as otherHospId, other_hosp_code as otherHospCode, " 
			+ "other_hosp_name as otherHospName, alias_name as aliasName from at_other_hosp where " 
			+ "status_id=34 ";
	@Select(GETOTHERHOSPLST)
	List<PatientModel> getOthetHospList();

	String GETOTHERSTAFFLST = "select other_staff_id as otherStaffId, other_staff_code as otherStaffCode, " 
			+ "other_staff_name as otherStaffName, alias_name as aliasName from at_other_staff where " 
			+ "status_id=34 ";
	@Select(GETOTHERSTAFFLST)
	List<PatientModel> getOthetStaffList();

	String EMPMOBNO = "select mobile as mobNum from at_hr_emp where emp_id=#{empId}";
	@Select(EMPMOBNO)
	String getEmpMobNumber(Integer empId);

	List<PatientQueueModel> getPatientQueueDept(PatientModel pntModel);

	void setOtherHospDet(PatientModel patientModel);

	void setOtherStaffDet(PatientModel patientModel);

	void setOtherDoctorDet(PatientModel patientModel);

	String GETPNTPORTALLIST = "select patient_portal_id as pntPortalId, title as ptitle, " 
			+ "temp_umr_num as patientCode, patient_name as pname, last_name as lName, gender, " 
			+ "age, date_format(dob, '%d-%b-%Y') as dob, addr, blood_grp as bloodGrp, nationality, " 
			+ "religion, id_proof_type as idType, id_proof_num as idNum, occupation, care_by as careBy, " 
			+ "care_by_name as careByName, mob_num as mobNum, patient_reg_sts as pntPortalRegSts " 
			+ "from at_pr_patient_portal";
	@Select(GETPNTPORTALLIST)
	List<PatientModel> getPatientPortalList();

	String SETPORTALREGPAT = "update at_pr_patient_portal set patient_id=#{patientId}, " 
			+ "patient_reg_sts='1' where patient_portal_id=#{pntPortalId}";
	@Update(SETPORTALREGPAT)
	void setPortalRegPatient(PatientModel patientModel);

	//comment by sandhya on 18th march 2024



	/*
	String GETPATIENTS = "select  patient_id as patientId, umr_num as umrNo, patient_name as patientName , mob_num as mobNum,  dob as dob, "
			+ " last_name as lName,care_by as careBy ,care_by_name as careByName,
			patient_category_name as pntCat from  at_pr_patient where umr_num like #{umrNo} and umr_num like 'UMR%' "
			+ " or patient_name like #{patientName} and umr_num like 'UMR%' "
			+ " or mob_num like #{mobNum} and umr_num like 'UMR%' and status_id=34 ";

	@Select (GETPATIENTS)
	List<PatientModel> getPatients(PatientModel patientModel);


	 */



	String GETPATIENTS = "select  patient_id as patientId, umr_num as umrNo, patient_name as patientName , mob_num as mobNum,  dob as dob, " 
			+ "  last_name as lName,care_by as careBy ,care_by_name as careByName, outside_org_id,"  
			+ "  patient_category_name as pntCat,org_id as orgId from  at_pr_patient where ((umr_num like #{umrNo}  and umr_num like 'UMR%') " 
			+ "  or (patient_name like #{patientName} and umr_num like 'UMR%') " 
			+ "  or (mob_num like #{mobNum} and umr_num like 'UMR%') )and (status_id=34) and "
			+ " ((outside_org_id is null) or (outside_org_id = 1) or (outside_org_id = '0')) ";

	@Select (GETPATIENTS)
	List<PatientModel> getPatients(PatientModel patientModel);


	String GETREGPATIENTS="select pat_details_suv_id as regPatientId,UMRNO as regUmr,PATIENTNAME as regPatientName, MOBILENO as pntMobNum, "
			+ "date_format(DOB,'%d-%b-%Y') as dob "
			+ "from at_pat_details_suv where UMRNO like #{regUmr} or PATIENTNAME like #{regPatientName} or MOBILENO like #{pntMobNum}";
	@Select (GETREGPATIENTS)
	List<PatientModel> getRegPatients(PatientModel patientModel);


	/*** IF VISIT TYPE IN AT_PR_APPT IS NULL WE HVE GIVEN  DEFAULT VALUE 174 / 226 on 07 july 2022 ***/


	/* comment by manikanta datti remove appt mapping 
	 * String GETPATLIST = "select p.patient_id as patientId, p.patient_name as pname, concat(if(p.last_name is null,' ',p.last_name)) as lname, title as ptitle, care_by as careBy,"
			+ "concat(if(care_by_name is null,' ',care_by_name)) as careByName, sms_alert as smsAlert, sms_status as smsStatus, p.marital_status as maritalStatus,"
			+ "p.nationality as nationality, p.religion as religion,p.blood_grp as bloodGrp, p.occupation as pntOccupation, p.id_proof_type as idProofType,"
			+ "p.id_proof_num as idProofNum, (select max(a.org_id) from at_pr_patient a, at_pr_appt apt "
			+ "where a.patient_id=apt.patient_id and a.patient_id=#{patientId}) as patientCategory,"
			+ "(select fn_getcodevalue(max(apt.org_id)) from at_pr_patient a, at_pr_appt apt "
			+ "where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as pntCat,"
			+ "max(appt.org_id) as orgName,p.age as age,"
			+ " p.mob_num as mobNum, p.gender as gender, date_format(p.reg_dt,'%d-%b-%Y') as regDt,"
			+ "p.state as state, p.city as city,"
			+ "(select case when"
			+ "(select date_format(str_to_date(p.dob, '%Y-%m-%d'), '%Y-%m-%d') "
			+ "from at_pr_patient p where p.patient_id = #{patientId}) is null then "
			+ "DATE_SUB((select date(p.added_on) from at_pr_patient p where p.patient_id=#{patientId}), INTERVAL "
			+ "(select p.age from at_pr_patient p where p.patient_id=#{patientId}) year)"
			+ "else (select date_format(str_to_date(p.dob, '%Y-%m-%d'), '%Y-%m-%d') from at_pr_patient p where p.patient_id = #{patientId})"
			+ "end) as dob,p.umr_num as umrSec,"
			+ "p.age_m as ageMonths,p.age_d as ageDays,concat(if(p.village is null,' ',p.village)) as village, p.addr as addr, "
			+ "p.pic_details as picName,p.attendee_pic_details as picNamee, max(patient_appt_id),  max(appt.org_id) as orgName, "
			+ "(select max(apt.ref_type)from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as refType, "
			+ "(select max(apt.ref_id)from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as refId,"
			+ "(select max(apt.other_hosp_id)from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as otherHospId,"
			+ "(select  max(apt.other_staff_id)from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as otherStaffId,"
			+ "(select max(apt.loc_id)from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId})  as locId,"
			+ "(select fn_get_emp_concat_details(max(apt.emp_id)) from at_pr_patient a, at_pr_appt apt where a.patient_id =apt.patient_id "
			+ "and apt.patient_id=#{patientId}) as doctorDetails,fn_get_emp_concat_details(max(appt.ref_id)) as refDocDetails, "
			+ "(select max(apt.emp_id) from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as empId, "
			+ "date_format(date(now()), '%d-%M-%Y') as scheduleDt,"
			+ "(select max(apt.visit_type) from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as patVisitId,"
			+ "(select max(date_format(reg.reg_valid_upto, '%d-%m-%Y')) from at_pr_reg reg, at_pr_patient a where reg.patient_id=a.patient_id "
			+ "and reg.patient_id=#{patientId} and reg_status=34 ) as regValidDt,  (select max(date_format(appt.op_valid_till, '%d-%m-%Y')) from at_pr_patient p, at_pr_appt appt where p.patient_id=appt.patient_id \n" + 
			"			 and appt.patient_id=#{patientId} and status_id=34 ) as conValidDt \n" + 
			"			 "
			+ "FROM at_pr_patient p, at_pr_appt appt, at_hr_emp e, at_hr_specialization spec where p.patient_id=#{patientId} and appt.emp_id=e.emp_id and "
			+ "e.spec_id=spec.spec_id and p.status_id = 34  group by patientId";*/
	String GETPATLIST = "select p.patient_id as patientId, p.patient_name as pname, concat(if(p.last_name is null,' ',p.last_name)) as lname, title as ptitle, care_by as careBy,"
			+ "concat(if(care_by_name is null,' ',care_by_name)) as careByName, sms_alert as smsAlert, sms_status as smsStatus, p.marital_status as maritalStatus,"
			+ "p.nationality as nationality, p.religion as religion,p.blood_grp as bloodGrp, p.occupation as pntOccupation, p.id_proof_type as idProofType,"
			+ "p.id_proof_num as idProofNum, (select max(a.org_id) from at_pr_patient a "
			+ "where  a.patient_id=#{patientId}) as patientCategory,"
			+ "(select fn_getcodevalue(max(apt.org_id)) from at_pr_patient a, at_pr_appt apt "
			+ "where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as pntCat,"
			+ "max(appt.org_id) as orgName,p.age as age,"
			+ " p.mob_num as mobNum, p.gender as gender, date_format(p.reg_dt,'%d-%b-%Y') as regDt,"
			+ "p.state as state, p.city as city,"
			+ "(select case when"
			+ "(select date_format(str_to_date(p.dob, '%Y-%m-%d'), '%Y-%m-%d') "
			+ "from at_pr_patient p where p.patient_id = #{patientId}) is null then "
			+ "DATE_SUB((select date(p.added_on) from at_pr_patient p where p.patient_id=#{patientId}), INTERVAL "
			+ "(select p.age from at_pr_patient p where p.patient_id=#{patientId}) year)"
			+ "else (select date_format(str_to_date(p.dob, '%Y-%m-%d'), '%Y-%m-%d') from at_pr_patient p where p.patient_id = #{patientId})"
			+ "end) as dob,p.umr_num as umrSec,"
			+ "p.age_m as ageMonths,p.age_d as ageDays,concat(if(p.village is null,' ',p.village)) as village, p.addr as addr, "
			+ "p.pic_details as picName,p.attendee_pic_details as picNamee, max(patient_appt_id),  max(appt.org_id) as orgName, "
			+ "(select max(apt.ref_type)from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as refType, "
			+ "(COALESCE((SELECT MAX(apt.ref_id) FROM at_pr_patient a, at_pr_appt apt WHERE a.patient_id = apt.patient_id "
			+ "AND apt.patient_id = #{patientId}), 0)) AS refId, "
			+ "(COALESCE((SELECT MAX(apt.other_hosp_id)  FROM at_pr_patient a, at_pr_appt apt WHERE a.patient_id = apt.patient_id "
			+ "AND apt.patient_id = #{patientId}), 0)) AS otherHospId, "
			+ "(COALESCE((SELECT MAX(apt.other_staff_id) FROM at_pr_patient a, at_pr_appt apt WHERE a.patient_id = apt.patient_id "
			+ "AND apt.patient_id = #{patientId}), 0)) AS otherStaffId ,"
			+ "(select max(a.location_id)from at_pr_patient a where  a.patient_id=#{patientId})  as locId,"
			+ "(select fn_get_emp_concat_details(max(apt.emp_id)) from at_pr_patient a, at_pr_appt apt where a.patient_id =apt.patient_id "
			+ "and apt.patient_id=#{patientId}) as doctorDetails,fn_get_emp_concat_details(max(appt.ref_id)) as refDocDetails, "
			+ "(select max(apt.emp_id) from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and apt.patient_id=#{patientId}) as empId, "
			+ "date_format(date(now()), '%d-%M-%Y') as scheduleDt,"
			+ "(COALESCE((SELECT max(apt.visit_type)  FROM at_pr_patient a, at_pr_appt apt WHERE a.patient_id = apt.patient_id "
			+ "AND apt.patient_id = #{patientId}), 0)) AS patVisitId, "
			+ "(select max(date_format(reg.reg_valid_upto, '%d-%m-%Y')) from at_pr_reg reg, at_pr_patient a where reg.patient_id=a.patient_id "
			+ "and reg.patient_id=#{patientId} and reg_status=34 ) as regValidDt,  (select max(date_format(appt.op_valid_till, '%d-%m-%Y')) from at_pr_patient p, at_pr_appt appt where p.patient_id=appt.patient_id "
			+ "and appt.patient_id=#{patientId} and status_id=34 ) as conValidDtm,"
			+ "(select apptp.patient_category from at_pr_patient pp, at_pr_appt apptp where pp.patient_id=apptp.patient_id "
			+ "and apptp.patient_id=#{patientId} and status_id=34 ORDER BY apptp.patient_appt_id DESC  LIMIT 1) as patientLike,p.org_id as orgId,p.patient_category as patientCategoryOrgId  "
			+ "FROM at_pr_patient p, at_pr_appt appt, at_hr_emp e, at_hr_specialization spec where p.patient_id=#{patientId} and appt.emp_id=e.emp_id and "
			+ "e.spec_id=spec.spec_id and p.status_id = 34  group by patientId ";
	@Select(GETPATLIST)
	PatientModel getPatList(PatientModel patientModel);

	String GETREGPATLIST = "select p.pat_details_suv_id as regPatientId,0 as patientId , p.PATIENTNAME as pname,p.PATIENTTITLE as ptitle, case GUARDIANREL "
			+ "when 'S/O' then 'Son' when 'M/O' then 'Mother' when 'F/O' then 'Father' when 'D/O' then 'Daughter' when 'H/O' then 'Husband'"
			+ " when 'W/O' then 'Wife' end as careBy,p.MARITALSTATUS as maritalStatus,p.NATIONALITY as nationality, p.OCCUPATION as pntOccupation,"
			+ "p.IDPROOFNAME as idProofType,p.IDPROOFNO as idProofNum, p.PATIENTTYPE as pntCat,p.ORGANIZATIONNAME as orgName, "
			+ "(select date_format(now(),'%Y')- date_format(a.DOB,'%Y') from at_pat_details_suv a where "
			+ "a.pat_details_suv_id=#{regPatientId})as age,"
			+ "p.PHONENO as mobNum, p.GENDER as gender,date_format(p.REGISTRATIONDT,'%d-%b-%Y') as regDt, "
			+ "case STATENAME when 'ANDHRA PRADESH' then 'AP' when 'ORISSA' then 'OR' when 'CHATTISGADH' then 'CG' when 'WEST BENGAL' then 'WB'"
			+ " when 'ANDAMAN AND NICOBAR ISLANDS' then 'AN'when 'ARUNACHAL PRADESH' then 'AR' when 'ASSAM' then 'AS'when 'BIHAR' then 'BR'"
			+ " when 'TELANGANA' then 'TS' when 'TAMIL NADU' then 'TN' end as state,"
			+ " p.CITYNAME as city, date_format(p.DOB, '%Y-%m-%d') as dob,fn_get_pat_type(p.REFERENCETYPE) as refType, p.ADDRESS as addr,"
			+ "p.REFERENCETYPE as REFERENCETYPE, DOCTORNAME as doctorDetails,FATHERNAME as FATHERNAME, REGISTRATIONNO as REGISTRATIONNO,"
			+ "date_format(REGISTRATIONVALIDDT, '%d-%m-%Y') as regValidDt,REGISTRATIONFEE as REGISTRATIONFEE,DEPARTMENTNAME as DEPARTMENTNAME,"
			+ "REFERENCENAME as REFERENCENAME,REGISTRATIONTYPE as REGISTRATIONTYPE FROM at_pat_details_suv p "
			+ "where p.pat_details_suv_id=#{regPatientId} group by regPatientId";
	@Select(GETREGPATLIST)
	PatientModel getRegPatList(PatientModel patientModel);

	String GETVISITYPE="select visit_type as visitType from at_pr_appt where patient_appt_id=#{apptId}";
	@Select(GETVISITYPE)

	FeeModel getVisitType(FeeModel feeModel);

	String GETPATIENTDETAILSONBILLID="select pat.patient_id as patientId, concat(if (pat.title is null,' ',pat.title),'',pat.patient_name,"
			+ "' ',if (pat.last_name is null,' ',pat.last_name)) as pname,pat.title as ptitle, pat.umr_num as umrNo, "
			+ "concat(CASE WHEN pat.age IS NULL OR pat.age = '' THEN '0' ELSE pat.age END,'Y','/',' ' , "
			+ "CASE WHEN pat.age_m IS NULL OR pat.age_m = '' THEN '0' ELSE pat.age_m END,'M','/',' ', "
			+ "CASE WHEN pat.age_d IS NULL OR pat.age_d = '' THEN '0' ELSE pat.age_d END,'D' ,' ','/',' ') as age,"
			+ "pat.gender as gender, pat.mob_num as mobNum, "
			+ "concat(date_format(max(bills.bill_dt), '%d-%b-%Y'),' ',time_format(time(max(bills.bill_dt)),'%h:%i %p')) as billDate,"
			+ "time_format(time(max(bills.bill_dt)),'%h:%i %p') as billTime,date_format(pat.dob,'%d-%m-%Y') as dob, "
			+ "fn_get_emp_name(pat.emp_id) as empName,spec.spec_name as specName, max(bills.bill_num) as billNum,"
			+ "max(bills.added_on) as addedOn,max(bills.added_by) as addedBy"
			+ "from at_pr_patient pat, at_hr_emp emp, at_hr_specialization spec,"
			+ "at_bills bills where pat.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and"
			+ "pat.patient_id=bills.patient_id and  bills.bill_id=#{billId}";

	@Select(GETPATIENTDETAILSONBILLID)
	PatientModel getPatientDetailsOnBillId(FeeModel feeModel);


	String GETBILLSERVICES="select bill_id as billId,amt as fee, discount_amt as discount, final_amt as amount,"
			+ "discount_amt as discountAmount,ser.source_service_id as serviceId,log.patient_appt_id as apptId "
			+ "from at_bill_details log, at_source_service ser "
			+ "where bill_id = #{billId} and ser.source_service_id=log.service_id";
	@Select(GETBILLSERVICES)
	List<PatientModel> getBillServices(FeeModel feeModel);

	String GETBILLDETAILSONBILLID="select tot_amt as totalAmount,bill_amt as billAmount,paid_amt as amountReceived,"
			+ "balance as balance from at_bills where bill_id=#{billId}";
	@Select(GETBILLDETAILSONBILLID)
	PatientModel getBillDetailsOnBillId(FeeModel feeModel);


	String GETDOCNAME="select fn_get_emp_name(max(hr.emp_id)) as empName, spec.spec_name as specName"
			+ "from at_hr_emp hr, at_hr_specialization spec where hr.spec_id=spec.spec_id and hr.emp_id=#{empId}";

	PatientModel getDocName(FeeModel feeModel);

	String GETREGBILL= "select pat.patient_id as patientId,appt.patient_appt_id as apptId, pat.patient_name as pname, pat.title as ptitle, "
			+ "pat.dob as dob,pat.umr_num as umrNo, pat.age as age,pat.age_m as ageMonths, pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, "
			+ "pat.religion as religion, reg.reg_num as regNum, date_format(reg.reg_dt, '%d-%b-%Y') as regDt, "
			+ "date_format(reg.reg_valid_upto, '%d-%b-%Y') as regValidDt, pat.last_name as lName, pat.care_by as careBy, "
			+ " pat.care_by_name as careByName,pat.marital_status as maritalStatus, pat.nationality as nationality, "
			+ " pat.occupation as occupation,pat.addr as addr, pat.city as city, fn_getcodevalue(pat.ref_type) as refType, "
			+ "rec.receipt_no as recptNo,rec.receipt_date as recptDate, ass.charge as regFees, bill.discount_amt as discAmt, "
			+ "rec.amt_received as amountReceived, fn_get_emp_name(appt.emp_id) as empName, spec.spec_name as specName, hr.emp_regno as empCode, "
			+ "(select count(bill.bill_id) from at_bill_details bill where bill.bill_id=#{billId}) as billCount "
			+ "from at_pr_patient pat, at_bills bills, at_bill_details bill, at_pr_appt appt,at_hr_emp hr, "
			+ " at_hr_specialization spec,at_bill_receipts rec, at_source_service assc, at_source_service_consult ass, at_pr_reg reg "
			+ "where pat.patient_id=appt.Patient_id and pat.patient_id=reg.patient_id and pat.patient_id=bills.patient_id "
			+ " and appt.patient_appt_id=bill.patient_appt_id and appt.emp_id=hr.emp_id and bill.bill_id=bills.bill_id and "
			+ "bills.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id and hr.emp_id= assc.equp_service_id "
			+ "and hr.spec_id=spec.spec_id and assc.source_service_id= ass.source_service_id and reg.reg_status=34  and "
			+ " appt.patient_appt_id=#{apptId} and bills.bill_id=#{billId} group by appt.patient_appt_id ";

	@Select(GETREGBILL)
	PatientModel getRegBill(FeeModel feeModel);

	String GETCONBILL="select pat.patient_id as patId, pat.patient_name as pname,pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, "
			+ "pat.age as age,pat.age_m as ageMonths, pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, fn_get_emp_name(appt.emp_id) as empName,  "
			+ "spec_name as specName, fn_getcodevalue(appt.ref_type) as refType, op_num as opNum, "
			+ "date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, "
			+ "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, "
			+ " rec.receipt_date as recptDate, charge_per_unit as consFees, bill.discount_amt as discAmt, "
			+ "final_amt as finalAmt, (bill.final_amt-bills.balance) as billAmt, amt_received as amountReceived, "
			+ "rec.balance as balance,appt.token_num as tokenNum "
			+ " from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, at_hr_specialization spec, "
			+ " at_bills bills, at_bill_details bill, at_bill_receipts rec, at_source_service_consult ass ,at_source_service assc "
			+ " where pat.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and "
			+ " pat.patient_id=bills.patient_id and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id and "
			+ " bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id and ass.source_service_id=bill.service_id "
			+ "and ass.source_service_id=assc.source_service_id and appt.patient_appt_id=bill.patient_appt_id and "
			+ " assc.equp_service_id=emp.emp_id and bills.bill_id=#{billId} and "
			+ "appt.patient_appt_id=#{apptId} group by appt.patient_appt_id order by receipt_id asc ";

	@Select(GETCONBILL)
	PatientModel getConBill(FeeModel feeModel);


	String GetCheckDocLeave="Select a.emp_id as empId , doc_availability as docAvailability from "
			+ "at_pr_doc_availability a , at_hr_emp e where a.emp_id = #{empId} and a.emp_id=e.emp_id and "
			+ "a.status_id = 34  "
			+ "and a.day_of_week=sf_pr_getDayOfWeek(dayname(#{scheduleDt})) and a.doc_availability ='Available' ";


	@Select(GetCheckDocLeave)
	List<PatientModel> getDocleaves(PatientModel patientModel);



	String GETPATQUEREGBILL= "select pat.patient_id as patientId, pat.patient_name as pname, pat.title as ptitle, "
			+ "pat.umr_num as umrNo, pat.age as age,pat.age_m as ageMonths, pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, "
			+ "pat.religion as religion, reg.reg_num as regNum, date_format(reg.reg_dt, '%d-%b-%Y') as regDt,hr.qualification as qualification,"
			+ "date_format(reg.reg_valid_upto, '%d-%b-%Y') as regValidDt, pat.last_name as lName, pat.care_by as careBy, "
			+ " pat.care_by_name as careByName,pat.marital_status as maritalStatus, pat.nationality as nationality, "
			+ " pat.occupation as occupation,pat.addr as addr, pat.city as city, fn_getcodevalue(pat.ref_type) as refType, "
			+ "rec.receipt_no as recptNo,rec.receipt_date as recptDate, ass.charge as regFees, bill.discount_amt as discAmt, "
			+ "rec.amt_received as amountReceived, fn_get_emp_name(appt.emp_id) as empName, spec.spec_name as specName, hr.emp_regno as empCode, "
			+ "(select count(bill.bill_id) from at_bill_details bill where bill.patient_appt_id=#{patApptId}) as billCount "
			+ "from at_pr_patient pat, at_bills bills, at_bill_details bill, at_pr_appt appt,at_hr_emp hr, "
			+ " at_hr_specialization spec,at_bill_receipts rec, at_source_service assc, at_source_service_consult ass, at_pr_reg reg "
			+ "where pat.patient_id=appt.Patient_id and pat.patient_id=reg.patient_id and pat.patient_id=bills.patient_id "
			+ " and appt.patient_appt_id=bill.patient_appt_id and appt.emp_id=hr.emp_id and bill.bill_id=bills.bill_id and "
			+ "bills.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id and hr.emp_id= assc.equp_service_id "
			+ "and hr.spec_id=spec.spec_id and assc.source_service_id= ass.source_service_id and reg.reg_status=34  and "
			+ " appt.patient_appt_id=#{patApptId}  group by appt.patient_appt_id ";

	@Select(GETPATQUEREGBILL)
	PatientModel getPatQueRegBill(PatientModel patientModel);


	String GETPATQUECONBILL="select pat.patient_id as patId, pat.patient_name as pname,pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, "
			+ "pat.age as age,pat.age_m as ageMonths, pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, fn_get_emp_name(appt.emp_id) as empName,  "
			+ "spec_name as specName, fn_getcodevalue(appt.ref_type) as refType, op_num as opNum, "
			+ "date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, "
			+ "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, "
			+ " rec.receipt_date as recptDate, charge_per_unit as consFees, bill.discount_amt as discAmt, "
			+ "final_amt as finalAmt, (bill.final_amt-bills.balance) as billAmt, amt_received as amountReceived, "
			+ "rec.balance as balance,appt.token_num as tokenNum "
			+ " from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, at_hr_specialization spec, "
			+ " at_bills bills, at_bill_details bill, at_bill_receipts rec, at_source_service_consult ass ,at_source_service assc "
			+ " where pat.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and "
			+ " pat.patient_id=bills.patient_id and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id and "
			+ " bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id and ass.source_service_id=bill.service_id "
			+ "and ass.source_service_id=assc.source_service_id and appt.patient_appt_id=bill.patient_appt_id and "
			+ " assc.equp_service_id=emp.emp_id  and "
			+ "appt.patient_appt_id=#{patApptId} group by appt.patient_appt_id order by receipt_id asc ";

	@Select(GETPATQUECONBILL)
	PatientModel getPatQueConBill(PatientModel patientModel);



	String GETOTHERDOCS = "select other_doctor_id as otherDoctorId, other_doctor_code as otherDoctorCode, " 
			+ "other_doctor_name as otherDoctorName, alias_name as aliasName from at_pr_op_outsource_doctor where " 
			+ "status_id=34 ";
	@Select(GETOTHERDOCS)
	List<PatientModel> getOtherDoctorsList();



	String SETPATATTACH ="insert into at_pr_op_pateint_attachment (patient_id,attach_name,attach_description,added_ip,added_by,added_on,status_id) "
			+ "values(#{patientId},#{attachmentName},#{description},#{addedIp},#{addedBy},now(),34 )";  

	@Insert(SETPATATTACH)	  
	int setPatientAttachments(PatientModel patientModel);

	String GETATTACHMENTS = "select attach_name as attachmentName,attach_description as description,attach_id as attachmentId,"
			+ "passport_num as passportNum,passport_issue_date as passportIssuedDt,file_type as patientType,"
			+ "passport_expire_date as passportExpiryDt from at_pr_patient_attachs where patient_id=#{patientId} and "
			+ " status_id=34 ";

	@Select(GETATTACHMENTS)
	List<PatientModel> getAttachments(PatientModel patientModel);


	String COUNTOFATTACHEDFILES = "select count(attach_name) as attachmentCount from at_pr_patient_attachs "
			+ "where patient_id=#{patientId} and status_id=34 ";

	@Select(COUNTOFATTACHEDFILES)
	PatientModel getDocCount(PatientModel patientModel);

	void insertProjectDocDetails(PatientModel patientModel);

	String SETPROJECTATTACHMENTS = "insert into at_pr_patient_attachs (patient_id,attach_name,attach_description,file_type, "
			+ "added_ip,added_by,added_on,status_id,passport_num,passport_issue_date,passport_expire_date) "
			+ "values(#{patientId},#{attachmentName},#{description},#{patientType},#{addedIp},#{addedBy},now(),"
			+ "34 ,#{passportNum},#{passportIssuedDt},#{passportExpiryDt})";

	@Insert(SETPROJECTATTACHMENTS)
	int setProjectAttachments(PatientModel patientModel);

	String SETFILE = "insert into at_pr_op_pateint_attachment (patient_id,attach_name,attach_description,added_ip,added_by,added_on,status_id) "
			+ "values(#{patientId},#{attachmentName},#{description},#{addedIp},#{addedBy},now(),34 )";  
	@Insert(SETFILE)
	int setFile(PatientModel patientModel);


	String GETPATFILE = "select attach_name as attachmentName,attach_description as description,attach_id as  "
			+ " attachmentId from at_pr_op_pateint_attachment where patient_id=#{patientId} and "
			+ " status_id=34  ";
	@Select(GETPATFILE)
	List<PatientModel> getPatFileAttachments(PatientModel patientModel);


	String GETEXTRATOKENS="select extra_token_num as tokenNum , extra_token_status as tokenStatus, "
			+ "TIME_FORMAT(start_time, '%H:%i %p') as startTime, "
			+ "TIME_FORMAT(end_time, '%H:%i %p') as endTime, start_time as time1, end_time as time2 "
			+ "from at_pr_extra_tokens where emp_id = #{empId} and schedule_dt = #{reqDate} ";
	/*order by extra_token_num";
	 */	@Select (GETEXTRATOKENS)
	 List<ExtraDoctorSlots> callExtraDocSlots(ExtraDoctorSlots slots);


	 String GETEXTRACOUNT ="select extra_token_num from at_pr_extra_tokens where emp_id=#{empId} and schedule_dt =#{scheduleDt}";
	 @Select (GETEXTRACOUNT)
	 List<PatientModel> getSlotsCount(PatientModel patientModel);

	 String GETSPECIALIZATIONS="select spec_id as specializationId,spec_code as specializationCode, "
			 + " spec_name as specialization from at_hr_specialization ";

	 @Select(GETSPECIALIZATIONS)
	 List<PatientModel> getSpecialization(PatientModel pntModel);


	 String SETINAVCTIVE ="update at_pr_patient_attachs set status_id = fn_getcodevalue_id('STS','INACTIVE'),"
			 + " modified_by = #{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = now() where attach_id = #{attachmentId}";
	 @Update(SETINAVCTIVE)
	 int setAttachmentInactive(PatientModel patientModel);



	 String PASSDET="select passport_num as passportNum,passport_issue_date as passportIssuedDt, "
			 + "passport_expire_date as passportExpiryDt from at_pr_patient_attachs where patient_id=#{patientId} and "
			 + "status_id=34  limit 1";
	 @Select(PASSDET)
	 PatientModel getPassportDetailsView(PatientModel patientModel);

	 /** used for JSON**/ 
	 String getPatDet = "select pr.patient_id as pntId, pr.patient_name as pntName,pr.last_name as lastName, " 
			 + "concat(umr_num, ' / ', patient_name, ' / ', emp.emp_name, ' / ', " 
			 + "pr.mob_num) as pntCode,  pr.last_name as lastName, " 
			 + "pr.gender as gender, pr.mob_num as pntMobNum, emp.emp_name as conName, " 
			 + "appt.patient_appt_id as apptId, DATE_FORMAT(STR_TO_DATE(date(appt.schedule_dt), "
			 + "'%Y-%m-%d'), '%d-%b-%Y') as appDate, fn_getcodevalue_name(visit_type) as vType, " 
			 + "op_num as opNum, pr.umr_num as umrNo,pr.dob as dob,pr.mob_num as mobnum,"
			 + " emp.emp_name as empName from " 
			 + "at_pr_patient pr, at_pr_appt appt, at_hr_emp emp where " 
			 + "pr.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and " 
			 + "fn_getcodevalue_name(appt_status_id) != 'Cancelled'";
	 @Select(getPatDet)
	 List<PatientModel> getPatDet(PatientModel patientModel);


	 String getPntDetails="select p.presc_id as prescId,pic.pic_id as picId,group_concat(pic.pic_id , '-', pic.pic_name) as picNames, " + 
			 "    p.presc_num as prescNum, p.presc_date as prescDate,p.umr_num  as umrNo, "
			 + "pr.pic_details as picName , pr.attendee_pic_details as picNamee, " + 
			 "     concat(pr.patient_name,' ',pr.last_name)as pntName,p.op_num as opNum,p.appt_id as apptId, " + 
			 "    concat(pr.umr_num, ' / ', pr.patient_name,' ',pr.last_name,  ' / ', emp.emp_name, ' / ', pr.mob_num) as pntCode, " + 
			 "     pr.gender as gender, pr.dob as dob, pr.mob_num as mobNum, emp.emp_name as conName, " + 
			 "     p.patient_id as pntId, p.visit_type as vType, p.appt_date  as appDate from at_pr_mr_prescription p, " + 
			 "     at_pr_mr_presc_pic pic, at_pr_patient pr, at_hr_emp emp, at_pr_appt appt where pr.patient_id=appt.patient_id " + 
			 "     and pr.patient_id=p.patient_id and appt.patient_appt_id=p.appt_id and appt.emp_id=emp.emp_id and appt.emp_id=#{empId} and " + 
			 "    p.presc_id=pic.presc_id group by p.presc_id ";
	 @Select(getPntDetails)

	 List<PatientModel> getPntDetails(PatientModel patientModel);


	 String getPatDetailsMob="select p.presc_id as prescId,pic.pic_id as picId,group_concat(pic.pic_id , '-', pic.pic_name) as picNames, " + 
			 "    p.presc_num as prescNum, p.presc_date as prescDate,p.umr_num  as umrNo, "
			 + "pr.pic_details as picName , pr.attendee_pic_details as picNamee, " + 
			 "     concat(pr.patient_name,' ',pr.last_name)as pntName,p.op_num as opNum,p.appt_id as apptId, " + 
			 "    concat(pr.umr_num, ' / ', pr.patient_name,' ',pr.last_name,  ' / ', emp.emp_name, ' / ', pr.mob_num) as pntCode, " + 
			 "     pr.gender as gender, pr.dob as dob, pr.mob_num as mobNum, emp.emp_name as conName, " + 
			 "     p.patient_id as pntId, p.visit_type as vType, p.appt_date  as appDate from at_pr_mr_prescription p, " + 
			 "     at_pr_mr_presc_pic pic, at_pr_patient pr, at_hr_emp emp, at_pr_appt appt where pr.patient_id=appt.patient_id " + 
			 "     and pr.patient_id=p.patient_id and appt.patient_appt_id=p.appt_id and appt.emp_id=emp.emp_id and appt.emp_id=#{empId} and " + 
			 "    p.presc_id=pic.presc_id group by p.presc_id ";
	 @Select(getPatDetailsMob)

	 List<PatientModel> getPntDetailsMob(PatientModel patientModel);


	 Object setPresDetails(PatientModel patientModel);


	 Object getPrescPicDetails(PatientModel patient);


	 String setPrescPic =
			 "insert into at_pr_mr_presc_pic(pic_name, presc_id, added_on, added_ip, added_by, status_id)" +
					 "values(#{picNames},#{prescId}, now(), #{addedIp}, #{addedBy}, 34 )";

	 @Insert(setPrescPic) 

	 public int setPrescPic(PatientModel patientModel);


	 String SETPICATTACH ="insert into at_pr_mr_presc_pic(pic_name, presc_id, added_on, added_ip, added_by, status_id) "
			 + "values(#{attachmentPicName},#{prescId}, now(), #{addedIp}, #{addedBy}, 34 )";
	 @Insert(SETPICATTACH)
	 int setPatPrescAttachments(PatientModel patientModel);



	 String GETPRESCBYID="select pic.pic_id as picId,pic.pic_name as attachmentPicName, pic.presc_id as prescId "
			 + "from at_pr_mr_presc_pic pic,at_pr_mr_prescription pre where pic.presc_id=pre.presc_id and pic.presc_id=#{prescId} "
			 + "and pic.status_id=34  and pre.status_id=34 ";

	 @Select(GETPRESCBYID)
	 List<PatientModel> getPrescreptions(PatientModel patientModel);



	 String updatePresPicsDetails = "insert into at_pr_mr_presc_pic(pic_name, presc_id, added_on, added_ip, added_by, status_id) "
			 + "values(#{attachmentPicName},#{prescId}, now(), #{addedIp}, #{addedBy}, 34 )";

	 @Update(updatePresPicsDetails)
	 public int updatePresPicsDetails(PatientModel patientModel);



	 String deletePrescPics ="update at_pr_mr_presc_pic set status_id = fn_getcodevalue_id('STS','INACTIVE'),"
			 + " modified_on =  now(), modified_by = #{modifiedBy}, modified_ip = #{modifiedIp}"
			 + " where presc_id = #{prescId} and pic_id = #{picId}"; 

	 @Update(deletePrescPics)
	 public int deletePrescPics(PatientModel patientModel);


	 String getPrescriptionsPics="select pic.pic_id as picId,pic.pic_name as attachmentPicName, pic.presc_id as prescId "
			 + "from at_pr_mr_presc_pic pic,at_pr_mr_prescription pre where pic.presc_id=pre.presc_id and pic.presc_id=#{prescId} "
			 + "and pic.status_id=34  and pre.status_id=34 ";

	 @Select(getPrescriptionsPics)
	 List<PatientModel> getPrescriptionsPics(PatientModel patientModel);


	 String getpatdetforPrescriptionsPics="select p.presc_num as prescNum, p.umr_num as umrNo," 
			 + " concat(pr.patient_name,' ',pr.last_name)as pntName,  ifnull( pr.mob_num,'Empty')as mobNum "
			 + " from  at_pr_mr_prescription p, at_pr_patient pr where p.umr_num=pr.umr_num and p.presc_id = #{prescId}";

	 @Select(getpatdetforPrescriptionsPics)
	 PatientModel getpatdetforPrescriptionsPics(PatientModel patientModel);


	 String getEmpIdByUserName="select emp_id as userEmpId from at_security_users where user_name=#{addedBy}"
			 + " and status_id =34 ;";

	 @Select(getEmpIdByUserName)
	 PatientModel getEmpId(PatientModel patientModel);




	 String getPatientsByDocIdandDt="select pr.patient_id as pntId, pr.patient_name as pntName,pr.last_name as lastName, pr.age as age, "
			 + "concat(pr.umr_num, ' / ', patient_name, ' / ', emp.emp_name, ' / ', pr.mob_num) as pntCode, pr.last_name as lastName, "
			 + "pr.gender as gender, pr.mob_num as pntMobNum, emp.emp_name as conName, appt.patient_appt_id as apptId, "
			 + "pr.village as village,pr.patient_category as pntCat, DATE_FORMAT(STR_TO_DATE(date(appt.schedule_dt), '%Y-%m-%d'), '%d-%b-%Y') as appDate, "
			 + "fn_getcodevalue_name(appt.visit_type) as vType, appt.op_num as opNum, pr.umr_num as umrNo,pr.dob as dob, "
			 + "appt.token_num as tokenNum,pr.mob_num as mobnum, emp.emp_name as empName, concat(l.loc_name) as location, appt.loc_id as locId, "
			 + "l.loc_name as locName from at_pr_patient pr, at_pr_appt appt,at_hr_emp emp,at_location l ,at_pr_mr_prescription presc  "
			 + "where pr.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and fn_getcodevalue_name(appt_status_id) != 'Cancelled' "
			 + "and appt.emp_id=#{userEmpId} and  appt.loc_id=l.loc_id and appt.schedule_dt between  "
			 + "date_format(str_to_date(#{fromDt},'%d-%b-%Y'),'%Y-%m-%d') and  date_format(str_to_date(#{toDt},'%d-%b-%Y'),'%Y-%m-%d') and "
			 + " appt.patient_appt_id not in(select appt_id from at_pr_mr_prescription where appt_date between  #{fromDt} and #{toDt}) "
			 + "group by appt.patient_appt_id";
	 @Select(getPatientsByDocIdandDt)
	 List<PatientModel> getPntDetailsByDoc(PatientModel patientModel);


	 String getPatientsByDocIdandDtForMob=
			 "select pr.patient_id as pntId, pr.patient_name as pntName,pr.last_name as lastName, pr.age as age,"
					 + " pr.pic_details as picName , pr.attendee_pic_details as picNamee, "
					 + "concat(pr.umr_num, ' / ', patient_name, ' / ', emp.emp_name, ' / ', pr.mob_num) as pntCode, pr.last_name as lastName, "
					 + "pr.gender as gender, pr.mob_num as pntMobNum, emp.emp_name as conName, appt.patient_appt_id as apptId, "
					 + "pr.village as village,pr.patient_category as pntCat, DATE_FORMAT(STR_TO_DATE(date(appt.schedule_dt), '%Y-%m-%d'), '%d-%b-%Y') as appDate, "
					 + "fn_getcodevalue_name(appt.visit_type) as vType, appt.op_num as opNum, pr.umr_num as umrNo,pr.dob as dob, "
					 + "appt.token_num as tokenNum,pr.mob_num as mobnum, emp.emp_name as empName, concat(l.loc_name) as location, appt.loc_id as locId, "
					 + "l.loc_name as locName from at_pr_patient pr, at_pr_appt appt,at_hr_emp emp,at_location l ,at_pr_mr_prescription presc  "
					 + "where pr.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and fn_getcodevalue_name(appt_status_id) != 'Cancelled' "
					 + "and appt.emp_id=#{userEmpId} and  appt.loc_id=l.loc_id and appt.schedule_dt between  "
					 + "date_format(str_to_date(#{fromDt},'%d-%b-%Y'),'%Y-%m-%d') and  date_format(str_to_date(#{toDt},'%d-%b-%Y'),'%Y-%m-%d') and "
					 + " appt.patient_appt_id not in(select appt_id from at_pr_mr_prescription where appt_date between  #{fromDt} and #{toDt}) "
					 + "group by appt.patient_appt_id";
	 @Select(getPatientsByDocIdandDtForMob)
	 List<PatientModel> getPntDetailsByDocForMobile(PatientModel patientModel);



	 String GETPRESCBYIDPATID="select pic.pic_id as picId,pic.pic_name as attachmentPicName, pic.presc_id as prescId "
			 + "from at_pr_mr_presc_pic pic,at_pr_mr_prescription pre where pic.presc_id=pre.presc_id "
			 + " and pre.patient_id=#{pntId} and pic.status_id=34  and "
			 + "pre.status_id=34 ";

	 @Select(GETPRESCBYIDPATID)
	 List<PatientModel> getPrescreptionsByPatId(PatientModel patientModel);


	 String GETPRESCBYIDPATIDMOB="select  pic.pic_id as picId,pic.pic_name as attachmentPicName, pic.presc_id as prescId, "
			 + "(select count(*) from at_pr_mr_presc_pic pic,at_pr_mr_prescription pre where pic.presc_id=pre.presc_id "
			 + " and pre.patient_id=#{pntId} and pic.status_id=34  and "
			 + " pre.status_id=34 ) as attachmentCount "
			 + " from at_pr_mr_presc_pic pic,at_pr_mr_prescription pre where pic.presc_id=pre.presc_id "
			 + "and pre.patient_id=#{pntId} and pic.status_id=34  and "
			 + "pre.status_id=34 ";

	 @Select(GETPRESCBYIDPATIDMOB)
	 List<PatientModel> getPrescreptionsByPatIdForMobile(PatientModel patientModel);





	 String UPDATEPATIMAGE="update at_pr_patient  set pic_details = #{attachmentPicName} where patient_id = #{patientId}";

	 @Update(UPDATEPATIMAGE)
	 int updatePatPic(PatientModel patientModel);


	 String UPDATEATTIMAGE="update at_pr_patient  set attendee_pic_details = #{attachmentPicName} where patient_id = #{patientId}";

	 @Update(UPDATEATTIMAGE)
	 int updateAttendeePic(PatientModel patientModel);

	 String updatePatCatName="update at_pr_patient  set patient_category_name =#{patCatName}  where patient_id = #{patientId}";
	 @Update(updatePatCatName)
	 void updatePatCatName(PatientModel patientModel);



	 String SETSUVPICATTACH ="insert into at_suvarna_prescription_pics(prescription_name, presc_id, added_on, added_ip, added_by, status_id) "
			 + "values(#{attachmentPicName},#{prescId}, now(), #{addedIp}, #{addedBy}, 34 )";
	 @Insert(SETSUVPICATTACH)
	 int setSuvPrescAttachments(PatientModel patientModel);


	 String SUVPATDET="select presc_id as prescId, umr_number as umrNo, added_on as addedOn from at_suvarna_prescriptions";

	 @Select(SUVPATDET)
	 List<PatientModel> getSuvPatDetails(PatientModel patientModel);


	 String SUVPRESCPICS ="select spp.pic_id as picId, spp.presc_id as prescId, spp.prescription_name as attachmentPicName from at_suvarna_prescription_pics spp,\n" + 
			 "at_suvarna_prescriptions sp where spp.presc_id=sp.presc_id and status_id =34  "
			 + " and spp.presc_id=#{prescId}";
	 @Select (SUVPRESCPICS)
	 List<PatientModel> getSuvPrescreptionsByPrescId(PatientModel patientModel);


	 String UPDTSUVSTS="update at_suvarna_prescription_pics set status_id = fn_getcodevalue_id('STS','Inactive') , "
			 + "modified_on =  now(), modified_by = #{modifiedBy}, modified_ip = #{modifiedIp} "
			 + "where pic_id = #{picId} and presc_id=#{prescId} ";

	 @Update(UPDTSUVSTS)
	 int delSuvPrescPics(PatientModel patientModel);

	 String SUVPICPRINT ="select pic.pic_id as picId,pic.prescription_name as attachmentPicName, pic.presc_id as prescId , "
			 + "pre.umr_number as umrNo from at_suvarna_prescription_pics pic,at_suvarna_prescriptions pre where pic.presc_id=pre.presc_id and "
			 + "pic.presc_id=#{prescId}  and pic.status_id=34  ";
	 @Select(SUVPICPRINT)
	 List<PatientModel> getSuvPrescPics(PatientModel patientModel);

	 String UPDTSUVUMRNO="update at_suvarna_prescriptions set umr_number =#{umrNo} ,modified_on=now(), modified_by=#{addedBy}, "
			 + "modified_ip=#{addedIp} where presc_id=#{prescId}";
	 @Update(UPDTSUVUMRNO)
	 int getUpdateUmrnum(PatientModel patientModel);


	 String GETSTAFFDOC ="select emp_id as empId, emp_name as empName "
			 + "from at_hr_emp where status_id=34  and emp_type ='Doctor' ";
	 @Select(GETSTAFFDOC)
	 List<PatientModel> getStaffDocList();

	 String GETPaymentTypes =" select v.code_val_id as payTypeId , v.val_code as payTypeName from "
			 + " at_std_code_values v,at_std_code c where c.std_code = 'PAYTYPE' and  v.std_code_id = c.std_code_id";
	 @Select(GETPaymentTypes)
	 List<PatientModel> getPaymentTypeList();

	 String GETPAYMODE="select bank_id as bankId, bank_name as bankNames from at_banks where status_id=34 ";
	 @Select(GETPAYMODE)
	 List<PatientModel> getPaymentMode(PatientModel pntModel);


	 String insertchequeType="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id,card_num,added_on,added_by,added_ip,bank_name)"
			 + "values(#{pbillId},#{cashPts},#{amountss},#{transNos},#{bankNames},#{chequeDates},#{serviceIdCon},#{creditNos},now(),#{addedBy},#{addedIp},#{cardBankName})";
	 @Insert(insertchequeType)
	 void insertchequeType(PatientModel patientModel);


	 String PAYMENTTYPEMETHOD="select code_val_id as payTypeId,val_code as payTypeName from at_std_code sc,"
			 + " at_std_code_values scv where sc.std_code='PAYTYPE' and sc.std_code_id=scv.std_code_id"
			 + " and code_val_id!=279";

	 @Select(PAYMENTTYPEMETHOD)
	 List<PatientModel> getPaymenttype();


	 String insertUpiType="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id,card_num,card_type,expiry_date,added_on,added_by,added_ip,bank_name)"
			 + "values(#{pbillId},#{cashPts},#{amountss},#{transNos},#{bankNames},#{chequeDates},#{serviceIdCon},#{creditNos},#{cardTypes},#{expDates},now(),#{addedBy},#{addedIp},#{cardBankName})";
	 @Insert(insertUpiType)
	 void insertUpiType(PatientModel patientModel);

	 String GETVISITID = "select visit_id as visitId from at_pr_visits v , at_pr_appt ap where v.patient_appt_id=ap.patient_appt_id and v.patient_appt_id=#{patApptId}";
	 @Select(GETVISITID)
	 PatientModel getPatVisitId(String string);


	 String getPatRegPrintDet = "select pat.patient_id as patientId,appt.patient_appt_id as patApptId, pat.patient_name as pname, pat.title as ptitle, pat.umr_num as umrNo, "
			 + "concat(CASE WHEN pat.age is NULL OR pat.age = '' OR pat.age = 0 THEN '' ELSE concat(pat.age,'Y') END,CASE WHEN pat.age_m is NULL OR pat.age_m = '' OR pat.age_m = 0 THEN '' ELSE concat('/',pat.age_m,'M') END,CASE WHEN pat.age_d is NULL OR pat.age_d = '' OR pat.age_d = 0 THEN '' ELSE concat('/',pat.age_d,'D') END) as age,pat.age_m as ageMonths, pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum,bill.added_by as addedBy,DATE_FORMAT(STR_TO_DATE(bill.added_on, '%Y-%m-%d'), '%d-%b-%Y')  as addedOn,'inwords' as amtInwords, "
			 + "IF(pat.religion is NULL ,'Not Specified', pat.religion) as religion,round(rec.amt_received,0) as roundofAmtReceived,"
			 + "reg.reg_num as regNum, date_format(reg.reg_dt, '%d-%b-%Y') as regDt,hr.qualification as qualification, (select charge_per_unit from at_bill_details bill where service_id=11 and bill.patient_appt_id=#{patApptId}) as consFees,"
			 + "date_format(reg.reg_valid_upto, '%d-%b-%Y') as regValidDt, pat.last_name as lName, pat.care_by as careBy,appt.reg_duplicate_print as regprint, "
			 + "pat.care_by_name as careByName,pat.marital_status as maritalStatus,IF(pat.nationality is NULL ,'Not Specified', pat.nationality) as nationality,pat.occupation as occupation,"
			 + "concat(if(pat.country is NULL,' ',pat.country), ' , ',if(pat.state is NULL,' ',pat.state),',',if(pat.city is NULL,' ',pat.city),',',if(pat.village is NULL,' ',pat.village) ) as addr, pat.city as city, fn_getcodevalue(pat.ref_type) as refType, rec.receipt_no as recptNo,CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as recptDate,"
			 + " bill.charge_per_unit as regFees, bill.discount_amt as discAmt, rec.amt_received as amountReceived, fn_get_emp_name(appt.emp_id) as empName,"
			 + " spec.spec_name as specName, hr.emp_regno as empCode,pat.outside_org_id as outSideOrg,pat.patient_category_name as orgName,concat(CASE WHEN appt.ref_id is NULL OR appt.ref_id = '' OR appt.ref_id = 0 THEN '' ELSE fn_get_emp_name(appt.ref_id) END,"
			 + "CASE WHEN appt.ref_type = 8 THEN fn_getcodevalue(appt.ref_type) ELSE '' END,"
			 + "CASE WHEN appt.other_hosp_id is NULL OR appt.other_hosp_id = '' OR appt.other_hosp_id = 0 THEN '' ELSE fn_get_other_hosp_name(appt.other_hosp_id) END,CASE WHEN appt.other_staff_id is NULL OR appt.other_staff_id = '' OR appt.other_staff_id = 0 THEN '' ELSE fn_get_other_staff_name(appt.other_staff_id) END) as staffName from at_pr_patient pat, at_bills bills, at_bill_details bill, "
			 + "at_pr_appt appt,at_hr_emp hr, at_hr_specialization spec,at_bill_receipts rec, at_source_service assc, at_source_service_consult ass, "
			 + "at_pr_reg reg where pat.patient_id=appt.Patient_id and pat.patient_id=reg.patient_id and pat.patient_id=bills.patient_id and "
			 + "appt.patient_appt_id=bill.patient_appt_id and appt.emp_id=hr.emp_id and bill.bill_id=bills.bill_id and bills.bill_id=rec.bill_id "
			 + "and bill.bill_details_id=rec.bill_details_id and hr.emp_id= assc.equp_service_id and hr.spec_id=spec.spec_id and "
			 + "assc.source_service_id= ass.source_service_id and service_id=1 and reg.reg_status=34  and "
			 + "bills.bill_id=#{billId} group by appt.patient_appt_id";
	 @Select(getPatRegPrintDet)
	 PatientModel getPatRegPrintDet(PatientModel patientModel);

	 String getPatsubDeatils="select pat.patient_id as patId, pat.patient_name as pname,pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, "
			 + "pat.age as age,pat.age_m as ageMonths, pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, fn_get_emp_name(appt.emp_id) as empName,  "
			 + "spec_name as specName, fn_getcodevalue(appt.ref_type) as refType, op_num as opNum,bill.added_by as addedBy,DATE_FORMAT(STR_TO_DATE(bill.added_on, '%Y-%m-%d'), '%d-%b-%Y')  as addedOn, "
			 + "date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, "
			 + "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, "
			 + " CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as recptDate, charge_per_unit as consFees, bill.discount_amt as discAmt, "
			 + "final_amt as finalAmt, (bill.final_amt-bills.balance) as billAmt, amt_received as amountReceived,round(bill.final_amt-bills.balance,0) as roundofBillAmt, "
			 + "rec.balance as balance,appt.token_num as tokenNum "
			 + " from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, at_hr_specialization spec, "
			 + " at_bills bills, at_bill_details bill, at_bill_receipts rec, at_source_service_consult ass ,at_source_service assc "
			 + " where pat.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and "
			 + " pat.patient_id=bills.patient_id and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id and "
			 + " bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id and ass.source_service_id=bill.service_id "
			 + "and ass.source_service_id=assc.source_service_id and appt.patient_appt_id=bill.patient_appt_id and "
			 + " assc.equp_service_id=emp.emp_id  and "
			 + "appt.patient_appt_id=#{patApptId} group by appt.patient_appt_id order by receipt_id asc ";

	 @Select(getPatsubDeatils)
	 PatientModel getPatsubDeatils(PatientModel patientModel);
	 String GETVITALIST = "select vital_id as vitalId, vital_name as vitalName, vital_code as " 
			 + "vitalCode, uom.uom_id as uomId, uom.uom_code as uom from at_vitals vital, " 
			 + "at_unit_of_measure uom where vital.uom_id=uom.uom_id and " 
			 + "vital.status_id=34 ";
	 @Select(GETVITALIST)
	 List<PatientModel> getVitalList(PatientModel pntModel);
	 String getPntVitals = "select group_concat(vv.vital_value separator ',') as vitalValue,blood_grp as bloodGrp " + 
			 " from at_pr_visit_vitals vv,at_vitals vital, at_unit_of_measure uom where patient_id = #{patientId} and patient_appt_id = #{apptId} "
			 + "and vv.vital_id=vital.vital_id and uom.uom_id=vital.uom_id group by patient_id,patient_appt_id";
	 @Select(getPntVitals)
	 PatientModel getPntVitals(PatientModel patientModel);

	 String insertRegistration="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id,card_num,added_on,added_by,added_ip,bank_name)"
			 + "values(#{pbillId},#{cashPts},#{regAmount},#{transNos},#{bankNames},#{chequeDates},#{serviceIdReg},#{creditNos},now(),#{addedBy},#{addedIp},#{cardBankName})";
	 @Insert(insertRegistration)
	 void insertRegistration(PatientModel patientModel);

	 String getRegServiceId="select service_id as serviceIdReg from at_services where service_name='Registration' and status_id=34";
	 @Select(getRegServiceId)
	 String getRegServiceId(PatientModel patientModel);

	 String getconServiceId="select service_id as serviceIdReg from at_services where service_name='Consultation' and status_id=34";
	 @Select(getconServiceId)

	 String getconServiceId(PatientModel patientModel);

	 String getPayModeBillNumber="select service_id as serviceId from at_receipt_mode where service_id=1 and bill_id=#{pbillId} limit 1";
	 @Select(getPayModeBillNumber)
	 String getPayModeBillNumber(PatientModel patientModel);





	 int setUpdatePaymentSts(PaymentEnqPayloadModel enqResponse);


	 //create a payment data then insert into at_anyemi_dev_payment table 
	 String setPatAnyEmiPayment="insert into at_anyemi_dev_payment (pat_name,amount,phone,OrderId,added_on,emp_id) "
			 + "values(#{patientName},#{billAmt},#{mobNum},#{orderId},now(),#{empId})";
	 @Insert(setPatAnyEmiPayment)
	 int setPatAnyEmiPayment(PatientModel pntModel);

	 // if status is Credit then update data into the at_anyemi_dev_payment table 
	 String updatePatAnyEmiPayment="update at_anyemi_dev_payment set paystarOrderId=#{PAYSTAROrderId},Bankid=#{bankid},"
			 + "paymentrefernceid=#{paymentrefernceid},status=#{status},amount=#{amount},DateTime=#{DateTime},paymentmode=#{paymentmode} "
			 + " where OrderId=#{orderId}";
	 @Update(updatePatAnyEmiPayment)
	 int updatePatAnyEmiPayment(PatientModel pntModel);

	 String getAnyEmiPaymentDetails="select pat_name as patientName,pat_device_id as anyEmiId,phone as mobNum,"
			 + "OrderId as orderId,paystarOrderId as PAYSTAROrderId,Bankid as bankid,amount as amount,paymentmode as paymentmode,"
			 + "status as status from at_anyemi_dev_payment where pat_name=#{patientName} and emp_id=#{empId} and phone=#{mobNum}"
			 + " and date(added_on)=date(now())";
	 @Select(getAnyEmiPaymentDetails)
	 PatientModel getAnyEmiPaymentDetails(PatientModel pntModel);
	 // if status is Credit then update data into the at_anyemi_dev_payment table 
	 String updatePatAnyEmidet="update at_anyemi_dev_payment set amount=#{billAmt},OrderId=#{orderId},emp_id=#{empId},added_on=now() "
			 + "where pat_name=#{patientName} and phone=#{mobNum} and emp_id=#{empId} and date(added_on)=date(now())";
	 @Update(updatePatAnyEmidet)
	 int updatePatAnyEmidet(PatientModel pntModel);

	 String updatePatAnyEmiPaymentRefund="update at_anyemi_dev_payment set ref_amount=#{amount},refundId=#{refundId},"
			 + "refID=#{refID},status_msg=#{status_msg} where OrderId=#{orderId}";
	 @Update(updatePatAnyEmiPaymentRefund)
	 int updatePatAnyEmiPaymentRefund(PatientModel pntModel);




	 String getpayLinkstatus="select name as patName,phone as patPhNum,amount as patAmount," 
			 + " emp_id as patEmpId ,txn_id as patTransId ,merchant_id as merchantId ,payment_sts as patPaymentSts, "
			 + "date as payDate from at_anyemi_paylink where name=#{name} and emp_id=#{empId} and phone = #{phone}"
			 + " and date(date)=date(now()) and status=34";

	 @Select(getpayLinkstatus)
	 PaymentReqPayloadModel getpayLinkstatus(PaymentReqPayloadModel paymentReq);



	 String setPaymentSts=" insert into at_anyemi_paylink (name,phone,amount,emp_id,txn_id,merchant_id,payment_sts,date,status)"
			 + " values (#{name},#{phone},#{amount},#{empId},#{txn_id},#{merchant_txn_id},#{payment_status},date(now()),34 )";
	 @Insert(setPaymentSts)
	 int setPaymentSts(PaymentReqPayloadModel paymentReq);


	 String setUpdatePaymentSts="update at_anyemi_paylink set name=#{name},phone=#{phone},amount=#{amount},emp_id=#{empId}"
			 + "txn_id=#{txn_id},merchant_id=#{merchant_txn_id},payment_sts=#{payment_status},date=date(now()),status=34 ";

	 @Insert(setUpdatePaymentSts)
	 int setUpdatePaymentSts(PaymentReqPayloadModel paymentReq);
	 String getpayLinkstatuss="select name as patName,phone as patPhNum,amount as patAmount," 
			 + " emp_id as patEmpId ,txn_id as patTransId ,merchant_id as merchantId ,payment_sts as patPaymentSts, "
			 + "date as payDate from at_anyemi_paylink where name=#{patientName} and emp_id=#{empId} and phone = #{mobileNum}"
			 + " and date(date)=date(now()) and status=34";

	 @Select(getpayLinkstatuss)
	 PaymentReqPayloadModel getpayLinkstatuss(SMSModel smsModel);


	 String setDocumentUpload ="insert into at_nabh_documentation(document_name,doc_code, document_date, department_name, file,description,upload_emp_name, status_id,added_by,added_on,added_ip)" +
			 "values(#{docNameNew},#{docCode},#{deliverDtNew}, #{docTypeNew},#{attachmentName},#{description},#{uploadedByNew},34, #{addedBy},now(),#{addedIp})";
	 @Insert(setDocumentUpload) 
	 int setDocumentUpload(PatientModel pntModel);

	 String getAllDepartments="select user_id as userId,user_name as user from at_security_users where user_id in (789,753,54,752,804,53,788,790,757,66,800,12,63,8,776,790,791,754,1,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822)";
	 @Select(getAllDepartments)
	 List<PatientModel> getAllDepartments();


	 String getAllAdmin="select emp_name as empName,emp_id empId from at_hr_emp where emp_id in (148);";
	 @Select(getAllAdmin)
	 List<PatientModel> getAllAdmin();


	 String getAllDocuments="select doc_id as docId,doc_code as docCode,document_date as deliverDtNew,department_name as docTypeNew,document_name as docNameNew,upload_emp_name as uploadedByNew,"
			 + "description as description,file as attachmentPicName from at_nabh_documentation where status_id=34 order by doc_code ASC";
	 @Select(getAllDocuments)
	 List<PatientModel> getAllDocuments();


	 String getDocCode="select concat(prefix,last_used+inc_by) as grnCode FROM at_series WHERE series_name ='NABH'";
	 @Select(getDocCode)
	 String getDocCode(PatientModel pntModel);


	 String updateDocCode="UPDATE at_series SET last_used =last_used+1,modified_on = now() where series_name = 'NABH'";
	 @Update(updateDocCode)
	 void updateDocCode(PatientModel pntModel);


	 String getAllDocumentsWise="select doc_code as docCode,document_date as deliverDtNew,department_name as docTypeNew,document_name as docNameNew,upload_emp_name as uploadedByNew,"
			 + "description as description,file as attachmentPicName from at_nabh_documentation where status_id=34 and department_name=#{userName} order by doc_code ASC";
	 @Select(getAllDocumentsWise)
	 List<PatientModel> getAllDocumentsWise(PatientModel pntModel);



	 String DELETEDEPT = "update at_nabh_documentation  set status_id=fn_getcodevalue_id('STS',"
			 + " 'INACTIVE'), modified_by=#{modifiedBy}, modified_on=now(), modified_ip="
			 + "#{modifiedIp} where doc_id=#{docId}";


	 //Here we can delete data it means the status_id will be change when we are deleting data  
	 @Update(DELETEDEPT)

	 int deleteDepartment(PatientModel pntModel);

	 String setFileUpdateStatus="update at_pr_appt set file_status=1 where patient_appt_id=#{apptId}";




	 @Update(setFileUpdateStatus)
	 void setFileUpdateStatus(PatientModel patientModel);



	 String GETPATIENTALLERGIES = "select visit_id as visitId, "
			 + "(select stdValues.val_name from at_std_code_values stdValues"
			 + "  where stdValues.std_code_id = 52 and stdValues.code_val_id=va.allergy_type_id) as allergyType,"
			 + "allergy_id as allergyName,  "
			 + "(select stdValues.val_name from at_std_code_values stdValues"
			 + "  where std_code_id = 53 and stdValues.code_val_id=va.allergy_reaction) as allergyReaction, "
			 + "    allergy_notes as allergyNote,"
			 + "	patient_id as patientId from at_pr_visit_allergies va "
			 + "	where patient_id=#{patientId} and allergy_id!='' and status_id=34 ;";



	 @Select(GETPATIENTALLERGIES)
	 List<PatientModel> getPatientAllergies(Integer patientId);


	 String INSERTALLERGYDETAILS = "insert into at_pr_visit_allergies(visit_id,allergy_type_id,allergy_id,allergy_reaction,allergy_notes,"
			 + "status_id,added_by,added_on,added_ip)"
			 + " values(#{visitId},#{allergyTypeId},#{allergyName},#{allergyReaction},#{allergyNote},"
			 + "34 ,#{addedBy},now(),#{addedIp})";
	 @Insert(INSERTALLERGYDETAILS)
	 int insertAllergyDetails(PatientModel patientModel);


	 String GETSTDCODEVALUESLIST = "select std.std_code_id as stdCodeId, std.std_desc "
			 + "as stdValue, std.std_code as stdCde, stdv.code_val_id as stdCodeValId, "
			 + "stdv.val_name as stdCodeValueName, stdv.val_code as stdCodeValue from "
			 + "at_std_code std, at_std_code_values stdv where std.std_code_id=stdv.std_code_id "
			 + "and stdv.std_code_id=#{stdCodeId}";


	 @Select(GETSTDCODEVALUESLIST)
	 List<PatientModel> getStdCodeValuesList(String string);



	 String DELETEALLERGYDETAILS = "UPDATE at_pr_visit_allergies SET status_id = fn_getcodevalue_id('STS','INACTIVE'),"
			 + "modified_by = #{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = now() "
			 + "WHERE patient_id = #{patientId} AND allergy_id = #{allergyName}";
	 @Update(DELETEALLERGYDETAILS)
	 int deleteAllergyDetails(PatientModel patientModel);

	 String getMenu ="select menu_id as menuId,menu_name as menuName from at_indus_canteen_menu where status_id =34 ";
	 @Select(getMenu)
	 List<PatientModel> getMenu(PatientModel patientModel);



	 String setItems="Insert into at_indus_canteen_list (menu_id,item_name,price,added_by,added_ip,added_on,status_id) values(#{menuId},#{itemName},#{price},"
			 + "#{addedBy},#{addedIp},now(),34 )";
	 @Insert(setItems)
	 int setItems(PatientModel patientModel);

	 String getTiffins ="select item_id as itemId,me.menu_name as menuName,li.item_name as itemName,li.price as price,item_availble_status as itemAvilStatus from at_indus_canteen_list li,at_indus_canteen_menu me "
			 + " where li.menu_id =me.menu_id and li.status_id =34 ";
	 @Select(getTiffins)
	 List<PatientModel> getTiffins(PatientModel patientModel);

	 String setItemsStatus ="update at_indus_canteen_list set item_availble_status=#{itemAvilStatus} where item_id=#{itemId}";
	 @Update(setItemsStatus)
	 int setItemsStatus(PatientModel patientModel);


	 String getitemsList="select item_id as itemId,item_name as itemName,price as price,item_availble_status as itemAvilStatus from at_indus_canteen_list";
	 @Select(getitemsList)
	 List<PatientModel> getitemsList(PatientModel patientModel);


	 String getTiffinOrder="select item_id as itemId,item_name as itemName from at_indus_canteen_list where item_availble_status=1 and item_id=#{itemId}";
	 @Select(getTiffinOrder)
	 List<PatientModel> getTiffinOrder(PatientModel patientModel);
	 /*
	  * String
	  * getEmpDetails="select emp.emp_id as employeeId,concat(emp.emp_code, ' / ', emp.emp_name, '/',emp.mobile) as employeeName,"
	  * +
	  * "emp.emp_name as empName, emp.mobile as empMob,dept.dept_name as departmentName,emp.emp_code as empCode,dept.dept_id as deptmentId "
	  * +
	  * "from at_hr_emp emp,at_departments dept where emp.dept_id=dept.dept_id and emp.status_id = 34"
	  * ;
	  * 
	  * @Select(getEmpDetails) List<PatientModel> getEmpDetails();
	  */

	 String setOrders="insert into at_indus_canteen_order_dtls (item_id,patient_id,mob_num,patient_name,"
			 + "room_no,bread_omlet,bread_omlet_qty,butter_milk,butter_milk_qty,chicken_dum_biryani,"
			 + "chicken_dum_biryani_qty,chicken_fry_biryani,chicken_fry_biryani_qty,cofee,cofee_qty,"
			 + "dosa,dosa_qty,fruit_salad,fruit_salad_qty,idly,idly_qty,kabool_chena,kabool_qty,kommu_chena,"
			 + "kommu_qty,lemon_juice,lemon_qty,meals_with_out_egg,meals_with_out_egg_qty,meals_with_egg,meals_with_egg_qty,"
			 + "milk,milk_qty,millet_dosa,millet_dosa_qty,poha,poha_qty,pongal,pongal_qty,pulka,pulka_qty,sweet_corn,"
			 + "sweet_corn_soup_qty,tea,tea_qty,tomota_soup,tomota_soup_qty,upma,upma_qty,total_price,added_by,added_ip,added_on,status_id,millet_idly,millet_idly_qty)values(#{itemId},"
			 + "#{patientId},#{mobNum},#{patName},#{bedNum},#{price9},#{omletcount},#{price16},#{butMilkcount},#{price10},#{dummcount},"
			 + "#{price11},#{frycount},#{price14},#{cofeecount},#{price5},#{dosacount},#{price19},#{fruitcount},#{price},#{idlycount},"
			 + "#{price22},#{kaboolcount},#{price21},#{kommucount},#{price15},#{lemoncount},#{price8},#{mealscount},#{price20},#{mealsEggcount},"
			 + "#{price12},#{milkcount},#{price6},#{millDosacount},#{price1},#{pohacount},#{price4},#{pongalcount},#{price7},#{pulkacount},"
			 + "#{price17},#{sweetcount},#{price13},#{teacount},#{price18},#{tomotocount},#{price2},#{upmacount},#{grandTotal},"
			 + "#{addedBy},#{addedIp},now(),34 ,#{price3},#{millIdlycount})";
	 @Insert(setOrders)
	 int setOrders(PatientModel patientModel);

	 String orderDtls="select dt.order_id as orderId,dt.patient_id as patientId,pr.patient_name as patName,pr.mob_num as mobNum,concat(ward.ward_name,'/',room.room_name,'/',bed.bed_num)as bedNum,"
			 + "bread_omlet as price9,bread_omlet_qty AS omletcount," + 
			 "butter_milk as price16,butter_milk_qty AS butmilkcount," + 
			 "chicken_dum_biryani as price10,chicken_dum_biryani_qty AS dummcount," + 
			 "chicken_fry_biryani as price11,chicken_fry_biryani_qty AS frycount," + 
			 "cofee as price14,cofee_qty AS cofeecount," + 
			 "dosa as price5,dosa_qty AS dosacount," + 
			 "fruit_salad as price19,fruit_salad_qty AS fruitcount," + 
			 "idly as price,idly_qty AS idlycount," + 
			 "kabool_chena as price22,kabool_qty AS kaboolcount," + 
			 "kommu_chena as price21,kommu_qty AS kommucount," + 
			 "lemon_juice as price15,lemon_qty AS lemoncount," + 
			 "meals_with_out_egg as price8,meals_with_out_egg_qty AS mealscount," + 
			 "meals_with_egg as price20,meals_with_egg_qty AS mealsEggcount," + 
			 "milk as price12,milk_qty AS milkcount," + 
			 "millet_dosa as price6,millet_dosa_qty AS millDosacount," + 
			 "millet_idly as price3,millet_idly_qty AS millIdlycount," + 
			 "poha as price1,poha_qty AS pohacount," + 
			 "pongal as price4,pongal_qty AS pongalcount," + 
			 "pulka as price7,pulka_qty AS pulkacount," + 
			 "sweet_corn as price17,sweet_corn_soup_qty AS sweetcount," + 
			 "tea as price13,tea_qty > 0 AS teacount," + 
			 "tomota_soup as price18,tomota_soup_qty AS tomotocount," + 
			 "upma as price2,upma_qty AS upmacount,total_price as grandTotal,CASE WHEN order_status = 0 THEN 'conformed' WHEN order_status = 1 THEN 'InProgress' WHEN order_status = 2 THEN 'cancelled' ELSE order_status END as orderStatus "
			 + "FROM at_indus_canteen_order_dtls dt,at_pr_patient pr,at_ward ward,at_room_master room,at_room_master_beds bed,at_pr_ip p "
			 + "where date(dt.added_on)=date(now()) and dt.patient_id=pr.patient_id and p.patient_id=pr.patient_id "
			 + "and bed.room_id=room.room_id and room.ward_id=ward.ward_id and p.bed_num = bed.bed_num group by order_id";
	 @Select(orderDtls)
	 List<PatientModel> getOrderDetailsOnDt(PatientModel patientModel);


	 String setOrderStatus ="update at_indus_canteen_order_dtls set order_status=#{orderStatus} where order_id=#{orderId}";
	 @Update(setOrderStatus)

	 int setOrderStatus(PatientModel patientModel);

	 String GETVITALISTFORPDF = "select vital_id as vitalId, concat(vital.vital_name,'(',uom.uom_code,')') as vitalName, vital_code as " 
			 + "vitalCode, uom.uom_id as uomId, uom.uom_code as uom from at_vitals vital, " 
			 + "at_unit_of_measure uom where vital.uom_id=uom.uom_id and vital.vital_id in (1,3,5,6,7,8,12,11,2) and " 
			 + "vital.status_id=34  order by vital.priority_for_print " ;
	 @Select(GETVITALISTFORPDF)
	 List<PatientModel> getVitalListForPdf();

	 String getconsultPrint="select app.patient_appt_id as apptId,pr.patient_id as patientId,pr.title as ptitle,pr.umr_num as pntCode,"
			 + "pr.patient_name as pntName,concat(pr.age,'Years','/',pr.gender) as pntAge,emp.specialization as specialization,app.op_num as opNum,pr.mob_num as pntMobNum,"
			 + "emp.emp_id as empId,concat(emp.last_name,' ',emp.emp_name) as empName,CASE WHEN occupation='0' then 'Not Specified' else occupation END as occupation,fn_getcodevalue_name(app.visit_type) as visitType,"
			 + "pr.addr as addr,DATE_FORMAT(app.schedule_time, '%d %M %Y / %H:%i:%s') as schDt,emp.qualification as qualification,"
			 + "emp.emp_code as empRegNo,pv.diagnosis as diagnosis,concat(CASE WHEN app.ref_id is NULL OR app.ref_id = '' OR app.ref_id = 0 THEN '' ELSE fn_get_emp_name(app.ref_id) END,\n" + 
			 "			 CASE WHEN app.other_hosp_id is NULL OR app.other_hosp_id = '' OR app.other_hosp_id = 0 \n" + 
			 "             THEN '' ELSE fn_get_other_hosp_name(app.other_hosp_id) END,\n" + 
			 "             CASE WHEN app.other_staff_id is NULL OR app.other_staff_id = '' OR app.other_staff_id = 0 \n" + 
			 "             THEN '' ELSE fn_get_other_staff_name(app.other_staff_id) END) as refType "
			 + "from at_pr_patient pr,at_pr_appt app,at_hr_emp emp, "
			 + "at_pr_visits pv where pr.patient_id=#{patientId} and app.patient_appt_id=#{apptId} and "
			 + "pr.patient_id=app.patient_id and app.emp_id=emp.emp_id group by umr_num";
	 @Select(getconsultPrint)
	 PatientModel getconsultPrint(PatientModel patientModel);

	 String getBarCodeNumber=" select bar_code as barcodeNumber from at_pr_appt where patient_appt_id=#{apptId}";
	 @Select(getBarCodeNumber)
	 String getBarCodeNumber(PatientModel patientModel);

	 String getGenerateUmrNum="select umr_num as pntCode from at_pr_patient pr,at_pr_appt appt where appt.patient_id=pr.patient_id and appt.patient_appt_id=#{apptId}";
	 @Select(getGenerateUmrNum)
	 String getGenerateUmrNum(PatientModel patientModel);

	 String getUpdateBarCodeNumber="update at_pr_appt set bar_code=#{barcodeNumber} where patient_appt_id=#{apptId}";
	 @Select(getUpdateBarCodeNumber)
	 void getUpdateBarCodeNumber(PatientModel patientModel);

	 String getUpdateUmrNum="update at_pr_patient set  umr_num=#{pntCode} where patient_id=#{pntId} ";
	 @Select(getUpdateUmrNum)
	 void getUpdateUmrNum(PatientModel patientModel);

	 String getNewVital="select * from at_pr_visit_vitals where patient_id =#{pntId} and patient_appt_id = #{apptId}" ;
	 @Select(getNewVital)
	 List<PatientModel> getNewVital(PatientModel patientModel);

	 String updateApttVitalStatus="update at_pr_appt set vital_status=1 where patient_appt_id=#{apptId}";
	 @Update(updateApttVitalStatus)
	 void updateApttVitalStatus(PatientModel patientModel);

	 String setVisitVitalsNo ="insert into at_pr_visit_vitals(vital_id,vital_value,patient_id,patient_appt_id,blood_grp,status_id,added_by,"
			 + "added_on,added_ip) values(#{vitalId},#{vitalValue},#{pntId},#{apptId},#{bloodGrp},34,#{addedBy},now(),#{addedIp})";
	 @Insert(setVisitVitalsNo)
	 void setVisitVitalsNo(PatientModel patientModel);

	 String deletePrev="DELETE FROM at_pr_visit_vitals WHERE patient_id =#{pntId} and patient_appt_id =  #{apptId} ";
	 @Delete(deletePrev)
	 void deletePrev(PatientModel patientModel);


	 String getVitalPrint="select  vital.vital_id as vitalId, vital.vital_name as vitalName, vital_value as vitalValue from "
			 + "at_pr_visit_vitals vv,at_vitals vital, at_unit_of_measure uom where patient_id =#{patientId} and "
			 + "patient_appt_id=#{apptId} and vv.vital_id=vital.vital_id  and uom.uom_id=vital.uom_id and vv.patient_id=vv.patient_id";
	 @Select(getVitalPrint)
	 List<PatientModel> getVitalPrint(PatientModel patientModel);





	 /*
	  * String
	  * getPatConsultatinDeatils="select pat.patient_id as patId, pat.patient_name as pname,"
	  * +
	  * "pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, pat.age as age,pat.age_m as ageMonths,"
	  * + " pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, " +
	  * "fn_get_emp_name(appt.emp_id) as empName, spec_name as specName, " +
	  * "fn_getcodevalue(appt.ref_type) as refType, op_num as opNum,pat.patient_category_name as patientCategory,"
	  * +
	  * "bill.added_by as addedBy,DATE_FORMAT(STR_TO_DATE(bill.added_on, '%Y-%m-%d'), '%d-%b-%Y') as addedOn,"
	  * +
	  * " date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, "
	  * +
	  * "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as printDt, bills.paid_amt as consFees, bill.discount_amt as discAmt, "
	  * +
	  * "bills.paid_amt as finalAmt, (bills.paid_amt-bills.balance) as billAmt, bills.paid_amt as amountReceived,"
	  * +
	  * "round(bills.paid_amt-bills.balance,0) as roundofBillAmt, rec.balance as balance,"
	  * +
	  * "appt.token_num as tokenNum from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, "
	  * +
	  * "at_hr_specialization spec, at_bills bills, at_bill_details bill, at_bill_receipts rec, "
	  * +
	  * "at_source_service_consult ass ,at_source_service assc where pat.patient_id=appt.patient_id "
	  * +
	  * "and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and pat.patient_id=bills.patient_id "
	  * +
	  * "and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id "
	  * +
	  * "and bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id "
	  * +
	  * "and ass.source_service_id=bill.service_id and ass.source_service_id=assc.source_service_id "
	  * +
	  * "and appt.patient_appt_id=bill.patient_appt_id and assc.equp_service_id=emp.emp_id "
	  * +
	  * "and appt.patient_appt_id=#{patApptId} group by appt.patient_appt_id order by receipt_id asc "
	  * ;
	  */


	 /*commented by srinivas this querry return the total amount 650 but we need
	 only consultant fee*/


	 /*
	  * String
	  * getPatConsultatinDeatils="select pat.patient_id as patId, pat.patient_name as pname,"
	  * +
	  * "pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, pat.age as age,pat.age_m as ageMonths,"
	  * + " pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, " +
	  * "fn_get_emp_name(appt.emp_id) as empName, spec_name as specName, " +
	  * "fn_getcodevalue(appt.ref_type) as refType, op_num as opNum,pat.patient_category_name as patientCategory,"
	  * +
	  * "bill.added_by as addedBy,DATE_FORMAT(STR_TO_DATE(bill.added_on, '%Y-%m-%d'), '%d-%b-%Y') as addedOn,"
	  * +
	  * " date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, "
	  * +
	  * "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as printDt, ass.doc_amt as consFees, "
	  * +
	  * "bill.discount_amt as discAmt,rec.balance as balance,appt.token_num as tokenNum,ass.doc_amt as finalAmt,(ass.doc_amt-bills.balance) as billAmt,ass.doc_amt as amountReceived,round(ass.doc_amt-bills.balance,0) as roundofBillAmt,ass.source_service_id as sourceServiceId from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, "
	  * +
	  * "at_hr_specialization spec, at_bills bills, at_bill_details bill, at_bill_receipts rec, "
	  * +
	  * "at_source_service_consult ass ,at_source_service assc where pat.patient_id=appt.patient_id "
	  * +
	  * "and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and pat.patient_id=bills.patient_id "
	  * +
	  * "and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id "
	  * +
	  * "and bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id "
	  * +
	  * "and ass.source_service_id=bill.service_id and ass.source_service_id=assc.source_service_id "
	  * +
	  * "and appt.patient_appt_id=bill.patient_appt_id and assc.equp_service_id=emp.emp_id "
	  * +
	  * "and appt.patient_appt_id=#{patApptId} and ass.source_service_id=#{sourceServiceId} and ass.visit_type_id=#{visitTypeId} "
	  * +
	  * "and ass.tariff_id=4 group by appt.patient_appt_id order by receipt_id asc ";
	  */
	 //comment by srinivas just remove ass.source_service_id
	 /*
	  * String
	  * getPatConsultatinDeatils="select pat.patient_id as patId, pat.patient_name as pname,"
	  * +
	  * "pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, pat.age as age,pat.age_m as ageMonths,"
	  * + " pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, " +
	  * "fn_get_emp_name(appt.emp_id) as empName, spec_name as specName, " +
	  * "fn_getcodevalue(appt.ref_type) as refType, op_num as opNum,pat.patient_category_name as patientCategory,"
	  * +
	  * "bill.added_by as addedBy,DATE_FORMAT(STR_TO_DATE(bill.added_on, '%Y-%m-%d'), '%d-%b-%Y') as addedOn,"
	  * +
	  * " date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit, "
	  * +
	  * "fn_get_std_value(appt.patient_category) as pntCat, rec.receipt_no as recptNo, CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as printDt, ass.doc_amt as consFees, "
	  * +
	  * "bill.discount_amt as discAmt,rec.balance as balance,appt.token_num as tokenNum,ass.doc_amt as finalAmt,(ass.doc_amt-bills.balance) as billAmt,ass.doc_amt as amountReceived,round(ass.doc_amt-bills.balance,0) as roundofBillAmt,ass.source_service_id as sourceServiceId from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, "
	  * +
	  * "at_hr_specialization spec, at_bills bills, at_bill_details bill, at_bill_receipts rec, "
	  * +
	  * "at_source_service_consult ass ,at_source_service assc where pat.patient_id=appt.patient_id "
	  * +
	  * "and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and pat.patient_id=bills.patient_id "
	  * +
	  * "and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id "
	  * +
	  * "and bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id "
	  * +
	  * "and ass.source_service_id=bill.service_id and ass.source_service_id=assc.source_service_id "
	  * +
	  * "and appt.patient_appt_id=bill.patient_appt_id and assc.equp_service_id=emp.emp_id "
	  * +
	  * "and appt.patient_appt_id=#{patApptId} and ass.visit_type_id=#{visitTypeId} "
	  * +
	  * "and ass.tariff_id=4 group by appt.patient_appt_id order by receipt_id asc ";
	  */


	 String
	 getPatConsultatinDeatils="select pat.patient_id as patId, pat.patient_name as pname,"
			 +
			 "pat.last_name as lName, pat.title as ptitle, pat.umr_num as umrNo, concat(CASE WHEN pat.age is NULL OR pat.age = '' OR pat.age = 0 THEN '' ELSE concat(pat.age,'Y') END,CASE WHEN pat.age_m is NULL OR pat.age_m = '' OR pat.age_m = 0 THEN '' ELSE concat('/',pat.age_m,'M') END,CASE WHEN pat.age_d is NULL OR pat.age_d = '' OR pat.age_d = 0 THEN '' ELSE concat('/',pat.age_d,'D') END) as age,pat.age_m as ageMonths,"
			 + " pat.age_d as ageDays, pat.gender as gender, pat.mob_num as mobNum, " +
			 "fn_get_emp_name(appt.emp_id) as empName, spec_name as specName,"
			 + " cb.r_chart_name as payTypeName, " +
			 "fn_getcodevalue(appt.ref_type) as refType, op_num as opNum,pat.patient_category_name as patientCategory,"
			 +
			 "bill.added_by as addedBy,DATE_FORMAT(STR_TO_DATE(bill.added_on, '%Y-%m-%d'), '%d-%b-%Y') as addedOn,"
			 +
			 " date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit,duplicate_print as print, "
			 +
			 "fn_get_std_value(bills.patient_category) as pntCat, rec.receipt_no as recptNo, CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as printDt, ass.doc_amt as consFees, "
			 + "bill.discount_amt as discAmt,rec.balance as balance,appt.token_num as tokenNum,ass.doc_amt as finalAmt,(ass.doc_amt-bills.balance) as billAmt,bill.final_amt as finalAmount, "
			 + "ass.doc_amt as amountReceived,round(bill.final_amt-bills.balance,0) as roundofBillAmt,"
			 + "ass.source_service_id as sourceServiceId,pat.outside_org_id as outSideOrg,"
			 + "pat.patient_category_name as orgName,appt.appt_status_id as pntUpdtStatus,concat(CASE WHEN appt.ref_id is NULL OR appt.ref_id = '' OR appt.ref_id = 0 THEN '' ELSE fn_get_emp_name(appt.ref_id) END,"
			 + "CASE WHEN appt.ref_type = 8 THEN fn_getcodevalue(appt.ref_type) ELSE '' END,"
			 + "CASE WHEN appt.other_hosp_id is NULL OR appt.other_hosp_id = '' OR appt.other_hosp_id = 0 THEN '' ELSE fn_get_other_hosp_name(appt.other_hosp_id) END,CASE WHEN appt.other_staff_id is NULL OR appt.other_staff_id = '' OR appt.other_staff_id = 0 THEN '' ELSE fn_get_other_staff_name(appt.other_staff_id) END) as staffName from at_pr_patient pat, at_pr_appt appt, at_hr_emp emp, "
			 +
			 "at_hr_specialization spec, at_bills bills, at_bill_details bill, at_bill_receipts rec, "
			 +
			 "at_source_service_consult ass ,at_source_service assc,at_cb_tariff cb where pat.patient_id=appt.patient_id "
			 +
			 "and appt.emp_id=emp.emp_id and emp.spec_id= spec.spec_id and pat.patient_id=bills.patient_id "
			 +
			 "and appt.patient_appt_id=bill.patient_appt_id and bills.bill_id=bill.bill_id "
			 +
			 "and bill.bill_id=rec.bill_id and bill.bill_details_id=rec.bill_details_id "
			 +
			 "and ass.source_service_id=assc.source_service_id and bills.patient_category=cb.tariff_id "
			 +
			 "and appt.patient_appt_id=bill.patient_appt_id and assc.equp_service_id=emp.emp_id "
			 +
			 "and bills.bill_id=#{billId} and ass.visit_type_id=#{visitTypeId} and service_id !='1' "
			 + "and ass.tariff_id=4 group by appt.patient_appt_id order by receipt_id asc ";

	 @Select (getPatConsultatinDeatils)
	 PatientModel getPatConsultatinDeatils(PatientModel patientModel);


	 /*
	  * String
	  * getpatBillpaymenttypePrint="select CONCAT(if(fn_get_std_value(ap.payment_type) like 'Credit card / Debit card','Card',fn_get_std_value(ap.payment_type)),' ', 'Amount') as payTypeName,"
	  * +
	  * "ap.amount as amountReceived,(select amt from at_bill_details c where service_id='1' and c.bill_id=#{billId}) as regFees from at_bills ab,at_receipt_mode ap"
	  * + " where ab.bill_id=#{billId} and ap.bill_id=ab.bill_id";
	  */

	 String getpatBillpaymenttypePrint="select CONCAT(if(fn_get_std_value(ap.payment_type) like 'Credit card / Debit card','Card',fn_get_std_value(ap.payment_type)),' ', 'Amount') as payTypeName,"
			 + "ap.amount as amountReceived from at_bills ab,at_receipt_mode ap"
			 + " where ab.bill_id=#{billIddd} and ap.bill_id=ab.bill_id and service_id !='1' and ap.status_id=34";
	 @Select (getpatBillpaymenttypePrint)
	 List<PatientModel> getpatBillpaymenttypePrint(Integer billId);


	 String insertLabPaymentDetails = "insert into at_receipt_mode(bill_id,payment_type,amount,trans_details,mob_num,"
			 + "card_date,added_by,added_ip,added_on) values(#{pbillId},#{cashPts},#{amountss},"
			 + "#{transNos},#{bankNames},#{chequeDates}," + "#{addedBy},#{addedIp},now())";

	 @Select(insertLabPaymentDetails)
	 void insertPatPaymentDetails(PatientModel patientModel);

	 String getPatConsultantValidity="select  DATE_FORMAT(op_valid_till, '%d-%M-%Y')"
			 + " from at_pr_appt where patient_id =#{patientId} and emp_id =#{empId} order by patient_appt_id DESC limit 1";
	 @Select(getPatConsultantValidity)
	 String getPatConsultantValidity(PatientModel patientModel);


	 @Select("select service_group_id as serviceId,service_group_name as serviceName from at_lb_service_group where status_id=34 and service_group_id=21")
	 List<PatientModel> getDepartments();


	 String GETPATJSONDETAILS = "select pr.patient_id as customerId,\n" + 
			 "				  concat(if(patient_name is null, 'none', patient_name),' / ', umr_num, ' / ', \n" + 
			 "				  if(pr.mob_num='' || pr.mob_num is null, 000, pr.mob_num)) as customerCode,\n" + 
			 "				  umr_num, patient_name as customerName,pr.mob_num as customerMobNum,pr.title as patTitle,\n" + 
			 "				  date_format(pr.dob, '%d-%b-%Y') as newPntDob,\n" + 
			 "				  pr.age as patAge, pr.age_m as ageMonths,pr.age_d as ageDays, pr.gender as patGender,pr.emp_id as doctorNameId, \n" + 
			 "				 fn_get_emp_name(pr.emp_id) as\n" + 
			 "				  doctorName, pr.city as oldPatientCity,pr.ref_id as refDoctorNameId, \n" + 
			 "				 pr.village as oldPatientVillage, emp.emp_name as doctorName, \n" + 
			 "				  pr.email as patEmail,pr.title as patientTitle from at_hr_emp emp, at_pr_appt app, at_pr_patient pr \n" + 
			 "				 where pr.status_id =34 and app.emp_id=emp.emp_id and pr.patient_id =app.patient_id \n" + 
			 "				  group by pr.patient_id";
	 @Select(GETPATJSONDETAILS)
	 List<LabBillingModel> getCustomerDetails();


	 String getDeptInvList="select service_id as serviceId,inv.investigation_id as invId,inv.investigation_name as invName, "
			 + " service_name as serviceName,ass.dept_id as deptId,ass.pkg_id as packageId, "
			 + "service_group_name as serviceGroup from at_lab_services ass, at_lb_investigation inv, at_lb_service_group lsg "
			 + "where ass.investigation_id=inv.investigation_id and lsg.dept_id=inv.dept_id and "
			 + "inv.status_id =34 and lsg.status_id =34 "
			 + "and ass.status_id =34 and inv.service_group_id=#{serviceId} and  inv.tarrif_id=#{tarrifId} group by service_id";
	 @Select(getDeptInvList)
	 List<PatientModel> getDeptInvList(PatientModel patientModel);



	 void callCustomerRegister(LabBillingModel labBillModel);

	 void insertLabBillingDetails(LabBillingModel labBillModel);

	 void insertLabBillingLogDetailsOp(LabBillingModel labBillModel);

	 void deleteLabBills(LabBillingModel labBillModel);



	 List<LabBillingModel> getInvsList(LabBillingModel labBillModel);

	 List<LabBillingModel> getInvsListCredit(LabBillingModel labBillModel);


	 String getOpServiceCode = "select concat(prefix,last_used+inc_by) as serviceCode FROM at_series WHERE series_name ='OP SERVICES'";	
	 @Select(getOpServiceCode)
	 public String getOpServiceCode();

	 @Select("select d.service_group_name as deptName,  dept_id as departmentId from at_lb_service_group d where d.status_id=34 and op_services_status=1")
	 public List<PatientModel> getOpServDepartments();


	 String  getOpServlist="select inv.dept_id as departmentId, inv.investigation_id as opInvservId ,inv.investigation_name as serviceName,ls.service_group_name as department,inv.investigation_code as serviceCode,\n" + 
			 "				 inv.price as price from at_lb_investigation inv,at_lb_service_group ls \n" + 
			 "				 where ls.dept_id=inv.dept_id and inv.status_id = '34' and ls.op_services_status=1  group by inv.investigation_id;\n" + 
			 " ";
	 @Select(getOpServlist)
	 List<PatientModel> getOpServlist(PatientModel patientModel);

	 String getTarrifName="select tariff_id as tarrifId, concat(r_chart_name, ' - ' , r_chart_code) as tarrifName from at_cb_tariff "
			 + "where status_id=34";
	 @Select(getTarrifName)
	 List<PatientModel> getTarrifName(PatientModel patientModel);

	 void setOpServiceDetails(PatientModel patientModel);

	 String setStockistCode = "UPDATE at_series SET last_used =last_used+1,modified_on = now() where series_name = 'OP SERVICES' ";
	 @Update(setStockistCode)
	 void setOpServiceCode(PatientModel patientModel);


	 /*
	  * String
	  * getBillDetailss="select bill.bill_id as billId, bill.bill_num as billNum,DATE_FORMAT(bill.bill_dt, '%d-%M-%Y') as billDt,"
	  * +
	  * "bill.bill_dt as billDateView,pr.patient_id as patId,pr.patient_name as patName,pr.age as patAge, pr.umr_num as patUmr,"
	  * +
	  * "pr.gender as patGender,pr.mob_num as customerMobNum,bill.emp_id as empId, bill.ref_id,fn_get_emp_name(bill.emp_id) as doctorName,"
	  * +
	  * "fn_get_referral_name(bill.ref_id) as refName,bill.tot_amt as labTotAmt,bill.tot_discount as labTotDisc, "
	  * +
	  * "bill.bill_amt as labBillAmt, bill.paid_amt as labPaidAmt, bill.balance as labBalAmt, bill.added_by as addedBy,"
	  * +
	  * "fn_getcodevalue(bill_category) as billCat,fn_getcodevalue(bill_type) as deptName, fn_getcodevalue(bill_status) as billStatus,"
	  * +
	  * "round(bill.paid_amt,0) as labPaidAmts,'inwords' as amtInwords,bill.bill_paid_through as paymentType,(select CONCAT(if(fn_get_std_value(ap.payment_type) like 'Credit card / Debit card','Card',fn_get_std_value(ap.payment_type)),' ', 'Amount') "
	  * +
	  * "as payTypeName from at_bills ab,at_receipt_mode ap where ab.bill_id=#{billId} and ap.bill_id=ab.bill_id) as paymentType"
	  * +
	  * "CASE when pr.patient_category=4 then 'CASH' else 'Corporate' end as patientType, "
	  * +
	  * "bill.transaction_number as transactionNumber,bill.disc_reason as discountReason from at_bills bill, "
	  * +
	  * "at_pr_patient pr where bill.patient_id=pr.patient_id and bill.status_id=34 and"
	  * + " bill_id=#{billId}";
	  */
	 String getBillDetailss="select bill.bill_id as billId, bill.bill_num as billNum,DATE_FORMAT(bill.bill_dt, '%d-%M-%Y') as billDt,"
			 + "bill.bill_dt as billDateView,pr.patient_id as patId,pr.patient_name as patName,pr.age as patAge, pr.umr_num as patUmr,"
			 + "pr.gender as patGender,pr.mob_num as customerMobNum,bill.emp_id as empId, bill.ref_id,fn_get_emp_name(bill.emp_id) as doctorName,"
			 + "fn_get_referral_name(bill.ref_id) as refName,bill.tot_amt as labTotAmt,bill.tot_discount as labTotDisc, "
			 + "bill.bill_amt as labBillAmt, bill.paid_amt as labPaidAmt, bill.balance as labBalAmt, bill.added_by as addedBy,"
			 + "fn_getcodevalue(bill_category) as billCat,fn_getcodevalue(bill_type) as deptName, fn_getcodevalue(bill_status) as billStatus,"
			 + "round(bill.paid_amt,0) as labPaidAmts,'inwords' as amtInwords,CASE WHEN ap.payment_type = 277 THEN 'UPI' WHEN ap.payment_type = 275 THEN 'Cash' "
			 + "WHEN ap.payment_type = 278 THEN 'Cheque' ELSE ap.payment_type END AS paymentType,"
			 + "CASE when pr.patient_category=4 then 'CASH' else 'Corporate' end as patientType, "
			 + "bill.transaction_number as transactionNumber,bill.disc_reason as discountReason from at_bills bill, "
			 + "at_pr_patient pr,at_receipt_mode ap where bill.patient_id=pr.patient_id and bill.status_id=34 and ap.bill_id=bill.bill_id and "
			 + "bill.bill_id=#{billId}";
	 @Select (getBillDetailss)
	 LabBillingModel getBillDetailss(LabBillingModel labBillModel);

	 String getBillServicesList="select fn_get_service_name(service_id) as invId,amt as charge,quantity as qty,r_chart_name as tarrifType from  " 
			 + "at_bill_details bd,at_cb_tariff cb where cb.tariff_id=bd.tarrif_id and bill_id=#{billId}";
	 @Select (getBillServicesList)
	 List<LabBillingModel> getBillServicesList(LabBillingModel labBillModel);
	 String getBillDetailssTariff="select r_chart_name as tarfType from at_bill_details bd,at_cb_tariff cb where cb.tariff_id=bd.tarrif_id and bill_id=#{billId} group by cb.tariff_id";
	 @Select (getBillDetailssTariff)
	 LabBillingModel getBillDetTariff(LabBillingModel labBillModel);


	 String getCashPrintDeatils="select cash.appr_status as apprStatus,cash.cashdenom_id as cashDenomId,date(cash.from_date) as fromDate,date(cash.to_date) as toDate,cash.denom_num as denomNum,date(cash.denom_dt) as denomDt," 
			 +"	 cash.user as user,cash.remarks as remarks,cash.cash_amt as cashAmt,cash.card_amt as cardAmt,cash.upi_amt as upiAmt,cash.tot_amt as totAmt,"  
			 +"			 if(two_thousand=' ',0,two_thousand) as twoThousend,if(one_thousand=' ',0,one_thousand) as oneThousend," 
			 +"			 if(five_hundred=' ',0,five_hundred) as fiveHund,if(two_hundred=' ',0,two_hundred) as twoHund,"  
			 +"			 if(one_hundred=' ',0,one_hundred) as oneHund,if(fifty_rupees=' ',0,fifty_rupees) as fifty,"  
			 +"			 if(twenty_rupees=' ',0,twenty_rupees) as twenty,if(ten_rupees=' ',0,ten_rupees) as tenRupees,"  
			 +"			 if(five_rupees=' ',0,five_rupees) as fiveRupees,if(two_rupees=' ',0,two_rupees) as twoRupees,"  
			 +"			 if(one_rupee=' ',0,one_rupee) as oneRupee"  
			 +"			  from at_op_cashdenomination cash where cash.status_id=34 and cashdenom_id=#{cashDenomId}";

	 @Select (getCashPrintDeatils)

	 PatientReportsModel getCashPrintDeatilss(PatientReportsModel patientReportsModel);

	 String updatePatientRecordCb = " update at_pr_patient  set patient_name = #{pname}, gender = #{gender}, mob_num = #{mobNum}, age = #{age}, "
			 + " dob =#{dob} ,age_m = #{ageMonths},age_d = #{ageDays}, sms_alert = #{smsStatus}, addr = #{addr},city = #{city}, state = #{state}, country = #{country}, "
			 + "marital_status = #{maritalStatus}, patient_category = #{patientCategory}, credit_org_id = #{orgId}, blood_grp = #{bloodGrp}, "
			 + "nationality = #{nationality}, religion = #{religion}, ref_type = #{refType}, village = #{village},last_name=#{lName},title=#{ptitle}, "
			 + "id_proof_type = #{idProofType}, id_proof_num = #{idProofNum},ref_id = #{refId}, "
			 + "occupation = #{occupation}, other_staff_id = #{otherStaffId},  other_hosp_id = #{otherHospId}, ref_id= #{refId}, "
			 + "other_staff_name = #{otherStaffName},  other_hosp_name = #{otherHospName},"
			 + "modified_by = #{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = now() "
			 + "where patient_id = #{patientId}";

	 @Update(updatePatientRecordCb)

	 int updatePatientRecordCb(PatientModel patientModel);



	 String setConsAttachments = "insert into at_cons_op_file (patient_id,attach_name,attach_description, "
			 + "added_ip,added_by,added_on,status_id) "
			 + "values(#{patientId},#{attachmentName},#{description},#{addedIp},#{addedBy},now(),34)";

	 @Insert(setConsAttachments)
	 int setConsAttachments(PatientModel patientModel);




	 String getConsAttachments = "select attach_name as attachmentName,attach_description as description,consultationOp_id as consultationOpId"
			 + " from at_cons_op_file where patient_id=#{patientId} and status_id=34 ";
	 @Select(getConsAttachments)
	 List<PatientModel> getConsAttachments(PatientModel patientModel);


	 //kept by habi

	 String getOrganizationDetails = "select org_id as orgId,concat(org_name, ' - ' , org_code) as orgName, outside_org_id as outSideOrg"
			 + " from at_cb_organization where status_id=34 and outside_org_id=1";
	 @Select(getOrganizationDetails)

	 List<PatientModel> getOrganizationDetails(PatientModel pntModel);

	 //kept by habi
	 String getopTarifs = " select o.tariff_id as tariffId  from at_cb_tariff t ,at_cb_organization o where t.tariff_id = o.tariff_id and "
			 + "o.org_id = #{orgId} and o.status_id = 34 ";

	 @Select(getopTarifs)

	 PatientModel getopTarifs(PatientModel patientModel);
	 //sandhya


	 String insertServicePayment = "insert into at_receipt_mode(bill_id,payment_type,amount,card_type,trans_details,"
			 + "expiry_date,cheque_bank,cheque_date,added_by,added_ip,added_on) values(#{pbillId},#{paymentType},#{cashAmnt},#{cardType},"
			 + "#{transactioNo},#{expiryDt},#{bankName},#{chequeDt},#{addedBy},#{addedIp},now())";
	 @Select(insertServicePayment)
	 void insertServicePayment(SampleCollectionModel sampCollectionModel);


	 String getBillServicesDetailsList = "select lb.service_id as serviceId, lb.tarrif_id as tarrifIdNew,"
			 + " hb.bill_id as billId,ls.service_name as serviceNameNew,lb.amt as amountNew, lb.bill_id as billId,"
			 + "tarrif_id as tarrifNew,cb.r_chart_name as tarrifName,lb.bill_details_id as billDetId "
			 + " from at_bill_details lb, at_bills hb,at_lab_services ls , at_cb_tariff cb"
			 + "  where hb.bill_id=lb.bill_id and cb.tariff_id=lb.tarrif_id and"
			 + " lb.service_id=ls.service_id and hb.bill_id=#{billId} and lb.status_id = 34 ";


	 @Select(getBillServicesDetailsList)
	 List<PatientModel> getBillServicesDetailsList(PatientModel patientModel);

	 /*    
     String getPatientDtls ="select c.amt as reConAmount, c.discount as disPercentge, c.discount_amt as discountAmount, " 
     		+ "c.final_amt as regFinalAmnt,b.tot_amt as totAmt,b.bill_amt as billAmt ,"
     		+ "b.tot_discount as totDiscount "
     		+ " from at_receipt_mode a, at_bills b ,at_bill_details c"
     		+ "  where a.bill_id=b.bill_id and b.status_id=34 and c.bill_id=b.bill_id and patient_id=#{patientId} and c.bill_id";

     @Select(getPatientDtls)
	PatientModel getPatientDtls(PatientModel patientModel);




	  */

	 String getPatientDtls ="SELECT am.tot_amt AS totAmt,MAX(CASE WHEN ma.service_id = 1 THEN ma.charge_per_unit END) AS reConAmount, " 
			 + "MAX(CASE WHEN ma.service_id = 2 THEN ma.charge_per_unit END) AS consFee,1 AS serviceIdOne,"
			 + "2 AS serviceIdTwo,MAX(CASE WHEN ma.service_id = 1 THEN ma.discount_amt END) AS regDisAmnt,"  
			 + "MAX(CASE WHEN ma.service_id = 2 THEN ma.discount_amt END) AS conDisAmnt,"
			 + "MAX(CASE WHEN ma.service_id = 1 THEN ma.discount END) AS regDisPer,"
			 + "MAX(CASE WHEN ma.service_id = 2 THEN ma.discount END) AS conDisPer,"
			 + " MAX(CASE WHEN ma.service_id = 1 THEN ma.final_amt END) AS regFinalAmnt," 
			 + " MAX(CASE WHEN ma.service_id = 2 THEN ma.final_amt END) AS conFinalAmnt,"
			 + " am.tot_discount as totalDisAmnt,am.bill_amt  as opBillAmnt,am.tot_dis_per as totDiscountAmt,"
			 + "am.paid_amt  as amountReceived, am.retd_chng_given as changeGiven,am.balance as balance,"
			 + "CASE WHEN am.bill_status = 17 THEN 'paid' ELSE am.bill_status END AS status "
			 + "FROM at_bills am INNER JOIN at_bill_details ma ON am.bill_id = ma.bill_id " 
			 + "WHERE am.status_id = 34 AND am.patient_id = #{patientId} GROUP BY am.tot_amt " ;
	 @Select(getPatientDtls)
	 PatientModel getPatientDtls(PatientModel patientModel);

	 String getBillPaymentsList =/*"select pay.bill_id as billId,group_concat(pay.payment_type) as payTypeName,"
 			+ " group_concat(pay.trans_details) as transNum,group_concat(pay.expiry_date) as expiryDt,group_concat(pay.cheque_date) as checkDt ," 
 			+ " group_concat(pay.amount) as amount, group_concat(pay.cheque_bank) as chequebankName " 
 			+ " from at_receipt_mode pay,at_bills bill where pay.bill_id=bill.bill_id "
 			+ " and pay.bill_id= #{billId} and bill.status_id=34";*/ //comment by rajareddy because in correct payment view

			 "SELECT bill.bill_id AS billId,GROUP_CONCAT(pay.payment_type ORDER BY pay.payment_type ASC) AS payTypeName,\n" + 
			 "GROUP_CONCAT(pay.trans_details ORDER BY pay.payment_type ASC) AS transNumber,GROUP_CONCAT(pay.expiry_date ORDER BY pay.payment_type ASC) AS expDates,\n" + 
			 "GROUP_CONCAT(pay.card_type ORDER BY pay.payment_type ASC) AS cardTypes,GROUP_CONCAT(pay.card_num ORDER BY pay.payment_type ASC) AS creditNos,\n" + 
			 "GROUP_CONCAT(pay.mob_num ORDER BY pay.payment_type ASC) AS bankNameMn,GROUP_CONCAT(pay.amount ORDER BY pay.payment_type ASC) AS amount,"
			 + "GROUP_CONCAT(pay.bank_name ORDER BY pay.payment_type ASC) AS bankNames "
			 + "FROM (SELECT pay.bill_id,pay.payment_type,pay.trans_details AS trans_details,\n" + 
			 "pay.expiry_date AS expiry_date,pay.card_type AS card_type,SUM(pay.amount) AS amount,\n" + 
			 "pay.card_num AS card_num,pay.mob_num AS mob_num, pay.bank_name AS bank_name \n" + 
			 "FROM  at_receipt_mode pay WHERE   pay.bill_id =#{billId} GROUP BY  pay.bill_id, pay.payment_type) pay\n" + 
			 "JOIN   at_bills bill ON pay.bill_id = bill.bill_id WHERE bill.status_id = 34\n" + 
			 "GROUP BY  bill.bill_id"; 

	 @Select(getBillPaymentsList)
	 PatientModel getBillPaymentsList(PatientModel patientModel);

	 String deleteInvProfDetaID(PatientModel patientModel);

	 String getPatientLists = "select patient_id as patientId,title as ptitle,patient_name as pname,gender as gender,mob_num as mobNum,"
			 + " patient_category as patientCat,org_id as patientCategory, fn_get_emp_name(emp_id) as empName,"
			 + " dob as dob,age as age ,age_m as ageMonths ,age_d as ageDays "
			 + " from at_pr_patient where patient_id=#{patientId} and status_id = 34 ";
	 @Select (getPatientLists)
	 PatientModel getPatientLists(PatientModel patientModel);

	 String getPatientsDet = "select  patient_id as patientId, umr_num as umrNo, patient_name as patientName , mob_num as mobNum,  dob as dob, " 
			 + "  last_name as lName,care_by as careBy ,care_by_name as careByName, outside_org_id,"  
			 + "  patient_category_name as pntCat from  at_pr_patient where ((umr_num like #{umrNo}  and umr_num like 'UMR%') " 
			 + "  or (patient_name like #{patientName} and umr_num like 'UMR%') " 
			 + "  or (mob_num like #{mobNum} and umr_num like 'UMR%') )and (status_id=34) ";

	 @Select (getPatientsDet)
	 List<PatientModel> getPatientsDet(PatientModel patientModel);

	 String SETINAVCTIVECb ="update at_cons_op_file set status_id = fn_getcodevalue_id('STS','INACTIVE'),"
			 + " modified_by = #{modifiedBy}, modified_ip = #{modifiedIp}, modified_on = now() where consultationOp_id = #{consultationOpId}";
	 @Update(SETINAVCTIVECb)
	 int setAttachmentInactiveCb(PatientModel patientModel);


	 /*String getAllPatients = "select p.patient_id as patientId,a.patient_appt_id as apptId,DATE_FORMAT(a.schedule_dt,'%d-%b-%Y') as apptDt,"
				+ "concat(l.loc_name) as location, a.loc_id as locId, l.loc_name as locName,p.umr_num as patientCode,"
				+ "p.patient_name as patientName,p.gender as gender, p.mob_num as mobNum,p.umr_num as patientCode,p.age as age,"
				+ "p.age_d as ageDays,p.age_m as ageMonths,date_format(date(now()), '%d-%M-%Y') as scheduleDt,"
				+ "fn_getcodevalue(a.appt_status_id) as statusInfo,a.op_num as opCode,a.start_time as startTime,"
				+ "e.emp_id as empId,p.state as state,p.city as city,p.village as village from  at_pr_patient p,at_pr_appt a,"
				+ "at_hr_emp e, at_location l  where p.patient_id=a.patient_id and a.emp_id = e.emp_id and "
				+ "p.status_id=34  and l.loc_id = '1'";

		@Select(getAllPatients)*/

	 String updateManualBill ="insert into at_pr_dummy_bill (patient_id,umr_num,patient_name,gender,mob_num,generated_amt,added_by,added_ip,added_on,pat_apt_id,status_id) "
			 + "values(#{modalPatientId},#{modalPatUmr},#{modalPatName},#{modalPatGender},#{modalPatMobNo},#{amountReceived},#{addedBy},#{addedIp},now(),#{modalPataptId},34)";  
	 @Insert(updateManualBill)	
	 int updateManualBill(PatientModel billModel);

	 List<PatientQueueModel> getPatByDoctor(PatientQueueModel patientQueueModel);

	 String getGeneratedAmtList = "select p.patient_id as patientId,db.dummy_bill_id as dummyBillId,a.patient_appt_id as apptId,DATE_FORMAT(a.schedule_dt,'%d-%b-%Y') as apptDt,"
			 + " concat(l.loc_name) as location, a.loc_id as locId, l.loc_name as locName,p.umr_num as patientCode,"
			 + " p.patient_name as patientName,p.gender as gender, p.mob_num as mobNum,p.umr_num as patientCode,p.age as age,db.generated_amt as amountReceived,"
			 + " p.age_d as ageDays,p.age_m as ageMonths,DATE_FORMAT(a.schedule_dt,'%d-%b-%Y') as apptDt,"
			 + " fn_getcodevalue(a.appt_status_id) as statusInfo,a.op_num as opCode,a.start_time as startTime,"
			 + " e.emp_id as empId,p.state as state,p.city as city,p.village as village from at_pr_dummy_bill db,at_pr_patient p,at_pr_appt a,"
			 + " at_hr_emp e, at_location l  where p.patient_id=a.patient_id and a.emp_id = e.emp_id and p.patient_id=db.patient_id and"
			 + " db.status_id=34 and l.loc_id = '1' and db.generated_amt != 0.00 group by db.patient_id";

	 @Select(getGeneratedAmtList)
	 List<PatientQueueModel> getGeneratedAmtList();

	 String getAllPatientsByDate = "select p.patient_id as patientId,a.patient_appt_id as apptId,DATE_FORMAT(a.schedule_dt,'%d-%b-%Y') as apptDt,"
			 + "concat(l.loc_name) as location, a.loc_id as locId, l.loc_name as locName,p.umr_num as patientCode,"
			 + "p.patient_name as patientName,p.gender as gender, p.mob_num as mobNum,p.umr_num as patientCode,p.age as age,"
			 + "p.age_d as ageDays,p.age_m as ageMonths,DATE_FORMAT(a.schedule_dt,'%d-%b-%Y') as apptDt,"
			 + "fn_getcodevalue(a.appt_status_id) as statusInfo,a.op_num as opCode,a.start_time as startTime,"
			 + "e.emp_id as empId,p.state as state,p.city as city,p.village as village from  at_pr_patient p,at_pr_appt a,"
			 + "at_hr_emp e, at_location l  where p.patient_id=a.patient_id and a.emp_id = e.emp_id and "
			 + "p.status_id=34 and l.loc_id = '1' and DATE_FORMAT(a.schedule_dt, '%Y-%m-%d') between "
			 + "DATE_FORMAT(STR_TO_DATE(#{fromDt}, '%e-%b-%Y'), '%Y-%m-%d') and DATE_FORMAT(STR_TO_DATE(#{toDt}, '%e-%b-%Y'), '%Y-%m-%d')";

	 @Select(getAllPatientsByDate)
	 List<PatientQueueModel> getAllPatientsByDate();


	 // commented by habib
	 /*
	  * String getOrgDetailsOp =
	  * "select tariff_id as tariffId, concat(r_chart_name, ' - ' , r_chart_code) as tariffName "
	  * + "from at_cb_tariff where status_id=34 and tariff_id in (40,4)";
	  * 
	  * @Select(getOrgDetailsOp) List<PatientModel> getOrgDetailsOp(PatientModel
	  * pntModel);
	  */

	 String insertUpdatePayment = "insert into at_receipt_mode(bill_id,payment_type,amount,card_type,trans_details,"
			 + "expiry_date,cheque_bank,cheque_date,added_by,added_ip,added_on) values(#{pbillId},#{paymentType},#{cashAmnt},#{cardType},"
			 + "#{transactioNo},#{expiryDt},#{bankName},#{chequeDt},#{addedBy},#{addedIp},now())";
	 @Select(insertUpdatePayment)
	 void insertUpdatePayment(SampleCollectionModel sampCollectionModel);

	 String insertDueAmountBills = "insert into at_due_bill_payments(bill_id) values(#{pbillId}) ";
	 @Select(insertDueAmountBills)
	 void insertDueAmountBills(SampleCollectionModel sampCollectionModel);



	 String viewAndUpdateManualBill ="update at_pr_dummy_bill set generated_amt=#{amountReceived} where dummy_bill_id=#{modalDummyBillId}";
	 @Update(viewAndUpdateManualBill)	
	 int viewAndUpdateManualBill(PatientModel BillModel);

	 /*(String viewUpdateManualBill ="insert into at_pr_dummy_bill (patient_id,umr_num,patient_name,gender,mob_num,generated_amt,added_by,added_ip,added_on,status_id) "
					+ "values(#{viewPatientId},#{viewPatUmr},#{viewPatName},#{viewPatGender},#{viewPatMobNo},#{viewAmount},#{addedBy},#{addedIp},now(),34)";  
			@Insert(viewUpdateManualBill)	
			void viewUpdateManualBill(PatientQueueModel patientQueueModel);*/
	 String getDummyBillId ="select dummy_bill_id as dummyBillId from at_pr_dummy_bill where dummy_bill_id=#{dummyBillId} and status_id=34";
	 @Select(getDummyBillId)
	 Integer getDummyBillId(PatientModel billModel);


	 String getAllPatients ="select p.patient_id as patientId,a.patient_appt_id as patApptId,p.umr_num as patientCode,a.schedule_dt as apptDt,"
			 + " p.patient_name as patientName,p.gender as gender,p.mob_num as mobNum,p.age as age,p.age_d as ageDays,"
			 + " p.age_m as ageMonths,concat(l.loc_name) as location,a.loc_id as locId,e.emp_id as empId,p.city as city"
			 + " from at_pr_patient p,at_pr_appt a,at_hr_emp e,at_location l where p.patient_id=a.patient_id and p.status_id=34 and "
			 + " a.emp_id = e.emp_id and p.status_id=34 and DATE_FORMAT(a.schedule_dt, '%Y-%m-%d') = DATE(NOW()) and l.loc_id = '1'";


	 @Select(getAllPatients)
	 List<PatientQueueModel> getAllPatients();

	 List<PatientQueueModel> getDateWisePatientList();



	 String insertLabDuePaymentType="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id)"
			 + "values(#{pbillId},#{cashPts},#{regAmount},#{transNos},#{bankNames},#{chequeDates},#{serviceIdReg})";
	 @Insert(insertLabDuePaymentType)
	 void insertLabDuePaymentType(PatientModel patientModel);


	 // kept by habib on 8 may


	 @Select("select leftmenu_jsp from at_security_roles where role_name=#{userName}")
	 String getJspPage(String userName);



	 String getManualPatConsultatinDeatils="select pat.patient_id as patId, pat.patient_name as pname,"
			 + "pat.last_name as lName,pat.title as ptitle, pat.umr_num as umrNo, "
			 + "pat.age as age,pat.age_m as ageMonths,pat.age_d as ageDays, pat.gender as gender, "
			 + "pat.mob_num as mobNum, fn_get_emp_name(appt.emp_id) as empName, spec_name as specName,"
			 + "fn_getcodevalue(appt.ref_type) as refType, appt.op_num as opNum,"
			 + "pat.patient_category_name as patientCategory,db.added_by as addedBy,"
			 + "DATE_FORMAT(STR_TO_DATE(db.added_on, '%Y-%m-%d'), '%d-%b-%Y') as addedOn,"
			 + "date_format(schedule_dt, '%d-%b-%Y') as schDt, fn_get_std_value(visit_type) as patVisit,"
			 + "fn_get_std_value(appt.patient_category) as pntCat,"
			 + "CONCAT(DATE_FORMAT(STR_TO_DATE(now(), '%Y-%m-%d '), '%d-%b-%Y'),' ',CURTIME()) as printDt,"
			 + "appt.token_num as tokenNum,pat.outside_org_id as outSideOrg,concat(l.loc_name) as location,"
			 + "appt.loc_id as locId, l.loc_name as locName,pat.patient_category_name as orgName,"
			 + "appt.appt_status_id as pntUpdtStatus,db.generated_amt as amountReceived, fn_getcodevalue(appt.appt_status_id) as statusInfo "
			 + "from at_pr_patient pat, at_pr_appt appt,"
			 + "at_hr_emp emp,at_hr_specialization spec,at_pr_dummy_bill db, at_location l "
			 + "where pat.patient_id=appt.patient_id and appt.emp_id=emp.emp_id and "
			 + "emp.spec_id= spec.spec_id and pat.patient_id=db.patient_id and pat.status_id=34 and "
			 + "l.loc_id = '1' and db.generated_amt != 0.00 and appt.patient_appt_id =#{modalPataptId} group by db.patient_id";

	 @Select(getManualPatConsultatinDeatils)
	 PatientModel getManualPatConsultatinDeatils(PatientModel patientModel);


	 String getPatientUmr="select cr.patient_umr_no as patientUmrNo, pr.title as patientTitle, cr. patient_name  as patientName ,pr.patient_category_name as orgName, "
			 + " pr.last_name as lastName,pr.gender as genderVal,CASE WHEN pr.dob is NULL OR pr.dob = '' THEN '' ELSE (pr.dob) END as pntDob," 
			 + "pr.age as age,pr.patient_id as patientId,pr.patient_category_id as patientCategoryId,"
			 + " pr.age_m as ageMonths,pr.age_d as ageDays,pr.mob_num as pntMobNum,"
			 + " pr.care_by as careBy,pr.care_by_name as careByName,"
			 + " pr.religion as pntReligion,pr.marital_status as MaritalStatusVal,"
			 + " pr.nationality as pntNationality,pr.blood_grp as pntBloodGrp,"
			 + " pr.occupation as occupation,pr.state as state,"
			 + " pr.city as city,pr.village as village,pr.addr as addr,pr.id_proof_type as idType,pr.patient_id as patientId, "
			 + " cr.medical_card_no as idNum,pr.ref_type as refType,pr.patient_category as pntcatId,pr.patient_category_name as patCatName,"
			 + " rf.refer_letter_check as checkStatus,case WHEN (select max(apt.visit_type) "
			 + " from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and "
			 + "apt.patient_id=#{patientId}) is null THEN 174 ELSE (select max(apt.visit_type)"
			 + " from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and "
			 + "apt.patient_id=#{patientId}) END as patVisitId,"
			 + "IFNULL((SELECT MAX(DATE_FORMAT(reg.reg_valid_upto, '%d-%m-%Y')) FROM at_pr_reg reg, at_pr_patient a "
			 + "WHERE reg.patient_id = a.patient_id AND reg.patient_id = #{patientId} AND reg_status = fn_getcodevalue_id('STS','Active')), '')"
			 + " AS regValidDt ,pr.org_id as orgId,pr.umr_num as patientUmrNo  "
			 + " FROM at_corporate_registration cr, at_pr_patient pr,at_refer_registration rf "
			 + " where pr.umr_num=cr.patient_umr_no and rf.umr=cr.patient_umr_no and "
			 + " cr.corp_reg_id=#{corpConsCorpRegNo} group by cr.corp_reg_id";

	 @Select(getPatientUmr)
	 CorpRegistrationModel getPatientUmr(ConsultationOpModel consultationOpModel);

	 String getRefUmr= 
			 " select cr.umr as umr, pr.title as patientTitle, pr. patient_name  as patientName ,pr.patient_category_id as patientCategoryId,"
					 +" pr.last_name as lastName,pr.gender as genderVal,pr.dob as pntDob,pr.age as age,pr.patient_category_name as orgName,"
					 +" pr.age_m as ageMonths,pr.age_d as ageDays,pr.mob_num as pntMobNum,"
					 +" pr.care_by as careBy,pr.care_by_name as careByName,"
					 +" pr.religion as pntReligion,pr.marital_status as MaritalStatusVal,pr.patient_id as patientId,"
					 +" pr.nationality as pntNationality,pr.blood_grp as pntBloodGrp,"
					 +" pr.occupation as occupation,pr.state as state, "
					 +"pr.city as city,pr.village as village,pr.addr as addr,pr.id_proof_type as idType, "
					 +" cr.medical_card_no as idNum,pr.ref_type as refType ,pr.patient_category as pntcatId, pr.patient_category_name as patCatname,"
					 +"cr.refer_letter_check as checkStatus,case WHEN (select max(apt.visit_type) "
					 + "from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and "
					 + "apt.patient_id=#{patientId}) is null THEN 174 ELSE (select max(apt.visit_type) "
					 + "from at_pr_patient a, at_pr_appt apt where a.patient_id=apt.patient_id and "
					 + "apt.patient_id=#{patientId}) END as patVisitId,"
					 + "(select max(date_format(reg.reg_valid_upto, '%d-%m-%Y')) from at_pr_reg reg, at_pr_patient a where reg.patient_id=a.patient_id "
					 + "and reg.patient_id=#{patientId} and reg_status=fn_getcodevalue_id('STS','Active')) as regValidDt "            		 + " FROM at_refer_registration cr, at_pr_patient pr "
					 +" where pr.umr_num=cr.umr and cr.ref_id=#{refConsCorpRegNo}";
	 @Select(getRefUmr)
	 CorpRegistrationModel getRefUmr(ConsultationOpModel consultationOpModel);

	 String GETPNTVISITINVS = "select inv.investigation_id as investigationId, "
			 + "concat('* ',inv.investigation_name) as investigationName, investigation_pnt_report as "
			 + "investigationReportPath from at_pr_visit_investigations vi, at_lb_investigation inv "
			 + "where vi.investigation_id=inv.investigation_id and visit_id=#{visitId} and "
			 + "vi.status_id=34";

	 @Select(GETPNTVISITINVS)
	 List<PatientModel> getPatientVisitInvestigations(PatientModel patientModel);

	 String GETPNTVISITDRUGS = "select pd.drug_id as drugId,vd.revisit_date as visitDates, pd.generic_names as drugName, "
			 + "form.formulation_name as drugFormulation, vd.drug_dosage as drugStrength, "
			 + "drug_freq as drugFrequency, drug_noOfDys as drugNoOfDy, drug_inTake_time "
			 + "as drugInTakeTime, drug_presc_qty as drugPrescQty, drug_pnt_qty as drugPatTakenQty,"
			 + "remark as remark,form.formulation_name as drugFormulation,revisit_date as visitDate,revisit_date as visitDate"
			 + " from at_pr_visit_drugs vd, at_ph_drugs pd, at_ph_formulation form where "
			 + "vd.drug_id=pd.drug_id and pd.formulation_id=form.formulation_id and "
			 + "visit_id=#{visitId} and vd.status_id=34";
	 @Select(GETPNTVISITDRUGS)
	 List<PatientModel> getPatientVisitDrugs(PatientModel patientModel);


	 String fetchdob="select dob as dob,age as age,age_m as ageMonths,age_d as ageDays "
			 + "from at_pr_patient where patient_id=#{patientId}";
	 @Select(fetchdob)
	 String fetchPatientDOB(Integer patientId);

	 String fetchPatAge="select age as age from at_pr_patient where patient_id=#{patientId}";
	 @Select(fetchPatAge)
	 String fetchPatAge(Integer patientId);

	 String fetchMonth="select age_m as ageMonths from at_pr_patient where patient_id=#{patientId}";
	 @Select(fetchMonth)
	 String fetchMonth(Integer patientId);


	 String fetchDays="select age_d as ageDays from at_pr_patient where patient_id=#{patientId}";
	 @Select(fetchDays)
	 String fetchDays(Integer patientId);

	 String fetchAddedOnDate="select last_insert_date as ageCalc,age as age,age_m as ageMonths,age_d as ageDays "
			 + "from at_pr_patient where patient_id=#{patientId}";
	 @Select(fetchAddedOnDate)
	 String fetchAddedOnDate(Integer patientId);


	 String updateEmpIdInPatTable ="UPDATE at_pr_patient SET age = #{age},age_m = #{ageMonths},age_d = #{ageDays},last_insert_date = now() WHERE patient_id = #{patientId}";
	 @Update(updateEmpIdInPatTable)
	 void updateEmpIdInPatTable(PatientModel patientModel);


	 String updateInPatTable ="UPDATE at_pr_patient SET patient_name=#{pname},last_name=#{lName},"
			 + "title=#{ptitle},gender=#{gender},mob_num=#{mobNum},state=#{state},city=#{city},village=#{village}"
			 + ",addr=#{addr},country=#{pntNationality},dob=#{dob},age=#{age},age_m=#{ageMonths},age_d=#{ageDays}"
			 + ",ref_type=#{refType},patient_category=#{pntCat},id_proof_type=#{idType},id_proof_num=#{idNum}"
			 + ",care_by_name=#{careBy},parent_name=#{careBy},care_by_name=#{careByName},religion=#{religion}"
			 + ",marital_status=#{maritalStatus},blood_grp=#{bloodGrp},occupation=#{pntOccupation},"
			 + "referral_doctor=#{refId},other_staff_name=#{otherStaffId},other_hosp_id=#{otherHospId} WHERE patient_id = #{patientId}";
	 @Update(updateInPatTable)
	 void updateInPatTable(PatientModel patientModel);

	 String GETPNTVISITVITALS = "select vital.vital_id as vitalId, vital.vital_name as vitalName, "
			 + "vital_value as vitalValue, uom.uom_name as uom from at_pr_visit_vitals vv, at_vitals vital, "
			 + "at_unit_of_measure uom where vv.vital_id=vital.vital_id and uom.uom_id=vital.uom_id "
			 + "and patient_id=#{patientId} and patient_appt_id=#{apptId} and vv.status_id=34";

	 @Select(GETPNTVISITVITALS)
	 List<PatientModel> getPatientVisitVitals(PatientModel patientModel);

	 String getPatientVisitVitalCb = "select vital.vital_id as vitalId, vital.vital_name as vitalName, "
			 + "vital_value as vitalValue, uom.uom_name as uom, uom.uom_code as uomCode from at_pr_visit_vitals vv, at_vitals vital, "
			 + "at_unit_of_measure uom where vv.vital_id=vital.vital_id and uom.uom_id=vital.uom_id "
			 + "and patient_id=#{pntId} and patient_appt_id=#{apptId} and vv.status_id=34";

	 @Select(getPatientVisitVitalCb)
	 List<PatientModel> getPatientVisitVitalCb(PatientModel patientModel);

	 String getVitalPrintCb="select  vital.vital_id as vitalId, vital.vital_name as vitalName, vital_value as vitalValue from "
			 + "at_pr_visit_vitals vv,at_vitals vital, at_unit_of_measure uom where patient_id =#{pntId} and "
			 + "patient_appt_id=#{apptId} and vv.vital_id=vital.vital_id  and uom.uom_id=vital.uom_id and vv.patient_id=vv.patient_id";
	 @Select(getVitalPrintCb)
	 List<PatientModel> getVitalPrintCb(PatientModel patientModel);




	 String getpatBillpaymenttypePrintreg="select CONCAT(if(fn_get_std_value(ap.payment_type) like 'Credit card / Debit card','Card',fn_get_std_value(ap.payment_type)),' ', 'Amount') as payTypeName,"
			 + "ap.amount as amountReceived from at_bills ab,at_receipt_mode ap"
			 + " where ab.bill_id=#{billId} and ap.bill_id=ab.bill_id and service_id ='1' and ap.status_id=34";
	 @Select (getpatBillpaymenttypePrintreg)
	 List<PatientModel> getpatBillpaymenttypePrintreg(Integer billId);



	 String insertchequeRegType="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id,card_num,added_on,added_by,added_ip,bank_name)"
			 + "values(#{pbillId},#{cashPts},#{regAmount},#{transNos},#{bankNames},#{chequeDates},#{serviceIdReg},#{creditNos},now(),#{addedBy},#{addedIp},#{cardBankName})";
	 @Insert(insertchequeRegType)
	 void insertchequeRegType(PatientModel patientModel);

	 String insertUpiRegType="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id,card_num,added_on,added_by,added_ip,bank_name)"
			 + "values(#{pbillId},#{cashPts},#{regAmount},#{transNos},#{bankNames},#{chequeDates},#{serviceIdReg},#{creditNos},now(),#{addedBy},#{addedIp},#{cardBankName})";


	 @Insert(insertUpiRegType)
	 void insertUpiRegType(PatientModel patientModel);

	 Object updateApptCancellationBil(AppointmentModel apptModel);
	 


    String updateApptBillId="update at_pr_appt set bill_id=#{billIdAppt} where patient_appt_id=#{apptIdAppt}";
	@Update(updateApptBillId)
	void updateApptBillId(PatientModel patientModel);

	
	String updatePrintId="update at_pr_appt set duplicate_print=1 where patient_appt_id=#{patApptId}";
	@Update(updatePrintId)
	void updatePrintId(PatientModel patientModel);


	String updatePrintIdReg="update at_pr_appt set reg_duplicate_print=1 where patient_appt_id=#{patApptId}";
	@Update(updatePrintIdReg)
	void updatePrintIdReg(PatientModel patientModel);

	
	
	String updatePrintIdCbReg="update at_bills set reg_duplicate_print=1 where bill_id=#{billId}";
	@Update(updatePrintIdCbReg)
	void updatePrintIdCbReg(PatientModel patientModel);

	String updatePatTable ="UPDATE at_pr_patient SET patient_name=#{pname},last_name=#{lName},"
			 + "title=#{ptitle},gender=#{gender},mob_num=#{mobNum},state=#{state},city=#{city},village=#{village}"
			 + ",addr=#{addr},country=#{pntNationality},patient_category=#{patientCategoryOrgId},dob=#{dob},age=#{age},age_m=#{ageMonths},age_d=#{ageDays}"
			 + ",ref_type=#{refType},id_proof_type=#{idType},id_proof_num=#{idNum}"
			 + ",care_by_name=#{careBy},parent_name=#{careBy},care_by_name=#{careByName},religion=#{religion}"
			 + ",marital_status=#{maritalStatus},blood_grp=#{bloodGrp},occupation=#{pntOccupation},"
			 + "referral_doctor=#{refId},other_staff_name=#{otherStaffId},other_hosp_id=#{otherHospId} WHERE patient_id = #{patientId}";
	 @Update(updatePatTable)
	void updatePatTable(PatientModel patientModel);

	 String getPatientDetailsList = "select patient_id as patientId ,umr_num as umrNo from at_pr_patient where status_id=34 and patient_name = #{pname} and mob_num = #{patientMobi}";
	 @Select(getPatientDetailsList)
	List<CorpRegistrationModel> getPatientDetailsList(PatientModel patientModel);

	 String updatePatTableCate ="UPDATE at_pr_patient SET patient_category=#{patientCategoryOrgId} WHERE patient_id = #{patientId}";
	 @Update(updatePatTableCate)
	void updatePatTableCate(PatientModel patientModel);

	 String insertRegistrationAppend="insert into at_receipt_mode (bill_id,payment_type,amount,service_id,added_on,added_by,added_ip)"
			 + "values(#{pbillId},#{creditPt},#{regAmount},#{serviceIdReg},now(),#{addedBy},#{addedIp})";
	 @Insert(insertRegistrationAppend)
	void insertRegistrationAppend(PatientModel patientModel);

	 String insertchequeTypeAppend="insert into at_receipt_mode (bill_id,payment_type,amount,trans_date,service_id,added_on,added_by,added_ip)"
			 + "values(#{pbillId},#{creditPt},#{amountss},#{chequeDates},#{serviceIdCon},now(),#{addedBy},#{addedIp})";
	 @Insert(insertchequeTypeAppend)
	void insertchequeTypeAppend(PatientModel patientModel);

	 String insertCardTypeAppend="insert into at_receipt_mode (bill_id,payment_type,amount,service_id,card_num,card_type,expiry_date,added_on,added_by,added_ip,bank_name)"
			 + "values(#{pbillId},#{creditPt},#{amountss},#{serviceIdCon},#{creditNos},#{cardTypes},#{expDates},now(),#{addedBy},#{addedIp},#{cardBankName})";
	 @Insert(insertCardTypeAppend)
		void insertCardTypeAppend(PatientModel patientModel);

	 
	 String insertchequeTypeUpii="insert into at_receipt_mode (bill_id,payment_type,amount,trans_details,mob_num,trans_date,service_id,added_on,added_by,added_ip)"
			 + "values(#{pbillId},#{creditPt},#{amountss},#{transNos},#{bankNames},#{chequeDates},#{serviceIdCon},now(),#{addedBy},#{addedIp})";
	 @Insert(insertchequeTypeUpii)
	void insertchequeTypeUpii(PatientModel patientModel);

	/*
	 * String getPaymentDetails=
	 * "SELECT maa.val_name AS creditPt, am.amount AS amountss,am.trans_details AS transNos,"
	 * +
	 * "ma.bank_name AS bankNames,am.card_type AS cardTypes,am.card_num AS creditNos,am.expiry_date AS expDates FROM at_receipt_mode am "
	 * +
	 * "LEFT JOIN at_banks ma ON am.bank_name = ma.bank_id LEFT JOIN at_std_code_values maa ON am.payment_type = maa.code_val_id "
	 * + "WHERE am.bill_id = #{billId} and am.amount !=0 ORDER BY am.payment_type";
	 */
	 
	 
	 String getPaymentDetails = "SELECT maa.val_name AS creditPt, SUM(am.amount) AS amountss, "
		        + "GROUP_CONCAT(am.trans_details) AS transNos, "
		        + "ma.bank_name AS bankNames, am.card_type AS cardTypes, "
		        + "am.card_num AS creditNos, am.expiry_date AS expDates "
		        + "FROM at_receipt_mode am "
		        + "LEFT JOIN at_banks ma ON am.bank_name = ma.bank_id "
		        + "LEFT JOIN at_std_code_values maa ON am.payment_type = maa.code_val_id "
		        + "WHERE am.bill_id = #{billId} and am.amount != 0 "
		        + "GROUP BY am.payment_type, maa.val_name, ma.bank_name, "
		        + "am.card_type, am.card_num, am.expiry_date "
		        + "ORDER BY am.payment_type";
	 @Select(getPaymentDetails)
	List<PatientModel> getPaymentDetails(PatientModel patientModel);

	 String getPayModeBillNumberReci = "select bill_id from at_receipt_mode"
	 		+ " where status_id=34 and bill_id = #{pbillId}";
	 @Select(getPayModeBillNumberReci)
	List<CorpRegistrationModel> getPayModeBillNumberReci(PatientModel patientModel);

	 
	 String getPatientVisitVitalsPat = "select vital_id as vitalId, vital_name as vitalName, vital_code as " 
			 + "vitalCode, uom.uom_id as uomId, uom.uom_code as uomCode from at_vitals vital, " 
			 + "at_unit_of_measure uom where vital.uom_id=uom.uom_id and " 
			 + "vital.status_id=34 ";
	 @Select(getPatientVisitVitalsPat)
	List<PatientModel> getPatientVisitVitalsPat(PatientModel patientModel);

	 
	 String getPatientsDetailsOld = "select  patient_id as patientId, umr_num as umrNo, patient_name as patientName , mob_num as mobNum,  dob as dob, " 
				+ "  last_name as lName,care_by as careBy ,care_by_name as careByName, outside_org_id,"  
				+ "  patient_category_name as pntCat,org_id as orgId from  at_pr_patient where patient_name=#{patientName} "
				+ " and last_name=#{lName} and mob_num = #{mobNum} and age =#{age}";

		@Select (getPatientsDetailsOld)
	PatientModel getPatientsDetailsOld(PatientModel patientModel);

		 String getPatientsDetaOldData = "select  patient_id as patientId, umr_num as umrNo, patient_name as patientName , mob_num as mobNum,  dob as dob, " 
					+ "  last_name as lName,care_by as careBy ,care_by_name as careByName, outside_org_id,"  
					+ "  patient_category_name as pntCat,org_id as orgId from  at_pr_patient where patient_id=#{patientId} ";

			@Select (getPatientsDetaOldData)
		List<PatientModel> getPatientsDetaOldData(PatientModel patientModel);

			
			 String getPatientsDetailsOldData = "SELECT patient_id AS patientId, umr_num AS umrNo, patient_name AS patientName, mob_num AS mobNum, "
				 		+ "dob AS dob, last_name AS lName,care_by AS careBy,care_by_name AS careByName, outside_org_id, "
				 		+ "patient_category_name AS pntCat,org_id AS orgId FROM at_pr_patient "
				 		+ "WHERE  mob_num = #{mobNum} OR umr_num = #{umrNo} OR patient_name = #{patientName} "
				 		+ "OR (patient_name = #{patientName} AND last_name=#{lName} AND mob_num = #{mobNum} AND age =#{age} AND umr_num= #{umrNo}) "
				 		+ "OR (patient_name = #{patientName} AND mob_num = #{mobNum} AND age =#{age})"
				 		+ "OR (patient_name = #{patientName} AND last_name=#{lName} AND mob_num = #{mobNum})"
				 		+ "OR (patient_name = #{patientName} AND last_name=#{lName} AND mob_num = #{mobNum} AND age =#{age}) "
				 		+ "OR (patient_name = #{patientName} AND last_name=#{lName})"
				 		+ "OR (patient_name = #{patientName} AND mob_num = #{mobNum})"
				 		+ "OR (patient_name = #{patientName} AND age =#{age})";

					@Select (getPatientsDetailsOldData)
			List<PatientModel> getPatientsDetailsOldData(PatientModel patientModel);

					
					 String updatePatientRecordappt ="UPDATE at_pr_appt SET ref_type=#{refType},ref_id=#{refId},other_hosp_id=#{otherHospId},other_staff_id=#{updateOtherStaffId}"
					 		+ " WHERE patient_id = #{patientId}";
					 @Update(updatePatientRecordappt)
					int updatePatientRecordappt(PatientModel patientModel);
					 
					 
String getAuthorizedList="select emp_id  as empId, emp_name as empName from  at_hr_emp where spec_id = 62 OR emp_id IN ('20715','21001')";
@Select (getAuthorizedList)
List<PatientModel> getAuthorizedList ();


String getAllCitiesList =
"SELECT city_id AS cityId," + 
"city AS city " +
"FROM at_city";

@Select(getAllCitiesList)
List<PatientModel> getAllCitiesList(PatientModel patientModel);

int updatePendingPayment(FeeModel feeModel);




}