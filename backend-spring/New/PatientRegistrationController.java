package com.atri.hms.patientmanagement.opregistration.controller;

/*@author: Veena S
 * @created date: 12-Jan-2015
 * @modified by1: Swetha S
 * @Modified date1: August-2016
 * @modified by2: Lakshmana Rao K. P.
 * @Modified date2: 07-Feb-2017
 * @modified by3: Lakshmana Rao K. P.
 * @Modified date3: 20-Apr-2017
 * @File Name: "PatientRegistrationController.java" class file
 * @version: 1.0
 * @Copyright (c) 2014-2015 Atri Business Solutions, Inc.
    All Rights Reserved.
 *
    This software is the confidential and proprietary information of Atri
    Business Solutions, Inc. ("Confidential Information"). You shall not
    disclose such Confidential Information and shall use it only in
    accordance with the terms of the license agreement you entered into
    with Atri Business Solutions.*/

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FilenameUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.atri.hms.admin.settings.controller.Base64Class;
import com.atri.hms.common.countries.model.CityModel;
import com.atri.hms.creditbilling.patient.corporateregistration.model.ConsultationOpModel;
import com.atri.hms.creditbilling.patient.corporateregistration.model.CorpRegistrationModel;
import com.atri.hms.hr.model.DoctorModel;
import com.atri.hms.inpatient.model.InPatientModel;
import com.atri.hms.lab.billing.model.LabBillingModel;
import com.atri.hms.lab.samples.model.SampleCollectionModel;
import com.atri.hms.lab.setup.model.LabSetupModel;
import com.atri.hms.op.constants.HMSConstants;
import com.atri.hms.org.settings.mapper.OrganizationSettingsMapper;
import com.atri.hms.org.settings.model.OrganizationSettingsModel;
import com.atri.hms.patientmanagement.appointment.mapper.AppointmentMapper;
import com.atri.hms.patientmanagement.appointment.model.AppointmentModel;
import com.atri.hms.patientmanagement.appointment.model.ApptModel;
import com.atri.hms.patientmanagement.medicalrecord.mapper.MedicalRecordMapper;
import com.atri.hms.patientmanagement.medicalrecord.model.MedicalRecordModel;
import com.atri.hms.patientmanagement.opregistration.mapper.PatientMapper;
import com.atri.hms.patientmanagement.opregistration.model.ExtraDoctorSlots;
import com.atri.hms.patientmanagement.opregistration.model.FeeModel;
import com.atri.hms.patientmanagement.opregistration.model.LocationModel;
import com.atri.hms.patientmanagement.opregistration.model.PatientModel;
import com.atri.hms.patientmanagement.opregistration.model.PatientQueueModel;
import com.atri.hms.patientmanagement.opregistration.model.PaymentReqPayloadModel;
import com.atri.hms.security.model.UserModel;
import com.atri.hms.sms.model.SMSModel;
import javax.servlet.http.HttpServletResponse;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import net.sf.jasperreports.engine.JRDataSource;

/*import com.atri.hms.patientmanagement.opregistration.model.SpecializationModel;*/

@Controller
@RequestMapping(value = "/patient")
@Component
public class PatientRegistrationController {

	public PatientRegistrationController() {
		// TODO Auto-generated constructor stub
		System.out.println("Insdide patient registration controller");
	}

	@Autowired
	Base64Class base64Class;

	@Autowired
	PaymentServicesOp paymentService;

	@Autowired
	PatientMapper patientMapper;
	@Autowired
	MedicalRecordMapper mrMapper;

	@Autowired
	OrganizationSettingsMapper organizationSettingsMapper;

	@Autowired
	AppointmentMapper apptMapper;

	@Autowired
	PatientRegMethodController dataprovider;

	@Value("${project.patient}")
	private String moduleName;

	@Value("${project.billing}")
	private String billModule;

	@Value("${project.common}")
	private String common;

	@Value("${patient.picPath}")
	private String patientPicPath;

	@Value("${patient.nabhPath}")
	private String nabhPath;

	@Value("${msg.deleteSuccess}")
	private String deleteSuccess;

	// for patient file uploads
	@Value("${patient.patFilesPath}")
	private String patientFilesPath;

	// for patient prescriptions
	@Value("${patient.patPrescriptionsPath}")
	private String patientPrescPath;

	/*
	 * @Value("${patient.docFilePath}") private String patDocFilePath;
	 */

	/*
	 * @Value("${patient.picClientPath}") private String patientPicClientPath;
	 */

	OrganizationSettingsModel orgSettingsModel;

	private ModelAndView model;

	private String path;

	@Value("${patient.filePath}")
	private String empFilePath;

	@RequestMapping(value = "/patientQueue", method = RequestMethod.GET)
	public ModelAndView patientQueue(HttpSession session) {
		System.out.println("...Inside get Patient Queue");
		ModelAndView model = new ModelAndView();

		PatientModel pntModel = new PatientModel();
		String userName = (String) session.getAttribute("userName");
		// "MultiLocation Code Block"
		try {

			// getting the "Organization Details" from the session object "orgDetails"
			model.addObject("orgDetails", (UserModel) session.getAttribute("orgDetails"));

			// getting the "Organization's Location Details" from the session object
			// "orgLocList"
			model.addObject("orgLocList", (List<UserModel>) session.getAttribute("orgLocList"));

			// Getting user's multilocation status
			model.addObject("userOrgStatus", session.getAttribute("userOrgStatus"));
			model.addObject("userLocStatus", session.getAttribute("userLocStatus"));
			model.addObject("userDeptStatus", session.getAttribute("userDeptStatus"));

			model.addObject("locId", "0");
			model.addObject("deptId", "0");
			model.addObject("deptName", "");

			model.addObject("patApptSts", "0");
			model.addObject("searchApptSts", "0");

			pntModel.setLocId(0);
			pntModel.setDeptId(0);

			if (session.getAttribute("userDeptStatus").equals("1")) {
				model.addObject("locDetails", (UserModel) session.getAttribute("locDetails"));
			}

		} catch (Exception exp) { // catch block
			exp.printStackTrace(); // returns errors in the console
		}

		session.setAttribute("opBillId", "0");
		session.setAttribute("recptNo", "0");
		session.setAttribute("regDivSts", "1");
		session.setAttribute("patientQueueInitial", "1");
		session.setAttribute("msg", "");

		session.setAttribute("restrictResubmission", "0");

		// model = getPatientQueue(null, session);
		model = getPatientQueue(pntModel, session);

		model.setViewName(moduleName + "/patientQueue");

		return model;
	}

	public ModelAndView getPatientQueue(PatientModel pntModel, HttpSession session) {

		ModelAndView model = new ModelAndView();

		List<PatientModel> allergyTypeList = null;

		List<PatientModel> allergyReactionList = null;

		String stdCodeId = "0";

		// kept by habib on 8th may line 231
		
		String userName=(String)session.getAttribute("role");
		
		List<PatientModel> patientStatus = patientMapper.getStandardStatus();
		model.addObject("stdStatus", patientStatus);

		
		// kept by habib on 8th may
		
		String jspPage=patientMapper.getJspPage(userName);
		System.err.println("**********JSP FILE*************"+jspPage);
		//model.addObject("menu",jspPage);
		session.setAttribute("menu",jspPage);
		
		
		
		/*
		 * List<DoctorModel> doctorList = patientMapper.getAvailableDoctors();
		 * model.addObject("doctorList", doctorList);
		 */

		List<DoctorModel> doctorList = patientMapper.getAvailableDoctors();
		System.out.println("doc list.." + doctorList.size());
		model.addObject("docList", doctorList);
		// System.out.println(".....doctordetails.."+doctorList);
		List<PatientModel> vitalList = patientMapper.getVitalList(pntModel);
		model.addObject("vitalList", vitalList);
		/*
		 * List<OrganizationModel> consDetails = patientMapper.getOrgDetails();
		 * model.addObject("orgList", consDetails);
		 */
		/*** COMMENTED BY PRABHU ON 27TH JUNE2019 TO GET SERVICE CHARGE TARIFF LIST ***/

		List<PatientModel> orgDetails = patientMapper.getOrgDetails();
		model.addObject("orgList", orgDetails);
		System.out.println(".....orgDetails.." + orgDetails.size());

		List<DoctorModel> refList = patientMapper.getListOfReferals();
		model.addObject("ref", refList);

		List<PatientModel> catList = patientMapper.getCategories("PATCAT");
		model.addObject("patientCategory", catList);

		List<PatientModel> specList = patientMapper.getSpecialization(pntModel);
		model.addObject("specList", specList);
		
		List<PatientModel> tarrifLabList = patientMapper.getTarrifName(pntModel);
	    System.out.println("tarrifLabList------" +tarrifLabList.size());
	    model.addObject("tarrifLabList", tarrifLabList);

		String orgName = "Vasugan Medical Specialities Pvt Ltd";
		List<LocationModel> locations = patientMapper.getLocations(orgName);
		model.addObject("locList", locations);

		List<PatientModel> statusDetails = patientMapper.getApptStatusDetails();
		model.addObject("statusDetails", statusDetails);
		System.out.println("loc size=" + locations.size());
		
		List<PatientModel> labDeptList = patientMapper.getDepartments();
	    System.err.println("labDeptList.........size .........bunga......."+labDeptList.size());
	    model.addObject("labDeptList", labDeptList);
	    List<PatientModel> citiesList = patientMapper.getAllCitiesList(pntModel);
	    model.addObject("citiesList", citiesList);
		System.out.println("list sizegggggg=" + citiesList.size());
		// getting the doctor spec and placed in doctorList
		/*
		 * List<PatientModel> doctorlist = patientMapper.getDoctorDetails();
		 * model.addObject("doctorList", doctorlist);
		 */

		/*
		 * orgSettingsModel = new OrganizationSettingsModel();
		 * orgSettingsModel.setServiceType("174"); orgSettingsModel.setLocationId(1);
		 * int serviceId = 0; System.err.println("service name" +
		 * orgSettingsModel.getServiceType()); System.out.println("....service id..." +
		 * serviceId); serviceId =
		 * organizationSettingsMapper.getServicesId(orgSettingsModel);
		 * 
		 * orgSettingsModel.setServiceId(serviceId);
		 * System.out.println("serviceID------"+serviceId); orgSettingsModel =
		 * organizationSettingsMapper.getOrganizationSettings(orgSettingsModel);
		 * 
		 * String status = getOrganizationSettingsStatus(orgSettingsModel
		 * .getFeeCollectedTime()); model.addObject("regStatus", status);
		 */
		/***
		 * EXISTED COMMENTED ON 12TH JUNE 2019 BY PRABHU UNDER GUIDENCE OF MINAKSHI DUE
		 * TO TABLE CHANGES REGISTRATION SERVICE ID COULD NOT BE ABLE TO RETRIVE. SO, TO
		 * OVERCOME THIS WE NEED TO DISCARD REGISTRATION SERVICE ID ON PAGE LOAD
		 * COMMENTED THE ABOVE CODE.
		 */

		List<PatientModel> refTypes = patientMapper.getRefCategories("REFTYPE");
		model.addObject("refTypes", refTypes);

		List<PatientModel> empList = patientMapper.getEmpList();
		// System.out.println("emp lst.." + empList.size());
		model.addObject("empList", empList);

		List<PatientModel> staffDoc = patientMapper.getStaffDocList();
		// System.out.println("emp lst.." + empList.size());
		model.addObject("staffDoc", staffDoc);
		List<PatientModel> AuthorizedList = patientMapper.getAuthorizedList();
		model.addObject("AuthorizedList", AuthorizedList);
		 System.out.println("AuthorizedList.." + AuthorizedList.size());



		List<PatientModel> otherHospList = patientMapper.getOthetHospList();
		model.addObject("otherHospList", otherHospList);

		List<PatientModel> otherStaffList = patientMapper.getOthetStaffList();
		model.addObject("otherStaffList", otherStaffList);

		List<PatientModel> otherDoctorsList = patientMapper.getOtherDoctorsList();
		model.addObject("otherDoctorsList", otherDoctorsList);

		List<PatientModel> payTypeList = patientMapper.getPaymentTypeList();
		// System.err.println("payTypeList---->"+payTypeList.size());
		model.addObject("payTypeList", payTypeList);

		List<PatientModel> paymentModeList = patientMapper.getPaymentMode(pntModel);
		System.err.println("payModeList---->" + paymentModeList.size());
		model.addObject("paymentModeList", paymentModeList);

		List<PatientModel> paymenttypelist = patientMapper.getPaymenttype();
		System.err.println("paymenttypelist---->" + paymenttypelist.size());
		model.addObject("paymenttypelist", paymenttypelist);
		
		
		
		/*
		 * //kept by habi List<PatientModel> organizationsList =
		 * patientMapper.getOrganizationDetails(pntModel);
		 * model.addObject("orgList ,organizationsList");
		 * System.out.println(".....orgDetails.."+orgDetails.size());
		 */
		  
		
		   List<PatientModel> organizationsList = patientMapper.getOrganizationDetails(pntModel);
		    model.addObject("organizationsList", organizationsList);
		    System.out.println(".....organizationsList.."+organizationsList.size());
		 
		    
		  
		  
		 // commented by habib  
		/*
		 * List<PatientModel> tariffList = patientMapper.getOrgDetailsOp(pntModel);
		 * model.addObject("tariffList", tariffList);
		 * System.out.println(".....tariffList.."+tariffList.size());
		 */
		 		    		
		List<PatientQueueModel> vo = null;
		try {
			/*
			 * System.out.println("in getting patinet queue..appt from dt.." +
			 * pntModel.getApptFromDate() + "..to dt.." + pntModel.getApptToDate() +
			 * "..loc id.." + pntModel.getLocId());
			 */
			allergyTypeList = patientMapper.getStdCodeValuesList(stdCodeId = "52");
			model.addObject("allergyTypeList", allergyTypeList);

			allergyReactionList = patientMapper.getStdCodeValuesList(stdCodeId = "53");
			model.addObject("allergyReactionList", allergyReactionList);

			if (session.getAttribute("patientQueueInitial").equals("1")) {
				System.out.println("Appt From Dt.." + pntModel.getApptFromDate() + "...." + pntModel.getApptToDate());
				vo = patientMapper.getPatientQueue(pntModel);

				model.addObject("locId", "0");
				model.addObject("deptId", "0");
				model.addObject("deptName", "");

				model.addObject("patApptSts", "0");
				model.addObject("searchApptSts", "0");
			} else if (session.getAttribute("userOrgStatus").equals("1")
					|| session.getAttribute("userLocStatus").equals("1") && pntModel.getLocId() == 0
							&& pntModel.getDeptId() == 0) {
				System.out.println("in user loc org sts...with loc dept id 0...");

				// System.out.println("Appt From
				// Dt.."+pntModel.getApptFromDate()+"...."+pntModel.getApptToDate());
				vo = patientMapper.getPatientQueue(pntModel);
				System.out.println("Vo size..........." + vo.size());

			} else {
				System.err.println("in user dept sts...with dept id..." + pntModel.getUserId());
				pntModel.setUserId((Integer) session.getAttribute("userId"));
				vo = patientMapper.getPatientQueueDept(pntModel);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		List<PatientModel> patientPortalList = patientMapper.getPatientPortalList();
		model.addObject("patientPortalList", patientPortalList);

		model.addObject("patientQueue", vo);
		pntModel.setVitalStatus(pntModel.getVitalStatus());
		System.out.println("vitalStatus" + pntModel.getVitalStatus());
		pntModel.setFileStatus(pntModel.getFileStatus());
		System.out.println("FileStatus" + pntModel.getFileStatus());
		return model;
	}

	@RequestMapping(value = "/getDoctorWiseLocations")
	public ModelAndView getDoctorWiseLocations(DoctorModel docModel, @RequestParam("doctorId") Integer doctorId) {
		ModelAndView model = new ModelAndView(moduleName + "/locList");
		System.out.println("Doc Id..." + doctorId);
		if (doctorId == 0) {
			String orgName = "Vasugan Medical Specialities Pvt Ltd";
			List<LocationModel> locations = patientMapper.getLocations(orgName);
			model.addObject("locList", locations);
		} else {
			List<LocationModel> locList = patientMapper.getDoctorsWiseLocations(doctorId);
			// System.out.println("loc list.." + locList);
			if (locList != null) {
				model.addObject("locList", locList);
			} else {
				model.addObject("locList", "not available");
			}
		}

		return model;
	}

	@RequestMapping(value = "/getDoctorDetails")
	@ResponseBody
	public String getDoctorDetails(PatientModel patientModel) {
		String outputResult = "0";
		PatientModel docDetails = null;
		try {

			System.out.println("inside........ " + patientModel.getIdDoctor());
			docDetails = patientMapper.getDoctorDetails(patientModel);
			// System.out.println("size is " + docDetails.size());

			outputResult = docDetails.getSpecName() + "^" + docDetails.getEmpCode();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return outputResult;
	}

	/*
	 * @RequestMapping(value = "/getDoctorDetails")
	 * 
	 * @ResponseBody public List<DoctorModel> getDoctorDetails(DoctorModel docModel,
	 * 
	 * @RequestParam("doctorId") Integer doctorId) { List<DoctorModel> docDetails =
	 * null; try { System.out.println("inside........."); //docDetails =
	 * patientMapper.getDoctorDetails(docModel); } catch (Exception e) { // TODO:
	 * handle exception } return docDetails; }
	 */

	@RequestMapping(value = "/getLocationWiseDotors")
	public ModelAndView getLocationWiseDotors(@RequestParam("locId") Integer locId) {
		ModelAndView model = new ModelAndView(moduleName + "/DocList");
		System.out.println("loc Id..." + locId);
		if (locId != 0) {
			List<DoctorModel> docList = patientMapper.getLocationWiseDoctors(locId);
			// System.out.println("doc list.." + docList);
			if (docList != null) {
				model.addObject("docList", docList);
			} else {

				model.addObject("docList", "Not available");
			}
		} else {

			List<DoctorModel> doctorList = patientMapper.getAvailableDoctors();
			model.addObject("docList", doctorList);
		}

		return model;
	}

	public static String getOrganizationSettingsStatus(String value) {
		System.out.println("in get org set sts..val.." + value);
		if (value.equals(HMSConstants.FEE_COLLECTED_TIME_REG)) {
			return HMSConstants.FEE_COLLECTED_TIME_REG;
		} else if (value.equals(HMSConstants.FEE_COLLECTED_TIME_BEFCONS)) {
			return HMSConstants.FEE_COLLECTED_TIME_BEFCONS;
		} else if (value.equals(HMSConstants.FEE_COLLECTED_TIME_CONS)) {
			return HMSConstants.FEE_COLLECTED_TIME_CONS;
		} else {
			return HMSConstants.FEE_COLLECTED_TIME_AFTCONS;
		}

	}

	// COMMENTS REMOVED ON 06072022
	@RequestMapping(value = "/getRegistrationFee")
	@ResponseBody
	public String getRegistrationFee(@RequestParam("patientId") Integer patientId,
			@RequestParam("patientCategoryId") Integer patientCategoryId,
			@RequestParam("idDoctorVal") Integer idDoctorVal, @RequestParam("idLocation") Integer idLocation,
			@RequestParam("patVisitId") Integer patVisitId, @RequestParam("scheduleDt") String scheduleDt) {
		System.err.println("IN REG FEE METHOD");

		System.err.println("patientId...." + patientId);
		System.err.println("patientCategoryId...." + patientCategoryId);
		System.err.println("idDoctorVal...." + idDoctorVal);
		System.err.println("idLocation...." + idLocation);
		System.err.println("patVisitId...." + patVisitId);

		System.err.println("scheduleDt...." + scheduleDt);
		PatientModel patientModel = new PatientModel();
         System.out.println();
		if (patientId == 0) {
			System.err.println("in if.patientId...");
			patientModel.setPatientId(null);
			patientModel.setBillStatus("pending");
		} else {
			System.err.println("in else...");
			String regBillStatus = patientMapper.checkPatientBillStatus(patientId);
			patientModel.setPatientId(patientId);
			patientModel.setBillStatus(regBillStatus);
			patientModel.setPatVisitId(patVisitId);
			patientModel.setEmpId(idDoctorVal);
			patientModel.setScheduleDt(scheduleDt);

		}
		patientModel.setPatientId(patientId);
		patientModel.setPatientCategoryId(patientCategoryId);
		patientModel.setEmpId(idDoctorVal);
		patientModel.setScheduleDt(scheduleDt);
		if (patVisitId == null) {
			patientModel.setPatVisitId(174);
			System.err.println("in if.patvisitId...");
		} else {
			patientModel.setPatVisitId(patVisitId);
			System.err.println("in else.patvisitId...");

		}
		// patientModel.setBuildId(1); // commented on 25th june 2019
		patientModel.setBuildId(idLocation);
		if (patientId == 0) {
			patientModel.setPatientId(null);
		} else {
			patientModel.setPatientId(patientId);
		}
		// patientModel.getDateSch();
		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		try {
			reqFrmt = frmt.parse(scheduleDt);
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			patientModel.setScheduleDt(dbFrmt1);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("in get reg fee..pat id.." + patientModel.getPatientId() + "..cat id.."
				+ patientModel.getPatientCategoryId() + "..bill sts.." + patientModel.getBillStatus() + "..patVisitId.."
				+ patientModel.getPatVisitId() + "..idDoctorval" + patientModel.getEmpId() + "scheduleDt>>"
				+ patientModel.getScheduleDt());
		// patientModel.getApptModel().getScheduleDt();
		patientMapper.callGetRegistrationFee(patientModel);
		String result = patientModel.getServiceChargeId() + ":" + patientModel.getFee();
		System.err.println("REG FEE RESULT...." + result);
		return result;
	}

	@RequestMapping(value = "/getConsultationFee")
	@ResponseBody
	public String getConsultationFee(@RequestParam("patientId") Integer patientId,
			@RequestParam("patientCategory") Integer patientCategory, @RequestParam("docId") Integer docId,
			@RequestParam("locId") Integer locId, @RequestParam("scheduleDt") String scheduleDt,
			@RequestParam("suvRegPatientId") Integer suvRegPatientId) {
		// System.err.println("schedule date...." + scheduleDt);
		PatientModel patientModel = new PatientModel();
//		System.err.println("patientId.... date...." + patientId);
		if (patientId == null || patientId == 0) {
		    patientModel.setPatientId(null);
		} else {
		    patientModel.setPatientId(patientId);
		}

		patientModel.setBillStatus("pending");
		patientModel.setPatientCategoryId(patientCategory);
		patientModel.setEmpId(docId);
		patientModel.setBuildId(locId);
		patientModel.setScheduleDt(scheduleDt);
		patientModel.setSuvRegPatientId(suvRegPatientId);

		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		try {
			reqFrmt = frmt.parse(scheduleDt);
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			patientModel.setScheduleDt(dbFrmt1);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("in get cons fee..pat id.." + patientModel.getPatientId() + "..suvPatId..>"
				+ patientModel.getSuvRegPatientId() + "..pat cat.." + patientModel.getPatientCategoryId() + "..emp id.."
				+ patientModel.getEmpId() + "..build id.." + patientModel.getBuildId() + "..sts.."
				+ patientModel.getBillStatus() + "..dt.." + patientModel.getScheduleDt() + "..chrge  id.."
				+ patientModel.getServiceChargeId() + "..pat visit.." + patientModel.getPatVisit());
		patientMapper.callGetConsultationFee(patientModel);

		String result = patientModel.getServiceChargeId() + ":" + patientModel.getFee() + ":"
				+ patientModel.getVisitType() + ":" + patientModel.getPatVisit() + ":" + patientModel.getValidity();
		System.out.println("result...." + result);
		return result;
	}

	@RequestMapping(value = "/getPhotoDetails", method = RequestMethod.POST)
	@ResponseBody
	public String setPhotoName(@RequestParam(value = "imgBase64") String imgBase64, ModelMap model, HttpSession session)
			throws IOException {
		System.out.println("Inside get pic det.....");

		PatientModel patientModel = new PatientModel();
		String userName = (String) session.getAttribute("userName");
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedBy(userName);
		patientModel.setModifiedIp(userIp);

		patientMapper.callGetPhotoDetails(patientModel);

		FileOutputStream fos = null;
		String path = null;
		try {
			System.out.println("File......." + patientModel.getPicName());
			// patientModel.setPicName(picName);
			String fileName = patientModel.getPicName();
			// String sImg = request.getParameter("imgBase64");
			String simg = imgBase64.substring("data:image/png;base64,".length());
			// System.out.println("length......"+sImg.length());
			byte[] bimg64 = simg.getBytes();
			byte[] bimg = Base64.decodeBase64(bimg64);
			path = fileName + ".png";
			fos = new FileOutputStream(path);
			fos.write(bimg);
			// model.addAttribute("picName", path);

			String fileName1 = FilenameUtils.getName(path);
			System.out.println("File Name...........11....." + fileName1 + "......path....." + path);

			File dir = new File(patientPicPath);
			System.out.println("Dir..." + dir);
			if (!dir.exists()) {
				System.out.println("inside if dir");
				dir.mkdirs();
			}

			System.out.println("Patient Pic path..." + patientPicPath);

			String destFile = patientPicPath + "/" + fileName1;
			System.out.println("out if dir.....Dest file..." + destFile);
			File file = new File(path);
			OutputStream oos = new FileOutputStream(destFile);
			byte[] buf = new byte[8192];

			InputStream is = new FileInputStream(file);

			int counts = 0;

			while ((counts = is.read(buf, 0, buf.length)) > 0) {
				System.out.println("inside while");
				oos.write(buf, 0, counts);
				oos.flush();
			}
			oos.close();
			System.out.println("stop");
			is.close();

		} catch (Exception e) {
			e.printStackTrace();
			@SuppressWarnings("unused")
			String loggerMessage = "Upload image failed : ";
		} finally {
			if (fos != null) {
				fos.close();
			}
		}

		/*
		 * FileOutputStream fosClient = null; String pathClient = null; try { System.out
		 * .println("File Client......." + patientModel.getPicName()); //
		 * patientModel.setPicName(picName); String fileName =
		 * patientModel.getPicName(); // String sImg =
		 * request.getParameter("imgBase64"); String simg = imgBase64
		 * .substring("data:image/png;base64,".length()); //
		 * System.out.println("length......"+sImg.length()); byte[] bimg64 =
		 * simg.getBytes(); byte[] bimg = Base64.decodeBase64(bimg64); pathClient =
		 * fileName + ".png"; fosClient = new FileOutputStream(pathClient);
		 * fosClient.write(bimg); // model.addAttribute("picName", path);
		 * 
		 * String fileName1 = FilenameUtils.getName(pathClient);
		 * System.out.println("File Name...........11....." + fileName1 +
		 * "......path....." + pathClient);
		 * 
		 * File dirClient = new File(patientPicClientPath); System.out.println("Dir..."
		 * + dirClient); if (!dirClient.exists()) {
		 * System.out.println("inside if dir client"); dirClient.mkdirs(); }
		 * 
		 * System.out.println("Patient Pic path..." + patientPicClientPath);
		 * 
		 * String destFileClient = patientPicClientPath + "/" + fileName1;
		 * System.out.println("out if dir.....Dest file..." + destFileClient); File
		 * fileClient = new File(pathClient); OutputStream oos = new
		 * FileOutputStream(destFileClient); byte[] bufClient = new byte[8192];
		 * 
		 * InputStream is = new FileInputStream(fileClient);
		 * 
		 * int counts = 0;
		 * 
		 * while ((counts = is.read(bufClient, 0, bufClient.length)) > 0) {
		 * System.out.println("inside while"); oos.write(bufClient, 0, counts);
		 * oos.flush(); } oos.close(); System.out.println("stop"); is.close();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); fosClient.close(); }
		 */

		return path;
	}

	@RequestMapping(value = "/getAttendeePhotoDetails", method = RequestMethod.POST)
	@ResponseBody
	public String setAttendeePhotoName(@RequestParam(value = "imgBase64") String imgBase64, ModelMap model,
			HttpSession session) throws IOException {
		System.out.println("Inside get pic det.....");

		PatientModel patientModel = new PatientModel();
		String userName = (String) session.getAttribute("userName");
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedBy(userName);
		patientModel.setModifiedIp(userIp);

		patientMapper.callGetAttendeePhotoDetails(patientModel);

		FileOutputStream fos = null;
		String path = null;
		try {
			System.out.println("File In Attendee pic.." + patientModel.getPicNamee());
			// patientModel.setPicName(picName);
			String fileName = patientModel.getPicNamee();
			// String sImg = request.getParameter("imgBase64");
			String simg = imgBase64.substring("data:image/png;base64,".length());
			// System.out.println("length......"+sImg.length());
			byte[] bimg64 = simg.getBytes();
			byte[] bimg = Base64.decodeBase64(bimg64);
			path = fileName + ".png";
			fos = new FileOutputStream(path);
			fos.write(bimg);
			// model.addAttribute("picName", path);

			String fileName1 = FilenameUtils.getName(path);
			System.out.println("File Name...........11....." + fileName1 + "......path....." + path);

			File dir = new File(patientPicPath);
			System.out.println("Dir..." + dir);
			if (!dir.exists()) {
				System.out.println("inside if dir");
				dir.mkdirs();
			}

			/*
			 * String destFile = "/varlib/tomcat7/webapps/op/" + "resources/photo/patient" +
			 * "." + fileName1;
			 */

			System.out.println("Patient Pic path..." + patientPicPath);

			String destFile = patientPicPath + "/" + fileName1;
			System.out.println("out if dir.....Dest file..." + destFile);
			File file = new File(path);
			OutputStream oos = new FileOutputStream(destFile);
			byte[] buf = new byte[8192];

			InputStream is = new FileInputStream(file);

			int counts = 0;

			while ((counts = is.read(buf, 0, buf.length)) > 0) {
				System.out.println("inside while");
				oos.write(buf, 0, counts);
				oos.flush();
			}
			oos.close();
			System.out.println("stop");
			is.close();

		} catch (Exception e) {
			e.printStackTrace();
			@SuppressWarnings("unused")
			String loggerMessage = "Upload image failed : ";
		} finally {
			if (fos != null) {
				fos.close();
			}
		}

		/*
		 * FileOutputStream fosClient = null; String pathClient = null; try { System.out
		 * .println("File Client......." + patientModel.getPicName()); //
		 * patientModel.setPicName(picName); String fileName =
		 * patientModel.getPicName(); // String sImg =
		 * request.getParameter("imgBase64"); String simg = imgBase64
		 * .substring("data:image/png;base64,".length()); //
		 * System.out.println("length......"+sImg.length()); byte[] bimg64 =
		 * simg.getBytes(); byte[] bimg = Base64.decodeBase64(bimg64); pathClient =
		 * fileName + ".png"; fosClient = new FileOutputStream(pathClient);
		 * fosClient.write(bimg); // model.addAttribute("picName", path);
		 * 
		 * String fileName1 = FilenameUtils.getName(pathClient);
		 * System.out.println("File Name...........11....." + fileName1 +
		 * "......path....." + pathClient);
		 * 
		 * File dirClient = new File(patientPicClientPath); System.out.println("Dir..."
		 * + dirClient); if (!dirClient.exists()) {
		 * System.out.println("inside if dir client"); dirClient.mkdirs(); }
		 * 
		 * System.out.println("Patient Pic path..." + patientPicClientPath);
		 * 
		 * String destFileClient = patientPicClientPath + "/" + fileName1;
		 * System.out.println("out if dir.....Dest file..." + destFileClient); File
		 * fileClient = new File(pathClient); OutputStream oos = new
		 * FileOutputStream(destFileClient); byte[] bufClient = new byte[8192];
		 * 
		 * InputStream is = new FileInputStream(fileClient);
		 * 
		 * int counts = 0;
		 * 
		 * while ((counts = is.read(bufClient, 0, bufClient.length)) > 0) {
		 * System.out.println("inside while"); oos.write(bufClient, 0, counts);
		 * oos.flush(); } oos.close(); System.out.println("stop"); is.close();
		 * 
		 * } catch (Exception e) { e.printStackTrace(); fosClient.close(); }
		 */

		return path;
	}

	@RequestMapping(value = "/registerPatient")
	@ResponseBody
	public String registerPatient(PatientModel patientModel, FeeModel feeModel, ApptModel apptModel,
			HttpServletRequest request, HttpSession session, AppointmentModel appointmentModel) throws IOException {

		ModelAndView model = new ModelAndView();
		String outputResult = "0";
		System.out.println("in reg pat appts...loc id.." + patientModel.getLocId() + "..dept id.."
				+ patientModel.getDeptId() + "..dept det.." + patientModel.getDeptName());

		// System.out.println("in submission...");
		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);
		System.out.println(userName+"userName...........");
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);

		System.out.println(patientModel.getPatientName()+"ammmmmmmmmmm1234567");
		
		
		if (patientModel.getPatientDetailsSplit().equals("regWise")) {
			System.out.println("in if." + patientModel.getRegPatientName());
			String s1 = patientModel.getRegPatientName();
			if (s1.contains("/")) {
				String[] parts = s1.split("/");// splits the string based on /
				String part1 = parts[0]; // 004
				String part2 = parts[1]; // 034556
				String part3 = parts[2]; // 034556
				patientModel.setPname(part2);
			} else {
				System.err.println("s1" + s1);
				patientModel.setPname(s1);
				// System.err.println("pname>>>>"+patientModel.getPname());
			}

		} else {
			System.out.println("in else.");

			System.out.println("in if." + patientModel.getPatientName());
			String s1 = patientModel.getPatientName();
			System.out.println("PATIENT NAME -----" + s1);
			if (s1.contains("/")) {
				String[] parts = s1.split("/");// splits the string based on /
				String part1 = parts[0]; // 004
				String part2 = parts[1]; // 034556
				String part3 = parts[2]; // 034556
				patientModel.setPname(part2);

			} else if (s1.contains(",")) {
				String[] patNam = s1.split(",");
				String patNam1 = patNam[0];
				System.out.println("patName1>>>>" + patNam1);
				patientModel.setPname(patNam1);
			} else {
				patientModel.setPname(s1);
			}

		}
		System.out.println("getPatientMobi..AMM... id"+patientModel.getPatientMobi());
		List<CorpRegistrationModel> patientLists = patientMapper.getPatientDetailsList(patientModel);
		System.out.println("patientLists..AMM... id"+patientLists.size());
		
		if (patientLists.size() == 0) {
			System.out.println("...........AMM...........");
		
			
		try {
			/*
			 * System.out.println("In 1st try...parent name " + patientModel.getParentName()
			 * + "gender" + patientModel.getGender() + "pname " + patientModel.getPname());
			 */
			System.out.println("radio buuton val.." + patientModel.getPatientDetailsSplit());
			System.out.println("pat id.." + patientModel.getPatientId());
			System.out.println("pat cat.." + patientModel.getPntCat());
			
			

		
			

			System.out.println("out loop.");
			if (patientModel.getPname().isEmpty()) {
				// System.out.println("INSIDE if");
				patientModel.setPname(patientModel.getParentName());
			}

			SMSModel smsModel = new SMSModel();
			smsModel.setMobileNum(patientModel.getMobNum());

			if (patientModel.getPatientId() == 0) {
				System.out.println(
						"in reg pat..dob.." + patientModel.getDob() + "..occupation.." + patientModel.getOccupation()
								+ "..credit org.." + patientModel.getOrgName() + "..sms.." + patientModel.isSmsAlert());
				if (patientModel.getDob().equals("") || patientModel.getDob().isEmpty()) {
					patientModel.setDob(null);
				}

				if (patientModel.isSmsAlert() == true) {
					patientModel.setSmsStatus("1");
				} else {
					patientModel.setSmsStatus("0");
				}
				// System.out.println("const id.." + patientModel.getApptModel().getEmpId());
				patientModel.setEmpId(patientModel.getApptModel().getEmpId());

				System.err.println("ref Id.." + patientModel.getRefId());
				System.err.println(patientModel.getDob() + "dob");

				/*** for file upload ***/

			  System.err.println(patientModel.getPatCatName() + "..pat catg name");
              System.out.println(patientModel.getNewOsideOrgId()+"..==================================out side org id");				
				System.out.println("paft fffffff..Rajareddy..fffffffffffffcat.." + patientModel.getPntCat());

				String locationIdString = String.valueOf(patientModel.getApptModel().getLocId());
				patientModel.setLocationId(locationIdString);
				System.out.println("paft fffffff..Rajareddy..fffffffffffffcat.." + patientModel.getLocationId());
				

				patientMapper.callSetPatientDetails(patientModel);
				
				System.out.println(
				        "Generated Patient Id : " + patientModel.getPatientId()
				);

				System.out.println(
				        "Generated UMR : " + patientModel.getPatientCode()
				);

				/* System.out.println("pntCat..Raja.."+patientModel.getPntCat()); */
				 
				if (patientModel.getPatientId() == null || patientModel.getPatientId() == 0) {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
				}

				/*
				 * try { if (NumberUtils.isNumber(patientModel.getMobNum()) == true) {
				 * smsModel.setSmsMsg("Thank you for the Registration... Indus Hospital");
				 * String opPatRes = SMSController.sendSmsAppt(smsModel);
				 * System.out.println("send msg op to pat..." + opPatRes); } } catch (Exception
				 * e) { e.printStackTrace(); }
				 */

				/*
				 * try { if (patientModel.getPntPortalSts().equals("1")) {
				 * patientMapper.setPortalRegPatient(patientModel); } } catch (Exception e) {
				 * e.printStackTrace(); }
				 */
			}

			System.out.println("Patient Id..." + patientModel.getPatientId());
			String dob = patientMapper.fetchPatientDOB(patientModel.getPatientId());
			System.out.println("===dob==="+dob);
			String age = patientMapper.fetchPatAge(patientModel.getPatientId());
			String month = patientMapper.fetchMonth(patientModel.getPatientId());
			String day = patientMapper.fetchDays(patientModel.getPatientId());
			System.out.println("====patAge====1=="+age);
			System.out.println("====AgeMonths====2=="+month);
			System.out.println("====AgeDays====3=="+day);
			System.err.println("dob  is ..........................." + dob);

			// Parse initial values as integers
			int initialYears = age != null && !age.isEmpty() ? Integer.parseInt(age) : 0;
			int initialMonths = month != null && !month.isEmpty() ? Integer.parseInt(month) : 0;
			int initialDays = day != null && !day.isEmpty() ? Integer.parseInt(day) : 0;

			if (dob != null && !dob.isEmpty()) {
			    try {
			        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			        Date patientDOB = dateFormat.parse(dob);
			        Date currentDate = new Date();
			        System.out.println("currentDate: ====" + currentDate);

			        // Define two dates
			        LocalDate startDate = patientDOB.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			        LocalDate endDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			        System.out.println("endDate: " + endDate);

			        // Calculate the period between the two dates
			        Period period = Period.between(startDate, endDate);

			        // Extract years, months, and days from the period
			        int years = period.getYears();
			        int months = period.getMonths();
			        int days = period.getDays();

			        System.err.println("years :" + years);
			        System.err.println("months :" + months);
			        System.err.println("days :" + days);

			        patientModel.setAge(String.valueOf(years));
			        patientModel.setAgeMonths(String.valueOf(months));
			        patientModel.setAgeDays(String.valueOf(days));
			    } catch (ParseException e) {
			        System.err.println("Error parsing date: " + e.getMessage());
			        // Handle the parsing error appropriately
			    }
			} else {
			    // Fetch the addedOn date if DOB is null or empty
			    String ageCalc = patientMapper.fetchAddedOnDate(patientModel.getPatientId());
			    System.err.println("addedOn is ..........................." + ageCalc);
			    if (ageCalc != null && !ageCalc.isEmpty()) {
			        try {
			            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			            Date addedOnDate = dateFormat.parse(ageCalc);
			            Date currentDate = new Date();
			            System.out.println("currentDate: ====" + currentDate);

			            // Define two dates
			            LocalDate startDate = addedOnDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			            LocalDate endDate = currentDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
			            System.out.println("endDate: " + endDate);

			            // Calculate the period between the two dates
			            Period period = Period.between(startDate, endDate);

			            // Add the calculated period to the initial values
			            int finalYears = initialYears + period.getYears();
			            int finalMonths = initialMonths + period.getMonths();
			            int finalDays = initialDays + period.getDays();

			            // Adjust months and days if necessary
			            if (finalDays >= 30) {
			                finalMonths += finalDays / 30;
			                finalDays = finalDays % 30;
			            }

			            if (finalMonths >= 12) {
			                finalYears += finalMonths / 12;
			                finalMonths = finalMonths % 12;
			            }

			            System.err.println("Final years :" + finalYears);
			            System.err.println("Final months :" + finalMonths);
			            System.err.println("Final days :" + finalDays);

			            patientModel.setAge(String.valueOf(finalYears));
			            patientModel.setAgeMonths(String.valueOf(finalMonths));
			            patientModel.setAgeDays(String.valueOf(finalDays));

			        } catch (ParseException e) {
			            System.err.println("Error parsing date: " + e.getMessage());
			            // Handle the parsing error appropriately
			        }
			    } else {
			        System.out.println("addedOn is null or empty. Cannot calculate age.&&&&&&&&&&&&&&&&");
			    }
			}
			patientMapper.updateEmpIdInPatTable(patientModel);
			
		

			if (patientModel.getPatientId() != 0 && patientModel.getApptModel().getEmpId() != null) {
				System.out.println("Inside Appt...");

				try {
					if (patientModel.getPntPortalSts().equals("1")) {

					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				try {
					reqFrmt = frmt.parse(patientModel.getApptModel().getScheduleDt());
					String dbFrmt1 = dbFrmt.format(reqFrmt);
					patientModel.getApptModel().setScheduleDt(dbFrmt1);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				patientModel.getApptModel().setPatientId(patientModel.getPatientId());
				/*
				 * patientModel.getApptModel().setAddedIp(request.getRemoteAddr() );
				 * patientModel.getApptModel().setAddedBy(username);
				 */
				System.out.println("org name.." + patientModel.getOrgName() + "..ref id.." + patientModel.getRefId());
				patientModel.getApptModel().setBillStatus(patientModel.getFeeModel().getStatus());
				patientModel.getApptModel().setVisitType(String.valueOf(patientModel.getVisitType()));
				patientModel.getApptModel().setRefType(patientModel.getRefType());
				patientModel.getApptModel().setPntCat(patientModel.getPntCat());
				/*
				 * patientModel.getApptModel().setOrgId(Integer.parseInt(patientModel.getOrgName
				 * ()));
				 */
				/*** COMMENTED ON 27TH JUNE BY PRABHU ***/
				patientModel.getApptModel().setOrgId(Integer.parseInt(patientModel.getPntCat()));
				patientModel.getApptModel().setOtherHospId(patientModel.getOtherHospId());
				patientModel.getApptModel().setOtherStaffId(patientModel.getOtherStaffId());
				patientModel.getApptModel().setOtherStaffName(patientModel.getOtherStaffName());
				System.err.println("getOtherStaffName ......>>>>>>" + appointmentModel.getOtherStaffName());
				patientModel.getApptModel().setRefId(patientModel.getRefId());

				patientModel.getApptModel().setAddedBy(userName);
				patientModel.getApptModel().setAddedIp(userIp);

				appointmentModel.setTokenNum(patientModel.getApptModel().getTokenNum());
				System.err.println("appointmentModelTokenNum>>>>>>" + appointmentModel.getTokenNum());
				
				System.err.println("getVisitType>>>ssssss>>>" + appointmentModel.getVisitType());
				apptMapper.callApptSetup(patientModel.getApptModel());

				System.out.println("Called appt Mapper..Appt Id..." + patientModel.getApptModel().getOpCode()
						+ "......." + patientModel.getApptModel().getApptId());

				if (patientModel.getApptModel().getOpCode() != null || patientModel.getApptModel().getApptId() != 0
						|| !patientModel.getApptModel().getOpCode().isEmpty()) {
					System.out.println("in setting bill det...");
					patientModel.getFeeModel().setApptId(patientModel.getApptModel().getApptId());
					/*
					 * patientModel.getFeeModel().setBillCategory(patientModel.getCategory());
					 * patientModel.getFeeModel().setPatientCategory(patientModel.
			outputResult		 * getPatientCategoryId());
					 */
					/* COMMENTED ON 27TH JUNE 2019 BY MEENAKSHI */
					patientModel.getFeeModel().setBillCategory(patientModel.getPntCat());
					patientModel.getFeeModel().setPatientCategory(Integer.parseInt(patientModel.getPntCat()));
					patientModel.getFeeModel().setDocId(patientModel.getApptModel().getEmpId());
					patientModel.getFeeModel().setPatientId(patientModel.getPatientId());

					if ((patientModel.getFeeModel().getRegStatus().equals("REG")
							|| patientModel.getFeeModel().getRegStatus().equals("BEFCONS"))
							|| (patientModel.getFeeModel().getConsStatus().equals("REG")
									|| patientModel.getFeeModel().getConsStatus().equals("BEFCONS"))) {
						patientModel.getFeeModel().setAddedBy(userName);
						patientModel.getFeeModel().setAddedIp(userIp);
						patientModel.getFeeModel().setPatientId(patientModel.getPatientId());
						patientModel.getFeeModel().setLocId(patientModel.getLocId());

						patientModel.getFeeModel().setPaymentType(patientModel.getPaymentType());
						patientModel.getFeeModel().setDisStaffId(patientModel.getDisStaffId());
						patientModel.getFeeModel().setRemarks(patientModel.getRemarks());
						patientModel.getFeeModel().setOrganizationsId(patientModel.getOrganizationsId());
						patientModel.getFeeModel().setEmpId(patientModel.getApptModel().getEmpId());
						System.err.println("getEmpIdvvvvvv!!!!!!!............." + patientModel.getEmpId());

						
						
						patientMapper.callSetBillDetails(patientModel.getFeeModel());
						

						

						
						System.err.println("AuthorizedBygggggggggggggggggg: " + patientModel.getFeeModel().getAuthorizedBy());
					
						
			     		patientModel.setBillIdAppt(patientModel.getFeeModel().getBillId());
			     		
			     		System.out.println("........Bill Id.......sandhya........"+patientModel.getFeeModel().getBillId());
			     		
			     		patientModel.setApptIdAppt(patientModel.getApptModel().getApptId());
			     		System.out.println("........Appointment Id.......sandhya........"+patientModel.getApptModel().getApptId());


			     		patientMapper.updateApptBillId(patientModel);
			     		
			      	     System.out.println(patientModel.getFeeModel().getBillId()+"....after.....update..getFeeModel().getBillId()........");
						
						System.out.println(patientModel.getFeeModel().getBillId() + ".......getFeeModel().getBillId()........");
						System.out.println("PATIENT OrgId******************"+patientModel.getOrganizationsId());

						System.out.println(" FEE MODEL OrgId******************"+patientModel.getFeeModel().getOrganizationsId());
						/*
						 * if (patientModel.getFeeModel().getBillId() != null) { //
						 * System.err.println(">>in if");
						 * 
						 * for(int i=0;i<patientModel.getCashPt().length;i++) {
						 * 
						 * if(patientModel.getAmounts()[i]!="" &&
						 * !(patientModel.getAmounts()[i].isEmpty()) &&
						 * patientModel.getAmounts()[i]!=null) {
						 * 
						 * patientModel.setPbillId(patientModel.getFeeModel().getBillId());
						 * System.err.println("inifBillId............."+patientModel.getPbillId());
						 * patientModel.setCashPts(patientModel.getCashPt()[i]);
						 * //System.err.println("cahspt............."+patientModel.getCashPt()[i]);
						 * patientModel.setAmountss(patientModel.getAmounts()[i]);
						 * //System.err.println("amounts................."+patientModel.getCashPt()[i]);
						 * patientModel.setTransNos(patientModel.getTransNo()[i]);
						 * //System.err.println("transNo................."+patientModel.getTransNo()[i])
						 * ; patientModel.setBankNames(patientModel.getBankName()[i]);
						 * //System.err.println("bankName................."+patientModel.getBankName()[i
						 * ]); patientModel.setChequeDates(patientModel.getChequeDate()[i]);
						 * //System.err.println("ChequeDate................."+patientModel.getChequeDate
						 * ()[i]);
						 * 
						 * if( patientModel.getCashPts()==276) {
						 * System.err.println("in if upi mob num---- "+ patientModel.getBankNames());
						 * 
						 * patientMapper.insertUpiType(patientModel); }else {
						 * patientMapper.insertchequeType(patientModel); }
						 * 
						 * 
						 * }
						 * 
						 * } }
						 */
						System.err.println("******** BEFORE BILL IF ********");
						System.err.println("BillId = "
						        + patientModel.getFeeModel().getBillId());
						if (patientModel.getFeeModel().getBillId() != null) {
							
							 patientModel.setRegAmount(patientModel.getFeeModel().getRegAmount());
								patientModel.setPbillId(patientModel.getFeeModel().getBillId());
								
								String regServIdd = patientMapper.getRegServiceId(patientModel); // this value getting from
								// at_services
                                patientModel.setServiceIdReg(regServIdd);
								
								
								String conServIdd = patientMapper.getconServiceId(patientModel); // this value getting from
								// at_source_service
								System.out.println("****************************" + conServIdd);
								patientModel.setServiceIdCon(conServIdd);
								
								if (patientModel.getFeeModel().getBillId() != null) {
									System.err.println(">>in if");
									System.err.println("  THIS IS AT_BILL_DETAILS SAVED 22222 ");

									System.err.println(patientModel.getRegDivSts() + ".......getRegDivSts()........");
									if (patientModel.getRegDivSts().equals("1")) {
										session.setAttribute("regDivSts", "1");

										patientModel.setLocId(patientModel.getApptModel().getLocId());
										System.out.println("in reg no and bill.." + patientModel.getPatientId() + "..ref type.."
												+ patientModel.getRefType() + "..loc id.." + patientModel.getLocId()
												+ "..pat cat.." + patientModel.getPatientCategoryId() + "..patId.."
												+ patientModel.getPatientId());
										patientMapper.setPatientRegistration(patientModel);
										System.out.println("new reg no..." + patientModel.getRegNum() + "service Id.."
												+ patientModel.getServiceChargeId());
										System.err.println(
												patientModel.getFeeModel().getRegStatus() + ".......getRegStatus()........");

										if (patientModel.getFeeModel().getRegStatus().equals("REG")
												|| patientModel.getFeeModel().getRegStatus().equals("BEFCONS")) {
											patientModel.getFeeModel().setLocId(patientModel.getLocId());
											System.out.println("service Id.." + patientModel.getServiceChargeId());
											System.err.println(patientModel.getLocId() + ".......locId>>>"
													+ patientModel.getFeeModel().getLocId());
											System.err.println(".......IN SET REGISTRATION........");

											patientMapper.setRegistrationFeeDetails(patientModel.getFeeModel());
										}
									} else {
										session.setAttribute("regDivSts", "0");
									}
									session.setAttribute("consDivSts", "1");
									System.err.println("******** CONS DETAILS ********");
									System.err.println("ConsStatus = ["
									        + patientModel.getFeeModel().getConsStatus() + "]");
									System.err.println("ConsAmount = ["
									        + patientModel.getFeeModel().getConsAmount() + "]");
									System.err.println("Patient ConsAmount = ["
									        + patientModel.getConsAmount() + "]");
									System.err.println("*******************************");

									if (patientModel.getFeeModel().getConsStatus().equals("REG")
											|| patientModel.getFeeModel().getConsStatus().equals("BEFCONS")) {

										patientModel.getFeeModel().setLocId(patientModel.getLocId());
										System.err.println(patientModel.getLocId() + ".......locId>>>"
												+ patientModel.getFeeModel().getLocId());
									    System.err.println("PatientModel ConsAmount : "
									            + patientModel.getConsAmount());	
									
										patientMapper.setConsultationFeeDetails(patientModel.getFeeModel());
										 System.err.println("AFTER setConsultationFeeDetails");
										    System.err.println("FeeModel ConsAmount AFTER : "
										            + patientModel.getFeeModel().getConsAmount());
									}
								}
								
		
								
							for (int i = 0; i < patientModel.getCreditPts().length; i++) {
								
								System.out.println("patientModel.getCreditPts()...AMMM.......maniiiiiii..2....");
								try {
									patientModel.setCreditPt(patientModel.getCreditPts()[i]);
									patientModel.setAmount(patientModel.getCreditAmounts()[i]);
									System.out.println(patientModel.getAmount()+"patientModel.getAmount()....Maniiii....");
									System.out.println("in getCreditPt Cash @@@@@@@@@@@@@@@@@@@@" + patientModel.getCreditPt());
								String billIdCheck=patientMapper.getPayModeBillNumber(patientModel);
								
					    		
								if (Float.parseFloat(patientModel.getAmount()) > 0) {
								    System.out.println("in bill Cash @@@@@@@@@@@@@@@@@@@@" + patientModel.getCreditPt());
								    int creditPts = Integer.parseInt(patientModel.getCreditPt());
								    if(creditPts==275) {
								    	   System.out.println("275555555");
								    	patientModel.setCreditPt(patientModel.getCreditPts()[i]);
										patientModel.setAmount(patientModel.getCreditAmounts()[i]);
								    /*	if (billIdCheck == null) { 

								    		
								    	float subRegCash = (Float.parseFloat(patientModel.getAmount())) - (Float.parseFloat(patientModel.getRegAmount()));
								        patientModel.setAmountss(Float.toString(subRegCash));
								        patientMapper.insertRegistrationAppend(patientModel);
								        patientMapper.insertchequeTypeAppend(patientModel);
								    } else {
								        System.out.println("Entering else block...");
								        patientMapper.insertchequeTypeAppend(patientModel); 
								    }*/
										
										List<CorpRegistrationModel> paymentLists = patientMapper.getPayModeBillNumberReci(patientModel);
										System.out.println("patientLists..AMM... id"+paymentLists.size());
										
										if (paymentLists.size() == 0) {
											System.out.println("...........AMM...........");
											if (billIdCheck == null) { 
										        float subRegCash = (Float.parseFloat(patientModel.getAmount())) - (Float.parseFloat(patientModel.getRegAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertRegistrationAppend(patientModel);
										        patientMapper.insertchequeTypeAppend(patientModel);
										    } else {
										        System.out.println("Entering else block...");
										        patientMapper.insertchequeTypeAppend(patientModel);
										    }
											
										}else {
											if (billIdCheck == null) { 
												System.out.println(patientModel.getAmount()+"patientModel.getAmount(276666)....Maniiii....");
												float subRegCash = (Float.parseFloat(patientModel.getAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertchequeTypeAppend(patientModel);
										    } else {
										        System.out.println("Entering else block...");
										        float subRegCash = (Float.parseFloat(patientModel.getAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertchequeTypeAppend(patientModel);
										    }
										}
								    }
								    
								    if(creditPts==276) {
								    	System.out.println("276666666");
								    	
										try {
											patientModel.setCreditPt(patientModel.getCreditPts()[i]);
											patientModel.setAmount(patientModel.getCreditAmounts()[i]);
											patientModel.setCardTypes(patientModel.getCardcardTypes()[i]);
											patientModel.setCreditNos(patientModel.getCreditNoss()[i]);
											patientModel.setCardBankName(patientModel.getCardBankNamess()[i]);
											patientModel.setExpDates(patientModel.getCreditDates()[i]);
											}catch(ArrayIndexOutOfBoundsException e) {
												e.printStackTrace();
											}
										
								    	/*if (billIdCheck == null) { 
									        float subRegCash = (Float.parseFloat(patientModel.getAmount()));
									        patientModel.setAmountss(Float.toString(subRegCash));
									       
									    } else {
									        System.out.println("Entering else block...");
									        patientMapper.insertCardTypeAppend(patientModel);
									    }*/
								    	
								    	List<CorpRegistrationModel> paymentListsCard = patientMapper.getPayModeBillNumberReci(patientModel);
										System.out.println("patientLists..AMM... id"+paymentListsCard.size());
										
										if (paymentListsCard.size() == 0) {
											System.out.println("...........AMM...........");
											if (billIdCheck == null) { 
												System.out.println(patientModel.getAmount()+"patientModel.getAmount(276666)....Maniiii....");
												float subRegCash = (Float.parseFloat(patientModel.getAmount())) - (Float.parseFloat(patientModel.getRegAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertRegistrationAppend(patientModel);
										        patientMapper.insertCardTypeAppend(patientModel);
										    } else {
										        System.out.println("Entering else block...");
										        patientMapper.insertCardTypeAppend(patientModel);
										    }
											
										}else {
											if (billIdCheck == null) { 
												System.out.println(patientModel.getAmount()+"patientModel.getAmount(276666)....Maniiii....");
												float subRegCash = (Float.parseFloat(patientModel.getAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertCardTypeAppend(patientModel);
										    } else {
										        System.out.println("Entering else block...");
										        float subRegCash = (Float.parseFloat(patientModel.getAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertCardTypeAppend(patientModel);
										    }
										}
									    }
								    
								    if(creditPts==277) {
								    	System.out.println("27777777777");
								    	patientModel.setCreditPt(patientModel.getCreditPts()[i]);
										patientModel.setAmount(patientModel.getCreditAmounts()[i]);
										try {
										patientModel.setTransNos(patientModel.getCreditNoss()[i]);
										System.out.println(patientModel.getTransNos()+"patientModel transc nooooooo");
										}catch(ArrayIndexOutOfBoundsException e) {
											e.printStackTrace();
										}
								    	/*if (billIdCheck == null) { 
									        float subRegCash = (Float.parseFloat(patientModel.getAmount()));
									        patientModel.setAmountss(Float.toString(subRegCash));
									        patientMapper.insertchequeTypeUpii(patientModel); 
									    } else {
									        System.out.println("Entering else block...");
									        patientMapper.insertchequeTypeUpii(patientModel); 
									    }*/
								    	
								    	List<CorpRegistrationModel> paymentListsUpi = patientMapper.getPayModeBillNumberReci(patientModel);
										System.out.println("patientLists..AMM... id"+paymentListsUpi.size());
										
										if (paymentListsUpi.size() == 0) {
											System.out.println("...........AMM...........");
											if (billIdCheck == null) { 
												System.out.println(patientModel.getAmount()+"patientModel.getAmount(2777777)....Maniiii....");
												float subRegCash = (Float.parseFloat(patientModel.getAmount())) - (Float.parseFloat(patientModel.getRegAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertRegistrationAppend(patientModel);
										        patientMapper.insertchequeTypeUpii(patientModel); 
										    } else {
										        System.out.println("Entering else block...");
										        patientMapper.insertchequeTypeUpii(patientModel); 
										    }
											
										}else {
											if (billIdCheck == null) { 
												System.out.println(patientModel.getAmount()+"patientModel.getAmount(2777777)....Maniiii....");
												float subRegCash = (Float.parseFloat(patientModel.getAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										        patientMapper.insertchequeTypeUpii(patientModel); 
										    } else {
										    	System.out.println(patientModel.getAmount()+"patientModel.getAmount(2777777)....Maniiii....");
												float subRegCash = (Float.parseFloat(patientModel.getAmount()));
										        patientModel.setAmountss(Float.toString(subRegCash));
										    	System.out.println("Entering else block...");
										        patientMapper.insertchequeTypeUpii(patientModel); 
										    }
										}
									    }
								} else {
								    System.out.println("Amount is less than 50.");
								}

								
								}catch(Exception e) {
									e.printStackTrace();
								}
								
							}
							// System.err.println(">>in if");
							patientModel.setEmpId(patientModel.getApptModel().getEmpId());
							String regServId = patientMapper.getRegServiceId(patientModel); // this value getting from
																							// at_services
							patientModel.setServiceIdReg(regServId);
							System.out.println("***********AMMM*****************" + patientModel.getPntCat());
							System.out.println("***********MAAA*****************" + patientModel.getEmpId());
							String conServId = patientMapper.getconServiceId(patientModel); // this value getting from
																							// at_source_service
							System.out.println("****************************" + conServId);
							patientModel.setServiceIdCon(conServId);

							for (int i = 0; i < patientModel.getCashPt().length; i++) {
								System.err.println("^^^^^^^^^^^^^^^^^Amount^^^^^^^^^" + patientModel.getAmounts()[i]);
								if (patientModel.getAmounts()[i] != "" && !(patientModel.getAmounts()[i].isEmpty())
										&& patientModel.getAmounts()[i] != null
										&& !(patientModel.getAmounts()[i].equals("0.00"))
										&& !(patientModel.getAmounts()[i].equals("0"))) {

									patientModel.setPbillId(patientModel.getFeeModel().getBillId());
									System.err.println("inifBillId............." + patientModel.getPbillId());
									patientModel.setCashPts(patientModel.getCashPt()[i]);
									// System.err.println("cahspt............."+patientModel.getCashPt()[i]);
									patientModel.setAmountss(patientModel.getAmounts()[i]);
									// System.err.println("amounts................."+patientModel.getCashPt()[i]);
									patientModel.setTransNos(patientModel.getTransNo()[i]);
									// System.err.println("transNo................."+patientModel.getTransNo()[i]);
									patientModel.setBankNames(patientModel.getBankName()[i]);
									// System.err.println("bankName................."+patientModel.getBankName()[i]);
									patientModel.setChequeDates(patientModel.getChequeDate()[i]);
									patientModel.setCreditNos(patientModel.getCreditNo()[i]);
									
									patientModel.setCardTypes(patientModel.getCardType()[i]);
									patientModel.setExpDates(patientModel.getExpDate()[i]);
									patientModel.setCardBankName(patientModel.getCardBankNames()[i]);
									
									System.err.println("getCardBankNames........SANDHYA........."+patientModel.getCardBankNames()[i]);

									System.err.println(
											"IN FOR LOOP $$$$$$$$$$$$$$$Patient Registation final Amount********************"
													+ patientModel.getFeeModel().getRegAmount());
									System.err.println(
											"IN FOR LOOP $$$$$$$$$$$$$$$Patient CONSULTATION  final Amount********************"
													+ patientModel.getFeeModel().getConsAmount());
									patientModel.setRegAmount(patientModel.getFeeModel().getRegAmount());
									patientModel.setConsAmount(patientModel.getFeeModel().getConsAmount());

									/*
									 * if (!(patientModel.getAmountss().equals("0.00"))) {
									 * System.out.println("...in if...");
									 * patientMapper.insertPatPaymentDetails(patientModel);
									 * 
									 * } else { System.err.println("...in else....");
									 * 
									 * }
									 */

									
									  patientModel.setRegAmount(patientModel.getFeeModel().getRegAmount());
									  patientModel.setConsAmount(patientModel.getFeeModel().getConsAmount());
									  
									 /* if( patientModel.getCashPts()==276) {
									  System.err.println("in if upi mob num---- "+ patientModel.getBankNames());
									  patientMapper.insertRegistration(patientModel);
									  patientMapper.insertUpiType(patientModel);
									  
									  }*/
									  
									/* else { */
									  
									  String billIdCheck=patientMapper.getPayModeBillNumber(patientModel);
									  
									  if(patientModel.getCashPts()==275 && Float.parseFloat(patientModel.getAmountss())>0) {
									  System.out.println("in cash @@@@@@@@@@@@@@@@@@@@");
									  
									  
									  System.out.println("in bill Cash @@@@@@@@@@@@@@@@@@@@"+billIdCheck);
									  if(billIdCheck==null) { 
									  float  subRegCash=(Float.parseFloat(patientModel.getAmountss()))-(Float.parseFloat(patientModel.getRegAmount()));
									  patientModel.setAmountss(Float.toString(subRegCash));
									  
									  patientMapper.insertRegistration(patientModel);
									  patientMapper.insertchequeType(patientModel);
									  }
									  else {
									  patientMapper.insertchequeType(patientModel); 
									  }
									  
									  }
									  
									
									  if(patientModel.getCashPts()==275 && Float.parseFloat(patientModel.getAmountss()) < 50
											  && Float.parseFloat(patientModel.getAmountss()) >0 ) {
									  System.out.println("in cash @@@@@@@@@@@@@@@@@@@@ mmmmless than 50 ADI ^^^^^^^^^^^^^rupees");
									  
									  patientMapper.callGetinsertchequeRegType(patientModel);
									  }
									  
									  
									  
									  
									  
									  if(patientModel.getCashPts()==276 && Float.parseFloat(patientModel.getAmountss())>0) {
										  System.out.println("in card @@@@@@@@@@@@@@@@@@@@");
											  if(billIdCheck== null) {
											  System.out.println("in bill card @@@@@@@@@@@@@@@@@@@@"+billIdCheck); 
											  float subRegCash=(Float.parseFloat(patientModel.getAmountss()))-(Float.parseFloat(patientModel.getRegAmount()));
											  patientModel.setAmountss(Float.toString(subRegCash));
											  patientMapper.insertRegistration(patientModel);
											  patientMapper.insertUpiType(patientModel);
											  } else {
												  patientMapper.insertUpiType(patientModel);
											  } 
										  }
										  
										  
										 /* if(patientModel.getCashPts()==276 && Float.parseFloat(patientModel.getAmountss())<50) {
										  System.out.println("in bill card less than 50 Rupees");
										//  patientMapper.insertchequeType(patientModel);
										  patientMapper.insertUpiType(patientModel);
										  }*/
									  
									  
									  
									  if(patientModel.getCashPts()==276 && Float.parseFloat(patientModel.getAmountss())<50) {
										  System.out.println("in bill card less than 50 Rupees Srav;;;;;;;;;;;;;;;;   "+patientModel.getAmountss());
										//  patientMapper.insertchequeType(patientModel);
										  
										  patientMapper.callGetinsertchequeRegType(patientModel);
										  }
									  
									  
									  
									  
									  
									  
									  
									  if(patientModel.getCashPts()==277 && Float.parseFloat(patientModel.getAmountss())>0) {
									  System.out.println("in UPi @@@@@@@@@@@@@@@@@@@@");
										  if(billIdCheck== null) {
										  System.out.println("in bill upi @@@@@@@@@@@@@@@@@@@@"+billIdCheck); 
										  float subRegCash=(Float.parseFloat(patientModel.getAmountss()))-(Float.parseFloat(patientModel.getRegAmount()));
										  patientModel.setAmountss(Float.toString(subRegCash));
										  patientMapper.insertRegistration(patientModel);
										  patientMapper.insertchequeType(patientModel); 
										  } else {
										  patientMapper.insertchequeType(patientModel); } 
									  }
									  
									  
									  /*if(patientModel.getCashPts()==277 && Float.parseFloat(patientModel.getAmountss())<50) {
									  System.out.println("in bill upi less than 50 Rupees");
									  patientMapper.insertchequeType(patientModel);
									  
									  }*/
									  
									  
									  if(patientModel.getCashPts()==277 && Float.parseFloat(patientModel.getAmountss())<50) {
										  System.out.println("in bill upi less than 50 Rupees  sri :::::::::::::::::::::::::::    "+patientModel.getAmountss());
										 
										  patientMapper.callGetinsertchequeRegType(patientModel);
										  
										  }
									  
									  
									/*  }*/
									 

								}

							}
							
						
						}
       
						System.err.println("  THIS IS AT_BILL_DETAILS SAVED 1111 ");

						
						/*if (patientModel.getFeeModel().getBillId() != null) {
							System.err.println(">>in if");
							System.err.println("  THIS IS AT_BILL_DETAILS SAVED 22222 ");

							System.err.println(patientModel.getRegDivSts() + ".......getRegDivSts()........");
							if (patientModel.getRegDivSts().equals("1")) {
								session.setAttribute("regDivSts", "1");

								patientModel.setLocId(patientModel.getApptModel().getLocId());
								System.out.println("in reg no and bill.." + patientModel.getPatientId() + "..ref type.."
										+ patientModel.getRefType() + "..loc id.." + patientModel.getLocId()
										+ "..pat cat.." + patientModel.getPatientCategoryId() + "..patId.."
										+ patientModel.getPatientId());
								patientMapper.setPatientRegistration(patientModel);
								System.out.println("new reg no..." + patientModel.getRegNum() + "service Id.."
										+ patientModel.getServiceChargeId());
								System.err.println(
										patientModel.getFeeModel().getRegStatus() + ".......getRegStatus()........");

								if (patientModel.getFeeModel().getRegStatus().equals("REG")
										|| patientModel.getFeeModel().getRegStatus().equals("BEFCONS")) {
									patientModel.getFeeModel().setLocId(patientModel.getLocId());
									System.out.println("service Id.." + patientModel.getServiceChargeId());
									System.err.println(patientModel.getLocId() + ".......locId>>>"
											+ patientModel.getFeeModel().getLocId());
									System.err.println(".......IN SET REGISTRATION........");

									patientMapper.setRegistrationFeeDetails(patientModel.getFeeModel());
								}
							} else {
								session.setAttribute("regDivSts", "0");
							}
							session.setAttribute("consDivSts", "1");

							if (patientModel.getFeeModel().getConsStatus().equals("REG")
									|| patientModel.getFeeModel().getConsStatus().equals("BEFCONS")) {

								patientModel.getFeeModel().setLocId(patientModel.getLocId());
								System.err.println(patientModel.getLocId() + ".......locId>>>"
										+ patientModel.getFeeModel().getLocId());
								patientMapper.setConsultationFeeDetails(patientModel.getFeeModel());
							}
						}*/
						
						System.err.println("getOrganizationsId patCatName >>>>>" + patientModel.getOrganizationsId());
						if (patientModel.getOrganizationsId() == 0) {
						System.out.println("D V P ..................");
							if (patientModel.getPatientDetailsSplit().equals("apptWise")) {
							System.err.println("update patCatName >>>>>" + patientModel.getPatCatName());
							patientMapper.updatePatCatName(patientModel);
						}
						if (patientModel.getPatientId() != 0) {
							//System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatientName());
						//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatientTitle());
						//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPtitle());
						//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getlName());
							String patientName = patientModel.getPatientName();
							patientName = patientName.replaceAll(",", "");
							patientModel.setPatNamee(patientName);
							System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatNamee());
							System.out.println("D V P .................getPname"+patientModel.getPname());
							patientMapper.updateInPatTable(patientModel);
						}

						} else {
							System.out.println("D V P ..................IN ELSEEEE");
							patientModel.setPatientCategoryOrgId(patientModel.getPatientCategoryOrgId());
							System.out.println("D V P ..................IN ELSEEEE"+patientModel.getPatientCategoryOrgId());
							System.out.println("D V P .................getPname"+patientModel.getPname());
							if (patientModel.getPatientId() != 0) {
								//System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatientName());
							//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatientTitle());
							//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPtitle());
							//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getlName());
								String patientName = patientModel.getPatientName();
								patientName = patientName.replaceAll(",", "");
								patientModel.setPatNamee(patientName);
								System.out.println("patientCategoryOrgId............"+patientModel.getPatientCategoryOrgId());

								patientMapper.updatePatTable(patientModel);
							}
						}

						
						outputResult = "1" + "^" + patientModel.getPatientCode() + "^" + patientModel.getPatientId();
						} else {

					
						outputResult = "0";
					}

				}
			} else {
	
				outputResult = "0";
			}
		} catch (Exception e) {
			
			outputResult = "0";
//			e.printStackTrace();
		} finally {
			System.out.println("in finally...");
			
			if (patientModel.getPatientId() != 0) {
				//System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatientName());
			//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPatientTitle());
			//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getPtitle());
			//	System.out.println("ammmmmmmmmmmmmmmmmmmmm"+patientModel.getlName());
				String patientName = patientModel.getPatientName();
				patientName = patientName.replaceAll(",", "");
				patientModel.setPatNamee(patientName);
				System.out.println("patientCategoryOrgId......AMMMM......"+patientModel.getPatientCategoryOrgId());

				patientMapper.updatePatTableCate(patientModel);
			}
			// model = getPatientQueue(null, session);
			// model.setViewName(moduleName + "/patientQueue");
//			model = getPatientQueue(null, session);
//			model.setViewName(moduleName + "/opBillPrintViewjasper");
		}
		
		}else {
			System.out.println("!!!manu!!!!");
			 Integer patientId = patientLists.get(0).getPatientId();  // Assuming orgId is Integer in your model
		        String umrNo = patientLists.get(0).getUmrNo();
		        // Store the orgId in the session for future use
		        session.setAttribute("patientId", patientId);
		        session.setAttribute("umrNo", umrNo);
		        System.out.println("tariffName......."+umrNo);
		        System.out.println("orgName......."+patientId);
		        
			outputResult = "9"+ "^" + umrNo+ "^" + patientId;
			
			System.out.println(" ELSEEEEEEE........"+outputResult);
		}

		/*session.setAttribute("opBillId", patientModel.getFeeModel().getBillId());
		session.setAttribute("recptNo", "0");

		System.out.println("pat registered...locid.." + patientModel.getUserLocId() + "..dept id.."
				+ patientModel.getUserDeptId() + "..dept name.." + patientModel.getDeptName() + "..reprt frm dt.."
				+ patientModel.getApptFromDate() + "..to dt.." + patientModel.getApptToDate());
		model.addObject("locId", patientModel.getUserLocId());
		model.addObject("deptId", patientModel.getUserDeptId());
		model.addObject("deptName", patientModel.getDeptName());

		model.addObject("reportFromDt", patientModel.getApptFromDate());
		model.addObject("reportToDt", patientModel.getApptToDate());

		model.addObject("patApptSts", "1");
		model.addObject("searchApptSts", "1");
*/
		// to get serviceId

		/*
		 * FeeModel getService=patientMapper.getService(patientModel.getFeeModel());
		 * System.out.println("serviceId="+getService.getServiceId());
		 * feeModel.setServiceId(getService.getServiceId());
		 * 
		 * //to get validity based on service id and visit type FeeModel
		 * getValidity=patientMapper.getValidity(feeModel);
		 * feeModel.setValidity(getValidity.getValidity());
		 * 
		 * 
		 * int setValidity=patientMapper.setBillValidity(feeModel);
		 * System.out.println("setValidity="+setValidity);
		 */

		// to get visit type
		/*
		 * FeeModel
		 * getVisitTypee=patientMapper.getVisitType(patientModel.getFeeModel());
		 * System.out.println("visitType="+getVisitTypee.getVisitType());
		 * feeModel.setVisitType(getVisitTypee.getVisitType());
		 * 
		 * List<PatientModel> billServicesList= null; billServicesList =
		 * patientMapper.getBillServices(feeModel);
		 * System.out.println("billServicesList...size"+billServicesList.size());
		 * model.addObject("billServicesList", billServicesList);
		 * model.addObject("size", billServicesList.size());
		 * feeModel.setBillId(patientModel.getFeeModel().getBillId()); //
		 * patientModel.setBillId(patientModel.getFeeModel().getBillId());
		 * System.err.println("bill Id in feeModel>>>>"+feeModel.getBillId());
		 * System.err.println("bill Id in patModel>>>>"+patientModel.getBillId());
		 * System.err.println("doc Id>>>>"+patientModel.getEmpId()+"specNagetPatientDetailsListme.."+
		 * patientModel.getSpecName() +"patientId.."+patientModel.getPatientId()
		 * +"apptId>>>>"+patientModel.getFeeModel().getApptId()); PatientModel
		 * getDocName=patientMapper.getDocName(feeModel);
		 * model.addObject("docDetails",getDocName); PatientModel getPatientDetails=
		 * patientMapper.getPatientDetailsOnBillId(feeModel);
		 * model.addObject("patientDetails", getPatientDetails);
		 * 
		 * System.out.println("billDate......."+getPatientDetails.getBillDate());
		 * PatientModel billDetails= patientMapper.getBillDetailsOnBillId(feeModel);
		 * model.addObject("billDetails", billDetails);
		 */

		// to get billId
	/*	model.addObject("billId", patientModel.getFeeModel().getBillId());
		session.setAttribute("billId", patientModel.getFeeModel().getBillId());
		// patientModel.setBillId(patientModel.getFeeModel().getBillId());
		feeModel.setBillId(patientModel.getFeeModel().getBillId());
		System.out.println("billId.." + patientModel.getFeeModel().getBillId());

		// to get apptId
		model.addObject("apptId", patientModel.getFeeModel().getApptId());
		session.setAttribute("apptId", patientModel.getFeeModel().getApptId());
		feeModel.setApptId(patientModel.getFeeModel().getApptId());
		System.out.println("apptId.." + patientModel.getFeeModel().getApptId());
		System.out.println("patientId.." + patientModel.getPatientId());

		System.out.println("in getting reg det...");
		System.out.println("reg..billId==" + feeModel.getBillId() + "apptId==" + feeModel.getApptId() + "patientId=="
				+ patientModel.getPatientId());
		patientModel.getPatientId();
		// System.out.println("billcount>>>>"+patientModel.getBillCount());

		PatientModel regBillDetails = patientMapper.getRegBill(feeModel);
		// System.out.println("billCount..."+regBillDetails.getBillCount());
		// System.out.println("getRegBill-Size= "+regBillDetails.size());
		System.out.println("billId==" + feeModel.getBillId() + "apptId==" + feeModel.getApptId() + "patientId=="
				+ patientModel.getPatientId());
		model.addObject("regBillDetails", regBillDetails);

		System.out.println("op..billId==" + feeModel.getBillId() + "apptId==" + feeModel.getApptId() + "patientId=="
				+ patientModel.getPatientId());

		PatientModel opBilldetails = patientMapper.getConBill(feeModel);
		model.addObject("opBilldetails", opBilldetails);
		System.out.println(">>>>>>>>>>>>>>pntcat" + opBilldetails.getPntCat() + "apptId==" + feeModel.getApptId()
				+ "patientId==" + patientModel.getPatientId());*/
		// model.setViewName(moduleName + "/patientQueue");
//		model.setViewName(moduleName + "/opBillPrintViewjasper");
		return outputResult;
	}

	@RequestMapping(value = "/searchAppointments", method = RequestMethod.POST)
	public ModelAndView searchAppointments(PatientModel patientModel, HttpSession session) {

		ModelAndView model = new ModelAndView();

		System.out.println("in search appts...from dt.." + patientModel.getApptFromDate() + "..to dt.."
				+ patientModel.getApptToDate() + "..loc id.." + patientModel.getLocId() + "..dept id.."
				+ patientModel.getDeptId() + "..dept det.." + patientModel.getDeptName() + "..usr org sts.."
				+ patientModel.getUserOrgStatus() + "..loc sts.." + patientModel.getUserLocStatus() + "..dept sts.."
				+ patientModel.getUserDeptStatus());

		session.setAttribute("patientQueueInitial", "0");
		model = getPatientQueue(patientModel, session);
		model.setViewName(moduleName + "/patientQueue");
		model.addObject("reportFromDt", patientModel.getApptFromDate());
		model.addObject("reportToDt", patientModel.getApptToDate());

		model.addObject("locId", patientModel.getLocId());
		model.addObject("deptId", patientModel.getDeptId());
		model.addObject("deptName", patientModel.getDeptName());

		model.addObject("searchApptSts", "1");
		model.addObject("patApptSts", "0");

		session.setAttribute("msg", "");
		model.setViewName(moduleName + "/patientQueue");
		return model;
	}

	@RequestMapping(value = "/searchPatients", method = RequestMethod.GET)
	public ModelAndView searchPatients(@ModelAttribute PatientModel patient) {
		System.out.println("in search pat..frm.." + patient.getFromDate() + "..to.." + patient.getToDate() + "..umr.."
				+ patient.getUmrNo() + "..pat name.." + patient.getPname() + "..mob no.." + patient.getMobNum()
				+ "..dob.." + patient.getDob() + "..gender.." + patient.getGender());
		// if From date is empty set it to null
		if (patient.getFromDate() != null && patient.getFromDate().isEmpty()) {
			System.out.println("fromdate....." + patient.getFromDate());
			patient.setFromDate(null);
		}
		// if To date is empty set it to null
		if (patient.getToDate() != null && patient.getToDate().isEmpty()) {
			System.out.println("patient.getToDate....." + patient.getToDate());
			patient.setToDate(null);
		}
		// if Umr number is empty set it to null
		if (patient.getUmrNo() != null && patient.getUmrNo().isEmpty()) {
			System.out.println("patient.getUmrNo()....." + patient.getUmrNo());
			patient.setUmrNo(null);
		}
		// if Patient name is empty set it to null
		System.out.println("pname " + patient.getPname());
		if (patient.getPname() == null) {
			System.out.println("patient.getPname()....." + patient.getPname());
			patient.setPname(patient.getPname());
		} else {
			System.out.println("in else part");
		}
		System.out.println("after " + patient.getPname());
		// if mobile number is empty set it to null
		if (patient.getMobNum() != null && patient.getMobNum().isEmpty()) {
			System.out.println("patient.getMobNum()....." + patient.getMobNum());
			patient.setMobNum(null);
		}
		// //if gender is empty set it to null
		if (patient.getGender() != null && patient.getGender().isEmpty()) {
			System.out.println("patient.getGender()....." + patient.getGender());
			patient.setGender(null);
		}
		// if DOB is empty set it to null
		if (patient.getDob() != null && patient.getDob().isEmpty()) {
			System.out.println("patient.getDob()....." + patient.getDob());
			patient.setDob(null);
		}
		/*
		 * // if Parent name is empty set it to null if (patient.getPname() != null &&
		 * patient.getPname().isEmpty()) {
		 * System.out.println("patient.getParentName()....." + patient.getParentName());
		 * patient.setPname(patient.getParentName()); }
		 */

		String patientLike = "%" + patient.getPname() + "%";
		patient.setPatientLike(patientLike);

		List<PatientModel> patientModel = patientMapper.searchPatients(patient);

		ModelAndView model = new ModelAndView();
		model.addObject("patientList", patientModel);

		List<PatientModel> refTypes = patientMapper.getRefCategories("REFTYPE");
		model.addObject("refTypes", refTypes);

		List<PatientModel> payTypeList = patientMapper.getPaymentTypeList();
		System.err.println("payTypeList---->" + payTypeList.size());
		model.addObject("payTypeList", payTypeList);

		/*
		 * List<OrganizationModel> consDetails = patientMapper.getOrgDetails();
		 * model.addObject("orgList", consDetails);
		 */
		/* commented on 27 june 2019 by saiprabhu */

		List<PatientModel> consDetails = patientMapper.getOrgDetails();
		model.addObject("orgList", consDetails);

		List<DoctorModel> refList = patientMapper.getListOfReferals();
		model.addObject("ref", refList);

		List<PatientModel> patientCat = patientMapper.getCategories("PATCAT");
		model.addObject("patientCategory", patientCat);

		String orgName = "Indus Hospitals";
		List<LocationModel> locations = patientMapper.getLocations(orgName);
		model.addObject("locList", locations);

		List<DoctorModel> doctorList = patientMapper.getAvailableDoctors();
		// System.out.println("doc list.." + doctorList.size());
		model.addObject("docList", doctorList);
		
		// System.out.println("doc list.." + doctorList.size());
		//model.addObject("AuthorizedList", AuthorizedList);

		/*
		 * List<PatientModel> specList = patientMapper.getSpecDetails();
		 * model.addObject("specList", specList);
		 */

		model.setViewName(moduleName + "/patientSearchList");

		return model;

	}

	@RequestMapping(value = "/getPatientDetails", method = RequestMethod.GET)
	public ModelAndView getPatientDetails(@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
		System.out.println("Patient Id.." + patientId);
		ModelAndView mav = new ModelAndView();
		PatientModel patientModel = new PatientModel();
		JSONObject jsonUmr = new JSONObject();
		try {
			patientModel = patientMapper.getPatientDetails(patientId);
			System.out.println("......." + patientModel.getPatientCode() + ".........." + patientModel.getPatientId()
					+ "..city.." + patientModel.getCity() + "..martial stat.." + patientModel.getMaritalStatus()
					+ "..dob.." + patientModel.getDob());
			if (!patientModel.equals(null)) {
				jsonUmr.put("patientId", patientModel.getPatientId());
				jsonUmr.put("patientCode", patientModel.getPatientCode());
				jsonUmr.put("ptitle", patientModel.getPtitle());
				// System.out.println("tit"+ patientModel.getPtitle());
				jsonUmr.put("pname", patientModel.getPname());
				jsonUmr.put("patientCategory", patientModel.getPatientCategory());
				jsonUmr.put("gender", patientModel.getGender());
				jsonUmr.put("age", patientModel.getAge());
				jsonUmr.put("careBy", patientModel.getCareBy());
				jsonUmr.put("careByName", patientModel.getCareByName());
				jsonUmr.put("mobNum", patientModel.getMobNum());
				jsonUmr.put("creditOrg", patientModel.getOrgId());
				jsonUmr.put("smsStatus", patientModel.getSmsStatus());
				jsonUmr.put("state", patientModel.getState());
				jsonUmr.put("city", patientModel.getCity());
				jsonUmr.put("village", patientModel.getVillage());
				jsonUmr.put("country", patientModel.getCountry());
				jsonUmr.put("address", patientModel.getAddr());
				jsonUmr.put("maritalStatus", patientModel.getMaritalStatus());
				jsonUmr.put("bloodGrp", patientModel.getBloodGrp());
				jsonUmr.put("dob", patientModel.getDob());
				jsonUmr.put("nationality", patientModel.getNationality());
				jsonUmr.put("religion", patientModel.getReligion());
				jsonUmr.put("refType", patientModel.getRefType());
				jsonUmr.put("idProofType", patientModel.getIdProofType());
				jsonUmr.put("idProofNum", patientModel.getIdProofNum());
				jsonUmr.put("refId", patientModel.getRefId());
				jsonUmr.put("occupation", patientModel.getOccupation());
				jsonUmr.put("lName", patientModel.getlName());
				jsonUmr.put("ageMonths", patientModel.getAgeMonths());
				jsonUmr.put("ageDays", patientModel.getAgeDays());
				/*
				 * System.out.println("last name" + patientModel.getLname());
				 * System.out.println("title" + patientModel.getTitle());
				 */
			}
			System.out.println("JSON Data:........." + jsonUmr);
			mav.setViewName(common + "/jsonData");
			request.setAttribute("jsonData", jsonUmr);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return mav;
	}

	@ResponseBody
	@RequestMapping(value = "/updatePatientRecord", method = RequestMethod.POST)
	public String updatePatientRecord(PatientModel patientModel, HttpServletRequest request, HttpSession session) {
		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		String result = null;
		System.out.println("updatePatientRecord....");
		patientModel.setModifiedIp(request.getRemoteAddr());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		patientModel.setModifiedBy(username);
		/*
		 * try { reqFrmt = frmt.parse(patientModel.getDob()); String dbFrmt1 =
		 * dbFrmt.format(reqFrmt); patientModel.setDob(dbFrmt1); } catch (ParseException
		 * e) { // TODO Auto-generated catch block e.printStackTrace(); }
		 */
		if (patientModel.isSmsAlert() == true) {
			patientModel.setSmsStatus("Y");
		} else {
			patientModel.setSmsStatus("N");
		}
		System.err.println(patientModel.getUpdtPatCatName() + "..pnt cat name..");
		System.err.println(patientModel.getRefType() + "..refType refType..");
		System.err.println(patientModel.getRefId() + "..refId........");
		System.err.println(patientModel.getOtherHospId() + "..pnt otherHospId..");
		int i = patientMapper.updatePatientRecord(patientModel);
		
		int ii = patientMapper.updatePatientRecordappt(patientModel);
		if (patientModel.getBillId() != "0") {
			int j = patientMapper.updatePatientPaymentType(patientModel);
		}

		System.out.println("Stst..." + i);
		if (i != 0) {
			result = i + "^" + "<div class='col-md-12 alert alert-success alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Patient Details Updated.</div>"
					+ "^" + 1;
			/*
			 * session.setAttribute("msg",
			 * "<div class='col-md-12 alert alert-success alert-dismissable' " +
			 * "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>" +
			 * "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
			 * +
			 * "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Patient Details Updated.</div>"
			 * );
			 */
		} else {
			result = i + "^" + "<div class='col-md-12 alert alert-danger alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured while updating.</div>"
					+ "^" + 0;

		}
		// return "redirect:/patient/patientQueue";
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/deletePatientRecord", method = RequestMethod.POST)
	public String deletePatientRecord(@RequestParam("patientId") Integer patientId, HttpServletRequest request) {
		PatientModel delPatient = new PatientModel();
		delPatient.setModifiedIp(request.getRemoteAddr());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		String result;
		delPatient.setModifiedBy(username);
		delPatient.setPatientId(patientId);
		int i = patientMapper.deletePatientRecord(delPatient);
		System.out.println("Stst..." + i);
		if (i != 0) {
			result = i + "^" + "<div class='col-md-5 alert alert-success'><strong>Success!</strong>"
					+ " Record Successfully deleted.</div>";
		} else {
			result = i + "^" + "<div class='col-md-5 alert alert-danger'><strong>Sorry!</strong>"
					+ " Error Occured.</div>";
		}
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/getPatientInfo", method = RequestMethod.POST)
	public String getPatientInfo(@RequestParam("patientId") Integer patientId) {
		String result = null;
		try {
			PatientModel pntModel = patientMapper.getPatientInfo(patientId);
			if (pntModel != null)
				result = pntModel.getPatientId() + ":" + pntModel.getPatientCode() + ":" + pntModel.getPname() + ":"
						+ pntModel.getPatientCategoryId() + ":" + pntModel.getPatientCategory();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@RequestMapping(value = "/scheduleAppointment", method = RequestMethod.POST)
	public ModelAndView scheduleAppointment(PatientModel patientModel, HttpServletRequest request,
			HttpSession session) {
		System.out.println("Inside method");
		ModelAndView model = new ModelAndView();
		patientModel.getApptModel().setAddedIp(request.getRemoteAddr());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		patientModel.getApptModel().setAddedBy(username);
		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		try {
			if (patientModel.getPatientId() != null && patientModel.getApptModel().getEmpId() != null) {
				patientModel.getApptModel().setPatientId(patientModel.getPatientId());
				try {
					reqFrmt = frmt.parse(patientModel.getApptModel().getScheduleDt());
					String dbFrmt1 = dbFrmt.format(reqFrmt);
					patientModel.getApptModel().setScheduleDt(dbFrmt1);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				// patientModel.getApptModel().setBillStatus(patientModel.getFeeModel().getStatus());
				System.out.println("Calling appt Mapper");
				apptMapper.callApptSetup(patientModel.getApptModel());
				patientModel.getFeeModel().setBillCategory(patientModel.getPatientCategory());
				if (patientModel.getApptModel().getOpCode() != null || patientModel.getApptModel().getApptId() != 0
						|| !patientModel.getApptModel().getOpCode().isEmpty()) {
					if ((patientModel.getFeeModel().getConsStatus().equals("REG")
							|| patientModel.getFeeModel().getConsStatus().equals("BEFCONS"))) {

						patientModel.getFeeModel().setAddedIp(request.getRemoteAddr());
						patientModel.getFeeModel().setApptId(patientModel.getApptModel().getApptId());
						patientModel.getFeeModel().setPatientId(patientModel.getPatientId());
						patientModel.getFeeModel().setTotAmt(patientModel.getFeeModel().getConsAmount());
						patientModel.getFeeModel().setTotDiscount(patientModel.getFeeModel().getConsDiscount());
						patientModel.getFeeModel().setBillAmt(patientModel.getFeeModel().getConsAmount());
						patientModel.getFeeModel().setPatientCategory(patientModel.getPatientCategoryId());
						
						patientMapper.callSetBillDetails(patientModel.getFeeModel());
						
						System.out.println("Cons Amount : " + patientModel.getFeeModel().getConsAmount());
						System.out.println("Bill Amount : " + patientModel.getFeeModel().getBillAmt());
						// patientModel.getFeeModel().setApptId(patientModel.getApptModel().getApptId());

						if (patientModel.getFeeModel().getBillId() != null) {

							if (patientModel.getFeeModel().getConsStatus().equals("REG")
									|| patientModel.getFeeModel().getConsStatus().equals("BEFCONS")) {

								patientModel.getFeeModel().setDocId(patientModel.getApptModel().getEmpId());
								System.out.println("Cons Amount : " + patientModel.getFeeModel().getConsAmount());
								System.out.println("Bill Amount : " + patientModel.getFeeModel().getBillAmt());
								patientMapper.setConsultationFeeDetails(patientModel.getFeeModel());
							}
						}

						session.setAttribute("msg", "<div class='col-md-12 alert alert-success alert-dismissable' "
								+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
								+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
								+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Appointment Created.</div>");
					} else {
						session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
								+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
								+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
								+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Appointment Not occured.</div>");
					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
			// TODO: handle exception
		} finally {
			model = getPatientQueue(null, session);
			model.setViewName(moduleName + "/patientQueue");
		}

		return model;
	}

	@SuppressWarnings("null")
	@RequestMapping(value = "/getBillDetails", method = RequestMethod.GET)
	public ModelAndView getBillDetails(@RequestParam("patientId") Integer patientId,
			@RequestParam("apptId") Integer apptId, @RequestParam("docId") Integer docId,
			@RequestParam("category") String category, @RequestParam("locId") Integer locId,
			@RequestParam("schDt") String schDt) {

		System.out.println("Insid getBillDetails" + apptId);
		ModelAndView model = new ModelAndView(moduleName + "/billPage");

		Integer billId = patientMapper.getBillId(apptId);

		System.out.println("Bill Id..." + billId);

		model.addObject("billId", billId);
		model.addObject("patientId", patientId);
		model.addObject("apptId", apptId);
		if (billId != null || billId != 0) {
			try {
				List<FeeModel> billList = patientMapper.getBillDetails(billId);

				System.out.println("Size...." + billList.size());
				model.addObject("billList", billList);

				FeeModel bill = patientMapper.getBill(billId);
				model.addObject("bill", bill);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (billId == null) {

			String regBillStatus = patientMapper.checkPatientBillStatus(patientId);
			PatientModel patientModel = new PatientModel();
			model.addObject("category", category);
			int patientCategory = patientMapper.getPatientCategoryId(category);
			model.addObject("categoryId", patientCategory);

			patientModel.setPatientCategoryId(patientCategory);
			if (regBillStatus.equalsIgnoreCase("pending")) {

				model.addObject("regStatus", "pending");
				patientModel.setBuildId(1);
				patientModel.setPatientId(patientId);
				patientModel.setBillStatus(regBillStatus);

				patientMapper.callGetRegistrationFee(patientModel);

				model.addObject("regFee", patientModel.getFee());

			}
			String consBillStatus = patientMapper.checkAppointmentBillStatus(apptId);

			if (consBillStatus.equalsIgnoreCase("pending")) {
				model.addObject("consStatus", "pending");
				patientModel.setEmpId(docId);
				patientModel.setBuildId(locId);
				patientModel.setBillStatus(consBillStatus);
				SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
				SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
				Date reqFrmt = null;
				try {
					reqFrmt = frmt.parse(schDt);
					String dbFrmt1 = dbFrmt.format(reqFrmt);
					patientModel.setScheduleDt(dbFrmt1);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				patientMapper.callGetConsultationFee(patientModel);
				model.addObject("consFee", patientModel.getFee());

			}
		}

		return model;
	}

	@RequestMapping(value = "/updatePendingBill", method = RequestMethod.POST)
	public ModelAndView updatePendingBill(FeeModel feeModel, HttpServletRequest request, HttpSession session) {
		System.out.println("Inside Pending Bill update");
		ModelAndView model = new ModelAndView();
		feeModel.setModifiedIp(request.getRemoteAddr());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		feeModel.setModifiedBy(username);
		try {
			System.out.println("Bill No..." + feeModel.getBillId() + "..amt recvd.." + feeModel.getAmtRecd()
					+ "..chng gvn.." + feeModel.getChngGiven() + "..bal.." + feeModel.getBal() + "..sts.."
					+ feeModel.getBillstatus());
			patientMapper.updateBill(feeModel);
			System.out.println("recptNo...id.." + feeModel.getCount());
			if (feeModel.getCount() != 0) {
				session.setAttribute("recptNo", feeModel.getCount());

				session.setAttribute("msg", "<div class='col-md-12 alert alert-success alert-dismissable' "
						+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
						+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
						+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Successfully Updated.</div>");
			} else {
				session.setAttribute("recptNo", "");
				session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
						+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
						+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
						+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
			}
		} finally {
			model = getPatientQueue(null, session);
			model.setViewName(moduleName + "/patientQueue");

			session.setAttribute("opBillId", feeModel.getBillId());
		}
		return model;
	}

	@RequestMapping(value = "/updateBill", method = RequestMethod.POST)
	public ModelAndView updateBill(FeeModel feeModel, HttpServletRequest request, HttpSession session) {
		System.out.println("in update bill..." + feeModel.getBillId());
		ModelAndView model = new ModelAndView();
		feeModel.setAddedIp(request.getRemoteAddr());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		feeModel.setAddedBy(username);
		try {
			if (feeModel.getRegStatus().equalsIgnoreCase("pending")
					|| feeModel.getConsStatus().equalsIgnoreCase("pending")) {
				System.out.println("in sts pending...");
				patientMapper.callSetBillDetails(feeModel);
				if (feeModel.getBillId() != null || feeModel.getBillId() != 0) {
					if (feeModel.getRegStatus().equalsIgnoreCase("pending")) {
						patientMapper.setRegistrationFeeDetails(feeModel);
					}
					if (feeModel.getConsStatus().equalsIgnoreCase("pending")) {
						patientMapper.setConsultationFeeDetails(feeModel);
					}
					session.setAttribute("msg", "<div class='col-md-12 alert alert-success alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Bill Updated.</div>");
				} else {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
				}
			}
		} catch (Exception e) {
			session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
		} finally {
			model = getPatientQueue(null, session);
			model.setViewName(moduleName + "/patientQueue");
		}
		return model;
	}

	@RequestMapping(value = "/updateAppointmentStatus", method = RequestMethod.POST)
	public ModelAndView updateAppointmentStatus(AppointmentModel apptModel, HttpServletRequest request,
			HttpSession session) {
		System.out.println("..Inside updateAppointmentStatus..visit stat.." + apptModel.getVisitStatus() + "..appt id.."
				+ apptModel.getApptId());
		ModelAndView model = new ModelAndView();
		apptModel.setModifiedIp(request.getRemoteAddr());
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;

		apptModel.setModifiedBy(username);
		try {
			if (apptModel.getVisitStatus().equalsIgnoreCase("Cancelled")) {
				System.out.println("in cancel...");
				Integer billId = patientMapper.getBillId(apptModel.getApptId());
				apptModel.setBillId(billId);
				System.out.println("Bill Iddddddddddddddd ***************" + billId + "..visit stat.." + apptModel.getVisitStatus() + "..appt id.."
						+ apptModel.getApptId() + "..charge.." + apptModel.getCharges() + "..refund.."
						+ apptModel.getToBeRefund());
				
            System.out.println("billLogId ---------refund tablee-----------------"+apptModel.getBillLogId());				
				patientMapper.updateCancellationBillDetails(apptModel);
				System.out.println("..Count...." + apptModel.getCount());
				if (apptModel.getCount() != 0) {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-success alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Appointment Cancelled.</div>");
				} else {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
				}
			} else if (apptModel.getVisitStatus().equalsIgnoreCase("Rescheduled")) {
				System.out.println("..Inside Rescheduled....");
				apptModel.setRemarks("Appointment is rescheduled from " + apptModel.getReschFromDt() + " to "
						+ apptModel.getScheduleDt());
				try {
					reqFrmt = frmt.parse(apptModel.getScheduleDt());
					String dbFrmt1 = dbFrmt.format(reqFrmt);
					apptModel.setScheduleDt(dbFrmt1);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				patientMapper.rescheduleAppointment(apptModel);
				System.out.println("..Count...." + apptModel.getCount());
				if (apptModel.getCount() != 0) {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-success alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Appointment Rescheduled.</div>");
				} else {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
				}
			} else {
				int c = patientMapper.updateAppointmentStatus(apptModel);
				if (c != 0) {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-success alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>Appointment status Updated.</div>");
				} else {
					session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
							+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
							+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
							+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			session.setAttribute("msg", "<div class='col-md-12 alert alert-danger alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured.</div>");
		} finally {
			model = getPatientQueue(null, session);
			model.setViewName(moduleName + "/patientQueue");
		}
		return model;
	}

	@ResponseBody
	@RequestMapping(value = "/cancelAppointmentBills", method = RequestMethod.POST)
	public String cancelAppointmentBills(@RequestParam("apptId") Integer apptId, @RequestParam("empId") Integer empId,
			@RequestParam("locId") Integer locId) {
		Integer billId = patientMapper.getBillId(apptId);
		System.out.println("Bill Id..." + billId);
		String result = null;
		if (billId != null) {
			AppointmentModel apptModel = new AppointmentModel();
			//apptModel.setApptId(apptId);
			//patientMapper.billRefundStatus(apptModel);
			try {
			//System.out.println(apptModel.getRefundSts()+"..........apptModel.getRefundSts()");
			//if (apptModel.getRefundSts().equalsIgnoreCase("Active")) {
				String paidAmt = patientMapper.getBillAmount(billId);
				result = paidAmt;
				// model.addObject("refundSts", "Bill amount "+billAmt
				// +" will be refunded");
			//} else if (apptModel.getRefundSts().equalsIgnoreCase("Inactive")) {
				//result = "0";
				// model.addObject("refundSts", "Bill amount not refunded !!");
			//}
			}catch(Exception e) {
				System.out.println("Exception throwing once check it here cancelAppointmentBills");
			}
		} else {
			result = "0";
		}
		return result;
	}

	@RequestMapping(value = "/getOpBillPrintDetails")
	public ModelAndView getOpBillPrintDetails(PatientModel patientModel, FeeModel feeModel) {
		System.out
				.println("in Op bill print..bill.." + feeModel.getBillId() + "..reg sts.." + patientModel.getRegDivSts()
						+ "..fee sts.." + patientModel.getFeeStatus() + "..rec no.." + patientModel.getRecptNo());
		ModelAndView mv = new ModelAndView();

		try {

			if (patientModel.getRecptNo().equals("0")) {

				if (patientModel.getRegDivSts().equals("1")) {
					System.out.println("in getting reg det...");
					PatientModel regBillDetails = patientMapper.getRegBillDetails(feeModel.getBillId());
					mv.addObject("regBillDetails", regBillDetails);
				}

				PatientModel opBilldetails = patientMapper.getOpBillDetails(feeModel.getBillId());
				mv.addObject("opBilldetails", opBilldetails);

			} else {
				System.out.println("in getting rec bill det...");
				PatientModel regBillDetails = patientMapper.getRegBillDetails(feeModel.getBillId());
				mv.addObject("regBillDetails", regBillDetails);

				PatientModel opBillRecdetails = patientMapper.getOpBillReceiptDetails(patientModel.getRecptNo());
				mv.addObject("opBilldetails", opBillRecdetails);

				if (patientModel.getServiceType().equals("Registration")) {
					patientModel.setRegDivSts("1");
					patientModel.setConsDivSts("0");
				}
			}

			mv.addObject("regDivSts", patientModel.getRegDivSts());
			mv.addObject("consDivSts", patientModel.getConsDivSts());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/opBillPrint");

		mv.addObject("patientModel", patientModel);

		return mv;
	}

	@ResponseBody
	@RequestMapping("/getPatientRegValiityFee")
	private String getPatientRegValiityFee(PatientModel patientModel) {

		String outputResult = null;

		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;

		try {
			PatientModel patRegFeeDetails = null;
			System.out.println("cat.." + patientModel.getPntCat());
			reqFrmt = frmt.parse(patientModel.getScheduleDt());
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			patientModel.setScheduleDt(dbFrmt1);
			System.out.println("in get pat reg validity fee...pat id.." + patientModel.getPatientId() + "loc id.."
					+ patientModel.getLocId() + "..cat.." + patientModel.getPntCat() + "..service Id.."
					+ patientModel.getServiceChargeId() + "..docId.." + patientModel.getEmpId() + "..patVisitId.."
					+ patientModel.getPatVisitId() + "ScheduleDt...." + patientModel.getScheduleDt());
			if (patientModel.getLocId() == 0 || patientModel.getPntCat().equals("0")) {
				// patRegFeeDetails = patientMapper.getPatRegFeeDetails(patientModel);
				patientModel.setLocId(1);
				patientModel.setPntCat("4");
			}
			patRegFeeDetails = patientMapper.getPatRegFeeCatLocDetails(patientModel);
			outputResult = patRegFeeDetails.getRegFees() + "^" + patRegFeeDetails.getRegDivSts() + "^"
					+ patRegFeeDetails.getRegValidDt();
			
		System.out.println("REGISTRATION VALIDITY DATE SANDHYA"+patRegFeeDetails.getRegValidDt());
			
			
			
			
			
			System.out.println("final o/p..." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@RequestMapping(value = "/getSuvPatientRegValiityFee", method = RequestMethod.GET)
	@ResponseBody
	private String getSuvPatientRegValiityFee(PatientModel patientModel) {

		String outputResult = null;

		try {
			PatientModel patRegFeeDetails = null;
			System.out.println("cat.." + patientModel.getPntCat());
			System.out.println("in  suvarna reg validity fee...pat id.." + patientModel.getRegPatientId() + "loc id.."
					+ patientModel.getLocId() + "..cat.." + patientModel.getPatientCategory() + "..docId.."
					+ patientModel.getDocId() + "..patVisitId.." + patientModel.getPatVisitId() + "scheduleDt..."
					+ patientModel.getScheduleDt());

			if (patientModel.getLocId() == 0 || patientModel.getPatientCategory().equals("0")) {
				// patRegFeeDetails = patientMapper.getPatRegFeeDetails(patientModel);
				patientModel.setLocId(1);
				patientModel.setPatientCategory("4");
			}
			patRegFeeDetails = patientMapper.getSuvPatRegFeeCatLocDetails(patientModel);
			outputResult = patRegFeeDetails.getRegFees() + "^" + patRegFeeDetails.getRegDivSts() + "^"
					+ patRegFeeDetails.getRegValidDt();
			System.out.println("final suvarna o/p..." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@RequestMapping(value = "/getSuvPatientRegYorN", method = RequestMethod.GET)
	@ResponseBody
	private String getSuvPatientRegYorN(PatientModel patientModel) {

		String outputResult = null;

		try {
			PatientModel patRegFeeDetails = null;
			System.out.println("cat.." + patientModel.getPntCat());
			System.out.println("in  suvarna reg validity fee...pat id.." + patientModel.getRegPatientId() + "loc id.."
					+ patientModel.getLocId() + "..cat.." + patientModel.getPatientCategory() + "..docId.."
					+ patientModel.getDocId() + "..patVisitId.." + patientModel.getPatVisitId() + "scheduleDt..."
					+ patientModel.getScheduleDt());

			if (patientModel.getLocId() == 0 || patientModel.getPatientCategory().equals("0")) {
				// patRegFeeDetails = patientMapper.getPatRegFeeDetails(patientModel);
				patientModel.setLocId(1);
				patientModel.setPatientCategory("4");
			}
			patRegFeeDetails = patientMapper.getSuvPatRegFeeCatYorN(patientModel);
			outputResult = patRegFeeDetails.getRegFees() + "^" + patRegFeeDetails.getRegDivSts() + "^"
					+ patRegFeeDetails.getRegValidDt();
			System.out.println("final suvarna o/p..." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@ResponseBody
	@RequestMapping("/setOtherHospDet")
	private String setOtherHospDet(PatientModel patientModel, HttpSession session) {
		System.out.println("in setting other hosp det..name.." + patientModel.getOtherHospName() + "..code.."
				+ patientModel.getOtherHospCode());
		String outputResult = null;

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);

		try {
			patientMapper.setOtherHospDet(patientModel);
			outputResult = patientModel.getOtherHospId() + "^" + patientModel.getOtherHospName();
			System.out.println("o/p res.." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@ResponseBody
	@RequestMapping("/setOtherStaffDet")
	private String setOtherStaffDet(PatientModel patientModel, HttpSession session) {
		System.out.println("in setting other staff det..name.." + patientModel.getOtherStaffName() + "..code.."
				+ patientModel.getOtherStaffCode());
		String outputResult = null;

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);

		try {
			patientMapper.setOtherStaffDet(patientModel);
			outputResult = patientModel.getOtherStaffId() + "^" + patientModel.getOtherStaffName();
			System.out.println("o/p res.." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@ResponseBody
	@RequestMapping("/setOtherDoctorDet")
	private String setOtherDoctorDet(PatientModel patientModel, HttpSession session) {
		System.out.println("in setting other Doctor det..name.." + patientModel.getOtherDoctorName() + "..code.."
				+ patientModel.getOtherDoctorCode());
		String outputResult = null;

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);

		try {
			patientMapper.setOtherDoctorDet(patientModel);
			outputResult = patientModel.getOtherDoctorId() + "^" + patientModel.getOtherDoctorName();
			System.out.println("o/p res.." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@RequestMapping(value = "/getPatDetails", method = RequestMethod.GET)
	public ModelAndView getPatients(PatientModel PatientModel) {
		ModelAndView mv = new ModelAndView();
		System.out.println("patname=" + PatientModel.getPatientName());
		try {
			String likeName = '%' + PatientModel.getPatientName() + '%';
			PatientModel.setPatientName(likeName);

			String likeNum = '%' + PatientModel.getMobNum() + '%';
			PatientModel.setMobNum(likeNum);

			String likeUmr = '%' + PatientModel.getUmrNo() + '%';
			PatientModel.setUmrNo(likeUmr);

			System.out.println("patname=" + PatientModel.getPatientName());
			System.out.println("patMobNo=" + PatientModel.getMobNum());
			System.out.println("patUmr=" + PatientModel.getUmrNo());

			List<PatientModel> patdetails = patientMapper.getPatients(PatientModel);
			System.out.println("patdetails size=" + patdetails.size());

			mv.addObject("patientList", patdetails);

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName("/" + moduleName + "/patientQueueInter");
		return mv;
	}
	
	@RequestMapping(value = "/getPatDetOldData", method = RequestMethod.GET)
	public ModelAndView getPatDetOldData(PatientModel PatientModel) {
		ModelAndView mv = new ModelAndView();
		System.out.println("patname=" + PatientModel.getPatientName());
		try {
			

			List<PatientModel> patdetails = patientMapper.getPatientsDetaOldData(PatientModel);
			System.out.println("patdetails size=" + patdetails.size());

			mv.addObject("patientList", patdetails);

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName("/" + moduleName + "/patientQueueInter");
		return mv;
	}
	

	
	@RequestMapping(value = "/getPatDetailsold", method = RequestMethod.GET)
	@ResponseBody
	public String getPatDetailsold(PatientModel patientModel) {

		String response = null;
		try {
			System.out.println("patientId=" + patientModel.getPatientId());
			PatientModel patdetails = patientMapper.getPatientsDetailsOld(patientModel);

			response = patdetails.getPatientName() + "^" +patdetails.getPatientId();
			System.err.println("response>>=" + response);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	@RequestMapping(value = "/getRegPatDetails", method = RequestMethod.GET)
	public ModelAndView getRegPatients(PatientModel PatientModel) {
		ModelAndView mv = new ModelAndView();
		System.out.println("Regpatname=" + PatientModel.getRegPatientName());
		try {
			String likeName = '%' + PatientModel.getRegPatientName() + '%';
			PatientModel.setRegPatientName(likeName);
			;

			String likeNum = '%' + PatientModel.getPntMobNum() + '%';
			PatientModel.setPntMobNum(likeNum);

			String likeUmr = '%' + PatientModel.getRegUmr() + '%';
			PatientModel.setRegUmr(likeUmr);

			System.out.println("Regpatname=" + PatientModel.getRegPatientName());
			System.out.println("RegpatMobNo=" + PatientModel.getPntMobNum());
			System.out.println("RegpatUmr=" + PatientModel.getRegUmr());

			List<PatientModel> regpatdetails = patientMapper.getRegPatients(PatientModel);
			System.out.println("Regpatdetails size=" + regpatdetails.size());

			mv.addObject("suvPatientList", regpatdetails);

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName("/" + moduleName + "/patientQueueInterSuvarna");
		return mv;
	}

	@RequestMapping(value = "/setPatDetById", method = RequestMethod.GET)
	@ResponseBody
	public String patientDetails(PatientModel patientModel) {

		String response = null;
		try {
			System.out.println("patientId=" + patientModel.getPatientId());
			PatientModel patdetails = patientMapper.getPatList(patientModel);

			response = patdetails.getPtitle() + "^" + patdetails.getPname() + "^" + patdetails.getlName() + "^"
					+ patdetails.getGender() + "^" + patdetails.getAgeDays() + "^" + patdetails.getAgeMonths() + "^"
					+ patdetails.getDob() + "^" + patdetails.getAge() + "^" + patdetails.getMobNum() + "^"
					+ patdetails.getCareBy() + "^" + patdetails.getCareByName() + "^" + patdetails.getReligion() + "^"
					+ patdetails.getMaritalStatus() + "^" + patdetails.getNationality() + "^" + patdetails.getBloodGrp()
					+ "^" + patdetails.getPntOccupation() + "^" + patdetails.getState() + "^" + patdetails.getCity()
					+ "^" + patdetails.getVillage() + "^" + patdetails.getAddr() + "^" + patdetails.getIdProofType()
					+ "^" + patdetails.getIdProofNum() + "^" + patdetails.getSmsStatus() + "^" + patdetails.getPicName()
					+ "^" + patdetails.getEmpId() + "^" + patdetails.getLocId() + "^" + patdetails.getPatientCategory()
					+ "^" + patdetails.getPatientId() + "^" + patdetails.getPatientCategory() + "^"
					+ patdetails.getScheduleDt() + "^" + patdetails.getDoctorDetails() + "^" + patdetails.getRefType()
					+ "^" + patdetails.getPatVisitId() + "^" + patdetails.getRegValidDt() + "^"
					+ patdetails.getPicName() + "^" + patdetails.getPicNamee() + "^" + patdetails.getRefId() + "^"
					+ patdetails.getOtherStaffId() + "^" + patdetails.getOtherHospId() + "^" + patdetails.getConValidDt()+ "^"
					+ patdetails.getUmrSec()+ "^" + patdetails.getOrgId()+ "^" + patdetails.getPatientCategoryOrgId()+ "^" + patdetails.getPatientLike();

			System.err.println("response>>=" + response);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	@RequestMapping(value = "/setSuvPatDetById", method = RequestMethod.GET)
	@ResponseBody
	public String regPatientDetails(PatientModel patientModel) {

		String response = null;
		try {
			System.out.println("patientId=" + patientModel.getRegPatientId());
			PatientModel patdetails = patientMapper.getRegPatList(patientModel);

			response = patdetails.getPtitle() + "^" + patdetails.getPname() + "^" + patdetails.getGender() + "^"
					+ patdetails.getDob() + "^" + patdetails.getAge() + "^" + patdetails.getMobNum() + "^"
					+ patdetails.getCareBy() + "^" + patdetails.getReligion() + "^" + patdetails.getMaritalStatus()
					+ "^" + patdetails.getNationality() + "^" + patdetails.getBloodGrp() + "^"
					+ patdetails.getPntOccupation() + "^" + patdetails.getState() + "^" + patdetails.getCity() + "^"
					+ patdetails.getAddr() + "^" + patdetails.getRegValidDt() + "^" + patdetails.getDoctorDetails()
					+ "^" + patdetails.getRefType() + "^" + patdetails.getPntCat() + "^" + patdetails.getRegPatientId(); // 18

			/*
			 * +"^"+patdetails.getIdProofType()+"^"+patdetails.getIdProofNum();+"^"+
			 * patdetails.getRefType()+"^"+patdetails.getPntCat()
			 * +"^"+patdetails.getDoctorDetails()+"^"+patdetails.getRegDt();
			 */
			System.out.println("state=" + patdetails.getState());

		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	@RequestMapping(value = "/getDocterLeavesByDt")
	@ResponseBody
	public String getDocterLeavesByDt(@RequestParam("docId") Integer docId,
			@RequestParam("scheduleDt") String scheduleDt) {
		String result = null;
		System.err.println("schedule date.... in getDocterLeavesByDt" + scheduleDt);
		PatientModel patientModel = new PatientModel();
		patientModel.setEmpId(docId);
		patientModel.setScheduleDt(scheduleDt);

		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		try {
			reqFrmt = frmt.parse(scheduleDt);
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			patientModel.setScheduleDt(dbFrmt1);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.err.println("in getDocterLeavesByDt.." + "..emp id.." + patientModel.getEmpId() + "..ScheduleDt.."
				+ patientModel.getScheduleDt());
		System.err.println("getPatFileNames>>..." + patientModel.getPatFileNames());
		List<PatientModel> docavail = patientMapper.getDocleaves(patientModel);
		System.out.println("docavail" + docavail);

		if (docavail.size() != 0) {
			result = "Docter  available" + "^" + 1;
		} else {
			result = "Docter not available" + "^" + 0;
		}

		System.out.println("result...." + result);
		return result;
	}

	@RequestMapping(value = "/getPatOpBillPrint", method = RequestMethod.GET)
	public ModelAndView getPatOpBillPrint(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		try {
			System.err.println("patApptId" + patientModel.getPatApptId());
			PatientModel regBillDetails = patientMapper.getPatQueRegBill(patientModel);
			System.err.println("pat que billCount..." + regBillDetails.getBillCount());

			mv.addObject("regBillDetails", regBillDetails);

			PatientModel opBilldetails = patientMapper.getPatQueConBill(patientModel);
			mv.addObject("opBilldetails", opBilldetails);

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName("/" + moduleName + "/patientQueueBillPrint");
		return mv;
	}

	@RequestMapping(value = "/getPassportDetails", method = RequestMethod.GET)
	@ResponseBody
	public String getPassportDetails(PatientModel patientModel, HttpSession session) {

		String response = null;
		// String status = null;

		try {

			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);
			System.out.println(patientModel.getPatientId() + ".........getpassdet");
			System.out.println("in fileupdate()......" + patientModel.getPntId() + "-" + patientModel.getApptId());
			patientModel.setPntId(patientModel.getPntId());
			patientModel.setApptId(patientModel.getApptId());
			PatientModel getPassportDet = patientMapper.getPassportDetailsView(patientModel);

			response = "1" + "^" + getPassportDet.getPassportNum() + "^" + getPassportDet.getPassportIssuedDt() + "^"
					+ getPassportDet.getPassportExpiryDt();

			// response =

		} catch (Exception e) {
			response = "0";
			e.printStackTrace();
		}

		return response;
	}

	@RequestMapping(value = "/getAttachFileName", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getAttachFileName(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			// System.out.println("documentId =" + apartmentModel.getDocumentId());
			List<PatientModel> ticketFileName = patientMapper.getAttachments(patientModel);
			mv.addObject("ticketFileName", ticketFileName);
			System.out.println("ticket file name size......" + ticketFileName.size());
			patientModel.setPntId(patientModel.getPntId());
			patientModel.setApptId(patientModel.getApptId());
			PatientModel documentCount = patientMapper.getDocCount(patientModel);
			mv.addObject("documentCount", documentCount);
			System.out.println("documents count is=" + documentCount);

		} catch (Exception e) {
			e.printStackTrace();
		}
		mv.setViewName("/" + moduleName + "/patientQueueDocFilesInter");
		return mv;

	}

	@RequestMapping(value = "/setExtraTokens", method = RequestMethod.POST)
	@ResponseBody
	private String setExtraTokens(ExtraDoctorSlots slots, HttpSession session) {

		String outputResult = null;

		String userName = (String) session.getAttribute("userName");
		slots.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");

		slots.setAddedIp(userIp);
		int idDoctorExtraTokens = slots.getIdDoctorExtraTokens();
		slots.setEmpId(idDoctorExtraTokens);

		SimpleDateFormat source = new SimpleDateFormat("hh:mm aaa");
		SimpleDateFormat dest = new SimpleDateFormat("HH:mm:ss");
		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		try {
			slots.setExtraStartTime(dest.format(source.parse(slots.getExtraStartTime())));
			slots.setExtraEndTime(dest.format(source.parse(slots.getExtraEndTime())));
			reqFrmt = frmt.parse(slots.getExtraTokensDt());
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			// System.out.println(".....Req Date....." + reqFrmt + "......." + dbFrmt1);
			slots.setReqDate(dbFrmt1);
			System.out.println(slots.getEmpId() + "..empId" + slots.getReqDate() + "..reqDt" + slots.getExtraStartTime()
					+ "...extra start time" + slots.getExtraEndTime() + "....extraEndTime" + slots.getNumOfExTokens()
					+ "..extraTokens");
			patientMapper.callExtraDoctorAvailTokens(slots);
			outputResult = slots.getReqDate() + "^" + slots.getEmpId();
			System.out.println("o/p res.." + outputResult);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@RequestMapping(value = "/getExtraDocSlots")
	@ResponseBody
	public ModelAndView getExtraDocSlots(ExtraDoctorSlots slots, @RequestParam(value = "doctorId") int doctorId,
			@RequestParam(value = "scheduleDt") String scheduleDt) {
		ModelAndView mv = new ModelAndView();
		// ExtraDoctorSlots slots = new ExtraDoctorSlots();
		try {

			SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
			SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
			Date reqFrmt = null;

			reqFrmt = frmt.parse(scheduleDt);
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			slots.setReqDate(dbFrmt1);
			// int idDoctorExtraTokens = slots.getIdDoctorExtraTokens();
			slots.setEmpId(doctorId);
			System.err.println(slots.getReqDate() + "setReqDate" + slots.getEmpId() + "empID");
			List<ExtraDoctorSlots> ExtraDocSlots = patientMapper.callExtraDocSlots(slots);
			mv.addObject("ExtraDocSlots", ExtraDocSlots);
			System.out.println(ExtraDocSlots.size() + "ExtraDocSlots");
			// int resp = ExtraDocSlots.size();

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName("/" + moduleName + "/extraDocSlots");
		return mv;
	}

	@RequestMapping(value = "/getExtraSlotsCount")
	@ResponseBody
	public String getExtraSlotsCount(@RequestParam("docId") Integer docId,
			@RequestParam("scheduleDt") String scheduleDt) {
		String result = null;
		System.err.println("schedule date.... in getExtraSlotsCount" + scheduleDt + docId);
		PatientModel patientModel = new PatientModel();
		patientModel.setEmpId(docId);
		patientModel.setScheduleDt(scheduleDt);

		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		Date reqFrmt = null;
		try {
			reqFrmt = frmt.parse(scheduleDt);
			String dbFrmt1 = dbFrmt.format(reqFrmt);
			patientModel.setScheduleDt(dbFrmt1);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.err.println("in getExtraSlotsCount.." + "..emp id.." + patientModel.getEmpId() + "..ScheduleDt.."
				+ patientModel.getScheduleDt());

		List<PatientModel> slotsCount = patientMapper.getSlotsCount(patientModel);
		System.out.println("docavail" + slotsCount);

		if (slotsCount.size() != 0) {
			result = "Docter  available" + "^" + 1;
		} else {
			result = "Docter not available" + "^" + 0;
		}

		System.out.println("result...." + result);
		return result;
	}

	@RequestMapping(value = "/setNriFiles")
	@ResponseBody
	public String setNriFiles(PatientModel patientModel, HttpSession session) {

		String response = null;
		int setAttaches = 0;
		int fileStatus1 = 0;
		// patientModel.setPatientId(patientId);
		// patientModel.setDescriptions(descriptions);
		List<String> fileNames = new ArrayList<String>();
		// System.err.println(patientModel.getTicketFileNames()+"...TicketFileNames"+
		// patientModel.getDescriptions()+"....Description");
		System.err.println(patientModel.getPatientId() + "...patientId");
		System.err.println(patientModel.getPatientIdForFile() + "...patientId for file");
		patientModel.setPatientId(patientModel.getPatientIdForFile());

		if (patientModel.getTicketFileNames() != null && !patientModel.getTicketFileNames().isEmpty()) {
			List<MultipartFile> crunchifyFiles = patientModel.getTicketFileNames();

			if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
				for (MultipartFile multipartFile : crunchifyFiles) {

					String fileName = multipartFile.getOriginalFilename();
					if (!"".equalsIgnoreCase(fileName)) {
						System.out.println("attach files......" + patientModel.getTicketFileNames());

						// Handle file content -
						// multipartFile.getInputStream()
						String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
						System.out.println("extn=" + extn);
						String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
						System.out.println("removeExtn=" + removeextn);
						Timestamp timeInmilli = new Timestamp(new Date().getTime());
						long time = System.currentTimeMillis();

						System.out.println("timeInmilli=" + timeInmilli);
						// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
						// for only for linux
						String originalFileName = removeextn + time + "." + extn; // this works for both windows and
																					// linux
						try {
							multipartFile.transferTo(new File(patientFilesPath + originalFileName));
						} catch (IllegalStateException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						fileNames.add(originalFileName);
						System.out.println("fileName is............=" + fileNames);
					}
				}
			}
		} else {
			System.out.println("no image and no file");
		}
		if (patientModel.getPatientId() != 0) {

			if (!(fileNames.isEmpty())) {
				System.out.println("insert Attaches files  size is...=" + fileNames.size());
				System.out.println("insert Attaches files  are...=" + fileNames);
				for (int i = 0; i < fileNames.size(); i++) {
					String fname = fileNames.get(i);
					patientModel.setAttachmentName(fname);
					String userName1 = (String) session.getAttribute("userName");
					patientModel.setAddedBy(userName1);

					String userIp1 = (String) session.getAttribute("userIp");
					patientModel.setAddedIp(userIp1);
					System.out.println("description in for loop=" + patientModel.getDescriptions()[i]);
					patientModel.setDescription(patientModel.getDescriptions()[i]);
					patientModel.setPatientType(patientModel.getPatientTypes()[i]);

					   System.out.println("******fileType**********"+patientModel.getPatientTypes());
					try {
						setAttaches = patientMapper.setProjectAttachments(patientModel);

						System.out.println("======================" + patientModel.getApptId());

						patientMapper.setFileUpdateStatus(patientModel);
						System.out.println("setAttaches=" + setAttaches);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
				}

			} else {
				System.out.println("files are empty");
				patientModel.setFilsiz(1);
			}

		} else {
			System.out.println("files are not inserted....");
		}

		if (setAttaches != 0) {
			// response= "File inserted"+"^"+1;
			response = 1 + "^" + "<div class='col-md-12 alert alert-success alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>File Uploaded.</div>" + "^"
					+ 1;
		} else {
			// response= "File Not inserted"+"^"+0;
			response = 0 + "^" + "<div class='col-md-12 alert alert-danger alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured while uploading file.</div>"
					+ "^" + 0 + "^" + patientModel.getFilsiz();
		}

		return response;
	}

	@RequestMapping(value = "/setDelAttachFileName")
	@ResponseBody
	public String setDelAttachFileName(PatientModel patientModel, HttpSession session) {

		String response = null;

		int setAttaches = 0;
		String userName = (String) session.getAttribute("userName");
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedBy(userName);
		patientModel.setModifiedIp(userIp);

		try {
			setAttaches = patientMapper.setAttachmentInactive(patientModel);
			System.out.println("setAttaches=" + setAttaches);
		} catch (Exception exp) {
			exp.printStackTrace();
		}

		if (setAttaches != 0) {
			response = 1 + "^" + "<div class='col-md-12 alert alert-success alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-check'></h5>File Deleted.</div>" + "^"
					+ 1;

		} else {
			response = 0 + "^" + "<div class='col-md-12 alert alert-danger alert-dismissable' "
					+ "style='padding-bottom: 5px; padding-top: 5px; padding-left: 20px;'>"
					+ "<button class='close' aria-hidden='true' data-dismiss='alert' type='button'>x</button>"
					+ "<h5 id='errorMessage' style='color: white;' class='fa fa-ban'></h5>Error occured while deleting File.</div>"
					+ "^" + 0;

		}

		return response;
	}

	/* Neeraja Bunga..... */

	// Get all list details and show at UI
	@RequestMapping(value = "/getprescUploadDet", method = RequestMethod.GET)
	public ModelAndView getprescUploadDet(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			PatientModel empId = patientMapper.getEmpId(patientModel);
			System.err.println(empId.getUserEmpId() + "empIddddddd in >>");

			patientModel.setEmpId(empId.getUserEmpId());
			System.err.println(patientModel.getEmpId() + "...EmpId in presc");
			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);

			List<PatientModel> pList = patientMapper.getPntDetails(patientModel);
			mv.addObject("pList", pList);
			System.err.println("referralDoctor 's List is..." + pList.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescriptionUpload");

		return mv;
	}

	@RequestMapping(value = "/getPatientDetailsByDoctor", method = RequestMethod.GET)
	public ModelAndView getPatientDetailsByDoctor(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			PatientModel empId = patientMapper.getEmpId(patientModel);
			System.err.println(empId.getUserEmpId() + "empIddddddd");
			patientModel.setUserEmpId(empId.getUserEmpId());
			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);

			List<PatientModel> patList = patientMapper.getPntDetailsByDoc(patientModel);
			mv.addObject("patList", patList);
			System.err.println("patList 's List is..." + patList.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescInterToshowPatientsByDocId");

		return mv;
	}

	@RequestMapping(value = "/getPatientDetailsByDoctorForMobile", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getPatientDetailsByDoctorForMobile(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			PatientModel empId = patientMapper.getEmpId(patientModel);
			System.err.println(empId.getUserEmpId() + "empIddddddd in mobile view");
			patientModel.setUserEmpId(empId.getUserEmpId());
			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);

			List<PatientModel> patList = patientMapper.getPntDetailsByDocForMobile(patientModel);
			mv.addObject("patList", patList);
			System.err.println("patList 's List is..." + patList.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescInterToshowPatientsByDocIdForMobile");

		return mv;
	}

	// Get all patient details from DB by using JSON

	/**
	 * @param request.
	 * @return json_data.
	 */

	@RequestMapping(value = "/getPatientDetailsForPrec")
	public ModelAndView getPatientDetailsForPrec(HttpServletRequest request, HttpSession session) {

		ModelAndView mv = new ModelAndView();
		mv.setViewName("common/jsonData");

		List<JSONObject> patient = new LinkedList<JSONObject>();
		JSONObject jsonPatientList = new JSONObject();
		JSONObject jsonPatient = null;

		List<PatientModel> patientList = null;

		try {
			PatientModel patientModel = new PatientModel();

			patientModel.setUserId((Integer) session.getAttribute("userId"));
			patientModel.setUserRole((String) session.getAttribute("role"));

			patientList = patientMapper.getPatDet(patientModel);

			for (PatientModel patientDetails : patientList) {
				jsonPatient = new JSONObject();
				jsonPatient.put("pntId", patientDetails.getPntId());
				jsonPatient.put("opNum", patientDetails.getOpNum());
				jsonPatient.put("apptId", patientDetails.getApptId());
				jsonPatient.put("umrNo", patientDetails.getUmrNo());
				jsonPatient.put("pntName", patientDetails.getPntName());
				jsonPatient.put("pntCode", patientDetails.getPntCode());
				jsonPatient.put("dob", patientDetails.getDob());
				jsonPatient.put("mobNum", patientDetails.getMobNum());
				jsonPatient.put("conName", patientDetails.getConName());
				jsonPatient.put("gender", patientDetails.getGender());
				jsonPatient.put("vType", patientDetails.getvType());
				jsonPatient.put("appDate", patientDetails.getAppDate());
				jsonPatient.put("lastName", patientDetails.getLastName());

				patient.add(jsonPatient);

			}
			jsonPatientList.put("patients", patient);

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		request.setAttribute("jsonData", jsonPatientList);
		return mv;
	}

	// View all details including prescription pic's
	@RequestMapping(value = "/setPresDet")
	@ResponseBody
	public String setPresDet(PatientModel patientModel, HttpSession session) {

		String response = null;

		System.out.println("inside method setPresDet");
		try {

			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);
			// patientModel.setPrescPic(prescPic);
			System.out.println(
					"...Presc Date...." + patientModel.getPrescDate() + "...UMR Number...." + patientModel.getUmrId()
							+ "...Patient Name...." + patientModel.getPatName() + "....Consultant Name...."
							+ patientModel.getConsName() + "..lastName.." + patientModel.getLastName() + "...OpNum...."
							+ patientModel.getOpNum() + "....ApptId...." + patientModel.getApptId() + "..visitType.."
							+ patientModel.getVsType() + "..appDate.." + patientModel.getApDate());

			patientModel.setPntCode(patientModel.getPntCode());
			patientModel.setPntId(patientModel.getPntId());
			patientModel.setOpNum(patientModel.getOpNum());
			patientModel.setApptId(patientModel.getApptId());
			patientModel.setUmrNo(patientModel.getUmrId());
			patientModel.setGender(patientModel.getGender());
			patientModel.setDob(patientModel.getDob());
			patientModel.setMobNum(patientModel.getMobNum());
			patientModel.setConName(patientModel.getConsName());
			patientModel.setvType(patientModel.getVsType());
			patientModel.setAppDate(patientModel.getApDate());
			patientModel.setPntName(patientModel.getPatName());

			String[] fileNames;

			fileNames = patientModel.getAllNames();
			System.err.println("filesSizes...." + fileNames.length);

			// System.err.println(patientModel.getPrescPic()+"...prescPic");
			patientMapper.setPresDetails(patientModel);

			System.out.println("PrescId...." + patientModel.getPrescId() + "...PrescNum..." + patientModel.getPrescNum()
					+ "..picName.." + patientModel.getPicNames());

			int setAttaches = 0;
			if (patientModel.getPrescId() != 0) {

				if (fileNames.length != 0) {
					System.out.println("insert Attaches files  size is...=" + fileNames.length);
					System.out.println("insert Attaches files  are...=" + fileNames);
					for (int i = 0; i < fileNames.length; i++) {
						String fname = fileNames[i];

						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						System.out.println("description in for loop=" + patientModel.getAllNames()[i]);

						try {
							setAttaches = patientMapper.setPatPrescAttachments(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
				}

			} else {
				System.out.println("files are not inserted....");
			}

			if (setAttaches != 0) {
				response = "1" + "^" + patientModel.getUmrId();
			} else {
				response = "0" + "^" + patientModel.getUmrId();
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return response;

	}

	// Updating pic's after view
	@RequestMapping(value = "/updatePresDet")
	@ResponseBody
	public String updatePresDet(PatientModel patientModel, HttpSession session) {

		System.out.println("before trycatch");
		String response = null;
		int update = 0;
		String userName = (String) session.getAttribute("userName");
		patientModel.setModifiedBy(userName);
		System.out.println("userName=" + userName);
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedIp(userIp);
		System.out.println("userIp=" + userIp);
		patientModel.getUmrId();

		try {
			String[] fileNames;

			fileNames = patientModel.getAllNames();

			// System.err.println("filesSizes...."+fileNames.length);
			System.err.println("prescId in update...." + patientModel.getPrescId());

			if (patientModel.getPrescId() != 0) {
				if (fileNames != null) {
					if (fileNames.length != 0) {
						System.out.println("insert Attaches files  size is...=" + fileNames.length);
						System.out.println("insert Attaches files  are...=" + fileNames);
						for (int i = 0; i < fileNames.length; i++) {
							String fname = fileNames[i];

							patientModel.setAttachmentPicName(fname);
							String userName1 = (String) session.getAttribute("userName");
							patientModel.setAddedBy(userName1);

							String userIp1 = (String) session.getAttribute("userIp");
							patientModel.setAddedIp(userIp1);
							System.out.println("description in for loop=" + patientModel.getAllNames()[i]);

							try {
								update = patientMapper.updatePresPicsDetails(patientModel);
								System.out.println("setAttaches=" + update);
							} catch (Exception exp) {
								exp.printStackTrace();
							}
						}

					} else {
						System.out.println("files are empty");
					}

				} else {
					System.out.println("pics are not inserted....");
					update = 1;
				}

			} else {
				System.out.println("files are not inserted....");
			}

			if (update != 0) {
				response = "1" + "^" + patientModel.getUmrId();
			} else {
				response = "0" + "^" + patientModel.getUmrId();
			}

			/*
			 * else if(update == 2){ response="2"+"^"+patientModel.getUmrId(); }
			 */

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		// System.out.println(mav.toString());
		return response;
	}

	// Generating pic names and then save pic's at certain path
	@RequestMapping(value = "/getPrescPhotoDetails", method = RequestMethod.POST)
	@ResponseBody
	public String getPrescPhotoDetails(@RequestParam(value = "imgBase64") String imgBase64, ModelMap model,
			HttpSession session) throws IOException {
		System.out.println("Inside get pic det..... method");

		PatientModel patientModel = new PatientModel();
		String userName = (String) session.getAttribute("userName");
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedBy(userName);
		patientModel.setModifiedIp(userIp);

		patientMapper.getPrescPicDetails(patientModel);

		FileOutputStream fos = null;
		String path = null;
		try {
			System.out.println("File......." + patientModel.getPicNames());
			// patientModel.setPicName(picName);
			String fileName = patientModel.getPicNames();
			// String sImg = request.getParameter("imgBase64");
			String simg = imgBase64.substring("data:image/png;base64,".length());
			// System.out.println("length......"+sImg.length());
			byte[] bimg64 = simg.getBytes();
			byte[] bimg = Base64.decodeBase64(bimg64);
			path = fileName + ".png";
			fos = new FileOutputStream(path);
			fos.write(bimg);
			// model.addAttribute("picName", path);

			String fileName1 = FilenameUtils.getName(path);
			System.out.println("File Name...........11....." + fileName1 + "......path....." + path);

			File dir = new File(patientPrescPath);
			System.out.println("Dir..." + dir);
			if (!dir.exists()) {
				System.out.println("inside if dir");
				dir.mkdirs();
			}

			System.out.println("Patient Pic path..." + patientPrescPath);

			String destFile = patientPrescPath + "/" + fileName1;
			System.out.println("out if dir.....Dest file..." + destFile);
			File file = new File(path);
			OutputStream oos = new FileOutputStream(destFile);
			byte[] buf = new byte[8192];

			InputStream is = new FileInputStream(file);

			int counts = 0;

			while ((counts = is.read(buf, 0, buf.length)) > 0) {
				// System.out.println("inside while");
				oos.write(buf, 0, counts);
				oos.flush();
			}
			oos.close();
			System.out.println("stop");
			is.close();

		} catch (Exception e) {
			e.printStackTrace();
			@SuppressWarnings("unused")
			String loggerMessage = "Upload image failed : ";
		} finally {
			if (fos != null) {
				fos.close();
			}
		}

		return path;
	}

	// View pic's at UI
	@RequestMapping(value = "/getAttachedPicName", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getAttachedPicName(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		try {
			List<PatientModel> patPrescPics = patientMapper.getPrescreptions(patientModel);
			mv.addObject("patPrescPics", patPrescPics);
			// System.out.println("file name size......" + patPrescPics.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescriptionUploadInter");

		return mv;
	}

	// Delete pic's from UI and its status to inactive
	@RequestMapping(value = "/deletePicName")
	@ResponseBody
	public String deletePicName(PatientModel patientModel, HttpSession session) {

		System.out.println("before trycatch");
		String response = null;

		String userName = (String) session.getAttribute("userName");
		patientModel.setModifiedBy(userName);
		System.out.println("userName=" + userName);
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedIp(userIp);
		System.out.println("userIp=" + userIp);

		try {
			// System.out.println("patientId="+advanceAmountModel.getPatientId());

			int pdelete = patientMapper.deletePrescPics(patientModel);
			System.out.println("deleted pics..." + pdelete);

			if (pdelete != 0) {
				response = "1";
			} else {
				response = "0";
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		// System.out.println(mav.toString());
		return response;
	}

	// Get all pic's for print
	@RequestMapping(value = "/disPrescPicsPrint")
	@ResponseBody
	public ModelAndView disPrescPicsPrint(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		System.out.println("im in method");
		try {

			PatientModel getPatientDetails = patientMapper.getpatdetforPrescriptionsPics(patientModel);
			mv.addObject("getPatientDetails", getPatientDetails);
			System.err.println(getPatientDetails + "...getPatientDetails...");

			List<PatientModel> PrescPics = patientMapper.getPrescriptionsPics(patientModel);
			mv.addObject("PrescPics", PrescPics);
			System.out.println("file name size......" + PrescPics.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescriptionPicsPrint");

		return mv;
	}

	// View pic's at UI by patientId
	@RequestMapping(value = "/getAttachedPrescByPatId", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getAttachedPrescByPatId(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		try {
			List<PatientModel> patPrescPics = patientMapper.getPrescreptionsByPatId(patientModel);
			mv.addObject("patPrescPics", patPrescPics);
			// System.out.println("file name size......" + patPrescPics.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescriptionUploadInter");

		return mv;
	}

	// PRESCRIPTION UPLOAD FOR MOBILE ...

	@RequestMapping(value = "/getPrescriptionsUploadMobile", method = RequestMethod.GET)
	public ModelAndView getPrescriptionsUploadMobile(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			PatientModel empId = patientMapper.getEmpId(patientModel);
			System.err.println(empId.getUserEmpId() + "empIddddddd in >>");
			patientModel.setEmpId(empId.getUserEmpId());
			System.err.println(patientModel.getEmpId() + "...EmpId in mob");
			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);

			List<PatientModel> pList = patientMapper.getPntDetailsMob(patientModel);
			mv.addObject("pList", pList);
			System.err.println("referralDoctor 's List is..." + pList.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescriptionUploadMobile");

		return mv;
	}

	// to save prescription capture mobile
	@RequestMapping(value = "/setPresDetMobile")
	@ResponseBody
	public String setPresDetMobile(PatientModel patientModel, HttpSession session) {

		String response = null;

		System.out.println("inside method setPresDetMobile");
		try {

			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);
			// patientModel.setPrescPic(prescPic);
			System.out.println(
					"...Presc Date...." + patientModel.getPrescDate() + "...UMR Number...." + patientModel.getUmrId()
							+ "...Patient Name...." + patientModel.getPatName() + "....Consultant Name...."
							+ patientModel.getConsName() + "..lastName.." + patientModel.getLastName() + "...OpNum...."
							+ patientModel.getOpNum() + "....ApptId...." + patientModel.getApptId() + "..visitType.."
							+ patientModel.getVsType() + "..appDate.." + patientModel.getApDate());

			patientModel.setPntCode(patientModel.getPntCode());
			patientModel.setPntId(patientModel.getPntId());
			patientModel.setOpNum(patientModel.getOpNum());
			patientModel.setApptId(patientModel.getApptId());
			patientModel.setUmrNo(patientModel.getUmrId());
			patientModel.setGender(patientModel.getGender());
			patientModel.setDob(patientModel.getDob());
			patientModel.setMobNum(patientModel.getMobNum());
			patientModel.setConName(patientModel.getConsName());
			patientModel.setvType(patientModel.getVsType());
			patientModel.setAppDate(patientModel.getApDate());
			patientModel.setPntName(patientModel.getPatName());

			// String[] fileNames;

			// fileNames = patientModel.getAllNames();
			// System.err.println("filesSizes...."+fileNames.length);

			// System.err.println(patientModel.getPrescPic()+"...prescPic");
			patientMapper.setPresDetails(patientModel);

			System.out.println("PrescId...." + patientModel.getPrescId() + "...PrescNum..." + patientModel.getPrescNum()
					+ "..picName.." + patientModel.getPicNames());
			patientModel.setPatientId(patientModel.getPntId());
			int setAttaches = 0;

			List<String> fileNames = new ArrayList<String>();
			System.err.println(patientModel.getPrescFileNames() + "...getPrescFileNames");
			System.err.println(patientModel.getPatientId() + "..>patientId");

			if (patientModel.getPrescFileNames() != null && !patientModel.getPrescFileNames().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getPrescFileNames();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getPrescFileNames());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.getPrescPicDetails(patientModel);

							System.out.println("timeInmilli=" + timeInmilli);
							System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicNames() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPrescPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							fileNames.add(originalFileName);
							System.out.println("fileName is............=" + fileNames);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPrescId() != 0) {

				if (!(fileNames.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + fileNames.size());
					System.out.println("insert Attaches files  are...=" + fileNames);
					for (int i = 0; i < fileNames.size(); i++) {
						String fname = fileNames.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.setPatPrescAttachments(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("files are not inserted....");
			}

			List<String> patImages = new ArrayList<String>();

			System.err.println(patientModel.getPatientId() + "..>patientId");

			if (patientModel.getPatientPics() != null && !patientModel.getPatientPics().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getPatientPics();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getPatientPics());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.callGetPhotoDetails(patientModel);
							String originalFileName = patientModel.getPicName() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPicPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							patImages.add(originalFileName);
							System.out.println("fileName is............=" + patImages);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPatientId() != 0) {

				if (!(patImages.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + patImages.size());
					System.out.println("insert Attaches files  are...=" + patImages);
					for (int i = 0; i < patImages.size(); i++) {
						String fname = patImages.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.updatePatPic(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("files are not inserted....");
			}

			List<String> attendeeImages = new ArrayList<String>();

			System.err.println(patientModel.getPatientId() + "..>patientId");

			if (patientModel.getAttendeePics() != null && !patientModel.getAttendeePics().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getAttendeePics();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getAttendeePics());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.callGetPhotoDetails(patientModel);

							// System.out.println("timeInmilli=" + timeInmilli);
							// System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicName() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPicPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							attendeeImages.add(originalFileName);
							System.out.println("fileName is............=" + attendeeImages);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPatientId() != 0) {

				if (!(attendeeImages.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + attendeeImages.size());
					System.out.println("insert Attaches files  are...=" + attendeeImages);
					for (int i = 0; i < attendeeImages.size(); i++) {
						String fname = attendeeImages.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.updateAttendeePic(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("att image is empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("att image is not inserted....");
			}

			if (setAttaches != 0) {
				response = "1" + "^" + patientModel.getUmrId();
			} else {
				response = "0" + "^" + patientModel.getUmrId();
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return response;

	}

	@RequestMapping(value = "/updatePresDetMobile")
	@ResponseBody
	public String updatePresDetMobile(PatientModel patientModel, HttpSession session) {

		String response = null;

		System.out.println("inside method updatePresDetMobile");
		try {

			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);
			// patientModel.setPrescPic(prescPic);
			System.out.println(
					"...Presc Date...." + patientModel.getPrescDate() + "...UMR Number...." + patientModel.getUmrId()
							+ "...Patient Name...." + patientModel.getPatName() + "....Consultant Name...."
							+ patientModel.getConsName() + "..lastName.." + patientModel.getLastName() + "...OpNum...."
							+ patientModel.getOpNum() + "....ApptId...." + patientModel.getApptId() + "..visitType.."
							+ patientModel.getVsType() + "..appDate.." + patientModel.getApDate());

			patientModel.setPntCode(patientModel.getPntCode());
			patientModel.setPntId(patientModel.getPntId());
			patientModel.setOpNum(patientModel.getOpNum());
			patientModel.setApptId(patientModel.getApptId());
			patientModel.setUmrNo(patientModel.getUmrId());
			patientModel.setGender(patientModel.getGender());
			patientModel.setDob(patientModel.getDob());
			patientModel.setMobNum(patientModel.getMobNum());
			patientModel.setConName(patientModel.getConsName());
			patientModel.setvType(patientModel.getVsType());
			patientModel.setAppDate(patientModel.getApDate());
			patientModel.setPntName(patientModel.getPatName());

			// patientMapper.setPresDetails(patientModel);

			System.out.println("PrescId...." + patientModel.getPrescId() + "...PrescNum..." + patientModel.getPrescNum()
					+ "..picName.." + patientModel.getPicNames());
			patientModel.setPatientId(patientModel.getPntId());
			int setAttaches = 0;

			List<String> fileNames = new ArrayList<String>();
			System.err.println(patientModel.getPrescFileNames() + "...TicketFileNames" + patientModel.getDescriptions()
					+ "....Description");
			System.err.println(patientModel.getPatientId() + "..>patientId");

			if (patientModel.getPrescFileNames() != null && !patientModel.getPrescFileNames().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getPrescFileNames();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getPrescFileNames());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.getPrescPicDetails(patientModel);

							System.out.println("timeInmilli=" + timeInmilli);
							System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicNames() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPrescPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							fileNames.add(originalFileName);
							System.out.println("fileName is............=" + fileNames);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPrescId() != 0) {

				if (!(fileNames.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + fileNames.size());
					System.out.println("insert Attaches files  are...=" + fileNames);
					for (int i = 0; i < fileNames.size(); i++) {
						String fname = fileNames.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.setPatPrescAttachments(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("files are not inserted....");
			}

			List<String> patImages = new ArrayList<String>();

			System.err.println(patientModel.getPatientId() + "..>patientId");

			if (patientModel.getPatientPics() != null && !patientModel.getPatientPics().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getPatientPics();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getPatientPics());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.callGetPhotoDetails(patientModel);

							// System.out.println("timeInmilli=" + timeInmilli);
							// System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicName() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPicPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							patImages.add(originalFileName);
							System.out.println("fileName is............=" + patImages);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPatientId() != 0) {

				if (!(patImages.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + patImages.size());
					System.out.println("insert Attaches files  are...=" + patImages);
					for (int i = 0; i < patImages.size(); i++) {
						String fname = patImages.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.updatePatPic(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("files are not inserted....");
			}

			List<String> attendeeImages = new ArrayList<String>();

			System.err.println(patientModel.getPatientId() + "..>patientId");

			if (patientModel.getAttendeePics() != null && !patientModel.getAttendeePics().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getAttendeePics();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getAttendeePics());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.callGetPhotoDetails(patientModel);

							// System.out.println("timeInmilli=" + timeInmilli);
							// System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicName() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPicPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							attendeeImages.add(originalFileName);
							System.out.println("fileName is............=" + attendeeImages);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPatientId() != 0) {

				if (!(attendeeImages.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + attendeeImages.size());
					System.out.println("insert Attaches files  are...=" + attendeeImages);
					for (int i = 0; i < attendeeImages.size(); i++) {
						String fname = attendeeImages.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.updateAttendeePic(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("att image is empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("att image is not inserted....");
			}

			if (setAttaches != 0) {
				response = "1" + "^" + patientModel.getUmrId();
			} else {
				response = "0" + "^" + patientModel.getUmrId();
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return response;

	}

	@RequestMapping(value = "/getAttachedPrescByPatIdMobile", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getAttachedPrescByPatIdMobile(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		try {
			List<PatientModel> patPrescPics = patientMapper.getPrescreptionsByPatIdForMobile(patientModel);
			mv.addObject("patPrescPics", patPrescPics);
			// System.out.println("file name size......" + patPrescPics.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/prescriptionUploadMobileInter");

		return mv;
	}

	/*
	 * getSuvPrescUploadMobile is to upload suvarna prescriptions for op
	 * implementation
	 */

	@RequestMapping(value = "/getSuvPrescUploadMobile", method = RequestMethod.GET)
	public ModelAndView getSuvPrescUploadMobile(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			/*
			 * PatientModel empId = patientMapper.getEmpId(patientModel);
			 * System.err.println(empId.getUserEmpId()+"empIddddddd in >>");
			 * patientModel.setEmpId(empId.getUserEmpId());
			 * System.err.println(patientModel.getEmpId()+"...EmpId in mob");
			 */

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);

			List<PatientModel> pList = patientMapper.getSuvPatDetails(patientModel);
			mv.addObject("pList", pList);
			/*
			 * System.err.println("suv pat 's List is..." + pList.size()); for (int i=0; i<
			 * pList.size(); i++ ) {
			 * System.err.println("..umr...."+pList.get(i).getUmrNo()); }
			 */

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/suvarnaPrescUploadMobile");

		return mv;
	}

	// to save suvarna prescription capture mobile
	@RequestMapping(value = "/setSuvPrescription")
	@ResponseBody
	public String setSuvPrescription(PatientModel patientModel, HttpSession session) {

		String response = null;

		System.out.println("inside method setSuvPrescription");
		try {

			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);
			// patientModel.setPrescPic(prescPic);
			System.out.println("...UMR Number...." + patientModel.getUmrId());
			/*
			 * patientModel.setPntCode(patientModel.getPntCode());
			 * patientModel.setPntId(patientModel.getPntId());
			 * patientModel.setOpNum(patientModel.getOpNum());
			 * patientModel.setApptId(patientModel.getApptId());
			 * patientModel.setUmrNo(patientModel.getUmrId());
			 * patientModel.setGender(patientModel.getGender());
			 * patientModel.setDob(patientModel.getDob());
			 * patientModel.setMobNum(patientModel.getMobNum());
			 * patientModel.setConName(patientModel.getConsName());
			 * patientModel.setvType(patientModel.getVsType());
			 * patientModel.setAppDate(patientModel.getApDate());
			 * patientModel.setPntName(patientModel.getPatName());
			 */
			patientMapper.setSuvPrescription(patientModel);

			System.out
					.println("PrescId...." + patientModel.getPrescId() + "...PrescNum..." + patientModel.getPrescNum());

			int setAttaches = 0;

			List<String> fileNames = new ArrayList<String>();
			System.err.println(patientModel.getPrescFileNames() + "...getPrescFileNames");

			if (patientModel.getPrescFileNames() != null && !patientModel.getPrescFileNames().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getPrescFileNames();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getPrescFileNames());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.getPrescPicDetails(patientModel);

							System.out.println("timeInmilli=" + timeInmilli);
							System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicNames() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPrescPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							fileNames.add(originalFileName);
							System.out.println("fileName is............=" + fileNames);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPrescId() != 0) {

				if (!(fileNames.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + fileNames.size());
					System.out.println("insert Attaches files  are...=" + fileNames);
					for (int i = 0; i < fileNames.size(); i++) {
						String fname = fileNames.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.setSuvPrescAttachments(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("files are not inserted....");
			}

			if (setAttaches != 0) {
				response = "1" + "^" + patientModel.getUmrNo();
			} else {
				response = "0" + "^" + patientModel.getUmrNo();
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return response;

	}

	@RequestMapping(value = "/getSuvAttachedPresc", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView getSuvAttachedPresc(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		try {
			List<PatientModel> patPrescPics = patientMapper.getSuvPrescreptionsByPrescId(patientModel);
			mv.addObject("patPrescPics", patPrescPics);
			// System.out.println("file name size......" + patPrescPics.size());

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/suvprescUploadInter");

		return mv;
	}

	@RequestMapping(value = "/deleteSuvPrescPic")
	@ResponseBody
	public String deleteSuvPrescPic(PatientModel patientModel, HttpSession session) {

		System.out.println("before trycatch");
		String response = null;

		String userName = (String) session.getAttribute("userName");
		patientModel.setModifiedBy(userName);
		System.out.println("userName=" + userName);
		String userIp = (String) session.getAttribute("userIp");
		patientModel.setModifiedIp(userIp);
		System.out.println("userIp=" + userIp);

		try {
			// System.out.println("patientId="+advanceAmountModel.getPatientId());

			int pdelete = patientMapper.delSuvPrescPics(patientModel);
			System.out.println("deleted pics..." + pdelete);

			if (pdelete != 0) {
				response = "1";
			} else {
				response = "0";
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		// System.out.println(mav.toString());
		return response;
	}

	@RequestMapping(value = "/updateSuvPrescription")
	@ResponseBody
	public String updateSuvPrescription(PatientModel patientModel, HttpSession session) {

		String response = null;

		System.out.println("inside method updateSuvPrescription");
		try {

			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);

			int setAttaches = 0;
			int umrupdate = 0;

			if (patientModel.getUmrUpdateSts() != 0) {

				umrupdate = patientMapper.getUpdateUmrnum(patientModel);
			}

			List<String> fileNames = new ArrayList<String>();

			if (patientModel.getPrescFileNames() != null && !patientModel.getPrescFileNames().isEmpty()) {
				List<MultipartFile> crunchifyFiles = patientModel.getPrescFileNames();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + patientModel.getPrescFileNames());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							long time = System.currentTimeMillis();

							patientMapper.getPrescPicDetails(patientModel);

							System.out.println("timeInmilli=" + timeInmilli);
							System.out.println("time=" + time);
							// String originalFileName = removeextn + timeInmilli + "." + extn; //this works
							// for only for linux
							// String originalFileName = removeextn + "." + extn; //this works for both
							// windows and linux
							String originalFileName = patientModel.getPicNames() + "." + extn; // this works for both
																								// windows and linux

							try {
								multipartFile.transferTo(new File(patientPrescPath + originalFileName));
							} catch (IllegalStateException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							fileNames.add(originalFileName);
							System.out.println("fileName is............=" + fileNames);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}
			if (patientModel.getPrescId() != 0) {

				if (!(fileNames.isEmpty())) {
					System.out.println("insert Attaches files  size is...=" + fileNames.size());
					System.out.println("insert Attaches files  are...=" + fileNames);
					for (int i = 0; i < fileNames.size(); i++) {
						String fname = fileNames.get(i);
						patientModel.setAttachmentPicName(fname);
						String userName1 = (String) session.getAttribute("userName");
						patientModel.setAddedBy(userName1);

						String userIp1 = (String) session.getAttribute("userIp");
						patientModel.setAddedIp(userIp1);
						// System.out.println("description in for loop=" +
						// patientModel.getDescriptions()[i]);
						// patientModel.setDescription(patientModel.getDescriptions()[i]);
						try {
							setAttaches = patientMapper.setSuvPrescAttachments(patientModel);
							System.out.println("setAttaches=" + setAttaches);
						} catch (Exception exp) {
							exp.printStackTrace();
						}
					}

				} else {
					System.out.println("files are empty");
					patientModel.setFilsiz(1);

				}

			} else {
				System.out.println("files are not inserted....");
			}

			if (setAttaches != 0 || umrupdate != 0) {
				response = "1" + "^" + patientModel.getUmrNo();
			} else {
				response = "0" + "^" + patientModel.getUmrNo();
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return response;

	}

	@RequestMapping(value = "/suvPrescPicsPrint")
	@ResponseBody
	public ModelAndView suvPrescPicsPrint(PatientModel patientModel) {
		ModelAndView mv = new ModelAndView();

		System.out.println("im in method");
		try {

			/*
			 * PatientModel getPatientDetails= patientMapper.getSuvPrescPics(patientModel);
			 * mv.addObject("getPatientDetails", getPatientDetails);
			 * System.err.println(patientModel+"...getPatientDetails...");
			 */

			List<PatientModel> PrescPics = patientMapper.getSuvPrescPics(patientModel);
			mv.addObject("PrescPics", PrescPics);
			System.out.println("file name size......" + PrescPics.size());
			for (int i = 0; i < PrescPics.size(); i++) {
				patientModel.setUmrNo(PrescPics.get(i).getUmrNo());
			}

			System.err.println(patientModel.getUmrNo() + "...getPatientDetails...");
		} catch (Exception exp) {
			exp.printStackTrace();
		}

		mv.setViewName(moduleName + "/suvPrescPicsPrint");

		return mv;
	}

	@RequestMapping(value = "/getVisitId", method = RequestMethod.GET)
	@ResponseBody
	private Integer getVisitId(PatientModel patientModel) {
		Integer result = 0;

		try {

			System.err.println("appt id...." + patientModel.getPatApptId());

			PatientModel getVisitId = patientMapper.getPatVisitId(patientModel.getPatApptId());
			System.err.println("visitttt id...." + getVisitId.getVisitId());
			result = getVisitId.getVisitId();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/*
	 * @RequestMapping(value = "/getPatOpBillPrintjasper", method =
	 * RequestMethod.GET) public ModelAndView getPatOpBillPrintjasper(ModelAndView
	 * modelAndView, PatientModel patientModel) {
	 * patientModel.setPatApptId(patApptId);
	 * System.err.println("ScoreId ipCsId-----> " + patientModel.getPatApptId());
	 * 
	 * JRDataSource patDataSource = dataprovider.getPatRegPrint(patientModel);
	 * JRDataSource patSubDatasource =
	 * dataprovider.getPatPrintSubReport(patientModel); //JRDataSource
	 * pharmBillSubDatasource = dataprovider.getPharmBillPrintSubReport(salesModel);
	 * 
	 * System.out.println("dataSource=" + patDataSource);
	 * System.out.println("pharmSubDatasource=" + patSubDatasource); Map<String,
	 * Object> parameterMap = new HashMap<String, Object>();
	 * parameterMap.put("patDataSource", patDataSource);
	 * parameterMap.put("datasource", patSubDatasource);
	 * //parameterMap.put("billdataSource", pharmBillSubDatasource); //String
	 * s=numberToWords( "ntow".toCharArray()); //
	 * System.out.println("parameterMap=>>>>>>"+parameterMap.forEach(sy););
	 * modelAndView = new ModelAndView("patRegPrint", parameterMap); //
	 * modelAndView.addObject("PharmacyPrint", parameterMap);
	 * 
	 * return modelAndView;
	 * 
	 * }
	 */
	@RequestMapping(value = "/getPatOpBillRegjasper", method = RequestMethod.GET)
	public ModelAndView getPatOpBillRegjasper(ModelAndView modelAndView, PatientModel patientModel,
			@RequestParam("patApptId") String patApptId) {
		patientModel.setPatApptId(patApptId);
		System.err.println("ScoreId ipCsId-----> " + patientModel.getPatApptId());
		JRDataSource patSubDatasource = dataprovider.getPatRegPrint(patientModel);
		JRDataSource patDataSource = dataprovider.getPatRegpaysubPrintreg(patientModel);
		System.out.println("dataSource=" + patDataSource);
		// System.out.println("pharmSubDatasource=" + patSubDatasource);
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		parameterMap.put("patDataSource", patSubDatasource);
		parameterMap.put("datasource", patDataSource);
		
		modelAndView = new ModelAndView("patRegBillPrint", parameterMap);
		return modelAndView;
	}

	@RequestMapping(value = "/getPatOpBillConjasper", method = RequestMethod.GET)
	public ModelAndView getPatOpBillConjasper(ModelAndView modelAndView, PatientModel patientModel,
			@RequestParam("patApptId") String patApptId,@RequestParam("billId") Integer billId,@RequestParam("sourceServiceId") String sourceServiceId) {
		patientModel.setPatApptId(patApptId);
		patientModel.setSourceServiceId(sourceServiceId);
		System.out.println("sourceServiceId"+patientModel.getSourceServiceId());
		System.err.println("ScoreId ipCsId-----> " + patientModel.getPatApptId());
		// JRDataSource patDataSource = dataprovider.getPatRegPrint(patientModel);
		JRDataSource patSubDatasource = dataprovider.getPatConsultationPrint(patientModel);
		JRDataSource patDataSource = dataprovider.getPatRegpaysubPrint(patientModel);
		// JRDataSource pharmBillSubDatasource =
		// dataprovider.getPharmBillPrintSubReport(salesModel);

		// System.out.println("dataSource=" + patDataSource);
		System.out.println("pharmSubDatasource=" + patSubDatasource);
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		// parameterMap.put("patDataSource", patDataSource);
		parameterMap.put("patDataSource", patSubDatasource);
		parameterMap.put("datasource", patDataSource);
		// parameterMap.put("billdataSource", pharmBillSubDatasource);
		// String s=numberToWords( "ntow".toCharArray());
		// System.out.println("parameterMap=>>>>>>"+parameterMap.forEach(sy););
		modelAndView = new ModelAndView("patConBillPrint", parameterMap);
		// modelAndView.addObject("PharmacyPrint", parameterMap);

		return modelAndView;
	}

	@RequestMapping(value = "/getVitals")
	@ResponseBody
	public String getVitals(PatientModel patientModel, @RequestParam("patientId") Integer patientId,
			@RequestParam("apptId") Integer apptId) {
		String response = null;
		int a = 0;

		try {
			System.err.println("patientid---@@@@@---" + patientId + "apptId----@@@@----" + apptId);

			patientModel.setPatientId(patientId);
			// patientModel.setApptId(apptId);

			if (patientId != null && apptId != null) {
				PatientModel vital = patientMapper.getPntVitals(patientModel);
				a = 1;
				response = "1" + "^" + vital.getVitalValue() + "^" + vital.getBloodGrp() + "^" + patientId + "^"
						+ apptId;
				System.err.println("response>>>>>>>>>>---" + response + "-----a" + a);
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		if (response != null)
			return response;
		else
			return response = "2" + "^" + patientId + "^" + apptId;
	}

	@RequestMapping(value = "/saveVitalsDT")
	@ResponseBody
	public String saveVitalsDT(PatientModel patientModel) {
		String response = null;

		System.out.println("in saveVitalsDT()......" + patientModel.getPntId() + "-" + patientModel.getApptId());
		try {

			List<PatientModel> vitalList = patientMapper.getNewVital(patientModel);
			System.out.println("....visit list..." + vitalList.size());
			patientMapper.updateApttVitalStatus(patientModel);

			int l = vitalList.size();
			if (l == 0) {
				for (int i = 0; i < 8; i++) {

					System.out.println(" " + i + "in loop.....");
					System.out.println("....visit list..." + patientModel.getVitalIds());
					System.out.println("....visit list..." + patientModel.getVitalValues());
					System.out.println("....Appt Id..." + patientModel.getApptId());
					patientModel.setVitalId(patientModel.getVitalIds()[i]);
					patientModel.setVitalValue(patientModel.getVitalValues()[i]);
					System.out.println("....AMMMMMM Id..." + patientModel.getVitalValues()[i]);
					patientModel.setApptId(patientModel.getApptId());
					patientMapper.setVisitVitalsNo(patientModel);

				}
				response = "1";
			} else {
				for (int i = 0; i < 8; i++) {
					// mrMapper.updatests(patientModel);
					patientMapper.deletePrev(patientModel);
				}

				for (int i = 0; i < 8; i++) {

					System.out.println(" " + i + "in loop.....");
					patientModel.setVitalId(patientModel.getVitalIds()[i]);
					patientModel.setVitalValue(patientModel.getVitalValues()[i]);
					patientMapper.setVisitVitalsNo(patientModel);

				}
				response = "2";
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return response;
	}

	// anyEMI Payment Functionality Creation on 10-06-2022 by Hemanth

	@RequestMapping(value = "/encriptAnyEmiString")
	@ResponseBody
	public String encriptAnyEmiString(String text, @RequestParam("empId") Integer empId, PatientModel pntModel) {
		String response = null;
		PatientModel patList = null;
		int insert = 0;
		try {
			System.out.println("Text----->" + text);

			String[] arr = text.split("!===!", 0);
			System.out.println(arr[0] + " arr[0] " + arr[1] + " arr[1] " + arr[2] + " arr[2] " + arr[3] + " arr[3] "
					+ arr[4] + " arr[4] " + arr[6] + " arr[6] -- split string " + arr.length);

			pntModel.setPatientName(arr[4]);
			pntModel.setMobNum(arr[6]);
			pntModel.setOrderId(arr[1]);
			pntModel.setBillAmt(arr[2]);
			pntModel.setEmpId(empId);
			patList = patientMapper.getAnyEmiPaymentDetails(pntModel);
			System.out.println("patList --------->" + patList);
			if (patList == null) {
				insert = patientMapper.setPatAnyEmiPayment(pntModel);
				System.out.println("insert --------->" + insert);
			} else {
				insert = patientMapper.updatePatAnyEmidet(pntModel);
			}
			String replaceString = text.replace("!===!", "|");
			System.out.println(insert + " <----Replace String----->" + replaceString);
			if (insert != 0) {
				response = base64Class.encodeString(replaceString);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;

	}

	@RequestMapping(value = "/patientQueuePayment", method = RequestMethod.GET)
	public ModelAndView patientQueuePayment(HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			System.out.println("in method");
		} catch (Exception e) {
			e.printStackTrace();
		}
		mv.setViewName(moduleName + "/patientQueuePaymentAnyEmi");
		return mv;

	}

	@RequestMapping(value = "/decriptAnyEmiString")
	@ResponseBody
	public String decriptAnyEmiString(String text, PatientModel pntModel) {
		int update = 0;
		String response = null;
		String paymentresponse = null;
		String result = null;
		try {
			System.out.println("Text----->" + text);
			// decript the String
			response = base64Class.decodeString(text);
			String replaceString = response.replace("|", "!===!");

			String[] arr = replaceString.split("!===!", 0);
			pntModel.setCreditEmpId(arr[2]);
			pntModel.setStatus(arr[3]);
			pntModel.setOrderId(arr[1]);

			// update payment status and orderId
			System.out.println(arr[3] + "OrderId 1");

			if (arr[3].equals("Credit")) {
				System.out.println(arr[3] + "OrderId ");
				String ENQUIRY_URL = "https://payments.anyemi.com/secure/TransactionStatusEnquiry?msg=" + arr[1];
				RestTemplate restTemplate = new RestTemplate();
				paymentresponse = restTemplate.getForObject(ENQUIRY_URL, String.class);
				System.out.println(response + "OrderId ");

				JSONObject resObj = new JSONObject(paymentresponse);
				// JSONObject json = getJSONfromURL(URL);
				JSONObject user = resObj.getJSONObject("msg");
				System.out.println(user + "<-- resObj--->" + resObj + " response mapped =" + resObj.toString());

				pntModel.setAmount(user.getString("Amount"));
				System.out.println("amount ---> " + pntModel.getAmount());
				pntModel.setPAYSTAROrderId(user.getString("PAYSTAROrderId"));
				pntModel.setPaymentrefernceid(user.getString("paymentrefernceid"));
				pntModel.setOrderId(user.getString("OrderId"));
				pntModel.setDateTime(user.getString("DateTime"));
				pntModel.setPaymentmode(user.getString("Paymentmode"));
				pntModel.setBankid(user.getString("Bankid"));
				System.out.println("order id ---> " + pntModel.getOrderId());
				update = patientMapper.updatePatAnyEmiPayment(pntModel);
				result = "1";
			} else {
				result = "0";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;

	}

	@RequestMapping(value = "/getAnyEmiPaymentDetails")
	@ResponseBody
	public String getAnyEmiPaymentDetails(PatientModel pntModel) {
		String response = null;

		try {
			System.out.println(pntModel.getPatientName() + "<-----patList");
			PatientModel patList = patientMapper.getAnyEmiPaymentDetails(pntModel);
			System.out.println(patList + "<-----patList");

			// res= paymentService.callPayStarAnyEmiApi(pntModel);
			if (patList != null && patList.getPaymentmode() != null) {
				response = "1" + "^" + patList.getPaymentmode() + "^" + patList.getAmount() + "^" + patList.getBankid()
						+ "^" + patList.getOrderId() + "^" + patList.getMobNum();
			} else {
				response = "1" + "^" + "Cash";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;

	}

	@RequestMapping(value = "/getAnyEmiRefundPayment")
	@ResponseBody
	public String getAnyEmiRefundPayment(PatientModel pntModel) {
		HttpEntity<String> response = null;
		// Gson gson = new Gson();
		String res = null;
		int insert = 0;
		try {
			PatientModel patList = patientMapper.getAnyEmiPaymentDetails(pntModel);
			response = paymentService.callPayStarApi(patList);
			String ref = response.getBody();
			// String ref1=response.toString();
			System.out.println("ref==>" + ref);
			JSONObject resObj = new JSONObject(ref);
			// JSONObject json = getJSONfromURL(URL);
			JSONObject user = resObj.getJSONObject("msg");
			pntModel.setAmount(user.getString("ref_amount"));
			System.out.println("amount ---> " + pntModel.getAmount());
			pntModel.setRefID(user.getString("refID"));
			pntModel.setStatus_msg(user.getString("status_msg"));
			pntModel.setOrderId(user.getString("orderId"));
			pntModel.setRefundId(user.getString("refundId"));
			pntModel.setTxnId(user.getString("txnId"));

			if (user.getString("status_msg").equals("Refund Initiate Successfully")) {
				insert = patientMapper.updatePatAnyEmiPaymentRefund(pntModel);

				res = "1" + "^" + user.getString("status_msg") + "^" + user.getString("refID") + "^"
						+ user.getString("refundId") + "^" + user.getString("ref_amount");

			} else {
				res = "0" + "^" + "Request Parameters does not match";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return res;

	}

	@RequestMapping(value = "/paymentTest")
	@ResponseBody
	public String paymentTest(SMSModel smsModel, @RequestParam("empId") String empId,
			@RequestParam("patientName") String patientName, @RequestParam("mobileNum") String mobileNum,
			@RequestParam("billAmt") String billAmt, HttpSession session) {
		HttpEntity<String> res = null;
		PatientModel patientModel = new PatientModel();
		PaymentReqPayloadModel req = new PaymentReqPayloadModel();
		System.out.println("in method");
		try {
			req.setName(patientName);
			req.setPhone(mobileNum);
			req.setAmount(billAmt);
			req.setEmpId(empId);
			System.out.println("name=" + req.getEmpId() + "phone" + req.getPhone() + "Amount " + req.getAmount());

			Random rand = new Random();
			String tandsacId = "TransactId_";
			String randmNumber = Integer.toString(rand.nextInt(2134568213));
			System.out.println("TEST:::" + tandsacId + randmNumber);
			req.setMerchant_txn_id(tandsacId + randmNumber);
			res = paymentService.callPayStarApi(req);
			System.out.println("ress " + res);

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return res.toString();
	}

	@RequestMapping(value = "/getPaymentEnqLink")
	@ResponseBody
	public String getPaymentEnqLink(SMSModel smsModel, @RequestParam("empId") String empId,
			@RequestParam("patientName") String patientName, @RequestParam("mobileNum") String mobileNum,
			@RequestParam("billAmt") String billAmt, HttpSession session) {
		HttpEntity<String> res = null;
		String response = "0";

		System.out.println("in method");
		try {
			smsModel.setPatientName(patientName);
			smsModel.setMobileNum(mobileNum);
			smsModel.setEmpId(empId);

			PaymentReqPayloadModel payLinkStatus = patientMapper.getpayLinkstatuss(smsModel);
			res = paymentService.callPayStarApiEnq(payLinkStatus);

			JSONObject user = new JSONObject(res.getBody());

			System.out.println("user********************** ==>" + user.getString("status") + "status==>"
					+ user.getString("payment_status"));
			if (user.getString("payment_status").equals("1")) {
				response = "1" + "^" + user.getString("payment_status") + "^" + user.getString("merchant_txn_id") + "^"
						+ user.getString("amount") + "^" + mobileNum;
			} else {
				response = "0";
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return response;
	}

	@RequestMapping(value = "/setDocument", method = RequestMethod.GET)
	public ModelAndView setDocument(PatientModel pntModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();
		try {

			List<PatientModel> addDocTypes = patientMapper.getAllDepartments();
			mv.addObject("addDocTypes", addDocTypes);

			String userId = (String) session.getAttribute("userName");
			System.out.println(userId);
			pntModel.setUserName(userId);

			if (userId.equals("admin") || userId.equals("00002024")) {
				System.out.println(" in if");
				List<PatientModel> documentList = patientMapper.getAllDocuments();
				mv.addObject("documentList", documentList);
			} else {
				System.out.println(" in else");
				List<PatientModel> documentList = patientMapper.getAllDocumentsWise(pntModel);
				mv.addObject("documentList", documentList);
			}

			List<PatientModel> addAdmin = patientMapper.getAllAdmin();
			mv.addObject("addAdmin", addAdmin);

		} catch (Exception e) {
			e.printStackTrace();
		}

		mv.setViewName(moduleName + "/uploadDocumentation");
		return mv;
	}

	@RequestMapping(value = "/setDocuments", method = RequestMethod.POST)
	@ResponseBody
	public String setDocuments(PatientModel pntModel, HttpSession session) {

		SimpleDateFormat frmt = new SimpleDateFormat("dd-MMM-yyyy");
		SimpleDateFormat dbFrmt = new SimpleDateFormat("yyyy-MM-dd");
		String response = null;
		String message = null;
		String status = null;
		int insert = 0;
		int insert1 = 0;
		int insert2 = 0;
		int setAttaches = 0;

		try {

			String userName = (String) session.getAttribute("userName");
			pntModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			pntModel.setAddedIp(userIp);

			List<String> fileNames = new ArrayList<String>();
			/* List<String> DocNameNew = new ArrayList<String>(); */

			if (pntModel.getTicketFileNames() != null && !pntModel.getTicketFileNames().isEmpty()) {
				List<MultipartFile> crunchifyFiles = pntModel.getTicketFileNames();

				if (null != crunchifyFiles && crunchifyFiles.size() > 0) {
					for (MultipartFile multipartFile : crunchifyFiles) {

						String fileName = multipartFile.getOriginalFilename();
						if (!"".equalsIgnoreCase(fileName)) {
							System.out.println("attach files......" + pntModel.getTicketFileNames());

							// Handle file content -
							// multipartFile.getInputStream()
							String extn = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
							System.out.println("extn=" + extn);
							String removeextn = FilenameUtils.removeExtension(multipartFile.getOriginalFilename());
							System.out.println("removeExtn=" + removeextn);
							Timestamp timeInmilli = new Timestamp(new Date().getTime());
							System.out.println("timeInmilli=" + timeInmilli);
							String originalFileName = removeextn + timeInmilli + "." + extn;

							multipartFile.transferTo(new File(nabhPath + originalFileName));
							System.out.println("===================" + originalFileName + "==============="
									+ pntModel.getDocNameNew() + "-----" + pntModel.getDeliverDtNew());
							fileNames.add(originalFileName);

							System.out.println("fileName is............=" + fileNames);
						}
					}
				}
			} else {
				System.out.println("no image and no file");
			}

			/* if (pntModel.getDocumentId() != 0) { */
			if (!(fileNames.isEmpty())) {

				for (int i = 0; i < fileNames.size(); i++) {
					String fname = fileNames.get(i);

					/* for (int j = 0; j < clientModel.getDocNameNews().length; j++) { */
					String docCode = patientMapper.getDocCode(pntModel);
					System.out.println("Doccode=" + docCode);
					pntModel.setDocNameNew(pntModel.getDocNameNews()[i]);
					try {
						pntModel.setDocCode(docCode);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
					try {
						pntModel.setDeliverDtNew(pntModel.getDeliverDtNews()[i]);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
					try {
						pntModel.setDocTypeNew(pntModel.getDocTypeNew());
					} catch (Exception exp) {
						exp.printStackTrace();
					}
					try {
						pntModel.setUploadedByNew(pntModel.getUploadedByNews()[i]);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
					System.out.println("-----------" + pntModel.getDocNameNews()[i]);

					System.out.println("----------------======" + fname);
					pntModel.setAttachmentName(fname);

					String userName1 = (String) session.getAttribute("userName");
					pntModel.setAddedBy(userName1);

					String userIp1 = (String) session.getAttribute("userIp");
					pntModel.setAddedIp(userIp1);

					// projectPlanModel.setDescription(projectPlanModel.getDescriptions()[i]);

					try {
						if (pntModel.getDescriptions()[i] != null && pntModel.getDescriptions()[i] != "0") {
							pntModel.setDescription(pntModel.getDescriptions()[i]);
							System.out.println("==========" + pntModel.getDescriptions()[i]);
						}
					} catch (ArrayIndexOutOfBoundsException e) {
						e.printStackTrace();
					}
					try {
						setAttaches = patientMapper.setDocumentUpload(pntModel);
						patientMapper.updateDocCode(pntModel);

						System.out.println("setAttaches=" + setAttaches);
					} catch (Exception exp) {
						exp.printStackTrace();
					}
					/* } */
				}
			} else {

			}

			response = pntModel.getAttachmentName();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	@RequestMapping(value = "/deleteDocument", method = RequestMethod.GET)
	@ResponseBody
	private String deleteDepartment(PatientModel pntModel, HttpSession session) {

		String outputResult = null;
		try {

			String userName = (String) session.getAttribute("userName");
			pntModel.setModifiedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			pntModel.setModifiedIp(userIp);

			System.out.println("delete department id.." + pntModel.getDocId());
			// "deleteOtDesignation" is used to update the selected url_id to 'INACTIVE'.
			int deleteDepartment = patientMapper.deleteDepartment(pntModel);

			if (deleteDepartment == 1) {
				outputResult = deleteSuccess + "^" + "1";

			}
		} catch (Exception exp) {
			exp.printStackTrace();

		}

		return outputResult;
	}

	// Allergy details' functionalities by P. Janardhan
	@RequestMapping(value = "/getAllergies")
	private ModelAndView getAllergies(ModelAndView mv, PatientModel patientModel,
			@RequestParam(value = "patientId") Integer patientId) {

		// String invPrice = null;
		List<PatientModel> patientAllergies = null;
		try {

			patientAllergies = patientMapper.getPatientAllergies(patientId);
			mv.addObject("patientAllergies", patientAllergies);
			System.out.println("Allergies list size = " + patientAllergies.size());
		} catch (Exception e) {
			e.printStackTrace();
		}

		mv.setViewName(moduleName + "/patientQueueAllergyDetailsInter");
		return mv;
	}

	@RequestMapping(value = "/setAllergyDetails")
	@ResponseBody
	public String setAllergyDetails(PatientModel patientModel, HttpSession session) {
		String outputResult = "0";
		int InsertList = 0;
		String allergyId = "0";
		String zero = "0";
		int comp = 0;
		try {
			patientModel.setAddedBy((String) session.getAttribute("userName"));
			patientModel.setAddedIp((String) session.getAttribute("userIp"));

			System.out.println("In Save Method (setAllergyDetails) of Patient Registration Controller.");
			System.out.println("Patient id: " + patientModel.getPatientId());
			System.out.println("Visit id: " + patientModel.getVisitId());
			System.out.println("Allergy Id: " + patientModel.getAllergyId());
			System.out.println("Size of Allergy details table: " + patientModel.getAllergyReactions().length);
			System.out.println("Size of AllergyTypeIds List: " + patientModel.getAllergyTypeIds().length);
			System.err.println("Size of AllergyTypeIds List: " + patientModel.getAllergyTypeIds().length);
			int j = patientModel.getAllergyTypeIds().length;
			int l = patientModel.getAllergyReactions().length;

			for (int i = 0; i < patientModel.getAllergyReactions().length; i++) {
				// for (int i = prModel.getAllergyReactions().length-1; i>=0; i--) {
				patientModel.setAllergyId(patientModel.getAllergyIds()[i]);

				allergyId = patientModel.getAllergyId();
				System.out.println("AllergyId: " + allergyId);
				comp = allergyId.compareTo(zero);
				System.out.println("Comparator = " + comp);
				if (comp == 0) {
					System.out.println("The following data is saved in the backend.");
					System.out.println("Iteration: " + i);
					System.out.println("Allergy-id: " + patientModel.getAllergyId());
					patientModel.setAllergyReaction(patientModel.getAllergyReactions()[i]);
					System.out.println("Allergy-reaction (id): " + patientModel.getAllergyReaction());
					patientModel.setAllergyName(patientModel.getAllergyNames()[i]);
					System.out.println("Allergy-name: " + patientModel.getAllergyName());
					patientModel.setAllergyNote(patientModel.getAllergyNotes()[i]);
					System.out.println("Allergy-note: " + patientModel.getAllergyNote());
					if (l == j) {
						patientModel.setAllergyTypeId(patientModel.getAllergyTypeIds()[i]);
						System.out.println("AllergyTypeIds Array Index: " + (i));
					}
					if (l > j) {
						// prModel.setAllergyTypeId(prModel.getAllergyTypeIds()[i-j-1]);
						// System.out.println("AllergyTypeIds Array Index: "+(i-j-1));

						patientModel.setAllergyTypeId(patientModel.getAllergyTypeIds()[i + j - l]);
						System.out.println("AllergyTypeIds Array Index: " + (i + j - l));
					}
					System.out.println("Allergy-type (id): " + patientModel.getAllergyTypeId());
					InsertList = patientMapper.insertAllergyDetails(patientModel);
					System.out.println("Inserted Allergies List = " + InsertList);
				} else {
					System.out.println("In save method. Not in 'if'");
				}

				if (InsertList != 0) {
					outputResult = "1";
					// outputResult = "1" + "^" + prModel.getAllergyId();
				} else {
					outputResult = "0";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputResult;
	}

	@RequestMapping(value = "/deleteAllergyDet")
	@ResponseBody
	public String deleteAllergyDet(PatientModel patientModel, HttpSession session) {
		String outputResult = "0";
		/* int NurCarePlanInsert = 0; */
		try {
			System.err.println("In delete allergy details method of Patient Queue");
			String userName = (String) session.getAttribute("userName");
			patientModel.setAddedBy(userName);

			String userIp = (String) session.getAttribute("userIp");
			patientModel.setAddedIp(userIp);
			System.err.println("The following details are deleted.");

			System.err.println("Patient id: " + patientModel.getPatientId());
			System.err.println("Allergy name: " + patientModel.getAllergyName());

			// stdntMapper.deleteRegist(stdntModel);
			int Insert = patientMapper.deleteAllergyDetails(patientModel);
			// int Insert= indentMapper.getdeleteIndent(indentModel);
			if (Insert != 0) {
				outputResult = "1";
				System.out.println("in if");
			} else {
				outputResult = "0";
			}
		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return outputResult;
	}

	@RequestMapping(value = "/getItems", method = RequestMethod.GET)
	public ModelAndView getItems(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			List<PatientModel> menuList = null;
			menuList = patientMapper.getMenu(patientModel);
			mv.addObject("menuList", menuList);
			List<PatientModel> itemsList = null;
			itemsList = patientMapper.getTiffins(patientModel);
			mv.addObject("itemsList", itemsList);

		} catch (Exception e) {
			e.printStackTrace();
		}
		mv.setViewName(moduleName + "/foodItems");

		return mv;
	}

	@RequestMapping(value = "/setItems", method = RequestMethod.GET)
	@ResponseBody
	private String setItems(PatientModel patientModel, HttpSession session, HttpServletRequest request) {
		String outputResult = "0";

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);
		int insert = 0;
		System.out.println("insert" + patientModel.getDob());
		try {

			insert = patientMapper.setItems(patientModel);
			System.out.println("insert" + insert);
			if (insert != 0) {
				outputResult = "1" + "^" + patientModel.getItemId();
			} else {
				outputResult = "0";
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return outputResult;

	}

	@RequestMapping(value = "/setItemsStatus", method = RequestMethod.GET)
	@ResponseBody
	private String setItemsStatus(PatientModel patientModel, HttpSession session, HttpServletRequest request) {
		String outputResult = "0";

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);
		int insert = 0;
		System.out.println("insert=========" + patientModel.getItemAvilStatus());
		try {

			insert = patientMapper.setItemsStatus(patientModel);
			System.out.println("insert" + insert);
			if (insert != 0) {
				outputResult = "1" + "^" + patientModel.getItemId();
			} else {
				outputResult = "0";
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return outputResult;

	}

	@RequestMapping(value = "/getOrders", method = RequestMethod.GET)
	public ModelAndView getOrders(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();
		List<PatientModel> itemsList = null;
		List<PatientModel> orderPriceList = null;
		try {

			orderPriceList = patientMapper.getTiffinOrder(patientModel);
			mv.addObject("orderPriceList", orderPriceList);

			itemsList = patientMapper.getitemsList(patientModel);
			System.out.println(itemsList.size());
			System.out.println("price" + patientModel.getPrice());
			System.out.println("itemStatus" + patientModel.getItemAvilStatus());
			for (PatientModel X : itemsList) {

				if ((X.getItemName()).equals("idly")) {
					mv.addObject("idlyPrice", X.getPrice());
					mv.addObject("idlyStatus", X.getItemAvilStatus());
					mv.addObject("idly", X.getItemName());
				}
				if ((X.getItemName()).equals("Poha")) {
					mv.addObject("pohaPrice", X.getPrice());
					mv.addObject("pohaStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Upma")) {
					mv.addObject("upmaPrice", X.getPrice());
					mv.addObject("upmaStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("MilletIdly")) {
					mv.addObject("milletIdlyPrice", X.getPrice());
					mv.addObject("milletIdlyStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Pongal")) {
					mv.addObject("pongalPrice", X.getPrice());
					mv.addObject("pongalStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Dosa")) {
					mv.addObject("dosaPrice", X.getPrice());
					mv.addObject("dosaStatus", X.getItemAvilStatus());
					mv.addObject("Dosa", X.getItemName());
				}
				if ((X.getItemName()).equals("MilletDosa")) {
					mv.addObject("milletDosaPrice", X.getPrice());
					mv.addObject("milletDosaStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Pulka With Curry")) {
					mv.addObject("pulkaPrice", X.getPrice());
					mv.addObject("pulkaStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Meals With Out Egg")) {
					mv.addObject("mealsWithOutEggPrice", X.getPrice());
					mv.addObject("withOutEggStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Bread Omlet")) {
					mv.addObject("breadOmletPrice", X.getPrice());
					mv.addObject("breadOmletStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("ChickenDumBiryni")) {
					mv.addObject("chickenDummBiryaniPrice", X.getPrice());
					mv.addObject("DumBiryniStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("ChickenFryBiryani")) {
					mv.addObject("chickenFryBiryaniPrice", X.getPrice());
					mv.addObject("FryBiryaniStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Milk")) {
					mv.addObject("milkPrice", X.getPrice());
					mv.addObject("milkStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Tea")) {
					mv.addObject("teaPrice", X.getPrice());
					mv.addObject("teaStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Coffee")) {
					mv.addObject("coffeePrice", X.getPrice());
					mv.addObject("coffeeStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("LemonJuice")) {
					mv.addObject("lemonJuicePrice", X.getPrice());
					mv.addObject("lemonJuiceStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("ButterMilk")) {
					mv.addObject("butterMilkPrice", X.getPrice());
					mv.addObject("butterMilkStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("SweetCorn Soup")) {
					mv.addObject("sweetCornPrice", X.getPrice());
					mv.addObject("sweetCornStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Tomoto Soup")) {
					mv.addObject("tomotoSoupPrice", X.getPrice());
					mv.addObject("tomotoStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Fruit Salad")) {
					mv.addObject("fruitSaladPrice", X.getPrice());
					mv.addObject("fruitSaladStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("kommuChena")) {
					mv.addObject("kommuPrice", X.getPrice());
					mv.addObject("kommuStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("KaboolChena")) {
					mv.addObject("kaboolPrice", X.getPrice());
					mv.addObject("kaboolStatus", X.getItemAvilStatus());
				}
				if ((X.getItemName()).equals("Meals WithEgg")) {
					mv.addObject("mealsWithEggPrice", X.getPrice());
					mv.addObject("mealsWithEggStatus", X.getItemAvilStatus());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		mv.setViewName(moduleName + "/FoodOrders");

		return mv;
	}

	@RequestMapping(value = "/setOrder", method = RequestMethod.POST)
	@ResponseBody
	private String setOrder(PatientModel patientModel, HttpSession session, HttpServletRequest request) {
		String outputResult = "0";

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);
		int insert = 0;
		// System.out.println("insert"+patientModel.getDob());
		try {

			insert = patientMapper.setOrders(patientModel);
			System.out.println("insert" + insert);
			if (insert != 0) {
				outputResult = "1" + "^" + patientModel.getOrderId();
			} else {
				outputResult = "0";
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return outputResult;

	}

	@RequestMapping(value = "/getOrderedList", method = RequestMethod.GET)
	public ModelAndView getOrderedList(PatientModel patientModel, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		try {
			/*
			 * List<PatientModel> menuList = null; menuList =
			 * patientMapper.getMenu(patientModel); mv.addObject("menuList", menuList);
			 * List<PatientModel> itemsList = null; itemsList =
			 * patientMapper.getTiffins(patientModel); mv.addObject("itemsList", itemsList);
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}
		mv.setViewName(moduleName + "/foodOrderIntermediate");

		return mv;
	}

	@RequestMapping(value = "/getSelectDtOrderDetails", method = RequestMethod.GET)
	public ModelAndView getSelectDtOrderDetails(PatientModel patientModel, HttpSession session) {

		// "mv" - creating object for ModelAndView.
		ModelAndView mv = new ModelAndView();

		List<PatientModel> orderList = null;
		// try block
		try {

			patientModel.setUserId((Integer) session.getAttribute("userId"));
			patientModel.setUserRole((String) session.getAttribute("role"));
			mv.addObject("selectDtt", patientModel.getSelectDt());

			orderList = patientMapper.getOrderDetailsOnDt(patientModel);
			System.out.println("orderList" + orderList.size());
			System.out.println("srinivas");
			mv.addObject("orderList", orderList);
			for (PatientModel x : orderList) {
				System.out.println("patient id.." + x.getPntId() + "patient category.." + x.getOmletcount());

			}

		} catch (Exception exp) { // catch block
			exp.printStackTrace(); // return error in console.
		}

		// setting "patientApptCalendarEmrInter" to 'mv' object.
		mv.setViewName(moduleName + "/foodOrderIntermediate1");

		// returning 'mv' object.
		return mv;
	}

	@RequestMapping(value = "/getOrderList", method = RequestMethod.GET)
	public ModelAndView getOrderList(PatientModel patientModel, HttpSession session) {

		// "mv" - creating object for ModelAndView.
		ModelAndView mv = new ModelAndView();

		List<PatientModel> orderList = null;
		// try block
		try {

			patientModel.setUserId((Integer) session.getAttribute("userId"));
			patientModel.setUserRole((String) session.getAttribute("role"));
			mv.addObject("selectDtt", patientModel.getSelectDt());

			orderList = patientMapper.getOrderDetailsOnDt(patientModel);
			System.out.println("orderList" + orderList.size());
			System.out.println("srinivas");
			mv.addObject("orderList", orderList);
			for (PatientModel x : orderList) {
				System.out.println("patient id.." + x.getPntId() + "patient category.." + x.getOmletcount());

			}

		} catch (Exception exp) { // catch block
			exp.printStackTrace(); // return error in console.
		}

		// setting "patientApptCalendarEmrInter" to 'mv' object.
		mv.setViewName(moduleName + "/foodOrderListWise");

		// returning 'mv' object.
		return mv;
	}

	@RequestMapping(value = "/setOrderStatus", method = RequestMethod.GET)
	@ResponseBody
	private String setOrderStatus(PatientModel patientModel, HttpSession session, HttpServletRequest request) {
		String outputResult = "0";

		String userName = (String) session.getAttribute("userName");
		patientModel.setAddedBy(userName);

		String userIp = (String) session.getAttribute("userIp");
		patientModel.setAddedIp(userIp);
		int insert = 0;
		System.out.println("insert=========" + patientModel.getOrderStatus());
		try {

			insert = patientMapper.setOrderStatus(patientModel);
			System.out.println("insert" + insert);
			patientModel.setOrderStatus(patientModel.getOrderStatus());
			System.out.println("srinivas" + patientModel.getOrderStatus());
			if (insert != 0) {
				outputResult = "1" + "^" + patientModel.getOrderId();
			} else {
				outputResult = "0";
			}

		} catch (Exception exp) {
			exp.printStackTrace();
		}

		return outputResult;

	}

	@RequestMapping(value = "/getPatientConsultationPrint")
	private ModelAndView getPatientConsultationPrint(PatientModel patientModel,
			@RequestParam("patientId") Integer patientId, @RequestParam("apptId") Integer apptId,@RequestParam("visitId") Integer visitId) {
		ModelAndView mv = new ModelAndView();
		System.out.println("patientId....." + patientId);
		System.out.println("visitId,....." + visitId);
		List<PatientModel> mrVisitInvestigationDet = null;
		List<PatientModel> mrVisitDrugDet = null;
		try {
			mrVisitDrugDet = patientMapper.getPatientVisitDrugs(patientModel);
 			mv.addObject("mrVisitDrugDet", mrVisitDrugDet);
 			System.out.println("mrVisitDrugDet.........."+mrVisitDrugDet.size());
 			
			PatientModel consultPrint = patientMapper.getconsultPrint(patientModel);
			// System.out.println("SUPPUUUU*****"+consultPrint.getPntId());
			mv.addObject("consultPrint", consultPrint);
			System.out.println(consultPrint.getPatientId());
			System.out.println(consultPrint.getApptId());
			mrVisitInvestigationDet = patientMapper.getPatientVisitInvestigations(patientModel);
 			mv.addObject("mrVisitInvestigationDet", mrVisitInvestigationDet);
 			System.out.println("mrVisitInvestigationDet.........."+mrVisitInvestigationDet.size());
 			
 			if (mrVisitInvestigationDet.size() == 0) {
 				patientModel.setVisitInvStat("0");
 			} else {
 				patientModel.setVisitInvStat("1");
 			}

			/*
			 * PatientModel diagnosisPrint = patientMapper.getDiagnosisPrint(patientModel);
			 * mv.addObject("diagnosisPrint", diagnosisPrint);
			 * System.out.println("JESSIII^^^^^"+patientModel.getDiagnosis());
			 */

			List<PatientModel> vitalPrint = patientMapper.getVitalPrint(patientModel);
			System.out.println("vital Print.%%%@@@@@@%%%%%%%%%%." + vitalPrint.size());
			mv.addObject("vitalPrint", vitalPrint);
			for (PatientModel X : vitalPrint) {
				System.out.println("====-------======" + X.getVitalName());
				if (X.getVitalName().equals("Weight")) {
					mv.addObject("Weight", X.getVitalValue());
				}
				if (X.getVitalName().equals("BP")) {
					mv.addObject("bp", X.getVitalValue());
				}
				if (X.getVitalName().equals("Temp")) {
					mv.addObject("temp", X.getVitalValue());
				}
				if (X.getVitalName().equals("Pulse")) {
					mv.addObject("pulse", X.getVitalValue());
				}
				if (X.getVitalName().equals("Nutritional Status")) {
					mv.addObject("NutritionalStatuss", X.getVitalValue());
					//System.err.println(X.getVitalValue()+"NUTRITIONALSTATUS");
				}
				if (X.getVitalName().equals("Height")) {
					mv.addObject("Height", X.getVitalValue());
				}
			}

			/*
			 * PatientModel vitalPrint = patientMapper.getVitalPrint(patientModel);
			 * System.out.println("get vital Name SUPPUUUU*****"+vitalPrint.getVitalName());
			 * mv.addObject("vitalPrint", vitalPrint);
			 */

		} catch (Exception exp) { // catch block
			exp.printStackTrace(); // return error in console.
		}

		mv.setViewName(moduleName + "/patientConsultationPrint");

		return mv;
	}
	@RequestMapping(value = "/getPatientPrescriptionnPrint")
	private ModelAndView getPatientPrescriptionnPrint(PatientModel patientModel,
			@RequestParam("patientId") Integer patientId, @RequestParam("apptId") Integer apptId,@RequestParam("visitId") Integer visitId) {
		ModelAndView mv = new ModelAndView();
		System.out.println("patientId....." + patientId);
		System.out.println("visitId,....." + visitId);
		List<PatientModel> mrVisitInvestigationDet = null;
		List<PatientModel> mrVisitDrugDet = null;
		List<PatientModel> mrVisitVitalDet = null;
try {
				mrVisitVitalDet = patientMapper.getPatientVisitVitals(patientModel);
					mv.addObject("mrVisitVitalDet", mrVisitVitalDet);
		
			
			PatientModel consultPrint = patientMapper.getconsultPrint(patientModel);
			// System.out.println("SUPPUUUU*****"+consultPrint.getPntId());
			mv.addObject("consultPrint", consultPrint);
			System.out.println(consultPrint.getPatientId());
			System.out.println(consultPrint.getApptId());
			
 			
 			/*if (mrVisitInvestigationDet.size() == 0) {
 				patientModel.setVisitInvStat("0");
 			} else {
 				patientModel.setVisitInvStat("1");
 			}*/


			List<PatientModel> vitalPrint = patientMapper.getVitalPrint(patientModel);
			System.out.println("vital Print.%%%@@@@@@%%%%%%%%%%." + vitalPrint.size());
			mv.addObject("vitalPrint", vitalPrint);
			for (PatientModel X : vitalPrint) {
				System.out.println("====-------======" + X.getVitalName());
				if (X.getVitalName().equals("Weight")) {
					mv.addObject("Weight", X.getVitalValue());
					System.out.println("X.getVitalValue()"+X.getVitalValue());
				}
				if (X.getVitalName().equals("BP")) {
					mv.addObject("bp", X.getVitalValue());
				}
				if (X.getVitalName().equals("Temp")) {
					mv.addObject("temp", X.getVitalValue());
				}
				if (X.getVitalName().equals("Pulse")) {
					mv.addObject("pulse", X.getVitalValue());
				}
				if (X.getVitalName().equals("Nutritional Status")) {
					mv.addObject("NutritionalStatuss", X.getVitalValue());
					//System.err.println(X.getVitalValue()+"NUTRITIONALSTATUS");
				}
				if (X.getVitalName().equals("Height")) {
					mv.addObject("Height", X.getVitalValue());
				}
			}

		
		} catch (Exception exp) { // catch block
			exp.printStackTrace(); // return error in console.
		}

		mv.setViewName(moduleName + "/patientPrescriptionPrint");

		return mv;
	}
	@RequestMapping(value = "/getBarcodeNumber", method = RequestMethod.GET)
	@ResponseBody
	public String getBarcodeNumber(PatientModel patientModel, HttpSession session) {
		String response = null;

		try {

			System.out.println("apptId....." + patientModel.getApptId());

			String barcodeNumber = patientMapper.getBarCodeNumber(patientModel);
			System.out.println("====barcode====" + barcodeNumber);

			if (barcodeNumber == null) {
				System.out.println("=======in if==========");
				String barCodeGen = patientMapper.getGenerateUmrNum(patientModel);

				System.out.println(barCodeGen + "======ammmmmmm==========" + "A" + patientModel.getApptId() + "A");
				barcodeNumber = "A" + patientModel.getApptId() + "A";

				patientModel.setBarcodeNumber(barcodeNumber);
				patientMapper.getUpdateBarCodeNumber(patientModel);
				// patientMapper.getUpdateUmrNum(patientModel);

			} else {
				System.out.println("=======in else==========");
			}
			System.out.println("========if end=========" + barcodeNumber);

			response = barcodeNumber;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return response;
	}

	
	 @RequestMapping(value = "/getPatientConsultantValiity", method = RequestMethod.GET)
	   	@ResponseBody
	   	public String getPatientConsultantValiity(PatientModel patientModel, HttpSession session) {
	   		String response = null;
	   
	   		try {
	   			
	   			System.out.println("apptId....."+patientModel.getApptId());
	  
	   			String validity=patientMapper.getPatConsultantValidity(patientModel);
	   			
	   			
	   				response =validity;
	   			

	   		} catch (Exception e) {
	   			e.printStackTrace();
	   		}

	   		return response;
	   	}
	 
	 @RequestMapping(value = "/getCustomerDetails",method = RequestMethod.GET)
	   public ModelAndView getCustomerDetails(HttpServletRequest request) {
	     
	     ModelAndView mav = new ModelAndView();
	     mav.setViewName(common + "/jsonData");
	 	    
	     List<JSONObject> customer = new LinkedList<JSONObject>();
	     JSONObject jsonCustomerList = new JSONObject();
	     JSONObject jsonCustomer = null;
	 	    
	     List<LabBillingModel> customerList = null;
	 	    
	     try {
	       customerList = patientMapper.getCustomerDetails();
	       //System.out.println("customer list **........size...." + customerList);
	 	      
	       for (LabBillingModel customerDetails: customerList) {
	         jsonCustomer = new JSONObject();
	         jsonCustomer.put("customerId", customerDetails.getCustomerId());
	         jsonCustomer.put("customerName", customerDetails.getCustomerName());
	         jsonCustomer.put("customerAge", customerDetails.getPatAge());
	         jsonCustomer.put("customerGender", customerDetails.getPatGender());
	         jsonCustomer.put("mobNum", customerDetails.getCustomerMobNum());
	         jsonCustomer.put("customerEmail", customerDetails.getPatEmail());
	         jsonCustomer.put("customerCode", customerDetails.getCustomerCode());
	         jsonCustomer.put("doctorName", customerDetails.getDoctorName());
	         jsonCustomer.put("doctorNameId", customerDetails.getDoctorNameId());
	         jsonCustomer.put("refDoctorName", customerDetails.getRefDoctorName());
	         jsonCustomer.put("refDoctorNameId", customerDetails.getRefDoctorNameId());
	         jsonCustomer.put("ageMonths", customerDetails.getAgeMonths());
	         jsonCustomer.put("ageDays", customerDetails.getAgeDays());
	         jsonCustomer.put("patientTitle", customerDetails.getPatientTitle());
	         customer.add(jsonCustomer);
	       }
	       jsonCustomerList.put("customers", customer);
	       
	     } catch (Exception e) { 
	       e.printStackTrace();
	     }
	     //  System.out.println("batchList........size...." + customerList.size());
	 	request.setAttribute("jsonData", jsonCustomerList);
	 	return mav;
	   }
	 
	 @RequestMapping(value = "/getDeptInvList", method = RequestMethod.GET)
	  public ModelAndView getDeptInvList(PatientModel PatientModel) {
	    ModelAndView mv = new ModelAndView();
	    System.out.println("deptId.............bunga............="+PatientModel.getDeptId());
	    try {
	    	 
	    	System.out.println(PatientModel.getTarrifId());
	 	   List<PatientModel> labInvList= patientMapper.getDeptInvList(PatientModel);
	 	   System.out.println("labInvList size="+labInvList.size());
	 	  
	 		mv.addObject("labInvList", labInvList);
	 	   
	        
	    } catch (Exception exp) {
	      exp.printStackTrace();
	    }
	    
	    mv.setViewName("/" + moduleName + "/opBillInter");
	    return mv;
	  }
	 
	  @RequestMapping(value="/insertHospitalSerDetails")
	  @ResponseBody
	  public String insertHospitalSerDetails(LabBillingModel labBillModel, HttpSession session,SampleCollectionModel sampCollectionModel) {

		    String outputResult = "0";
		    Integer packVal = null;
		    System.out.println("In insertLabBillDetails().........PatRegCon...................................");
		    System.out.println("MANI........................"+sampCollectionModel.getCardType());
		    try {
		    	LabBillingModel labModel = new LabBillingModel();

		      String userName = (String) session.getAttribute("userName");
		      labBillModel.setAddedBy(userName);

		      String userIp = (String) session.getAttribute("userIp");
		      labBillModel.setAddedIp(userIp);
		      //System.out.println("phar bal amt.." + labBillModel.getPharBalAmt());
		      if (Float.parseFloat(labBillModel.getLabBalAmt()) > 0) {
		        labBillModel.setBillStatus("Pending");
		        //System.out.println("pend bill status..");
		      } else {
		        labBillModel.setBillStatus("Paid");
		        ////System.out.println("paid bill status..");
		      }
		      //System.out.println("bill status.." + labBillModel.getBillStatus());
		      System.out.println("cust id..."+ labBillModel.getCustomerId());
		    
		      try {
		      	if (labBillModel.getCustomerId() == 0) {
		         /* System.out.println("in new customer name.." + labBillModel.getCustomerName() + "..age.." + labBillModel.getPatAge()
				    + "..gender.." + labBillModel.getPatGender() + "..mob.." + labBillModel.getCustomerMobNum()
				    + "..doc.." + labBillModel.getDoctorId() + "..ref doc id.." + labBillModel.getRefByDrId());
			    	*/
		          if (!(labBillModel.getRefByDrId() == 0)) {
		             labBillModel.setDoctorId(String.valueOf(labBillModel.getRefByDrId()));
		          }
		          
		          patientMapper.callCustomerRegister(labBillModel);
		         
				
				    	
		       	} else {
		       		
		  		  labBillModel.setPatId(labBillModel.getCustomerId());
		  		  
		       	}
		  		  
		      	
		      	labBillModel.setOrgId(labBillModel.getPatOrgId());
		      	
		        patientMapper.insertLabBillingDetails(labBillModel);
		        
		        System.err.println("billId $$$$$$$$$$$$$$$$$$$$$$$$$$$ Sandhyaaaaaaaaaaa"+labBillModel.getBillId());
		        
		        System.err.println("organization Id___________________"+labBillModel.getOrgId());
		        
			
	      
		        
		        System.out.println("bill id.." + labBillModel.getBillId());
		       	
				if (labBillModel.getBillId() != 0) {
				
				  System.out.println("in bill details..bill id.." + labBillModel.getBillId()+" -- and deptId is...."+labBillModel.getDeptId());
				  
				  
				  try {
					System.out.println("length.." + labBillModel.getLabInvestigationIds().length);
					  
				    for (int i = 0; i < labBillModel.getLabInvestigationIds().length; i++) {
					  /*System.out.println(labBillModel.getDiscPercents()[i]+"......."+labBillModel.getLabInvestigationIds()[i] 
							  + "...presc id.." + labBillModel.getLabPrescIds()[i]);*/
					 	      
				    	System.out.println("pack id...." + labBillModel.getLabInvestigationIds()[i]);
				    	
					  labBillModel.setServiceId(labBillModel.getLabInvestigationIds()[i]);
				      labBillModel.setInvestigationId(labBillModel.getLabInvestigationIds()[i]);
				      System.out.println(labBillModel.getServiceId()+"=============="+labBillModel.getInvestigationId());
				      labBillModel.setQty(labBillModel.getQtys()[i]);
				     // labBillModel.setPackId(labBillModel.getPackIds()[i]);
				      labBillModel.setCharge(labBillModel.getLabCharges()[i]);
				      labBillModel.setTarrifId(labBillModel.getTarrifIds()[i]);
				      //labBillModel.setDiscPercent(labBillModel.getDiscPercents()[i]);
				     // labBillModel.setDiscAmt(labBillModel.getDiscAmts()[i]);
				      //labBillModel.setDocPercent(labBillModel.getDocPercents()[i]);
				      //labBillModel.setPrescId(labBillModel.getLabPrescIds()[i]);
				      //labBillModel.setDeptId(labBillModel.getLabDeptIds()[i]);
				    //  labBillModel.setFinalDiscAmt(labBillModel.getFinalDiscAmts()[i]);

				    try {
						if (labBillModel.getPackIds()[i] != null && labBillModel.getPackIds()[i] != 0) {
							labBillModel.setPackId(labBillModel.getPackIds()[i]);
						}
					} catch (ArrayIndexOutOfBoundsException e) {
						e.printStackTrace();
					}
				    
				 /* try {
						if (labBillModel.getDiscAmts()[i] != null && labBillModel.getDiscAmts()[i]!= "") {
							labBillModel.setDiscAmt(labBillModel.getDiscAmts()[i]);
						}
					} catch (ArrayIndexOutOfBoundsException e) {
						e.printStackTrace();
					} */    
				
				  
				    patientMapper.insertLabBillingLogDetailsOp(labBillModel);
				  labBillModel.setServiceId(labBillModel.getLabInvestigationIds()[i]);
				      //System.out.println("service id..." + labBillModel.getServiceId());
				      
				 		    }
				    
				    
				    
		        
				  } catch (Exception e) {
					 
					patientMapper.deleteLabBills(labBillModel);
					  
				    e.printStackTrace();
				  }
				  
				}
				

				 System.out.println("cardType........................"+sampCollectionModel.getCardTypes().length);
				 System.out.println("amounts........................"+sampCollectionModel.getCashAmnts().length);
	          try {
				for (int i = 0; i < sampCollectionModel.getCashAmnts().length; i++) {
				//	 System.out.println("sampCollectionModel.getOneCashPt()......aaa.."+sampCollectionModel.getOneCashPt()[i]);
					System.err.println("^^^^^^^^^^^^^^^^^Amount^^^^^^^^^" + sampCollectionModel.getCashAmnts()[i]);
					if (sampCollectionModel.getCashAmnts()[i] != "" && !(sampCollectionModel.getCashAmnts()[i].isEmpty())
							&& sampCollectionModel.getCashAmnts()[i] != null
							&& !(sampCollectionModel.getCashAmnts()[i].equals("0.00"))
							&& !(sampCollectionModel.getCashAmnts()[i].equals("0"))) {

						
						
						
						sampCollectionModel.setPbillId(labBillModel.getBillId());
						
						System.out.println("bill id-------SANDHYA Sravani-------111-------"+sampCollectionModel.getPbillId());
						System.out.println("bill id-------SANDHYA Sravani-------222-------"+sampCollectionModel.getBillId());
						
						
							try {
								if (sampCollectionModel.getCashAmnts()[i] != null && sampCollectionModel.getCashAmnts()[i] != "") {

									sampCollectionModel.setCashAmnt(sampCollectionModel.getCashAmnts()[i]);
								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
							
							try {
								if (sampCollectionModel.getPaymentTypes()[i] != null && sampCollectionModel.getPaymentTypes()[i] != "") {

									sampCollectionModel.setPaymentType(sampCollectionModel.getPaymentTypes()[i]);

								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
							
							
							try {
								if (sampCollectionModel.getCardTypes()[i] != null && sampCollectionModel.getCardTypes()[i] != "") {

									sampCollectionModel.setCardType(sampCollectionModel.getCardTypes()[i]);

								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
							
							
							try {
								if (sampCollectionModel.getTransactioNos()[i] != null && sampCollectionModel.getTransactioNos()[i] != "") {

									sampCollectionModel.setTransactioNo(sampCollectionModel.getTransactioNos()[i]);

								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
							
						
							try {
								if (sampCollectionModel.getExpiryDts()[i] != null && sampCollectionModel.getExpiryDts()[i] != "") {

									sampCollectionModel.setExpiryDt(sampCollectionModel.getExpiryDts()[i]);

								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
									
							
							try {
								if (sampCollectionModel.getNewBankNames()[i] != null && sampCollectionModel.getNewBankNames()[i] != "") {

								    sampCollectionModel.setBankName(sampCollectionModel.getNewBankNames()[i]);

								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
									
					
							
							

							try {
								if (sampCollectionModel.getChequeDts()[i] != null && sampCollectionModel.getChequeDts()[i] != "") {

								    sampCollectionModel.setChequeDt(sampCollectionModel.getChequeDts()[i]);

								
								}
							} catch (ArrayIndexOutOfBoundsException e) {
								e.printStackTrace();
							}
								
							
						System.err.println("IN FOR LOOP");
						

						if (!(sampCollectionModel.getCashAmnts().equals(0.00))) {
							System.out.println("...IN IF SANDHYA...");
							patientMapper.insertServicePayment(sampCollectionModel);

						} else {
							System.err.println("...IN ELSE Sandhya....");

						}

						

					}
					

					
				}
	          }catch(Exception e){
	        	  e.printStackTrace();
	          }
		
	        
				
				
				
		      
				outputResult = "1" + "^" + labBillModel.getBillId() + "^" + labBillModel.getBillNum() + "^" + labBillModel.getPatId();

		      } catch (Exception e) {
		        e.printStackTrace();	
		      }
		      
		    } catch (Exception e) {
		      e.printStackTrace();	
		    }
		    
		    return outputResult;
		  }
		  
	  
	  
	  @RequestMapping(value = "/getInvsLists", method = RequestMethod.GET)
	  public ModelAndView getInvsList(LabBillingModel labBillModel) {
	    ModelAndView mv = new ModelAndView();
	    
	    System.out.println("fromDt.."+labBillModel.getFromDt() +".....toDt......"+
	            labBillModel.getToDt()+".....deptName..."+labBillModel.getDeptName());
	   
	    try {
	   
	    System.out.println("fromDt.."+labBillModel.getFromDt() +".....toDt......"+
	            labBillModel.getToDt()+".....deptName..."+labBillModel.getDeptName());
	    
	 	   List<LabBillingModel> invList= patientMapper.getInvsList(labBillModel);
	 	   System.out.println("invList size.............="+invList.size());
	 	   mv.addObject("invList",invList);
	 	   
	 	 /* List<LabBillingModel> labRadList= patientMapper.getRadiologySubList(labBillModel);
		   System.out.println("labRadList size.............="+labRadList.size());
		   mv.addObject("labRadList",labRadList);*/
	 	   
	        
	    } catch (Exception exp) {
	      exp.printStackTrace();
	    }
	    
	    mv.setViewName("/" + moduleName + "/deptBillsInter");
	    return mv;
	  }

	  @RequestMapping(value = "/getOpServices", method = RequestMethod.GET)
	  @ResponseBody
	  public ModelAndView getOpServices(PatientModel PatientModel) {
	    ModelAndView mv = new ModelAndView();
	    String serviceCode=null;
	  //  System.out.println("patname="+PatientModel.getPatientName());
	    try {
	    	
	    	serviceCode = (String) patientMapper.getOpServiceCode();
	         mv.addObject("serviceCode",serviceCode);
	    	
	         
	     
	         List<PatientModel> labDeptList = patientMapper.getOpServDepartments();
	         mv.addObject("labDeptList", labDeptList);
	         
	         List<PatientModel> getOpServlist = patientMapper.getOpServlist(PatientModel);
	         mv.addObject("opServiceList", getOpServlist);
	         
	         List<PatientModel> tarrifLabList = patientMapper.getTarrifName(PatientModel);
	         System.out.println("tarrifLabList------" +tarrifLabList.size());
	         mv.addObject("tarrifLabList", tarrifLabList);
	         
	    	
	    } catch (Exception exp) {
	      exp.printStackTrace();
	    }
	    
	    mv.setViewName("/" + moduleName + "/opServicesSetup");
	    return mv;
	  }
	  
	  @RequestMapping(value = "/setServiceDetails", method = RequestMethod.POST)
	  @ResponseBody
	  private String setServiceDetails(HttpSession session,PatientModel patientModel,LabBillingModel labBillModel) {
	    String outputResult = "0";
	  
	    try {
	    	String userName = (String) session.getAttribute("userName");
	    	patientModel.setAddedBy(userName);

		     String userIp = (String) session.getAttribute("userIp");
		     patientModel.setAddedIp(userIp);
	    	
		     patientMapper.setOpServiceDetails(patientModel);
			 
		     patientMapper.setOpServiceCode(patientModel);
		//	 patientMapper.SetOpServiceInv(patientModel);
			 System.out.println("OP Investigation id .......####......."+patientModel.getOpInvservId());
			 if (patientModel.getOpInvservId() != 0) {
			        
				 outputResult = "1" + "^" + patientModel.getOpInvservId();
			      } else {
			        outputResult = "0";
			      }
	    }
	    catch (Exception exp) {
	        exp.printStackTrace();
	      }

	      return outputResult;
	    }

	  
	  @RequestMapping(value = "/getBillPrintinJasper", method = RequestMethod.GET)
		public ModelAndView getBillPrintinJasper(ModelAndView modelAndView, LabBillingModel labBillModel,
				@RequestParam("billId") Integer billId) {
		  labBillModel.setBillId(billId);
			System.err.println("ScoreId ipCsId-----> " + labBillModel.getBillId());
			JRDataSource patDataSource = dataprovider.getPatBillPrint(labBillModel);
			JRDataSource patSubDatasource = dataprovider.getPatBillSubPrint(labBillModel);
			System.out.println("dataSource=" + patDataSource);
			//System.out.println("pharmSubDatasource=" + patSubDatasource);
			Map<String, Object> parameterMap = new HashMap<String, Object>();
			parameterMap.put("patSubDatasource", patDataSource);
			parameterMap.put("datasource", patSubDatasource);
			modelAndView = new ModelAndView("patReport", parameterMap);
			// modelAndView.addObject("PharmacyPrint", parameterMap);
			return modelAndView;
		}
	  
	  
	  
	  //kept by habib
	  
		 @RequestMapping(value = "/gettarifs", method = RequestMethod.GET)
			@ResponseBody
			public String gettarifs(PatientModel patientModel, HttpSession session) {
			
				// String id=null;
				 String response = null;
				try {
					PatientModel  tarrif = patientMapper.getopTarifs(patientModel);
					  System.out.println("habi......"+tarrif);
					  response ="1 ^ "+ tarrif.getTariffId();
					
				} catch (Exception e) {
					e.printStackTrace();
				}
				return response;
}
		 
		 
		//habi 
		 @RequestMapping(value = "/viewServiceBillDetails")
			public ModelAndView viewServiceBillDetails(PatientModel patientModel) {
				// System.out.println("in phar bill det.." + salesModel.getBillId());
				ModelAndView mv = new ModelAndView();

				PatientModel billDetails = null;

				List<PatientModel> billServicesList = null;

				try {
					billServicesList = patientMapper.getBillServicesDetailsList(patientModel);
					mv.addObject("billServicesList", billServicesList);

				} catch (Exception e) {
					e.printStackTrace();
				}

				mv.setViewName(moduleName + "/serviceBillDetailsInter");
				return mv;
			}
	  
		 
		 @RequestMapping(value = "/getPatientAmtDetails")
			@ResponseBody
			public String getPatientAmtDetails(PatientModel patientModel, HttpSession session) {
				String output = null;
				PatientModel paymentDtls = null;
				try {
					paymentDtls = patientMapper.getPatientDtls(patientModel);
					System.out.println("Amount Detailssssssssss");
					if (paymentDtls != null)
						output = "1 ^ " + paymentDtls.getTotAmt()+ " ^ " + paymentDtls.getReConAmount()+ " ^ " + 
								paymentDtls.getConsFee()+ " ^ " + paymentDtls.getRegDisAmnt()+" ^ "+paymentDtls.getRegDisPer()
								+ " ^ " + paymentDtls.getConDisAmnt()+" ^ "+paymentDtls.getConDisPer()
								+" ^ "+paymentDtls.getRegFinalAmnt()+" ^ "+paymentDtls.getConFinalAmnt()
								+" ^ "+paymentDtls.getTotalDisAmnt()+" ^ "+paymentDtls.getOpBillAmnt()
								+" ^ "+paymentDtls.getAmountReceived()+" ^ "+paymentDtls.getChangeGiven()
								+" ^ "+paymentDtls.getBalance() +" ^ " +paymentDtls.getTotDiscountAmt()
								+" ^ " +paymentDtls.getStatus();
					else
						output = "0";
				} catch (Exception e) {
					e.printStackTrace();
				}
				return output;

			}
	  
	  
	  
	//sandhya 
		 
		 @RequestMapping(value = "/viewPaymentDetails")
			@ResponseBody
			public String viewPaymentDetails(PatientModel patientModel) {
				System.out.println("in hospital services bill det.." + patientModel.getBillId());
				
				 String response = null;
				

				try {
		   
					//System.out.println("amount ..........****.................");
					System.out.println("......BILL ID INSERT SANDHYA........."+patientModel.getBillId());
					PatientModel payDetailsList = patientMapper.getBillPaymentsList(patientModel);
				//	System.out.println(" investigationList size is..." + payDetailsList.size());

					
					response = "1 ^ " + payDetailsList.getAmount() +" ^ " + payDetailsList.getPaymentType()
					+" ^ " +payDetailsList.getTransNum() +" ^ " + payDetailsList.getExpiryDt() +" ^ " + payDetailsList.getCheckDt();
					
					System.out.println("cardnumber response..........................."+response);
					System.out.println("transNum ..........................."+payDetailsList.getTransNum());
					System.out.println("cardnumber ..........................."+payDetailsList.getCardNumber());

				} catch (Exception e) {
					e.printStackTrace();
				}

				
				return response;
			}
		 
		 
		 //sandhya
		 
			
			//Delete functionality in  Individual Investigation profile setup
			

			@RequestMapping(value = "/deleteServices", method = RequestMethod.GET)
			  @ResponseBody
			private String deleteServices(PatientModel patientModel, HttpSession session) {

			    String outputResult = null;
			    String deleteInvProfDetaID="0";
			    try {

			      String userName = (String) session.getAttribute("userName");
			      patientModel.setModifiedBy(userName);

			      String userIp = (String) session.getAttribute("userIp");
			      patientModel.setModifiedIp(userIp);
			      
				   System.out.println("bill Details idddddd ========SANDHYA================="+patientModel.getBillDetId());
				   System.out.println("service Id ===========SANDHYA================="+patientModel.getServiceIdNew());

			       deleteInvProfDetaID = patientMapper.deleteInvProfDetaID(patientModel);
			       
			      if (deleteInvProfDetaID == "1") {
			    	 

			        outputResult = "1";
					   System.out.println(outputResult);

			    	  
			      } else {
					   System.out.println(outputResult);
 
			      }
			    } catch (Exception exp) {
			      exp.printStackTrace();
			   
			    }

			    return outputResult;
			  }
			
	 //sandhya
			 
			 @RequestMapping(value = "/viewPaymentSerDetails")
				@ResponseBody
				public String viewPaymentSerDetails(PatientModel patientModel) {
					System.out.println("in hospital services bill det.." + patientModel.getBillId());
					
					 String response = null;
					

					try {
			   
						System.out.println("......BILL ID INSERT SANDHYA........."+patientModel.getBillId());
						PatientModel payDetailsList = patientMapper.getBillPaymentsList(patientModel);

						response = "1"+" ^ " + payDetailsList.getAmount() +" ^ " + payDetailsList.getPayTypeName()
						+" ^ " +payDetailsList.getTransNumber() +" ^ " + payDetailsList.getExpDates() 
						+" ^ " + payDetailsList.getCreditNos() +" ^ " + payDetailsList.getCardTypes() 
						+" ^ " + payDetailsList.getBankNameMn() +" ^ "+ payDetailsList.getBankNames();
						
			
						
						
						System.out.println("response.........sandhya................."+response);
						System.err.println("paymentTypeeee .............sandhya.............."+payDetailsList.getPayTypeName());
						System.out.println("Amont .............sandhya.............."+payDetailsList.getAmount());
						System.err.println("trans number .......sandhya...................."+payDetailsList.getTransNumber());
						System.out.println("expiry date ...........sandhya................"+payDetailsList.getExpDates());
						System.err.println("cardNumber ...........sandhya................"+payDetailsList.getCreditNos());
						System.err.println("cardType ...........Rajareddy................"+payDetailsList.getCardTypes());
						System.err.println("MobNumber ...........Rajareddy................"+payDetailsList.getBankNameMn());
						System.err.println("Bank name ...........sandhya................"+payDetailsList.getBankNames());



					} catch (Exception e) {
						e.printStackTrace();
					}

					
					return response;
				}
			 
			 @RequestMapping(value = "/getPatientDetailsSer", method = RequestMethod.GET)
				public ModelAndView getPatientDetails(PatientModel PatientModel) {
					ModelAndView mv = new ModelAndView();
					System.out.println("patname=" + PatientModel.getPatientName());
					try {
						String likeName = '%' + PatientModel.getPatientName() + '%';
						PatientModel.setPatientName(likeName);

						String likeNum = '%' + PatientModel.getMobNum() + '%';
						PatientModel.setMobNum(likeNum);

						String likeUmr = '%' + PatientModel.getUmrNo() + '%';
						PatientModel.setUmrNo(likeUmr);

						System.out.println("patname=" + PatientModel.getPatientName());
						System.out.println("patMobNo=" + PatientModel.getMobNum());
						System.out.println("patUmr=" + PatientModel.getUmrNo());

						List<PatientModel> patdetails = patientMapper.getPatientsDet(PatientModel);
						System.out.println("patdetails size=" + patdetails.size());

						mv.addObject("patientList", patdetails);

					} catch (Exception exp) {
						exp.printStackTrace();
					}

					mv.setViewName("/" + moduleName + "/patientHospServiceInter");
					return mv;
				}
			 
				@RequestMapping(value = "/setPatDetId", method = RequestMethod.GET)
				@ResponseBody
				public String setPatDetById(PatientModel patientModel) {

					String response = null;
					try {
						System.out.println("patientId=" + patientModel.getPatientId());
						PatientModel patdetails = patientMapper.getPatientLists(patientModel);

						response =  patdetails.getPname() + "^"+ patdetails.getGender() + "^" + 
					         patdetails.getMobNum() +"^"+ patdetails.getPatientId() + "^" + patdetails.getAge() +"^" +
								patdetails.getAgeMonths() +"^" + patdetails.getAgeDays() +"^" + patdetails.getPatientCat();

						System.err.println("response....>>=" +patdetails.getEmpName() +"response....>>="+patdetails.getPatientCat());

					} catch (Exception e) {
						e.printStackTrace();
					}

					return response;
				}
			 

				 
				 @RequestMapping(value = "/getManualBill", method = RequestMethod.GET)
				  @ResponseBody
				  public ModelAndView getManualBill(PatientModel PatientModel,PatientQueueModel PatientQueueModel) {
				    ModelAndView mv = new ModelAndView();
						try {
							 List<PatientQueueModel> allPateintDetails = patientMapper.getAllPatients();
							  System.out.println("allPateintDetails" + allPateintDetails.size());
							  mv.addObject("allPateintDetails", allPateintDetails);
							  
							  List<PatientQueueModel>  dateWisePatient= patientMapper.getDateWisePatientList();
								System.out.println("doc list.." + dateWisePatient.size());
								mv.addObject("dateWisePatient", dateWisePatient); 
								
							List<PatientQueueModel>  generatedAmtList= patientMapper.getGeneratedAmtList();
							System.out.println("doc list.." + generatedAmtList.size());
							mv.addObject("generatedAmtList", generatedAmtList);
							
							List<DoctorModel> doctorList = patientMapper.getAvailableDoctors();
							System.out.println("doc list.." + doctorList.size());
							mv.addObject("docList", doctorList);
						} catch (Exception e) {
							e.printStackTrace();
						}
						mv.setViewName(moduleName + "/manualBill");
						return mv;			
						}

				 
				 
					  @RequestMapping(value = "/uploadManulAmount", method = RequestMethod.POST)
					  @ResponseBody
					  private String uploadManulAmtDtls(PatientModel BillModel,HttpSession session) {
		
					    String outputResult = null;
					    
					    try {
			/* Integer dummyBill = patientMapper.getDummyBillId(BillModel); */
					        
					            String userName = (String) session.getAttribute("userName");
					            BillModel.setAddedBy(userName);
					            
					            String userIp = (String) session.getAttribute("userIp");
					              BillModel.setModalPatientId(BillModel.getModalPatientId()); 
							      BillModel.setModalPatUmr(BillModel.getModalPatUmr()); 
							      BillModel.setModalPatName(BillModel.getModalPatName()); 
							      BillModel.setModalPatGender(BillModel.getModalPatGender()); 
							      BillModel.setModalPatMobNo(BillModel.getModalPatMobNo()); 
							      BillModel.setModalPataptId(BillModel.getModalPataptId());

					           int dummyBill=patientMapper.updateManualBill(BillModel);
					            if (dummyBill != 0) {
					                outputResult = "1";
					              } else {
					                outputResult = "0";
					              }
					            
			/* outputResult = "Inserted"; */
					      
					    } catch (Exception exp) {
					        exp.printStackTrace();
					        outputResult = "Error";
					    }
					    return outputResult;
					}
				  
				 
					  
					  
					  
					  @RequestMapping(value = "/updateBills", method = RequestMethod.POST)
					  @ResponseBody
					  public String updateBills(PatientModel BillModel,HttpSession session) {
		                       System.out.println("in update");
					    String response = null;
					    try {
					            String userName = (String) session.getAttribute("userName");
					            BillModel.setAddedBy(userName);
					            
					              String userIp = (String) session.getAttribute("userIp");
					              BillModel.setModalDummyBillId(BillModel.getModalDummyBillId());
					              System.out.println("=dummyBillId===="+BillModel.getDummyBillId());
					            
					              
					              BillModel.setModalPatientId(BillModel.getModalPatientId()); 
							      BillModel.setModalPatUmr(BillModel.getModalPatUmr()); 
							      BillModel.setModalPatName(BillModel.getModalPatName()); 
							      BillModel.setModalPatGender(BillModel.getModalPatGender()); 
							      BillModel.setModalPatMobNo(BillModel.getModalPatMobNo()); 
							      BillModel.setModalPataptId(BillModel.getModalPataptId());
							     int update=patientMapper.viewAndUpdateManualBill(BillModel);
						          //patientMapper.updateManualBill(BillModel);
							      if (update != 0) {
							    	  response = "1";
						              } else {
						            	  response = "0";
						              }
			/* response = "Updated"; */
					        
					    } catch (Exception exp) {
					        exp.printStackTrace();
					        response = "Error";
					    }
					    return response;
					}
				 
					  
					  
					  
					  
					  
					  @RequestMapping(value = "/patDtlsByDoc", method = RequestMethod.GET)
					  @ResponseBody
					  public ModelAndView patDtlsByDoc(PatientQueueModel patientQueueModel) {
						    ModelAndView mv = new ModelAndView();
					      try {
					    	
					          List<PatientQueueModel> patDtlsByDoc = patientMapper.getPatByDoctor(patientQueueModel);
					          System.err.println(" patDtlsByDoc.." + patDtlsByDoc.size());
					          mv.addObject("patDtlsByDoc", patDtlsByDoc);
					         // mv.setViewName("doctorWisePatDtlsView"); 

					      } catch (Exception e) {
					          // Handle exception
					          e.printStackTrace();

					      }
					      mv.setViewName(moduleName + "/manualBillInter");
					      return mv;
					  }
	                   
					  @RequestMapping(value = "/getManualPatOpBillConjasper", method = RequestMethod.GET)
						public ModelAndView getManualPatOpBillConjasper(ModelAndView modelAndView, PatientModel patientModel,
								@RequestParam("modalPataptId") String modalPataptId,@RequestParam("amountReceived") String amountReceived) {
							patientModel.setModalPataptId(modalPataptId);
							patientModel.setAmountReceived(amountReceived);
							System.err.println(patientModel.getAmountReceived());
							System.err.println("ScoreId ipCsId-----> " + patientModel.getPatApptId());
							JRDataSource patDataSource = dataprovider.getManualPatConsultationPrint(patientModel);
							System.out.println("dataSource=" + patDataSource);
							// System.out.println("pharmSubDatasource=" + patSubDatasource);
							Map<String, Object> parameterMap = new HashMap<String, Object>();
							parameterMap.put("patDataSource", patDataSource);
							modelAndView = new ModelAndView("manualPatConBillPrint", parameterMap);
							return modelAndView;
						}
					  
					  
					  @RequestMapping(value = "/getPatCbBillRegjasperNew", method = RequestMethod.GET)
						public ModelAndView getPatCbBillRegjasperNew(ModelAndView modelAndView, ConsultationOpModel consultationOpModel,
								@RequestParam("billId") Integer billId,@RequestParam("patientId") Integer patientId) {
						 
							System.err.println("ScoreId ipCsId-----> " + consultationOpModel.getPatientId());
							System.err.println("ScoreId ggggggggggipCsId-----> " + consultationOpModel.getBillId());

							JRDataSource patSubDatasource = dataprovider.getPatCreditRegPrintNew(consultationOpModel);
							JRDataSource patDataSource = dataprovider.getPatCreditRegpaysubPrintNew(consultationOpModel);
							System.out.println("dataSource=" + patDataSource);
							// System.out.println("pharmSubDatasource=" + patSubDatasource);
							Map<String, Object> parameterMap = new HashMap<String, Object>();
							
							
							parameterMap.put("patDataSource", patSubDatasource);
							parameterMap.put("datasource", patDataSource);
							modelAndView = new ModelAndView("patCredRegBillPrintNew", parameterMap);
							return modelAndView;
						}
					  
					  @RequestMapping(value="/updatePrint")
				      @ResponseBody
					  public String updatePrint(PatientModel patientModel) {  
						  String outputResult = "0";
						  int update=0;
					 	try {
					 	  System.out.println(patientModel.getBillId()+"ammmmmmmmmmmmmm");
					 	 patientMapper.updatePrintId(patientModel);
						 }catch(Exception e) {
					 		e.printStackTrace();
					 	}
					 	 return outputResult;
					  }
					  
					  
					  @RequestMapping(value="/updatePrintReg")
				      @ResponseBody
					  public String updatePrintReg(PatientModel patientModel) {  
						  String outputResult = "0";
						  int update=0;
					 	try {
					 	  System.out.println(patientModel.getBillId()+"hhhhhhhhhhh");
					 	 patientMapper.updatePrintIdReg(patientModel);
						 }catch(Exception e) {
					 		e.printStackTrace();
					 	}
					 	 return outputResult;
					  }
					  
					  @RequestMapping(value="/updatePrintCbReg")
				      @ResponseBody
					  public String updatePrintCbReg(PatientModel patientModel) {  
						  String outputResult = "0";
						  int update=0;
					 	try {
					 	  System.out.println(patientModel.getBillId()+"hhhhhhhhhhh");
					 	 patientMapper.updatePrintIdCbReg(patientModel);
						 }catch(Exception e) {
					 		e.printStackTrace();
					 	}
					 	 return outputResult;
					  }
					  
					  
					  @RequestMapping(value = "/viewPaymentDetailss", method = RequestMethod.GET)
//					  @ResponseBody
					  public ModelAndView viewPaymentDetailss(PatientModel patientModel) {
						    ModelAndView mv = new ModelAndView();
					      try {
					    	  System.err.println("Bill ID received = " + patientModel.getBillId());
					          List<PatientModel> paymentDetails = patientMapper.getPaymentDetails(patientModel);
					          mv.addObject("paymentDetails", paymentDetails);
					          System.out.println(paymentDetails+"paymentDetails...");


					         // mv.setViewName("doctorWisePatDtlsView"); 

					      } catch (Exception e) {
					          // Handle exception
					          e.printStackTrace();
					      }
					      mv.setViewName(moduleName + "/paymentQueBillInter");
					      return mv;
					  }
					  @RequestMapping(value = "/GetPatientVitals", method = RequestMethod.GET)
					  @ResponseBody
					  public ModelAndView GetPatientVitals(PatientModel pntModel) {
						    ModelAndView mv = new ModelAndView();
					      try {
					    	
					          List<PatientModel> vitalsDetails = organizationSettingsMapper.getPatByDoctor(pntModel);
					          System.err.println(" vitalsDetails.." + vitalsDetails.size());
					          mv.addObject("vitalsDetails", vitalsDetails);
					         // mv.setViewName("doctorWisePatDtlsView"); 

					          List<PatientModel> vitalListdeta = patientMapper.getVitalList(pntModel);
					  		mv.addObject("vitalListdeta", vitalListdeta);
					  		System.out.println(vitalListdeta.size()+"aaaaaaa");
					  		
					  		//pntModel.setVitalStatus(pntModel.getVitalStatus());
							//System.out.println("vitalStatus" + pntModel.getVitalStatus());
					      } catch (Exception e) {
					          // Handle exception
					          e.printStackTrace();

					      }
					      mv.setViewName(moduleName + "/vitals");
					      return mv;
					  }
					  
					  @RequestMapping(value = "/GetPatientVitalsIn", method = RequestMethod.GET)
					  @ResponseBody
					  public ModelAndView GetPatientVitalsIn(PatientModel pntModel) {
						    ModelAndView mv = new ModelAndView();
					      try {
					    	
					          List<PatientModel> vitalsDetails = organizationSettingsMapper.getPatByDoctor(pntModel);
					          System.err.println(" vitalsDetails.." + vitalsDetails.size());
					          mv.addObject("vitalsDetails", vitalsDetails);
					         // mv.setViewName("doctorWisePatDtlsView"); 

					          List<PatientModel> vitalListdeta = patientMapper.getVitalList(pntModel);
					  		mv.addObject("vitalListdeta", vitalListdeta);
					  		System.out.println(vitalListdeta.size()+"aaaaaaa");
					  		
					  		//pntModel.setVitalStatus(pntModel.getVitalStatus());
							//System.out.println("vitalStatus" + pntModel.getVitalStatus());
					      } catch (Exception e) {
					          // Handle exception
					          e.printStackTrace();

					      }
					      mv.setViewName(moduleName + "/patientVitalsInter");
					      return mv;
					  }
					  @RequestMapping(value = "/getPatDetOldDataaa", method = RequestMethod.GET)
						public ModelAndView getPatDetOldDataaa(PatientModel PatientModel) {
							ModelAndView mv = new ModelAndView();
							try {
								String likeName = '%' + PatientModel.getPatientName() + '%';
								PatientModel.setPatientName(likeName);

								String likeNum = '%' + PatientModel.getMobNum() + '%';
								PatientModel.setMobNum(likeNum);

								String likeUmr = '%' + PatientModel.getUmrNo() + '%';
								PatientModel.setUmrNo(likeUmr);
								
							
								List<PatientModel> patdetails = patientMapper.getPatientsDetailsOldData(PatientModel);
								mv.addObject("patientList", patdetails);
	                            System.out.println("patientList............."+patdetails.size());
							} catch (Exception exp) {
								exp.printStackTrace();
							}

							mv.setViewName("/" + moduleName + "/patientQueueInter");
							return mv;
						}
					  
					  
	@RequestMapping(value = "/patientBarcode")
	public void patientBarcode(@RequestParam("umrNo") String umrNo, HttpServletResponse response) {

		try {

			BitMatrix bitMatrix = new MultiFormatWriter().encode(umrNo, BarcodeFormat.CODE_128, 350, 100);

			response.setContentType("image/png");

			MatrixToImageWriter.writeToStream(bitMatrix, "PNG", response.getOutputStream());

			response.getOutputStream().flush();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@ResponseBody
	@RequestMapping(value = "/updateBilldetails", method = RequestMethod.POST)
	public String updateBilldetails(FeeModel feeModel,  HttpServletRequest request,
	                         HttpSession session) {

		

		    String outputResult = "0";

		    try {

		        feeModel.setAddedIp(request.getRemoteAddr());

		        String username =
		                SecurityContextHolder.getContext()
		                        .getAuthentication()
		                        .getName();

		        feeModel.setAddedBy(username);

		        System.out.println("Bill ID : " + feeModel.getBillId());
		        System.out.println("Amount Received : " + feeModel.getAmtRecd());

		        if (feeModel.getBillId() != null
		                && feeModel.getBillId() != 0) {

		            patientMapper.updatePendingPayment(feeModel);

		            outputResult = "1^"
		                    + feeModel.getPatientId()
		                    + "^"
		                    + feeModel.getBillId();

		        }

		    } catch (Exception e) {
		        e.printStackTrace();
		        outputResult = "0";
		    }

		    return outputResult;
		}
	@RequestMapping(value = "/updatePendingBillstatus", method = RequestMethod.POST)
	@ResponseBody
	public String updatePendingBillstatus(
	        @ModelAttribute("feeModel") FeeModel feeModel,
	        PatientModel patientModel,
	        HttpServletRequest request,
	        HttpSession session) {

	    System.out.println("Inside Pending Bill update");

	    feeModel.setModifiedIp(request.getRemoteAddr());

	    String username = SecurityContextHolder.getContext()
	            .getAuthentication()
	            .getName();

	    feeModel.setModifiedBy(username);

	    try {

	        String billId = request.getParameter("feeModel.billId");
	        String billAmt = request.getParameter("feeModel.billAmt");
	        String amtRecd = request.getParameter("feeModel.amtRecd");
	        String billStatus = request.getParameter("feeModel.billStatus");

	        feeModel.setBillId(Integer.parseInt(billId));
	        feeModel.setBillAmt(billAmt);
	        feeModel.setAmtRecd(amtRecd);
	        feeModel.setBillStatus(billStatus);

	       
	        patientModel.setFeeModel(feeModel);
	        patientModel.setPbillId(feeModel.getBillId());
	        patientModel.setRegAmount(feeModel.getRegAmount());
	        patientModel.setConsAmount(feeModel.getConsAmount());
	        patientModel.setAddedBy(feeModel.getModifiedBy());
	        patientModel.setAddedIp(feeModel.getModifiedIp());

	        int updatedRows = patientMapper.updatePendingPayment(feeModel);

	        System.out.println("Updated Rows = " + updatedRows);

	   if (updatedRows > 0) {

	            session.setAttribute("opBillId", feeModel.getBillId());
	            session.setAttribute("recptNo", "");

	           
	   if ("paid".equalsIgnoreCase(feeModel.getBillStatus())) {


	             
	 System.out.println("CreditPts = " + patientModel.getCreditPts());

	  if (patientModel.getCreditPts() != null) {
    System.out.println("CreditPts length = "+ patientModel.getCreditPts().length);
	        } else {
	     System.out.println("CreditPts is NULL");
	                }

	  if (patientModel.getCreditPts() != null) {

	  for (int i = 0; i < patientModel.getCreditPts().length; i++) {

	     System.out.println("patientModel.getCreditPts()...AMMM.......maniiiiiii..2....");

	                        try {

	   patientModel.setCreditPt(patientModel.getCreditPts()[i]);
	   patientModel.setAmount(patientModel.getCreditAmounts()[i]);

	    System.out.println(patientModel.getAmount()+ " patientModel.getAmount()....Maniiii....");

	    System.out.println("in getCreditPt Cash @@@@@@@@@@@@@@@@@@@@"+ patientModel.getCreditPt());

	     String billIdCheck =patientMapper.getPayModeBillNumber(patientModel);
	                          
	  if (patientModel.getAmount() != null && !patientModel.getAmount().isEmpty()
	   && Float.parseFloat(patientModel.getAmount()) > 0) {

	 System.out.println("in bill Cash @@@@@@@@@@@@@@@@@@@@"+ patientModel.getCreditPt());

	     int creditPts = Integer.parseInt(patientModel.getCreditPt());

	                               
	   if (creditPts == 275) {

	  System.out.println("275555555");

	  patientModel.setCreditPt(patientModel.getCreditPts()[i]);

	  patientModel.setAmount(patientModel.getCreditAmounts()[i]);

	 List<CorpRegistrationModel> paymentLists =patientMapper.getPayModeBillNumberReci(patientModel);

	 System.out.println("patientLists..AMM... id" + paymentLists.size());

	if (paymentLists.size() == 0) {

if (billIdCheck == null) {
float subRegCash = Float.parseFloat( patientModel.getAmount())- (patientModel.getRegAmount() == null ? 0: Float.parseFloat(patientModel.getRegAmount()));

                 System.out.println("subRegCash = " + subRegCash);

                  patientModel.setAmountss( Float.toString(subRegCash));

                   patientMapper.insertRegistrationAppend( patientModel);

                    patientMapper.insertchequeTypeAppend(patientModel);

                     } else {

              System.out.println("Entering else block...");
                      patientMapper.insertchequeTypeAppend(patientModel);
	                                        }

	                      } else {

	           if (billIdCheck == null) {

	        System.out.println(  patientModel.getAmount()+ " patientModel.getAmount(276666)....Maniiii....");

	      float subRegCash =  Float.parseFloat( patientModel.getAmount());

	 patientModel.setAmountss( Float.toString(subRegCash));

	   patientMapper.insertRegistrationAppend(patientModel);

 patientMapper.insertchequeTypeAppend( patientModel);

	       } else {
	    	   System.out.println( "Entering else block...");

	        float subRegCash =  Float.parseFloat(  patientModel.getAmount());

	      patientModel.setAmountss(  Float.toString(subRegCash));

 patientMapper.insertchequeTypeAppend(patientModel);
	                                        }
	                                    }
	                                }

	                              

	         if (creditPts == 276) {

	       System.out.println("276666666");

	        try 
	        {
	        	patientModel.setCreditPt(patientModel.getCreditPts()[i]);

	            patientModel.setAmount( patientModel.getCreditAmounts()[i]);

	            patientModel.setCardTypes(  patientModel.getCardcardTypes()[i]);

	             patientModel.setCreditNos(  patientModel.getCreditNoss()[i]);

	            patientModel.setCardBankName(patientModel.getCardBankNamess()[i]);

	             patientModel.setExpDates(  patientModel.getCreditDates()[i]);

	                                    } catch (ArrayIndexOutOfBoundsException e) {

	                                        e.printStackTrace();
	                                    }

	    List<CorpRegistrationModel> paymentListsCard =  patientMapper.getPayModeBillNumberReci(patientModel);

	       System.out.println("patientLists..AMM... id" + paymentListsCard.size());

	         if (paymentListsCard.size() == 0) {

	          System.out.println( "...........AMM...........");

	           if (billIdCheck == null) {

	           System.out.println( patientModel.getAmount() + " patientModel.getAmount(276666)....Maniiii....");

	                float regAmount = 0;

	         if (patientModel.getRegAmount() != null && !patientModel.getRegAmount().isEmpty()) {

	          regAmount = Float.parseFloat(  patientModel.getRegAmount());
	                                            }

	         float subRegCash =  Float.parseFloat( patientModel.getAmount()) - regAmount;

	       patientModel.setAmountss(Float.toString(subRegCash));

	        patientMapper.insertRegistrationAppend(patientModel);

	     patientMapper.insertCardTypeAppend( patientModel);

	           }else {

	       System.out.println("Entering else block...");

	      patientMapper.insertCardTypeAppend(patientModel);
	                                        }

	      } else {

	    if (billIdCheck == null) {

	       System.out.println(  patientModel.getAmount()+ " patientModel.getAmount(276666)....Maniiii....");

	        float subRegCash =Float.parseFloat(  patientModel.getAmount());

	      patientModel.setAmountss( Float.toString(subRegCash));

	      patientMapper.insertRegistrationAppend(patientModel);

	       patientMapper.insertCardTypeAppend( patientModel);

	         } else {


	     float subRegCash =Float.parseFloat( patientModel.getAmount());

	    patientModel.setAmountss(Float.toString(subRegCash));

	      patientMapper.insertCardTypeAppend(patientModel);
	                                        }
	                                    }
	                                }

	                               

	     if (creditPts == 277) {

	   System.out.println("27777777777");

	    patientModel.setCreditPt( patientModel.getCreditPts()[i]);

	    patientModel.setAmount( patientModel.getCreditAmounts()[i]);

	     try {
	        patientModel.setTransNos(patientModel.getCreditNoss()[i]);

	        System.out.println( patientModel.getTransNos()+ " patientModel transc nooooooo");

	                                    } catch (ArrayIndexOutOfBoundsException e) {

	                                        e.printStackTrace();
	                                    }

	  List<CorpRegistrationModel> paymentListsUpi = patientMapper.getPayModeBillNumberReci( patientModel);

	      System.out.println("patientLists..AMM... id" + paymentListsUpi.size());

	     if (paymentListsUpi.size() == 0) {

	        System.out.println( "...........AMM...........");

	      if (billIdCheck == null) {

	      System.out.println(patientModel.getAmount()+ " patientModel.getAmount(2777777)....Maniiii....");

	       float subRegCash =Float.parseFloat(patientModel.getAmount())- Float.parseFloat(
	             patientModel.getRegAmount());

	      patientModel.setAmountss( Float.toString(subRegCash));

	      patientMapper.insertRegistrationAppend(patientModel);

	      patientMapper.insertchequeTypeUpii(patientModel);

	           } else {

	        System.out.println(  "Entering else block...");

	     patientMapper.insertchequeTypeUpii( patientModel);
	                                        }

	                                    } else {

	    if (billIdCheck == null) {

	      System.out.println( patientModel.getAmount()
	              + " patientModel.getAmount(2777777)....Maniiii....");

	          float subRegCash =
	         Float.parseFloat( patientModel.getAmount());

	       patientModel.setAmountss(  Float.toString(subRegCash));

	       patientMapper.insertchequeTypeUpii(patientModel);

	     } else {


	  float subRegCash =
	    Float.parseFloat( patientModel.getAmount());

	    patientModel.setAmountss( Float.toString(subRegCash));

	  System.out.println(  "Entering else block...");

	 patientMapper.insertchequeTypeUpii(patientModel);
	                                        }
	                                    }
	                                }

	                            } else {

	                                System.out.println(
	                                        "Amount is less than or equal to zero.");
	                            }

	                        } catch (Exception e) {

	                            e.printStackTrace();
	                        }
	                    }
	                }


	             

	   if (patientModel.getApptModel() != null) {

	   patientModel.setEmpId(patientModel.getApptModel().getEmpId());

	 String regServId =patientMapper.getRegServiceId(patientModel);

	patientModel.setServiceIdReg(regServId);

	  System.out.println(  "***********AMMM*****************" + patientModel.getPntCat());

	 System.out.println( "***********MAAA*****************" + patientModel.getEmpId());

	  String conServId =patientMapper.getconServiceId(patientModel);

	   System.out.println( "****************************"+ conServId);

	   patientModel.setServiceIdCon(conServId);
	                }

 if (patientModel.getCashPt() != null && patientModel.getAmounts() != null) {

	 for (int i = 0; i < patientModel.getCashPt().length;i++) {

	   String amount = patientModel.getAmounts()[i];

	   System.err.println("^^^^^^^^^^^^^^^^^Amount^^^^^^^^^"+ amount);

	    if (amount != null&& !amount.isEmpty() && !amount.equals("0.00") && !amount.equals("0")) {

	      patientModel.setPbillId(patientModel.getFeeModel().getBillId());

	  System.err.println( "inifBillId............." + patientModel.getPbillId());

	  patientModel.setCashPts(patientModel.getCashPt()[i]);

	  patientModel.setAmountss(amount);	                            
	  patientModel.setTransNos( patientModel.getTransNo()[i]);

	   patientModel.setBankNames( patientModel.getBankName()[i]);

	     patientModel.setChequeDates(patientModel.getChequeDate()[i]);

	     patientModel.setCreditNos(patientModel.getCreditNo()[i]);

	    patientModel.setCardTypes(patientModel.getCardType()[i]);

	patientModel.setExpDates(patientModel.getExpDate()[i]);

	  patientModel.setCardBankName(patientModel.getCardBankNames()[i]);

	System.err.println( "getCardBankNames........SANDHYA........." + patientModel.getCardBankNames()[i]);

 System.err.println("IN FOR LOOP $$$$$$$$$$$$$$$"
	      + "Patient Registration final Amount********************" + patientModel.getFeeModel().getRegAmount());

	                        

	  patientModel.setRegAmount( patientModel.getFeeModel().getRegAmount());

	   patientModel.setConsAmount( patientModel.getFeeModel().getConsAmount());

	    String billIdCheck = patientMapper.getPayModeBillNumber(patientModel);

	                          

	 if (patientModel.getCashPts() == 275 && Float.parseFloat( patientModel.getAmountss()) > 0) {

 System.out.println("in cash @@@@@@@@@@@@@@@@@@@@");

 System.out.println( "in bill Cash @@@@@@@@@@@@@@@@@@@@"+ billIdCheck);

	 if (billIdCheck == null) {

	   float subRegCash = Float.parseFloat( patientModel.getAmountss())- Float.parseFloat(patientModel.getRegAmount());

 patientModel.setAmountss( Float.toString(subRegCash));

	      patientMapper.insertRegistration(patientModel);

	        patientMapper.insertchequeType(patientModel);

	                                } else {

	                    patientMapper.insertchequeType(patientModel);
	                                }
	                            }



	if (patientModel.getCashPts() == 275 && Float.parseFloat(
	     patientModel.getAmountss()) < 50&& Float.parseFloat(patientModel.getAmountss()) > 0) {

	 System.out.println("in cash @@@@@@@@@@@@@@@@@@@@ "+ "mmmmless than 50 ADI");

	   patientMapper.callGetinsertchequeRegType(patientModel);
	                            }


	                          
 if (patientModel.getCashPts() == 276&& Float.parseFloat( patientModel.getAmountss()) > 0) {

	    System.out.println("in card @@@@@@@@@@@@@@@@@@@@");

	   if (billIdCheck == null) {

	     System.out.println("in bill card @@@@@@@@@@@@@@@@@@@@" + billIdCheck);

	        float subRegCash =Float.parseFloat( patientModel.getAmountss()) - Float.parseFloat( patientModel.getRegAmount());

	   patientModel.setAmountss(Float.toString(subRegCash));

	     patientMapper.insertRegistration( patientModel);

 patientMapper.insertUpiType(patientModel);

	           } else {

  patientMapper.insertUpiType(patientModel);
	                                }
	                            }



 if (patientModel.getCashPts() == 276 && Float.parseFloat(  patientModel.getAmountss()) < 50) {

	   System.out.println("in bill card less than 50 Rupees Srav " + patientModel.getAmountss());

	    patientMapper.callGetinsertchequeRegType(patientModel);
	                            }



	 if (patientModel.getCashPts() == 277&& Float.parseFloat(  patientModel.getAmountss()) > 0) {


	     if (billIdCheck == null) {

	     System.out.println( "in bill upi @@@@@@@@@@@@@@@@@@@@" + billIdCheck);

	        float subRegCash =Float.parseFloat( patientModel.getAmountss())- Float.parseFloat( patientModel.getRegAmount());

	       patientModel.setAmountss(Float.toString(subRegCash));

	           patientMapper.insertRegistration(patientModel);

	    patientMapper.insertchequeType(patientModel);

	                                } else {

	           patientMapper.insertchequeType(patientModel);
	                                }
	                            }


	                          

 if (patientModel.getCashPts() == 277  && Float.parseFloat(patientModel.getAmountss()) < 50) {

	            System.out.println("in bill upi less than 50 Rupees sri "+ patientModel.getAmountss());

	         patientMapper.callGetinsertchequeRegType(patientModel);
	                            }
	                        }
	                    }
	                }
	            }

	            
	            return "1^Successfully Updated";

	        } else {

	            session.setAttribute("recptNo", "");

	            return "0^Error occured";
	        }

	    } catch (Exception e) {

	        e.printStackTrace();

	        return "0^Error occured";
	    }
	}
}