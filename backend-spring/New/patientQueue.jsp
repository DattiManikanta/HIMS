<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!-- 
 @File Name:patientQueue
 @author S. Swetha
 @Version 1.0
 @Created Date:13-08-2016
 @Modified By1: K. P. Lakshmana Rao
 @Modified Date1:10-01-2017
 @Modified By2: S. Simhachalam
 @Modified Date2:20-10-2017
 @Modified By3:D.Saiprabhu
 @Modified Date3:27-05-2019
 @Modified By4:s.saikumar
 @Modified Date3:25-12-2020  
 @Modified By5: P. Sandhya
 @Modified Date5: 02-12-2022
  @Modified By5: sravani sandhya
 @Modified Date5: 15-02-2024
   @Modified By09: Manikanta.Datti
   @modifed By6 :P.dinesh #minimal changes in field adjustments 
   /th/ change id proof validations # 
    @Modified Date5: 02-09-2025
 @Copyright(c) 2015 Atri Business Solutions,INC. 
 ALL RIGHTS RESERVet doc feeED
 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Patient Registration</title>
<meta
	content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
	name='viewport'>
<link rel="icon"
	href="/<s:message code="projectName"></s:message>/resources/images/atrismall.png"
	type="image/x-icon">

<link
	href="/<s:message code="projectName"></s:message>/resources/plugins/datatables/dataTables.bootstrap.css"
	rel="stylesheet" type="text/css" />

<link rel="stylesheet"
	href="/<s:message code="projectName"></s:message>/resources/plugins/datepicker/datepicker3.css" />

<link rel="stylesheet"
	href="/<s:message code="projectName"></s:message>/resources/plugins/daterangepicker/daterangepicker-bs3.css" />

<link rel="stylesheet"
	href="/<s:message code="projectName"></s:message>/resources/plugins/bootstrapValidator.css" />

<!--Chosen [ OPTIONAL ]-->
<link
	href="/<s:message code="projectName"></s:message>/resources/plugins/nifty/plugins/chosen/chosen.min.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="/<s:message code="projectName"></s:message>/resources/plugins/timepicker/bootstrap-timepicker.min.css" />

<link
	href="/<s:message code="projectName"></s:message>/resources/plugins/jQuery/jquery-ui.css"
	rel="stylesheet" type="text/css" />

<style>

 .containerr {
    background-color: #c1dff5; /* Light background color */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .roww {
    display: flex;
    justify-content: space-between;
  }

  #ammmmmmmm{
    background-color: #ffffff; /* White background for each box */
    padding: 3px;
    border-radius: 48px;
    text-align: center;
    margin: 10px;
    flex: 4; /* Makes columns flexible */
    transition: transform 0.2s; /* Adds hover effect */
  }

  #ammmmmmmm:hover {
    transform: scale(1.05); /* Slightly enlarges the box on hover */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Adds shadow on hover */
  }

  p {
    font-size: 16px;
    margin: 5px 0;
  }

  b {
    color: #333; /* Dark color for labels */
  }

  /* span {
    color: blue; /* Keep the text color blue */
    font-weight: bold; /* Bold for emphasis */
  } */

div.ex1 {
	background-color: white;
	overflow: scroll;
	margin: auto;
}

input[name="amounts"] {
	text-align: right;
}

table td {
	border: 1px solid black;
	padding: 4px 12px;
}

#table-scroll {
	height: 150px;
	overflow: auto;
	margin-top: 20px;
}

#preId {
	max-height: 240px;
	/* max-width: 250px; */
	overflow-y: scroll;
}

#regPreId {
	max-height: 240px;
	/* max-width: 250px; */
	overflow-y: scroll;
}

.regResults {
	margin-top: 0.5em;
	border: none;
}

.results {
	margin-top: 0.5em;
	border: none;
}

.results a {
	display: block;
}

@media only screen and (max-width: 600px) {
	div.responsivepic {
		display: none;
	}
}

#appPatClass {
	float: right;
	padding-right: 77px;
}

#regPatClass {
	float: right;
}

#newAppPatClass {
	float: right;
	padding-right: 77px;
}

@media only screen and (min-device-width: 240px) and (max-device-width:
	700px) {
	#appPatClass {
		float: none;
		padding-right: 0px;
	}
	#regPatClass {
		float: none;
	}
}

@media ( max-width :795px) {
	#fileUpload {
		width: 73% !important;
		margin-left: 31px !important;
	}
	#projectDocTable {
		margin-left: 66px;
	}
}

#refType::-webkit-input-placeholder {
	color: red;
}



#patientName::placeholder {
	color: red !important;
	opacity: 1 !important;
}


#lastName::placeholder {
	color: red !important;
	opacity: 1 !important;
}

#newPatientName::placeholder {
	color: red !important;
	opacity: 1 !important;
}

#regPatientName::placeholder {
	color: red !important;
	opacity: 1 !important;
}

#age::placeholder {
	color: red !important;
	opacity: 1 !important;
}


/* Sandhya */

#pntMobNum::placeholder {
	color: red !important;
	opacity: 1 !important;
}



#refType::-webkit-input-placeholder {
	color: red;
}
</style>


</head>

<body class="skin-blue sidebar-mini sidebar-collapse ">

	<!-- common CSS -->
	<%@include file="../common/commonCSS.jsp"%>

	<div class="wrapper">

		<!-- common Header -->
		<%@include file="../common/commonHeader.jsp"%>

		<c:choose>
			<c:when test="${role == 'MANAGEMENT' || role == 'Admin'  || role == 'HOSPITAL REPORTS'}">
				<%@include file="../common/commonLeftMenu.jsp"%>
			</c:when>
			<c:otherwise>
				<%@include file="patientLeftMenu.jsp"%>
			</c:otherwise>
		</c:choose>

		<aside class="right-side">

			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1 style="margin-left: 552px;color: green; font-size: 29px;">Patient Registration</h1>

				<ol class="breadcrumb">
					<li><a
						href="/<s:message code="projectName"></s:message>/getHomePage"><i
							class="fa fa-home" style="font-size: 1.5em; color: #fa4000"></i>
							Home</a></li>
					<li>Patient Management</li>
					<li class="active">Patient Queue</li>
				</ol>
			</section>

			<section class="content">

				<div class="box box-primary ">
					<div class="box box-body">
						<input type="hidden" id="formIdValue">
						<section class="connectedSortable">
							<!-- Custom tabs (Charts with tabs)-->
							<div class="nav-tabs-custom">
								<!-- Tabs within a box -->
								<ul class="nav nav-tabs">
									<li class="active"><a href="#apptList" data-toggle="tab" id="listRefresh" 
									style="font-size: 18px; color: blue;">Appointments</a></li>
									<li style="display: none;"><a href="#portalPatients"
										data-toggle="tab">Portal Patients</a></li>
									<li><a href="#apptAdd" id="prelistBuAdd" data-toggle="tab" style="font-size: 18px; color: blue;" >Add
											Appointment</a></li>
								<!-- 	<li class="tabsClass" id="labBill"><a href="#billTab"
										data-toggle="tab" style="color: blue;">Hospital Services</a></li> -->
									<li id="searchApp" style="display: none"><a
										href="#searchTab" data-toggle="tab">Search Appointment</a></li>
									<li id="buttonsDiv"></li>
									
									
																			
					<!-- HELP MODULE ALONG WITH HELP BUTTON FROM LINE 238 TO 245 BY HABIB ON 26 NOV 2023 -->
									
									<li class="pull-right header"  style="bottom: -3px; right: 70px;">
										<i class="fa fa-wheelchair"></i>Patient
										Management</li>
										
																								
				<li><a
						href="https://docs.google.com/document/d/1VrODn64djJjv4diD0qmtKDVB5szsxi6IFmhhHhAdQFs/edit#heading=h.w0ch5khuyym" target="_blank"style="right: -655px;"><i
							class="fa fa-question-circle" style="font-size: 1.5em; color:  #32CD32"></i>
							Help</a></li>
									
										
								</ul>

								<div class="col-md-12" style="height: 10px"></div>

								<div class="tab-content no-padding slimScrollDiv">

									<div class="tab-pane active" id="apptList"
										style="position: relative;">
										<div class="col-md-12" style="height: 10px"></div>

										<div id="apptMultiLocDiv">
											<input value="${role}" type="hidden" id="userRole">
											<input value="${userName}" type="hidden" id="userRoleee">
											<h6 hidden>
												<font color="#007700">User's MultiLocation Access</font>
											</h6>
											<div class="col-md-12" style="border: 1px solid #428bca; background: #d1e5f4;">
												<div class="col-md-12" style="height: 10px;"></div>
											
													<input type="hidden" id="userOrgStatus"
														value="${userOrgStatus}"> <input type="hidden"
														id="userLocStatus" value="${userLocStatus}"> <input
														type="hidden" id="userDeptStatus"
														value="${userDeptStatus}">
												
												<div class="col-md-3">
													<input type="text" class="form-control" style="font-size: 16px;height: 39px;"
														value="${orgDetails.orgName}" readonly> <input
														type="hidden" class="form-control" id="orgId"
														value="${orgDetails.orgId}" readonly>
												</div>
												<div class="col-md-2"style="font-size: 16px;">
													<c:choose>
														<c:when test="${userDeptStatus == '1'}">
															<input type="text" class="form-control"
																value="${locDetails.locName}" readonly>
															<input type="hidden" class="form-control" name="locId"
																id="locId" value="${locDetails.locId}" readonly>

														</c:when>
														<c:otherwise>
															<select id="userLocId" name="userLocId"
																class="form-control singleChoosen">
<!-- 																<option value="0">--Select Location--</option> -->
																<c:forEach items="${orgLocList}" var="orgLocs">
																	<option value="${orgLocs.locId}">${orgLocs.locName}</option>
																</c:forEach>
															</select>
															<input type="hidden" class="form-control" id="locId"
																value="0" readonly>
															<small id="userLocIdText"
																style="display: none; color: #A94442"></small>
														</c:otherwise>
													</c:choose>
												</div>
												 <div class="col-md-2" id="userDeptIdDiv"style="font-size: 16px;" hidden>
													<select id="userDeptId" name="userDeptId"
														class="form-control singleChoosen">
														<option value="0">--Select Department--</option>
													</select>
												</div> 
												<div class="col-md-2" hidden>
													<input type="text" class="form-control" id="deptCode"
														value="DEPT CODE" readonly><input type="hidden"
																		id="patientViewIndex" class="form-control" value="0" />
																	<small id="patientIdText"
																		style="color: #A94442; display: none;"></small>
																		<input type="hidden" id="viewMode" value="0">
												</div>																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																											
												<div class="col-md-2" hidden>
													<input type="text" class="form-control" id="deptMobNo"
														value="DEPT CONTACT NO" readonly>
												</div>
												
												
												
												<div class="col-md-5">
														<div id="reportRangeDiv"
															class="col-md-7 form-group reportRange"
															style="background: #fff; cursor: pointer; padding: 5px 10px; font-size: 18px;
															 border: 1px solid #705f5f; margin-left: 110px;">
															<i class="fa fa-calendar fa-lg"></i> <font
																style="margin-left: 20px"><span></span></font> <b
																class="caret" style="margin-left: 20px"></b>

															<%
																java.text.DateFormat df = new java.text.SimpleDateFormat("dd-MMM-yyyy");
															%>
															<input type="hidden" id="reportFromDt"
																name="reportFromDt"
																value=" <%=df.format(new java.util.Date())%>" /> <input
																type="hidden" id="reportToDt" name="reportToDt"
																value=" <%=df.format(new java.util.Date())%>" />

														</div>
													</div>
												<div class="col-md-7"style="margin-left: 64pc;">
														<small id="reportRangeErr"
															style="display: none; font-size: 10px; color: #A94442"></small>
													</div>
												
												
												<div class="col-md-12" style="height: 10px;"></div>
											</div>
										</div>
										
									<!--  alignment change  by sandhya on july 26th 2024 -->
									
									
										
										<div class="col-md-12" style="height: 10px"></div>

										<!-- @Div used to display the Success/Error message -->
										<div id="msgDiv">${msg }${refundSts }</div>

										<div class="col-md-12">
											<form id="patQueueInitialForm"></form>
											<form action="" method="post" id="searchApptForm">
												<br>
												<div class="col-md-12" id="" hidden style="background: #D1E5F4;">
													<div class="control-group">
														<label class=" col-md-2 control-label"
															style="text-align: right;">Appointment
															From&nbsp;&nbsp;&nbsp;&nbsp;:</label>
													</div>
													<div class="col-md-2 form-group inner-addon left-addon">
														<i class="glyphicon glyphicon-calendar"></i> <input
															value="${fromDt }" class="form-control datepicker"
															type="text" id="apptFromDate" name="apptFromDate" /> <small
															id="emptyApptFromDtErr"
															style="color: red; display: none;">Enter From
															Date</small> <small id="apptFromDtErr"
															style="color: red; display: none;">From Date
															should be less than To Date</small>
													</div>
													<div class="control-group">
														<label class=" col-md-2 control-label"
															style="text-align: right;">Appointment
															To&nbsp;&nbsp;&nbsp;&nbsp;:</label>
													</div>
													<div class="col-md-2 form-group inner-addon left-addon">
														<i class="glyphicon glyphicon-calendar"></i> <input
															value="${toDate }" class="form-control datepicker"
															type="text" id="apptToDate" name="apptToDate" /> <small
															id="emptyApptToDtErr" style="color: red; display: none;">Enter
															To Date</small> <small id="apptToDtErr"
															style="color: red; display: none;">To Date should
															be greater than From Date</small>
													</div>
													<div class="col-md-1">
														<button class="btn btn-info" id="searchAppt" type="button">
															<i class="fa fa-search-plus"></i>Search
														</button>
													</div>
												</div>

												<div class="col-md-12 ">
													<div class="col-md-4">
														<input type="hidden" id="userOrgStatus"
															value="${userOrgStatus}"> <input type="hidden"
															id="userLocStatus" value="${userLocStatus}"> <input
															type="hidden" id="userDeptStatus"
															value="${userDeptStatus}"> <input type="hidden"
															id="searchReportFromDt" value="${reportFromDt}">
														<input type="hidden" id="searchReportToDt"
															value="${reportToDt}"> <input type="hidden"
															id="searchLocId" name="locId" value="${locId}"> <input
															type="hidden" id="searchDeptId" name="deptId"
															value="${deptId}"> <input type="hidden"
															id="searchDeptDet" name="deptName" value="${deptName}">

														<input type="hidden" id="searchApptSts"
															value="${searchApptSts}">
													</div>

													
												</div>
												<div class="col-md-12">

													<div class="col-md-4"></div>
													
												</div>
											</form>
										</div>

										<div class="col-md-12" style="background: #d1e5f4;">
											<div class="box-body table-responsive"
												style="overflow-x: auto;">
												<section>
													<table id="patientInfo"
														class="table table-bordered table-striped display dataTable" data-order= '[[0 , "desc"]]'>
														<thead
															style="background-color: #428bca; color: rgba(255, 255, 255, 0.8);
															">
															<tr>
															
																<th width="5%" hidden>SNo.</th>
																<th width="7%">UMR No</th>
																<th width="10%">PatientName<!-- /ParentName --></th>
																<th>Gender/Age</th>
																<th width="5%">Appointment Date</th>
																<th width="15%">Consultant</th>
																<th>Category</th>
																<th>Bill Status</th>
																<th>Vitals</th>
																<th>Vitals Print</th>
																<th>RegistationFeePrint </th>
																<th>ConsultationFeePrint </th>
																<th>Ip Registration</th>
																<th>Reg.Cash</th>
																<th>Reg.Credit</th>
															    <th>Reg.Upi</th>
															    <th>Con.Cash</th>
															    <th>Con.Credit</th>
															    <th>Con.Upi</th>
																<th>Actions</th>
																<th>PatientStatus</th>
																<th>Editable view</th>
																<th>View</th>
																<th>User</th>
																<th>File Upload</th>
																<th width="10%">Contact</th>
																<th>City/Village</th>
																<th hidden>Token</th>
																<th hidden>Allergy details</th>
																<!-- <th>Problem</th> -->
																<th>Prescription Print</th>
																<th>Location</th>
																<th hidden>Refund Amount</th>

															</tr>
														</thead>
														<tbody>
															<c:set var="counter" value="0" />
															
															<c:forEach var="i" items="${patientQueue}"
																varStatus="loopCounter">
                                                                <c:set var="counter" value="${counter + 1}" />
																<tr id='tr<c:out value="${loopCounter.count}"/>'
																	data-position="1" class="draggable_tr queueTr">

																	<%-- <td align="center">
																	<c:choose>
																		<c:when test="${i.statusInfo != 'Waiting'}">
																		<i class="glyphicon glyphicon-print printConsult"
																		data-toggle="tooltip" title="consult Print"
																		style="color: #3289a8; cursor: pointer;"></i>
																		</c:when>
																		<c:otherwise>
																		</c:otherwise>
																		</c:choose>
																	
																		</td> --%>
																	
                                                                  
																

																	<td class="sorter indices" style="color:#0f0000;" hidden><input type="hidden"
																		value="<c:out value="${i.apptId }"/>" class="apptId">
																		<input type="hidden" value="${i.apptId }"
																		id="patApptId" class="patApptId"> 
																		
																			<input type="hidden" value="${i.addedBy }"
																		id="addedBy" class="addedBy"> 
																		
																			
																		<input
																		type="hidden" value="<c:out value="${i.patientId }"/>"
																		class="patientId"> <input type="hidden"
																		value="<c:out value="${i.visitId }"/>" class="visitId">
																		<input type="hidden"
																		value="<c:out value="${i.locId }"/>" class="locId">
																		<input type="hidden"
																		value="<c:out value="${i.location }"/>"
																		class="location"> 
																		 <input type="hidden"
																		class="priorityNo"
																		value='<c:out value="${i.priorityNo }"/>'
																		name="list[<c:out value="${loopCounter.count-1}"/>].priorityNo">
																	</td>
																	
																	<td class="sorter" style="color:#0f0000;"><input type="hidden"
																		value="<c:out value="${i.patientCode }"/>"
																		class="patientCode"> <c:out
																			value="${i.patientCode}" />
																			
																	</td>
																	
																	
																	<td class="sorter" style="color:#0f0000;"><input type="hidden"
																		value="<c:out value="${i.patientName }"/>"
																		class="patientName"> <c:out
																			value="${i.patientName}" />
																			
																			 <input type="hidden" value="${i.lName }"
																		id="lName" class="lName"> 
																		
																			
																		<!-- below 550 to 555 kept by habib on july 25 2024 for doc name view functionality -->
																			
																			 <input type="hidden" value="${i.employeeId }"
																		id="employeeId" class="employeeId"> 
																		
																			
																			 <input type="hidden" value="${i.locationId }"
																		id="locationId" class="locationId"> 
																		
																		
																		
																		 <input type="hidden" value="${i.pname }"
																		id="pname" class="pname"> 
																		
																		 <input type="hidden" value="${i.regAmoCash }"
																		id="regAmoCash" class="regAmoCash"> 
																		<input type="hidden" value="${i.regAmoUpi }"
																		id="regAmoUpi" class="regAmoUpi"> 
																		
																		<input type="hidden" value="${i.regAmoCard }"
																		id="regAmoCard" class="regAmoCard"> 
																		
																		<input type="hidden" value="${i.conAmoCash }"
																		id="conAmoCash" class="conAmoCash"> 
																		<input type="hidden" value="${i.conAmoCard }"
																		id="conAmoCard" class="conAmoCard"> 
																		<input type="hidden" value="${i.conAmoUpi }"
																		id="conAmoUpi" class="conAmoUpi"> 
																		<input type="hidden" value="${i.refundAmt }"
																		id="refundAmt" class="refundAmt"> 
																		<input type="hidden" value="${i.paidAmt }"
																		id="paidAmt" class="paidAmt"> 
																		</td>
																	<td style="color:#0f0000;"><c:out value="${i.gender}" />/<c:out
																			value="${i.age}" />yrs</td>
																	<td style="color:#0f0000;"><c:out value="${i.apptDt}" /></td>
																	
																		<td style="color:#660873;"><c:out value="${i.docName}" /> <input
																		type="hidden" class="empId"
																		value='<c:out value="${i.empId}"/>'> <input
																		type="hidden" class="consultant"
																		value='<c:out value="${i.docName}"/>'> <input
																		type="hidden" class="categoryVal"
																		value='<c:out value="${i.patientCategory}"/>'>
																		<input type="hidden" value="${i.bloodGrp}"
																		class="pntUpdtBloodGrp"> <input type="hidden"
																		value="${i.ageDays}" class="pntUpdtAgeDays"> <input
																		type="hidden" class="pntUpdtAgeMonths"
																		value="${i.ageMonths}"> <input type="hidden"
																		class="pntUpdtDob" value="${i.dob}"> <input
																		type="hidden" class="pntUpdtState" value="${i.state}">
																		<input type="hidden" class="pntUpdtAddr"
																		value="${i.addr}"> <input type="hidden"
																		class="pntUpdtMaritalStatus"
																		value="${i.maritalStatus}"> <input
																		type="hidden" class="pntUpdtReligion"
																		value="${i.religion}"> <input type="hidden"
																		class="pntUpdtIdProofType" value="${i.idProofType}">
																		
																		 <input type="hidden"
																		class="billId" value="${i.billId}">
																		<input type="hidden" class="visitId"
																		value="${i.visitId}">
																		<input type="hidden" class="pntUpdtIdProofNum"
																		value="${i.idProofNum}"> <input type="hidden"
																		class="pntUpdtOccupation" value="${i.occupation}">
																		<input type="hidden" class="pntUpdtRefType"
																		value="${i.refType}"> <input type="hidden"
																		class="pntUpdtSmsStatus" value="${i.smsStatus}">
																		<input type="hidden" class="pntUpdtSmsAlert"
																		value="${i.smsAlert}"> <input type="hidden"
																		class="pntUpdtRefId" value="${i.refId}"> <input
																		type="hidden" class="pntUpdtGender"
																		value="${i.gender}"> <input type="hidden"
																		class="pntUpdtAge" value="${i.age}"> <input
																		type="hidden" class="pntUpdtMobNum"
																		value="${i.mobNum}"> <input type="hidden"
																		class="pntUpdtCity" value="${i.city}"> <input
																		type="hidden" class="pntUpdtVillage"
																		value="${i.village}"> <input type="hidden"
																		class="pntUpdtNationality" value="${i.nationality}">
																		<input type="hidden" class="pntUpdtPatCatId"
																		value="${i.patientCategoryId}"> <input
																		type="hidden" class="otherStaffId"
																		value="${i.otherStaffId}"> <input
																		type="hidden" class="otherHospId"
																		value="${i.otherHospId}"> <input type="hidden"
																		class="paymentType" value="${i.payTypeName}">
																		<input type="hidden" class="sourceServiceId"
																		value="${i.sourceServiceId}">
																		<input type="hidden" class="visitTypeId"
																		value="${i.visitTypeId}">
																		
																			<input type="hidden" class="ptitle"
																		value="${i.ptitle}">
																			<input type="hidden" class="lName"
																		value="${i.lName}">
																			<input type="hidden" class="careBy"
																		value="${i.careBy}">
																		<input type="hidden" class="careByName"
																		value="${i.careByName}">
																		<input type="hidden" class="pntCat"
																		value="${i.pntCat}">
																		<input type="hidden" class="organizationsId"
																		value="${i.organizationsId}">
																		<input type="hidden" class="orgId"
																		value="${i.orgId}">
																		<input type="hidden" class="problem"
																		value="${i.problem}">
																		<input type="hidden" class="billStatus"
																		value="${i.billStatus}">
																		<input type="hidden" class="status"
																		value="${i.status}">
																			<input type="hidden" class="authorizedBy"
																		value="${i.authorizedBy}">
																			<input type="hidden" class="remarks"
																		value="${i.remarks}">
																		<input type="hidden" class="consAmount"
																		value="${i.consAmount}">
																		
																		
																		<input type="hidden" class="regFee"
																		value="${i.regFee}">
																		<input type="hidden" class="consFee"
																		value="${i.consFee}">
																		<input type="hidden" class="consDiscount"
																		value="${i.consDiscount}">
																		<input type="hidden" class="consDiscountAmount"
																		value="${i.consDiscountAmount}">
																		<input type="hidden" class="totAmt"
																		value="${i.totAmt}">
																		<input type="hidden" class="totDiscount"
																		value="${i.totDiscount}">
																		<input type="hidden" class="totDiscountAmt"
																		value="${i.totDiscountAmt}">
																		<input type="hidden" class="amtRecd"
																		value="${i.amtRecd	}">
																		<input type="hidden" class="balance"
																		value="${i.balance}">
																			<input type="hidden" class="billAmt"
																		value="${i.billAmt}">
																				<input type="hidden" class="disStaffId"
																		value="${i.disStaffId}">
																		
																		
																	<input type="hidden" class="tokenNum"
																		value="${i.tokenNum}">
																		<input type="hidden" class="apptDt"
																		value="${i.apptDt}">
																		<input type="hidden" class="specialization"
																		value="${i.specialization}">	
																			<input type="hidden" class="state"
																		value="${i.state}">
																			<input type="hidden" class="city"
																		value="${i.city}">
																		
																		
																		
																		</td>
																	
																	<td style="color: blue;">${i.patientCategory}</td>
																	<td><c:choose>
																	
																			<c:when test="${i.status == '17'}">
																				<button type="button"
																					class="btn btn-success fa fa-check-circle paid"
																					data-toggle="tooltip" data-original-title="Paid">PAID</button>
																			</c:when>
																			<c:when test="${i.status == '18'}">
																				<button type="button"
																					class="btn btn-warning fa fa-plus-circle paid"
																					data-toggle="tooltip" data-original-title="Pending">PENDING</button>
																			</c:when>
																				<c:when test="${i.status == '322'}">
																				<button type="button"
																					class="btn btn-success fa fa-check-circle concession"
																					data-toggle="tooltip" data-original-title="concession">CONCESSION</button>
																			</c:when>
																			<c:otherwise>
																				<button type="button"
																					class="btn btn-danger fa fa-times-circle unpaid"
																					data-toggle="tooltip" data-original-title="Unpaid">CANCLED</button>
																			</c:otherwise>
																		</c:choose></td>
																		
																		<c:if test="${i.vitalStatus==0}">
																		<td align="center"><button
																				class="fa fa-heartbeat vitalss"
																				style="font-size: 20px; color: red" type="button"></button>
																		</td>
																	</c:if>

																	<c:if test="${i.vitalStatus==1}">
																		<td align="center"><button
																				class="fa fa-heartbeat vitalss"
																				style="font-size: 20px; color: blue;" type="button"></button>
																		</td>
																	</c:if>
																	
																	<td align="center"><i
																		class="glyphicon glyphicon-print printPrescp"
																		data-toggle="tooltip" title="vitals Print"
																		style="color: #3289a8; cursor: pointer;"></i></td>
																			<td align="center"><i
																		class="glyphicon glyphicon-print printButton"
																		data-toggle="tooltip" title="RegistrationFeeBill"
																		style="color: #3289a8; cursor: pointer;"></i></td>

																	<td align="center"><i
																		class="glyphicon glyphicon-print printConsultButton"
																		data-toggle="tooltip" title="ConsultationFeePrint"
																		style="color: #3289a8; cursor: pointer;"></i></td>

																	<td align="center" class="IpRegistration"><i
																		class="fa fa-hand-o-right" aria-hidden="true"
																		title="IP Registration"
																		style="cursor: pointer; color: #0099cc;"></i></td>

																	<!-- payment type for Regggggg added by sarojini -->
																	
																	<td style="color: blue;">${i.regOpCashAmt}
																	<input type="hidden" value="<c:out value="${i.regOpCashAmt }"/>" 
																	class="regOpCashAmt"></td>
																	
																	
																	<td style="color: blue;">${i.regOpCreditAmt}
																	<input type="hidden" value="<c:out value="${i.regOpCreditAmt }"/>" 
																	class="regOpCreditAmt"></td>
																		   
																	
																	<td style="color: blue;">${i.regOpUpiAmt}
																	<input type="hidden" value="<c:out value="${i.regOpUpiAmt }"/>" 
																	class="regOpUpiAmt"></td>	
																	
																	
																	<!-- payment type for Con -->
																		
																		
																			<td style="color: blue;">${i.cashAmt}<input type="hidden" value="<c:out value="${i.cashAmt }"/>" 
																	class="cashAmt"></td>
																			<td style="color: blue;">${i.creditAmt}<input type="hidden" value="<c:out value="${i.creditAmt }"/>" 
																	class="creditAmt"></td>
																		   <td style="color: blue;">${i.upiAmt}<input type="hidden" value="<c:out value="${i.upiAmt }"/>" 
																	class="upiAmt"></td>
																			
																			
																		
																		
																	<td align="center"><c:if
																			test="${i.statusInfo != 'Cancelled' && i.statusInfo != 'Visited' }">
																			<button type="button"
																				class="btn btn-warning fa fa-hand-o-right reschSave"
																				data-toggle="tooltip" data-original-title="Actions"></button>
																		</c:if></td>

																	<td align="center"><c:choose>
																			<c:when test="${i.statusInfo == 'Cancelled'}">
																				<span class="btn btn-danger fa fa-times-circle Cancelled"
																					style="background-color:<c:out value="${reschStatus.cancelledColor}"/>">
																					<c:out value="${i.statusInfo}" />
																				</span>
																			</c:when>
																			<c:otherwise>
																				<span class="label label-default waitSts"> <c:out
																						value="${i.statusInfo }" /></span>
																				<input type="hidden" class="pntUpdtStatus"
																					value="${i.statusInfo}">
																			</c:otherwise>
																		</c:choose></td>
																		
																		
																		<td align="center"><i
																		class="	glyphicon glyphicon-pencil viewBut"
																		data-toggle="tooltip" title="view Button"
																		style="color: green; cursor: pointer;"></i></td>
																		
																		<!-- habib on feb 28 -->
																		
																		<td align="center"><i
																		class="glyphicon glyphicon-eye-open view"
																		data-toggle="tooltip" title="view Button"
																		style="color: green; cursor: pointer;"></i></td>
																		
																		
																	
																 <td style="color:#0f0000;">${i.addedBy}</td>
																 
																 
																 <c:if test="${i.fileStatus==0}">
																		<td align="center"><i
																			class="glyphicon fa fa-upload fileUpload"
																			data-toggle="tooltip" title="File Upload"
																			style="color: red; cursor: pointer; font-size: 25px;"></i></td>
																	</c:if>
																	<c:if test="${i.fileStatus==1}">
																		<td align="center"><i
																			class="glyphicon fa fa-upload fileUpload"
																			data-toggle="tooltip" title="File Upload"
																			style="color: blue; cursor: pointer; font-size: 25px;"></i></td>
																	</c:if>
																		
																		
																		
																	<td style="color:#0f0000;"><c:out value="${i.mobNum}" /></td>
																	<td style="color:#0f0000;"><c:out value="${i.city}" />/<c:out
																			value="${i.village}" /></td>


																
																		



																	

																	<td hidden><c:out value="${i.tokenNum}" /> <input
																		type="hidden" class="schDt"
																		value='<c:out value="${i.apptDt}"/>'></td>
																	
																	<!-- <td align="center"><i
																				class="glyphicon fa fa-upload fileUpload"
																				data-toggle="tooltip" title="File Upload"
																				style="color: #3289a8; cursor: pointer;font-size:25px;"></i></td> -->
																	
																	<td align="center" hidden>
																		<!-- <button class="fa fa-heartbeat allergy" style="font-size:20px;color:red" type="button"></button> -->
																		<button name="allergy" class="allergy"
																			style="font-size: 10px; color: blue" type="button">Allergy
																			details</button>
																	</td>
																	<%-- <td><c:out value="${i.problem}" /> 
																		<input id="schStartTime" value="<c:out value="${i.startTime}" />"
																		class="form-control schStartTime" type="hidden" /></td> --%>
																

																	
																	
																	
																		
																	
																		
																		
																		
																		<td align="center"><i
																		class="glyphicon glyphicon-print printConsult"
																		data-toggle="tooltip" title="consult Print"
																		style="color: #3289a8; cursor: pointer;"></i></td>
																	
																	<td style="color:#0f0000;">${i.locName}</td>
																	
																		

																	<td align="center" hidden>
																		<button id="refund" class="refund"
																			style="font-size: 10px; color: red" type="button">Refund</button>
																	</td>



																</tr>
															</c:forEach>
															
															<div class="containerr"style=" WIDTH: 100PC;">
  <div class="roww"id="ammmmmmmm">
    <div class="col-md-2">
      <p><b>Total Patients:</b> <span style="color: blue;">${counter}</span></p>
      <input type="hidden" class="locationName" value="${counter}" />
    </div>
    <div class="col-md-2">
      <p><b>Reg Cash:</b> <span id="totalCash" style="color: blue;">0.00</span></p>
    </div>
    <div class="col-md-2">
      <p><b>Reg Card:</b> <span id="cardAmtttotal" style="color: blue;">0.00</span></p>
    </div>
    <div class="col-md-2">
      <p><b>Reg UPI:</b> <span id="upiAmtttotal" style="color: blue;">0.00</span></p>
    </div>
    <div class="col-md-2">
      <p><b>Cons Cash:</b> <span id="conAmounts" style="color: blue;">0.00</span></p>
    </div>
    <div class="col-md-2">
      <p><b>Cons Card:</b> <span id="caoCardAmounts" style="color: blue;">0.00</span></p>
    </div>
    <div class="col-md-2">
      <p><b>Cons Upi:</b> <span id="conUpiAmounts" style="color: blue;">0.00</span></p>
    </div>
      <div class="col-md-2">
      <p><b>Paid Amt:</b> <span id="paidAmttt" style="color: blue;">0.00</span></p>
    </div>
    <div class="col-md-2">
      <p><b>Refund Amt:</b> <span id="refundAmtt" style="color: blue;">0.00</span></p>
    </div>
  </div>
</div>
														</tbody>
														<tfoot>
															<tr>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th></th>
																<th id="cashAmttt"></th>
																<th id="cardAmttt"></th>
																<th id="upiAmttt"></th>
																<th id="cashAmountTfoot"></th>
																<th id="creditAmountTfoot"></th>
																<th id="upiAmtTfoot"></th>
															</tr>
														</tfoot>
														
													</table>
												</section>
											</div>
										</div>
									</div>



									<div class="tab-pane" id="billTab" style="position: relative;">
										<div class="nav-tabs-custom">
											<ul class="nav nav-tabs">
												<li class="active"><a href="#billList"
													data-toggle="tab">Bill List</a></li>

												<li><a href="#newBill" data-toggle="tab">Add New
														Bill</a></li>
											</ul>



											<div class="tab-content no-padding">
												<div id="billList" class="tab-pane active"
													style="position: relative;">

													<div
														class="col-md-12 alert alert-success alert-dismissable"
														style="display: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px;"
														id="successInvDiv">
														<button class='close' aria-hidden='true'
															data-dismiss='alert' type='button'>x</button>
														<h5 id="successMessageInv" class="fa fa-check"
															style="color: white"></h5>
													</div>

													<!-- @Div used to display the Error message -->
													<div class="col-md-12 alert alert-danger alert-dismissable"
														style="display: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px;"
														id="errorInvDiv">
														<button class='close' aria-hidden='true'
															data-dismiss='alert' type='button'>x</button>
														<h5 id="errorMessageInv" style="color: white;"
															class="fa fa-ban"></h5>
													</div>

													<div class="col-md-12 " style="margin-top: 2%;">
														<div class="col-md-2"></div>




														<div class="col-md-6">

															<div id="deptInvRangeDiv"
																class="col-md-7 form-group deptInvRange"
																style="background: #fff; cursor: pointer; padding: 5px 10px; font-size: 15px; border: 1px solid #ccc">
																<i class="fa fa-calendar fa-lg"></i> <font
																	style="margin-left: 20px"><span></span></font> <b
																	style="margin-left: 20px"></b>
																	
																
<%
																	java.text.DateFormat invdt1 = new java.text.SimpleDateFormat("dd-MM-yyyy");
																%>
																<input
																	type="text" id="currDate" name="currDate"
																	value=" <%=invdt1.format(new java.util.Date())%>" />
																<%
																	java.text.DateFormat invdt = new java.text.SimpleDateFormat("dd-MMM-yyyy");
																%>
																
																<input type="hidden" id="deptInvFromDt"
																	name="deptInvFromDt"
																	value=" <%=invdt.format(new java.util.Date())%>" /> <input
																	type="hidden" id="deptInvToDt" name="deptInvToDt"
																	value=" <%=invdt.format(new java.util.Date())%>" />

															</div>
														</div>

														<div class="col-md-2" style="margin-left: -150px;">
															<select id="labDepts" class="form-control singleChoosen">
																<c:forEach items="${labDeptList}" var="dept">
																	<option value="${dept.serviceId}">${dept.serviceName}</option>
																</c:forEach>
															</select>
														</div>

														<div class="col-md-2"></div>

														<div id="RadiologyDiv" class="col-md-2"
															style="margin-left: -150px;" hidden>
															<select id="labdepartment"
																class="form-control singleChoosen">
																<option value="0">--select--</option>
																<c:forEach items="${labRadList}" var="dept">
																	<option value="${dept.serviceId}">${dept.serviceName}</option>
																</c:forEach>

															</select>
														</div>


													</div>




													<div class="col-md-12" id="deptInvListInter"></div>




												</div>

												<div id="newBill" class="tab-pane "
													style="position: relative;">

													<form action="" method="post" id="deptBillForm">

														<div class="col-md-12 " style="margin-top: 2%;">
															<div class="col-md-4"></div>
															<input type="hidden" id="chargeNew" value='0'>
															<div class="col-md-2">
																<label><b></>Select Tarrif Wise Service</b></label> <select
																	name="tarrifId" id="tarrifId"
																	class="tarrifId form-control"
																	style="width: %; height: %" required>
																	<option value="0">--Select Tarrif--</option>
																	<c:forEach items="${tarrifLabList}" var="specim">
																		<option value='${specim.tarrifId}'>${specim.tarrifName}</option>
																	</c:forEach>
																</select> <small id="tarrifIdText"
																	style="display: none; color: #A94442"></small>

															</div>

															<div class="col-md-2">
																<label><b></>Select Department</b></label> <select
																	id="labDeptId" name="labDeptId"
																	class="form-control singleChoosen">
																	<option value="0">--select--</option>
																	<c:forEach items="${labDeptList}" var="dept">
																		<option value="${dept.serviceId}">${dept.serviceName}</option>
																	</c:forEach>
																</select> <input type="hidden" id="deptName" name="deptName">
																<input type="hidden" id="invIdDuplicateStatus" value="0">
																<input type="hidden" id="billId" value="0">
															</div>




															<div class="col-md-2"
																style="margin-top: 2%; float: right;">
																<button id="saveInv"
																	style="background-color: #4CAF50; font-size: 16px; text-align: center; border: none; color: white; padding: 5px 15px;">Save</button>
															</div>

														</div>


														<div class="col-md-12 "
															style="margin-top: 2%; margin-left: -2px;">

															<div class="col-md-3" id="opDiv" style="margin-top: -2%;">

																<div class="control-group">
																	<label class="col-md-12 control-label" style="">Patient
																		Name/Mobile/UMR NUM&nbsp;:</label>
																</div>
																<div class="col-md-12 form-group">
																	<div class="form-group inner-addon left-addon">
																		<i class="glyphicon glyphicon-search"
																			style="color: #190707;"></i> <input type="text"
																			autocomplete="off" class="form-control"
																			id="customerCode"
																			placeholder="Search Patient Name/Mobile/Code"
																			autocomplete="off" /> <input type="hidden"
																			id="customerId" name="customerId" value="0" /> <small
																			id="errCustomerId"
																			style="color: #A94442; display: none;"></small>
																	</div>
																</div>

															</div>
															<div class="col-md-3">
																<input type="hidden" id="tariffId" name="tariffId"
																	value="0">
																<div class="control-group">
																	<label class="col-md-4 control-label"
																		style="text-align: right;">Patient Name&nbsp;:</label>
																		<input type="hidden" id="patOrgId" name="patOrgId" value=0>
																</div>
																<div class="col-md-8 form-group">
																	<input class="form-control mode" type="text"
																		id="customerName" name="customerName"
																		autocomplete="off" placeholder="Patient Name here"
																		readonly /><small id="errPatientName"
																		style="color: #A94442; display: none;"></small>
																</div>

															</div>
															<div class="col-md-6 oldPatient">
																<div class="control-group">
																	<label class="col-md-2 control-label"
																		style="text-align: right;">Age / gender&nbsp;:</label>
																</div>
																<div class="col-md-1 form-group">
																	<input class="form-control mode" type="text"
																		autocomplete="off" id="patAgeOld" name="" readonly />
																			<input type="hidden" id="adjustAmtdue" value="0.00" >
																			<input type="hidden" id="recivedAmt" value="0.00" >

																</div>
																<div class="col-md-1 form-group">
																	<input class="form-control mode" type="text"
																		autocomplete="off" id="patAgeMonth" name="" readonly />

																</div>
																<div class="col-md-1 form-group">
																	<input class="form-control mode" type="text"
																		autocomplete="off" id="patAgeDay" name="" readonly />

																</div>
																<!-- <div class="col-md-1"> -->
																<!-- </div> -->
																<div class="col-md-1 form-group"
																	style="margin-right: -26%;">
																	<input class="form-control mode" type="text"
																		id="patGenderOld" readonly />
																</div>

																<div class="col-md-5 oldPatient"
																	style="margin-left: 33px;">

																	<div class="control-group">
																		<label class="col-md-6 control-label"
																			style="text-align: right;">Mobile
																			Number&nbsp;:</label>
																	</div>
																	<div class="col-md-6 form-group">
																		<input class="form-control mode" type="text"
																			autocomplete="off" id="customerMobNumOld">
																	</div>

																</div>

															</div>
														</div>
														<div class="col-md-12 oldPatient"
															style="margin-left: -316px;">
															<div class="col-md-2"></div>
															<!-- <div class="col-md-5 oldPatient" >

													<div class="control-group">
														<label class="col-md-6 control-label"
															style="text-align: right;">Mobile Number&nbsp;:</label>
													</div>
													<div class="col-md-6 form-group">
														<input class="form-control mode" type="text"
															autocomplete="off" id="customerMobNumOld" readonly />
													</div>

												</div> -->

															<!-- <div class="col-md-5 oldPatient" style="margin-left: -8%;">

													<div class="control-group">
														<label class="col-md-4 control-label"
															style="text-align: right;">Email Id&nbsp;:</label>
													</div>
													<div class="col-md-8 form-group">
														<input class="form-control mode" type="text"
															autocomplete="off" id="customerEmailOld" readonly />
													</div>
											   </div> -->


														</div>




														<div class="col-md-12 billingDiv"
															style="border: 1px solid #a1a1a1;">
															<div class="col-md-2"></div>

															<div class="box-body">
																<table id="labServicesTableMain"
																	class="table table-bordered table-striped">
																	<thead
																		style="background-color: #428BCA; color: rgba(255, 255, 255, 0.8)">
																		<tr>
																			<td hidden>Service Group</td>
																			<td width="40%">Services</td>
																			<td width="12%" id="quantityRow" hidden>Quantity</td>
																			<td>Tarrif type</td>
																			<td>Price</td>
																			<td></td>
																		</tr>
																	</thead>

																	<tr id="addInvTr">
																		<td hidden><select type="text"
																			class="form-control res" id="serviceName"><option
																					value="">Select</option>
																				<c:forEach var="i" items="${services }">
																					<option value='<c:out value="${i.serviceId }"/>'>
																						<c:out value="${i.serviceName }" /></option>
																				</c:forEach>
																		</select> <input type="hidden" class="form-control res"
																			id="serviceId" value="0"> <small
																			id="serviceIdText"
																			style="display: none; color: #A94442"></small></td>

																		<td id="invId"><select id="selInvName"
																			class="singleChoosen" style="width: 50%; height: 40%"
																			required>

																		</select> <small id="investigationText"
																			style="display: none; color: #A94442"></small></td>

																		<td id="quantityText" hidden><input type="text"
																			class="form-control res" id="quantity" name="qty"
																			style="text-align: right;"> <small
																			id="quantityTextSmall"
																			style="display: none; color: #A94442"></small></td>
																		<td><input type="text" class="form-control res"
																			value="" id="tarrifName" style="text-align: right;"
																			readonly></td>

																		<td><input type="text" class="form-control res"
																			value="0.00" id="charge" style="text-align: right;"
																			readonly> <small id="chargeText"
																			style="display: none; color: #A94442"></small></td>

																		<td align="center" id="addProductTd">
																			<button type="button" id="addInvestigation"
																				class="btn btn-primary">
																				<i class="fa fa-plus"></i>
																			</button>
																		</td>
																	</tr>
																	<tr id="patPrescMainTr" hidden></tr>
																	<tfoot id="invProfile"></tfoot>

																</table>

															</div>

														</div>


														<div class="col-md-12 ">
															<div class="col-md-12" id="labBillDiv">
																<div class="col-md-12">
																	<div class="">
																		<h6>
																			<font color="#007700">Billing:</font>
																		</h6>
																	</div>
																</div>
																<div class="col-md-12"
																	style="border: 1px solid #a1a1a1;">
																	
																	<div class="col-md-12" hidden>
																		<div class="col-md-4">
																			<label>Payment Type</label> <select
																				class="form-control singleChoosen" id="paymentType"
																				name="paymentType" style="display: none;">
																				<option value="Cash">Cash</option>
																				<option value="Debit Card/Credit Card">Debit
																					Card/Credit Card</option>
																				<option value="Cheque">Cheque</option>
																				<option value="NEFT/IMPS">NEFT/IMPS</option>
																				<option value="UPI">UPI</option>
																			</select>
																		</div>
																		<div class="col-md-4" id="chequeDiv"
																			style="display: none;">
																			<label for="" class="control-label">Cheque
																				No:</label> <input type="text" id="chequeNumber"
																				name="chequeNumber" class="form-control"
																				placeholder="Enter Cheque No.">
																		</div>
																		<div class="col-md-4" id="cardDiv"
																			style="display: none;">
																			<label for="" class="control-label">Transaction
																				No:</label> <input type="text" id="cardTransactionNumber"
																				name="cardTransactionNumber" class="form-control"
																				placeholder="Enter Transaction No.">
																		</div>
																		<div class="col-md-4">
																			<label for="" class="control-label">Reason
																				for Discount:</label>
																			<textarea id="discountReason" name="discountReason"
																				class="form-control"></textarea>
																		</div>
																	</div>
																	
																	
																	
																	
																	
																	
																	
																	
                                                                    <!--sandhya -->	
                                                                    															
																	<div class="col-md-12" id="feeDetDiv">

																	<font
																		style="color: #007700; font-size: 14px; font-weight: 600;">Payment
																		Type</font>

																	<div class="col-md-12" style="height: 10px"></div>

																	<div class="col-md-6"
																		style="border: 1px solid #428bca; background: #D1E5F4;">
																		
																<!--	CASH AMOUNT -->
																		
																		
																		<c:forEach items="${paymenttypelist}" var="var">
																			<c:if test="${var.payTypeName== 'Cash'}">
																				<table id="payModeTable"
																					class="table table-bordered table-striped dataTable payModeTable">


																					<thead
																						style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)">
																						<tr>
																							<th style="text-align: center">Cash Mode</th>
																							<th style="text-align: center">Cash Amt</th>
																							
																				

																						</tr>
																					</thead>
																					<tbody>

																						<tr>
																							<td><b>Cash</b></td>
																							<td><input type="text"
																								class="form-control mode" placeholder=""
																								id="cashAmnt" name="cashAmnts"
																								autocomplete="off" maxlength="45" value="" /> 
																								
																								<small
																								id="cashAmntText"
																								style="color: #A94442; display: none;"></small>
																								
																								<input type="hidden" id="cashPayment" name="paymentTypes"
																								value="${var.payTypeId}">
																								
																								 <input
																								type="hidden" id="cashTransNo" name="transactioNos"
																								value=" ">
																								
																									
																								 <input
																								type="hidden" id="cardType" name="cardTypes"
																								value=" ">
																								
																								<input
																								type="hidden" id="cashExpiryDt" name="expiryDts" 
																								value=" ">
																								
																								 <input type="hidden"  id="cashBankName"
																								name="newBankNames" value=" ">
																								
																								 <input
																								type="hidden" name="chequeDts" id="cashChequeDt"
																								value=" ">
																									<input type="hidden" id="CashcreditNo" name="creditNo"  value="" />																							<input type="hidden" id="CashcreditNo" name="creditNo"  value="" />
																								
																								</td>
																								
																						
																						

																						</tr>
																					</tbody>
																				</table>
																			</c:if>
																			
																			
																			
																	<!--	CREDIT CARD/ DEBIT CARD AMOUNT -->
																			
																			<c:if
																				test="${var.payTypeName == 'Credit card / Debit card'}">
																				<table id="payModeTable"
																					class="table table-bordered table-striped dataTable payModeTable">

																					<thead
																						style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)">
																						<tr>
																							<th style="text-align: center" width="10px">
																								Mode</th>
																							<th style="text-align: center">Amt</th>
																							<th style="text-align: center">Card Type</th>
																						    <th style="text-align: center">Card No.</th>
                                                                                            <th style="text-align: center">Expiry Dt</th>
																						</tr>
																					</thead>
																					<tbody>


																						<tr>
																							<td><b>Credit/Debit Card</b></td>
																							<td><input type="text"
																								class="form-control mode" placeholder=""
																								id="creditAmnt" name="cashAmnts"
																								autocomplete="off" maxlength="45" value="" /> <small
																								id="creditAmntText"
																								style="color: #A94442; display: none;"></small>

																								<input type="hidden" id="creditPayment" name="paymentTypes"
																								value="${var.payTypeId}">
																								
																								 <input
																								type="hidden"  id="creditBankName" name="newBankNames"
																								value=" ">
																								
																								 <input
																								type="hidden" name="chequeDts" id="bankChequeDt"
																								value=" ">
																								
																								
																								
																								</td>
																								
																						<td><select  class="form-control singleChoosen"
																						id="cardTypes" name="cardTypes">
																							        <option value="0">--Select--</option>
																									<option value="Credit">Credit</option>
																									<option value="Debit">Debit</option>
																					</select><small id="creditCardTypText"
																						style="color: #A94442; display: none;"></small></td>
																						
																											
																							
																							
																							<td><input type="text"
																								class="form-control mode"
																								placeholder="Enter Trans Number"
																								id="oneCreditChqCardNo" name="transactioNos"
																								autocomplete="off" maxlength="16" value="" /> <small
																								id="oneCreditChqCardNoText"
																								style="color: #A94442; display: none;"></small>
																								
																								
																								
																								
																							</td> 
																							
																							
																							
									
																							
																								<td><input type="text"
																								class="form-control mode"
																								placeholder="MM/YYYY"
																								id="cardExpiryDt" name="expiryDts"
																								autocomplete="off" maxlength="45" value="" /> <small
																								id="oneCreditChqCardNoText"
																								style="color: #A94442; display: none;"></small>
																							</td>

																						</tr>
																					</tbody>
																				</table>
																			</c:if>
																			
																			
																			
														<!--	PHONEPAY AMOUNT -->
																			
																			
																			<c:if test="${var.payTypeName== 'UPI'}">
																				<table id="payModeTable"
																					class="table table-bordered table-striped dataTable payModeTable">

																					<thead
																						style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)">
																						<tr>
																							<th style="text-align: center" width="10px">Mode</th>
																							<th style="text-align: center">Amt</th>
																							<th>Transaction No:</th>
 																							<!--<th>Mob No.</th>--></tr>
																					</thead>
																					<tbody>

																						<tr>
																							<td><b>UPI</b></td>
																							<td><input type="text"
																								class="form-control mode" placeholder=""
																								id="upiAmnt" name="cashAmnts" autocomplete="off"
																								maxlength="45" value="" /> <small
																								id="upiAmntText"
																								style="color: #A94442; display: none;"></small>

																								<input type="hidden" id="upiPayment" name="paymentTypes"
																								value="${var.payTypeId}"></td>

																							<td><input type="text"
																								class="form-control mode"
																								placeholder=" Enter Trans Id" id="oneUpiChqCardNo"
																								name="transactioNos" autocomplete="off" maxlength="6" />
																								<small id="oneUpiChqCardNoText"
																								style="color: #A94442; display: none;"></small>
																								
																								 <input
																								type="hidden" id="cardType" name="cardTypes"
																								value=" ">
																								
																								
																									<input
																								type="hidden" id="upiExpiryDt" name="expiryDts" 
																								value=" ">
																								<input type="hidden" id="upiBankName" name="newBankNames" 
																								value=" ">
																								<input type="hidden" name="chequeDts" id="upiChequeDt"
																								value=" ">
																								
																								<input type="hidden" id="UpicreditNo" name="creditNo"  value="" />
																								</td>


																						</tr>
																					</tbody>
																				</table>
																			</c:if>
																			
																			
													

	                                                   <!--	CHEQUE AMOUNT -->
																			

																			<c:if test="${var.payTypeName== 'Cheque'}">
																				<table id="payModeTable"
																					class="table table-bordered table-striped dataTable payModeTable">

																					<thead
																						style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)">
																						<tr>
																							<th style="text-align: center" width="10px">
																								Mode</th>
																							<th style="text-align: center">Amt</th>
																							<th style="text-align: center">Check Number.</th>
																							<th style="text-align: center" width="2px">Bank
																								Name</th>
																							<th style="text-align: center">check Date</th>

																						</tr>
																					</thead>
																					<tbody>


																						<tr>
																							<td><b>CHEQUE</b></td>
																							<td><input type="text"
																								class="form-control mode" placeholder=""
																								id="chequeAmnt" name="cashAmnts"
																								autocomplete="off" maxlength="45" value="" /> <small
																								id="chequeAmntText"
																								style="color: #A94442; display: none;"></small>


																								<input type="hidden" id="chequePayment" name="paymentTypes"
																								value="${var.payTypeId}"></td>
																								
																							<td><input type="text"
																								class="form-control mode"
																								placeholder="Enter Trans Number"
																								id="oneChequeChqCardNo" name="transactioNos"
																								autocomplete="off" maxlength="45" value="" />
																								 <small
																								id="oneChequeChqCardNoText"
																								style="color: #A94442; display: none;"></small>
																								
																								 <input
																								type="hidden" id="cardType" name="cardTypes"
																								value=" ">
																								
																									<input
																								type="hidden" id="chequeExpiryDt" name="expiryDts" 
																								value=" ">
																								
																								
																								
																								
																							</td>
																							<td><select
																								class="form-control singleChoosen"
																								id="chequeBankName" name="newBankNames">
																									<option value="0">-select-</option>
																									<c:forEach items="${paymentModeList}" var="org">
																										<option value="${org.bankId}">${org.bankNames}</option>
																									</c:forEach>

																							</select> <small id="chequeBankNameText"
																								style="color: #A94442; display: none;"></small>
																							</td>
																							<td><input type="text" autocomplete="off"
																								class="form-control datepicker"
																								Placeholder="Enter Date" id="chequeDt" name=chequeDts
																							 value=""> <small
																								id="chequeDtText"
																								style="color: #A94442; display: none;"></small>

																							</td>
																						</tr>
																					</tbody>
																				</table>
																			</c:if>
																		</c:forEach>


																	</div>

                                                               <div class="col-md-6" id="ttbpb">

																		<div class="col-md-2"style="width: 270px;">
																			<label>Total Amount</label> <input type="text"
																				name="labTotAmt" id="labTotAmt" value="0.00"
																				class="form-control totAmt"
																				style="text-align: right;" readonly>
																		</div>
																		<div class="col-md-2"style="width: 225px;">
																			<label>Total Discount(%)</label> <input type="text"
																				name="labDiscPerc" id="labDiscPerc"
																				class="form-control totDisc"
																				style="text-align: right;" value="0"> <small
																				id="labDiscPercText"
																				style="color: #A94442; display: none;"></small>
																		</div>
																		<div class="col-md-2"style="width: 225px;">
																			<label>Discount Amount</label> <input type="text"
																				name="labTotDisc" id="labDiscAmt"
																				class="form-control totDisc"
																				style="text-align: right;" value="0"> <small
																				id="labDiscAmtText"
																				style="color: #A94442; display: none;"></small>
																		</div>
																		<div class="col-md-2"style="width: 270px;margin-top: 35px;">
																			<label>Bill Amount</label> <input type="text"
																				name="labBillAmt" id="labBillAmt"
																				class="form-control" style="text-align: right;"
																				value="0.00" readonly>
																		</div>
																		<div class="col-md-2"style="width: 225px;margin-top: 35px;" hidden>
																			<label>Paid Amount</label> <input type="text"
																				name="labPaidAmt" id="labPaidAmt"
																				class="form-control" style="text-align: right;"
																				value="0.00"> <small id="labPaidAmtText"
																				style="color: #A94442; display: none;"></small>
																		</div>
																		<div class="col-md-2"style="width: 225px;margin-top: 35px;">
																			<label>Balance</label> <input type="text"
																				name="labBalAmt" id="labBalAmt" class="form-control"
																				value="0.00" style="text-align: right;" readonly>
																		</div>

																		<div class="col-md-2" hidden>
																			<label>Change Given</label> <input type="text"
																				name="changeGiven" id="changeGiven"
																				class="form-control" value="0.00"
																				style="text-align: right;" readonly>
																		</div>
																		
																		
																		<div class="col-md-4" style="width: 270px;margin-top: 35px;">
														<!-- <label>Concession Name:</label> -->
														<input type="HIDDEN" 
														oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
															name="concession" id="concession" placeholder="Enter Concession Name" class="form-control"
															 style="text-align: left;" value=""/>
															 <input type ="hidden" id="concessionSave" value="0">
															 <small id="concessionText" style="color: #A94442; display: none;"></small>
													</div>
																		
																	<div class="col-md-3" style="width: 270px;margin-top: 35px;" hidden >
														<label>Remarks:</label><textarea rows="1" cols="30"
														oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
															name="remarks" id="remarkss" placeholder="Enter Remarks" class="form-control"
															style="text-align: left; width: 235px; height: 34px;"></textarea>
															 <input type ="hidden" id="remarksSave" value="0">
															 <small	id="remarksText" style="color: #A94442; display: none;"></small>
													</div>	
													
													
														 <div class="col-md-6" style="width: 270px;margin-top: 35px;">
													   <label style="margin-left: -260px">Refund Amount:</label><%-- <input type="text" class="refundAmt" id="refundAmt" 
													   name="refundAmt" value="${billServicesList[0].refundAmt}" style="margin-left: 120px; width:150px; height: 34px; readonly"> --%>
													   <input type="text" name="invRefundAmt" id="invRefundAmt" class="form-control" value="0.00" 
													   style="text-align: right; margin-left: -268PX; width:180px; height: 34px;" readonly>
													   <small id="refundAmtText" style="color: #A94442; display: none;"></small>
													</div> 	
													
													
													<div class="col-md-2" style="width: 225px;margin-top: 35px; margin-left: -266px">
													   <label class="control-label">Discount authorized By:</label>
													   <input type="text" name="authorized" id="authorized" class="form-control" value=" ">
													   <small id="authorizedText" style="color: #A94442; display: none;"></small>
													</div> 	
													
													
															

																	</div>
																</div>
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																	
																</div>

															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>


									<div class="tab-pane" id="portalPatients"
										style="position: relative;">
										<div class="col-md-12" style="height: 10px"></div>
										<div class="col-md-12 " hidden>
											<div class="col-md-4"></div>

											<div class="col-md-7">
												<div id="pntPortalRangeDiv"
													class="col-md-6 form-group pntPortalRange"
													style="background: #fff; cursor: pointer; padding: 5px 10px; font-size: 15px; border: 1px solid #ccc">
													<i class="fa fa-calendar fa-lg"></i> <font
														style="margin-left: 20px"><span></span></font> <b
														class="caret" style="margin-left: 20px"></b> <input
														type="hidden" id="pntPortalFromDt" name="pntPortalFromDt"
														value=" <%=df.format(new java.util.Date())%>" /> <input
														type="hidden" id="pntPortalToDt" name="pntPortalToDt"
														value=" <%=df.format(new java.util.Date())%>" />
												</div>
											</div>
										</div>
										<div class="col-md-12 ">
											<div class="box-body table-responsive">
												<table id="portalPatientsTable"
													class="table table-bordered table-striped dataTable">

													<thead
														style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)">
														<tr>
															<th>Patient Code</th>
															<th>Patient Name</th>
															<th>Patient Gender</th>
															<th>Patient Age</th>
															<th>Mobile Number</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														<c:forEach items="${patientPortalList}" var="patients">
															<tr
																<c:choose>
																	<c:when test="${patients.pntPortalRegSts == '0'}">
																		style="background-color: #f4f4f4"
																	</c:when>
																	<c:otherwise>
																		style="background-color: #70d372"
																	</c:otherwise>
																</c:choose>>
																<td>${patients.patientCode}<input type="hidden"
																	class="portalPntCode" value="${patients.patientCode}">
																	<input type="hidden" class="pntPortalId"
																	value="${patients.pntPortalId}"></td>
																<td>${patients.pname}<input type="hidden"
																	class="portalPntTitle" value="${patients.ptitle}">
																	<input type="hidden" class="portalPntName"
																	value="${patients.pname}"> <input type="hidden"
																	class="portalLastName" value="${patients.lName}">
																	<input type="hidden" class="portalPntAddr"
																	value="${patients.addr}"></td>
																<td>${patients.gender}<input type="hidden"
																	class="portalPntGender" value="${patients.gender}"></td>
																<td>${patients.age}<input type="hidden"
																	class="portalPntAge" value="${patients.age}"> <input
																	type="hidden" class="portalPntDob"
																	value="${patients.dob}"></td>
																<td>${patients.mobNum}<input type="hidden"
																	class="portalPntMobNum" value="${patients.mobNum}">
																	<input type="hidden" class="portalPntBloodGrp"
																	value="${patients.bloodGrp}"> <input
																	type="hidden" class="portalPntNationality"
																	value="${patients.nationality}"> <input
																	type="hidden" class="portalPntReligion"
																	value="${patients.religion}"> <input
																	type="hidden" class="portalPntIdType"
																	value="${patients.idType}"> <input
																	type="hidden" class="portalPntIdNum"
																	value="${patients.idNum}"> <input type="hidden"
																	class="portalPntOccupation"
																	value="${patients.occupation}"> <input
																	type="hidden" class="portalPntCareBy"
																	value="${patients.careBy}"> <input
																	type="hidden" class="portalPntCareByName"
																	value="${patients.careByName}"></td>
																<td align="center"><c:if
																		test="${patients.pntPortalRegSts == '0'}">
																		<button type="button"
																			class="btn btn-info viewPortalPat">
																			<i class="glyphicon glyphicon-eye-open"></i>
																		</button>
																	</c:if></td>
															</tr>
														</c:forEach>
													</tbody>

													<thead></thead>

												</table>

											</div>
										</div>
									</div>
									<div class="tab-pane" id="searchTab"
										style="position: relative;">

										<div id="searchDiv" style="height: 5px;">
											<button class="btn btn-warning" id="searchFilterId"
												style="display: none;">
												<i class="fa fa-search"> </i> search
											</button>
											<br>
											<div class="col-md-12" id="">
												<div id="fromDateDiv">
													<div class="control-group">
														<label class=" col-md-2 control-label"
															style="text-align: right;">Registered
															From&nbsp;&nbsp;&nbsp;&nbsp;:</label>
													</div>
													<div class="col-md-2 form-group inner-addon left-addon">
														<i class="glyphicon glyphicon-calendar"></i> <input
															class="form-control datepicker" type="text" id="fromDate" />
														<small id="errorFrom"
															style="color: #a94442; display: none;">Enter From
															Date</small> <small id="errorMsg"
															style="color: #a94442; display: none;">From date
															should be less than To date </small>
													</div>
													<div class="control-group">
														<label class=" col-md-2 control-label"
															style="text-align: right;">Registered
															To&nbsp;&nbsp;&nbsp;&nbsp;:</label>
													</div>
													<div class="col-md-2 form-group inner-addon left-addon">
														<i class="glyphicon glyphicon-calendar"></i> <input
															class="form-control datepicker" type="text" id="toDate" />
														<small id="errorMsgTo"
															style="color: #a94442; display: none;">To Date
															should be greater than From date </small>
													</div>
												</div>
												<!-- <div class="col-md-1"></div> -->
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;">UMR
														Number&nbsp;&nbsp;&nbsp;&nbsp;:</label>
												</div>
												<div class="col-md-2 form-group inner-addon left-addon">
													<i class="glyphicon glyphicon-search"
														style="padding-left: 8px; padding-top: 6px; color: #190707;"></i>
													<input type="text" class="form-control typeahead"
														name="umrNo" id="umrNo"
														pattern="^[A-Za-z]{1,15}[\s\.]{0,1}[A-Za-z\s]{2,28}$"
														autocomplete="off" placeholder="Search UMR" /> <small
														id="errumrNo" style="display: none; color: #A94442"></small>
												</div>
												<%-- <div class="col-md-2 form-group inner-addon left-addon">
													<i class="glyphicon glyphicon-search"
														style="padding-left: 8px; padding-top: 6px; color: #190707;"></i>
													<input type="text" class="form-control typeahead"
														name="umrNo" id="umrNo" pattern="" autocomplete="off"
														placeholder="Search UMR" /> <small id="errumrNo"
														style="display: none; color: #A94442"></small>
												</div> --%>
											</div>

											<div class="col-md-12">
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;"> Patient
														Name&nbsp;&nbsp;&nbsp;&nbsp;:</label>
												</div>
												<div class="col-md-2 form-group inner-addon left-addon">
													<i class="glyphicon glyphicon-search"
														style="padding-left: 8px; padding-top: 6px; color: #190707;"></i>
													<input type="text" class="form-control typeahead"
														name="pname" id="pname"
														pattern="^[A-Za-z]{1,15}[\s\.]{0,1}[A-Za-z\s]{2,28}$"
														autocomplete="off" placeholder="Search Patient Name" />
												</div>

												<!-- <div class="col-md-1"></div> -->
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;"> Mobile
														Number&nbsp;&nbsp;&nbsp;&nbsp;:</label>
												</div>
												<div class="col-md-2 form-group inner-addon left-addon">
													<i class="glyphicon glyphicon-phone"
														style="padding-left: 8px; padding-top: 6px; color: #190707;"></i>
													<input type="text" class="form-control typeahead"
														name="mobNum" id="mobNum" pattern="^[789]\d{9,11}$"
														autocomplete="off" placeholder="Search Mobile Number" />
												</div>

												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;"> Gender
														&nbsp;&nbsp;&nbsp;&nbsp;:</label>
												</div>
												<div class="col-md-2 form-group">
													<select class="form-control" id="gender" class="gender">
														<option value="">-select-</option>
														<option value="male">Male</option>
														<option value="female">Female</option>
														<option value="others">Others</option>
													</select>
												</div>

											</div>
											<div class="col-md-12">
												<div class="control-group" hidden>
													<label class=" col-md-2 control-label"
														style="text-align: right;">Date Of
														Birth&nbsp;&nbsp;&nbsp;&nbsp;:</label>
												</div>
												<div class="col-md-3 form-group inner-addon left-addon"
													hidden>
													<i class="glyphicon glyphicon-calendar"></i> <input
														class="form-control datepicker" type="text" id="dob" />
												</div>
												<div class="col-md-4"></div>
												<div class="col-md-1">
													<button class="btn btn-info " id="search">
														<i class="fa fa-search-plus">&nbsp;&nbsp;Search</i>
													</button>
												</div>
												<div class="col-md-1">
													<button class="btn btn-danger " id="cancel">
														<i class="fa fa-ban">&nbsp;&nbsp;Reset</i>
													</button>
												</div>
											</div>
										</div>

										<div class="col-md-12" hidden id="resultId">
											<div class="box-body">
												<div id="patientList"></div>
											</div>
										</div>
									</div>

									<div class="tab-pane" id="apptAdd" style="position: relative;">
										<form id="apptIdForm">
											<%-- action="/<s:message code="projectName"></s:message>/patient/registerPatient" 
											method="POST" --%>

											<div class="col-md-12" style="height: 10px"></div>
											<input type="hidden" id="pntPortalSts" name="pntPortalSts"
												value="0"> <input type="hidden" id="pntPortalId"
												name="pntPortalId" value="0">
											<div class="col-md-12" hidden>
												<input type="text" id="userOrgStatus"
													value="${userOrgStatus}"> <input type="text"
													id="userLocStatus" value="${userLocStatus}"> <input
													type="text" id="userDeptStatus" value="${userDeptStatus}">

												<input type="hidden" id="apptReportFromDt"
													name="apptFromDate" value="${reportFromDt}"> <input
													type="hidden" id="apptReportToDt" name="apptToDate"
													value="${reportToDt}">

												<c:choose>
													<c:when test="${userDeptStatus == '1'}">
														<input type="text" class="form-control" name="userLocId"
															id="apptLocId" value="${locDetails.locId}" readonly>
													</c:when>
													<c:otherwise>
														<input type="text" id="apptLocId" name="userLocId"
															value="${locId}">
													</c:otherwise>
												</c:choose>

												<input type="text" id="apptDeptId" name="userDeptId"
													value="${deptId}"> <input type="text"
													id="apptDeptDet" name="deptName" value="${deptName}">

												<input type="text" id="patApptSts" value="${patApptSts}">
											</div>

											<div class="col-md-12">

												<div class="col-md-2">
													<div class="col-md-12 responsivepic" id="patDetDiv" hidden>
														<h6>
															<font
																style="color: #007700; font-size: 14px; font-weight: 600;">Patient
																PIC:</font>
														</h6>
														<!-- <div class="box-body"> -->
														<div class="col-md-12">
															<div class=" pull-left" id="idRetake"
																style="display: none; padding-left: 80px;">
																<a id="retake" style="cursor: pointer;"> <i
																	class="fa fa-camera">Retake</i></a>
															</div>
														</div>

														<div class=" pull-left responsivepic">
															<div id="imgDiv"></div>
															<div id="snap">
																<canvas id="canvas"
																	style="height:150px; width:150px; background-size: 150px 150px; 
																	background-image:url(/<s:message code="projectName"></s:message>/resources/images/bkg.jpg)"></canvas>
																<img src="" id="picNameId"
																	style="height: 150px; width: 200px; display: none;">

																<video id="video" autoplay=""
																	style="height: 150px; width: 200px;"></video>
																<input type="hidden" class="form-control" name="picName"
																	id="pic" />
															</div>

														</div>
													</div>

													<div class="col-md-12 responsivepic" id="patDetDiv" hidden>
														<h6>
															<font
																style="color: #007700; font-size: 14px; font-weight: 600;">Attendee
																PIC:</font>
														</h6>
														<!-- <div class="box-body"> -->
														<div class="col-md-12">
															<div class=" pull-left" id="idRetakee"
																style="display: none; padding-left: 80px;">
																<a id="retakee" style="cursor: pointer;"> <i
																	class="fa fa-camera">Retake</i></a>
															</div>
														</div>

														<div class=" pull-left responsivepic">
															<div id="imgDivv"></div>
															<div id="snapp">
																<canvas id="canvass"
																	style="height:150px; width:150px; background-size: 150px 150px; 
																	background-image:url(/<s:message code="projectName"></s:message>/resources/images/bkg.jpg)"></canvas>
																<img src="" id="picNameIdd"
																	style="height: 150px; width: 200px; display: none;">

																<video id="videoo" autoplay=""
																	style="height: 150px; width: 200px;"></video>
																<input type="hidden" class="form-control"
																	name="picNamee" id="picc" />
																	<input type="hidden" id="pendingBillId" name="feeModel.billId">
															</div>

														</div>
													</div>

												</div>


												<div class="col-md-10">
													<div class="form-group col-md-12" hidden>
														<input type="text" class="form-control res"
															name="currentDate" id="currentDate"
															value=" <%=df.format(new java.util.Date())%>" readonly>
													</div>

													<div class="col-md-12">

														<div>
															<div class="col-md-12" style="">

																<!-- @Div - Used to display the Patients Previus visits -->
																<div class="col-md-12" id="patDetDiv">
																	<h6>
																		<font
																			style="color: #007700; font-size: 20px; font-weight: 600; margin-left: -229px;">Patient
																			Details:</font> <label id="regPatClass"style="margin-left: 58px;"> <!-- <input
																			id="regWise" class="patientDetailsSplit"
																			value="regWise" name="patientDetailsSplit"
																			type="radio"> --> <!--  <b style="color: black;">Registration
																				Data</b> -->
																		</label> <label class="form-radio form-icon btn btn-labeled btn-info" id="appPatClass" style="background-color: #d1e5f4;">
																		    <input id="apptWise" class="patientDetailsSplit" 
																		           value="apptWise" name="patientDetailsSplit" 
																		           type="radio"> 
																		    <b style="color: black; font-size: 16px;">Old Patient</b>
																		</label>
																		
																		<label class="form-radio form-icon btn btn-labeled btn-info" id="newAppPatClass" style="background-color: #d1e5f4;">
																		    <input id="newApptWise" class="patientDetailsSplit"
																		           value="newApptWise" name="patientDetailsSplit"
																		           type="radio"> 
																		    <b style="color: black; font-size: 16px;">New Patient</b>
																		</label>

																	</h6>
																	<div class="col-md-12"  id="patientDiv"
																		style="border: 1px solid #428bca; 
																		background: #d1e5f4; margin-left: -236px;width: 1330px;">
																		<div class="col-md-12" style="height: 15px "></div>

																		<div class="col-md-12 row"style=" margin-left: 1px;">


                             <!-- changes below from line 2199 to 2922 done by Sarath -->
																			<!-- Title -->
																			<div class="col-md-1 form-group">
																				<select class="form-control" name="ptitle" disabled
																					id="patientTitle"
																					style="color: rgb(255, 0, 0); font-size: 16px; width: 140px;">
																					<option value="0">Title</option>
																					<option value="Mr.">Mr.</option>
																					<option value="Miss.">Miss.</option>
																					<option value="Mrs.">Mrs.</option>
																					<option value="Baby Boy">Baby Boy</option>
																					<option value="Baby Girl">Baby Girl</option>
																					<!-- Hidden Duplicates -->
																					<option value="Mr" hidden>Mr.</option>
																					<option value="Miss" hidden>Miss.</option>
																					<option value="Mrs" hidden>Mrs.</option>
																					<option value="Baby Boy" hidden>Baby Boy</option>
																					<option value="Baby Girl" hidden>Baby Girl</option>
																				</select> <small id="patientTitleText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- New Patient Name (Hidden) -->
																			<div class="col-md-3 form-group"
																				id="newPatientNameDiv" hidden style="margin-left: 36px;">
																				<input type="text" class="form-control patientName"
																					name="patientName" autocomplete="off"
																					id="newPatientName" placeholder="New Patient Name"
																					pattern="^[A-Za-z\s\.]{2,45}$"
																					style="font-size: 16px;"
																					oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);">
																				<small id="newPatientNameText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- Patient Search -->
																			<div class="col-md-2 form-group" id="patientNameDiv">
																				<input type="text" class="form-control patientName"
																					name="patientName" autocomplete="off"
																					id="patientName" placeholder="Patient Search"
																					pattern="^[A-Za-z\s\.]{2,45}$"
																					style="font-size: 16px; color: rgb(0, 0, 0);"
																					oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);">
																				<small id="patientNameText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- Registered Patient (Hidden) -->
																			<div class="col-md-3 form-group"
																				id="regPatientNameDiv" hidden>
																				<input type="text"
																					class="form-control regPatientName"
																					name="regPatientName" autocomplete="off"
																					id="regPatientName"
																					placeholder="Reg Patient Search"
																					pattern="^[A-Za-z\s\.]{2,45}$"> <input
																					type="hidden" id="regPatientId" name="regPatientId"
																					value="0"> <input type="hidden"
																					id="suvRegPatientId" name="suvRegPatientId"
																					value="0"> <small id="regPatientNameText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- Last Name -->
																			<div class="col-md-2 form-group"style="margin-left: -5px;">
																				<input type="text" class="form-control lastName"
																					name="lName" id="lastName" placeholder="Last Name"
																					autocomplete="off"
																					style="font-size: 16px; color: rgb(0, 0, 0);"
																					disabled
																					oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);">
																				<!-- Hidden fields -->
																				<input type="hidden" id="patientId" name="patientId"
																					value="0"> <input type="hidden"
																					id="patientDummy" name="patientDummy" value="0">
																				<input type="hidden" id="manii" name="manii"
																					value="0"> <input type="hidden"
																					id="patientMobi" name="patientMobi" value="0">
																				<input type="hidden" id="organizationsId"
																					name="organizationsId" value="0"> <input
																					type="hidden" id="patientLike" name="patientLike"
																					value="0"> <input type="hidden"
																					id="patientCategoryOrgId"
																					name="patientCategoryOrgId" value="0"> <input
																					type="hidden" id="visitId" name="visitId" value="0">
																				<small id="lastNameText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- UMR No -->
																			<div class="col-md-2 form-group" id="umrDiv">
																				<input type="text" class="form-control"
																					name="umrSec" id="umrSec" placeholder="UMR NO"
																					autocomplete="off" pattern="^\d{1,3}$"
																					style="font-size: 16px; color: rgb(0, 0, 0);">
																				<small id="umrSecText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- Gender -->
																			<div class="col-md-1 form-group">
																				<select class="form-control" name="gender" 
																					id="genderVal"
																					style="color: rgb(255, 0, 0); font-size: 16px;">
																					<option value="" selected disabled="true">Gender</option>
																					<option value="MALE">Male</option>
																					<option value="FEMALE">Female</option>
																					<option value="OTHER">Other</option>
																				</select> <input type="text" id="patientGender" value="0"
																					style="width: 111px; height: 30px;" /> <small
																					id="patientGenderText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																			<!-- DOB -->
<div class="col-md-1 form-group inner-addon left-addon" style="width: 170px;">
  <i class="glyphicon glyphicon-calendar"></i>
  <input
    type="text" class="form-control" name="dob"
    id="pntDob" placeholder="DOB" autocomplete="off"
    style="font-size: 16px; color: rgb(0, 0, 0);" >
  <small id="pntDobText" style="color: #A94442; display: none;"></small>
</div>

<!-- Age: Years -->
<div class="col-md-1 form-group" style = width:80px>
  <input type="text" class="form-control" name="age" id="age"
    placeholder="Years" autocomplete="off"
    style="color: rgb(0, 0, 0); font-size: 16px; padding-right: 18px;">
  <span style="
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #888;
    pointer-events: none;
  ">Y</span>
  <small id="ageText" style="color: #A94442; display: none;"></small>
</div>

<!-- Age: Months -->
<div class="col-md-1 form-group" style = width:80px>
  <input type="text" class="form-control" name="ageMonths" id="ageMonths"
    placeholder="Months" autocomplete="off" pattern="^\d{1,3}$"
    style="color: rgb(0, 0, 0); font-size: 16px; padding-right: 18px;">
  <span style="
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #888;
    pointer-events: none;
  ">M</span>
  <small id="ageText" style="color: #A94442; display: none;"></small>
</div>

<!-- Age: Days -->
<div class="col-md-1 form-group" style = width:80px>
  <input type="text" class="form-control" name="ageDays" id="ageDays"
    placeholder="Days" autocomplete="off" pattern="^\d{1,3}$"
    style="font-size: 16px; color: rgb(0, 0, 0); padding-right: 18px;">
  <span style="
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #888;
    pointer-events: none;
  ">D</span>
  <small id="ageText" style="color: #A94442; display: none;"></small>
</div>


																		</div>

																		<!-- /.col-md-12 -->
																		<div class="col-md-12"style="margin-left: 15px;">
																			<div class="row">
																				<!-- Mobile No -->
																				<div
																					class="col-md-2 form-group inner-addon left-addon">
																					<i class="glyphicon glyphicon-phone"></i> <input
																						type="text" class="form-control" name="mobNum"
																						disabled autocomplete="off" id="pntMobNum"
																						maxlength="10" placeholder="Mobile No"
																						style="font-size: 16px; color: rgb(0, 0, 0);" />
																					<small id="pntMobNumText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Nationality -->
																				<div class="col-md-1 form-group">
																					<input type="text" name="nationality" id="pntNationality" value="Indian"
																						class="form-control" disabled
																						style="font-size: 16px;" readonly>
																						<!-- <option value="0">--Select Nationality--</option> -->
																						<!-- <option value="Indian" selected="selected">Indian</option> -->
																						<!-- <option value="American">American</option> -->
																						<!-- other options here -->
																					 <small id="pntNationalityText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- State -->
																				<div class="col-md-2 form-group">
    <select class="form-control selectMode state"
            name="state"
            id="state"
         
            data-placeholder="Select State"
            style="font-size: 16px;">
        <option value="">Select State</option>
    </select>

    <small id="stateText"
           style="color: #A94442; display: none;"></small>
</div>

																			
																		
<div class="col-md-2 form-group">
    <select class="form-control selectMode city singleChoosen"
            name="city"
            id="city"
            data-placeholder="Select City"
            style="font-size: 16px;">

        <option value="" selected>--Select City--</option>

        <c:forEach items="${citiesList}" var="city">
            <option value="${city.cityId}">
                ${city.city}
            </option>
        </c:forEach>

    </select>


    <small id="cityText"
           style="color: #A94442; display: none;"></small>
</div>



																				<!-- Village -->
																				<div class="col-md-2 form-group"style="width: 178px;">
																					<input type="text" class="form-control"
																						name="village" autocomplete="off" id="village"
																						disabled placeholder="Village"
																						style="font-size: 16px;" /> <small
																						id="errVlg" style="color: #F56954; display: none;">Select
																						village</small> <small id="villageText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Address -->
																				<div class="col-md-2 form-group">
																					<textarea class="form-control" name="addr" disabled
																						id="addr" placeholder="Address" rows="1" cols="10"
																						style="font-size: 16px; height: 29px;"></textarea>
																					<small id="addrText"
																						style="color: #A94442; display: none;"></small>
																					<input type="hidden" id="emp" />
																				</div>

																				<!-- Employee ID (Hidden) -->
																				<div class="col-md-1 form-group" id="divEmps"
																					style="display: none;">
																					<input type="text" placeholder="Employee ID"
																						class="form-control" id="empIds" /> <small
																						id="empIdsText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Referral Type -->
																				<div class="col-md-1 form-group">
																					<select class="form-control" name="refType"
																						id="refType" disabled
																						style="color: rgb(255, 0, 0); font-size: 16px;">
																						<c:forEach var="i" items="${refTypes}">
																							<option value="<c:out value='${i.pntCatId}' />">
																								<c:out value="${i.pntCat}" />
																							</option>
																						</c:forEach>
																					</select> <small id="refTypeText"
																						style="color: #A94442; display: none;"></small>
																				</div>
																			</div>
																		</div>


																		<div class="col-md-12"></div>



																		<div class="col-md-12"style="margin-top: -3px;">

																			<div class="col-md-3 form-group" hidden>
																				<select class="form-control selectMode country"
																					name="country" id="country">
																				</select> <small id="countryText"
																					style="color: #A94442; display: none;"></small>
																			</div>
																			<!-- <div class="col-md-1" style="margin-right: -50px"></div> -->


																			<%-- <div class="col-md-2 form-group">
																				<select name="religion" class="form-control"
																					id="pntReligion">
																					<option value="0">Religion</option>
																					<option value="Hindu">Hindu</option>
																					<option value="Muslim">Muslim</option>
																					<option value="Christian">Christian</option>
																				</select> <small id="pntReligionText"
																					style="color: #A94442; display: none;"></small>
																			</div> --%>
																			
																			<!-- <div class="col-md-1" style="margin-right: -50px"></div> -->

																				
																			<div class="col-md-2 form-group"
																				id="organizationsDiv">
																				<select
																					class="form-control singleChoosen" style="font-size: 16px;"
																					id="organizationsId" name="organizationsId">
																					<option value="0">Select Organization</option>
																					<c:forEach items="${organizationsList}" var="orgs">
																						<option value="${orgs.orgId}">${orgs.orgName}</option>
																					</c:forEach>
																				</select> <small id="organizationsIdText"
																					style="color: #A94442; font-size: 16px;"></small>
																			</div>




																			<div class="col-md-2 form-container"
																				id="patientCatDiv">
																				<div class="col-md-12 form-group" id="pntCatVal">
																					<select
																						class="form-control pntcat singleChoosen custom-select"
																						id="patientCat" name="pntCat">
																						<!-- Uncomment this if you want a default option -->
																						<!-- <option value="0">Patient Tariff</option> -->

																						<c:forEach items="${orgList}" var="org">
																							<option value="${org.orgId}">${org.orgName}</option>
																						</c:forEach>
																					</select> <input type="hidden" name="patientCategoryId"
																						id="categoryId" value="0"> <small
																						id="patientCatText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<input type="hidden" id="patCatName"
																					name="patCatName" value=""> <input
																					type="hidden" id="patCatNameId" name="patCatNameId"
																					value="0">
																			</div>



																			<div class="col-md-2 form-group me-2">
																				<!-- 'me-2' adds right margin -->
																				<select name="pntOccupation"
																					class="form-control selectMode" id="occupation"
																					disabled style="font-size: 16px; height: 33px;">
																					<option value="0">--Select Occupation--</option>
																					<option value="Farmer">Farmer</option>
																					<option value="Business">Business</option>
																					<option value="Employee">Employee</option>
																					<option value="House Wife">House Wife</option>
																					<option value="Labour">Labour</option>
																					<option value="Retired">Retired</option>
																					<option value="Self Employee">Self
																						Employee</option>
																					<option value="Student">Student</option>
																					<option value="Not Specified">Not
																						Specified</option>
																				</select> <small id="pntOccupationText"
																					style="color: #A94442; display: none;"></small>
																			</div>

																		<div class="col-md-1 form-group">

    <select name="idType"
            class="form-control selectMode"
            id="idType"
            style="font-size: 16px; height: 33px;">

        <option value="Aadhar">Aadhaar</option>
        <option value="MedCardNo">Medical Card</option>
        <option value="Pan">Pan</option>
        <option value="Voter">Voter</option>

    </select>

    <small id="idTypeText"
           style="color: #A94442; display: none;"></small>

</div>


																			<div class="col-md-2 form-group">
																					<input type="text" class="form-control mode"
																					style="font-size: 16px;height: 33px;"
																						placeholder="Enter ID Number" 
																						pattern="^[a-zA-Z\s\. 0-9]{0,25}$" id="idNum" 
																						
																						name="idNum"  autocomplete="off" maxlength="45" readonly
																		            	oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
																						/>
																					<small id="idNumText"
																						style="color: #A94442; display: none;"></small>
																				</div>
																	
                                                                           <div class="col-md-1 form-group">
																				<select class="form-control" name="careBy" disabled 
																				style="font-size: 16px;height: 33px;"
																					id="careBy">
																					<option value="0" style="font-size: 12px">Care By</option>
																					<option value="Father" style="font-size: 12px">Father</option>
																					<option value="Mother" style="font-size: 12px">Mother</option>
																					<option value="Husband" style="font-size: 12px">Husband</option>
																					<option value="Others" style="font-size: 12px">Others</option>
																					<!-- <option value="Wife">Wife</option>
																					<option value="Son">Son</option>
																					<option value="Daughter">Daughter</option>
																					<option value="Sister">Sister</option>
																					<option value="Brother">Brother</option> -->

																				</select> <small id="careByText"
																					style="color: #A94442; display: none;"></small>
																			</div>
																			
																			<div style="margin-left: -14pc;margin-top: -2px;" class="col-md-1 form-group"
																							id="otherHospDiv" hidden>
																							<div class="col-md-1" style="margin-left: 218px;width: 200px;font-size: 16px;">
																								<select class="form-control singleChoosen"
																									name="otherHospId" id="otherHospId">
																									<option value="0">Select Other
																										Hospital</option>
																									<c:forEach items="${otherHospList}"
																										var="otherHosps">
																										<option value="${otherHosps.otherHospId}">${otherHosps.otherHospName}</option>
																									</c:forEach>
																								</select> <small id="otherHospIdText"
																									style="color: #A94442; display: none;"></small>
																								<input type="hidden" name="otherHospName"
																									id="otherHospName" value="">
																							</div>
																							<div class="col-md-1"style="margin-left: 400px;margin-top: -50px;">
																								<button type="button" class="btn btn-info"
																									id="addOtherHosp"
																									title="Add New Other Hospital">
																									<i class="fa fa-plus-square"
																										style="font-size: 20px; height: 15px"></i>
																								</button>
																							</div>
																						</div>
																			
																			<%-- <div style="margin-left: 30pc;margin-top: -50px;" class="col-md-1 form-group"
																							id="otherHospDiv" hidden>
																							<div class="col-md-1" style="margin-left: 151px;width: 235px;font-size: 16px;">
																								<select class="form-control singleChoosen"
																									name="otherHospId" id="otherHospId">
																									<option value="0">Select Other
																										Hospital</option>
																									<c:forEach items="${otherHospList}"
																										var="otherHosps">
																										<option value="${otherHosps.otherHospId}">${otherHosps.otherHospName}</option>
																									</c:forEach>
																								</select> <small id="otherHospIdText"
																									style="color: #A94442; display: none;"></small>
																								<input type="hidden" name="otherHospName"
																									id="otherHospName" value="">
																							</div>
																							<div class="col-md-1"style="margin-left: 379px;margin-top: -49px;">
																								<button type="button" class="btn btn-info"
																									id="addOtherHosp"
																									title="Add New Other Hospital">
																									<i class="fa fa-plus-square"
																										style="font-size: 20px; height: 15px"></i>
																								</button>
																							</div>
																						</div> --%>
																						<div style="margin-left: -14pc;margin-top: -2px;" class="col-md-1 form-group"
																							id="otherStaffDiv" hidden>
																							<div class="col-md-1" style="margin-left: 210px;width: 235px;font-size: 16px;">
																								<select class="form-control singleChoosen"
																									name="otherStaffName" id="otherStaffName">
																									<option value="0">Select Other Staff</option>
																									<c:forEach items="${otherStaffList}"
																										var="otherStaffs">
																										<option value="${otherStaffs.otherStaffId}">${otherStaffs.otherStaffName}</option>
																									</c:forEach>
																								</select> <small id=""
																									style="color: #A94442; display: none;"></small>
																								
																							</div>
																							<div class="col-md-1"style="margin-left: 393px;margin-top: -51px;">
																								<button type="button" class="btn btn-info"
																									id="addOtherStaff"
																									title="Add New Other Staff">
																									<i class="fa fa-plus-square"
																										style="font-size: 20px; height: 15px"></i>
																								</button>
																							</div>
																						</div>
																		<div style="margin-left: 55pc;margin-top: -64px;"  class="col-md-1 form-group"
																							id="refDiv" hidden>
																							<div class="col-md-12" style="margin-left: 230px;
																							width: 200px;  font-size: 16px;">
																								<select class="form-control singleChoosen"
																									id="refId">
																									<option value="0">Staff Doctor's</option>
																									<%-- <c:forEach var="i" items="${docList}">
																										<option value="${i.doctorDetails}">${i.doctorName}</option>
																									</c:forEach> --%>
																									<c:forEach var="emp" items="${staffDoc}">
																										<option
																											value="<c:out value='${emp.empId }'></c:out>">
																											<c:out value='${emp.empName }'></c:out>
																										</option>
																									</c:forEach>
																								</select> <input type="hidden" name="refId" id="refIdVal"
																									value="0"> <input type="hidden"
																									name="refName" id="refName" value="0">
																								<small id="refIdText"
																									style="color: #A94442; display: none;"></small>
																							</div>
																						</div>
																		
																			
																		</div>

																		<div class="col-md-12" style="margin-top: -16px;margin-left: -75px;">
																			<div class="col-md-9 row">

																				<!-- Optional spacer -->
																				<div class="col-md-1"></div>

																				<!-- Parent/Husband Name -->
																				<div class="col-md-3">
																					<input type="text" class="form-control"
																						name="careByName" id="careByName"
																						placeholder="Parent/Husband Name"
																						autocomplete="off" disabled
																						style="font-size: 16px;"> <small
																						id="careByNameText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Religion -->
																				<div class="col-md-2 form-group">
																					<select name="religion" class="form-control"
																						disabled id="pntReligion" style="font-size: 16px;">
																						<option value="0">Religion</option>
																						<option value="Hindu">Hindu</option>
																						<option value="Muslim">Muslim</option>
																						<option value="Christian">Christian</option>
																					</select> <small id="pntReligionText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Marital Status -->
																				<div class="col-md-2 form-group">
																					<select name="maritalStatus"
																						class="form-control selectMode"
																						id="maritalStatusVal" disabled
																						style="font-size: 16px;">
																						<option value="0">Marital Status</option>
																						<option value="SINGLE" hidden>Single</option>
																						<option value="MARRIED" hidden>Married</option>
																						<option value="Single">Single</option>
																						<option value="Married">Married</option>
																					</select> <input type="hidden" id="pntMaritalStatus"
																						name="maritalStatusVal" value="0" /> <small
																						id="pntMaritalStatusText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Blood Group -->
																				<div class="col-md-2 form-group">
																					<select name="bloodGrp"
																						class="form-control selectMode" id="pntBloodGrp"
																						disabled style="font-size: 16px;">
																						<option value="0">Blood group</option>
																						<option value="O+">O +ve</option>
																						<option value="O-">O -ve</option>
																						<option value="A+">A +ve</option>
																						<option value="A-">A -ve</option>
																						<option value="B+">B +ve</option>
																						<option value="B-">B -ve</option>
																						<option value="AB+">AB +ve</option>
																						<option value="AB-">AB -ve</option>
																					</select> <small id="pntBloodGrpText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- Health Issue -->
																				<div class="col-md-3 form-group"style="  margin-left: 50pc; margin-top: -45px;">
																					<input type="text"
																						class="form-control clear varcharFormatValidation"
																						name="apptModel.pblmDesc" id="pblmDesc"
																						placeholder="Health Issue" autocomplete="off"
																						style="font-size: 16px;"> <small
																						id="pblmDescText" class="errClear"
																						style="color: #A94442; display: none;"></small>
																				</div>

																				<!-- SMS Notification -->


																				<!-- Hidden: Other Doctors Dropdown -->
																				<div class="col-md-4 form-group"
																					id="otherDoctorsDiv" hidden>
																					<div class="row">
																						<div class="col-md-10">
																							<select class="form-control singleChoosen"
																								id="otherDoctorId">
																								<option value="0">Select Other Doctors</option>
																								<c:forEach items="${otherDoctorsList}"
																									var="otherDocs">
																									<option value="${otherDocs.otherDoctorId}">${otherDocs.otherDoctorName}</option>
																								</c:forEach>
																							</select> <small style="color: #A94442; display: none;"></small>
																						</div>
																						<div class="col-md-2">
																							<button type="button" class="btn btn-info"
																								id="addOtherDoctor" title="Add New Other Doctor">
																								<i class="fa fa-plus-square"
																									style="font-size: 20px;"></i>
																							</button>
																						</div>
																					</div>
																				</div>

																				<!-- Hidden: Other Staff Dropdown -->
																				<div class="col-md-4 form-group" id="otherStaffDiv"
																					hidden>
																					<div class="row">
																						<div class="col-md-10">
																							<select class="form-control singleChoosen"
																								name="otherStaffId" id="otherStaffId">
																								<option value="0">Select Other Staff</option>
																								<c:forEach items="${otherStaffList}"
																									var="otherStaffs">
																									<option value="${otherStaffs.otherStaffId}">${otherStaffs.otherStaffName}</option>
																								</c:forEach>
																							</select> <input type="hidden" name="otherStaffName"
																								id="otherStaffName" value="">
																						</div>
																						<div class="col-md-1" style="margin-left: 393px;margin-top: -51px;">
																							<button type="button" class="btn btn-info"
																								id="addOtherStaff" title="Add New Other Staff">
																								<i class="fa fa-plus-square"
																									style="font-size: 20px;"></i>
																							</button>
																						</div>
																					</div>
																				</div>

																				<!-- Hidden: Authorized Person -->
																				<div class="col-md-3 form-group" hidden>
																					<select class="form-control" name="authPerson"
																						id="authPerson">
																						<option value="0">Authorized Person</option>
																						<c:forEach var="emp" items="${empList}">
																							<option value="<c:out value='${emp.empId}'/>">
																								<c:out value='${emp.empName}' />
																							</option>
																						</c:forEach>
																					</select> <small id="authPersonText"
																						style="color: #A94442; display: none;"></small>
																				</div>

																			</div>
																		</div>



																		<div id="demographics"style="margin-top: 16pc;margin-left: -176px;">
																			<div style="display: none;"
																				class="col-md-2 form-group" id="regDiv">
																				<input type="text" class="form-control" id="regDt">
																			</div>

<hr>
<hr>
																			<div class="col-md-12" id="patInfoDiv"
																				style="font-size: 15px;">
																				<div class="col-md-3"style="margin-left: 174px;margin-top: -44px;">
																					<font style="" id="">VISIT TYPE : </font> <font
																						style="color: green;" id="patInfoVisit"></font> <input
																						value="0" type="hidden" id="patVisitId"
																						name="patVisitId"> <input value="0"
																						type="hidden" id="docId" name="docId"> <input
																						value="0" type="hidden" id="reqDt"
																						name="scheduleDt">
																				</div>
																				<div class="col-md-5"style="margin-left: 379px;margin-top: -43px;">
																					<font style="" id="">REGISTRATION VALIDITY :
																					</font> <font style="color: green;"
																						id="patInfoRegValidSts">NO</font> - (<font
																						style="color: orange;" id="patInfoRegValidDt"></font>)


																				</div>


																				<div class="col-md-12" style="height: 10px;"></div>
																				<div class="col-md-12" id="patInfoDiv"
																					style="font-size: 15px;">

																					<div class="col-md-5"style="margin-left: 749px;margin-top: -50px;">
																						<font style="" id="">CONSULTANT VALIDITY :
																						</font> <font style="color: green;"
																							id="patInfoConsultValidSts">NO</font> - (<font
																							style="color: green;" id="patInfoConsulValidDt"></font>)


																					</div>

																				</div>
																			</div>
																		</div>
																		<div class="col-md-12" style="height: 10px;"></div>
																	</div>
																</div>

															</div>
														</div>
                                   <!-- changes above from line 2199 to 2922 done by Sarath -->

														<!-- <div class="col-md-3" id="apptPatientDetailsDiv">
															<div class="col-md-12" id="oldPatDetDiv">
																<h6>
																	<font
																		style="color: #007700; font-size: 12px; font-weight: 600;">Old
																		Patient Details:</font>
																</h6>
																<div class="col-md-12"
																	style="border: 1px solid #428bca;">
																	<div class="col-md-12" style="height: 10px"></div>

																	<div class="col-md-12" style="" id="preId">
																		<div id="divId">
																			<div id="resultSearch" class="results"
																				style="padding-right: 100px"></div>
																			<div id="preAppt" hidden></div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														
														
														<div class="col-md-3" id="regPatientDetailsDiv" hidden>
															<div class="col-md-12" id="oldRegPatDetDiv">
																<h6>
																	<font style="color: #007700; font-size: 12px; font-weight: 600;">Registration Patient Details:</font>
																</h6>
																<div class="col-md-12"
																	style="border: 1px solid #428bca;">
																	<div class="col-md-12" style="height: 10px"></div>

																	<div class="col-md-12" style="" id="regPreId">
																		<div id="regDivId">
																			<div id="regResultSearch" class="regResults"
																				style="padding-right: 100px"></div>
																			<div id="regPatientList" hidden></div>
																		</div>
																	</div>
																</div>
															</div>
														</div> -->
													</div>
													<div class="col-md-12">
														<div class="col-md-7">
															<div class="col-md-12" id="apptDetDiv" >
																<h6>
																	<font
																		style="color: #007700; font-size: 20px; font-weight: 600; margin-left: -231px;">Appointment
																		Details:</font>
																</h6>
																<div class="col-md-12"
																	style="border: 1px solid #428bca;  background: #D1E5F4; margin-left: -237px;">
																	<div class="col-md-12" style="height: 10px"></div>
																	<!-- div Loc -->
																	<div class="col-md-12">
																		<div class="col-md-6 form-group" id="divLoc" style="">
																			<select class="form-control"  disabled
																				id="idLocation" name="apptModel.locId"style="font-size: 16px;">
																				<option value="0">Select Location</option>

																				<c:forEach items="${locList}" var="i">
																					<option value="${i.locId}">${i.location}</option>
																				</c:forEach>
																			</select> <small style="color: #A94442; display: none;"
																				id="idLocationText">Select Location</small> <input
																				type="hidden" class="form-control" id="locId"
																				value="0">
																		</div>
																		<div
																			class="col-md-3 inner-addon left-addon form-group"
																			style="">
																			<i class="glyphicon glyphicon-calendar"></i> <input
																				type="text" class="form-control"
																				name="apptModel.scheduleDt" id="scheduleDt"
																				placeholder="Select date" disabled
																				autocomplete="off"style="font-size: 16px;">
																			<!-- <input value="0"
																					type="text" id="dateSch" name="dateSch"> -->
																			<small style="color: #A94442; display: none;"
																				id="scheduleDtText">Select Schedule Date </small>
																		</div>
																		<div class="col-md-3 form-group">
																			<input type="text" class="form-control"
																				name="apptModel.tokenNum" id="tokenValue"
																				placeholder="Token" readonly autocomplete="off"style="font-size: 16px;">
																			<small id="tokenValueText"
																				style="color: #A94442; display: none;"></small>
																		</div>

																	</div>

																	<div class="col-md-12">

																		<div class="col-md-6 form-group " id="divEmp" style="">
																			<select class="form-control idDoctor singleChoosen"
																				id="idDoctor"style="font-size: 16px;" disabled>
																				<option value="0">Select Consultant</option>
																				<c:forEach var="i" items="${docList}">
																					<option value="${i.doctorDetails}">${i.doctorName}</option>
																					<%-- <option value="<c:out value="${i.doctorId }"/>">
																						<c:out value="${i.doctorName }" />
																					</option> --%>
																				</c:forEach>
																			</select> <input type="hidden" id="idDoctorVal"
																				name="apptModel.empId" value="0" /> <small
																				style="color: #A94442; display: none;"
																				id="idDoctorText">Select Consultant</small>
																		</div>
																		<div class="col-md-3 form-group">
																			<input type="text" class="form-control" id="empCode"
																				placeholder="Doctor Code" readonly
																				autocomplete="off"style="font-size: 16px;"> <small id="empCodeText"
																				style="color: #A94442; display: none;"></small>
																		</div>
																		<div class="col-md-3 form-group">
																			<input type="text" class="form-control" id="specName"
																				placeholder="Specilization" readonly
																				autocomplete="off"style="font-size: 16px;"> <small id="specNameText"
																				style="color: #A94442; display: none;"></small>
																		</div>
																	</div>



																</div>
															</div>

															<input type="hidden" readonly="readonly"
																class="form-control timepicker1" id="startTime"
																name="apptModel.scheduleTime"> <input
																type="hidden" readonly="readonly"
																class="form-control timepicker1" id="endTime"
																name="apptModel.scheduleEndTime">

															<div class="col-md-12" id="docSlotsMainDiv">
																<div class="col-md-12" id="docSlotsDiv" style="margin-left: -240px;"hidden>
																	<h6>
																		<font
																			style="color: #007700; font-size: 21px; font-weight: 600;">Doctor
																			Slots Details:</font>
																	</h6>
																	<div class="col-md-12"
																		style="border: 1px solid #428bca; background: #d1e5f4;">
																		<div class="col-md-12" style="height: 10px"></div>

																		<div class="col-md-12 slimScrollDocSlotsDiv"
																			style="overflow-y: scroll; height: 150px;">
																			<div id="docSlots"></div>
																		</div>

																		<div class="col-md-12" style="height: 10px"></div>
																	</div>
																</div>

															</div>
															<div class="col-md-12" style="height: 10px"></div>
															<div class="col-md-7" id="addExtraTokensDiv" hidden>
																<div class="col-md-5"style="width: 215px;margin-left: -241px;">
																	<h6>
																		<font
																			style="color: #007700; font-size: 21px; font-weight: 600;">Add
																			Extra Tokens:</font>
																	</h6>
																</div>

																<div class="col-md-2">

																	<button type="button" class="btn btn-info"
																		id="addExtraTokens" title="Add Extra Tokens">
																		<i class="fa fa-plus-square"
																			style="font-size: 20px; height: 15px"></i>
																	</button>
																</div>
															</div>
															<div class="col-md-12" id="extraDocSlotsMainDiv" hidden>
																<div class="col-md-12" id="extraDocSlotsDiv"style="margin-left: -240px;">
																	<h6>
																		<font
																			style="color: #007700; font-size: 21px; font-weight: 600;">Doctor
																			Extra Slots Details:</font>
																	</h6>
																	<div class="col-md-12"
																		style="border: 1px solid #428bca; background: #D1E5F4; ">
																		<div class="col-md-12" style="height: 10px"></div>

																		<div class="col-md-12 slimScrollDocSlotsDiv"
																			style="overflow-y: scroll; height: 150px;">
																			<div id="extraDocSlots"></div>
																		</div>

																		<div class="col-md-12" style="height: 10px"></div>
																	</div>
																</div>

															</div>

														</div>


														<div class="col-md-5">
															<div class="col-md-12">
																<input type="hidden" id="opBillId" value="${opBillId}">
																<input type="hidden" value="${regStatus }"
																	id="feeStatus" name="feeModel.regStatus"> <input
																	type="hidden" id="regDivSts" name="regDivSts"
																	value="${regDivSts}"> <input type="hidden"
																	id="recptNo" name="recptNo" value="${recptNo}">
																<input type="hidden" id="restrictResubmission"
																	name="restrictResubmission" value="1">
																<div class="col-md-12" id="feeDetDiv"style="margin-left: -225px;font-size: 16px;width: 683px;">
																	<h6>
																		<font
																			style="color: #007700; font-size: 21px; font-weight: 600;">Fee
																			Details:</font>
																	</h6>
																	<!-- <div class="col-md-2" id="regDivv">
																		<button class="btn btn-primary" id="noConsFee"
																			style="text-align: right;">
																			<i class="fa fa-print"></i>No Consultation Fee
																			Bill
																		</button>
																	</div> -->
																	<div class="col-md-12"
																		style="border: 1px solid #428bca; background: #D1E5F4;">
																		<div class="col-md-12" style="height: 10px"></div>

																		<%-- <c:if
																			test="${regStatus == 'REG' || regStatus == 'BEFCONS' }"> --%>
																		<div class="col-md-12" id="regFeeDiv">
																			<div class="col-md-4 form-group">
																				<label class="control-label">Registration
																					Fee&nbsp;&nbsp;:</label> <input class="form-control"
																					id="regFee" name="feeModel.regFee" readonly
																					style="text-align: right;" type="text"> <small
																					id="errFee" style="color: #a94442; display: none; ">Enter
																					Fee</small>
																			</div>
																			<div class="col-md-2 form-group" hidden>
																				<label class="control-label">Disc(%)&nbsp;&nbsp;:</label>
																				<input class="form-control" id="discount"
																					class="discount" style="text-align: right;"
																					name="feeModel.regDiscount" placeholder="Fee"
																					value="0.00" type="text" autocomplete="off">
																				<small id="feeDiscountText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<div class="col-md-2 form-group" hidden>
																				<label class="control-label">Disc(₹)&nbsp;&nbsp;:</label>
																				<input class="form-control" id="discountAmount"
																					name="feeModel.regDiscountAmount"
																					style="text-align: right;" placeholder="Fee"
																					value="0.00" type="text"> <small
																					id="feeDiscountAmtText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<div class="col-md-4 form-group">
																				<label class="control-label">Reg Final
																					Amount&nbsp;&nbsp;:</label> <input readonly
																					class="form-control" id="amount"
																					style="text-align: right;"
																					name="feeModel.regAmount" placeholder="Fee"
																					value="0.00" type="text" autocomplete="off">
																			</div>
																		</div>
																		<input type="hidden" name="feeModel.consStatus"
																			value="0" id="consStatus">
																		<%-- <c:if test="${consStatus == 'REG' || consStatus == 'BEFCONS' }"> --%>
																		<div class="col-md-12" id="consFeeDetails">
																			<div class="col-md-4 form-group">
																				<label class="control-label">Consultation
																					Fee&nbsp;&nbsp;:</label> <input class="form-control"
																					id="consFee" name="feeModel.consFee" value="0.00"
																					style="text-align: right;" readonly type="text">
																				<small id="errConsFee"
																					style="color: #a94442; display: none;">Enter
																					Fee</small> <input type="hidden" id="visitType"
																					name="visitType" value="0">
																			</div>
																			<div class="col-md-2 form-group">
																				<label class="control-label">Disc(%)&nbsp;&nbsp;:</label>
																				<input class="form-control" id="consDiscount"
																					autocomplete="off" name="feeModel.consDiscount"
																					placeholder="" value="0.00" type="text"
																					style="text-align: right;"> <small
																					id="consDiscountText"
																					style="color: #A94442; display: none"></small>

																			</div>
																			<div class="col-md-2 form-group">
																				<label class="control-label">Disc(₹)&nbsp;&nbsp;:</label>
																				<input style="text-align: right;"
																					class="form-control" id="consDiscountAmount"
																					name="feeModel.consDiscountAmount"
																					placeholder="Fee" value="0.00" type="text"
																					autocomplete="off"> <small
																					id="consDiscountAmtText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<div class="col-md-4 form-group">
																				<label class="control-label">Cons Final
																					Amount&nbsp;&nbsp;:</label> <input readonly
																					class="form-control" style="text-align: right;"
																					id="consAmount" name="feeModel.consAmount"
																					placeholder="Fee" value="0.00" type="text">
																			</div>
																		</div>
																		<%-- </c:if> --%>
																		<input type="hidden" id="doctor"
																			name="feeModel.doctor">
																		<div class="col-md-12" id="totDiv">

																			<div class="col-md-4 form-group">
																				<label>Total Amount:</label> <input
																					class="form-control" id="totAmt"
																					name="feeModel.totAmt" placeholder="Total Amount"
																					style="text-align: right;" value="0.00"
																					autocomplete="off" type="text" readonly> <small
																					id="totAmtText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<div class="col-md-2 form-group">
																				<label>Disc(%):</label> <input class="form-control"
																					id="totDiscount" autocomplete="off"
																					name="feeModel.totDiscount"
																					placeholder="Total Discount %"
																					style="text-align: right;" value="0.00"
																					autocomplete="off" type="text"> <small
																					id="totDiscountText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<div class="col-md-2 form-group">
																				<label>Disc(₹):</label> <input class="form-control"
																					id="totDiscountAmt" autocomplete="off"
																					name="feeModel.totDiscountAmt"
																					placeholder="Total Discount Amount"
																					style="text-align: right;" value="0.00"
																					autocomplete="off" type="text"> <small
																					id="totDiscountAmtText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<div class="col-md-4 form-group">
																				<label>Total Bill Amount:</label> <input type="text"
																					class="form-control" id="billAmt"
																					name="feeModel.billAmt" placeholder="Bill Amount"
																					autocomplete="off" style="text-align: right;"
																					value="0.00" autocomplete="off" readonly>
																			</div>
																		</div>
																		<div class="col-md-12">
																			<div class="col-md-3 form-group">
																				<label>Amt Received:</label> <input
																					class="form-control" id="amountReceived"
																					name="feeModel.amtRecd"
																					placeholder="Enter Amount..."
																					style="text-align: right;" value="0.00"
																					autocomplete="off" type="text" readonly /> <small
																					id="amountReceivedText"
																					style="color: #A94442; display: none"></small>
																			</div>
																			<!-- <div class="col-md-3">
																				<label class="control-label">Change_Given:</label> <input
																					class="form-control" value="0.00" id="chngGiven"
																					name="feeModel.chngGiven" pattern="" placeholder=""
																					readonly style="text-align: right;" type="text">
																			</div> -->
																			<div class="col-md-3">
																				<label for="" class="control-label">Balance:</label>
																				<input class="form-control" name="feeModel.bal"
																					id="balance" value="0.00" placeholder="" title=""
																					readonly style="text-align: right;" type="text">
																			</div>
																			<div class="col-md-3">
																				<label for="" class="control-label">Status:</label>
																				<input class="form-control"
																					name="feeModel.billStatus" id="status" readonly
																					value="pending" style="text-align: right;"
																					type="text"> <small id="statusText"
																					style="color: #A94442; display: none"></small>
																			</div>
																				<!-- <div class="col-md-3 form-group" id="dueAmtDiv">
																				<label>Due Amount:</label> <input type="text"
																					class="form-control" id="dueAmt"
																					name="feeModel.dueAmt" placeholder="Due Amount"
																					autocomplete="off" style="text-align;"
																					value="0.00" autocomplete="off" readonly>
																			</div> -->
																<div class="col-md-3 form-group" id="authorizedByDiv">
    <label>Authorized By:</label>
    <select class="form-control authorizedBy singleChoosen"
        id="authorizedBy" name="feeModel.authorizedBy">
        <option value="0">Select Authorized By</option>
        <c:forEach var="i" items="${AuthorizedList}">
            <option value="${i.empName}">${i.empName}</option>                                                          
        </c:forEach>
    </select>

    <small style="color: #A94442; display: none;" id="authorizedByText">
        Select Authorized list
    </small>
</div>
																		<%-- 	<div class="col-md-6 form-group " id="divEmp" style="">
																			<select class="form-control idDoctor singleChoosen"
																				id="idDoctor"style="font-size: 16px;" disabled>
																				<option value="0">Select Consultant</option>
																				<c:forEach var="i" items="${docList}">
																					<option value="${i.doctorDetails}">${i.doctorName}</option>
																					<option value="<c:out value="${i.doctorId }"/>">
																						<c:out value="${i.doctorName }" />
																					</option>
																				</c:forEach>
																			</select> <input type="hidden" id="idDoctorVal"
																				name="apptModel.empId" value="0" /> <small
																				style="color: #A94442; display: none;"
																				id="idDoctorText">Select Consultant</small>
																		</div>
																			 --%>

																			<div style="" class="col-md-12" id="discAuthDiv"
																				hidden>
																				<div class="col-md-6 form-group">
																					<label class="control-label">Discount
																						authorized By:&nbsp;&nbsp;</label> <select
																						class="form-control singleChoosen"
																						name="disStaffId" id="disStaffId">
																						<option value="0">Discount authorized</option>
																						<!-- <option value="0">Select Other Hospital</option> -->
																						<c:forEach items="${otherStaffList}"
																							var="otherStaffs">
																							<option value="${otherStaffs.otherStaffId}">${otherStaffs.otherStaffName}</option>
																						</c:forEach>
																					</select> <small id="disStaffIdText"
																						style="color: #A94442; display: none;"></small> <input
																						type="hidden" name="discStaffName"
																						id="discStaffName" value="">
																				</div>
																				<div class="col-md-6">
																					<label class="col-md-4 control-label">Remarks:&nbsp;&nbsp;</label>
																				</div>
																				<div class="col-md-6">
																					<textarea class="form-control" id="remarks"
																						rows="2" cols="50" name="remarks" value="0"
																						style="margin: 0px -13.3438px 0px 0px; width: 175px; height: 38px;"></textarea>
																				</div>

																			</div>
																		</div>
																	</div>

																	<div class="col-md-12">&nbsp;</div>
																</div>
																<div class="col-md-12">

																	<div class="col-md-1" id="paymentGet" hidden>
																		<!-- 	<button onclick="anyEmiFunction()">Make a Payment"</button> -->
																		<input type="button"
																			style="font-face: 'Comic Sans MS'; font-size: larger; color: Yellow; background-color: green;"
																			value="Get a Payment" id="getanyEmiPay">
																	</div>

																	<div class="col-md-1"></div>
																	<div class="col-md-1" id="paymentPost" hidden>
																		<input type="button"
																			style="font-face: 'Comic Sans MS'; font-size: larger; color: black; background-color: green;"
																			value="Make a Payment" id="anyEmiPay">
																	</div>

																	<div class="col-md-2"></div>
																	<div class="col-md-1" id="paymentrefresh" hidden>
																		<button type="button" id="payrefresh"
																			style="font-size: 10px; background-color: black; padding: 1px 2px; color: skyblue;"
																			value="0">
																			<i class="fa fa-refresh"></i>
																		</button>
																	</div>

																	<div class="col-md-1"></div>
																	<div class="col-md-1" id="paymentlink" hidden>
																		<button type="button"
																			style="font-face: 'Comic Sans MS'; font-size: larger; color: white; padding: 1px 2px; background-color: #4CAF50;"
																			value="payment link" id="paylink">
																			PaymentLink</button>
																	</div>

																	<div class="col-md-1" id="getpaymentlink" hidden>
																		<button type="button"
																			style="font-face: 'Comic Sans MS'; font-size: larger; color: black; padding: 1px 2px; background-color: green;"
																			value="Getpayment link" id="getPaylink">
																			GetPaymentLink</button>
																	</div>

																	<div class="col-md-3"></div>
																	<div class="col-md-1" id="paymentlinkrefresh" hidden>
																		<button type="button" id="paylinkrefresh"
																			style="font-size: 10px; background-color: black; padding: 1px 2px; color: skyblue;"
																			value="0">
																			<i class="fa fa-refresh"></i>
																		</button>
																	</div>


																</div>
																<div class="col-md-12" id="feeDetDiv"style="margin-left: -222px;font-size: 16px;width: 683px;">

																	<font
																		style="color: #007700; font-size: 21px; font-weight: 600;">Payment
																		Type</font>

																	<div class="col-md-12" style="height: 10px"></div>

																	<div class="col-md-12"
																		style="border: 1px solid #428bca; background: #D1E5F4;">
																			<table id="payModeTable"
																					class="table table-bordered table-striped dataTable payModeTableee">

																					<thead
																						style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)">
																						<tr>
																			<th style="text-align: center" width="10px">
																				Mode</th>
																			<th style="text-align: center">Amt</th>
																			<th style="text-align: center" class="cardTypeeee" hidden>Card Type</th>
																			<th style="text-align: center" class="cardNOOOOOOOO" hidden>Trans Id.</th>
												   						 <th  class="cardBankNameeee" hidden>Card Bank Name</th> 
																			
																			<!-- <th style="text-align: center" >Bank Name</th> -->
																			<th style="text-align: center" class="cardBankExpireDt" hidden>Expire Dt</th>
																			<th></th>

																		</tr>
																					</thead>
																					<tbody>


																						
																						<tr>
																			<td><select class="form-control singleChoosen creditPt"
																				id="creditPt" name="cashPt">
																					<option value="0">--Select--</option>
																					<option value="275">Cash</option>
																					<option value="276">CARD</option>
																					<option value="277">UPI</option>

																			</select><small id="ccreditPtText"
																				style="color: #A94442; display: none;"></small></td>
																			<td>               <input type="text"
																								class="form-control amount" placeholder=""
																								id="creditAmount" name="amount"
																								autocomplete="off" maxlength="45" value="0.00" /> <small
																								id="creditAmountText"
																								style="color: #A94442; display: none;"></small>

																								<input
																								type="hidden" name="adjustAmtdueee" id="adjustAmtdueee"
																								value=" ">
																								<input
																								type="hidden" name="bankName" id="casht"
																								value=" "> <input type="hidden"
																								name="chequeDate" id="cashDate" value=" ">
																								<input
																								type="hidden" name="transNo" id="cardt"
																								value=" "><small
																								id="creditAmountText"
																								style="color: #A94442; display: none;"></small>
																								
																			</td>
																			<td class="cardTypeeee" hidden><select class="form-control singleChoosen"
																				id="cardcardType" name="cardType">
																					<option value="0">--Select--</option>
																					<option value="Credit">Credit</option>
																					<option value="Debit">Debit</option>

																			</select><small id="creditCardTypeText"
																				style="color: #A94442; display: none;"></small></td>
																			              <td class="cardNOOOOOOOO" hidden><input type="text"
																								class="form-control mode"
																								placeholder="Enter Card Number"
																								id="creditNo" name="creditNo"
																								autocomplete="off" maxlength="45" value="" /> <small
																								id="creditChqCardNoText"
																								style="color: #A94442; display: none;"></small></td>




                                                                                          <td class="cardBankNameeee" hidden><select
																								class="form-control singleChoosen"
																								id="cardBankName" name="cardBankNames">
																									<option value="0">-select-</option>
																									<c:forEach items="${paymentModeList}" var="org">
																										<option value="${org.bankId}">${org.bankNames}</option>
																									</c:forEach>

																							</select> <small id="chqBankNameText"
																								style="color: #A94442; display: none;"></small>
																							</td>
																			
																			<td class="cardBankExpireDt" hidden><input type="text"
																				style="text-align: center;" class="form-control"
																				placeholder="MM/YYYY" id="creditDate"
																				name="expDate" autocomplete="off" maxlength="45"
																				value="" /> <small id="creditDateText"
																				style="color: #A94442; display: none;"></small></td>
																				
																				<td align="center" id="addPaymentTd">
																<button type="button" id="addPayments"
																	class="btn btn-primary">
																	<i class="fa fa-plus"></i>
																</button>
															</td>

																		</tr>
																					</tbody>
																					<tfoot id="paymentsTffotAmm"></tfoot>
																				</table>
																			


																	</div>


																</div>


															</div>
														</div>

													</div>
												</div>

											</div>



											<div class="col-md-12">
												<div class="col-md-6"></div>
												<div class="col-md-1"style="margin-top: 9px;">
													<button type="button" class="btn btn-success"
														style="font-size: larger; padding: 1px 2px; color: black; background-color: 15ca15;"
														id="saveButton">
														<i class="fa fa-save"></i>&nbsp;&nbsp;Save
													</button>
												</div>
											</div>

										</form>

									</div>

								</div>
							</div>
						</section>
					</div>
				</div>

				<!-- rescheduleAppt -->
				<div id="rescheduleAppt" class="modal fade" tabindex="-1"
					style="padding-top: 100px;">
					<!-- POP UP code -->
					<div class="modal-dialog">

						<div class="modal-content">
							<div class="modal-header">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Patient Arrival Status</h4>
							</div>
							<div id="modalBody" class="modal-body">

								<div class="col-md-12">
									<div class="col-md-12" style="border: 1px solid #a1a1a1;">
										<div class="col-md-12" style="height: 10px"></div>
										<div class="col-md-2"></div>
										<c:forEach var="schButtons" items="${statusDetails }"
											varStatus="loopCounter">
											<%-- ${schButtons.visitStatus} --%>
											<c:if
												test="${schButtons.visitStatus != 'Scheduled' || schButtons.visitStatus != 'Rescheduled' 
													|| schButtons.visitStatus != 'ConsReVisit' || schButtons.visitStatus != 'ConsReVisitN'}">
												<div class="col-md-1 apptStatus">
													<button type="button"
														class='btn btn-icon btn-circle arrivalStatus <c:out value="${schButtons.statusIcon }"/>'
														data-toggle="tooltip"
														data-original-title='<c:out value="${schButtons.visitStatus }"/>'
														id='<c:out value="${schButtons.visitStatus }"/>'
														value='<c:out value="${schButtons.visitStatus }"/>'
														style='background-color:<c:out value="${schButtons.statusBgColor }"/>;'></button>
												</div>
											</c:if>
										</c:forEach>
										<div class="col-md-1"></div>
										<div class="col-md-4">
											Patient Status: <input type="text" id="updtStatusVal"
												class="form-control" readonly> <input type="hidden"
												id="pntPrevUpdtStatusVal" class="form-control" readonly>
										</div>
										<div class="col-md-12" style="height: 10px"></div>
									</div>

									<div class="col-md-12" style="height: 10px"></div>

									<div class="col-md-12" style="border: 1px solid #a1a1a1;"
										hidden>
										<form action="" id="cancelApptForm" method="POST">
											<input type="hidden" name="apptId" id="cancelApptId" value="0">
											<input type="hidden" name="locId" id="cancelLocId" value="0">
											<input type="hidden" name="empId" id="cancelEmpId" value="0">
											<input type="hidden" id="cancelVisitSts" name="visitStatus"
												value="Cancelled">
											<div id="cancelApptDiv">
												<div class="col-md-12">
													<div class="control-group">
														<label class="col-md-2 control-label">Refund:</label>
													</div>
													<div class="col-md-2 form-group">
														<input class="form-control" id="refundd" name="refund"
															style="text-align: right;" type="text"
															readonly="readonly" value="0">
													</div>
													<div class="control-group">
														<label class="col-md-2 control-label">Cancellation
															Charges:</label>
													</div>
													<div class="col-md-2 form-group">
														<input class="form-control" id="canChrgs" name="charges"
															style="text-align: right;" type="text" value="0">
													</div>
												</div>
												<div class="col-md-12">
													<div class="control-group">
														<label class="col-md-2 control-label">To be
															Refunded:</label>
													</div>
													<div class="col-md-2 form-group">
														<input class="form-control" id="toBeRefund"
															name="toBeRefund" style="text-align: right;" type="text"
															readonly="readonly" value="0">
													</div>
													<div class="col-md-5 form-group">
														<label>Authorized By:</label> <select
															class="form-control authorizedBy singleChoosen"
															id="authorizedBy" name="authorizedBy">
															<option value="0">Select Authorized By</option>
															<c:forEach var="i" items="${AuthorizedList}">
																<option value="${i.empName}">${i.empName}</option>
															</c:forEach>
														</select>
													</div>
													<div class="col-md-3 form-group">
													<label>Remarks:</label>
														<input class="form-control" id="remarksss"
															name="remarksss" type="text">
													</div>

												</div>
											</div>
										</form>
									</div>
									<form action="" id="visitStatusForm" method="POST">
										<input type="hidden" id="scheduleApptId" name="apptId"
											value="0"> <input type="hidden" id="apptVisitSts"
											name="visitStatus">
									</form>
									<form action="" id="reschApptForm" method="POST">
										<input type="hidden" id="reschPatientId" name="patientId"
											value="0"> <input type="hidden" id="reschApptId"
											name="apptId" value="0"> <input type="hidden"
											id="reschEmpId" name="empId"> <input type="hidden"
											id="reschLocId" name="locId"> <input type="hidden"
											id="reschVisitSts" name="visitStatus">
										<div id="reschApptDiv" style="display: none;">
											<div class="col-md-12">
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;">Patient Name :</label>
												</div>
												<div class="col-md-3 form-group">
													<input class="form-control" type="text"
														id="reschPatientName" readonly="readonly" />
												</div>
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;">Consultant :</label>
												</div>
												<div class="col-md-3 form-group">
													<input class="form-control" type="text"
														id="reschConsultant" readonly="readonly" />
												</div>
											</div>
											<div class="col-md-12">
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;">Location :</label>
												</div>
												<div class="col-md-3 form-group">
													<input class="form-control" type="text" id="reschLocation"
														readonly="readonly" />
												</div>
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;">Schedule Dt :</label>
												</div>
												<div class="col-md-3 form-group">
													<input class="form-control datepicker" type="hidden"
														id="reschFromDt" name="reschFromDt" /> <input
														class="form-control datepicker" type="text" id="reschDate"
														name="scheduleDt" />
												</div>
											</div>

											<div class="col-md-12">
												<div class="control-group">
													<label class=" col-md-2 control-label"
														style="text-align: right;">Token :</label>
												</div>
												<div class="col-md-3 form-group">
													<input class="form-control" type="text" id="schtokenValue"
														readonly="readonly" name="tokennNum" /> <input
														type="hidden" id="schstartTime" name="scheduleTime">
													<input type="hidden" id="schendTime" name="scheduleEndTime">
												</div>
												<div class="control-group" hidden>
													<label class=" col-md-2 control-label"
														style="text-align: right;">Health Issue :</label>
												</div>
												<div class="col-md-3 form-group">
													<input class="form-control" type="text" name="problemDesc" />
												</div>
											</div>
											<div id="reschAvailSlots"></div>
										</div>

									</form>
								</div>
							</div>

							<div class="modal-footer">
								<button class="btn btn-default" data-dismiss="modal"
									type="reset">Cancel</button>
								<button class="btn btn-primary btn-sm" type="submit"
									id="visitStsBtn">OK</button>
							</div>

						</div>
					</div>
				</div>

				<div class="modal fade" tabindex="-1" style="padding-top: 100px;"
					id="deleteConfirm" role="dialog" aria-labelledby="myModalLabel"
					aria-hidden="true">
					<div class="modal-dialog modal-md">

						<div class="modal-content">
							<div class="modal-header">
								<div class="modal-title">
									<button type="button" class="close" data-dismiss="modal">
										<span aria-hidden="true">×</span> <span class="sr-only">close</span>
									</button>
									<h4 class="modal-title">Update Status Confirmation</h4>
									<!-- <input type="hidden" id="delIndexAllergy" name="" class="delIndexAllergy" value="0"> -->
								</div>
							</div>

							<div class="modal-body">
								<h4 id="myModalLabel">
									Are you sure you want to Update the status to <font
										id="updtStatusFont" style="color: red"></font>?
								</h4>
							</div>

							<div class="modal-footer">
								<div class="row">
									<div class="col-md-8"></div>
									<div class="col-md-1">
										<button id="yesDelete"
											class="btn btn-success pull-right closeb" type="button">Yes</button>
									</div>

									<div class="col-md-1">
										<button id="noDelete" data-dismiss="modal"
											class="btn btn-danger" type="button">No</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
				
				
                <!-- 	sandhya  -->









							<!-- #deleteConfirm is for delete confirmation modal-->
							<div id="deleteConfirm1" class="modal fade" tabindex="-1"
								style="padding-top: 0px;">
								<div class="modal-dialog modal-md">

									<div class="modal-content">

										<!--Modal header-->
										<div class="modal-header">
											<button data-dismiss="modal" class="close" type="button">
												<span aria-hidden="true">&times;</span>
											</button>
											<h4 class="modal-title">Delete Confirmation</h4>
										</div>

										<div class="modal-body">
											<input type="hidden" id="delIndex" name="" class="delUrlId"
												value="0">
												<input type="hidden" id="delBillDetId" name="" class="delBillDetId"
												value="0">	
													<input type="hidden" id="delServiceIdNew" name="" class="delServiceIdNew"
												value="0">	
												<input type="hidden" id="delBillId" name="" class="delBillId"
												value="0">	
												

											<h4 id="myModalLabel">
												Are you sure you want to delete the <font
													id="delDrugNameFont" style="color: red"></font> Entry ?
									
											</h4>
										</div>

										<div class="modal-footer">
											<div class="row">
												<div class="col-md-8"></div>
												<div class="col-md-1">
													<button id="yesDelete1"
														class="btn btn-success pull-right closeb">Yes</button>
												</div>
												<div class="col-md-1">
													<button id="noDelete1" data-dismiss="modal"
														class="btn btn-danger">No</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							
							

				<!-- @Div used to add the Other Hosptal Modal Details in a border style -->
				<div id="otherHospModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">
							<form
								action="/<s:message code="projectName"></s:message>/patient/setOtherHospDet"
								method="post">
								<!---Modal header--->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">Other Hospital</h4>
								</div>
								<div class="row">
									<!--Modal body-->
									<div class="modal-body" id="">
										<div class="row">
											<div class="control-group">
												<label class="col-md-2 control-label"
													style="text-align: right;">Other Hospital Name :</label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res"
													name="otherHospName" id="otherHospNameModal"
													placeholder="Enter Other Hospital Name here"> <small
													id="otherHospNameModalText"
													style="display: none; color: #A94442"></small>
											</div>
											<div class="control-group">
												<label class="col-md-2 control-label"
													style="text-align: right;">Other Hospital Code :</label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res"
													name="otherHospCode" id="otherHospCodeModal"
													placeholder="Enter Other Hospital Code here"> <small
													id="otherHospCodeModalText"
													style="display: none; color: #A94442"></small>
											</div>

										</div>
									</div>
								</div>

								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Reset
									</button>
									<button type="button" class="btn btn-success"
										id="otherHospSubmit">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<!--/Other Hospital Modal -->


				<!-- @Div used to add the Other Staff Modal Details in a border style -->
				<div id="otherStaffModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">
							<form
								action="/<s:message code="projectName"></s:message>/patient/setOtherStaffDet"
								method="post">
								<!---Modal header--->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">Other Staff</h4>
								</div>
								<div class="row">
									<!--Modal body-->
									<div class="modal-body" id="">
										<div class="col-md-12">
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-5 control-label"
														style="text-align: right;">Other Staff Name :</label>
												</div>
												<div class="col-md-7 form-group ">
													<input type="text" class="form-control res"
														name="otherStaffName" id="otherStaffNameModal"
														placeholder="Other Staff Name here"> <small
														id="otherStaffNameModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-5 control-label"
														style="text-align: right;">Other Staff Code :</label>
												</div>
												<div class="col-md-7 form-group ">
													<input type="text" class="form-control res"
														name="otherStaffCode" id="otherStaffCodeModal"
														placeholder="Other Staff Code here"> <small
														id="otherStaffCodeModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
										</div>
										<div class="col-md-12">
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-5 control-label"
														style="text-align: right;">Other Staff Number :</label>
												</div>
												<div class="col-md-7 form-group ">
													<input type="text" class="form-control res"
														name="otherStaffMob" id="otherStaffMobModal"
														placeholder="Other Staff Number here"> <small
														id="otherStaffMobModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-5 control-label"
														style="text-align: right;">Other Staff Address :</label>
												</div>
												<div class="col-md-7 form-group ">
													<!-- <input type="text" class="form-control res" name="otherStaffAddr" id="otherStaffAddrModal"
														placeholder="Other Staff Code here"> -->
													<textarea class="form-control res" name="otherStaffAddr"
														id="otherStaffAddrModal"
														placeholder="Other Staff Address here" rows="" cols=""></textarea>
													<small id="otherStaffAddrText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Reset
									</button>

									<button type="button" class="btn btn-success"
										id="otherStaffSubmit">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<!--/OtherStaffModal -->
				<div id="vitalsModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">
							<form
								action="/<s:message code="projectName"></s:message>/patient/setVitals"
								method="post">
								<!---Modal header--->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">Standard Vitals</h4>
								</div>
								<!-- <div class="row"> -->
								<!--Modal body-->
								<div class="modal-body" id="">
									<div class="row">

										<div class="col-md-1"></div>
										<div class="col-md-12">
											<c:forEach var="vitals" items="${vitalList}"
												varStatus="loopCounter">
												<div class="col-md-2" style="margin-bottom: 6px;" id="vv">
													<label class="control-label col-md-10 vitalLabel"
														style="text-align: left;"> <c:out
															value="${vitals.vitalName}" />&nbsp;&nbsp; <%-- (<c:out value="${vitals.uom }" />): --%>
														<c:if test="${vitals.uom ne ''}">
														(<c:out value="${vitals.uom }" />):
														</c:if>


													</label>

													<c:choose>
														<c:when test="${vitals.vitalName == 'Nutritional Status'}">

															<input type="hidden" name="vitalIds" class="vitalIds"
																value="${vitals.vitalId}">
															<select
																class="form-control vitalValueNs vitalValue ${loopCounter.index}">
																<option value="0">--Select Nutritional--</option>
																<option value="Well Nourished">Well Nourished</option>
																<option value="Malnourished">Malnourished</option>
																<option value="Severely Nourished">Severely
																	Nourished</option>

															</select>
															<!-- <input type="text" value="0" id="vValNt" name="vitalValues" > -->
														</c:when>
														<c:otherwise>
															<input type="hidden" name="vitalIds" class="vitalIds"
																value="${vitals.vitalId}">
															<input type="text" id="${vitals.vitalName}"
																class="form-control vitalValue ${loopCounter.index}"
																name="vitalValues" autocomplete="off">

														</c:otherwise>
													</c:choose>
													<small id="vitalValueText${loopCounter.index}"
														class="vitalValueText"
														style="color: #A94442; display: none;"></small>
												</div>
											</c:forEach>


											<div class="control-group">
												<label class="col-md-1 control-label"
													style="text-align: right; padding-top: 34px;">Blood
													group :</label>
											</div>

											<div class="col-md-2 form-group" style="padding-top: 26px; ">
												<select name="bloodGrp" class="form-control selectMode"
													id="pntBloodGrp">
													<option value="0">--select--</option>
													<option value="O+">O +ve</option>
													<option value="O-">O -ve</option>
													<option value="A+">A +ve</option>
													<option value="A-">A -ve</option>
													<option value="B+">B +ve</option>
													<option value="B-">B -ve</option>
													<option value="AB+">AB +ve</option>
													<option value="AB-">AB -ve</option>
												</select> <small id="pntBloodGrpText"
													style="color: #A94442; display: none;"></small>
											</div>

										</div>
									</div>
								</div>
								<!-- </div> -->
								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger" id="vCancel">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Cancel
									</button>
									<button type="button" class="btn btn-success" id="vSave">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>

							</form>
						</div>
					</div>
				</div>







				<div id="allergyModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1200px; height: 500px;">
						<div class="modal-content ex1"
							style="width: 1000px; height: 300px; border-style: outset;">
							<!-- <div class="col-md-1"></div> -->
							<form id="allergyForm"
								action="/<s:message code="projectName"></s:message>/patient/setAllergyDetails"
								method="post">
								<div align="right">
									<button type="button" class="close" data-dismiss="modal">
										<span aria-hidden="true">×</span> <span class="sr-only">close</span>
									</button>
								</div>
								<div class="col-md-12" style="height: 10px"></div>
								<div class="col-md-12 alert alert-success alert-dismissable"
									style="display: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px;"
									id="successDiv">
									<button class='close' aria-hidden='true' data-dismiss='alert'
										type='button'>x</button>
									<h5 id="successMessage" class="fa fa-check"
										style="color: white"></h5>
								</div>


								<div class="col-md-12 alert alert-danger alert-dismissable"
									style="display: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px;"
									id="errorDiv">
									<button class='close' aria-hidden='true' data-dismiss='alert'
										type='button'>x</button>
									<h5 id="errorMessage" style="color: white;" class="fa fa-ban"></h5>
								</div>
								<label for="patientName"><b>Patient Name</b></label> <input
									type="text" class="patientName" name="patientName" value=""
									readonly
									style="border-top-style: hidden; border-right-style: hidden; border-left-style: hidden; border-bottom-style: hidden;">
								&nbsp;&nbsp; <label for="patientCode"><b>UMR:</b></label> <input
									type="text" class="patientCode" name="patientCode" value="0"
									readonly
									style="border-top-style: hidden; border-right-style: hidden; border-left-style: hidden; border-bottom-style: hidden;">
								<!-- <label for="visitId"><b>Visit Id</b></label> -->
								<input type="hidden" class="visitId" name="visitId" value="0"
									readonly> &nbsp;&nbsp;
								<!-- <label for="patientId"><b>Patient Id</b></label> -->
								<input type="hidden" class="patientId" name="patientId"
									value="0" readonly>
								<h4 class="modal-title">Allergy details</h4>
								<table
									class="table table-bordered table-striped dataTable viewTable"
									id="allergiesListTable">
									<thead
										style="background-color: #428bca; color: rgba(255, 255, 255, 0.8);">
										<tr>
											<th>Allergy Type</th>
											<th>Name</th>
											<th>Reaction</th>
											<th>Notes</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td><select id="allergyType" class="form-control">
													<option value="0">Select</option>
													<c:forEach items="${allergyTypeList}" var="allergyTypes">
														<option value="${allergyTypes.stdCodeValId}">
															${allergyTypes.stdCodeValueName}</option>
													</c:forEach>
											</select> <small id="allergyTypeText"
												style="color: #A94442; display: none;"></small> <input
												type="hidden" class="patientId" name="patientId" value="0" />
											</td>
											<td>
												<div class="form-group inner-addon left-addon">
													<i class="" style="color: #190707;"></i> <input type="text"
														autocomplete="off" class="form-control inputVal"
														id="allergyName" placeholder="Search Allergy Here" /> <input
														type="hidden" id="allergyId" value="0" /> <small
														id="allergyIdText" style="color: #A94442; display: none;"></small>
												</div>
											</td>
											<td><select id="allergyReaction" class="form-control">
													<option value="0">Select</option>
													<c:forEach items="${allergyReactionList}"
														var="allergyReactions">
														<option value="${allergyReactions.stdCodeValId}">
															${allergyReactions.stdCodeValueName}</option>
													</c:forEach>
											</select> <small id="allergyReactionText"
												style="color: #A94442; display: none;"></small></td>
											<td><textarea class="form-control" rows="2"
													id="allergyNote"
													oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);">
																											</textarea> <small id="allergyNoteText"
												style="color: #A94442; display: none;"></small></td>
											<td align="center"><button type="button" id="addAllergy"
													class="btn btn-primary">
													<i class="fa fa-plus"></i>
												</button></td>
										</tr>
									</tbody>
								</table>
								<div id="emptyfields" type="hidden">
									<dialog hidden>This is an open dialog window</dialog>
								</div>
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger" id="allergyCancels">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Cancel
									</button>
									<button type="button" class="btn btn-success" id="allergySaves">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>






				<!-- #deleteConfirm- User to display the confirmation buttons in a modal -->
				<div id="deleteConfirmAllergy" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog modal-md">

						<div class="modal-content">

							<!--Modal header-->
							<div class="modal-header">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Delete Confirmation</h4>
							</div>

							<div class="modal-body">

								<input type="hidden" id="delIndex" name="" class="delUrlId"
									value="0"> <input type="hidden" id="delModule" name=""
									class="delModule"> <input type="hidden" id="drugIds"
									name="" class="drugIds" value="0"> <input type="hidden"
									id="drugNames" name="" class="drugNames" value="0"> <input
									type="hidden" id="allergyIds" name="" class="allergyIds"
									value="0"> <input type="hidden" id="patientIds" name=""
									class="patientIds" value="0"> <input type="hidden"
									id="allergyNames" name="" class="allergyNames" value="0">
								<input type="hidden" id="diseaseIds" name="" class="diseaseIds"
									value="0"> <input type="hidden" id="diseaseNames"
									name="" class="diseaseNames" value="0"> <input
									type="hidden" id="riskIds" name="" class="riskIds" value="0">
								<input type="hidden" id="riskNames" name="" class="riskNames"
									value="0">


								<h4 id="myModalLabel">
									Are you sure you want to delete the <font id="delNameFont"
										style="color: red"></font> allergy entry ?
								</h4>
							</div>

							<div class="modal-footer">
								<div class="row">
									<div class="col-md-8"></div>
									<div class="col-md-1">
										<button id="yesDeleteAllergy"
											class="btn btn-success pull-right closeb">Yes</button>
									</div>
									<div class="col-md-1">
										<button id="noDeleteAllergy" data-dismiss="modal"
											class="btn btn-danger">No</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>








				<div id="vitalsModalDT" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">
							<form id="vitaForm">
								<%-- action="/<s:message code="projectName"></s:message>/patient/setVitals"
					method="post"> --%>
								<!---Modal header--->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">Standard Vitals</h4>
								</div>
								<!-- <div class="row"> -->
								<!--Modal body-->
								<div class="modal-body" id="">
									<div class="row">

										<div class="col-md-1"></div>
										<div class="col-md-12">
											<c:forEach var="vitals" items="${vitalList}"
												varStatus="loopCounter">
												<div class="col-md-2" style="margin-bottom: 6px;" id="vv">
													<label class="control-label col-md-10 vitalLabel"
														style="text-align: left;"> <c:out
															value="${vitals.vitalName}" />&nbsp;&nbsp; <%-- (<c:out value="${vitals.uom }" />): --%>
														<c:if test="${vitals.uom ne ''}">
														(<c:out value="${vitals.uom }" />):
														</c:if>


													</label>

													<c:choose>
														<c:when test="${vitals.vitalName == 'Nutritional Status'}">

															<input type="hidden" name="vitalIds" class="vitalIds"
																value="${vitals.vitalId}">
															<select
																class="form-control vitalValueNs vitalValue ${loopCounter.index}"
																id="${vitals.vitalName}s">
																<option value="0">--Select Nutritional--</option>
																<option value="Well Nourished">Well Nourished</option>
																<option value="Malnourished">Malnourished</option>
																<option value="Severely Nourished">Severely
																	Nourished</option>

															</select>
															<input type="hidden" value="0" id="vValNt"
																name="vitalValues">
														</c:when>
														<c:otherwise>
															<input type="hidden" name="vitalIds" class="vitalIds"
																value="${vitals.vitalId}">
															<input type="text" id="${vitals.vitalName}s"
																class="form-control vitalValues ${loopCounter.index}"
																name="vitalValues" autocomplete="off">

														</c:otherwise>
													</c:choose>
													<small id="vitalValueText${loopCounter.index}"
														class="vitalValueText"
														style="color: #A94442; display: none;"></small>
												</div>
											</c:forEach>

											<div class="control-group">
												<label class="col-md-1 control-label"
													style="text-align: right; padding-top: 13px;">Blood
													group :</label>
											</div>

											<div class="col-md-2 form-group" style="padding-top: 7px;">
												<select name="bloodGrp" class="form-control selectMode"
													id="pntBloodGrp">
													<option value="0">--select--</option>
													<option value="O+">O +ve</option>
													<option value="O-">O -ve</option>
													<option value="A+">A +ve</option>
													<option value="A-">A -ve</option>
													<option value="B+">B +ve</option>
													<option value="B-">B -ve</option>
													<option value="AB+">AB +ve</option>
													<option value="AB-">AB -ve</option>
												</select> <small id="pntBloodGrpText"
													style="color: #A94442; display: none;"></small> <input
													type="hidden" id="pntId" name="pntId" value=""> <input
													type="hidden" id="apptId" name="apptId" value=""> <input
													type="hidden" id="vitalStatus" name="vitalStatus" value="">
											</div>

										</div>
									</div>
								</div>
								<!-- </div> -->
								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger" id="vCancels">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Cancel
									</button>
									<button type="button" class="btn btn-success" id="vSaves">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div id="passportModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1200px; height: 500px;">
						<!-- style="width: 1000px" -->
				
						<!-- <div class="modal-content ex1"
							style="width: 1000px; height: 300px; border-style: outset;"> -->
						<div class="modal-content" id="fileUpload">
							<form id="fileUploadForm">
								<%-- action="/<s:message code="projectName"></s:message>/patient/setNriFiles"
								method="post">  --%>
								<!--Modal header-->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<div id="message"></div>
									<h4 class="modal-title">File upload</h4>
								</div>
								<div class="row">
									<!--Modal body-->
									<div id="message"></div>
									<div class="modal-body" id="">

										<div class="row" hidden>

											<div class="control-group">
												<label class="col-md-3 control-label"
													style="text-align: right;">Passport Number : <font
													color="red">*</font>
												</label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res passportNum"
													id="passportNum" autocomplete="off" name="passportNum"
													placeholder="Enter Passport Number here"> <input
													value="0" type="hidden" id="patientIdForFile"
													name="patientIdForFile"> <input value="0"
													type="hidden" id="setFilsiz" name="setFilsiz"> <small
													id="passportNumberText"
													style="display: none; color: #A94442"></small>
											</div>
											<div class="control-group">
												<label class="col-md-2 control-label"
													style="text-align: right;">Issued Date : <font
													color="red">*</font></label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res"
													name="passportIssuedDt" id="passportIssuedDt"
													autocomplete="off" placeholder="Enter Issued Date here">
												<small id="passportIssuedDateText"
													style="display: none; color: #A94442"></small>
											</div>


										</div>
										<div class="row" hidden>
											<div class="control-group">
												<label class="col-md-3 control-label"
													style="text-align: right;">Expiry Date : <font
													color="red">*</font></label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res"
													name="passportExpiryDt" id="passportExpiryDt"
													autocomplete="off" placeholder="Enter Expiry Date here">
												<small id="passportExpiryDateText"
													style="display: none; color: #A94442"></small>
											</div>
										</div>
									</div>
								</div>



								<div class="col-md-12">
									<div class="col-md-2"></div>
									<div class="col-md-8 ">
										<div class="box-body table-responsive" style="overflow: auto;">
											<table class="table table-bordered table-striped "
												style="border-radius: 0 10px 10px 0;" id="projectDocTable">
												<thead
													style="background-color: #428bca; color: rgba(255, 255, 255, 0.8)";height: 3em">
													<tr>
														<td><label style="color: #FFF">File</label></td>

														<td align="center"><label style="color: #FFF">File
																Description</label></td>
														<td align="center">File Type</td>

														<td><button class="btn btn-primary btn-sm"
																id="addPatFile" type="button" style="color: 0FFF">
																<i class="fa fa-plus"></i>
															</button></td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<!-- <input type="file" id="fileName" name="fileName"> -->
															<input id="ticketFileNames" name="ticketFileNames"
															class="btn btn-primary ticketFileNames" type="file">
															<!-- <input type="text" id="fileStatus" name="fileStatus" value=""> -->
															<input type="hidden" id="pntId" name="pntId" value="">
															<input type="hidden" id="apptId" name="apptId" value="">
															<input type="hidden" id="fileStatus" name="fileStatus"
															value=""> <small class="fileNameText"
															style="display: none; color: #A94442"></small>
														</td>

														<td><textarea class="form-control"
																name="descriptions" id="descriptions"></textarea> <small
															class="empFileDescText"
															style="display: none; color: #A94442"></small></td>


														<td style="color: #000"><Select class="form-control"
															id="patientType" name="patientTypes"
															style="width: 151px">
																<option value="">Select</option>
																<option value="presList">Prescription List</option>
																<option value="labList">Lab List</option>
														</Select> <small class="patFileTypeText"
															style="display: none; color: #A94442"></small></td>

														<td></td>
													</tr>
													<tr>
												</tbody>
												<tfoot>
												</tfoot>
											</table>
										</div>
									</div>
								</div>

								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger" id="passportCancel">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Reset
									</button>

									<!-- <div id="passSave" hidden>
								 
								</div> -->
									<button type="button" class="btn btn-success" id="passportSave"
										aria-hidden="true">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
									<!-- <button type="button" class="btn btn-success" id="passportClose"  >
									<i class="fa fa-save"></i>&nbsp;&nbsp;Save
								</button> -->

									<!-- <button class="btn btn-success diagnosisSubmit" id="diagnosisSubmit" type="button">
								<i class="glyphicon glyphicon-floppy-disk"
									style="font-size: 15px;"></i>&nbsp;&nbsp;
							</button> -->
								</div>
							</form>
						</div>
					</div>
				</div>



				<!-- otherDoctorModal -->
				<div id="extraTokensModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">
							<form
								action="/<s:message code="projectName"></s:message>/patient/setExtraTokens"
								method="post">
								<!---Modal header--->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">Add ExtraTokens</h4>
								</div>
								<div class="row">
									<!--Modal body-->
									<div class="modal-body" id="">
										<div class="col-md-12">
											<div>
												<div class="control-group">
													<label class="col-md-1 control-label"
														style="text-align: right;">Doctor Name :</label>
												</div>
												<div class="col-md-2 form-group ">
													<select
														class="form-control idDoctorExtraTokens singleChoosen"
														disabled="disabled" id="idDoctorExtraTokens">
														<option value="0">Select Consultant</option>
														<c:forEach var="i" items="${docList}">
															<option value="${i.doctorDetails}">${i.doctorName}</option>

														</c:forEach>
													</select> <small id="doctorNameExTnModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
											<div>
												<div class="control-group">
													<label class="col-md-2 control-label"
														style="text-align: right;">Extra Token Required On</label>
												</div>
												<div class="col-md-2 inner-addon left-addon form-group"
													style="">
													<i class="glyphicon glyphicon-calendar"></i> <input
														type="text" class="form-control" name="extraTokensDt"
														id="extraTokensDt" disabled="disabled"
														placeholder="Select Required Date" autocomplete="off">
													<!-- <input value="0"
																					type="text" id="dateSch" name="dateSch"> -->
													<small style="color: #A94442; display: none;"
														id="extraTokensDtText"> </small>
												</div>


											</div>
											<div>
												<div class="control-group">
													<label class="col-md-2 control-label"
														style="text-align: right;">No.of Extra tokens</label>
												</div>
												<div class="col-md-2 form-group ">
													<input type="text" class="form-control res"
														name="numOfExTokens" id="numOfExTokens"
														placeholder="No.of extra tokens needed"> <small
														id="numOfExTokensModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
										</div>
										<div class="col-md-12">

											<div class="control-group">
												<label class="col-md-1 control-label"
													style="text-align: right;">Start Time&nbsp;&nbsp;:</label>
											</div>
											<div class="col-md-2 form-group">
												<div class="input-group bootstrap-timepicker ">
													<span class="input-group-addon"><i
														class="glyphicon glyphicon-time"></i> </span> <input type="text"
														class="form-control timepicker"
														placeholder="Select start Time" id="extraStartTime"
														name="extraStartTime"> <small
														id="extraStartTimeText"
														style="color: #A94442; display: none;"></small>
												</div>

											</div>

											<div class="control-group">
												<label class="col-md-2 control-label"
													style="text-align: right;">End Time&nbsp;&nbsp;:</label>
											</div>
											<div class="col-md-2 form-group">
												<div class="input-group bootstrap-timepicker ">
													<span class="input-group-addon"><i
														class="glyphicon glyphicon-time"></i></span> <input type="text"
														class="form-control timepicker"
														placeholder="Select End Time" id="extraEndTime"
														name="extraEndTime"> <small id="extraEndTimeText"
														style="color: #A94442; display: none;"></small>
												</div>
											</div>



										</div>
									</div>
								</div>

								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Reset
									</button>

									<button type="button" class="btn btn-success"
										id="extraTokensSubmit">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<!-- extra tokens modal -->

				<div id="otherDoctorModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">
							<form
								action="/<s:message code="projectName"></s:message>/patient/setOtherDoctorDet"
								method="post">
								<!---Modal header--->
								<div class="modal-header">
									<button data-dismiss="modal" class="close" type="button">
										<span aria-hidden="true">&times;</span>
									</button>
									<h4 class="modal-title">Other Doctors</h4>
								</div>
								<div class="row">
									<!--Modal body-->
									<div class="modal-body" id="">
										<div class="col-md-12">
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-5 control-label"
														style="text-align: right;">Other Doctor Name :</label>
												</div>
												<div class="col-md-7 form-group ">
													<input type="text" class="form-control res"
														name="otherDoctorName" id="otherDoctorNameModal"
														placeholder="Other Doctor Name here"> <small
														id="otherDoctorNameModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
											<div class="col-md-6">

												<label class="col-md-4 control-label"
													style="text-align: right;">Specialization</label>
												<div class="col-md-7 form-group ">
													<select class="selectpicker form-control"
														id="otherDoctorCodeModal" name="otherDoctorCode">
														<option value="">--Select--</option>
														<c:forEach items="${specList}" var="i">
															<option value="<c:out value='${i.specializationId}'/>"><c:out
																	value='${i.specialization}' /></option>
														</c:forEach>

													</select> <small id="otherDoctorCodeModalText"
														style="display: none; color: #A94442"></small>
												</div>

											</div>
										</div>
										<div class="col-md-12">
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-5 control-label"
														style="text-align: right;">Other Doctor Mobile
														Number :</label>
												</div>
												<div class="col-md-7 form-group ">
													<input type="text" class="form-control res"
														name="otherDoctorMob" id="otherDoctorMobModal"
														placeholder="Other Doctor Mobile Number here"> <small
														id="otherDoctorMobModalText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
											<div class="col-md-6">
												<div class="control-group">
													<label class="col-md-4 control-label"
														style="text-align: right;">Other Doctor Address :</label>
												</div>
												<div class="col-md-7 form-group ">
													<!-- <input type="text" class="form-control res" name="otherStaffAddr" id="otherStaffAddrModal"
														placeholder="Other Staff Code here"> -->
													<textarea class="form-control res" name="otherDoctorAddr"
														id="otherDoctorAddrModal"
														placeholder="Other Doctor Address here" rows="" cols=""></textarea>
													<small id="otherDoctorAddrText"
														style="display: none; color: #A94442"></small>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!--Modal footer-->
								<div class="modal-footer">
									<button type="reset" class="btn btn-danger">
										<i class="fa fa-ban"></i>&nbsp;&nbsp;Reset
									</button>

									<button type="button" class="btn btn-success"
										id="otherDoctorSubmit">
										<i class="fa fa-save"></i>&nbsp;&nbsp;Save
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<!--/extra tokens modal  -->

				<div id="pymntConfirm" class="modal fade" tabindex="-1"
					style="padding-top: 50px;">
					<div class="modal-dialog modal-md">
						<div class="modal-content">
							<!--Modal header-->
							<div class="modal-header">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Payment Confirmation</h4>
							</div>
							<div class="modal-body">
								<input type="hidden" id="delIndex" name="" class="delUrlId"
									value="0">
								<h4 id="myModalLabel">Payment is in Pending. Are you sure
									you want to submit?</h4>
							</div>
							<div class="modal-footer">
								<div class="row">
									<div class="col-md-8"></div>
									<div class="col-md-1">
										<button id="yesPymnt"
											class="btn btn-success pull-right closeb">Yes</button>
									</div>
									<div class="col-md-1">
										<button id="noPymnt" data-dismiss="modal"
											class="btn btn-danger">No</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- #alertModal- User to display the content in a modal -->
				<div id="alertModal" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog modal-sm">
						<div class="modal-content">

							<!--Modal header-->
							<div class="modal-header" id="defaultModalHeader">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Alert Message</h4>
							</div>
	
							<!-- .modal-body - @Div used to show the customized alert message from sript -->
							<div class="modal-body">
								<h4 id="alertMsg"></h4>
							</div>
							<!-- /.modal-body -->
							<!-- .modal-footer -->
							<div class="modal-footer">
								<button data-dismiss="modal" class="btn btn-success"
									type="button">OK</button>
							</div>
							<!-- /.modal-footer -->
						</div>
					</div>
				</div>

				<div id="alertModalValidiaty" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog modal-sm">
						<div class="modal-content">

							<!-- Modal Header -->
							<div class="modal-header" id="defaultModalHeader">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Alert Message</h4>
							</div>

							<!-- Modal Body -->
							<div class="modal-body">
								<h4 id="alertMsgvalid"></h4>
							</div>
							<!-- /.modal-body -->

							<!-- Modal Footer with Yes/No buttons -->
							<div class="modal-footer">
								<button id="yesButton" class="btn btn-primary" type="button" value="09">Yes</button>
								<button id="noButton" class="btn btn-secondary" type="button" value="01">No</button>
							</div>
							<!-- /.modal-footer -->

						</div>
					</div>
				</div>

				<!-- /#alertModal -->
					<div id="settlementModal" class="modal fade">
  <div class="modal-dialog modal-md">
    <div class="modal-content">

      <div class="modal-header">
        <h4 id="settlementTitle"></h4>
      </div>

      <div class="modal-body">

        <!-- Amount -->
        <div class="form-group">
          <label>Amount</label>
          <input class="form-control" id="settlementAmount" readonly />
        </div>

        <!-- Authorized / Returned By -->
        <div class="form-group">
          <label id="personLabel"></label>
          <input class="form-control" id="personName" required />
        </div>

        <!-- Mode (Refund only) -->
        <div class="form-group" id="modeDiv">
          <label>Return Mode</label>
          <input class="form-control" value="CASH" readonly />
        </div>

        <!-- Remarks -->
        <div class="form-group">
          <label>Remarks</label>
          <textarea class="form-control" id="remarkss"></textarea>
        </div>

      </div>

      <div class="modal-footer">
        <button class="btn btn-primary" id="confirmSettlement">Confirm & Save</button>
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      </div>

    </div>
  </div>
</div>			
				
				


<div id="paymentAlertModal" class="modal fade" tabindex="-1" style="padding-top: 150px;">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">

            <!-- Modal header -->
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Payment Pending</h4>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <h4 id="paymentAlertMsg"></h4>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-8"></div>
                    <div class="col-md-1">
                        <button class="btn btn-success" id="yesPayment" style="margin-left: -20px;">Yes</button>
                    </div>
                    <div class="col-md-1">
                        <button data-dismiss="modal" class="btn btn-danger" id="noPayment">No</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
				


                          <!--  habi -->
                          
                          <div id="alertModal" class="modal fade" tabindex="-1"
								style="padding-top: 0px;">
								<div class="modal-dialog modal-sm">
									<div class="modal-content">

										<!--Modal header-->
										<div class="modal-header" id="defaultModalHeader">
											<button data-dismiss="modal" class="close" type="button">
												<span aria-hidden="true">&times;</span>
											</button>
											<h4 class="modal-title">Alert111 Message</h4>
										</div>

										<div class="modal-body">
											<h4 id="alertMsg"></h4>
										</div>

										<div class="modal-footer">
											<button data-dismiss="modal" class="btn btn-success"
												type="button">OK</button>
										</div>

									</div>
								</div>
							</div>



				<div id="alertModalAllergy" class="modal fade" tabindex="-1"
					style="padding-top: 150px;">
					<div class="modal-dialog modal-sm">
						<div class="modal-content">

							<!--Modal header-->
							<div class="modal-header" id="defaultModalHeader">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Alert Message</h4>
							</div>
							<h1>Alert Message</h1>
							<h2>Allergy details not entered completely</h2>
							<p>Enter allergy type, name and reaction.</p>
							<button onclick="myFunctionAllergy()">OK</button>
						</div>
					</div>
				</div>




				<!-- Loader Modal -->
				<div id="loadarModal" class="modal fade" tabindex="-1"
					style="padding-left: 200px; padding-top: 150px;">
					<div class="modal-dialog modal-sm">
						<div class="modal-body">
							<img
								src="/<s:message code="projectName"></s:message>/resources/images/ajax-loader.gif" />
							<font style="color: white;">loading...Please Wait</font>
						</div>
					</div>
				</div>

				<!-- Loader Div -->
				<div id="loadarDiv" hidden>
					<div align="center">
						<img
							src="/<s:message code="projectName"></s:message>/resources/images/ajax-loader(Black).gif" />
						<font>loading...Please Wait</font>
					</div>
				</div>

				<div id="addNewDiv"></div>
				<div id="patdet-modal" class="modal fade" tabindex="-1"
					style="padding-bottom: 200px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">

							<!--Modal header-->
							<div class="modal-header">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Patients List</h4>
							</div>
							<div id="titleDivAMMM"></div>
							<div class="row">
								<!--Modal body-->
								<div class="modal-body" id="">
									<div class="col-md-12" id="patientNameDivAMMM">

										<div id="patientNameDiv">
											<div class="control-group">
												<label class="col-md-2 control-label"
													style="text-align: right;">Patients Details :</label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res"
													autocomplete="off" name="modalPatientName"
													id="modalPatientDetails"
													placeholder="Enter Patient details here">
											</div>
										</div>
									</div>

									<div class="col-md-12" id="patientDetailsDiv"></div>

								</div>
							</div>

							<!--Modal footer-->
							<div class="modal-footer"></div>

						</div>
					</div>
				</div>
				<div id="patient-add-in-search" class="modal fade" tabindex="-1"
								style="padding-bottom: 200px;">
								<div class="modal-dialog" style="width: 90%;">
									<div class="modal-content">

										<!--Modal header-->
										<div class="modal-header">
											<button data-dismiss="modal" class="close" type="button">
												<span aria-hidden="true">&times;</span>
											</button>
											<h4 class="modal-title">Patient Search</h4>
										</div>
										<div class="row">
											<!--Modal body-->
											<div class="modal-body" id="">
												<div class="col-md-12">
												
												<div id="modalPckgNameDivAmm" >
														<div class="control-group">
															<label class="col-md-2 control-label" style="text-align: right; color: red;">Umr Number :</label>

														</div>
														<div class="col-md-2 form-group ">
															<input type="text" class="form-control res"
															oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
																autocomplete="off" name="umrNumberAmm" value="" 
																id="umrNumberAmm" placeholder="Search PatientName/MobileNo/UmrNo"> 
																
														</div>
													</div>


													<div id="modalPckgNameDivAmm" >
														<div class="control-group">
															<label class="col-md-2 control-label"
																style="text-align: right;">First Name :</label>
														</div>
														<div class="col-md-2 form-group ">
															<input type="text" class="form-control res"
															oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
																autocomplete="off" name="firstNameAmm" value="" 
																id="firstNameAmm" placeholder="Enter First Name here"> 
																
														</div>
													</div>
													
													<div id="modalPckgNameDivAmm" >
														<div class="control-group">
															<label class="col-md-2 control-label"
																style="text-align: right;">Last Name :</label>
														</div>
														<div class="col-md-2 form-group ">
															<input type="text" class="form-control res"
															oninput="let p=this.selectionStart;this.value=this.value.toUpperCase();this.setSelectionRange(p, p);"
																autocomplete="off" name="lastNameAmm"
																id="lastNameAmm" placeholder="Enter Last Name here"> 
														</div>
													</div>
													
													
													
													
													
													
													
												</div>
												<div class="col-md-12">
												<div id="modalPckgNameDivAmm" >
														<div class="control-group" >
															<label class="col-md-2 control-label"
																style="text-align: right;">Age :</label>
														</div>
														<div class="col-md-2 form-group ">
															<input type="text" class="form-control res"
																autocomplete="off" name="ageAmm"
																id="ageAmm" placeholder="Enter Age here">
														</div>
													</div>
												<div id="modalPckgNameDivAmm" >
														<div class="control-group" >
															<label class="col-md-2 control-label"
																style="text-align: right;">Mobile Number :</label>
														</div>
														<div class="col-md-2 form-group ">
															<input type="text" class="form-control res"
																autocomplete="off" name="mobileNumberAmm" maxlength="10"
																id="mobileNumberAmm" placeholder="Enter Mobile Number here">
														</div>
													</div>
													</div>

												

											</div>
										</div>

										<!--Modal footer-->
										<div class="modal-footer"style=" MARGIN-LEFT: 32PC;">
										
										<div class="col-md-2">
													<button id="newPatientDivv" class="btn btn-success pull-right closeb"
														type="button">New Patient</button>
												</div>
										</div>
										
										<marquee width="100%" direction="right" height="40px" style="background-color: #f5f5f5;">
					<h4 style="position:absolute;top:-10%; background: linear-gradient(to right,red, black,skyblue);  -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;font-size: 20px; margin: 100;" ></h4>
                    </marquee>

									</div>
								</div>
							</div>
				<div id="regPatdet-modal" class="modal fade" tabindex="-1"
					style="padding-bottom: 200px;">
					<div class="modal-dialog" style="width: 1000px">
						<div class="modal-content">

							<!--Modal header-->
							<div class="modal-header">
								<button data-dismiss="modal" class="close" type="button">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 class="modal-title">Registered Patients List</h4>
							</div>
							<div class="row">
								<!--Modal body-->
								<div class="modal-body" id="">
									<div class="col-md-12">

										<div id="regPatientNameDiv">
											<div class="control-group">
												<label class="col-md-2 control-label"
													style="text-align: right;">Patients Details :</label>
											</div>
											<div class="col-md-3 form-group ">
												<input type="text" class="form-control res"
													autocomplete="off" name="modalRegPatientName"
													id="modalRegPatientDetails"
													placeholder="Enter Reg Patient details here">
											</div>
										</div>
									</div>

									<div class="col-md-12" id="regPatientDetailsDiv"></div>

								</div>
							</div>

							<!--Modal footer-->
							<div class="modal-footer"></div>

						</div>
					</div>
				</div>
				<!-- passport modal -->

				<!-- /passport modal -->
				<div class="modal fade" id="patientUpdate" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-md">

						<div class="modal-content">
							<div class="modal-header">
								<div class="modal-title">
									<div align="right">
										<button type="button" class="close" data-dismiss="modal">
											<span aria-hidden="true">×</span> <span class="sr-only">close</span>
										</button>
									</div>
									<h4 id="updatePatientModel">Patient Details</h4>
								</div>
							</div>
							<div class="modal-body">
								<div class="box-body">
									<div id="message"></div>
									<form action="" id="savePatientForm" method="POST">
										<div class="row col-md-12">
											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Patient
														Code:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<input type="text" class="form-control updtPatientCode"
														id="updtPatientCode" readonly name="patientCode">
													<input type="hidden" class="form-control updtPatientId"
														id="updtPatientId" readonly name="patientId">
												</div>

												<div class="control-group">
													<label class="col-md-3 control-label">Title:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
								                	<select class="form-control" name="ptitle"
																	id="updtPatientTitle" >
																	<option value="0">Title</option>
																	<option value="Mr.">Mr.</option>
																	<option value="Miss.">Miss.</option>
																	<option value="Mrs.">Mrs.</option>
																	
																	
																	
																	<option value="Baby Boy">Baby Boy</option>
																	<option value="Baby Girl">Baby Girl</option>
																	
																	
																</select> <small id="updtPatientTitleText"
														style="color: #A94442; display: none;"></small>
												</div>
											</div>
											<div class="row">
												
												<div class="control-group">
													<label class="col-md-3 control-label">Patient
														Name:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group" style="margin-left: -48px;">
													<input type="text" class="form-control updtPatientName"
														id="updtPatientName" readonly name="pname"
														pattern="^[A-Za-z]{1,15}[\s\.]{0,1}[A-Za-z\s]{2,28}$">
													<small id="updtPatientNameText"
														style="color: #A94442; display: none;"></small>
												</div>
												
												<div class="control-group">
													<label class="col-md-3 control-label">Last
														Name:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group" style="">
													<input type="text" class="form-control updtLastName"
														id="updtLastName" readonly name="lName"
														pattern="^[A-Za-z]{1,15}[\s\.]{0,1}[A-Za-z\s]{2,28}$">
													<small id="updtLastNameText"
														style="color: #A94442; display: none;"></small>
												</div>

											</div>
											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Gender:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control" id="updtPatientGender"
														disabled="disabled" name="gender">
														<option value="MALE">Male</option>
														<option value="FEMALE">Female</option>
														<option value="Male" hidden>Male</option>
														<option value="Female" hidden>Female</option>
													</select> <small id="updtPatientGenderText"
														style="color: #A94442; display: none;"></small>
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">DOB:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3  inner-addon left-addon form-group">
													<i class="glyphicon glyphicon-calendar"></i> <input
														type="text" class="form-control" name="dob"
														id="updtPatientDob" autocomplete="off" placeholder="DOB"
														disabled> <small id="updtPatientDobText"
														style="color: #A94442; display: none;"></small>
												</div>

											</div>
											<div class="row">
												<div class="control-group">
													<label class="col-md-1 control-label">Age:</label>
												</div>
												<div class="col-md-4">


													<div class="col-md-3">

														<input type="text" class="form-control"
															id="updtPatientAge" readonly name="age"> <small
															id="updtPatientAgeText"
															style="color: #A94442; display: none;"></small>
													</div>
													
													<div class="control-group">
														<label class="col-md-1 control-label">Y</label>
													</div>

													<div class="col-md-3">
														<input type="text" class="form-control"
															id="updtPatientAgeMonths" readonly name="ageMonths">
														<small id="updtPatientAgeMonthsText"
															style="color: #A94442; display: none;"></small>
													</div>
													<div class="control-group">
														<label class="col-md-1 control-label">M</label>
													</div>

													<div class="col-md-3">
														<input type="text" class="form-control"
															id="updtPatientAgeDays" readonly name="ageDays">
														<small id="updtPatientAgeDaysText"
															style="color: #A94442; display: none;"></small>
													</div>
													<div class="control-group">
														<label class="col-md-1 control-label">D</label>
													</div>
												</div>


												<div class="control-group">
													<label class="col-md-3 control-label">Mobile
														Number:&nbsp;&nbsp;</label>
												</div>
												
												<div class="col-md-3 inner-addon left-addon form-group">
													<i class="glyphicon glyphicon-phone"></i> <input
														type="text" class="form-control" readonly
														id="updtPatientMobNum" name="mobNum"
														pattern="^[789]\d{9,11}$"> <small
														id="updtPatientMobNumText"
														style="color: #A94442; display: none;"></small>
												</div>
											</div>



											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">State:&nbsp;&nbsp;</label>
												</div>

												<div class="col-md-3 form-group">
													<select class="form-control state" id="updtState"
														disabled="disabled" name="state">

													</select> <small id="updtStateText"
														style="color: #A94442; display: none;"></small>
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">City:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control city" id="updtCity"
														disabled="disabled" name="city">
													</select> <small id="updtCityText"
														style="color: #A94442; display: none;"></small>
												</div>
											</div>
											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Village:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<input type="text" name="village" class="form-control"
														id="updtVillage" readonly="readonly">
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">Address:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3  form-group">
													<textarea class="form-control" id="updtAddr" rows="1"
														cols="10" readonly="readonly" name="addr"></textarea>
												</div>
											</div>

											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Marital
														Status:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control" id="updtMaritalStatus"
														name="maritalStatus" disabled="disabled">
														<option value="Single">Single</option>
														<option value="Married">Married</option>
														<option value="Widow">Widow</option>
													</select>
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">Nationality:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select id="updtNationality" class="form-control"
														disabled="disabled" name="nationality">
														<option value="0">--Select Nationality--</option>
														<option value="Indian" selected>Indian</option>
														<option value="American">American</option>
														<option value="EastIndian">East Indian</option>
														<option value="Afghan">Afghan</option>
														<option value="Albanian">Albanian</option>
														<option value="Algerian">Algerian</option>
														<option value="Argentine Argentinian">Argentine
															Argentinian</option>
														<option value="Australian">Australian</option>
														<option value="Austrian">Austrian</option>
														<option value="Bangladeshi">Bangladeshi</option>
														<option value="Belgian">Belgian</option>
														<option value="Bolivian">Bolivian</option>
														<option value="Batswana">Batswana</option>
														<option value="Brazilian">Brazilian</option>
														<option value="Bulgarian">Bulgarian</option>
														<option value="Cambodian">Cambodian</option>
														<option value="Cameroonian">Cameroonian</option>
														<option value="Canadian">Canadian</option>
														<option value="Chilean">Chilean</option>
														<option value="Chinese">Chinese</option>
														<option value="Colombian">Colombian</option>
														<option value="Costa Rican">Costa Rican</option>
														<option value="Croatian">Croatian</option>
														<option value="Cuban">Cuban</option>
														<option value="Czech">Czech</option>
														<option value="Danish">Danish</option>
														<option value="Dominican">Dominican</option>
														<option value="Ecuadorian">Ecuadorian</option>
														<option value="Egyptian">Egyptian</option>
														<option value="Salvadorian">Salvadorian</option>
														<option value="English">English</option>
														<option value="Estonian">Estonian</option>
														<option value="Ethiopian">Ethiopian</option>
														<option value="Fijian">Fijian</option>
														<option value="Finnish">Finnish</option>
														<option value="French">French</option>
														<option value="German">German</option>
														<option value="Ghanaian">Ghanaian</option>
														<option value="Greek">Greek</option>
														<option value="Guatemalan">Guatemalan</option>
														<option value="Haitian">Haitian</option>
														<option value="Honduran">Honduran</option>
														<option value="Hungarian">Hungarian</option>
														<option value="Icelandic">Icelandic</option>
														<option value="Indonesian">Indonesian</option>
														<option value="Iranian">Iranian</option>
														<option value="Iraqi">Iraqi</option>
														<option value="Irish">Irish</option>
														<option value="Israeli">Israeli</option>
														<option value="Italian">Italian</option>
														<option value="Jamaican">Jamaican</option>
														<option value="Japanese">Japanese</option>
														<option value="Jordanian">Jordanian</option>
														<option value="Kenyan">Kenyan</option>
														<option value="Kuwaiti">Kuwaiti</option>
														<option value="Lao">Lao</option>
														<option value="Latvian">Latvian</option>
														<option value="Lebanese">Lebanese</option>
														<option value="Libyan">Libyan</option>
														<option value="Lithuanian">Lithuanian</option>
														<option value="Malaysian">Malaysian</option>
														<option value="Malian">Malian</option>
														<option value="Maltese">Maltese</option>
														<option value="Mexican">Mexican</option>
														<option value="Mongolian">Mongolian</option>
														<option value="Moroccan">Moroccan</option>
														<option value="Mozambican">Mozambican</option>
														<option value="Namibian">Namibian</option>
														<option value="Nepalese">Nepalese</option>
														<option value="Dutch">Dutch</option>
														<option value="New Zealand">New Zealand</option>
														<option value="Nicaraguan">Nicaraguan</option>
														<option value="Nigerian">Nigerian</option>
														<option value="Norwegian">Norwegian</option>
														<option value="Pakistani">Pakistani</option>
														<option value="Panamanian">Panamanian</option>
														<option value="Paraguayan">Paraguayan</option>
														<option value="Peruvian">Peruvian</option>
														<option value="Philippine">Philippine</option>
														<option value="Polish">Polish</option>
														<option value="Portuguese">Portuguese</option>
														<option value="Romanian">Romanian</option>
														<option value="Russian">Russian</option>
														<option value="Saudi">Saudi</option>
														<option value="Scottish">Scottish</option>
														<option value="Senegalese">Senegalese</option>
														<option value="Serbian">Serbian</option>
														<option value="Singaporean">Singaporean</option>
														<option value="Slovak">Slovak</option>
														<option value="South African">South African</option>
														<option value="Korean">Korean</option>
														<option value="Spanish">Spanish</option>
														<option value="Sri Lankan">Sri Lankan</option>
														<option value="Sudanese">Sudanese</option>
														<option value="Swedish">Swedish</option>
														<option value="Swiss">Swiss</option>
														<option value="Syrian">Syrian</option>
														<option value="Taiwanese">Taiwanese</option>
														<option value="Tajikistani">Tajikistani</option>
														<option value="Thai">Thai</option>
														<option value="Tongan">Tongan</option>
														<option value="Tunisian">Tunisian</option>
														<option value="Turkish">Turkish</option>
														<option value="Ukrainian">Ukrainian</option>
														<option value="Emirati">Emirati</option>
														<option value="British">British</option>
														<!-- <option value="American">American</option> -->
														<option value="Uruguayan">Uruguayan</option>
														<option value="Venezuelan">Venezuelan</option>
														<option value="Vietnamese">Vietnamese</option>
														<option value="Welsh">Welsh</option>
														<option value="Zambian">Zambian</option>
														<option value="Zimbabwean">Zimbabwean</option>
													</select>
												</div>
											</div>
											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Religion:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control" id="updtReligion"
														name="religion" disabled="disabled">
														<option value="Hindu">Hindu</option>
														<option value="Muslim">Muslim</option>
														<option value="Christian">Christian</option>
													</select>
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">Id
														proof:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control" id="updtIdType"
														disabled="disabled" name="idProofType">
														<option value="MedCardNo">Medical Card No.</option>
														<option value="Pan">Pan</option>
														<option value="Adhar">Aadhaar</option>
														<option value="Voter">Voter</option>
													</select>
												</div>
											</div>
											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Id
														Number:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<input type="text" class="form-control" name="idProofNum"
														id="updtIdNum" readonly="readonly" />
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">Patient
														Category:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control" id="updtPatientCat"
														class="pntcat" disabled="disabled" name="patientCategory">
														<%-- <c:forEach var="i" items="${patientCategory }">
															<option value='<c:out value="${i.pntCatId }"/>'>
																<c:out value="${i.pntCat }" />
															</option>
														</c:forEach> --%>
														<c:forEach items="${orgList }" var="org">
															<option value="${org.orgId}">${org.orgName}</option>
														</c:forEach>
													</select> <small id="updtPatientCatText"
														style="color: #A94442; display: none;"></small> <input
														type="hidden" value="" name="updtPatCatName"
														id="updtPatCatName">
												</div>
											</div>

											<div class="row">
												<div class="control-group">
													<label class="col-md-2 control-label">Blood
														group:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<select class="form-control" id="updtBloodGrp"
														name="bloodGrp" disabled="disabled">
														<option value="0">Blood group</option>
														<option value="O+">O +ve</option>
														<option value="O-">O -ve</option>
														<option value="A+">A +ve</option>
														<option value="A-">A -ve</option>
														<option value="B+">B +ve</option>
														<option value="B-">B -ve</option>
														<option value="AB+">AB +ve</option>
														<option value="AB-">AB -ve</option>
													</select>
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label">Occupation:&nbsp;&nbsp;</label>
												</div>
												<div class="col-md-3 form-group">
													<!-- <input type="text" class="form-control" name="occupation"
														id="updtOccupation" readonly="readonly" /> -->
													<select name="occupation" class="form-control selectMode"
														id="updtOccupation" disabled>
														<option value="0">--Select Occupation</option>

														<option value="Farmer">Farmer</option>
														<option value="Business">Business</option>
														<option value="Employee">Employee</option>
														<option value="House Wife">House Wife</option>
														<option value="Labour">Labour</option>
														<option value="Retired">Retired</option>
														<option value="Self Employee">Self Employee</option>
														<option value="Student">Student</option>
														<option value="Not Specified">Not Specified</option>

													</select>
												</div>
											</div>
											<div class="row">
												<div class="col-md-3 form-group" style="display: none;">
													<select class="form-control country" id="updtCountry">
													</select>
												</div>
												<div class="control-group">
													<label class="col-md-2 control-label">Referral
														Type:&nbsp;&nbsp;</label>
												</div>

												<div class="col-md-3 form-group">
													<select class="form-control" id="updtRefType"
														disabled="disabled" name="refType">
														<c:forEach var="i" items="${refTypes }">
															<option value="<c:out value='${i.pntCatId }'></c:out>">
																<c:out value='${i.pntCat }'></c:out>
															</option>
														</c:forEach>
													</select>
												</div>


												<div style="" class=" form-group" id="updatePaymentTypeDiv"
													hidden>
													<div class="control-group">
														<label class="col-md-2 control-label">Payment
															Type:&nbsp;&nbsp;</label>
													</div>
													<div class="col-md-3"
														style="padding-left: 55px; width: 191px;">
														<select class="form-control" name="paymentType"
															disabled="disabled" id="updatePaymentType">
															<option value="0">Select Payment Type</option>
															<c:forEach var="payType" items="${payTypeList}">
																<option
																	value="<c:out value='${payType.payTypeId }'></c:out>">
																	<c:out value='${payType.payTypeName }'></c:out>
																</option>
															</c:forEach>
														</select> <small id="updatePaymentTypeText"
															style="color: #A94442; display: none;"></small> <input
															type="hidden" value="0" id="billIdUpdt" name="billId">
													</div>
												</div>

											</div>
											<div class="row">


												<div id="updtOrgIdDiv" style="display: none;">
													<div class="control-group">
														<label class="col-md-2 control-label">Organization:&nbsp;&nbsp;</label>
													</div>
													<div class="col-md-3 form-group">
														<select class="form-control" id="updtOrgId"
															disabled="disabled" name="orgId">
															<option value="">-select-</option>
															<c:forEach items="${orgList }" var="org">
																<option value="${org.orgId }">${org.orgName }</option>
															</c:forEach>
														</select>
													</div>
												</div>

												<div id="updtRefDiv" style="display: none;">
													<div class="control-group">
														<label class="col-md-2 control-label">Referral:&nbsp;&nbsp;</label>
													</div>
													<div class="col-md-3 form-group">
														<select class="form-control singleChoosen " id="updtRefId"
															name="refId" disabled="disabled">
															<option value="0">Staff Doctor's</option>
															<c:forEach var="emp" items="${staffDoc}">
																<option value="${emp.empId }">${emp.empName }-${emp.empId }
																</option>
															</c:forEach>


														</select>
													</div>

												</div>
												<div class=" form-group" id="updateOtherHospDiv" hidden>
													<div class="control-group">
														<label class="col-md-2 control-label">Referral:&nbsp;&nbsp;</label>
													</div>
													<div class="col-md-3">
														<select class="form-control singleChoosen"
															disabled="disabled" name="otherHospId"
															id="updateOtherHospId">
															<option value="0">Other Hospital</option>
															<c:forEach items="${otherHospList}" var="otherHosps">
																<option value="${otherHosps.otherHospId}">${otherHosps.otherHospName}</option>
															</c:forEach>
														</select> <small id="" style="color: #A94442; display: none;"></small>
														<input value="" type="hidden" id="updateOtherHospName"
															name="updateOtherHospName">
													</div>

												</div>
												

												<div class=" form-group" id="updateOtherStaffDiv" hidden>
													<div class="control-group">
														<label class="col-md-2 control-label">Referral:&nbsp;&nbsp;</label>
													</div>
													<div class="col-md-3">
														<select class="form-control singleChoosen"
															name="updateOtherStaffId" id="updateOtherStaffId">
															<option value="0">Other Staff</option>
															<!-- <option value="0">Select Other Hospital</option> -->
															<c:forEach items="${otherStaffList}" var="otherStaffs">
																<option value="${otherStaffs.otherStaffId}">${otherStaffs.otherStaffName}</option>
															</c:forEach>
														</select> <small id="" style="color: #A94442; display: none;"></small>
														<input value="" type="hidden" id="updateOtherStaffName"
															name="otherStaffName">
													</div>
													<!-- <div class="col-md-2">
															<button type="button" class="btn btn-info"
																id="addOtherStaff" title="Add New Other Staff">
																<i class="fa fa-plus-square"
																	style="font-size: 20px; height: 15px"></i>
															</button>
														</div> -->
												</div>
												<div class="control-group">
													<label class="col-md-3 control-label" for="text"><b>Sms
															Notification:</b></label>
												</div>
												<div class="col-md-1 form-group">
													<input type="checkbox" id="updtSmsAlert" name="smsAlert"
														disabled="disabled" />
												</div>
											</div>
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<div class="row">
										<div class="col-md-8"></div>
										<div class="col-md-1">
											<button id="editPatientRec"
												class="btn btn-success pull-right" type="button">Edit</button>
											<button id="savePatientRec"
												class="btn btn-success pull-right" type="button"
												style="display: none;">Save</button>
										</div>
										<div class="col-md-1">
											<button id="cancelEditRec" data-dismiss="modal"
												class="btn btn-danger" type="button">Cancel</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</aside>
		<!-- common common footer -->
		<%@include file="../common/commonFooter.jsp"%>

		<!-- common comon right menu -->
		<%@include file="patientRightMenu.jsp"%>

		<!-- /.control-sidebar -->
		<!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
		<div class='control-sidebar-bg'></div>
	</div>
	<!-- ./wrapper -->
	<!-- common JS -->
	<%@include file="../common/commonJS.jsp"%>
	<script type="text/javascript"
		src="/<s:message code="projectName"></s:message>/resources/plugins/bootstrapValidator.js"></script>
	<!-- nifty - bootstrap-datepicker JS -->
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/nifty/plugins/bootstrap-datepicker/bootstrap-datepicker.js"></script>

	<%-- <script type="text/javascript"
		src="/<s:message code="projectName"></s:message>/resources/plugins/datepicker/bootstrap-datepicker.js"></script> --%>
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/moment.min.js"
		type="text/javascript"></script>
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/daterangepicker/daterangepicker.js"></script>

	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/jquery.form.js"></script>
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/jquery-migrate-1.0.0.js"></script>

	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/slimScroll/jquery.slimscroll.min.js"
		type="text/javascript"></script>

	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/datatables/jquery.dataTables.min.js"></script>

	<!-- Nifty-choosen JS for Single Choosen Dropdown -->
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/nifty/plugins/chosen/chosen.jquery.min.js"></script>

	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/datatables/jquery.dataTables.min.js"></script>
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/common/js/jquery.mtz.monthpicker.js"
		type="text/javascript"></script>

<script src="/<s:message code="projectName"></s:message>/resources/plugins/common/js/jquery-migrate-1.0.0.js"></script>	
 <script src="/<s:message code="projectName"></s:message>/resources/plugins/nifty/js/nifty.min.js"></script>
 <script src="/<s:message code="projectName"></s:message>/resources/datatables/jquery.dataTables.min.js"></script>
<script src="/<s:message code="projectName"></s:message>/resources/datatables/dataTables.buttons.min.js"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/datatables/jszip.min.js"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/datatables/pdfmake.min.js"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/datatables/vfs_fonts.js"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/datatables/buttons.html5.min.js"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/datatables/buttons.flash.min.js"></script>
		<script src="/<s:message code="projectName"></s:message>/resources/plugins/nifty/plugins/chosen/chosen.jquery.min.js"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/plugins/moment.min.js" type="text/javascript"></script>
	<script src="/<s:message code="projectName"></s:message>/resources/plugins/daterangepicker/daterangepicker.js"></script> 
	<script src="/<s:message code="projectName"></s:message>/resources/plugins/nifty/plugins/bootstrap-datepicker/bootstrap-datepicker.js"></script>
 	<script src="/<s:message code="projectName"></s:message>/resources/plugins/timepicker/bootstrap-timepicker.min.js" type="text/javascript"></script>
	<script
		src="/<s:message code="projectName"></s:message>/resources/plugins/datatables/dataTables.bootstrap.min.js"></script>
	<script type="text/javascript"
		src="/<s:message code="projectName"></s:message>/resources/plugins/timepicker/bootstrap-timepicker.min.js"></script>

	<script type="text/javascript"
		src="/<s:message code="projectName"></s:message>/resources/plugins/common/js/bootstrap-typeahead.js"></script>

	<script type="text/javascript">
	
		$(document).ready(
				function(event) {
                   //alert(9);
            
                   $("#prelistBuAdd").click(function(event) { 
										//alert();	
										 $("#newAppPatClass").click();
										 $("#newAppPatClass").hide();
										 $("#appPatClass").hide();
										
										 $("#umrNumberAmm").val('');
											$("#firstNameAmm").val('');
											$("#lastNameAmm").val('');
											$("#ageAmm").val('');
											$("#mobileNumberAmm").val('');
										$('#patient-add-in-search').modal('show');
										
										 var src='';
										 document.getElementById("picNameIdd").src = src;
										 $("#picNameIdd").hide();
										 
							       		 $("#patientNameDiv").attr('hidden' , true);
										 $("#newPatientNameDiv").attr('hidden' , false);
										 $("#regPatientNameDiv").attr('hidden' , true);	
										 $("#parefTypessPortDiv").hide();
										 $("#apptPatientDetailsDiv").attr('hidden' , false);	
										 $("#regPatientDetailsDiv").attr('hidden' , true);	
										 $("#patientGender").hide();
										 $("#patInfoVisit").text('NEW VISIT');
										 $("#patVisitId").val('174');
										 $("#genderVal").show();
										 $("#patientName").val('');
										 $("#genderVal").val('');
										 $("#patinetId").val('');
										 $("#regPatientName").val('');
										 $("#patientTitleText").hide();
										 $("#maritalStatusVal").show();
										 $("#pntMaritalStatus").hide();
											$("#patientGenderText").hide();
											$("#umrDiv").hide();
											$("#patientNameText").hide();
											$("#lastNameText").hide();
											$("#pntDobText").hide();
											$("#ageText").hide();
											$("#careByText").hide();
											$("#careByNameText").hide();
											$("#babyParentText").hide();
											$("#parentNameText").hide();
											$("#pntMobNumText").hide();
											$("#refTypeText").hide();
											$("#refIdText").hide();
											$("#pntMaritalStatusText").hide();
											$("#pntNationalityText").hide();
											$("#pntReligionText").hide();
											$("#pntBloodGrpText").hide();
											$("#pntOccupationText").hide();
											$("#idTypeText").hide();
											$("#idNumText").hide();
											$("#stateText").hide();
											$("#errCity").hide();
											$("#villageText").hide();
											$("#patientCatText").hide();
											$("#pblmDescText").hide();
											$("#idLocationText").hide();
											$("#idDoctorText").hide();
											$("#scheduleDtText").hide();
											$("#specNameText").hide();
											$("#empCodeText").hide();
											$("#tokenValueText").hide();
											$("#errFee").hide();
											$("#feeDiscountText").hide();
											$("#feeDiscountAmtText").hide();
											$("#errConsFee").hide();
											$("#consDiscountText").hide();
											$("#consDiscountAmtText").hide();
											$("#totAmtText").hide();
											$("#totDiscountText").hide();
											$("#totDiscountAmtText").hide();
											$("#amountReceivedText").hide();
											$("#docSlotsDiv").hide();
											$("#patientId").val('0');
											$("#regPatientId").val('0');
											$("#suvRegPatientId").val('0');
											$("#patientTitle").val("0");
											$("#newPatientName").val('');
											$("#lastName").val('');
											$("#patientGender").val("0");
											$("#pntDob").val('');
											$("#age").val('');
											$("#careBy").val("0");
											$("#careByName").val('');
											$("#babyParent").val('');
											$("#parentName").val('');
											$("#pntMobNum").val('');
//							 				$("#refType").val("0");
											$("#refId").val('');
											$("#pntMaritalStatus").val("0");
											$("#pntNationality").val("Indian");
											$("#pntReligion").val("0");
											$("#pntBloodGrp").val("0");
											$("#pntOccupation").val('');
											$("#idType").val("Aadhar"); 
											$("#idNum").val("");
											$("#state").val("0");
											$("#city").val("0");
											$("#village").val('');
											$("#patientCat").val("4").trigger('chosen:updated').delay(100).trigger('change');
											$("#pblmDesc").val('');
//							 				$("#idLocation").val("0");
											$("#idDoctor").val("0").trigger('chosen:updated');
											$("#scheduleDt").val('');
											$("#specName").val('');
											$("#empCode").val('');
											$("#tokenValue").val('');
											$("#feeStatus").val('');
											$("#regFee").val('');
											$("#ageMonths").val('');
											$("#ageDays").val('');
											$("#discount").val('');
											$("#discountAmount").val('');
											$("#amount").val('');
											$("#consFee").val('');
											$("#consDiscount").val('');
											$("#consDiscountAmount").val('');
											$("#consAmount").val('');
											$("#totAmt").val('');
											$("#totDiscount").val('');
											$("#totDiscountAmt").val('');
											$("#billAmt").val('');
											$("#amountReceived").val('');
											$("#chngGiven").val('');
											$("#balance").val('');
											$("#status").val('');
											$("#addr").val('');
											$("#occupation").val("0").trigger('chosen:updated');
											/* $("#state").val('AP').trigger('chosenrefType:updated'); */
											$("#pntMobNum").attr("disabled",false);
											$("#pntDob").attr('disabled', false);
											$("#newPatientName").attr('readonly', false);
											$("#patientName").attr('readonly', false);
											$("#regPatientName").attr('readonly', false);
											$("#patientTitle").attr("disabled",false);
											$("#genderVal").attr("disabled",false);
											$("#pntMaritalStatus").attr("disabled",false);
											$("#maritalStatusVal").attr("disabled",false);
											$("#lastName").attr("disabled",false);
											$("#age").attr("readonly",false);
											$("#ageMonths").attr("readonly",false);
											$("#ageDays").attr("readonly",false);						
											$("#pntMobNum").attr("readonly",false);
											$("#refType").prop("disabled",false);
											$("#idLocation").attr('disabled', false);
											$("#regDt").attr("readonly",false);
											$("#pblmDesc").attr("readonly",false);
											$("#village").attr("disabled",false);
											$("#careBy").attr("disabled",false);
											$("#careByName").attr("disabled",false);
											$("#pntNationality").attr("disabled",false);
											$("#pntReligion").attr("disabled",false);
											$("#pntBloodGrp").attr("disabled",false);
											$("#occupation").attr("disabled",false);
											$("#idType").prop('disabled', false);
											$("#idNum").prop('readonly', false);
											$("#addr").prop('disabled', false);
											$("#city").prop('disabled', false);
											$("#state").prop('disabled', false);
											$("#regPatientNameText").hide();
											$("#patientNameText").hide();
											$("#patInfoRegValidSts").text("NO");
											//$("#patInfoRegValidDt").hide();
											$("#addr").html('');
											$("#paymentType").val('0').trigger('chosen:updated');
//							 				$("#refType").trigger('change');
											$("#refTypeText").hide();
											//$("#scheduleDt").attr('disabled', true);
											//$("#idDoctor").attr('disabled', true);
											//$("#idDoctor").attr('disabled', true);
//							 				$("#refType").val('Walk-in').trigger('chosen:updated');
										});
                   
                   
                   var emploName = document.getElementById('firstNameAmm');
               	  var newPatientName = document.getElementById('newPatientName');
               	  emploName.addEventListener('input', function() {
               		newPatientName.value = this.value;
               	  }); 
               	  
               	 var lastNameAmm = document.getElementById('lastNameAmm');
              	  var lastName = document.getElementById('lastName');
              	 lastNameAmm.addEventListener('input', function() {
              		 lastName.value = this.value;
              	  }); 
              	  
              	 var ageAmm = document.getElementById('ageAmm');
             	  var agee = document.getElementById('age');
             	  ageAmm.addEventListener('input', function() {
             		 agee.value = this.value;
             	  }); 
             	  
             	  var mobileNumberAmm = document.getElementById('mobileNumberAmm');
             	  var pntMobNum = document.getElementById('pntMobNum');
             	  mobileNumberAmm.addEventListener('input', function() {
             		 pntMobNum.value = this.value;
             	  }); 
             	  
             	 function getSearchValue() {

             	    let umr = $("#umrNumberAmm").val();
             	    let mobile = $("#mobileNumberAmm").val();
             	    let fname = $("#firstNameAmm").val();
             	    let lname = $("#lastNameAmm").val();
             	    let age = $("#ageAmm").val();

             	    console.log("UMR:", umr);
             	    console.log("Mobile:", mobile);
             	    console.log("First Name:", fname);
             	    console.log("Last Name:", lname);
             	    console.log("Age:", age);

             	    return (
             	        (umr && umr.trim()) ||
             	        (mobile && mobile.trim()) ||
             	        (fname && fname.trim()) ||
             	        (lname && lname.trim()) ||
             	        (age && age.trim()) ||
             	        ""
             	    );
             	}
             	 
             	function handleKeyPress(event) {
             	    if (event.keyCode === 13) {

             	        event.preventDefault();

             	        // ✅ capture BEFORE modal closes
             	        var mobNum = ($("#mobileNumberAmm").val() || "").trim();
             	        var patientName = ($("#firstNameAmm").val() || "").trim();
             	        var lName = ($("#lastNameAmm").val() || "").trim();
             	        var age = ($("#ageAmm").val() || "").trim();
             	        var umrNo = ($("#umrNumberAmm").val() || "").trim();
             	        var searchValue = getSearchValue();
             	        console.log("Final search value:", searchValue);

             	        $("#patient-add-in-search").modal('hide');

             	        var url = "/<s:message code='projectName'></s:message>/patient/getPatDetOldDataaa?patientName=" 
             	            + patientName + "&lName=" + lName + "&age=" + age + "&mobNum=" + mobNum + "&umrNo=" + umrNo;

             	        $.ajax({
             	            url: url,
             	            type: 'GET',
             	            cache: false,
             	            success: function(patientQueueInter) {
             	                $("#patientDetailsDiv").html(patientQueueInter);
             	                $("#patdet-modal").modal('show');
             	                $("#modalPatientDetails").val(searchValue).focus();
             	                console.log("Value set in modal:", $("#modalPatientDetails").val());
             	                if (searchValue) {
             	                    patDetailsAjax(searchValue);
             	                }
             	            }
             	        });
             	    }
             	}
             	 
             	 
             	$("#newPatientDivv").click(function() {
             	    $("#patient-add-in-search").modal('hide');
             	});

             	// Attach the event listener when the page loads
             	window.onload = function() {
             	    document.addEventListener("keydown", handleKeyPress);
             	}
               	  
                   
                   
                   
                   
                   
                   
                   
					function getAmount(selector) {
					    var val = parseFloat($(selector).val());
					    return isNaN(val) ? 0 : val;
					}

					// REGISTRATION
					var regCash = getAmount("#regAmoCash");
					var regCard = getAmount("#regAmoCard");
					var regUpi  = getAmount("#regAmoUpi");

					// CONSULTATION
					var consCash = getAmount("#conAmoCash");
					var consCard = getAmount("#conAmoCard");
					var consUpi  = getAmount("#conAmoUpi");
					var refundAmt  = getAmount("#refundAmt");
					var paidAmt  = getAmount("#paidAmt");

					// SET VALUES
					$("#totalCash").text(regCash.toFixed(2));
					$("#cardAmtttotal").text(regCard.toFixed(2));
					$("#upiAmtttotal").text(regUpi.toFixed(2));

					$("#conAmounts").text(consCash.toFixed(2));
					$("#caoCardAmounts").text(consCard.toFixed(2));
					$("#conUpiAmounts").text(consUpi.toFixed(2));
					$("#refundAmtt").text(refundAmt.toFixed(2));
					$("#paidAmttt").text(paidAmt.toFixed(2));

                   function disableF5(e) { 
						if ((e.which || e.keyCode) == 116) 
							e.preventDefault(); 
					};
					$(document).on("keydown", disableF5);

					$('.singleChoosen').chosen({
						width : '100%'
					});
					
					$('.datepicker').datepicker({
							format : 'dd-M-yyyy',
							  todayHighlight: true,
				            'autoclose': true
						}); 
					
					$("#chequeChqDate").datepicker("setDate", new Date());
				
					$("#patientGender").hide();
					$("#pntMaritalStatus").hide();
					
					if ($("#apptFromDate").val() == '' || $("#apptToDate").val() == '') {
						$("#searchAppt").attr('disabled', true);
					} else {
						$("#e.preventDefault(); ").attr('disabled', false);
					}

					/* $("#pntDob").datepicker({
						format : 'yyyy-mm-dd',
						todayHighlight : true,
						endDate : '0d',
						autoclose: true
					}).on('changeDate', function() {
						var dateText = $("#pntDob").val();
							
						//$("#age").val(calculateAge(dateText));
						//alert(dateText);
					var string=getAgeIYMD(dateText);
					stringAge= string.split('-');
					//alert(stringAge);
					if(stringAge[2] != ''){
						$("#age").val(stringAge[0]);	
					}else{ $("#age").val('0'); }
					if(stringAge[1] != ''){
						$("#ageMonths").val(stringAge[1]);	
					}else{ $("#ageMonths").val('0'); }
					if(stringAge[0] != ''){
						$("#ageDays").val(stringAge[2]);	
					}else{ $("#ageDays").val('0'); }
					
						
					});
				 function getAgeIYMD(dateText) {
					var now = new Date(); //Todays Date   
					//var birthday = Xrm.Page.getAttribute("birthdate").getValue();
					var birthday= dateText;
					birthday=birthday.split("-"); 
					
					var dobDay= birthday[2];
					var dobMonth= birthday[1]; 
					var dobYear= birthday[0];

					var nowDay= now.getDate();
					var nowMonth = now.getMonth() + 1;  //jan=0 so month+1
					var nowYear= now.getFullYear();

					var ageyear = nowYear- dobYear;
					var agemonth = nowMonth - dobMonth;
					var ageday = nowDay- dobDay;
					if (agemonth < 0) {
					       ageyear--;
					       agemonth = (12 + agemonth);
					        }
					if (nowDay< dobDay) {
					      agemonth--;
					      ageday = 30 + ageday;
					      }
					var val = ageyear + "-" + agemonth + "-" + ageday;
					return val;
				}

					var calculateAge = function(birthday) {
						var now = new Date();
						var past = new Date(convertDate(birthday));
						var nowYear = now.getFullYear();
						var pastYear = past.getFullYear();
						var age = nowYear - pastYear;
						return age;
					};
							
					function convertDate(date){
					   var months = {'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'};
					   var splitArr = date.split('-'); // split based on '-'
					  // alert(splitArr);
					   var yyyy = splitArr[0] ; // add '20' before year
					   var mm = months[splitArr[1].toLowerCase()] ; // convert month into lower
					   var dd = splitArr[2] ;
					   if (dd < 10) dd = dd;  // add '0' if date is less than 10.
						   return [yyyy,mm,dd].join('-'); // join value according to format.
					}
 */	
 function calculateDobFromAge() {
	    var years = parseInt($("#age").val()) || 0;
	    var months = parseInt($("#ageMonths").val()) || 0;
	    var days = parseInt($("#ageDays").val()) || 0;

	    var today = new Date();

	    // Subtract years, months, days
	    var dob = new Date(
	        today.getFullYear() - years,
	        today.getMonth() - months,
	        today.getDate() - days
	    );

	    // Format DOB to yyyy-mm-dd
	    var yyyy = dob.getFullYear();
	    var mm = String(dob.getMonth() + 1).padStart(2, '0');
	    var dd = String(dob.getDate()).padStart(2, '0');

	    var formattedDob = yyyy + "-" + mm + "-" + dd;

	    $("#pntDob").val(formattedDob);
	}

$("#age, #ageMonths, #ageDays").on("keyup change", function () {
	    calculateDobFromAge();
	});
$("#age, #ageMonths, #ageDays").on("focus", function () {
	    $("#pntDob").val('');
	});

 $("#pntDob").datepicker({
	    format: 'yyyy-mm-dd',
	    todayHighlight: true,
	    endDate: '0d',
	    autoclose: true
	}).on('changeDate', function () {
	    var dateText = $("#pntDob").val();
	    var ageParts = getAgeInYMD(dateText); // We'll define this next

	    $("#age").val(ageParts.years);
	    $("#ageMonths").val(ageParts.months);
	    $("#ageDays").val(ageParts.days);
	});

	// Calculate difference between today and given DOB in years, months, days
	function getAgeInYMD(dobStr) {
	    var dob = new Date(dobStr);
	    var today = new Date();

	    var years = today.getFullYear() - dob.getFullYear();
	    var months = today.getMonth() - dob.getMonth();
	    var days = today.getDate() - dob.getDate();

	    if (days < 0) {
	        months--;
	        var prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
	        days += prevMonth.getDate(); // days in previous month
	    }

	    if (months < 0) {
	        years--;
	        months += 12;
	    }

	    return {
	        years: years < 0 ? 0 : years,
	        months: months < 0 ? 0 : months,
	        days: days < 0 ? 0 : days
	    };
	}	
						/* end Calculating age */
							
						//var pageUrl = window.location.pathname; // Returns path only
						var pageUrl = "/<s:message code="projectName"></s:message>/patient/patientQueue";
						//alert(pageUrl);
						var url = "/<s:message code="projectName"></s:message>/security/getPageButtonItems?pageUrl="
								+ pageUrl;
						
						$.ajax({
							url : url,
							success : function(buttonInter) {
								//alert(buttonInter);
								$("#buttonsDiv").html(buttonInter);
							},
							error : function() {
								alert("in error");
							}
						});

						var url = "/<s:message code="projectName"></s:message>/country/getCountryList";

						$.ajax({
						    url: url,
						    success: function(countriesList) {

						        $("#country").html(countriesList);

						        var countryCode = $("#country option:selected").val();

						        getStatesList(countryCode);
						    }
						});


		
						function getStatesList(countryCode) {

						    var url =
						        "/<s:message code='projectName'></s:message>/state/getStatesList?countryCode="
						        + countryCode;

						    $.ajax({
						        url: url,
						        type: "GET",

						        success: function(statesList) {

						            console.log("States loaded");

						            $("#state").html(statesList);

						            // Don't call state change here
						            $("#state").val("");

						            $("#state").trigger("chosen:updated");
						        }
						    });
						}
						
						
						$("#state").change(function() {

						    var stateCode = $(this).val();
						    var stateName = $("#state option:selected").text();

						    console.log("BEFORE");
						    console.log("State ID =", stateCode);
						    console.log("State Name =", stateName);

						    if (stateCode && stateCode !== "0") {

						        getCitiesList(stateCode);

						        // Restore state after city list is loaded
						        setTimeout(function() {

						            $("#state").val(stateCode);
						            $("#state").trigger("chosen:updated");

						            console.log("AFTER");
						            console.log("State ID =", $("#state").val());
						            console.log("State Name =", $("#state option:selected").text());

						        }, 500);
						    }
						});
						
						
					/* 	
						function getState(cityId) {

						    var url = "/<s:message code='projectName'></s:message>/state/getStateByCity?cityId="
						            + cityId;
                                    alert("url");
						    $.ajax({
						        url: url,
						        type: "GET",
						        success: function(states) {

						            // Load states
						            $("#state").html(statesList);

						            // Reset state selection
						            $("#state").val("");

						            // Refresh Chosen
						            $("#state").trigger("chosen:updated");

						            // Get selected state
						            var stateCode = $("#state option:selected").val();

						            if (stateCode && stateCode !== "0") {
						                getCitiesList(stateCode);
						            }
						        }
						    });
						}
 */
						function getCitiesList(stateCode) {

						    var url = "/<s:message code='projectName'></s:message>/city/getCitiesList?stateCode="
						            + stateCode;

						    $.ajax({
						        url: url,
						        type: "GET",
						        success: function(citiesList) {

						            // Load cities
						            $("#city").html(citiesList);

						            // Reset city selection
						            $("#city").val("");

						            // Refresh Chosen
						            $("#city").trigger("chosen:updated");

						            // IMPORTANT:
						            // Trigger city change AFTER cities are loaded
						            $("#city").trigger("change");
						        }
						    });
						}
 $("#city").change(function () {

	    console.log("===== CITY CHANGE START =====");

	    var cityId = $(this).val();

	    console.log("City ID =", cityId);

	    // Do NOT clear state when city is empty
	    if (!cityId || cityId === "0") {
	        console.log("City is empty. State will remain unchanged.");
	        return;
	    }

	    var url =
	        "/<s:message code='projectName'></s:message>/state/getStateByCity";

	    $.ajax({
	        url: url,
	        type: "GET",
	        data: {
	            cityId: cityId
	        },
	        dataType: "json",

	        success: function (response) {

	            console.log("===== GET STATE BY CITY SUCCESS =====");
	            console.log("Response =", response);

	            if (response && response.length > 0) {

	                var stateId = response[0].stateId;
	                var stateName = response[0].state;

	                console.log("State ID =", stateId);
	                console.log("State Name =", stateName);

	                $("#state").html(
	                    '<option value="' +
	                    stateId +
	                    '">' +
	                    stateName +
	                    '</option>'
	                );

	                $("#state").val(stateId);

	                $("#state").trigger("chosen:updated");

	                console.log(
	                    "Final State =",
	                    $("#state").val(),
	                    $("#state option:selected").text()
	                );

	            } else {

	               // alert(" state found for this city");

	                // Don't unnecessarily clear state here either
	                return;
	            }
	        },

	        error: function (xhr, status, error) {

	            console.log("AJAX ERROR");
	            console.log("Status =", status);
	            console.log("Error =", error);
	            console.log("Response =", xhr.responseText);
	        }
	    });
	});
						/* function getAllCitiesList() {

						    var url = "/<s:message code="projectName"></s:message>/city/getAllCitiesList";

						    $.ajax({
						        url: url,
						        type: "GET",
						        success: function(citiesList) {

						            $("#city").html(citiesList);

						            // Reset selection
						            $("#city").val("");

						            // Refresh Chosen
						            $("#city").trigger("chosen:updated");
						        }
						    });
						} */
							//$("#pntMobNum").change(function() {
								//$("#pntMobNum").click(function(){
							  /* 
							  COMMENT BY MANIKANTA DATTI: INDIVIDUAL CODE IN SEARCH OPERATION THIS BELOW CODE.
							  
							  $("#pntMobNum").keyup(function() {
								var mobNum = $("#pntMobNum").val();
								var patientName = $("#newPatientName").val();
								var lName = $("#lastName").val();
								var age = $("#age").val();
								var idNum = $("#idNum").val();
								
								
								var url = "/<s:message code="projectName"></s:message>/patient/getPatDetailsold?patientName=" + patientName +
								"&lName="+lName+ "&age="+age+"&mobNum="+mobNum ;

                                     //alert(url);
								$.ajax({
							        url: url,
							        type: 'GET',
							        cache:false,
							        success:function(response){
							        	var data = response.split("^");
	                                    // alert(data[1]);
	                                    	
	                                    	if(data[1] != 0){
									        
									        patDetailsAjaxOld(data[1]);
	                                    	}else{
	                                    		
	                                    	}
	                                    	
	                                     //alert(data[2]);
									//	$("#patientDetailsDiv").html(response);
							        }
								});
								// $("#patdet-modal").modal('show');
								
								//	alert("1111111111"+pntMobNum);
								
								});
							   
							   $("#age").keyup(function() {
									var mobNum = $("#pntMobNum").val();
									var patientName = $("#newPatientName").val();
									var lName = $("#lastName").val();
									var age = $("#age").val();
									var idNum = $("#idNum").val();
									
									
									var url = "/<s:message code="projectName"></s:message>/patient/getPatDetailsold?patientName=" + patientName +
									"&lName="+lName+ "&age="+age+"&mobNum="+mobNum ;

	                                     //alert(url);
									$.ajax({
								        url: url,
								        type: 'GET',
								        cache:false,
								        success:function(response){
								        	var data = response.split("^");
		                                    // alert(data[1]);
		                                    	
		                                    	if(data[1] != 0){
										        
										        patDetailsAjaxOld(data[1]);
		                                    	}else{
		                                    		
		                                    	}
		                                    	
		                                     //alert(data[2]);
										//	$("#patientDetailsDiv").html(response);
								        }
									});
									// $("#patdet-modal").modal('show');
									
									//	alert("1111111111"+pntMobNum);
									
									});
							   
							   $("#lastName").keyup(function() {
									var mobNum = $("#pntMobNum").val();
									var patientName = $("#newPatientName").val();
									var lName = $("#lastName").val();
									var age = $("#age").val();
									var idNum = $("#idNum").val();
									
									
									var url = "/<s:message code="projectName"></s:message>/patient/getPatDetailsold?patientName=" + patientName +
									"&lName="+lName+ "&age="+age+"&mobNum="+mobNum ;

	                                     //alert(url);
									$.ajax({
								        url: url,
								        type: 'GET',
								        cache:false,
								        success:function(response){
								        	var data = response.split("^");
		                                    // alert(data[1]);
		                                    	
		                                    	if(data[1] != 0){
										        
										        patDetailsAjaxOld(data[1]);
		                                    	}else{
		                                    		
		                                    	}
		                                    	
		                                     //alert(data[2]);
										//	$("#patientDetailsDiv").html(response);
								        }
									});
									// $("#patdet-modal").modal('show');
									
									//	alert("1111111111"+pntMobNum);
									
									});
							   
							   $("#newPatientName").keyup(function() {
									var mobNum = $("#pntMobNum").val();
									var patientName = $("#newPatientName").val();
									var lName = $("#lastName").val();
									var age = $("#age").val();
									var idNum = $("#idNum").val();
									
									
									var url = "/<s:message code="projectName"></s:message>/patient/getPatDetailsold?patientName=" + patientName +
									"&lName="+lName+ "&age="+age+"&mobNum="+mobNum ;

	                                     //alert(url);
									$.ajax({
								        url: url,
								        type: 'GET',
								        cache:false,
								        success:function(response){
								        	var data = response.split("^");
		                                    // alert(data[1]);
		                                    	
		                                    	if(data[1] != 0){
										        
										        patDetailsAjaxOld(data[1]);
		                                    	}else{
		                                    		
		                                    	}
		                                    	
		                                     //alert(data[2]);
										//	$("#patientDetailsDiv").html(response);
								        }
									});
									// $("#patdet-modal").modal('show');
									
									//	alert("1111111111"+pntMobNum);
									
									});
							   
							   function patDetailsAjaxOld(modalPatientDetails) {
									
									var url = "/<s:message code="projectName"></s:message>/patient/getPatDetOldData?patientId=" + modalPatientDetails;
	                                    // alert(url);
									$.ajax({
								        url: url,
								        type: 'GET',
								        cache:false,
								        success:function(response){
		                                     //alert(response);
		                                      $("#patientNameDivAMMM").hide();
		                                     $("#patdet-modal").modal('show');
		                                     $("#apptWise").prop('checked', true);
		                                     
											$("#patientDetailsDiv").html(response);
								        }
									});
									
								} */
						/* function getStatesList(countryCode) {
							var url = "/<s:message code="projectName"></s:message>/state/getStatesList?countryCode="
									+ countryCode;
							//alert(url);
							$.ajax({
								url : url,
								success : function(statesList) {
									//alert(statesList);
									$("#state").html(statesList);
									var stateCode = $("#state option:selected").val();
									getCitiesList(stateCode);	
								}
							});
						} */
							
						/* function getCitiesList(stateCode) {

						    var url = "/<s:message code="projectName"></s:message>/city/getCitiesList?stateCode="
						            + stateCode;
                            alert("url");
						    $.ajax({
						        url: url,
						        success: function(citiesList) {

						            // Load cities returned from server
						            $("#city").html(citiesList);

						            // Clear previously selected city
						            $("#city").val("");

						            // Refresh Chosen after AJAX
						            $("#city").trigger("chosen:updated");
						        }
						    });
						}		 */							
					
						 $("#docName").keyup(function() {
							// e.preventDefault();
							 $("#docNameText").hide();
							 
										  var docName = $("#docName").val();
										  //alert(docName);
										  if (docName == '') {
												$("#docNameText").show();
												$("#docNameText").text("Enter Document name");
											} /* else if (!(docNameRegex.test(docName))) {
				        	        	      	 $("#docNameText").html("Enter valid Document name ");
				        	        	      	 $("#docNameText").show();
			                               } */ else{
			                            	   
			                            	   $("#docNameText").hide();
										
			                               }
											
										 // alert(surgeryexistedList.length);
						  });
						
						 
						
						 
						 
						
						$("#pntNationality").change(function() {
							var countryCode = $("#pntNationality option:selected").val();
							//alert(countryCode);
							if(countryCode!='Indian'){
								$("#state").val('').attr('disabled',true);
								$("#city").val('').attr('disabled',true);
								//$("#passportModal").modal('show');
							}else{
								getStatesList(countryCode);
								$("#state").attr('disabled',false);
								$("#city").attr('disabled',false);
							}
							//getStatesList(countryCode);
						}); 
						
						$("#country").change(function() {
							var countryCode = $("#country option:selected").val();
							//alert(1);
							
							getStatesList(countryCode);
						});
						
						/* $("#state").change(function() {
							var stateCode = $("#state option:selected").val();
							getCitiesList(stateCode);
						});
						 */
						 //For change function
	                   	
						var UMRNum = new Array();
						var patientId = {};
						var ptitle = {};
						var patientName = {};
						var patientCategory = {};
						var gender = {};
						var mobNum = {};
						var regDt = {};
						var age = {};
						var ageMonths = {};
						var ageDays = {};
						var careBy = {};
						var careByName = {};
						var smsStatus = {};
						var city = {};
						var village = {};
						var villageNames = {};
						var addr = {};
						var catVal = {};
						var state = {};
						var picName = {};
						var category = {};
						var patientDob = {};

						var patCategorys = {};
						var martialStatus = {};
						var nationalitys = {};
						var religions = {};
						var bloodGroups = {};
						var occupations = {};
						var idProofs = {};
						var idNumbers = {};
						var lName = {};

						var orgIds = {};
						var doctorDetails = {};
						var refTypes = {};
						var otherHospIds = {};
						var otherStaffIds = {};
						var refIds = {};
						var refDocDetails = {};
						var locIds = {};
					
							/* $("#patientName").keypress(function(e) {
							    if(e.which == 13) {
									$("#modalPatientDetails").val($("#patientName").val());
									$("#modalPatientDetails").focus();

									patDetailsAjax($("#patientName").val());
									
							        $("#patdet-modal").modal('show');
							    }
							}); */
							
							$("#customerCode").keypress(function(e) {
			    				var customerCode = $("#customerCode").val().length;
			    				//alert(customerCode + ">>>>>customerCode");
			    				if (customerCode >= "5") {
			    				//alert(123);
			    					if(e.which == 13) { 
			    						//alert(123);
			    					$("#modalPatientDetails").val($("#customerCode").val());
									$("#modalPatientDetails").focus();

									patientDetailsAjax($("#customerCode").val());
									
							        $("#patdet-modal").modal('show');
							        $("#errCustomerId").hide();
							    } 
			    				}else{
			    					$("#errCustomerId").show();
									$("#errCustomerId").text("Enter atleast 5 numbers");
			    				}
							});
							
							//PatientQuee
							$("#patientName").keypress(function(e) {
			    				var customerCode = $("#patientName").val().length;
			    				//alert(customerCode + ">>>>>customerCode");
			    				if (customerCode >= "5") {
			    				//alert(123);
			    					if(e.which == 13) { 
			    						//alert(123);
			    					$("#modalPatientDetails").val($("#patientName").val());
									$("#modalPatientDetails").focus();

									patDetailsAjax($("#patientName").val());
									
							        $("#patient-add-in-search").modal('show');
							        $("#patientNameText").hide();
							    } 
			    				}else{
			    					$("#patientNameText").show();
									$("#patientNameText").text("Enter atleast 5 numbers");
			    				}
							});
						

							//'keyup()' function on '#patientDiv'  used to dispaly the patient details based on '#patientName'.
							$('#patientNameDiv').on('keyup', '#patientName', function() {
								var patDetailsLen = $("#patientName").val().length;
								//alert(patDetailsLen);
								if (patDetailsLen >= "50") {
									//$("#patientDetailsDiv").html($("#loadarDiv").html());
									$("#modalPatientDetails").val($("#patientName").val());
									
									//alert(modalPatientDetails);
									patDetailsAjax($("#patientName").val());
									$("#patdet-modal").modal('show');
									$("#patdet-modal #modalPatientDetails").trigger('focus');
								}
							});
							
							/* $("#patdet-modal").off('shown.bs.modal').on('shown.bs.modal', function () {

							    var value = window.modalSearchValue || "";

							    console.log("Setting value:", value);

							    $("#modalPatientDetails").val(value).focus();


							    if (value.length > 0) {
							        $("#patientDetailsDiv").html($("#loadarDiv").html());
							        patDetailsAjax(value);
							    }
							}); */
							function patDetailsAjax(modalPatientDetails) {
								
								var url = "/<s:message code="projectName"></s:message>/patient/getPatDetails?patientName=" + modalPatientDetails +
								"&umrNo="+modalPatientDetails+ "&mobNum="+modalPatientDetails ;
                                     //alert(url);
								$.ajax({
							        url: url,
							        type: 'GET',
							        cache:false,
							        success:function(response){
	                                     //alert(response);
										$("#patientDetailsDiv").html(response);
							        }
								});
								
							}
// 							 $("#idType").on("keyup",function() {
								 $("#idType").change(function(){
								 var idType = $("#idType").val();
								//	alert(idType);
// 					     	    	$("#passportNumberText").hide();
									if (idType == '0') {
										$("#idNumText").hide();
									}else{
										$("#idNumText").show();
					        	      	$("#idNumText").html("Enter ID number");
									}
								});
							$("#modalPatientDetails").on("keyup", function() {
								
								var modalPatientDetailsLen = $("#modalPatientDetails").val().length;
								//alert(modalPatientDetails);
								
								if (modalPatientDetailsLen > "5") {
									
									$("#patientDetailsDiv").html($("#loadarDiv").html());
									
									var modalPatientDetails = $("#modalPatientDetails").val();
									//alert(modalPatientDetails);
									patDetailsAjax(modalPatientDetails);
								}

							});

							$("#modalRegPatientDetails").keypress(function(e) {
							  
								var modalRegPatientDetails = $("#modalRegPatientDetails").val().length;
								
								if (modalRegPatientDetails >= "5") {
								if(e.which == 13) {

									$("#patientDetailsDiv").html($("#loadarDiv").html());
									
							    	var modalRegPatientDetails = $("#modalRegPatientDetails").val();
									//alert(modalPatientDetails);
						            patRegDetailsAjax(modalRegPatientDetails);
							    }
								}
							});
							
							/* $('.modal').on('hidden.bs.modal', function (e) {
								
							    $("#modalPatientDetails").val(''); 
							    $("#modalPckgName").val('');  
							    
							    $("#patientDetailsDiv").html('');


							}); */
					//to get reg suv patient details
					
					$('#regPatdet-modal').off('shown.bs.modal').on('shown.bs.modal', function () {

    var value = window.modalSearchValue || "";

    console.log("Modal opened with:", value);

    $("#modalRegPatientDetails").val(value).focus();

    if (value.length >= 3) {
        $("#regPatientDetailsDiv").html($("#loadarDiv").html());
        patRegDetailsAjax(value);
    }
});
					
						$("#regPatientName").keypress(function(e) {
						    if(e.which == 13) {
								$("#modalRegPatientDetails").val($("#regPatientName").val());
								$("#modalRegPatientDetails").focus();

								patRegDetailsAjax($("#regPatientName").val());
								
						        $("#regPatdet-modal").modal('show');
						    }
						});

						//'keyup()' function on '#patientDiv'  used to dispaly the patient details based on '#regPatientName'.
						$('#patientDiv').on('keyup', '#regPatientName', function() {
							var regPatDetailsLen = $("#regPatientName").val().length;
							//alert(patDetailsLen);
							if (regPatDetailsLen >= "3") {
								//$("#regPatientDetailsDiv").html($("#loadarDiv").html());
								$("#modalRegPatientDetails").val($("#regPatientName").val());
								
								//alert(modalRegPatientDetails);
								patRegDetailsAjax($("#regPatientName").val());
								$("#regPatdet-modal").modal('show');
								$("#regPatdet-modal #modalRegPatientDetails").trigger('focus');
								
							}
						});
						
						/* $("#regPatdet-modal").on('shown.bs.modal', function(){
							
							$(this).find('#modalRegPatientDetails').focus();

							}); */
						
						function patRegDetailsAjax(modalRegPatientDetails) {
							
							var url = "/<s:message code="projectName"></s:message>/patient/getRegPatDetails?regPatientName=" + modalRegPatientDetails +
							"&regUmr="+modalRegPatientDetails+ "&pntMobNum="+modalRegPatientDetails ;
							alert();

							$.ajax({
						        url: url,
						        type: 'GET',
						        cache:false,
						        success:function(response){
                                     //alert(response);
									$("#regPatientDetailsDiv").html(response);
						        }
							});
							
						}
						
						$("#modalRegPatientDetails").on("keyup", function() {

						    var value = $(this).val();

						    if (value.length >= 3) {   // ✔ use number, not "5"

						        $("#regPatientDetailsDiv").html($("#loadarDiv").html());

						        patRegDetailsAjax(value);
						    }
						});


						/* $("#modalRegPatientDetails").keypress(function(e) {
						    if(e.which == 13) {

								$("#regPatientDetailsDiv").html($("#loadarDiv").html());
								
						    	var modalRegPatientDetails = $("#modalRegPatientDetails").val();
								//alert(modalRegPatientDetails);
								patRegDetailsAjax(modalRegPatientDetails);
						    }
						});
 */						
						/* $('.modal').on('hidden.bs.modal', function (e) {
							
						    $("#modalRegPatientDetails").val(''); 
						    						    
						    $("#regPatientDetailsDiv").html('');
						}); */
						var ind = null;
						$("#patientInfo").on('click','.viewBut',function(event) {
							event.preventDefault();
							
							$("#updtPatientTitle").prop('disabled', 'disabled');
							$("#updtLastName").attr('readonly', true);
							$("#updtPatientName").attr('readonly', true);
							$("#updtPatientGender").prop('disabled', 'disabled');
							$("#updtPatientCat").prop('disabled', 'disabled');
							$("#updtOrgId").prop('disabled', 'disabled');
							$("#updtPatientDob").attr('disabled', true);
							$("#updtPatientAge").attr('readonly', true);
							$("#updtPatientMobNum").attr('readonly', true);
							$("#updtSmsAlert").attr('disabled', true);
							$("#updtState").prop('disabled', 'disabled');
							$("#updtCity").prop('disabled', 'disabled');
							$("#updtMaritalStatus").prop('disabled', 'disabled');
							$("#updtNationality").prop('disabled', 'disabled');
							$("#updtVillage").attr('readonly', true);
							$("#updtAddr").attr('readonly', true);
							//$("#updtPatientDob").attr('readonly', true);
							$("#updtReligion").prop('disabled', 'disabled');
							$("#updtRefType").prop('disabled', 'disabled');
							$("#updtRefId").prop('disabled', 'disabled');
							$("#updateOtherHospId").prop('disabled', 'disabled');
							$("#updateOtherStaffId").prop('disabled', 'disabled');
							$("#updtIdType").prop('disabled', 'disabled');
							$("#updtBloodGrp").prop('disabled', 'disabled');
							$("#updtIdNum").attr('readonly', true);
							$("#updtOccupation").attr('disabled', true);
							$("#savePatientRec").hide();
							$("#editPatientRec").show();
							
							
							var trId;
							ind = $(this).closest('tr').index();
							trId = $(this).closest('tr').prop('id');
							var patientId= $(this).closest('tr').find(".patientId").val();
							$("#updtPatientId").val(patientId);
							var patientCode= $(this).closest('tr').find(".patientCode").val();
							var patientName = $(this).closest('tr').find(".pname").val();
							var lName = $(this).closest('tr').find(".lName").val();
						//	alert(lName);
							var gender = $(this).closest('tr').find(".pntUpdtGender").val();
							var pntUpdtDob = $(this).closest('tr').find(".pntUpdtDob").val();
							var age = $(this).closest('tr').find(".pntUpdtAge").val();
							var ageDays = $(this).closest('tr').find(".pntUpdtAgeDays").val();
							var ageMonths = $(this).closest('tr').find(".pntUpdtAgeMonths").val();
							var mobNum = $(this).closest('tr').find(".pntUpdtMobNum").val();
							var city = $(this).closest('tr').find(".pntUpdtCity").val();
							var village = $(this).closest('tr').find(".pntUpdtVillage").val();
							var addr = $(this).closest('tr').find(".pntUpdtAddr").val();
							var maritalStatus = $(this).closest('tr').find(".pntUpdtMaritalStatus").val();
							var religion = $(this).closest('tr').find(".pntUpdtReligion").val();
							var idProofType = $(this).closest('tr').find(".pntUpdtIdProofType").val();
							var idProofNum = $(this).closest('tr').find(".pntUpdtIdProofNum").val();
							var occupation = $(this).closest('tr').find(".pntUpdtOccupation").val();
							var refType = $(this).closest('tr').find(".pntUpdtRefType").val();
							var smsStatus = $(this).closest('tr').find(".pntUpdtSmsStatus").val();
							var smsAlert = $(this).closest('tr').find(".pntUpdtSmsAlert").val();
							var nationality = $(this).closest('tr').find(".pntUpdtNationality").val();
							var pntUpdtBloodGrp = $(this).closest('tr').find(".pntUpdtBloodGrp").val();
							var patientCategoryId = $(this).closest('tr').find(".pntUpdtPatCatId").val();
							var state = $(this).closest('tr').find(".pntUpdtState").val();
							var bloodGrp = $(this).closest('tr').find(".pntUpdtBloodGrp").val();
							var refId = $(this).closest('tr').find(".pntUpdtRefId").val();
							var occupation = $(this).closest('tr').find(".pntUpdtOccupation").val();
							var otherHospId = $(this).closest('tr').find(".otherHospId").val();
							var otherStaffId = $(this).closest('tr').find(".otherStaffId").val();
							var paymentType = $(this).closest('tr').find(".paymentType").val();
							
							//getCitiesListt(state);
						    var ptitle = $(this).closest('tr').find(".ptitle").val();
						    $("#updtPatientTitle").val(ptitle).trigger('choosen:updated');
							$("#updtState").val(state).trigger('choosen:updated');
						    $("#updtPatientCode").val(patientCode);
							$("#updtPatientName").val(patientName);
							$("#updtLastName").val(lName);
							$("#updtPatientGender").val(gender).trigger('choosen:updated');
							$("#updtPatientDob").val(pntUpdtDob);
							$("#updtPatientAge").val(age);
							$("#updtPatientAgeMonths").val(ageMonths);
							$("#updtPatientAgeDays").val(ageDays);
							$("#updtPatientMobNum").val(mobNum);
							$("#updtVillage").val(village);
							$("#updtAddr").val(addr);
							$("#updtMaritalStatus").val(maritalStatus).trigger('choosen:updated');
							$("#updtNationality").val(nationality).trigger('choosen:updated');
							/* if(nationality=='IND'){
								$("#updtNationality").val('Indian').trigger('choosen:updated');
							}else{
								
							} */
							
							$("#updtReligion").val(religion).trigger('choosen:updated');
							$("#updtIdType").val(idProofType).trigger('choosen:updated');
							$("#updtIdNum").val(idProofNum);
							$("#updtPatientCat").val(patientCategoryId).trigger('choosen:updated');
							$("#updtBloodGrp").val(bloodGrp).trigger('choosen:updated');
							$("#updtOccupation").val(occupation).trigger('choosen:updated');
							$("#updtRefType").val(refType).trigger('choosen:updated');
							//$("#updtRefId").val(refId).trigger('choosen:updated');
								var url = "/<s:message code="projectName"></s:message>/city/getCitiesList?stateCode="
								  + state;
			                   // alert(url);
								$.ajax({
									url : url,
									success : function(citiesList) {
										//alert(citiesList);
										$("#updtCity").html(citiesList);
										$("#updtCity").val(city).trigger('choosen:updated');
									}
								});
								var patcat = $("#updtPatientCat").val();
                                var x = paymentType.split("-");
                                //alert(x);
								if(patcat ==4){
									
									$("#updatePaymentTypeDiv").show();
									$("#updatePaymentType").val(x[0]).trigger('choosen:updated');
									$("#billIdUpdt").val(x[1]);
								}else{
									$("#updatePaymentType").val('0').trigger('choosen:updated');
									$("#updatePaymentTypeDiv").hide();
								}
							
							//alert(city+"city");
							//alert(village+"village");
							if (smsAlert == 'Y') {
								$("#updtSmsAlert").prop('checked', true);
							} else {
								$("#updtSmsAlert").prop('checked', false);
							}
							
							var refTypee = $("#updtRefType option:selected").text();
							if ($.trim(refTypee) == 'Staff Doctors') {
								
								$("#updtRefDiv").show();
								$("#updtRefDiv #updtRefId").val(refId).trigger('chosen:updated');
								
								$("#updateOtherStaffDiv").hide();
								$("#updateOtherHospDiv").hide();
								
							} else if ($.trim(refTypee) === "Other Hospitals") {
								//alert(refTypee);
								$("#updateOtherHospId").val(otherHospId).trigger('chosen:updated');
								$("#updateOtherHospDiv").show();
								$("#updtRefDiv").hide();
								$("#updateOtherStaffDiv").hide();
								
								
							} else if ($.trim(refTypee) === "Other Staff") {
								//alert(refTypee+"0s");
								$("#updateOtherStaffId").val(otherStaffId).trigger('chosen:updated');
								$("#updateOtherStaffDiv").show();
								$("#updtRefDiv").hide();
								$("#updateOtherHospDiv").hide();
							}else {
								$("#updtRefDiv").hide();
								$("#updateOtherStaffDiv").hide();
								$("#updateOtherHospDiv").hide();
								
								//alert(13);
							}
							$("#patientUpdate").modal('show');
						});	
						$("#otherHospId").change(function(){
							var refName = $("#otherHospId option:Selected").text();

							
							$("#updateOtherHospName").val(refName);
							
						});
						
						$("#updateOtherStaffId").change(function(){
							var refName = $("#updateOtherStaffId option:Selected").text();

							
							$("#updateOtherStaffName").val(refName);
							
						});

						
						$("#editPatientRec").click(function(){
							$("#updtPatientName").attr('readonly', false);
							$("#updtLastName").attr('readonly', false);
							$("#updtPatientGender").prop('disabled', false);
							$("#updtPatientCat").prop('disabled', false);
							$("#updtOrgId").prop('disabled', false);
							$("#updtPatientDob").attr('disabled', false);
							$("#updtPatientAge").attr('readonly', false);
							$("#updtPatientAgeMonths").attr('readonly', false);
							$("#updtPatientAgeDays").attr('readonly', false);
							$("#updtPatientMobNum").attr('readonly', false);
							$("#updtSmsAlert").attr('disabled', false);
							$("#updtState").prop('disabled', false);
							$("#updtPatientTitle").prop('disabled', false);
							$("#updtCity").prop('disabled', false);
							$("#updtMaritalStatus").prop('disabled', false);
							$("#updtNationality").prop('disabled', false);
							$("#updtVillage").attr('readonly', false);
							$("#updtAddr").attr('readonly', false);
							//$("#updtPatientDob").attr('readonly', false);
							$("#updtReligion").prop('disabled', false);
							$("#updtRefType").prop('disabled', false);
							
							var userRole = $("#userRole").val();
							if(userRole === "Admin"){
								
								$("#updatePaymentType").prop('disabled', false);
							}
							
							$("#updtRefId").prop('disabled', false).trigger("chosen:updated");
							$("#updateOtherHospId").prop('disabled', false).trigger("chosen:updated");
							$("#updateOtherStaffId").prop('disabled', false).trigger("chosen:updated");
							//$("#updtRefId").attr('readonly', false);
							$("#updtIdType").prop('disabled', false);
							$("#updtBloodGrp").prop('disabled', false);
							$("#updtIdNum").attr('readonly', false);
							$("#updtOccupation").attr('disabled', false);
							$("#savePatientRec").show();
							$("#editPatientRec").hide();
						});
						
						$("#cancelEditRec").click(function(){
							$("#updtPatientName").attr('readonly', true);
							$("#updtPatientGender").prop('disabled', 'disabled');
							$("#updtPatientCat").prop('disabled', 'disabled');
							$("#updtOrgId").prop('disabled', 'disabled');
							$("#updtPatientDob").attr('disabled', true);
							$("#updtPatientAge").attr('readonly', true);
							$("#updtPatientMobNum").attr('readonly', true);
							$("#updtSmsAlert").attr('disabled', true);
							$("#updtState").prop('disabled', 'disabled');
							$("#updtCity").prop('disabled', 'disabled');
							$("#updtMaritalStatus").prop('disabled', 'disabled');
							$("#updtNationality").prop('disabled', 'disabled');
							$("#updtVillage").attr('readonly', true);
							$("#updtAddr").attr('readonly', true);
							//$("#updtPatientDob").attr('readonly', true);
							$("#updtReligion").prop('disabled', 'disabled');
							$("#updtRefType").prop('disabled', 'disabled');
							$("#updtRefId").prop('disabled', 'disabled');
							$("#updateOtherHospId").prop('disabled', 'disabled');
							$("#updateOtherStaffId").prop('disabled', 'disabled');
							$("#updtIdType").prop('disabled', 'disabled');
							$("#updtBloodGrp").prop('disabled', 'disabled');
							$("#updtIdNum").attr('readonly', true);
							$("#updtOccupation").attr('disabled', true);
							$("#savePatientRec").hide();
							$("#editPatientRec").show();
							$("#updatePaymentType").prop('disabled', true);
						});
						
						$("#updtPatientDob").datepicker({
							format : 'yyyy-mm-dd',
							todayHighlight : true,
							endDate : '0d',
							autoclose: true
						}).on('changeDate', function() {
							var dateText = $("#updtPatientDob").val();
								
							//$("#age").val(calculateAge(dateText));
							//alert(dateText);
							var string=getAgeIYMD(dateText);
							var stringAge= string.split('-');
							//alert(stringAge);
							if(stringAge[2] != ''){
								$("#updtPatientAge").val(stringAge[0]);	
							}else{ $("#updtPatientAge").val('0'); }
							if(stringAge[1] != ''){
								$("#updtPatientAgeMonths").val(stringAge[1]);	
							}else{ $("#updtPatientAgeMonths").val('0'); }
							if(stringAge[0] != ''){
								$("#updtPatientAgeDays").val(stringAge[2]);	
							}else{ $("#updtPatientAgeDays").val('0'); }
						
							
						});
						
						
						$("#updtRefType").change(function(){
							var refType= $("#updtRefType option:Selected").text();
							$("#updtRefId").val("0").trigger('chosen:updated');
							$("#updateOtherHospId").val("0").trigger('chosen:updated');
							$("#updateOtherStaffId").val("0").trigger('chosen:updated');
							
							$("#updtRefDiv").hide();
							$("#updateOtherHospDiv").hide();
							$("#updateOtherStaffDiv").hide();
							$("#updateOtherDoctorsDiv").hide();
							if ($.trim(refType) === "Staff Doctors") {
								$("#updtRefDiv").show();
							} else if ($.trim(refType) === "Other Hospitals") {
								$("#updateOtherHospDiv").show();
							} else if ($.trim(refType) === "Other Staff") {
								$("#updateOtherStaffDiv").show();
							}else if ($.trim(refType) === "Other Doctors") {
								$("#updateOtherDoctorsDiv").show();
							}
							//uiAdjustments();
						});
						
						
						
						
						
						
					 function getAgeIYMD(dateText) {
						var now = new Date(); //Todays Date   
						//var birthday = Xrm.Page.getAttribute("birthdate").getValue();
						var birthdayy= dateText;
						var birthday=birthdayy.split("-"); 
						
						var dobDay= birthday[2];
						var dobMonth= birthday[1]; 
						var dobYear= birthday[0];

						var nowDay= now.getDate();
						var nowMonth = now.getMonth() + 1;  //jan=0 so month+1
						var nowYear= now.getFullYear();

						var ageyear = nowYear- dobYear;
						var agemonth = nowMonth - dobMonth;
						var ageday = nowDay- dobDay;
						if (agemonth < 0) {
						       ageyear--;
						       agemonth = (12 + agemonth);
						        }
						if (nowDay< dobDay) {
						      agemonth--;
						      ageday = 30 + ageday;
						      }
						var val = ageyear + "-" + agemonth + "-" + ageday;
						//alert(val);
						return val;
					}

					  
						var calculateAge = function(birthday) {
							var now = new Date();
							var past = new Date(convertDate(birthday));
							var nowYear = now.getFullYear();
							var pastYear = past.getFullYear();
							var age = nowYear - pastYear;
							return age;
						};
								
						function convertDate(date){
						   var months = {'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'};
						   var splitArr = date.split('-'); // split based on '-'
						  // alert(splitArr);
						   var yyyy = splitArr[0] ; // add '20' before year
						   var mm = months[splitArr[1].toLowerCase()] ; // convert month into lower
						   var dd = splitArr[2] ;
						   if (dd < 10) dd = dd;  // add '0' if date is less than 10.
							   return [yyyy,mm,dd].join('-'); // join value according to format.
						} 
						var url = "/<s:message code="projectName"></s:message>/country/getCountryList";
						$.ajax({
							url : url,
							success : function(countriesList) {
								$("#updtCountry").html(countriesList);
								var countryCode = $("#updtCountry option:selected").val();
								getStatesListt(countryCode);
							}
						});

						function getStatesListt(countryCode) {
							var url = "/<s:message code="projectName"></s:message>/state/getStatesList?countryCode="
									+ countryCode;
							$.ajax({
								url : url,
								success : function(statesList) {
									$("#updtState").html(statesList);
									var stateCode = $("#updtState option:selected").val();
									getCitiesListt(stateCode);							
								}
							});
						}
						//var stateCode = $("#updtState option:selected").val();
						function getCitiesListt(stateCode) {
							var url = "/<s:message code="projectName"></s:message>/city/getCitiesList?stateCode="
									+ stateCode;
                            //alert(url);
							$.ajax({
								url : url,
								success : function(citiesList) {
									//alert(citiesList);
									$("#updtCity").html(citiesList);
										
								}
							});
						}
						
						$("#updtCountry").change(function() {
							var countryCode = $("#updtCountry option:selected").val();
							getStatesListt(countryCode);
						});
						
						$("#updtState").change(function() {
							var stateCode = $("#updtState option:selected").val();
							getCitiesListt(stateCode);
						});
						
						$("#updtPatientCat").change(function() {
							var updtPatientCat = $("#updtPatientCat option:selected").text();
							$("#updtPatCatName").val(updtPatientCat);
						});
						
						
						
						$("#PatientRec").click(function(event) {
							event.preventDefault();
				            //alert("inside");
				            			
							var patientid = $("#updtPatientId").val();
							var updtPatientName = $("#updtPatientName").val();
							var updtPatientGender = $("#updtPatientGender").val();
							var updtPatientDob = $("#updtPatientDob").val();
							var updtPatientAge = $("#updtPatientAge").val();
							var updtPatientAgeMonths = $("#updtPatientAgeMonths").val();
							var updtPatientAgeDays = $("#updtPatientAgeDays").val();
							var updtPatientMobNum = $("#updtPatientMobNum").val();
							var updtPatientCat = $("#updtPatientCat").val();
							var updtPatCatName = $("#updtPatCatName").val();
							var updtPaymentType=$("#updatePaymentType").val();
							//alert(updtPatCatName+"text");
							if(updtPatCatName==''){
								var updtPatientCat = $("#updtPatientCat option:selected").text();
								//alert(updtPatientCat+"text");
								$("#updtPatCatName").val(updtPatientCat);
							}
							//alert(updtPatientCat+"int");
                            var state = $("#updtState").val();
                            var city =  $("#updtCity").val();
						    $("#updtPatientNameText").hide();
						    $("#updtPatientGenderText").hide();
						    $("#updtPatientDobText").hide();
						    $("#updtPatientAgeText").hide();
						    $("#updtPatientAgeMonthsText").hide();
						    $("#updtPatientAgeDaysText").hide();
						    $("#updtPatientMobNumText").hide();
						    $("#updtPatientCatText").hide();
							//alert(patientName.length + ":" + (parseInt(patientName.length) <= 2));
						    //alert(charRegex.test(patientName) + ":=:" + patientId);
							
						    if (updtPatientName == '') {
						    	$("#editPatientRec").hide();
								$("#updtPatientNameText").show();
								$("#updtPatientNameText").html("Enter Patient Name");
							} else if (!(charRegex.test(updtPatientName))) {
								$("#updtPatientNameText").show();
								$("#updtPatientNameText").html("Enter valid Patient Name");
								$("#editPatientRec").hide();
							} else if (updtPatientGender == '0') {
							    $("#patientGenderText").show();
							    $("#patientGenderText").html("Select Patient Gender");
							    $("#editPatientRec").hide();
							} else if (updtPatientAge == '') {
							    $("#updtPatientAgeText").show();
							    $("#updtPatientAgeText").html("Enter Patient Age");
							    $("#editPatientRec").hide();
							} else if (!(numberRegex.test(updtPatientAge))) {
							    $("#updtPatientAgeText").show();
							    $("#updtPatientAgeText").html("Enter valid Patient Age");
							    $("#editPatientRec").hide();
							} else if (!(mobNoRegx.test(updtPatientMobNum))) {
							    $("#updtPatientMobNumText").show();
							    $("#updtPatientMobNumText").html("Enter valid Mobile Number");
							    $("#editPatientRec").hide();
							} else if (updtPatientCat == '0') {
							    $("#updtPatientCatText").show();
							    $("#updtPatientCatText").html("Select Patient Category");
							    $("#editPatientRec").hide();
							} else if (state == '0') {
							    $("#updtStateText").show();
							    $("#updtStateText").html("Select State");
							    $("#editPatientRec").hide();
							}else if (city == '0') {
							    $("#updtCityText").show();
							    $("#updtCityText").html("Select City");
							    $("#editPatientRec").hide();
							}else if (updatePaymentType == '0') {
							    $("#updatePaymentTypeText").show();
							    $("#updatePaymentTypeText").html("Select Payment Type");
							    $("#editPatientRec").hide();
							}else {
								$("#savePatientForm").ajaxForm(patientForm);
																		
								$('#savePatientForm').attr('action', "/<s:message code="projectName"></s:message>/patient/updatePatientRecord").submit();
					
							}
						    $("#savePatientRec").hide();
							$("#editPatientRec").show();
						}); 
							
						
						
						
						var patientForm = {
								beforeSubmit : function(formData, formObj,
										options) {
									//alert(formData + "...." + formObj + "....." + options);
								},success : function(response) {
							       
									var data = response.split("^");
							        if(data[2]=="1"){
							        	
										var patientId = $("#updtPatientId").val();
										var patientName = $("#updtPatientName").val();
										var patientGender = $("#updtPatientGender").val();
										var pntMobNum = $("#updtPatientMobNum").val();
										var village = $("#updtVillage").val();
										var updtCity = $("#updtCity").val();
										var addr = $("#updtAddr").val();
										/* $("#patientInfo tbody tr").closest('tr').eq(ind).find('.pnameText').text(patientName);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.genderText').text(patientGender);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.mobNumText').text(pntMobNum);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.villageText').text(village);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.villageText').text(updtCity);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.addrText').text(addr); */
										$("#message").html(data[1]);
										//$("#patientUpdate").modal('hide');
										
										$("#updtPatientName").attr('readonly', true);
										$("#updtPatientGender").prop('disabled', true);
										$("#updtPatientCat").prop('disabled', true);
										$("#updtOrgId").prop('disabled', true);
										$("#updtPatientDob").attr('disabled', true);
										$("#updtPatientAge").attr('readonly', true);
										$("#updtPatientMobNum").attr('readonly', true);
										$("#updtSmsAlert").attr('disabled', true);
										$("#updtState").prop('disabled', true);
										$("#updtCity").prop('disabled', true);
										$("#updtMaritalStatus").prop('disabled', true);
										$("#updtNationality").prop('disabled', true);
										$("#updtVillage").attr('readonly', true);
										$("#updtAddr").attr('readonly', true);
										//$("#updtPatientDob").attr('readonly', true);
										$("#updtReligion").prop('disabled', true);
										$("#updtRefType").prop('disabled', true);
										$("#updtRefId").prop('disabled', true);
										$("#updtIdType").prop('disabled', true);
										$("#updtBloodGrp").prop('disabled', true);
										$("#updtIdNum").attr('readonly', true);
										$("#updtOccupation").attr('disabled', true);
										/* $("#savePatientRec").show();
										$("#editPatientRec").hide(); /* */ 
										var delay = 500; //Your delay in milliseconds
				                        setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);	
							        }else{
							        	
										$('#loadarModal').modal('hide');
							        }

									
								//resetData();
								$('#loadarModal').modal('hide');

							},
							error : function(jqXHR, textStatus, errorThrown) {
								 alert("error"); 
							}

						};
						
						$("#savePatientRec").click(function(event) {
							event.preventDefault();
				            //alert("inside");
				            			
							var patientid = $("#updtPatientId").val();
							var updtPatientName = $("#updtPatientName").val();
							var updtPatientGender = $("#updtPatientGender").val();
							var updtPatientDob = $("#updtPatientDob").val();
							var updtPatientAge = $("#updtPatientAge").val();
							var updtPatientAgeMonths = $("#updtPatientAgeMonths").val();
							var updtPatientAgeDays = $("#updtPatientAgeDays").val();
							var updtPatientMobNum = $("#updtPatientMobNum").val();
							var updtPatientCat = $("#updtPatientCat").val();
							var updtPatCatName = $("#updtPatCatName").val();
							var updtPaymentType=$("#updatePaymentType").val();
							var updtPatientTitle=$("#updtPatientTitle").val();
							var updtLastName=$("#updtLastName").val();
							//alert(updtPatCatName+"text");
							if(updtPatCatName==''){
								var updtPatientCat = $("#updtPatientCat option:selected").text();
								//alert(updtPatientCat+"text");
								$("#updtPatCatName").val(updtPatientCat);
							}
							//alert(updtPatientCat+"int");
                            var state = $("#updtState").val();
                            var city =  $("#updtCity").val();
						    $("#updtPatientNameText").hide();
						    $("#updtPatientGenderText").hide();
						    $("#updtPatientDobText").hide();
						    $("#updtPatientAgeText").hide();
						    $("#updtPatientAgeMonthsText").hide();
						    $("#updtPatientAgeDaysText").hide();
						    $("#updtPatientMobNumText").hide();
						    $("#updtPatientCatText").hide();
						    $("#updtLastNameText").hide();
						    $("#updtPatientTitleText").hide();
						    
						    
							//alert(patientName.length + ":" + (parseInt(patientName.length) <= 2));
						    //alert(charRegex.test(patientName) + ":=:" + patientId);
							
						    if (updtPatientName == '') {
						    	$("#editPatientRec").hide();
								$("#updtPatientNameText").show();
								$("#updtPatientNameText").html("Enter Patient Name");
							} else if (!(charRegex.test(updtPatientName))) {
								$("#updtPatientNameText").show();
								$("#updtPatientNameText").html("Enter valid Patient Name");
								$("#editPatientRec").hide();
							} else if (updtPatientGender == '0') {
							    $("#patientGenderText").show();
							    $("#patientGenderText").html("Select Patient Gender");
							    $("#editPatientRec").hide();
							} else if (updtPatientAge == '') {
							    $("#updtPatientAgeText").show();
							    $("#updtPatientAgeText").html("Enter Patient Age");
							    $("#editPatientRec").hide();
							} else if (!(numberRegex.test(updtPatientAge))) {
							    $("#updtPatientAgeText").show();
							    $("#updtPatientAgeText").html("Enter valid Patient Age");
							    $("#editPatientRec").hide();
							} else if (!(mobNoRegx.test(updtPatientMobNum))) {
							    $("#updtPatientMobNumText").show();
							    $("#updtPatientMobNumText").html("Enter valid Mobile Number");
							    $("#editPatientRec").hide();
							} else if (updtPatientCat == '0') {
							    $("#updtPatientCatText").show();
							    $("#updtPatientCatText").html("Select Patient Category");
							    $("#editPatientRec").hide();
							} else if (state == '0') {
							    $("#updtStateText").show();
							    $("#updtStateText").html("Select State");
							    $("#editPatientRec").hide();
							}else if (city == '0') {
							    $("#updtCityText").show();
							    $("#updtCityText").html("Select City");
							    $("#editPatientRec").hide();
							}else if (updatePaymentType == '0') {
							    $("#updatePaymentTypeText").show();
							    $("#updatePaymentTypeText").html("Select Payment Type");
							    $("#editPatientRec").hide();
							}else {
								$("#savePatientForm").ajaxForm(patientForm);
																		
								$('#savePatientForm').attr('action', "/<s:message code="projectName"></s:message>/patient/updatePatientRecord").submit();
					
							}
						    $("#savePatientRec").hide();
							$("#editPatientRec").show();
						}); 
							
						
						
						
						var patientForm = {
								beforeSubmit : function(formData, formObj,
										options) {
									//alert(formData + "...." + formObj + "....." + options);
								},success : function(response) {
							       
									var data = response.split("^");
							        if(data[2]=="1"){
							        	
										var patientId = $("#updtPatientId").val();
										var patientName = $("#updtPatientName").val();
										var patientGender = $("#updtPatientGender").val();
										var pntMobNum = $("#updtPatientMobNum").val();
										var village = $("#updtVillage").val();
										var updtCity = $("#updtCity").val();
										var addr = $("#updtAddr").val();
										/* $("#patientInfo tbody tr").closest('tr').eq(ind).find('.pnameText').text(patientName);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.genderText').text(patientGender);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.mobNumText').text(pntMobNum);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.villageText').text(village);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.villageText').text(updtCity);
										$("#patientInfo tbody tr").closest('tr').eq(ind).find('.addrText').text(addr); */
										$("#message").html(data[1]);
										//$("#patientUpdate").modal('hide');
										
										$("#updtPatientName").attr('readonly', true);
										$("#updtPatientGender").prop('disabled', true);
										$("#updtPatientCat").prop('disabled', true);
										$("#updtOrgId").prop('disabled', true);
										$("#updtPatientDob").attr('disabled', true);
										$("#updtPatientAge").attr('readonly', true);
										$("#updtPatientMobNum").attr('readonly', true);
										$("#updtSmsAlert").attr('disabled', true);
										$("#updtState").prop('disabled', true);
										$("#updtCity").prop('disabled', true);
										$("#updtMaritalStatus").prop('disabled', true);
										$("#updtNationality").prop('disabled', true);
										$("#updtVillage").attr('readonly', true);
										$("#updtAddr").attr('readonly', true);
										//$("#updtPatientDob").attr('readonly', true);
										$("#updtReligion").prop('disabled', true);
										$("#updtRefType").prop('disabled', true);
										$("#updtRefId").prop('disabled', true);
										$("#updtIdType").prop('disabled', true);
										$("#updtBloodGrp").prop('disabled', true);
										$("#updtIdNum").attr('readonly', true);
										$("#updtOccupation").attr('disabled', true);
										/* $("#savePatientRec").show();
										$("#editPatientRec").hide(); */
										var delay = 500; //Your delay in milliseconds
				                        setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);	
							        }else{
							        	
										$('#loadarModal').modal('hide');
							        }

									
								//resetData();
								$('#loadarModal').modal('hide');

							},
							error : function(jqXHR, textStatus, errorThrown) {
								 alert("error"); 
							}

						};
						
							
							
						$("#patientInfo").on('click','.printButton',function(event) {
							event.preventDefault();
					    //alert(2);
							var patApptId = $(this).closest('tr').find('.patApptId').val();	
							var patientId = $(this).closest('tr').find('.patientId').val();	
							var billId = $(this).closest('tr').find('.billId').val();	
						//	var receiptPrintUrl = "/<s:message code="projectName"></s:message>/patient/getPatOpBillPrint?patApptId="+patApptId;
						    //alert(receiptPrintUrl);
						    var receiptPrintUrl = "/<s:message code="projectName"></s:message>/patient/getPatOpBillRegjasper?patApptId="+patApptId+ "&billId=" + billId ;
						    window.open(receiptPrintUrl, "mywindow", "menubar=1, resizable=1, width=1100, height=650");
						    
						    var url2 = "/<s:message code="projectName"></s:message>/patient/updatePrintReg?patApptId="+patApptId;
							$.ajax({
						        url: url2,
						        type: 'GET',
						        cache:false,
						        success:function(AMMMMMMMMMMMMM){
						       // alert(AMMMMMMMMMMMMM)
						        }
							}); 
							
						});
						
						$("#patientInfo").on('click','.printConsultButton',function(event) {
							event.preventDefault();
					    //alert(2);
							var patApptId = $(this).closest('tr').find('.patApptId').val();	
							var patientId = $(this).closest('tr').find('.patientId').val();	
							var sourceServiceId = $(this).closest('tr').find('.sourceServiceId').val();
							var visitTypeId = $(this).closest('tr').find('.visitTypeId').val();
							var billId = $(this).closest('tr').find('.billId').val();	
						//	var receiptPrintUrl = "/<s:message code="projectName"></s:message>/patient/getPatOpBillPrint?patApptId="+patApptId;
						    //alert(receiptPrintUrl);
						    var receiptPrintUrl = "/<s:message code="projectName"></s:message>/patient/getPatOpBillConjasper?patApptId="+patApptId+ 
						    		"&sourceServiceId=" + sourceServiceId+ "&visitTypeId=" + visitTypeId+ "&billId=" + billId ;
						    window.open(receiptPrintUrl, "mywindow", "menubar=1, resizable=1, width=1100, height=650");
							
						    var url2 = "/<s:message code="projectName"></s:message>/patient/updatePrint?patApptId="+patApptId;
							$.ajax({
						        url: url2,
						        type: 'GET',
						        cache:false,
						        success:function(AMMMMMMMMMMMMM){
						     //   alert(AMMMMMMMMMMMMM)
						        }
							}); 
						    
						    
						});
						
						
						
						/* $("#patientInfo").on('click','.printPresc',function(event) {
							event.preventDefault();
					    //alert(2);
							var patApptId = $(this).closest('tr').find('.patApptId').val();	
							var patientId = $(this).closest('tr').find('.patientId').val();	
							
							
							var url = "/<s:message code="projectName"></s:message>/patient/getVisitId?patApptId="+patApptId;
								  // alert(url);
									$.ajax({
									 url:url,
									 success:function(response){
										//alert(response);
										$("#visitId").val(response); 									
									//charge();
										//serviceGrp();
										var visitId = $("#visitId").val();	
										//alert("visitId=" + visitId);
										
											/*  var PrintUrl = "/<s:message code="projectName"></s:message>/patientEmr/getMedicalRecordPrintDetails?apptId="+patApptId
						                    +"&patientId=" +patientId + "&visitId="+visitId;
					                         //alert(receiptPrintUrl);
					                        window.open(PrintUrl, "mywindow", "menubar=1, resizable=1, width=1100, height=650"); */
					                      /*  var PrintUrl = "/<s:message code="projectName"></s:message>/patientEmr/getMedicalRecordPrint?apptId="+patApptId
						                    +"&patientId=" +patientId + "&visitId="+visitId;
					                        // alert(PrintUrl);
					                        window.open(PrintUrl, "mywindow", "menubar=1, resizable=1, width=1100, height=650"); 
					                        
										
									 }
									});
							
							
							
						}); */
						 
						$("#patientInfo").on('click','.fileUpload',function(event) {
							event.preventDefault();
							//alert(2);
							//var patApptId = $(this).closest('tr').find('.patApptId').val();	
							var patientId = $(this).closest('tr').find('.patientId').val();	
							//var fileStatus=$(this).closest('tr').find('.fileStatus').val();
							var fileStatus=$("#fileStatus").val(0);
							var apptId = $(this).closest('tr').find('.apptId').val();
							$("#patientIdForFile").val(patientId);
							//$("#apptId").val(apptId);
							//alert("apptId"+apptId);
							//alert("patientId"+patientId);
							//$("#fileStatus").val(0);
							$('#passportModal #apptId').val(apptId);
							$('#passportModal #patientId').val(patientId);
							var url = "/<s:message code="projectName"></s:message>/patient/getPassportDetails?patientId="
							+ patientId ;
					         //alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										var data = response.split("^");
										$("#passportModal #passportNum").val(data[1]);
										$("#passportModal #passportIssuedDt").val(data[2]);
										$("#passportModal #passportExpiryDt").val(data[3]);
										
										
										
									}
								});
							var url = "/<s:message code="projectName"></s:message>/patient/getAttachFileName?patientId="
							+ patientId ;
					         //alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										$("#projectDocTable tfoot").append(response);
										
									}
								});
							$('#passportModal').modal('show');
							
						
							
						});
						 $('.modal').on('hidden.bs.modal', function (e) {
							//alert(2);
							//document.getElementById("projectDocTable").deleteTFoot(); 
							$("#projectDocTable tfoot tr").remove();
							$("#passportModal #passportNum").val('');
							$("#passportModal #passportIssuedDt").val('');
							$("#passportModal #passportExpiryDt").val('');

						});
						
						 
						$("#passportModal").on('click','.delete',function(event){
							event.preventDefault();
							//alert(1);
							var attachmentId = $(this).closest('tr').find('.attachmentId').val();	
							var index = $(this).closest('tr').index();
							var url = "/<s:message code="projectName"></s:message>/patient/setDelAttachFileName?attachmentId="
							+ attachmentId ;
					        // alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										var data = response.split("^");
										
										$("#projectDocTable tfoot tr").eq(index).remove();
										
							            $("#message").html(data[1]);
							           
							            var delay = 200; //Your delay in milliseconds
										setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);
							            
									}
								});
						});
							
						var charRegex = /^[^-\s][a-zA-Z .]*$/;
						var numberRegex = /^[0-9 ]*$/;
						var numberRegexExpression = /^[^-\s][0-9 .00]*$/;
						var varcharRegex = /^[^-\s][a-zA-Z0-9\s-]+$/;
						var mobNoRegx = /^[6789]\d{9}$/;
						var mobPattern=/^[1-9]{1}[0-9]{9}/;
						var AlphacharRegex = /^[a-zA-Z .]*$/;
						var numvarcharRegex = /^[a-zA-Z0-9]*$/;
						//var regexp = /^\S*$/;	
						var specialChar = /^[a-zA-Z .]+\s/;
						var pancard = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
						var voter = /^[a-zA-Z0-9]{6,10}$/; 
						var aadharpattern = /^[0-9]{12}$/;
						
						//keyup() function On "#patientTitle" - Used to validate the patientTitle.
						$("#patientTitle").on("change",function() {
							var patientTitle = $("#patientTitle").val();
							$('#patientTitle').css('color', 'black');
							//alert(patientTitle);
			     	    	$("#patientTitleText").hide();
							if (patientTitle == '0') {
			     	    		$("#patientTitleText").show();
			        	      	$("#patientTitleText").html("Select Patient Title");
							}
						});
						
						
	                     // keyup for select city field kept on july26 2024
						
						$("#city").on("change",function() {
							var city = $("#city").val();
							$('#city').css('color', 'black');
							//alert(patientTitle);
			     	    	$("#cityText").hide();
							if (city == '0') {
			     	    		$("#cityText").show();
			        	      	$("#cityText").html("Select City");
							}
						});
						
						
						
						
						//keyup() function On "#patientName" - Used to validate the patientName.
						$("#patientName").on("keyup",function() {
							var patientName = $("#patientName").val();
							//alert(patientName);
			     	    	$("#patientNameText").hide();
							if (patientName == '') {
			     	    		$("#patientNameText").show();
			        	      	$("#patientNameText").html("Enter or Select Patient Name");
							} else if (!(charRegex.test(patientName))) {
			     	    		$("#patientNameText").show();
			        	    	$("#patientNameText").html("Enter valid Patient Name");
							}
						});
						
						
						$("#newPatientName").on("input", function () {

						    // Allow only alphabets and spaces
						    this.value = this.value.replace(/[^A-Za-z ]/g, "");

						    $("#newPatientNameText").hide();

						    if (this.value.trim() === "") {
						        $("#newPatientNameText").show();
						        $("#newPatientNameText").html("Enter Patient Name");
						    }
						});
						

					

						
						// input() function on "#lastName" - Used to validate the lastName.
						$("#lastName").on("input", function () {

						    // Allow only alphabets and spaces
						    this.value = this.value.replace(/[^A-Za-z ]/g, "");

						    var lastName = this.value;

						    $("#lastNameText").hide();

						    if (lastName.trim() == '') {

						        $("#lastNameText").show();
						        $("#lastNameText").html("Enter or Select Last Name");

						    } else if (!(AlphacharRegex.test(lastName))) {

						        $("#lastNameText").show();
						        $("#lastNameText").html("Enter valid Last Name");
						    }
						});


						//keyup() function On "#patientGender" - Used to validate the patientGender.
						$("#patientGender").on("change",function() {
							var patientGender = $("#patientGender").val();
							//alert(patientGender);
			     	    	$("#patientGenderText").hide();
							if (patientGender == '0') {
			     	    		$("#patientGenderText").show();
			        	      	$("#patientGenderText").html("Select Patient Gender");
							}
						});
						
						// Validate Patient Date of Birth
						$("#pntDob").on("change", function () {

						    var pntDob = $(this).val();

						    $("#pntDobext").hide();

						    if (pntDob == '' || pntDob == '0') {
						        $("#pntDobText").show();
						        $("#pntDobText").html("Select Date of Birth");
						    }
						});


						// DOB - Allow only numbers and '-'
						$("#pntDob").on("input", function () {

						    var value = $(this).val();

						    // Remove spaces, alphabets and special characters
						    value = value.replace(/[^0-9-]/g, "");

						    $(this).val(value);
						});


						// Age - Allow only numbers
						$("#age").on("input", function () {

						    var value = $(this).val();

						    // Remove spaces, alphabets and special characters
						    value = value.replace(/[^0-9]/g, "");

						    $(this).val(value);

						    $("#ageText").hide();

						    if (value == '') {
						        $("#ageText").show();
						        $("#ageText").text("Enter age");
						    }
						});
						
						// Month - numbers only
						$("#ageMonths").on("input", function () {
						    this.value = this.value.replace(/[^0-9]/g, "");
						});


						// Days - numbers only
						$("#ageDays").on("input", function () {
						    this.value = this.value.replace(/[^0-9]/g, "");
						});
						
						//keyup() function On "#refType" - Used to validate the patientGender.
						$("#refType").on("change",function() {
							var refType = $("#refType").val();
							$('#refType').css('color','black');
							//alert(refType);
			     	    	$("#refTypeText").hide();
							if (refType == '0') {
			     	    		$("#refTypeText").show();
			        	      	$("#refTypeText").html("Select Referral Type");
							}
						});

						//keyup() function On "#careByName" - Used to validate the careByName.
						$("#careByName").on("keyup",function() {
							var careByName = $("#careByName").val();
							//alert(careByName);
			     	    	$("#careByNameText").hide();
							if (careByName == '') {
			     	    		//$("#careByNameText").show();
			        	      	//$("#careByNameText").html("Enter or Select Care By Name");
							} else if (!(AlphacharRegex.test(careByName))) {
			     	    		$("#careByNameText").show();
			        	    	$("#careByNameText").html("Enter valid Care By Name");
							}
						});
						
						//keyup() function On "#parentName" - Used to validate the parentName.
						$("#parentName").on("keyup",function() {
							var parentName = $("#parentName").val();
							//alert(parentName);
			     	    	$("#parentNameText").hide();
							if (parentName == '') {
			     	    		$("#parentNameText").show();
			        	      	$("#parentNameText").html("Enter or Select Parent Name");
							} else if (!(AlphacharRegex.test(parentName))) {
			     	    		$("#parentNameText").show();
			        	    	$("#parentNameText").html("Enter valid Parent Name");
							}
						});
						
						//keyup() function On "#pntOccupation" - Used to validate the pntOccupation.
						$("#pntOccupation").on("keyup",function() {
							var pntOccupation = $("#pntOccupation").val();
							//alert(pntOccupation);
			     	    	$("#pntOccupationText").hide();
							if (pntOccupation == '') {
			     	    		$("#pntOccupationText").show();
			        	      	$("#pntOccupationText").html("Enter or Select Occupation");
							} else if (!(AlphacharRegex.test(pntOccupation))) {
			     	    		$("#pntOccupationText").show();
			        	    	$("#pntOccupationText").html("Enter valid Occupation");
							}
						});
						
						

						//keyup() function On "#pntMobNum" - Used to validate the pntMobNum.
		// Validate Mobile Number
$("#pntMobNum").on("input", function () {

    // Allow only numbers
    this.value = this.value.replace(/[^0-9]/g, "");

    var pntMobNum = this.value;

    $("#pntMobNumText").hide();

    if (pntMobNum == '') {

        $("#pntMobNumText").show();
        $("#pntMobNumText").html("Enter Mobile No.");

    } else if (!(mobPattern.test(pntMobNum))) {

        $("#pntMobNumText").show();
        $("#pntMobNumText").html("Enter valid Mobile No.");

    }
});
						
						//keyup() function On "#pblmDesc" - Used to validate the patientName.
						$("#pblmDesc").on("keyup",function() {
							var pblmDesc = $("#pblmDesc").val();
							//alert(pblmDesc);
			     	    	$("#pblmDescText").hide();
							if (pblmDesc == '') {
			     	    		$("#pblmDescText").show();
			        	      	$("#pblmDescText").html("Enter Health Issue");
							} /* else if (!(AlphacharRegex.test(pblmDesc))) {
			     	    		$("#pblmDescText").show();
			        	    	$("#pblmDescText").html("Enter valid Health Issue");
							} */
						});
						
						// Validate Village Name
						$("#village").on("input", function () {

						    // Allow only alphabets and spaces
						    this.value = this.value.replace(/[^A-Za-z ]/g, "");

						    var village = this.value;

						    $("#villageText").hide();

						    if (village.trim() == '') {

						        $("#villageText").show();
						        $("#villageText").html("Enter village Name");

						    } else if (!(AlphacharRegex.test(village))) {

						        $("#villageText").show();
						        $("#villageText").html("Enter valid village Name");
						    }
						});
						
						//keyup() function On "#address" - Used to validate the patientName.
						$("#addr").on("keyup",function() {
							var addr = $("#addr").val();
							//alert(addr);
			     	    	$("#addrText").hide();
							if (addr == '') {
			     	    		$("#addrText").show();
			        	      	$("#addrText").html("Enter Address");
							} else if (!(AlphacharRegex.test(address))) {
			     	    		$("#addrText").show();
			        	    	$("#addrText").html("Enter Address");
							}
						});
						
						
						
						
						
						
						
						
						
						
						//Validatiotions for id type by Habib.
						//keyup() function On "#idType" - Used to validate the idType.
						$("#idNum").on("keyup",function() {
							var idNum = $("#idNum").val();
							var idType =$("#idType").val();
							//alert(idType);
			     	    	$("#idNumText").hide();
							if (idNum == '') {
			     	    		$("#idNumText").show();
			        	      	$("#idNumText").html("Enter ID number");
							} else if (!(numvarcharRegex.test(idNum))) {
			     	    		$("#idNumText").show();
			        	    	$("#idNumText").html("Enter valid ID Number");
							}
							else{
							        if(idType == "Pan"){
								//alert(" in pan");
							             if	(!(pancard.test(idNum))) {
				     	    		               $("#idNumText").show();
				        	    	               $("#idNumText").html("Enter valid PAN CARD NUMBER  ");
							                          }	
							               }
							       if (idType == "Adhar"){
								        if	(!(aadharpattern.test(idNum))) {
				     	    		        $("#idNumText").show();
				        	    	        $("#idNumText").html("Enter valid AADHAR  NUMBER  ");
							                 }		
							        }
							       
							       if (idType == "Voter"){
								        if	(!(voter.test(idNum))) {
				     	    		        $("#idNumText").show();
				        	    	        $("#idNumText").html("Enter valid voter NUMBER  ");
							                 }		
							        }  
							       
							}
						});
						
						
						function getDoctorTokens(docId, locId, dateText) {
							$('#loadarModal').modal({backdrop : 'static', keyboard : false});
							var url = "/<s:message code="projectName"></s:message>/appt/getDoctorSlots?doctorId=" + docId
								+ "&locId=" + locId + "&scheduleDt=" + dateText;
							//alert(url);
							$.ajax({
								url : url,
								success : function(docSlots) {
									//alert(docSlots);
									

									$("#docSlots").html(docSlots);
									//$('#loadarModal').modal('hide');
									//alert(docId + ":" + locId + ":" + dateText + ":" + patientId + ":" + patientCategory);
									/* if (docId != "0" && locId != "0" && dateText != "" && patientCategory == "4") {
										var consFeeStatus = $("#consStatus").val();
										if (consFeeStatus === 'REG' || consFeeStatus === 'BEFCONS') {
											//alert(1);
											getConsultationFee(docId, locId, dateText, patientId, patientCategory);
											//$("#totDiv").show();
											consFeeCallSts = 1;
										}	
									} else {
										//$("#consFee").val("0.00");
										//$("#consAmount").val("0.00");
									} */
									
									$("#docSlotsDiv").show();

									$("#docSlotsMainDiv").show();
									/* $('.slimScrollDocSlotsDiv').slimScroll({
										height : '100px'
									}); */
							
									$('#loadarModal').modal('hide');

								}
							});
						}
						
						function getDoctorExtraTokens(docId,dateText) {
							//$('#loadarModal').modal({backdrop : 'static', keyboard : false});
							var url = "/<s:message code="projectName"></s:message>/patient/getExtraDocSlots?doctorId=" + docId
								+  "&scheduleDt=" + dateText;
							//alert(url);
							$.ajax({
								url : url,
								success : function(ExtraDocSlots) {
									//alert(ExtraDocSlots);
									
                                    $("#extraDocSlots").html(ExtraDocSlots);
   									$("#extraDocSlotsDiv").show();
   									$("#extraDocSlotsMainDiv").show();
   									//$("#addExtraTokensDiv").hide();
   									
                                    $('#loadarModal').modal('hide');
 
								}
							});
						}
						
						$("#scheduleDt").datepicker({
							format : 'dd-M-yyyy',
							startDate : '0d',
							//endDate : '+1d',
							dateLimit: { days: 10000 },
							
							todayHighlight : true
							
						}).on('changeDate', function() {
							 //alert("....");
							 
							// var scheduleDt =  $("#scheduleDt").val();
							 $("#idDoctor").val('0').trigger('chosen:updated');
							 docFeeTockenReset();
							$("#tokenValue").val("");
							$("#dateSch").val($("#scheduleDt").val());
							$("#scheduleDtText").hide();
							//$('#loadarModal').modal({backdrop : 'static', keyboard : false});
							//$("#idDoctor").attr("disabled",false);
							$("#idDoctor").prop("disabled", false).trigger("chosen:updated");

							var docId = $("#idDoctor option:selected").val();
							var locId = $("#idLocation option:selected").val();
							if(locId==0){
							     $('#alertModal').modal('show');
							     $('#alertMsg').text("Please select location")
							     $("#scheduleDt").val("");
							}
							var patientId = $("#patientId").val();
							var patientCategory;
							//alert(patientId);
							if (patientId == 0) {
								//	alert("if")
								patientCategory = $("#patientCat option:selected").val();
							} else {
								//	alert("else")
								patientCategory = $("#categoryId").val();
							}
							//alert(patientCategory);
							$("#errDt").hide();
							$(this).datepicker('hide');
							dateText = $("#scheduleDt").val();

							var docDetails = $("#idDoctor option:selected").val().split(":");
							docId = docDetails[0];
							$("#empCode").val(docDetails[1]);
							$("#specName").val(docDetails[2]);
							
							var consFeeCallSts = 0;
							
							
		/* 
							if (docId != "" && locId != "" && dateText != "") {
								//alert(222);
								getDoctorTokens(docId, locId, dateText);
							} else {
								$("#errDoctorId").show();
								$("#errLocId").show();
								$("#errSchDt").show();
							}  */
							
							if (parseInt(scheduleDt) != "" && patientCategory == "4") {
								var consFee = $("#consFee").val();
								//alert(consFee+ ".....consFee....." );
								var amtRecd = $("#amountReceived").val();
								//alert(amtRecd+ ".......amtRecd");
								//getRegistrationFee(patientCategory);
								if (parseInt(totAmt) == parseInt(amountReceived)) {
									//alert(11);
									$("#status").val("paid");
							   	} else {
									//alert(2);
									$("#status").val("pending");
								if (consFeeCallSts == 0  ) {
										//alert(2);
										//getConsultationFee(docId, locId, dateText, patientId, patientCategory);
										//getRegistrationFee(patientCategory);
									} 
									//	$("#totDiv").show();
								}
							} 

							
						});
                        
// 						$('#patientInfo').DataTable({});
						var patientInfo = $("#patientInfo").DataTable({
			    dom: 'lBfrtip',
			    buttons: [
			        {
			            extend: 'excelHtml5',
			            exportOptions: {
			                rows: function (idx, data, node) {
			                    return $(node).find('td').eq(0).text() !== 'Total'; // Exclude the total row
			                },
			                columns: ':visible'
			            },
			            customize: function (xlsx) {
			                var sheet = xlsx.xl.worksheets['sheet1.xml'];

                // Calculate totals for all pages
                var totalRegCash = 0, totalRegCredit = 0, totalRegUpi = 0;
                var totalCash = 0, totalCredit = 0, totalUpi = 0;

                patientInfo.rows().every(function() {
                    var regCash = parseFloat(this.node().querySelector('.regOpCashAmt').value) || 0;
                    var regCredit = parseFloat(this.node().querySelector('.regOpCreditAmt').value) || 0;
                    var regUpi = parseFloat(this.node().querySelector('.regOpUpiAmt').value) || 0;
                    var cash = parseFloat(this.node().querySelector('.cashAmt').value) || 0;
                    var credit = parseFloat(this.node().querySelector('.creditAmt').value) || 0;
                    var upi = parseFloat(this.node().querySelector('.upiAmt').value) || 0;

                    totalRegCash += regCash;
                    totalRegCredit += regCredit;
                    totalRegUpi += regUpi;
                    totalCash += cash;
                    totalCredit += credit;
                    totalUpi += upi;
                });

                // Insert total row into the Excel sheet
                var lastRow = $('sheetData row', sheet).last();
                var rowIndex = parseInt(lastRow.attr('r')) + 1;

                var newRow = '<row r="' + rowIndex + '">' +
                    '<c t="inlineStr" r="A' + rowIndex + '"><is><t>Total</t></is></c>' +
                    '<c t="n" r="L' + rowIndex + '"><v>' + totalRegCash.toFixed(2) + '</v></c>' +
                    '<c t="n" r="M' + rowIndex + '"><v>' + totalRegCredit.toFixed(2) + '</v></c>' +
                    '<c t="n" r="N' + rowIndex + '"><v>' + totalRegUpi.toFixed(2) + '</v></c>' +
                    '<c t="n" r="O' + rowIndex + '"><v>' + totalCash.toFixed(2) + '</v></c>' +
                    '<c t="n" r="P' + rowIndex + '"><v>' + totalCredit.toFixed(2) + '</v></c>' +
                    '<c t="n" r="Q' + rowIndex + '"><v>' + totalUpi.toFixed(2) + '</v></c>' +
                    '</row>';
                lastRow.after(newRow);
                
                function formatDateTime() {
             	   const options = { 
             		        year: 'numeric', // Changed '0' to 'numeric'
             		        month: 'short', 
             		        day: '2-digit', 
             		        hour: '2-digit', 
             		        minute: '2-digit', 
             		        hour12: false 
             		    };
             		    const currentDateTime = new Date().toLocaleString('en-GB', options);
			    // Replace commas and format the output
			    const formattedDateTime = currentDateTime.replace(',', '').replace(' ', '-');
			    return formattedDateTime;
			}
                var userRole = $("#userRoleee").val();
                var reportFromDt = $("#reportFromDt").val();
                var reportToDt = $("#reportToDt").val();
                rowIndex += 1; // Move to the next row

                var printRow = '<row r="' + rowIndex + '">' +
	                '<c t="inlineStr" r="A' + rowIndex + '">' +
	                    '<is><t>' + 'Print Generate at: ' + formatDateTime() + '</t></is>' +
	                '</c>' +
	            '</row>';
	            rowIndex += 1; // Move to the next row

                var userRow = '<row r="' + rowIndex + '">' +
                    '<c t="inlineStr" r="A' + rowIndex + '">' +
                        '<is><t>' + 'Print taken By: ' + userRole.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</t></is>' +
                    '</c>' +
                '</row>';

                rowIndex += 1; // Move to the next row
                var dateRangeRow = '<row r="' + rowIndex + '">' +
                '<c t="inlineStr" r="A' + rowIndex + '">' +
                    '<is><t>' + 'Date Range: ' + reportFromDt + ' to ' + reportToDt + '</t></is>' +
                '</c>' +
            '</row>';

            lastRow.after(printRow + userRow + dateRangeRow);
            }
        },
        {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: { width: 1800, height: 595 },
            exportOptions: {
                rows: function (idx, data, node) {
                    return $(node).find('td').eq(0).text() !== 'Total'; // Exclude the total row
                },
                columns: ':visible'
            },
            customize: function (doc) {
            	 var printInfoTable = {
                         table: {
                             widths: ['*', '*', '*'], // Adjust widths as needed
                             body: [
                                 [
                                     { text: 'Date Range: ' + $("#reportFromDt").val() + ' To ' + $("#reportToDt").val(), margin: [0, 10, 0, 0],style: { fontSize: 12 } }
                                 ]
                             ]
                         },
                         layout: 'noBorders' // Optional: remove borders for a cleaner look
                     };
     	               doc.content.unshift(printInfoTable);
            	var totalRegCash = 0, totalRegCredit = 0, totalRegUpi = 0;
                var totalCash = 0, totalCredit = 0, totalUpi = 0;

                patientInfo.rows().every(function() {
                    var regCash = parseFloat(this.node().querySelector('.regOpCashAmt').value) || 0;
                    var regCredit = parseFloat(this.node().querySelector('.regOpCreditAmt').value) || 0;
                    var regUpi = parseFloat(this.node().querySelector('.regOpUpiAmt').value) || 0;
                    var cash = parseFloat(this.node().querySelector('.cashAmt').value) || 0;
                    var credit = parseFloat(this.node().querySelector('.creditAmt').value) || 0;
                    var upi = parseFloat(this.node().querySelector('.upiAmt').value) || 0;

                    totalRegCash += regCash;
                    totalRegCredit += regCredit;
                    totalRegUpi += regUpi;
                    totalCash += cash;
                    totalCredit += credit;
                    totalUpi += upi;
                });

                // Add total values to the PDF
                doc.content.push({
                    table: {
                        widths: ['*', '*', '*', '*', '*', '*'], // Adjust based on your columns
                        body: [
                            [
                                { text: 'Reg Cash Total: ' + totalRegCash.toFixed(2), bold: true },
                                { text: 'Reg Credit Total: ' + totalRegCredit.toFixed(2), bold: true },
                                { text: 'Reg UPI Total: ' + totalRegUpi.toFixed(2), bold: true },
                                { text: 'Cons Cash Total: ' + totalCash.toFixed(2), bold: true },
                                { text: 'Cons Credit Total: ' + totalCredit.toFixed(2), bold: true },
                                { text: 'Cons UPI Total: ' + totalUpi.toFixed(2), bold: true }
                            ]
                        ]
                    },
                    layout: 'noBorders' // Optional: remove borders for a cleaner look
                });
                function formatDateTime() {
                    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
                    const currentDateTime = new Date().toLocaleString('en-GB', options);
                    const formattedDateTime = currentDateTime.replace(',', '').replace(' ', '-');
                    return formattedDateTime;
                }

                doc.content.push({
                    text: 'Print Generated at: ' + formatDateTime(),
                    margin: [0, 20, 0, 0]
                });
	    	              
                doc.content.push({
                    text: 'Print Generated By: ' + $("#userRoleee").val(),
                    margin: [0, 0, 0, 20]
                });
                var fromDate = $("#reportFromDt").val();
                var toDate = $("#reportToDt").val();
                /* doc.content.push({
                    text: 'Date Range: ' + fromDate + ' to ' + toDate,
                    margin: [0, 0, 0, 20]
                }); */
            }
        },
        // ... other button configurations
    ]
});

						$('#portalPatientsTable').DataTable({});
						
						$('#patientView').DataTable({
							"bPaginate" : true,
							"bLengthChange" : true,
							"bFilter" : true,
							"bSort" : true,
							"bInfo" : true,
							"bAutoWidth" : true
						});

						$("#fromDate").datepicker({
							format : 'dd-M-yyyy',
							todayHighlight : true,
							autoclose: true,
							defaultDate : new Date(),
							maxDate : new Date()
						});
						
						$("#toDate").datepicker({
							format : 'dd-M-yyyy',
							todayHighlight : true,
							defaultDate : new Date(),
							autoclose: true,
							maxDate : new Date()
						});
						
						$("#reschDate").datepicker({
							format : 'dd-M-yyyy',
							todayHighlight : true,
							autoclose: true
						});
							
						$("#apptFromDate").datepicker({
							format : 'dd-M-yyyy',
							todayHighlight : true,
							autoclose: true
						});
						
						$("#apptToDate").datepicker({
							format : 'dd-M-yyyy',
							todayHighlight : true,
							autoclose: true
						});
							
						/* $("#apptFromDate").datepicker("setDate", new Date());  */
						/* $("#apptToDate").datepicker("setDate", new Date());  */
							
						/* $("#toDate").datepicker("setDate", new Date());  */
						$(".datepicker").keydown(function(event) {
							return false;
						});

						$("#idRetake").click(function() {
							$("#imgPath").val("");
							$("#image").hide();
							$("#canvas").hide();
							$("#video").show();
							$("#video").fadeIn('fast');
							$('#idRetake').hide();
						});
						
						$("#idRetakee").click(function() {
							$("#imgPath").val("");
							$("#image").hide();
							$("#canvass").hide();
							$("#videoo").show();
							$("#videoo").fadeIn('fast');
							$('#idRetakee').hide();
						});
							
						function docFeeTockenReset() {
							//alert("token rest..");
							$("#docSlotsMainDiv").hide();
// 							$("#idDoctor").val("0").trigger('chosen:updated');
							$("#empCode").val(" ");
							$("#specName").val(" ");
							$("#docSlotsDiv").hide();
							$("#docSlots").html('');
							

							//$("#scheduleDt").val("");
							$("#tokenValue").val("");
							
							$("#regFee").val("0.00");
							$("#discount").val("0.00");
							$("#discountAmount").val("0.00");
							$("#amount").val("0.00");
							
							$("#consFee").val("0.00");
							$("#consDiscount").val("0.00");
							$("#consDiscountAmount").val("0.00");
							$("#consAmount").val("0.00");

							$("#amountReceived").val("0.00");
							$("#totAmt").val("0.00");
							$("#totDiscount").val("0.00");
							$("#totDiscountAmt").val("0.00");
							$("#billAmt").val("0.00");
								
							$("#status").val("pending");

							var patientCategory = $("#patientCat option:selected").val();
							if (patientCategory != "0") {
								//getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId);
							}

							$("#docSlotsDiv").hide();
							$("#docSlots").html("");
							
						}
						
						
						$("#idLocation").change(function(){
					    	  
					          // alert("in loc change");
					    	  $("#scheduleDt").attr("disabled",false);
					    	 
					    	  $("#idDoctor").val('0').trigger('chosen:updated');
							  docFeeTockenReset();
							  $("#tokenValue").val("");
							  $("#scheduleDt").datepicker("setDate",new Date())
					    	  var patientCategory = $("#patientCat option:selected").val();
					    	  //alert(patientCategory+"patientCategory");
					    	  if(patientCategory ==0 || null){
					    	      //alert("in if");
					    		  $('#alertModal').modal('show');
								  $("#alertMsg").text("Please Select Category");
								  $("#idLocation").val("0").trigger('chosen:updated'); 	  
								 }
					    	  var locId = $("#idLocation").val();
					    	  if(locId ==0 || null){
					    		  $("#scheduleDt").val('');
					    	  }
					    	
					    	  
					       }); 
						
					
						
						var consFeeCallSts = 0;
						
					$("#idDoctor").change(function() {
						//$(".labinvTable").remove();
						if ($("#payModeTable tfoot tr").length === 0) {
    // only clear if no payments exist
                   $(".labinvTable").remove();
                           }
								//alert("in change idDoctor");
							var doctor = $("#idDoctor").val();	
							
							//alert("scheduleDt"+scheduleDt);
						    $("#tokenValue").val("");
							var	docId = $("#idDoctor option:selected").val();																						
						    var idDoctor = $("#idDoctor").val();
						   
							//alert(idDoctor + "...in second ajax...");
							var url = "/<s:message code="projectName"></s:message>/patient/getDoctorDetails?idDoctor=" + idDoctor;
							//alert(url);
							$('#idDoctor').attr('selected', true);
							$.ajax({
							url : url,
							success : function(response) {
							//alert("....getDoctorDetails?idDoctor" + response);	
							var data = response.split("^");

							$("#specName").val(data[0]);
							$("#empCode").val(data[1]);
							
							$.each(response, function(index, details) { /* getting the list object as response from controller
							and iterating to get single value to set into respective fields */
							//setting the values into fields
							//alert("..." + details.specName);
							$("#specName").val(details.specName);
							$("#empCode").val(details.empCode);
							});
							},
							error : function() {
								alert("in error");
							}
							});
							
							var locId = $("#idLocation option:selected").val();
							var patientCategory = $("#patientCat option:selected").val();
							if (locId != "0" & idDoctor != "0") {
								//alert(patientCategory+"patientCategory");
								if (patientCategory!=0){
								//alert("in");
									getConsultationFeeDetails(docId, locId, patientCategory);
									//getDocterLeaves(docId,dateText);
								}else{
									 $('#alertModal').modal('show');
									 $("#alertMsg").text("Please Select Category");
									 $("#idDoctor").val("0").trigger('chosen:updated');
									 $("#docSlotsMainDiv").hide();
									 $("#docSlotsDiv").hide();
									 docFeeTockenReset();
								} 
									//now		
								//getConsultationFee(docId, locId, dateText, patientId, patientCategory);
							}														
							
						// 3rd	
								
								
								var docDetails = $("#idDoctor option:selected").val().split(":");
								//alert(docDetails + "....docDetails");
								
								docId = docDetails[0];
								$("#idDoctorVal").val(docId);
								//alert(docId+"in pQjsp")
								$("#empCode").val(docDetails[1]);
								$("#specName").val(docDetails[2]);
								//alert("doc id " + docId);
								doctor = $("#idDoctor option:selected").text();
								$("#doctor").val($.trim(docId));
								$("#doctor").val(docId);
								//alert(docId+"in change");
								
								/* locId = $("#idLocation option:selected").val();  */ /* commented on 20 june 2018 by saiprabhu */
								//alert(docId + ":" + locId);
								/*  if (docId == "0") {
									 $('#loadarModal').modal('hide');
								} else {
									getDoctorLocations(docId);
								} */
								//getDoctorLocations(docId); /* commented on 20 june 2018 by saiprabhu */
								 //var locIdVal = $("#idLocation option:selected").val();
								/* if (locId != "0" & docId != "0") {
									getConsultationFeeDetails(docId, locId);
								}  */
								//getRegistrationFee(patientCategory);
								//getConsultationFee(docId, locId, dateText, patientId, patientCategory);															
								
								var docDetails = $("#idDoctor option:selected").val().split(":");
								if (docDetails != 0) {
									//alert("in get doc fee..");
									docId = docDetails[0];
									var locId = $("#idLocation option:selected").val();
									var idLocation= $("#idLocation option:selected").val();
									var patientCategoryId =$("#patientCat option:selected").val();
									//alert(patientCategoryId+"patientCategoryId");
									var patientId = $("#patientId").val();
									var regPatientId= $("#regPatientId").val();
									var suvRegPatientId= $("#suvRegPatientId").val();
									var patVisitId=$("#patVisitId").val();
									
									var currdate =$("#currDate").val();
									//alert(currdate);
									//alert(typeof currdate);
									let curDat = moment(currdate, "DD-MM-YYYY").toDate();
									//alert(curDat);
									
									
									var url = "/<s:message code="projectName"></s:message>/consOp/getPatientConsultantValiity?patientId="
				                     +patientId+ "&empId=" + docId;
				        	//alert(url);response==''
				        	
							$.ajax({
								url : url,
								success : function(response) {
									//alert(response);
									//alert(typeof response);
									let consul = moment(response, "DD-MMM-YYYY").toDate();
									//alert(consul);
									//alert(typeof consul);
									
									
									
									if(response !=''){
										//alert(" in if");
									 if(consul < curDat){
										 
								//alert(" in ifffff");
										 
										 $("#patInfoConsulValidDt").text("");
										 $("#patInfoConsultValidSts").text("No");
										 //alert(patInfoConsultValidSts);
									 }else{
										
										// alert("in elseeeee");
// 										 var patientLike = $("#patientLike").val();
// 											if (patientLike != 4){
	
												/*  $('#alertModalValidiaty').modal('show');
												 $("#alertMsgvalid").text("Please Select Date......."); */
												 var patientLike = 'true';
											//alert(patientLike);
											
											if (patientLike != 'true'){
												 
											}else{
										$("#patInfoConsulValidDt").text(response);
										 $("#patInfoConsultValidSts").text("YES");
											}
									 }
									 
									}else{
										
										//alert("in else");
										 $("#patInfoConsultValidSts").text("No");
										 $("#patInfoConsulValidDt").text("");
									}
								}
									
							});	
							
									var dateText = $("#scheduleDt").val();
									if(dateText==0){
										
										 $('#alertModal').modal('show');
										 $("#alertMsg").text("Please Select Date");
										 $("#idDoctor").val("0").trigger('chosen:updated');
										 $("#docSlotsMainDiv").hide();
										 $("#docSlotsDiv").hide();
										 docFeeTockenReset();
										 
									}
									var patientCategory=$("#patientCat option:selected").val();
									//alert(patientId);
									if (patientId == 0) {
										//	alert("if")
										patientCategory = $("#patientCat option:selected").val();
									} else {
										//	alert("else")
										patientCategory = $("#categoryId").val();
									}
									if (docId != "0" && locId != "0" && dateText != "" && patientCategory != "0") {
										var consFeeStatus = $("#consStatus").val();
										//alert(consFeeStatus + ".....consFeeStatus");
										//getDoctorTokens(docId, locId, dateText);
										//getDoctorTokens(docId, locId, dateText);
										//getConsultationFee(docId, locId, dateText, patientId, patientCategory);
										//alert(patientCategory+"patientCategory");
										var dateText = $("#scheduleDt").val();
										 
										if (patientCategory==0){
											 $('#alertModal').modal('show');
											 $("#alertMsg").text("Please Select Category");
											 $("#idDoctor").val("0").trigger('choosen:updated');
											 $("#docSlotsMainDiv").hide();
											 $("#docSlotsDiv").hide();
											 docFeeTockenReset();
										}else{
											 //alert(dateText);
											 getDocterLeaves(docId,dateText);
											 getDoctorExtraTokens(docId,dateText)
											 getDoctorTokens(docId, locId, dateText);
											var patientLike = 'true';
											//alert(patientLike);
											
											if (patientLike != 'true'){
												getConsultationFee(docId, locId, dateText, 0, patientCategory,suvRegPatientId);
											}else{
											//alert();
												getConsultationFee(docId, locId, dateText, patientId, patientCategory,suvRegPatientId);
											}
											 //getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,dateText);
											 getExtraSlotsDocsCount(docId,dateText);
											 var pat= $("#patientId").val();
												//alert(pat+"patientId");
												if(pat!=0){
													//alert("in if");
													getRegValidityType(patientId,patientCategory,locId,docId,patVisitId,scheduleDt);
													getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,dateText);
												}
												var patSuv = $("#regPatientId").val();
												if(patSuv!=0){
													//alert(patSuv+"regpatid in if");
													//getSuvarnaPatRegFee(regPatientId,patientCategory,locId);
													getSuvarnaPatRegFee(regPatientId,patientCategory,locId,docId,patVisitId,scheduleDt);
													
												} 
										} 
										//getRegistrationFee(patientCategory);
										
										/* if (consFeeStatus == 'REG' || consFeeStatus == 'BEFCONS' ) {
											//alert(4);											
											getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId);	
											//getSuvarnaPatRegFee(regPatientId,patientCategory,locId);
											   
											//	$("#totDiv").show(); 
										}	 */ 
										//commented on 02 july 2019 to call Reg funcition for old & new pat only
									//var p = $("#regPatientId").val();
									//alert(p+"regpatid");
									}if(consFeeStatus == 'REG' || consFeeStatus == 'BEFCONS' ) {
										//alert(" in doc change");
										//var patientCategory=$("#patientCat option:selected").val();
										//alert(patientCategory+"patientCategory");
										//getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId);
										 //getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,dateText);
										
										//getSuvarnaPatRegFee(regPatientId,patientCategory,locId);
										   
										//	$("#totDiv").show();
									}
									 //alert(p+"regpatid");
									/* if(patSuv!=0){
										//alert(p+"regpatid in if");
										//getSuvarnaPatRegFee(regPatientId,patientCategory,locId);
										getSuvarnaPatRegFee(regPatientId,patientCategory,locId,docId,patVisitId,scheduleDt);
										
									}  */
									
									
									
									/* else if (p==0){
										//alert("in else if")
										if(consFeeStatus == 'REG' || consFeeStatus == 'BEFCONS' ) {
											alert(4);											
											getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId);	
											//getSuvarnaPatRegFee(regPatientId,patientCategory,locId);
											   
											//	$("#totDiv").show();
										}
										
									} */ if (docId != "" && locId != "" && dateText != "") {
										//alert(222);
										//getDoctorTokens(docId, locId, dateText);
									} else {
										$("#errDoctorId").show();
										$("#errLocId").show();
										$("#errSchDt").show();
									}
									if (parseInt(scheduleDt) != "" && patientCategory == "4") {
										var consFee = $("#consFee").val();
										//alert(consFee+ ".....consFee....." );
										var amtRecd = $("#amountReceived").val();
										//alert(amtRecd+ ".......amtRecd");
										//getRegistrationFee(patientCategory);getDoctorTokens
									  if (parseInt(totAmt) == parseInt(amountReceived)) {
											alert(11);
											$("#status").val("paid");
									   	} else {
											//alert(2);
											$("#status").val("pending");
										if (consFeeCallSts == 0  ) {
												//alert(2);
												//(docId, locId, dateText, patientId, patientCategory);
												//getRegistrationFee(patientCategory);
											} 
											//	$("#totDiv").show();
										}
									}
									

								}
								
							});
				
						
						function uiAdjustments() {
							var refSts = 0;
							var catSts = 0;
							
							var refType= $("#refType option:Selected").text();
							if ($.trim(refType) == "Staff Doctors" || $.trim(refType) == "Other Hospitals" || $.trim(refType) == "Other Staff" 
									|| $.trim(refType)== "Other Doctor") {
								refSts = 1;
							}
							var patientCat = $("#patientCat option:selected").text();
							if ($.trim(patientCat) === "Credit") {
								catSts = 1;
							}
							
							if (refSts == 1 || catSts == 1) {
								$("#refDiv").addClass("col-md-4");
								$("#refDiv").removeClass("col-md-6");

								$("#otherHospDiv").addClass("col-md-4");
								$("#otherHospDiv").removeClass("col-md-6");
								
								$("#otherStaffDiv").addClass("col-md-4");
								$("#otherStaffDiv").removeClass("col-md-6");
								
								$("#otherDoctorsDiv").addClass("col-md-4");
								$("#otherDoctorsDiv").removeClass("col-md-6");
								
								//$("#patientCatDiv").addClass("col-md-2");		//COMMENTED ON 27TH JUNE 2019 BY MEENAKSHI
								$("#patientCatDiv").addClass("col-md-4");	
								$("#patientCatDiv").removeClass("col-md-6");
								$("#patientCatDiv").removeClass("col-md-12");
								
								$("#pntCatVal").addClass("col-md-12");
								$("#pntCatVal").removeClass("col-md-4");
								$("#pntCatVal").removeClass("col-md-3");

								$("#orgDiv").addClass("col-md-4");
								$("#orgDiv").removeClass("col-md-8");
								$("#orgDiv").removeClass("col-md-6");
								
								if (refSts == 1 && catSts == 1) {
									$("#refDiv").removeClass("col-md-4");
									$("#refDiv").addClass("col-md-6");

									$("#otherHospDiv").removeClass("col-md-4");
									$("#otherHospDiv").addClass("col-md-6");
									
									$("#otherStaffDiv").removeClass("col-md-4");
									$("#otherStaffDiv").addClass("col-md-6");
									
									$("#otherDoctorsDiv").addClass("col-md-4");
									$("#otherDoctorsDiv").removeClass("col-md-6");
									
									//$("#patientCatDiv").removeClass("col-md-2");		//COMMENTED ON 27TH JUNE 2019 BY MEENAKSHI
									$("#patientCatDiv").removeClass("col-md-4");	
									$("#patientCatDiv").removeClass("col-md-6");
									$("#patientCatDiv").addClass("col-md-12");
									
									$("#pntCatVal").removeClass("col-md-12");
									$("#pntCatVal").removeClass("col-md-4");
									$("#pntCatVal").addClass("col-md-3");

									$("#orgDiv").removeClass("col-md-4");
									$("#orgDiv").removeClass("col-md-8");
									$("#orgDiv").addClass("col-md-6");
								} else if (catSts == 1) {									
									//$("#patientCatDiv").removeClass("col-md-2");		//COMMENTED ON 27TH JUNE 2019 BY MEENAKSHI
									$("#patientCatDiv").removeClass("col-md-4");
									$("#patientCatDiv").addClass("col-md-6");
									
									$("#pntCatVal").removeClass("col-md-12");
									$("#pntCatVal").addClass("col-md-4");

									$("#orgDiv").removeClass("col-md-4");
									$("#orgDiv").addClass("col-md-8");
									
								}
							}
							
						}
						
						$("#refType").change(function(){
							var refType= $("#refType option:Selected").text();
							
							$("#refId").val("0").trigger('chosen:updated');
							$("#otherHospId").val("0").trigger('chosen:updated');
							$("#otherStaffId").val("0").trigger('chosen:updated');
							
							$("#refDiv").hide();
							$("#otherHospDiv").hide();
							$("#otherStaffDiv").hide();
							$("#otherDoctorsDiv").hide();
							if ($.trim(refType) === "Staff Doctors") {
								$("#refDiv").show();
							} else if ($.trim(refType) === "Other Hospitals") {
								$("#otherHospDiv").show();
							} else if ($.trim(refType) === "Other Staff") {
								$("#otherStaffDiv").show();
							}else if ($.trim(refType) === "Other Doctors") {
								$("#otherDoctorsDiv").show();
							}
							uiAdjustments();
						});
							
						$("#refId").change(function(){
							var refName = $("#refId option:Selected").text();

							var refId = $("#refId").val();
							if (refId == "0") {
								docId = "0";
							} else {
								var docDetails = $("#refId option:selected").val().split(":");
								docId = docDetails[0];
							}
							$("#refIdVal").val(docId);
							$("#refName").val(refName);
							
						});
						
						$("#otherHospId").change(function(){
							var refName = $("#otherHospId option:Selected").text();

							var refId = $("#otherHospId").val();
							
							$("#otherHospName").val(refName);
							
						});
						
						$("#otherStaffId").change(function(){
							var refName = $("#otherStaffId option:Selected").text();

							var refId = $("#otherStaffId").val();
							
							$("#otherStaffName").val(refName);
							
						});
						
						
						$("#patientCat").change(function() {
								//alert(11111);
								$('#patientCat').css('color', 'black');
// 								$("#idLocation").val('0').trigger('chosen:updated');
								$("#scheduleDt").val('');
						    	  $("#idDoctor").val('0').trigger('chosen:updated');
								  docFeeTockenReset();
								  $("#tokenValue").val("");
								  
								var category = $("#patientCat option:selected").text();
								$("#category").val($.trim(category));
										
								$("#amountReceived").attr("readonly", true);
								$("#amountReceived").val("0.00");
								$("#chngGiven").val("0.00");
								$("#balance").val("0.00");
								
								var patientCategory = $("#patientCat option:selected").val();
								//alert(patientCategory);
								$("#categoryId").val(patientCategory);
								var patCatName = $("#patientCat option:selected").text();
								var patCatNameId = $("#patientCat").val();
								$("#patCatName").val($.trim(patCatName));
								$("#patCatNameId").val(patCatNameId);
								$("#amountReceived").attr("readonly", true);
								//alert(patCatName+"patCatName");
								$("#orgId").val("0").trigger('chosen:updated');
								$("#orgDiv").hide();
								$("#status").val("pending");
								//alert(patientCategory);
								if ($.trim(category) === "Credit") {
									//alert(13);
									$("#orgDiv").show();
									
									//var getOrgId=$("#orgId option:selected").val;
									$("#amountReceived").val($("#consFee").val());
									$("#amountReceived").attr("readonly", true);
									$("#status").val("paid");
									
									//getRegistrationFee(patientCategory);		//25th june 2019
								} else if ($.trim(category) === "Cash") {
									
									//getRegistrationFee(patientCategory);		//25th june 2019

								}else {
									//$("#regFee").val("0.00");
									$("#amount").val("0.00");

									$("#discount").val("0.00");
									$("#discountAmount").val("0.00");
								}

								var docDetails = $("#idDoctor option:selected").val().split(":");
								if (docDetails != 0) {
									//alert("in get doc fee..");
									docId = docDetails[0];
									var locId = $("#idLocation option:selected").val();
									var patientId = $("#patientId").val();
									var dateText = $("#scheduleDt").val();
									var patientCategory;
									//alert(patientId);
									if (patientId == 0) {
										//	alert("if")
										patientCategory = $("#patientCat option:selected").val();
									} else {
										//	alert("else")
										patientCategory = $("#categoryId").val();
									}
									if (docId != "0" && locId != "0" && dateText != "" && patientCategory != "0") {
										var consFeeStatus = $("#consStatus").val();
										if (consFeeStatus === 'REG' || consFeeStatus === 'BEFCONS') {
											//alert(4);
											getConsultationFee(docId, locId, dateText, patientId, patientCategory);
											//	$("#totDiv").show();
										}	
									}

								}
								
								uiAdjustments();
								
								var patCatType= $("#patientCat").val();
								
								if(patCatType ==4){
									
									$("#paymentTypeDiv").show();
									
								}else{
									
									$("#paymentTypeDiv").hide();
								}
								
								
							});
				
						
						
					// append with mandatory functionality by habib on 27 nov 2023
						var i = 1;
							$("#addPatFile").click(function(){
						var fileName =$("#ticketFileNames").val();
                     //  alert(fileName);
                        if (fileName == ''){
                     //	alert(5555);
                        }else{	
									

                        	
								var addRow = '<tr>'
									+'<td><input type="file" name="ticketFileNames"/>'
									  +'<small class="empFileText" style="display: none; color: #A94442"></small></td>'
									  +'<td><textarea class="form-control" name="descriptions" ></textarea>'
								      +'<small class="opthaFileDescText" style="display: none; color: #A94442"></small></td>'
								      
								      +'<td style="color:#000"><Select class="form-control" id = "patientType" name="patientTypes">'
										+'<option value="">Select</option>'
										+'<option value="presList">Prescription List</option>'
										+'<option value="labList">Lab List</option>'
										+'<small class="patFileTypeText" style="display: none; color: #A94442"></small></td>'
								      
								   +'<td><button class="btn btn-danger btn-sm remove" type="button" id="delopthaFileBtn">'
					    		      +'<i class="fa fa-trash"></i></button></td></tr>';
								$("#projectDocTable").append(addRow);
								i++;
								
                        }
								
							});
							
							$("#projectDocTable").on('click','.remove',function(){
								 $(this).parent().parent().remove();
						    });
						
						
						
						
						
						
						var docDetails = $("#idDoctor option:selected").val().split(":");
						var docId = docDetails[0];
						var scheduleDt = $("#scheduleDt").val();
				       function getDocterLeaves(docId,scheduleDt) {
							var url = "/<s:message code="projectName"></s:message>/patient/getDocterLeavesByDt?docId="
									+ docId + "&scheduleDt="+scheduleDt;
							$.ajax({
								url : url,
								success : function(response) {
									var data = response.split("^");
								  
								    if(data[1]==0){
								    	 docFeeTockenReset();
								    	 $('#alertModal').modal('show');
									     $('#alertMsg').text("Doctor is on Leave Today - if not please change the Availability status in doctor Availability")
									     $("#tokenValue").val("");
										 $("#docSlotsMainDiv").hide();
										 $("#docSlotsDiv").hide();
										 $("#docSlots").hide();
									     $("#docSlots").html("");
									     $("#consFee").val('');
										 $("#consAmount").val('');
								    }else{
								    	 $('#alertModal').modal('hide');
								    	 $("#docSlotsMainDiv").show();
										 $("#docSlotsDiv").show();
									    
								    }
								  }
							   });
				       }
				       
				       function getExtraSlotsDocsCount(docId,scheduleDt) {
				    	   $('#loadarModal').modal({backdrop : 'static', keyboard : false});
                          
							var url = "/<s:message code="projectName"></s:message>/patient/getExtraSlotsCount?docId="
									+ docId + "&scheduleDt="+scheduleDt;
							//alert(url);
							$.ajax({
								url : url,
								success : function(response) {
									//alert(response);
									var data = response.split("^");
								    if(data[1]==0){
								    	$("#extraDocSlots").html('');
										$("#extraDocSlotsDiv").hide();
										$("#extraDocSlotsMainDiv").hide();
										$("#addExtraTokensDiv").show();
								    }else{
								    	// $('#alertModal').modal('hide');
								    	 $("#extraDocSlotsMainDiv").show();
										 $("#extraDocSlotsDiv").show();
										 $("#addExtraTokensDiv").hide();
										 
									    
								    }
								    $('#loadarModal').modal('hide');
								  }
							       
							   });
				       }
					
						
						function getConsultationFeeDetails(docId, locId,patientCategory) {
							//alert(docId + "..docID..."+locId + ".....locID..."+ patientCategory + ".....patcat..");
							//alert("in....getConsultationFeeDetails(docId, locId)");

							//$('#loadarModal').modal({backdrop : 'static', keyboard : false});
							
							$("#discount").trigger('keyup');
							$("#totDiscount").trigger('keyup');

							var docDetails = $("#idDoctor option:selected").val().split(":");
							//alert(docDetails);
							docId = docDetails[0];
							$("#empCode").val(docDetails[1]);
							$("#specName").val(docDetails[2]);
							var patientCategory = $("#patientCat option:selected").val();
							var url = "/<s:message code="projectName"></s:message>/org/getConsultationFeeDetails?docId="
									+ docId + "&locId=" + locId +"&patientCategory="+patientCategory;
							//alert(url);
							$.ajax({
								url : url,
								success : function(response) {
									//alert(response + "....response in consa fee deta");
									var docDetails = $("#idDoctor option:selected").val().split(":");
									//alert(docDetails);
									idDoctorVal = docDetails[0];
									//$("#empCode").val(docDetails[1]);
									//$("#specName").val(docDetails[2]);
									var patientId = $("#patientId").val();
									var idLocation = $("#idLocation option:selected").val();
									var patientCategoryId = $("#patientCat option:selected").val();
									var patVisitId = $("#patVisitId").val();
									//alert(patVisitId);
									if (response == "No Service Charge or Organization Settings to this Doctor") {
									  //alert(22222);
										$("#tokenValue").val("");
									    /* $('#alertModal').modal('show');
										$("#alertMsg").text(response);  */
										$("#docSlotsMainDiv").hide();
										$("#docSlotsDiv").hide();
									    $("#docSlots").html("");
									    docFeeTockenReset();
									
									} else {
										//alert("in else...");
										$("#consStatus").val(response);
										if (response === 'REG' || response === 'BEFCONS') {
											//alert("in else reg cons fee details func");
											$("#consFeeDetails").show();
											$("#feeStatus").val("REG");
											$("#totDiv").show();
											$("#docSlotsMainDiv").show();
											
											var patId= $("#patientId").val();
											var patSuv = $("#regPatientId").val();
											
											//getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,dateText);
											/* if(patId==0 && patSuv==0){
												alert(patId+"patId");
												alert(patSuv+"patSuv");
												getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,dateText); */
												if(patSuv==0){
												//alert(patId+"patId");
												//alert(patSuv+"patSuv");
												getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,dateText);
											}
											
										}
										
									}
									$('#loadarModal').modal('hide');
									//getRegistrationFee(patientCategory);		//25th june 2019
								}
							});
						}
						
						
						var patientId = $("#patientId").val();
						//alert("patientId"+patientId);
						var patientCategoryId=$("#patientCat").val();
						var patientCategory=$("#patientCat").val();
						var idDoctorVal=$("#idDoctorVal").val();
						var idLocation=$("#idLocation").val();
						var patVisitId=$("#patVisitId").val();
						var scheduleDt= $("#scheduleDt").val();
						
						function getRegistrationFee(patientId,patientCategoryId,idDoctorVal,idLocation,patVisitId,reqDt) {
							var patientId = $("#patientId").val();
							//alert("patientId"+patientId);
							var url = "/<s:message code="projectName"></s:message>/patient/getRegistrationFee?patientId="
								 + patientId + "&patientCategoryId=" + patientCategoryId + 
								 "&idDoctorVal="+idDoctorVal+ "&idLocation="+idLocation + "&patVisitId="+patVisitId +
								 "&scheduleDt="+reqDt;
							var regFeeStatus = $("#feeStatus").val();
							//alert(regFeeStatus + "...regFeeStatus in getReg");
							if (regFeeStatus === 'REG' || regFeeStatus === null) {
								$.ajax({
									url : url,
									success : function(response) {
									// alert(response+"in if response Reg Fee");
										var data = response.split(":");
										var value = parseFloat(data[1]);
										//alert(value);
										$("#regFee").val(value.toFixed(2));
										var reg= $("#regFee").val(value.toFixed(2));
										/* if(reg==0){
											
										}else{
											
										} */
										$("#amount").val(value.toFixed(2));

										$("#totAmt").val(value.toFixed(2));
										$("#billAmt").val(value.toFixed(2));

										calculateFinalBillAmt(1, 0, 0, 0);
									}
								});
							}
						}
						
						
						 var suvRegPatientId= $("#suvRegPatientId").val();
 						function getConsultationFee(docId, locId, reqDt, patientId, patientCategory,suvRegPatientId) {
							//$('#loadarModal').modal({backdrop : 'static', keyboard : false});
						 var url = "/<s:message code="projectName"></s:message>/patient/getConsultationFee?patientId=" + patientId 
									+ "&patientCategory=" + patientCategory + "&locId=" + locId + "&docId=" + docId + "&scheduleDt=" + reqDt
									+ "&suvRegPatientId=" + suvRegPatientId;
// 							alert("getConsultationFee.........." + url);
							$.ajax({
								url : url,
								success : function(response) {
									//alert(response + "...response");
									
									var data = response.split(":"); //alert(data);
									var value = parseFloat(data[1]);
									//alert(data + "...data.....value..." + value);
									//alert(data[3] + "...data 3");
									  // alert(value + "...value...");
									if (isNumber(value) == false) {
										//alert(11111);
										$('#alertModal').modal('show');
										$("#alertMsg").text("No Service Charge or Organization Settings to this Doctor");
										//alert("No Service Charge or Organization Settings to this Doctor");
										$("#tokenValue").val("");
										docFeeTockenReset();
										$("#docSlotsMainDiv").hide();
										$("#docSlotsDiv").hide();
									    $("#docSlots").html("");
									   
									} else {
										//alert("in else");
										$("#consFee").val(value.toFixed(2));
										$("#consAmount").val(value.toFixed(2));
										$("#visitType").val(data[2]);
										$("#patInfoVisit").text(data[2]);
										$("#patVisitId").text(data[3]);

										$("#docSlotsMainDiv").show();
										
										$("#totAmt").val((parseFloat($("#regFee").val()) + parseFloat(value)).toFixed(2));
										$("#totDiscount").val(parseFloat($("#discount").val()).toFixed(2));
										$("#totDiscountAmt").val((parseFloat($("#discountAmount").val()) 
												+ parseFloat($("#consDiscountAmount").val())).toFixed(2));
										$("#billAmt").val((parseFloat($("#amount").val()) + parseFloat($("#consAmount").val())).toFixed(2));
										
										//calculateFinalBillAmt(0, 0, 1, 0);
										$("#amountReceived").val("0.00");
										$("#chngGiven").val("0.00");
										$("#balance").val("0.00");

										$("#status").val("pending");
										
										if ($.trim($("#patientCat option:selected").text()) === "Credit") {
											//alert(13);
											$("#status").val("paid");
										}
								 
									}
									
								}
							});
							 //$("#loadarModal").modal('hide');
						}
						
 						 var regPatientId= $("#regPatientId").val();
						var patientCategory=$("#patientCat option:selected").val();
						var locId=$("#idLocation option:selected").val();
						var docDetails = $("#idDoctor option:selected").val().split(":");
						var docId = docDetails[0];
 						var patVisitId= $("#patVisitId").val();
						var scheduleDt= $("#scheduleDt").val();
						// below func is to get reg validity for suv patiens - Yes or No
					     function getSuvarnaPatRegFee(regPatientId,patientCategory,locId,docId,patVisitId,scheduleDt) {
					    	$('#loadarModal').modal({backdrop : 'static', keyboard : false});
							var url = "/<s:message code="projectName"></s:message>/patient/getSuvPatientRegValiityFee?"
							+ "regPatientId=" +regPatientId+ "&patientCategory=" + patientCategory + "&locId=" + locId
							+"&docId="+docId+"&patVisitId="+patVisitId+"&scheduleDt="+dateText;
							//alert(url);
							$.ajax({
								url : url,
								type: 'GET',
								async:false,
								success : function(response) {
									
									//alert("suv val fee="+response);
									var data = response.split("^");
									var value = parseFloat(data[0]);
									//alert(data);
									 $("#regFee").val(data[0]);
									$("#discount").val("0.00");
									$("#discountAmount").val("0.00");
									$("#amount").val("0.00");
									if (data[1] == "1") {
										//alert("in if suv")
									   // $("#regFee").val(data[0]);
										$("#regFeeDiv").show();   // comment removed for this line on 21 june 2019 by saiprabhu
										$("#feepatInfoRegValidStsStatus").val("REG");
										
										$("#regDivSts").val("1");
										
										//$("#patInfoDiv #patInfoVisit").text('NEWCYCLE');
										//$("#patInfoVisit").text('NEWVISIT');
										
										$("#patInfoRegValidSts").text("NO");
										
									} else {
										$("#feeStatus").val(null);
										//$("#regDivSts").val("0");
										$("#patInfoRegValidSts").text("YES");
										
										
									}
									
									calculateFinalBillAmt(1, 0, 0, 0);
								}
							   	
							    
							});
							$("#loadarModal").modal('hide');
					    } 
					    
					  
					    
					    var patientId= $("#patientId").val();
						var patientCategory=$("#patientCat option:selected").val();
						var locId=$("#idLocation option:selected").val();
						var docDetails = $("#idDoctor option:selected").val().split(":");
						var docId = docDetails[0];
						var patVisitId= $("#patVisitId").val();
						var scheduleDt= $("#scheduleDt").val();
						// below func is to get reg validity - Yes or No
                           function getRegValidityType(patientId,patientCategory,locId,docId,patVisitId,scheduleDt){   
                        	   var url = "/<s:message code="projectName"></s:message>/patient/getPatientRegValiityFee?"+ "patientId="
			                     +patientId+ "&pntCat=" + patientCategory + "&locId=" + locId + "&empId=" + docId + "&patVisitId=" +
			                     patVisitId+"&scheduleDt="+dateText;
				        	//alert(url);
				        	
							$.ajax({
								url : url,
								success : function(regFeeResponse) {
									var data = regFeeResponse.split("^");
									//alert(data);
									//$("#regFee").val(data[0]);		// comment removed for this line on 06th july 2019 by Minakshi
									//$("#discount").val("0.00");
									//$("#discountAmount").val("0.00");
									//$("#amount").val("0.00");
									$(".labinvTable").hide();
									if (data[1] == "1") {
										//$("#regFeeDiv").show();   // comment removed for this line on 21 june 2019 by saiprabhu
										//$("#feeStatus").val("REG");
										//$("#regDivSts").val("1");
										
										//alert("in iffffffffffffff ---- no");
										$("#patInfoRegValidSts").text("NO");
									} else {
										//$("#feeStatus").val(null);
										//$("#regDivSts").val("0");
										//alert("in elseeeeeeeeeeeeeeeeeee----- yes");
										
										$("#patInfoRegValidSts").text("YES");
									}
								}
									
							});
				        	
				        }
					 
						
						function isNumber(n){
							return (parseFloat(n) == n);
						}
						
						//SET CURSOR POSITION
						$.fn.setCursorPosition = function(pos) {
						  this.each(function(index, elem) {
						    if (elem.setSelectionRange) {
						      elem.setSelectionRange(pos, pos);
						    } else if (elem.createTextRange) {
						      var range = elem.createTextRange();
						      range.collapse(true);
						      range.moveEnd('character', pos);
						      range.moveStart('character', pos);
						      range.select();
						      
						    }
						  });
						  return this;
						};
						
						function calculateFinalBillAmt(regFeeStat, consFeeStat, totAmtStat, totAmtCalStat) {
							//alert(regFeeStat + "-" + consFeeStat + "-" + totAmtStat + "-" + totAmtCalStat);
						
							 
							
							var regFee = $("#regFee").val();
							var regDisc = $("#discount").val();
							var regDiscAmt = $("#discountAmount").val();
							
							/* $("#discount").trigger('keyup');
							$("#totDiscount").trigger('keyup'); */

							var consFee = $("#consFee").val();
							var consDisc = $("#consDiscount").val();
							var consDiscAmt = $("#consDiscountAmount").val();
							
							var totAmt = $("#totAmt").val();
							var totDisc = $("#totDiscount").val();
							var totDiscAmt = $("#totDiscountAmt").val();
							
							if (regFeeStat == '1') {
								//alert(regDisc + "...regDisc");
								if (regDisc != '0.00') {
									//alert(1 + ":" + regDisc + ":" + regFee);
						 			var discAmt = (parseFloat(regDisc) * parseFloat(regFee)) / 100;
						 			//alert(discAmt + "....discAmt");
									$("#discountAmount").val(discAmt.toFixed(2));
									
						 			$("#amount").val(((parseFloat(regFee) - parseFloat(discAmt))).toFixed(2));
								} else {
									//alert(2 + ":" + regDiscAmt + ":" + regFee);
									var discPer = "0.00";
									if (regDisc != '0.00' && regFee != '0.00'){
										//alert("yes");
										discPer = (parseFloat(regDiscAmt) * 100) / parseFloat(regFee);
									}
						 			//var discPer = (parseFloat(regDiscAmt) * 100) / parseFloat(regFee);
						 			//$("#discount").val(discPer.toFixed(2));
						 			$("#discount").val(discPer);

						 			$("#amount").val(((parseFloat(regFee) - parseFloat(regDiscAmt))).toFixed(2));
								}
								
								if (totAmtCalStat == 0) {
									//alert(3);
									if (consFee == '' || isNumber(consFee) == false) {
										//alert(4);
										$("#totAmt").val(regFee);
										$("#totDiscount").val($("#discount").val());
										$("#totDiscountAmt").val($("#discountAmount").val());
										$("#billAmt").val($("#amount").val());
										$("#balance").val($("#amount").val());
									
									} else {
										//alert(5);
										$("#totAmt").val((parseFloat(regFee) + parseFloat(consFee)).toFixed(2));
										$("#totDiscount").val(((parseFloat($("#discount").val()) + parseFloat($("#consDiscount").val()))/2).toFixed(2));
										$("#totDiscountAmt").val((parseFloat($("#discountAmount").val()) 
												+ parseFloat($("#consDiscountAmount").val())).toFixed(2));
										$("#billAmt").val((parseFloat($("#amount").val()) + parseFloat($("#consAmount").val())).toFixed(2));
										$("#balance").val((parseFloat($("#amount").val()) + parseFloat($("#consAmount").val())).toFixed(2));
									}	
								}
								
							}

							if (consFeeStat == '1') {
								//alert(consDisc);
								if (consDisc != '0.00') {
									//alert(1);
						 			var discAmt = (parseFloat(consDisc) * parseFloat(consFee)) / 100;
						 			
									$("#consDiscountAmount").val(discAmt.toFixed(2));
									
						 			$("#consAmount").val(((parseFloat(consFee) - parseFloat(discAmt))).toFixed(2));
								} else {
									var discPer =  (parseFloat(consDiscAmt) * 100) / parseFloat(consFee);
						 			//alert("per.." + discPer);
						 			if (isNumber(discPer) == false) {
							 			$("#consDiscount").val("0.00");
						 			} else {
							 			$("#consDiscount").val(discPer.toFixed(2));
						 			}

						 			$("#consAmount").val(((parseFloat(consFee) - parseFloat(consDiscAmt))).toFixed(2));
								}

								if (totAmtCalStat == 0) {
									
									if (regFee == '' || isNumber(regFee) == false) {
										
										$("#totAmt").val(consFee);
										$("#totDiscount").val($("#consDiscount").val());
										$("#totDiscountAmt").val($("#consDiscountAmount").val());
										$("#billAmt").val($("#consAmount").val());
										$("#balance").val($("#consAmount").val());
									} else {

										$("#totAmt").val((parseFloat(regFee) + parseFloat(consFee)).toFixed(2));
										/* $("#totDiscount").val(((parseFloat($("#discount").val()) 
												+ parseFloat($("#consDiscount").val()))/2).toFixed(2)); */
												// commented on 18/11/2019
										
										$("#totDiscountAmt").val((parseFloat($("#discountAmount").val()) 
												+ parseFloat($("#consDiscountAmount").val())).toFixed(2));
										$("#totDiscount").val(((parseFloat($("#totDiscountAmt").val()) 
												/ parseFloat($("#totAmt").val()))*100).toFixed(2));  
										$("#billAmt").val((parseFloat($("#amount").val()) + parseFloat($("#consAmount").val())).toFixed(2));
										$("#balance").val((parseFloat($("#amount").val()) + parseFloat($("#consAmount").val())).toFixed(2));
										//alert($("#totDiscount").val())
									}	
								}
									
							}

							if (totAmtStat == 1) {
								//alert(11);
								if (totDisc != '0.00') {
									//alert(1);
						 			var discAmt = (parseFloat(totDisc) * parseFloat(totAmt)) / 100;
						 			
									$("#totDiscountAmt").val(discAmt.toFixed(2));
									
						 			$("#billAmt").val((parseFloat(totAmt) - parseFloat(discAmt)).toFixed(2));
						 			$("#balance").val((parseFloat(totAmt) - parseFloat(discAmt)).toFixed(2));

								} else {
									//alert(2);
						 			var discPer =  (parseFloat(totDiscAmt) * 100) / totAmt;

						 			if (isNumber(discPer) == false) {
							 			$("#totDiscount").val("0.00");
						 			} else {
							 			$("#totDiscount").val(discPer.toFixed(2));
						 			}

						 			$("#billAmt").val(((parseFloat(totAmt) - parseFloat(totDiscAmt))).toFixed(2));
						 			$("#balance").val(((parseFloat(totAmt) - parseFloat(totDiscAmt))).toFixed(2));

								}

								$("#discountAmount").val("0.00");
								$("#discount").val($("#totDiscount").val());
								calculateFinalBillAmt(1, 0, 0, 1);

								$("#consDiscountAmount").val("0.00");
								$("#consDiscount").val($("#totDiscount").val());
								calculateFinalBillAmt(0, 1, 0, 1);
								
								
							}
							
						}

						
						/* 'keyup()' function on "discount"- validate and navigate to calculate Final bill amount */
						$("#discount").keyup(function(e){
							if (e.which == '36') return true;
							
							var regFee = $("#regFee").val();
							var regDiscount = $("#discount").val();
							var discountAmount = $("#discountAmount").val();
							$("#amountReceived").val('0.00');
							  //alert(isNumber(regFee) + ":" + isNumber(regDiscount)+":"+parseFloat(regDiscount));
							if(regFee == '' || isNumber(regFee) == false || isNumber(regDiscount) == false 
									|| parseFloat(regDiscount) > 100 || parseFloat(regDiscount) <= 0) {
								//alert(1);
								$("#discount").val('0.00');
								$("#discountAmount").val('0.00');  
								$("#amount").val(regFee); 
								
								$('#discount').setCursorPosition(0);
								calculateFinalBillAmt(1, 0, 0, 0);
							} else {
								//alert("in else");
								$("#discountAmount").val('0.00');
								calculateFinalBillAmt(1, 0, 0, 0);
							}
							 $("#consDiscount").trigger('keyup');
							if(regDiscount !='0.00' && isNaN(regDiscount) ==false){
								//alert(2);
								//alert("in disc");
								$("#discAuthDiv").show();
								
							}else if(regDiscount =='0.00' || discountAmount =='0.00'){
									//alert();
									$("#discAuthDiv").hide();
									$("#disStaffId").val('0').trigger('chosen:updated');
									$("#remarks").val(' ');
									
							} 
						});

						/* 'keyup()' function on "discountAmount"- validate and navigate to calculate Final bill amount */
						$("#discountAmount").keyup(function(e){
							if (e.which == '36') return true;
							
							var regFee = $("#regFee").val();
							//alert(regFee + "....regFee");
							var regDiscount = $("#discountAmount").val();
							var discount = $("#discount").val();
							$("#amountReceived").val('0.00');
							//alert(regDiscount + "....regDiscount");
							//alert(isNumber(regFee) + ":" + isNumber(regDiscount) + ":" + regDiscount >= regFee);
							if(regFee == '' || isNumber(regFee) == false || isNumber(regDiscount) == false 
									|| parseFloat(regDiscount) > parseFloat(regFee) || parseFloat(regDiscount) <= 0) {
								//alert("in if....");
								$("#discount").val('0.00');
								$("#discountAmount").val('0.00');
								$("#amount").val(regFee); 
								
								$('#discountAmount').setCursorPosition(0);
								calculateFinalBillAmt(1, 0, 0, 0);
							} else {
							//	alert("in else....");
								//$("#discount").val('0.00');
								calculateFinalBillAmt(1, 0, 0, 0);
							}
							
							if( regDiscount !='0.00' && isNaN(regDiscount) ==false){
								//alert(2);
								//alert("in disc amt");
								$("#discAuthDiv").show();
								
							}else if(discount =='0.00' || regDiscount =='0.00'){
									//alert();
									$("#discAuthDiv").hide();
									$("#disStaffId").val('0').trigger('chosen:updated');
									$("#remarks").val(' ');
							}
							
							
						});
						$('#upiChqCardNo').keyup(function () {
							var upiChqCardNo = $("#upiChqCardNo").val();
							//alert(upiChqCardNo);
								if(upiChqCardNo!=0){
									
									$("#upiChqCardNoText").hide();
									
									}
									
							});
						/* 'keyup()' function on "consDiscount"- validate and navigate to calculate Final bill amount */
						$("#consDiscount").keyup(function(e){
							if (e.which == '36') return true;
							
							var consFee = $("#consFee").val();
							var consDiscount = $("#consDiscount").val();
							$("#amountReceived").val('0.00');
							//alert(isNumber(regFee) + ":" + isNumber(regDiscount));
							if(consFee == '' || isNumber(consFee) == false || isNumber(consDiscount) == false 
									|| parseFloat(consDiscount) > 100 || parseFloat(consDiscount) <= 0) {
								//alert(1);
								$("#consDiscount").val('0.00');
								$("#consDiscountAmount").val('0.00');  
								$("#consAmount").val(consFee); 
								
								$('#consDiscount').setCursorPosition(0);
								calculateFinalBillAmt(0, 1, 0, 0);
							} else {
								//alert("cal cons disc..");
								$("#consDiscountAmount").val('0.00');
								calculateFinalBillAmt(0, 1, 0, 0);
							}
							
							if(consDiscount !='0.00' && isNaN(consDiscount) ==false){
								//alert(2);
								$("#discAuthDiv").show();
								//alert("in consDiscount");
								
							}else if(consDiscountAmount =='0.00' || consDiscount =='0.00'){
									//alert();
									$("#discAuthDiv").hide();
									$("#disStaffId").val('0').trigger('chosen:updated');
									$("#remarks").val(' ');
									
							}
							
							
							
							
						});

						/* 'keyup()' function on "consDiscountAmount"- validate and navigate to calculate Final bill amount */
						$("#consDiscountAmount").keyup(function(e){
							if (e.which == '36') return true;
							
							var consFee = $("#consFee").val();
							var consDiscount = $("#consDiscountAmount").val();
							$("#amountReceived").val('0.00');
							//alert(isNumber(regFee) + ":" + isNumber(regDiscount) + ":" + regDiscount >= regFee);
							if(consFee == '' || isNumber(consFee) == false || isNumber(consDiscount) == false 
									|| parseFloat(consDiscount) > parseFloat(consFee) || parseFloat(consDiscount) <= 0) {
								$("#consDiscount").val('0.00');
								$("#consDiscountAmount").val('0.00');
								$("#consAmount").val(consFee); 
								
								$('#consDiscountAmount').setCursorPosition(0);
								calculateFinalBillAmt(0, 1, 0, 0);
							} else {
								$("#consDiscount").val('0.00');
								calculateFinalBillAmt(0, 1, 0, 0);
							}
							if(consDiscountAmount !='0.00' && isNaN(consDiscountAmount) ==false  ){
								//alert("consDiscountAmount");
								$("#discAuthDiv").show();
								
								
							}else if(consDiscountAmount =='0.00' || consDiscount =='0.00'){
								//	alert();
									$("#discAuthDiv").hide();
									$("#disStaffId").val('0').trigger('chosen:updated');
									//$("#remarks").val(' ');
									
							}
						});

						$("#totDiscount").keyup(function(e){
					    if (e.which == 36) return true;
					
					    var totAmt = $("#totAmt").val();
					    var totDiscount = $("#totDiscount").val();
					
					    $("#amountReceived").val('0.00');
					
					    if (!totAmt || isNumber(totAmt) == false || 
					        !totDiscount || isNumber(totDiscount) == false || 
					        parseFloat(totDiscount) > 100 || 
					        parseFloat(totDiscount) <= 0) {
					
					        $("#totDiscount").val('0.00');
					        $("#totDiscountAmt").val('0.00');  
					        $("#billAmt").val(totAmt);
					
					        $("#discount").val('0.00');
					        $("#discountAmount").val('0.00');
					        $("#amount").val($("#regFee").val());
					
					        $("#consDiscount").val('0.00');
					        $("#consDiscountAmount").val('0.00');
					        $("#consAmount").val($("#consFee").val());
					
					        $('#totDiscount').setCursorPosition(0);
					
					        calculateFinalBillAmt(0, 0, 1, 0);
					
					    } else {
					        $("#totDiscountAmt").val('0.00');
					        calculateFinalBillAmt(0, 0, 1, 0);
					    }
					
					    if (totDiscount && !isNaN(totDiscount) && parseFloat(totDiscount) > 0) {
					        $("#discAuthDiv").show();
					    } else {
					        $("#discAuthDiv").hide();
					        $("#disStaffId").val('0').trigger('chosen:updated');
					       // $("#remarks").val('');
					    }
					    if (parseFloat(totDiscount) == 100) {
					        $("#status").val("concession");
					    } else {
					        $("#status").val("pending");
					    }
					});
										
						$("#idType").change(function() {
							var idType = $("#idType").val();
							//alert(idType);
							if(idType!='0'){
								$("#idNum").attr('disabled',false);
							}else{
								
								$("#idNum").val('').attr('disabled',true);
							}
							//getStatesList(countryCode);
			
						
						}); 
						/* 'keyup()' function on "totDiscountAmt"- validate and navigate to calculate Final bill amount */
							$("#totDiscountAmt").keyup(function(e){
						    if (e.which == 36) return true;
						
						    var totAmt = $("#totAmt").val();
						    var totDiscountAmt = $("#totDiscountAmt").val();
						
						    $("#amountReceived").val('0.00');
						
						    if (!totAmt || isNumber(totAmt) == false || 
						        !totDiscountAmt || isNumber(totDiscountAmt) == false || 
						        parseFloat(totDiscountAmt) > parseFloat(totAmt) || 
						        parseFloat(totDiscountAmt) <= 0) {
						
						        $("#totDiscount").val('0.00');
						        $("#totDiscountAmt").val('0.00');
						        $("#billAmt").val(totAmt);
						
						        $("#discount").val('0.00');
						        $("#discountAmount").val('0.00');
						        $("#amount").val($("#regFee").val());
						
						        $("#consDiscount").val('0.00');
						        $("#consDiscountAmount").val('0.00');
						        $("#consAmount").val($("#consFee").val());
						
						        $('#totDiscountAmt').setCursorPosition(0);
						
						        calculateFinalBillAmt(0, 0, 1, 0);
						
						    } else {
						        $("#totDiscount").val('0.00');
						        calculateFinalBillAmt(0, 0, 1, 0);
						    }
						
						    if (totDiscountAmt && !isNaN(totDiscountAmt) && parseFloat(totDiscountAmt) > 0) {
						        $("#discAuthDiv").show();
						        $("#authorizedByDiv").hide();
						    } else {
						        $("#discAuthDiv").hide();
						        $("#disStaffId").val('0').trigger('chosen:updated');
						       // $("#remarks").val('');
						        //$("#remarks").val('0').trigger('chosen:updated');

						    }
						});
												
						
						var numberRegex1 = /^[0-9.]*$/;
						$("#saveInv").click(function(event){
							 //alert(1);
							 event.preventDefault();
							
							 $("#errCustomerId").hide();
							 
							var customerId = $("#customerId").val();
							
						    var customerName = $("#customerName").val();
						    var patAge = $("#patAge").val();
						    var labTotAmt = $("#labTotAmt").val();
							var labDiscAmt = $("#labDiscAmt").val();
							var labBillAmt = (parseFloat(labTotAmt) - parseFloat(labDiscAmt));
							var labPaidAmt = $("#labPaidAmt").val();
							var labDiscAmt = $("#labDiscAmt").val();
							var labDiscPerc =$("#labDiscPerc").val();
							//alert(labDiscPerc);
							//alert("labPaidAmt.... " + labPaidAmt)
							var discountReason=$("#discountReason").val();
							var orgId =$("#orgId").val();
							
							   var creditAmount = $("#creditAmnt").val();
		                       // alert("creditAmount...."+creditAmount);
		                        var cardType = $("#cardTypes").val();
		                         // alert("cardType...."+cardType);
		                        var creditChqCardNo = $("#oneCreditChqCardNo").val();
		                        var creditDate = $("#cardExpiryDt").val();
		                       // alert("creditDate..."+creditDate);
		                       var chequeAmount = $("#chequeAmnt").val();
		                       var chequeNo = $("#oneChequeChqCardNo").val();
		                       var chequeBankId = $("#chequeBankName").val();
		                       var chequeDate = $("#chequeDt").val(); 
		                       var phonePayAmt = $("#upiAmnt").val();
							    var cashtt = $("#oneUpiChqCardNo").val();  
		                        
							

							var finalTotAmt = $("#labTotAmt").val();
							
							var finallabDiscAmt = $("#labDiscAmt").val();
							if (finallabDiscAmt == '') {
								$("#labDiscAmt").val(0);
							}
							var finallabPaidAmt = $("#labPaidAmt").val();
							if (finallabPaidAmt == '') {
								$("#labPaidAmt").val(0);
							}
						    
						    var billId = $("#billId").val();
		 					//alert(billId);
				     	    if (billId == '0') {
				     	    	
				     	    	if(customerId == '0') {
									$("#errCustomerId").show();
									$("#errCustomerId").text("Enter valid customer number");
										
								} else if (finalTotAmt == '0.00') {
									$("#alertModal").modal('show');
									$("#alertMsg").text('Select atleast one Investigation');
								} else if(!(numberRegex1.test($("#labPaidAmt").val()))){
									
								///	alert("in iffffffff");
									$("#labPaidAmtText").text("invalid amount");
									$("#labPaidAmtText").show();
									$(this).focus();
								} else if (parseFloat(labPaidAmt) > parseFloat(labBillAmt)) { 
									$("#alertModal").modal('show');
									$("#alertMsg").text("Paid amount should not be greater than bill amount");
								}  else if ((phonePayAmt > 0)  && (cashtt === null || cashtt.trim() === "")) {
									$("#alertModal").modal('show');
									$("#alertMsg").text('Transaction Number cannot be empty in UPI transaction.');
									
								}else if ((creditAmount > 0) && (cardType === '0' || cardType.trim() === "")) {
									//alert(12);
									$("#alertModal").modal('show');
									$("#alertMsg").text('Enter Card type like Either Credit or Debit.');
								}else if ((creditAmount > 0) && (creditChqCardNo === null || creditChqCardNo.trim() === "")) {
									//alert(12);
									$("#alertModal").modal('show');
									$("#alertMsg").text('Enter Card Number');
								}else if ((creditAmount > 0)  && (creditDate === null || creditDate =='' )) {
									//alert(12);
									$("#alertModal").modal('show');
									$("#alertMsg").text('Enter Card Date');
								} else if ((chequeAmount > 0 )   && (chequeNo === null || chequeNo == '' || chequeNo.trim() === "")) {
									//alert(12);
									$("#alertModal").modal('show');
									$("#alertMsg").text('Enter Cheque Number');
								} else if ((chequeAmount >0 ) && (chequeBankId === null || chequeBankId == '0' || chequeBankId.trim() === "")) {
									//alert(12);
									$("#alertModal").modal('show');
									$("#alertMsg").text('Select cheque bank number');
								} 
								 else if ((chequeAmount > 0) && (chequeDate === null || chequeDate == '' || chequeDate.trim() === "")) {
										//alert(12);
										$("#alertModal").modal('show');
										$("#alertMsg").text('Enter cheque Date');
									}else /* if ($("#labPaidAmt").val() == '0.00') { 
		     	   					//alert(" if labPaidAmt...");
	     	   						$("#labPaidAmtText").text('Enter amount');
								$("#labPaidAmtText").show();
							} else *//*  if(labDiscAmt !='0' && discountReason==''){
									alert("Please Enter Discount Reason");
									$("#discountReason").focus();
							} else */ { 

									$(".reqQtysErrCount").each(function(){
										if($(this).val() == '1') {
											$("#tableReqQtyErrMsg").val('1');

											return false;
										} else {
											$("#tableReqQtyErrMsg").val('0');
										}
									});

									if ($("#tableReqQtyErrMsg").val() == '1') {
										$("#alertModal").modal('show');
										$("#alertMsg").text('You have Some errors in the Investigation Entry');

									} else {
										//alert("old pat insert...");
										$('#loadarModal').modal({backdrop: 'static', keyboard: false}); 
										$("#deptBillForm").ajaxForm(salesInsertFormAjax);
										$('#deptBillForm').attr('action', "/<s:message code="projectName"></s:message>/patient/insertHospitalSerDetails").submit();
								
									} 	

				     	    	
								}
				     	    	
				     	    }
				     	    	
						});
						
						var salesInsertFormAjax = {
								beforeSubmit : function(formData, formObj,
										options) {
									//alert(formData + "...." + formObj + "....." + options);
								},
								success : function(response) {
							        $('.nav-tabs a[href="#billList"]').tab('show');
							      
							        var data = response.split("^");
									//alert(response);
									if (data[0] == "1") {
										//alert("success");
										//getting values of sales details
										var billId = data[1];
										//alert(billId);
										var billNo = data[2];
										var patId = data[3];

										$('.alignRight').css('align', 'right');
																						            
										$("#successInvDiv").show();
										$("#errorInvDiv").hide();
										$("#successMessageInv").html("&nbsp;&nbsp;&nbsp;" + billNo + " accepted");

									} else {

										$("#errorInvDiv").show();
										$("#successInvDiv").hide();
										$("#errorMessageInv").html("&nbsp;&nbsp;&nbsp; not accepted");

									}
									$("#loadarModal").modal('hide');
									var delay = 500; //Your delay in milliseconds
									setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);
								
								}, error : function(jqXHR, textStatus, errorThrown) {
									alert("error");$(this).val();
								}
								
							};
						
						var chngGiven = 0.00;
						$("#amountReceived").on('keyup',function() {
							
							var amtRecd = $(this).val();
							var billAmt = $("#billAmt").val();
							
							 
							if(!(numberRegexExpression.test(amtRecd))) {
								$("#amountReceived").val("0.00");
								$("#status").val("pending");
								$("#chngGiven").val("0.00");
							} else if (parseInt(amtRecd) < parseInt(billAmt)) {
								//  alert(1);
								var bal = billAmt - amtRecd;
								$("#balance").val(parseFloat(bal).toFixed(2));
								$("#status").val("pending");
								$("#chngGiven").val("0.00");
							} else {
								//alert(14);
								var chngGiven = amtRecd - billAmt;
								$("#chngGiven").val(parseFloat(chngGiven).toFixed(2));
								$("#balance").val("0.00");
								$("#status").val("paid");
							} 
							
						
						});
						
						
						var apptForm = { 
							beforeSubmit : function(formData, formObj, options) {
							//	alert(formData + "...." + formObj + "....." + options);
							},
							success : function(response) {
								// alert(response);
							}
						};
						
					
						
						var space = /^\S+$/;
						var pincodeRegx = /^\d{6}$/;
						var pancardPattern = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
						var webSiteRegx = /^([w]{3})+\.([a-zA-Z]{2,15})+\.[com]/;
						var emailRegx = /^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
						
						var formId = null;
						$(".tabsClass").click(function(){
							//alert("clicked tabs");							
							formId = $(this).attr("data-value");
							$("#formIdValue").val(formId);
							//alert(formId);
						});
						document.addEventListener("keydown", function(event) {
								if (event.key === "F5") {
							        event.preventDefault(); 
							        $('.nav-tabs a[href="#screenAdd"]').tab('show');
							        $(".saveButton").click();
							    }
							});
						$("#cardcardType").on("change",function() {
							var cardcardType = $("#cardcardType").val();
							//alert(idNum);
			     	    	$("#creditCardTypeText").hide();
							if (cardcardType == '0') {
			     	    		//$("#creditCardTypeText").show();
			        	      	//$("#creditCardTypeText").html("Enter Card Type");
							}else{
								$("#creditCardTypeText").hide();
							}
						});
                        
                        $("#cardBankName").on("change",function() {
							var cardBankName = $("#cardBankName").val();
							//alert(idNum);
			     	    	$("#chqBankNameText").hide();
							if (cardBankName == '0') {
			     	    		//$("#chqBankNameText").show();
			        	      	//$("#chqBankNameText").html("Enter Bank Name");
							}else{
								$("#chqBankNameText").hide();
							}
						});

						
                       /*  $("#creditNo").on("keyup",function() {
							var creditNo = $("#creditNo").val();
							//alert(idNum);
			     	    	$("#creditChqCardNoText").hide();
							if (creditNo == '') {
			     	    		$("#creditChqCardNoText").show();
			        	      	$("#creditChqCardNoText").html("Enter Credit No	");
							}else{
								$("#creditChqCardNoText").hide();
							}
						}); */
                        $("#creditDate").on("keyup",function() {
							var creditDate = $("#creditDate").val();
							//alert(idNum);
			     	    	$("#creditDateText").hide();
							if (creditDate == '') {
			     	    		$("#creditDateText").show();
			        	      	$("#creditDateText").html("Enter Credit Date	");
							}else{
								$("#creditDateText").hide();
							}
						});
						// create a function usage of save functionality on 02-07-2022 by hemanth
						function save(){		
							var creditAmount=$("#creditAmount").val();
								var upiAmount=$("#upiAmount").val();
								var chequeAmount=$("#chequeAmount").val();
								var creditChqCardNo = $( "#creditChqCardNo" ).val();
		        	      		var creditBankCard = $("#creditBankCard").val();
		        	      		var upiChqCardNo = $("#upiChqCardNo").val();
		        	      		var upiBankCard = $("#upiBankCard").val();
		        	      		var chequeChqDate=$("#chequeChqDate").val();
		        	      		var creditDate=$("#creditDate").val();
		        	      		var upiDate=$("#upiDate").val();
		        	      		var chequeChqCardNo=$("#chequeChqCardNo").val();
		        	      		//alert(chequeChqCardNo);
		        	      		var chequeBankCard=$("#chequeBankCard").val();
		        	      		
		        	      		var disStaffId=$("#disStaffId").val();
		        	      		var remarks=$("#remarks").val();
		        	      		var patientCat=$("#patientCat").val();
								//alert(patientCat);	
								
								var formIdValue = $("#formIdValue").val();
								
								var newPatientName = $("#newPatientName").val();
								//alert(newPatientName);
								var pntLastName = $("#pntLastName").val();
								var pntDateOfBirth = $("#pntDateOfBirth").val();
								var pntAge = $("#pntAge").val();
								var pntGender = $("#pntGender").val();
								var patientMobNum = $("#patientMobNum").val();
								var pntAddr = $("#pntAddr").val();
								var patientCatCode = $("#patientCatCode").val();
								var pntRefType = $("#pntRefType").val();
								var pntAmountReceived = $("#pntAmountReceived").val();
								var pntBillAmt = $("#pntBillAmt").val();
								var idLocation = $("#idLocation").val();
								var paymentType = $("#paymentType").val();
								
								
								var cityId = $("#city").val();
								var city = $("#city option:selected").text().trim();
								var stateId = $("#state").val();
								var state = $("#state option:selected").text().trim();
								
								//alert(idLocation +"-locId");
								//$('#regIdForm').attr('action', "/<s:message code="projectName"></s:message>/patient/registerNewPatient").submit();
										
							
								$("#restrictResubmission").val('0');
								
								$('.nav-tabs a[href="#apptAdd"]').tab('show');
								var radioValue = $("input[name='patientDetailsSplit']:checked").val();
								
								var patientId = $("#patientId").val();
								var patientName = $("#patientName").val();
								if(patientId == '0'){
									var patientMobi = $("#pntMobNum").val();
									$("#patientMobi").val(patientMobi);
								}else{
									$("#patientMobi").val('0');
								}
								
								var parentName = $("#parentName").val();
								var patientGender = $("#genderVal").val(); 
// 								alert(patientGender+"alert(patientGender);");
								var pntDob = $("#pntDob").val();
								//alert(pntDob + "...pntDob");
								//alert("pntDob..."+pntDob);
								var smsAlert = $("#smsAlert").val();
								var age = $("#age").val();
								var ageMonths = $("#ageMonths").val();
								var ageDays = $("#ageDays").val();
								var pntMobNum = $("#pntMobNum").val();
								
								//alert("pntMobNum..."+pntMobNum);
								var refType = $("#refType").val();
								//alert(refType);
								//alert(refType+"-refType");
				/* 			   var cityId = $("#city").val();


                                var stateId = $("#state").val(); */

								//alert(city+"-city");
								var village = $("#village").val();
								var addr = $("#addr").val();
								var pntMaritalStatus = $("#pntMaritalStatus").val();
								var pntNationality = $("#pntNationality").val();
								//alert("pntNationality"+pntNationality);
								var pntReligion = $("#pntReligion").val();
								var idType = $("#idType").val();
								//alert("idType",idType);
								var idNum = $("#idNum").val();
								//alert("idNum",idNum);
								var patientCat = $("#patientCat").val();
								//alert(patientCat);
								var paymentType= $("#paymentType").val();
								//alert(patientCat+"-patientCat");
								var pntBloodGrp = $("#pntBloodGrp").val();
								var pntOccupation = $("#occupation").val();
								//alert("pntOccupation......"+pntOccupation);
								var careBy = $("#careBy").val();
								var careByName = $("#careByName").val();
								var idDoctor = $("#idDoctor").val();
								var idDoctorVal = $("#idDoctorVal").val();
								//alert(idDoctorVal+"-idDoctorVal");
								var idLocation = $("#idLocation").val();
								var scheduleDt = $("#scheduleDt").val();
								var tokenValue = $("#tokenValue").val();
							   // alert(tokenValue+"..tokenValue");
								var pblmDesc = $("#pblmDesc").val();
								var regFee = $("#regFee").val();
								var discount = $("#discount").val();
								var discountAmount = $("#discountAmount").val();
								var amount = $("#amount").val();
								var consFee = $("#consFee").val();
								var consDiscount = $("#consDiscount").val();
								var consDiscountAmount = $("#consDiscountAmount").val();
								var consAmount = $("#consAmount").val();
								var totAmt = $("#totAmt").val();
								var totDiscount = $("#totDiscount").val();
								var totDiscountAmt = $("#totDiscountAmt").val();
								var billAmt = $("#billAmt").val();
								//alert(billAmt);
								var amountReceived = $("#amountReceived").val();
								var chngGiven = $("#chngGiven").val();
								var balance = $("#balance").val();
								var amountReceived = $("#amountReceived").val();
								var regPatientName = $("#regPatientName").val();
								var state=$("#state").val();
								var patientTitle=$("#patientTitle").val();
								//alert(patientTitle);
                                var creditAmount = $("#creditAmount").val();
								var cardcardType = $("#cardcardType").val();
								var creditNo = $("#creditNo").val();
								var cardBankName = $("#cardBankName").val();
								var authorizedBy = $("#authorizedBy").val();
								//alert(authorizedBy);
								var creditDate = $("#creditDate").val();
								var status = $("#status").val();

	     	    		    $("#patientNameText").hide();
		     	    			$("#parentNameText").hide();
		     	    			$("#patientGenderText").hide();
		     	    			$("#careByText").hide();
		     	    			$("#careByNameText").hide();
		     	    			$("#ageText").hide();
		     	    			$("#pntMobNumText").hide();
		     	    			$("#patientCatText").hide();
		     	    			$("#idDoctorText").hide();
		     	    			$("#idLocationText").hide();
		     	    			$("#scheduleDtText").hide();
		     	    			$("#tokenValueText").hide();
		     	    			$("#amountReceivedText").hide();
		     	    			$("#cityText").hide();
		     	    			$("#stateText").hide();
		     	    			$("#villageText").hide();
		     	    			$("#pntOccupationText").hide();
		     	    			$("#stateText").hide();
		     	    			$("#upiChqCardNoText").hide();
		     	   	
			        	      /* 	if(billAmt=='0.00'){
			        	      		//alert(billAmt);
			        	      		$( "#amountReceived" ).trigger( "keyup" );
			        	      	
								} if(upiAmount != '0.00' && upiChqCardNo == ''){
		        	      			$("#upiChqCardNoText").show();
			        	      		$("#upiChqCardNoText").html("Enter Trans Id ");	
			        	      		window.scroll(0,400);
			        	      		$("#upiChqCardNo").focus();
			        	      	
		        	      		}else if(upiAmount != '0.00' && upiChqCardNo == ''){
			        	      			$("#upiChqCardNoText").show();
				        	      		$("#upiChqCardNoText").html("Enter Trans Id ");	
				        	      		window.scroll(0,400);
				        	      		$("#upiChqCardNo").focus();
				        	 
			        	      	}else if(consDiscount != '0.00' && consDiscountAmount !='0.00' && disStaffId=='0'){
			        	      			$("#disStaffIdText").show();
				        	      		$("#disStaffIdText").html("please select Discount authorized");
				        	      		window.scroll(0,500);
				        	      		$("#disStaffId").focus();
				        	      		
				        	      		
			        	    	}else if(discount != '0.00' && discountAmount !='0.00' && disStaffId=='0'){
		        	      			$("#disStaffIdText").show();
			        	      		$("#disStaffIdText").html("please select Discount authorized  ");
			        	      		window.scroll(0,500);
			        	      		$("#disStaffId").focus();
			        	      		
			        	      		
			        	    	}else if(totDiscount != '0.00' && totDiscountAmt !='0.00' && disStaffId=='0'){
		        	      			$("#disStaffIdText").show();
			        	      		$("#disStaffIdText").html("please select Discount authorized  ");
			        	      		window.scroll(0,500);
			        	      		$("#disStaffId").focus();
			        	      		
			        	    	}else  if(billAmt != amountReceived)	{
			        	    		
			        	    		$('#alertModal').modal('show');
								    $('#alertMsg').text("please enter valid amount");
			        	      		
								} else  */ 
								
								
								
		     	    			if(upiAmount != '0.00' && upiAmount != '0' && upiAmount != '' && upiChqCardNo == ''){
		        	      			$("#upiChqCardNoText").show();
			        	      		$("#upiChqCardNoText").html("Enter Trans Id ");	
			        	      		window.scroll(0,400);
			        	      		$("#upiChqCardNo").focus();
			        	      	
		        	      		}else if (creditAmount != '0.00' && creditChqCardNo == '') {
			     	    			//alert(11);
									$("#creditChqCardNoText").show();
			        	      		$("#creditChqCardNoText").html("Enter Trans Id");			        	      		
								}else if(patientName == '' && radioValue == 'apptWise') {
			     	    			//alert(11);
									$("#patientNameText").show();
			        	      		$("#patientNameText").html("Enter or Select Patient Name");			        	      		
								}else if (patientTitle == '0') {
									//alert(1);
			     	    			$("#patientTitleText").show();
			        	      		$("#patientTitleText").html("Select Patient Title");
								} else if (newPatientName == '' && radioValue == 'newApptWise') {
			     	    			//alert(33);
									$("#newPatientNameText").show();
			        	      		$("#newPatientNameText").html("Enter or Select Patient Name");			        	      		
								} else if (!(charRegex.test(newPatientName))  && radioValue == 'newApptWise') {
									//alert(44);
									$("#newPatientNameText").show();
			        	      		$("#newPatientNameText").html("Enter valid Patient Name");
								} else if (regPatientName == '' && radioValue == 'regWise') {
			     	    			$("#regPatientNameText").show();
			        	      		$("#regPatientNameText").html("Enter Patient Name");
								} else if (lastName== '' && radioValue == 'newApptWise') {
									//alert(44);
									$("#lastNameText").show();
			        	      		$("#lastNameText").html("Enter valid Patient Last Name");
								} else if (lastName == '' && radioValue == 'regWise') {
			     	    			$("#lastNameText").show();
			        	      		$("#lastNameText").html("Enter Patient Last Name");
								} else if (patientGender == '0') {
									//alert(1);
			     	    			$("#patientGenderText").show();
			        	      		$("#patientGenderText").html("Select Patient Gender");
			        	      		
			        	      		
								} /* else if (idNum == '') {
									//alert(1);
			     	    			$("#idNumText").show();
			        	      		$("#idNumText").html("Select Id Num");
								}  */else if (age == '') {
									
								//alert(2);
			     	    			$("#ageText").show();
			        	      		$("#ageText").html("Enter Patient Age");
								} else if (!(numberRegex.test(age))) {
			     	    			$("#ageText").show();
			        	      		$("#ageText").html("Enter valid Patient Age");
			        	      		//alert(3);
								} else if (!(numberRegex.test(ageDays))) {
			     	    			$("#ageText").show();
			        	      		$("#ageText").html("Enter valid Patient Age");
			        	      		//alert(7);
								}else if (!(mobNoRegx.test(pntMobNum)) && pntMobNum != '') {
			     	    			$("#pntMobNumText").show();
			        	      		$("#pntMobNumText").html("Enter valid Mobile Number");
			        	      		//alert(8);
								}else if (pntMobNum == '') {
			     	    			$("#pntMobNumText").show();
			        	      		$("#pntMobNumText").html("Select Mobile Number");
			        	      		//alert(10);
			        	      		
								} else if (addr == '') {
			     	    			$("#addrText").show();
			        	      		$("#addrText").html("Select Address");
			        	      		//alert(17);
							}  
								else if (idNum == '') {
			     	    			$("#idNumText").show();
			        	      		$("#idNumText").html("Enter Id Number");
			        	      		//alert(17);
							} 
								else if (idLocation == '0') {
		     	    			$("#authorizedByText").show();
		        	      		$("#idLocationText").html("Select Location");
		        	      		//alert(17);
							}else if (authorizedBy == '0' && status === 'pending') {
							    $("#authorizedByText").show();
							    $("#authorizedByText").html("Select Authorized By");
							}
								
								
								
								else if(city== '0'){
										
									//alert("in ifffff city");
								
									$("#cityText").show();
			        	      		$("#cityText").html("select city");
			        	      		//alert(10);
			        	      		
								}else if (village == '0') {
			     	    			$("#villageText").show();
			        	      		$("#villageText").html("Select Village");
			        	      		//alert(12);
								}								
								else if (refType == '0' || refType == null) {
				     	    		$("#refTypeText").show();
				        	      	$("#refTypeText").html("Select Referral Type");
				        	      	//alert(13);
								// else if (patientCat == '0' && patientId == '0') 
								} /* else if (patientCat == '0' || patientCat == null) {
									//alert(14);
								
			     	    			$("#patientCatText").show();
			        	      		$("#patientCatText").html("Selet Patient Category");
			        	      		//alert(15);
								} */else if (patientCat == '4' && paymentType == '0') {
									//alert(14);
								
			     	    			$("#paymentTypeText").show();
			        	      		$("#paymentTypeText").html("Selet Payment Type");
			        	      		//alert(15);
								}  else if (idLocation == '0') {
			     	    			$("#idLocationText").show();
			        	      		$("#idLocationText").html("Select Location");
			        	      		//alert(17);
								}else if (idDoctor == '0') {
			     	    			$("#idDoctorText").show();
			        	      		$("#idDoctorText").html("Select Consultant");
			        	      		//alert(16);
								} /* else if (idLocation == '0') {
			     	    			$("#idLocationText").show();
			        	      		$("#idLocationText").html("Select Location");
			        	      		//alert(17);
								} */ /* else if (scheduleDt == '') {
			     	    			$("#scheduleDtText").show();
			        	      		$("#scheduleDtText").html("Selet Schedule Date"); */
			        	      		//alert(18);
							/* 	} else if (tokenValue == '') {
			     	    			$("#tokenValueText").show();
			        	      		$("#tokenValueText").html("Select Token");
			        	      		window.scroll(0, 330);
			        	      		$("#tokenValue").focus();
			        	      		//alert(19);
								} */ else if (amountReceived == '') {
			     	    			$("#amountReceivedText").show();
			        	      		$("#amountReceivedText").html("Bill Payment");
			        	      		//alert(20);
			        	      		
								}else if (addr == '') {
			     	    			$("#addrText").show();
			        	      		$("#addrText").html("Select Address");
			        	      		//alert(17);
			        	      		
			        	      		
								}else if (authorizedBy== '') {
			     	    			$("#authorizedByText").show();
			        	      		$("#authorizedByText").html("Select AuthorizedBy");
			        	      		//alert(17);
			        	      		
			        	      		
								}
								else if (creditAmount != '0.00' && creditAmount != '0' && creditAmount != '' && cardcardType == '0') {
// 			     	    			alert("1111111");
									$("#creditCardTypeText").show();
			        	      		$("#creditCardTypeText").html("Enter Card Type");			        	      		
								}else if (creditAmount != '0.00' && creditAmount != '0' && creditAmount != ''  && creditNo == '') {
			     	    			//alert(11);
									$("#creditChqCardNoText").show();
			        	      		$("#creditChqCardNoText").html("Enter Credit No");			        	      		
								}else if (creditAmount != '0.00' && creditAmount != '0' && creditAmount != '' && cardBankName == '0') {
			     	    			//alert(11);
									$("#chqBankNameText").show();
			        	      		$("#chqBankNameText").html("Enter Bank Name");			        	      		
								}else if (creditAmount != '0.00' && creditAmount != '0' && creditAmount != '' && creditDate == '') {
			     	    			//alert(11);
									$("#creditDateText").show();
			        	      		$("#creditDateText").html("Enter Credit Date");			        	      		
								}else {
	
									$('#loadarModal').modal({backdrop : 'static', keyboard : false});
									
									var docDetails = $("#idDoctor option:selected").val().split(":");
									docId = docDetails[0];
	
									$("#idDoctorVal").val(docDetails[0]);
									$("#empCode").val(docDetails[1]);
									$("#specName").val(docDetails[2]);
										
									$("#apptReportFromDt").val($("#reportFromDt").val());
									$("#apptReportToDt").val($("#reportToDt").val());
									
									
									
									    var status = $("#status").val().trim().toLowerCase();
									    var viewMode = $("#viewMode").val();
									    
									    if (status === "paid" && viewMode == "1") {


									        var patientViewIndex = $("#patientViewIndex").val();

									        var patientRow = $("#patientInfo tbody tr").eq(patientViewIndex);

									        var billId = patientRow.find(".billId").val();
									        var patientId = patientRow.find(".patientId").val();

									       

									        $("#pendingBillId").val(billId);



									        $("#apptIdForm").ajaxForm('destroy');

									        $("#apptIdForm").ajaxForm(ipUpdateFormAjax);

									        $("#apptIdForm").attr("method", "POST");

									        $("#apptIdForm").attr(
									            "action",
									            "/<s:message code="projectName"></s:message>/patient/updatePendingBillstatus"
									        );
									        $("#apptIdForm").submit();

									        return false;

									    }
									    else if (status === "pending") {

									       

									        $("#loadarModal").modal('hide');

									        $("#paymentAlertModal").modal('show');

									        $("#paymentAlertMsg").html(
									            "Payment is Pending.Do You Want to Proceed?"
									        );

									        $('#yesPayment').off('click').on('click', function () {

									            $("#paymentAlertModal").modal('hide');

									            $("#apptIdForm").ajaxForm(patinetFormAjax);

									            $('#apptIdForm').attr(
									                'action',
									                "/<s:message code="projectName"></s:message>/patient/registerPatient"
									            ).submit();

									        });

									        $('#noPayment').off('click').on('click', function () {
									            $("#paymentAlertModal").modal('hide');
									        });

									        return false;

									    }
									    
									    else {


									        $("#buttonsDiv").hide();
									        $("#buttonsDiv .saveButton").prop("disabled", true);

									        $("#apptIdForm").ajaxForm(patinetFormAjax);

									        $('#apptIdForm').attr(
									            'action',
									            "/<s:message code="projectName"></s:message>/patient/registerPatient"
									        ).submit();
									    }
									
									
									
								}
						}
							    
									    
									    
						var ipUpdateFormAjax = {

							    beforeSubmit: function(formData, formObj, options) {
							    	
							    },

							    success: function(response) {



							        var data = response.split("^");

							        if (data[0] == "1") {


							            var patientViewIndex = $("#patientViewIndex").val();

							            var patientRow = $("#patientInfo tbody tr").eq(patientViewIndex);

							            var patientId = patientRow.find(".patientId").val();
							            var patientName = patientRow.find(".patientName").val();
							            var balance = patientRow.find(".balance").val();
							            var billAmt = patientRow.find(".billAmt").val();
							            var billId = patientRow.find(".billId").val();
							            var billStatus = patientRow.find(".billStatus").val();


							            $("#successDiv").show();
							            $("#errorDiv").hide();

							            $("#successMessage").html(
							                "&nbsp;&nbsp;&nbsp;" + patientName + " updated"
							            );

							            $("#loadarModal").modal('hide');

							            // Destroy update ajax handler
							            $("#apptIdForm").ajaxForm('destroy');

							            var delay = 200;

							            setTimeout(function() {

							                window.location =
							                    "/<s:message code="projectName"></s:message>/patient/patientQueue";

							            }, delay);

							        } else {

							            alert("Update failed");

							            $("#successDiv").hide();
							            $("#errorDiv").show();

							            $("#errorMessage").html(
							                "&nbsp;&nbsp;&nbsp;" + patientName + " not updated"
							            );

							            $("#loadarModal").modal('hide');
							        }

							        resetData();
							    },

							    error: function(jqXHR, textStatus, errorThrown) {

							        alert("updatePendingBill ERROR");

							        console.log(jqXHR);
							        console.log(textStatus);
							        console.log(errorThrown);

							       // resetData();

							        $("#loadarModal").modal('hide');
							    }
							};
						
						
						var patinetFormAjax = {
								beforeSubmit : function(formData, formObj,options) {
// 								alert(formData + "...." + formObj + "....." + options);
								},
								success : function(response) {
									var data = response.split("^");										
							        //$("#empCode").val(data[1]);
									if(data[0] == "9") {
										//$('#alertModal').modal('show');
										//  $("#alertMsg").text("This Patient Already Inserted"+data[1]);
// 										    $("#modalPatientDetails").val(data[1]);
											$("#patientNameDivAMMM").hide();
// 											$("#titleDivAMMM").val();
											$("#titleDivAMMM").text("This patient Details already Exist ").css({
                                            "color": "black", "font-weight": "bold", "font-size": "18px", "margin-left": "367px"
                                             });

											patDetailsAjax(data[1]);
									        $("#patdet-modal").modal('show');
									        $("#patientNameText").hide();
									        $(document).ready(function() {
								       		    // Check the radio button
								       		    $("#apptWise").prop('checked', true);
								       		   $("#patientNameDiv").attr('hidden' , false);
												 $("#newPatientNameDiv").attr('hidden' , true);
												 $("#regPatientNameDiv").attr('hidden' , true);	
												 
												 $("#apptPatientDetailsDiv").attr('hidden' , false);	
												 $("#regPatientDetailsDiv").attr('hidden' , true);	
												 $("#patientGender").hide();
												 $("#genderVal").show();
												 $("#passPortDiv").hide();
												 $("#patientName").val('');
												// $("#patInfoVisit").text('');
												
												 $("#idRetakee").trigger('click');
												 $("#idRetake").trigger('click');
												 var src='';
												 document.getElementById("picNameId").src = src;
												 $("#picNameId").hide();
												 
												 var src='';
												 document.getElementById("picNameIdd").src = src;
												 $("#picNameIdd").hide();
												 $("#maritalStatusVal").show();
												 $("#pntMaritalStatus").hide();
												 $("#regPatientName").val('');
												 $("#patientTitleText").hide();
													$("#patientGenderText").hide();
													$("#patientNameText").hide();
													$("#lastNameText").hide();
													$("#pntDobText").hide();
													$("#ageText").hide();
													$("#careByText").hide();
													$("#careByNameText").hide();
													$("#babyParentText").hide();
													$("#parentNameText").hide();
													$("#pntMobNumText").hide();
													$("#refTypeText").hide();
													$("#refIdText").hide();
													$("#pntMaritalStatusText").hide();
													$("#pntNationalityText").hide();
													$("#pntReligionText").hide();
													$("#pntBloodGrpText").hide();
													$("#pntOccupationText").hide();
													$("#idTypeText").hide();
													$("#idNumText").hide();
													$("#stateText").hide();
													$("#errCity").hide();
													$("#villageText").hide();
													$("#patientCatText").hide();
													$("#pblmDescText").hide();
													$("#idLocationText").hide();
													$("#idDoctorText").hide();
													$("#scheduleDtText").hide();
													$("#specNameText").hide();
													$("#empCodeText").hide();
													$("#tokenValueText").hide();
													$("#errFee").hide();
													$("#feeDiscountText").hide();
													$("#feeDiscountAmtText").hide();
													$("#errConsFee").hide();
													$("#consDiscountText").hide();
													$("#consDiscountAmtText").hide();
													$("#totAmtText").hide();
													$("#totDiscountText").hide();
													$("#totDiscountAmtText").hide();
													$("#amountReceivedText").hide();
													$("#docSlotsDiv").hide();
													
													$("#patInfoVisit").text('');
													$("#patientTitle").val("0");
													$("#patientName").val('');
													$("#lastName").val('');
													$("#patientGender").val("0");
													$("#pntDob").val('');
													$("#age").val('');
													$("#careBy").val("0");
													$("#careByName").val('');
													$("#babyParent").val('');
													$("#parentName").val('');
													$("#pntMobNum").val('');
//							 						$("#refType").val("0");
													$("#refId").val('');
													$("#pntMaritalStatus").val("0");
													$("#pntNationality").val("0");
													$("#pntReligion").val("0");
													$("#pntBloodGrp").val("0");
													$("#occupation").val('');
													$("#idType").val("0");
													$("#idNum").val("");
													$("#state").val("0");
													$("#city").val("0");
													$("#village").val('');
													$("#addr").html('');
//							 						$("#patientCat").val("0").trigger('chosen:updated');
													$("#pblmDesc").val('');
//							 						$("#idLocation").val("0");
													$("#idDoctor").val("0").trigger('chosen:updated');
													$("#scheduleDt").val('');
													$("#specName").val('');
													$("#empCode").val('');
													$("#tokenValue").val('');
													$("#feeStatus").val('');
													$("#regFee").val('');
													$("#discount").val('');
													$("#discountAmount").val('');
													$("#amount").val('');
													$("#consFee").val('');
													$("#ageMonths").val('');
													$("#ageDays").val('');
													$("#consDiscount").val('');
													$("#consDiscountAmount").val('');
													$("#consAmount").val('');
													$("#totAmt").val('');
													$("#totDiscount").val('');
													$("#totDiscountAmt").val('');
													$("#billAmt").val('');
													$("#amountReceived").val('');
													$("#chngGiven").val('');
													$("#balance").val('');
													$("#status").val('');
													$("#regPatientId").val('0');
													$("#suvRegPatientId").val('0');
													$("#patVisitId").val('0');
													$("#umrDiv").show();
													$("#occupation").val("0").trigger('chosen:updated');
													$("#state").val('AP').trigger('chosen:updated');
													$("#occupation").attr('disabled', false);
													$("#newPatientName").attr('readonly', false);
													$("#patientName").attr('readonly', false);
													$("#regPatientName").attr('readonly', false);
													$("#pntDob").attr('disabled', true);
													$("#patientTitle").attr("disabled",true);
													$("#genderVal").attr("disabled",true	);
													$("#pntMaritalStatus").attr("disabled",false);
													$("#lastName").attr("disabled",true);
													$("#age").attr("readonly",false);
													
													$("#ageMonths").attr("readonly",false);
													$("#ageDays").attr("readonly",false);						
													$("#pntMobNum").attr("readonly",true);
													$("#regDt").attr("readonly",false);
													$("#village").attr("disabled",true);
													$("#careBy").attr("disabled",true);
													$("#occupation").attr("disabled",true);
													$("#maritalStatusVal").attr("disabled",true);
													$("#careByName").attr("disabled",true);
													$("#pntNationality").attr("disabled",true);
													$("#pntReligion").attr("disabled",true);
													$("#pntBloodGrp").attr("disabled",true);
													$("#refType").prop("disabled",true);
													$("#pntOccupation").attr("disabled",false);
													$("#idType").prop('disabled', true);
													$("#idNum").attr("readonly",true);
													$("#addr").prop('disabled', true);
													$("#city").prop('disabled', true);
													$("#state").prop('disabled', true);
													$("#regPatientNameText").hide();
													$("#addr").html('');
													$("#pntMobNum").attr("disabled",false);
													$("#addr").val('');
													$("#patInfoRegValidSts").text("NO");
													//$("#patInfoRegValidDt").hide();
													$("#paymentType").val('0').trigger('chosen:updated');
													$("#refType").trigger('change');
													$("#refTypeText").hide();
													$("#idLocation").attr('disabled', true);
								       		});
									        
									}else{
									if (data[0] == "1") {
										 var umrNo = data[1];
									        var patientId = data[2];

									       //alert("Generated UMR : " + umrNo);
									        //alert("Patient Id : " + patientId);
									
										 $('.nav-tabs a[href="#apptList"]').tab('show');	
										$("#successDiv").show();
										$("#errorDiv").hide();
										$("#successMessage").html("&nbsp;&nbsp;&nbsp; accepted");
										var delay = 300; //Your delay in milliseconds
										setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay); 
										
									} else {
      
										$("#errorDiv").show();
										$("#successDiv").hide();
										$("#errorMessage").html("&nbsp;&nbsp;&nbsp; not accepted");
										var delay = 500; //Your delay in milliseconds
										setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay); 
										
									}
								}
									$('#loadarModal').modal('hide');
								

								}, error : function(jqXHR, textStatus, errorThrown) {
									/* alert("error"); */
								}
								
							};
						$("#buttonsDiv").on("click", ".saveButton",function(event){
									//alert(1);
									event.preventDefault();
			        	      		save();
						}); 
						$("#saveButton").click(function(event){
							//alert(1);
							event.preventDefault();
	        	      		save();
						});
						

						$("#yesPymnt").click(
							function() {
								$("#pymntConfirm").modal('hide');
								$('#loadarModal').modal({backdrop : 'static', keyboard : false});
								$('#apptIdForm').attr('action', "/<s:message code="projectName"></s:message>/patient/registerPatient").submit();
						});

						$("#noPymnt").click(
							function() {
								$("#pymntConfirm").modal('hide');
								$("#amountReceived").focus();
						});
						/* $('.form-control.input-sm').on('click', function() {
						    var d=0;
					       	$(".regOpCashAmt").each(function(){
					       		var amtd=$(this).val();
					       		alert(amtd);
					       		d=parseFloat(d)+parseFloat(amtd);
					       	});

					       	$("#cashAmttt").text(d.toFixed(2));
						}); */
					 /*    $('.dataTables_length').on('click', function() {
					    	var a=0;
					       	$(".cashAmt").each(function(){
					       		var amt=$(this).val();
					       		a=parseFloat(a)+parseFloat(amt);
					       	});

					       	$("#cashAmountTfoot").text(a.toFixed(2));

					    	var b=0;
					       	$(".creditAmt").each(function(){
					       		var amtb=$(this).val();
					       		//alert(amtb);
					       		b=parseFloat(b)+parseFloat(amtb);
					       	});

					       	$("#creditAmountTfoot").text(b.toFixed(2));

					    	var c=0;
					       	$(".upiAmt").each(function(){
					       		var amtc=$(this).val();
					       		c=parseFloat(c)+parseFloat(amtc);
					       	});

					       	$("#upiAmtTfoot").text(c.toFixed(2));
					       	
					     	var d=0;
					       	$(".regOpCashAmt").each(function(){
					       		var amtd=$(this).val();
					       		//alert(amtd);
					       		d=parseFloat(d)+parseFloat(amtd);
					       	});

					       	$("#cashAmttt").text(d.toFixed(2));

					    	var e=0;
					       	$(".regOpCreditAmt").each(function(){
					       		var amte=$(this).val();
					       		//alert(amtb);
					       		e=parseFloat(e)+parseFloat(amte);
					       	});

					       	$("#cardAmttt").text(e.toFixed(2));

					    	var f=0;
					       	$(".regOpUpiAmt").each(function(){
					       		var amtf=$(this).val();
					       		f=parseFloat(f)+parseFloat(amtf);
					       	});

					       	$("#upiAmttt").text(f.toFixed(2));

					    });

						document.getElementById('patientInfo_paginate').addEventListener('click', function(event) {
							var a=0;
					       	$(".cashAmt").each(function(){
					       		var amt=$(this).val();
					       		a=parseFloat(a)+parseFloat(amt);
					       	});

					       	$("#cashAmountTfoot").text(a.toFixed(2));

					    	var b=0;
					       	$(".creditAmt").each(function(){
					       		var amtb=$(this).val();
					       		//alert(amtb);
					       		b=parseFloat(b)+parseFloat(amtb);
					       	});

					       	$("#creditAmountTfoot").text(b.toFixed(2));

					    	var c=0;
					       	$(".upiAmt").each(function(){
					       		var amtc=$(this).val();
					       		c=parseFloat(c)+parseFloat(amtc);
					       	});

					       	$("#upiAmtTfoot").text(c.toFixed(2));
					       	
					     	var d=0;
					       	$(".regOpCashAmt").each(function(){
					       		var amtd=$(this).val();
					       		//alert(amtd);
					       		d=parseFloat(d)+parseFloat(amtd);
					       	});

					       	$("#cashAmttt").text(d.toFixed(2));

					    	var e=0;
					       	$(".regOpCreditAmt").each(function(){
					       		var amte=$(this).val();
					       		//alert(amtb);
					       		e=parseFloat(e)+parseFloat(amte);
					       	});

					       	$("#cardAmttt").text(e.toFixed(2));

					    	var f=0;
					       	$(".regOpUpiAmt").each(function(){
					       		var amtf=$(this).val();
					       		f=parseFloat(f)+parseFloat(amtf);
					       	});

					       	$("#upiAmttt").text(f.toFixed(2));
						}); */
						
						
						function getSum(className) {
						    var total = 0;

						    $(className).each(function () {
						        var val = parseFloat($(this).val());
						        total += isNaN(val) ? 0 : val;
						    });

						    return total;
						}
						function updateFooterTotals() {

						    var cash = getSum(".cashAmt");
						    var credit = getSum(".creditAmt");
						    var upi = getSum(".upiAmt");

						    var regCash = getSum(".regOpCashAmt");
						    var regCredit = getSum(".regOpCreditAmt");
						    var regUpi = getSum(".regOpUpiAmt");

						    $("#cashAmountTfoot").text(cash.toFixed(2));
						    $("#creditAmountTfoot").text(credit.toFixed(2));
						    $("#upiAmtTfoot").text(upi.toFixed(2));

						    $("#cashAmttt").text(regCash.toFixed(2));
						    $("#cardAmttt").text(regCredit.toFixed(2));
						    $("#upiAmttt").text(regUpi.toFixed(2));
						}
						$('#patientInfo').on('draw.dt', function () {
						    updateFooterTotals();
						});

						$(document).on('keyup change', '.cashAmt, .creditAmt, .upiAmt, .regOpCashAmt, .regOpCreditAmt, .regOpUpiAmt', function () {
						    updateFooterTotals();
						});
						
						$("#yesButton").click(function(){
							$("#consFee").val('0.00');
							$("#totAmt").val('0.00');
							$("#consAmount").val('0.00');
							$("#billAmt").val('0.00');
							$("#balance").val('0.00');
							$("#status").val("paid");
							 $('#alertModalValidiaty').modal('hide');
						});
						
						$("#noButton").click(function(){
							
							 $('#alertModalValidiaty').modal('hide');
						});
						$(document).on('input', '.form-control.input-sm, .regOpCashAmt', function() {
						    var d = 0;
						    
						    var a=0;
					       	$(".cashAmt").each(function(){
					       		var amt=$(this).val();
					       		a=parseFloat(a)+parseFloat(amt);
					       	});

					       	$("#cashAmountTfoot").text(a.toFixed(2));

					    	var b=0;
					       	$(".creditAmt").each(function(){
					       		var amtb=$(this).val();
					       		//alert(amtb);
					       		b=parseFloat(b)+parseFloat(amtb);
					       	});

					       	$("#creditAmountTfoot").text(b.toFixed(2));

					    	var c=0;
					       	$(".upiAmt").each(function(){
					       		var amtc=$(this).val();
					       		c=parseFloat(c)+parseFloat(amtc);
					       	});

					       	$("#upiAmtTfoot").text(c.toFixed(2));
					       	
					     	var d=0;
					       	$(".regOpCashAmt").each(function(){
					       		var amtd=$(this).val();
					       		//alert(amtd);
					       		d=parseFloat(d)+parseFloat(amtd);
					       	});

					       	$("#cashAmttt").text(d.toFixed(2));

					    	var e=0;
					       	$(".regOpCreditAmt").each(function(){
					       		var amte=$(this).val();
					       		//alert(amtb);
					       		e=parseFloat(e)+parseFloat(amte);
					       	});

					       	$("#cardAmttt").text(e.toFixed(2));

					    	var f=0;
					       	$(".regOpUpiAmt").each(function(){
					       		var amtf=$(this).val();
					       		f=parseFloat(f)+parseFloat(amtf);
					       	});

					       	$("#upiAmttt").text(f.toFixed(2));
						});

						// function to Reset all fields and open the "#apptAdd" Div.
						function resetData() {
							//alert("in resetData ");
							$("#scheduleDtText").hide();
							$("#docSlotsDiv").hide();
							$("#tokenValueText").hide();
							
							//$("#scheduleDt").val('');
							$("#tokenValue").val('');
							$("#patientId").val('0');
							$("#genderVal").val('0').trigger('chosen:updated');
							$("#addr").val('');
							$("#patientCat").val('0').trigger('chosen:updated');
							//$("#patInfoRegValidDt").text('');
							 $("#patientTitleText").hide();
							$("#patientGenderText").hide();
							$("#patientNameText").hide();
							$("#lastNameText").hide();
							$("#pntDobText").hide();
							$("#ageText").hide();
							$("#careByText").hide();
							$("#careByNameText").hide();
							$("#babyParentText").hide();
							$("#parentNameText").hide();
							$("#pntMobNumText").hide();
							$("#refTypeText").hide();
							$("#refIdText").hide();
							$("#pntMaritalStatusText").hide();
							$("#pntNationalityText").hide();
							$("#pntReligionText").hide();
							$("#pntBloodGrpText").hide();
							$("#pntOccupationText").hide();
							$("#idTypeText").hide();
							$("#idNumText").hide();
							$("#stateText").hide();
							$("#errCity").hide();
							$("#villageText").hide();
							$("#patientCatText").hide();
							$("#pblmDescText").hide();
							$("#idLocationText").hide();
							$("#idDoctorText").hide();
							$("#scheduleDtText").hide();
							$("#specNameText").hide();
							$("#empCodeText").hide();
							$("#tokenValueText").hide();
							$("#errFee").hide();
							$("#feeDiscountText").hide();
							$("#feeDiscountAmtText").hide();
							$("#errConsFee").hide();
							$("#consDiscountText").hide();
							$("#consDiscountAmtText").hide();
							$("#totAmtText").hide();
							$("#totDiscountText").hide();
							$("#totDiscountAmtText").hide();
							$("#amountReceivedText").hide();
							$("#docSlotsDiv").hide();
							$("#patientTitle").val("0");
							$("#patientName").val('');
							$("#lastName").val('');
							$("#patientGender").val("0");
							$("#pntDob").val('');
							$("#age").val('');
							$("#careBy").val("0");
							$("#careByName").val('');
							$("#babyParent").val('');
							$("#parentName").val('');
							$("#pntMobNum").val('');
							$("#refType").val("0");
							$("#refId").val('');
							$("#pntMaritalStatus").val("0");
							$("#pntNationality").val("0");
							$("#pntReligion").val("0");
							$("#pntBloodGrp").val("0");
							$("#pntOccupation").val('');
							$("#idType").val("0");
							$("#idNum").val("");
							$("#state").val("0");
							$("#city").val("0");
							$("#village").val('');
							$("#patientCat").val("0");
							$("#pblmDesc").val('');
							$("#idLocation").val("0");
							$("#idDoctor").val("0");
							$("#scheduleDt").val('');
							$("#specName").val('');
							$("#empCode").val('');
							$("#tokenValue").val('');
							$("#feeStatus").val('');
							$("#regFee").val('');
							$("#discount").val('');
							$("#discountAmount").val('');
							$("#amount").val('');
							$("#consFee").val('');
							$("#consDiscount").val('');
							$("#consDiscountAmount").val('');
							$("#consAmount").val('');
							$("#totAmt").val('');
							$("#totDiscount").val('');
							$("#totDiscountAmt").val('');
							$("#billAmt").val('');
							$("#amountReceived").val('');
							$("#chngGiven").val('');
							$("#balance").val('');
							$("#status").val(''); 
							$("#patientId").val('0');
							$("#regPatientId").val('0');
							$("#suvRegPatientId").val('0');
						}
						
						
						/* $("#patientTitle").change(function(){
							
						//alert($("#patientTitle option:selected").val());
							if( $("#patientTitle option:selected").val() == "Mr.") {
							$("#patientGender").val("Male").attr("disabled",true);
							} else if ( $("#patientTitle option:selected").val() == "Miss.") {
							$("#patientGender").val("Female").attr("disabled",true);
							} else if($("#patientTitle option:selected").val() == "Mrs.") {
								$("#patientGender").val("Female").attr("disabled",true);
							} else if($("#patientTitle option:selected").val() == "Baby") {							
							$("#patientGender").val("Female").attr("disabled",true);
							}else if($("#patientTitle option:selected").val() == "Baby Girl") {							
							$("#patientGender").val("Female").attr("disabled",true);
							}else if($("#patientTitle option:selected").val() == "Baby Boy") {							
							$("#patientGender").val("Male").attr("disabled",true);
							}else if($("#patientTitle option:selected").val() == "Master") {							
							$("#patientGender").val("Male").attr("disabled",true);
							$("#genderVal").hide();
							$("#patientGenderText").hide();
							}else if($("#patientTitle option:selected").val() == "Sister") {							
								$("#patientGender").val("Female").attr("disabled",true);
								$("#genderVal").hide();
							}else{
								($("#patientTitle option:selected").val() == "B/O");
								$("#patientGender").val("0");
								 $("#patientGender").hide();
								 $("#genderVal").show();
							}

							$("#genderVal").hide();
							$("#patientGender").show();
							$("#genderVal").val($("#patientGender").val());
					});
						
						$("#patientTitle").change(function(){
							if( $("#patientTitle option:selected").val() == "Mr.") {
							$("#pntMaritalStatus").val("0");
							$("#maritalStatusVal").show();
							$("#pntMaritalStatus").hide();
							} else if ( $("#patientTitle option:selected").val() == "Miss.") {
							$("#pntMaritalStatus").val("Single").attr("disabled",true);
							$("#maritalStatusVal").hide();
							$("#pntMaritalStatus").show();
							} else if ( $("#patientTitle option:selected").val() == "Mrs.") {
							$("#pntMaritalStatus").val("Married").attr("disabled",true);
							$("#maritalStatusVal").hide();
							$("#pntMaritalStatus").show();
							}else if ( $("#patientTitle option:selected").val() == "Master") {
								$("#pntMaritalStatus").val("0");
								$("#maritalStatusVal").show();
								$("#pntMaritalStatus").hide();
							
							}else if ( $("#patientTitle option:selected").val() == "Baby") {
								$("#pntMaritalStatus").val("0");
								$("#maritalStatusVal").show();
								$("#pntMaritalStatus").hide();
							
							}else if ( $("#patientTitle option:selected").val() == "Baby Boy") {
								$("#pntMaritalStatus").val("0");
								$("#maritalStatusVal").show();
								$("#pntMaritalStatus").hide();
							
							}else if ( $("#patientTitle option:selected").val() == "Baby Girl") {
								$("#pntMaritalStatus").val("0");
								$("#maritalStatusVal").show();
								$("#pntMaritalStatus").hide();
							
							}else { ($("#patientTitle option:selected").val() == "B/O");
							
							$("#patientGender").hide();
							$("#genderVal").show();
							$("#pntMaritalStatus").val("0");
							$("#maritalStatusVal").show();
							$("#pntMaritalStatus").hide();
							}
							$("#maritalStatusVal").val($("#pntMaritalStatus").val());
							}); */
							
							
							
							$("#patientTitle").change(function() {
							    let gender = "";
						
							    if ($("#patientTitle").val() == "Mr.") {
							        gender = "MALE";
							    } else if ($("#patientTitle").val() == "Miss." || $("#patientTitle").val() == "Mrs." || $("#patientTitle").val() == "Sister") {
							        gender = "FEMALE";
							    } else if ($("#patientTitle").val() == "Baby Girl") {
							        gender = "FEMALE";
							    } else if ($("#patientTitle").val() == "Baby Boy" || $("#patientTitle").val() == "Master") {
							        gender = "MALE";
							    }
						
							    $("#genderVal").val(gender);
							    $("#patientGender").val(gender);

							});

						
							
							 $("#genderVal").change(function(){
								 $('#genderVal').css('color','black');
								 var genderVal=$("#genderVal").val();
								 /* if(genderVal==0){
									 $("#patientGenderText").show();
									 $("#patientGenderText").html("Select Gender");
								 } */
								
							 });
							 
			
						
							
						   
						$("#patientInfo").on('click', '.reschSave', function() {	
							var trId = $(this).closest('tr').prop('id');
							
							var pntPrevUpdtStatusVal = $("#" +trId).find(".pntUpdtStatus").val();

							var schDt = $("#" +trId).find(".schDt").val();
							var currentDate = $("#currentDate").val();
							//alert((new Date(schDt) > new Date(currentDate)) + "---" + (new Date(schDt) < new Date(currentDate)));
							
							var schdleGreaterStat = (new Date(schDt) > new Date(currentDate));
							var schdleLesserStat = (new Date(schDt) < new Date(currentDate));
							//if (schdleGreaterStat == true || schdleLesserStat == true) {
							if (schdleGreaterStat == true) {
								$('#alertModal').modal('show');
								$("#alertMsg").text("Do Actions for only current date appointments");
							} else {
								if (pntPrevUpdtStatusVal == "Visited") {
									
								} else {

									var apptId = $("#" + trId).find(".apptId").val();
									var docId = $("#" + trId).find(".empId").val();
									var locId = $("#" + trId).find(".locId").val();
									var patientId = $("#" + trId).find(".patientId").val();
									var patientCategory = $("#" +trId).find(".categoryVal").val();
									var patientName = $("#" +trId).find(".patientName").val();
									var parentName = $("#" +trId).find(".parentName").val();
									var consultant = $("#" +trId).find(".consultant").val();
									var location = $("#" +trId).find(".location").val();
									
									$("#reschPatientCatId").val(patientCategory);
									$("#cancelApptId").val(apptId);
									$("#cancelEmpId").val(docId);
									$("#cancelLocId").val(locId);
									$("#reschPatientName").val(patientName);
									$("#reschParentName").val(parentName);
									$("#reschConsultant").val(consultant);
									$("#reschLocation").val(location);
									  
									$("#reschApptId").val(apptId);
									$("#reschEmpId").val(docId);
									$("#reschLocId").val(locId);
									$("#reschPatientId").val(patientId);
									$("#reschFromDt").val(schDt);
									
									/* $(".arrivalStatus ").each(function(){
										$(this).attr('disabled', false);
										btnId = $(this).prop('id');
										if (btnId == "Waiting" && pntPrevUpdtStatusVal == "Waiting") {
											$(this).attr('disabled', true);
										}
									}); */
									
									$("#pntPrevUpdtStatusVal").val(pntPrevUpdtStatusVal);
									
									$("#rescheduleAppt").modal('show');

								}
							}
															
						});
						
						function submitSelectedPatientUmr(patientId){	
						$("#patientCorpID").val(patientId);						 
						$('#corpregFormId').attr('action', "/<s:message code="projectName"></s:message>/corpReg/getCorpRegDet").submit();
						
					    $('.nav-tabs a[href="#newCorporateRegistration"]').tab('show');
	                    $('.nav-tabs a[href="#newCorpRef"]').tab('show');
						}
						
						$("#patientInfo").on('click', '.corpRegitration', function() {	
							var patientCode = $(this).closest('tr').find('.patientCode').val();
							var patientName = $(this).closest('tr').find('.patientName').val();
							var patientId = $(this).closest('tr').find('.patientId').val();						    
							
		                    submitSelectedPatientUmr(patientId);
		                    
						});
						var btnId = null;
						$(".arrivalStatus").click(function() {
							btnId = $(this).prop('id');
							//alert(btnId);
							var scheduleApptId = $("#cancelApptId").val();
							$("#scheduleApptId").val(scheduleApptId);
							$("#apptVisitSts").val(btnId);
							
							$("#updtStatusVal").val(btnId);
							
							$("#updtStatusFont").text(btnId);
							// $("#deleteConfirm").modal('show');
							// $("#rescheduleAppt").modal('hide');
							if (btnId == 'Cancelled') {
								var apptId = $("#cancelApptId").val();
								var empId = $("#cancelEmpId").val();
								var locId = $("#cancelLocId").val();
								$("#cancelVisitSts").val(btnId);
									 
		                        var url = "/<s:message code="projectName"></s:message>/patient/cancelAppointmentBills?apptId=" + apptId 
		                        		+ "&empId=" + empId + "&locId=" + locId;
		                       //alert(url);
		                        $.ajax({
		    	                	url: url,
		    	                    type: 'POST',
		    	                    success: function(response) {
		    	                       	//alert(response);
		    		                	if (response != null || response != 0) {
		    		                    	$("#refundd").val(parseFloat(response).toFixed(2));
		    		                        $("#toBeRefund").val(parseFloat(response).toFixed(2));
		    		                        $("#cancelApptDiv").closest('[hidden]').removeAttr('hidden');
		    		                        $("#cancelApptDiv").show();
		    		                        $("#reschApptDiv").hide(); 
		    		                    } else {
		    		                        $("#cancelApptDiv").hide(); 
		    		                        $("#reschApptDiv").hide(); 
		    		                    }
		    	                    }
		                        });	
		                        
		                        
		                        
                                
							} else if (btnId == 'Rescheduled') {
								var apptId = $("#cancelApptId").val();
								var empId = $("#cancelEmpId").val();
								var locId = $("#cancelLocId").val();
								$("#reschVisitSts").val(btnId);
								$("#reschApptDiv").show(); 
									 
							} else {
								$("#cancelApptDiv").hide(); 
                               	$("#reschApptDiv").hide(); 
							}

						});
						   
						/* $("#canChrgs").change(function(){
							var canCharges = $(this).val();
						    var refund = $("#refundd").val();
						    var finalAmt = parseInt(refund) - parseInt(canCharges);
						    $("#toBeRefund").val(parseFloat(finalAmt).toFixed(2));
						}); */
						$("#canChrgs").on("keyup", function () {
						    var canCharges = $(this).val() || 0;
						    var refund = $("#refundd").val() || 0;

						    var finalAmt = parseInt(refund) - parseInt(canCharges);
						    $("#toBeRefund").val(parseFloat(finalAmt).toFixed(2));
						});
						   
						$("#visitStsBtn").click(function() {
							var updtStatusVal = $("#updtStatusVal").val();
							
							var toBeRefund = $("#toBeRefund").val();
// 							alert(toBeRefund);
							if (updtStatusVal != '') {
								if (btnId == 'Rescheduled') {
									$('#reschApptForm').attr('action',
										"/<s:message code="projectName"></s:message>/patient/updateAppointmentStatus").submit();
								} else if (btnId == 'Cancelled') {
									//alert("in cancelled");
									$('#cancelApptForm').attr('action',
										"/<s:message code="projectName"></s:message>/patient/updateAppointmentStatus").submit();
									
								} else {
									$('#visitStatusForm').attr('action',
										"/<s:message code="projectName"></s:message>/patient/updateAppointmentStatus").submit();
								}
							} else {
								
							}
							
							
						});
						
						

						$("#buttonsDiv").on("click", ".searchButton",
							function(event) {

								event.preventDefault();

								$('.nav-tabs a[href="#searchTab"]').tab('show');
						});

						$("#search").click(function() {

							$('#loadarModal').modal({backdrop : 'static', keyboard : false});
							
							 var umrNumber = $("#umrNo").val();
							 var patientName = umrNumber.split('/');
							 var umrNo = patientName[0];
							// alert(pname);
							var url = "/<s:message code="projectName"></s:message>/patient/searchPatients?fromDate="
									+ $("#fromDate").val() + "&toDate=" + $("#toDate").val() + "&umrNo=" + umrNo
									+ "&pname=" + $("#pname").val() + "&mobNum=" + $("#mobNum").val() + "&dob=" + $("#dob").val()
									+ "&gender=" + $("#gender").val();
												
							$.ajax({
								url : url,
								async : false,
								success : function(patientSearchList) {
									
									$("#patientList").html(patientSearchList);
									//$("#searchDiv").hide();
									$("#resultId").show();
                           
									$('#loadarModal').modal('hide');
									

								},

							});

						});

						$("#searchFilterId").click(function() {
							$("#serDiv").show();
							$("#searchFilterId").hide();

						});
						
						$("#divHide").click(function() {
							//alert("...");
							$("#searchDiv").hide();
							$("#successDiv").hide();
							$("#errDiv").hide();
						});
						
						$("#cancel").click(function() {
							$("#fromDate").val('');
							$("#toDate").val('');
							$("#umrNo").val('');
							$("#pname").val('');
							$("#mobNum").val('');
							$("#dob").val('');
							$("#gender").val('');
							$("#serDiv").hide();
						});
						
						$("#searchAppt").click(function() {
						
							var apptFrom = $("#apptFromDate").val();
							var apptTo = $("#apptToDate").val();
												
							if (apptTo == '') {
								
								$("#emptyApptToDtErr").show();
								$("#apptFromDtErr").hide();
							} else if (apptTo != '') {
								if ($("#apptFromDate").val() == '') {
									$("#emptyApptFromDtErr").show();
								} else {
									$("#emptyApptFromDtErr").hide();
									var diff = dateDiff($('#apptFromDate').datepicker("getDate"), 
											$('#apptToDate').datepicker("getDate"));
									if (diff < 0) {
										//alert('To date should be greater than From Date');
										$("#apptToDtErr").show();
										$("#emptyApptFromDtErr").hide();
										$("#emptyApptToDtErr").hide();
										$("#apptFromDtErr").hide();
										$("#searchAppt").attr('disabled', false);
									} else {
										$("#apptToDtErr").hide();
										$("#emptyApptFromDtErr").hide();
										$("#emptyApptToDtErr").hide();
										$("#apptFromDtErr").hide();
										$("#searchAppt").attr('disabled', false);
									}
								}
							}
												
							$("#searchApptForm").attr('action','/<s:message code="projectName"></s:message>/patient/searchAppointments').submit();
												
						}); 
						
						$('#umrNo').autocomplete({
							source : UMRNum
						});
                     
						
							
						$("#reschDate").datepicker({
							format : 'dd-M-yyyy',
							startDate : '0d',
							todayHighlight : true,
							autoclose:true

						}).on('changeDate', function() {
							var docId = $("#reschEmpId").val();
							var locId = $("#reschLocId").val();
							var patientId = $("#reschPatientId").val();
							var patientCategory  = $("#reschPatientCatId").val();
										
							dateText = $("#reschDate").val();
										
							if (docId != "" && locId != "" && dateText != "") {
								var url = "/<s:message code="projectName"></s:message>/appt/getScheduleSlots?doctorId="
										+ docId + "&locId=" + locId + "&scheduleDt=" + dateText;
								$.ajax({
									url : url,
									success : function(availSlots) {
										//alert(availSlots);
										$("#reschAvailSlots").html(availSlots);
									}
								});
							} else {
								alert("Please select Doctor and location");
							}

						});
							
						
						$(document).click(function(){  
							$('msgDiv').hide(); //hide the message
						});
						
						$(document).focus(function() {
							$("#msgDiv").hide(); //hide the message
						});
							
						$("#apptToDate").change(function() {
							//	var fromDate = $("#apptFromDate").val();
							$("#ageMonths").attr('readonly',false);
							$("#ageDays").attr('readonly',false);

							$("#patientGender").hide();
							$("#pntMaritalStatus").hide();
							
							if ($("#apptFromDate").val() == '' || $("#apptToDate").val() == '') {
								$("#searchAppt").attr('disabled', true);
							} else {
								$("#searchAppt").attr('disabled', false);
							}
							/* $("#chequeChqDate").datepicker({
								format : 'yyyy-mm-dd',
								todayHighlight : true,
								endDate : '0d',
								autoclose: true
							}) */
							
						

						

							$("#pntDob").datepicker({
								format : 'yyyy-mm-dd',
								todayHighlight : true,
								endDate : '0d',
								autoclose: true
							}).on('changeDate', function() {
								var dateText = $("#pntDob").val();
									
								//$("#age").val(calculateAge(dateText));
								//alert(dateText);
							var string=getAgeIYMD(dateText);
							stringAge= string.split('-');
							if(stringAge[2] != ''){
								$("#age").val(stringAge[2]);	
							}else{ $("#age").val('0'); }
							if(stringAge[1] != ''){
								$("#ageMonths").val(stringAge[1]);	
							}else{ $("#ageMonths").val('0'); }
							if(stringAge[0] != ''){
								$("#ageDays").val(stringAge[0]);	
							}else{ $("#ageDays").val('0'); }
							
								
							});
						 function getAgeIYMD(dateText) {
							var now = new Date(); //Todays Date   
							//var birthday = Xrm.Page.getAttribute("birthdate").getValue();
							var birthday= dateText;
							alert(birthday);
							birthday=birthday.split("-");
							
							
							var dobDay= birthday[2];
							var dobMonth= birthday[1]; 
							var dobYear= birthday[0];

							var nowDay= now.getDate();
							var nowMonth = now.getMonth() + 1;  //jan=0 so month+1
							var nowYear= now.getFullYear();

							var ageyear = nowYear- dobYear;
							var agemonth = nowMonth - dobMonth;
							var ageday = nowDay- dobDay;
							if (agemonth < 0) {
							       ageyear--;
							       agemonth = (12 + agemonth);
							        }
							if (nowDay< dobDay) {
							      agemonth--;
							      ageday = 30 + ageday;
							      }
							var val = ageyear + "-" + agemonth + "-" + ageday;
							//alert(val);
							return val;
						}

						 /* Calculating age */
							var calculateAge = function(birthday) {
								var now = new Date();
								var past = new Date(convertDate(birthday));
								var nowYear = now.getFullYear();
								var pastYear = past.getFullYear();
								var age = nowYear - pastYear;
								return age;
							};
									
							function convertDate(date){
							   var months = {'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'};
							   var splitArr = date.split('-'); // split based on '-'
							   var yyyy = splitArr[0] ; // add '20' before year
							   var mm = months[splitArr[1].toLowerCase()] ; // convert month into lower
							   var dd = splitArr[2] ;
							   if (dd < 10) dd = dd;  // add '0' if date is less than 10.
								   return [yyyy,mm,dd].join('-'); // join value according to format.
							}			//	var toDate = $(this).val();
							if ($(this).val() != '') {
								if ($("#apptFromDate").val() == '') {
									$("#emptyApptFromDtErr").show();
									return false;
								} else {
									$("#emptyApptFromDtErr").hide();
									var diff = dateDiff($('#apptFromDate').datepicker("getDate"), 
											$('#apptToDate').datepicker("getDate"));
												
									if (diff < 0) {
										//alert('To date should be greater than From Date');
										$("#apptToDtErr").show();
										$("#emptyApptFromDtErr").hide();
										$("#emptyApptToDtErr").hide();
										$("#apptFromDtErr").hide();
										$("#searchAppt").attr('disabled', false);
										return false;
									} else {
										$("#apptToDtErr").hide();
										$("#emptyApptFromDtErr").hide();
										$("#emptyApptToDtErr").hide();
										$("#apptFromDtErr").hide();
										$("#searchAppt").attr('disabled', false);
										return true;
									}
								}
							}

						});
						
						$("#apptFromDate").change(function() {
							
							$("#emptyApptFromDtErr").hide();
							var diff = dateDiff($('#apptFromDate').datepicker("getDate"), 
									$('#apptToDate').datepicker("getDate"));
										
							if (diff < 0) {
								//alert('To date should be greater than From Date');
							    $("#apptToDtErr").show();
								$("#emptyApptFromDtErr").hide();
								$("#emptyApptToDtErr").hide();
								$("#apptFromDtErr").hide();
								$("#searchAppt").attr('disabled', false);
								return false;
							} else {
								$("#apptToDtErr").hide();
								$("#emptyApptFromDtErr").hide();
								$("#emptyApptToDtErr").hide();
								$("#apptFromDtErr").hide();
								$("#searchAppt").attr('disabled', false);
								return true;
							}
						});
						
						function dateDiff(startDate, endDate) {
							if (endDate && startDate)
								return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
								return "Please enter From and To dates!";
						};
							
						$("#toDate").change(function() {
							var fromDate = $("#fromDate").val();
							var toDate = $("#toDate").val();
							if ($("#toDate").val() != '') {
								if ($("#fromDate").val() == '') {
									$("#errorFrom").show();
								} else {
									$("#errorFrom").hide();
									var diff = dateDiff($('#fromDate').datepicker("getDate"), 
											$('#toDate').datepicker("getDate"));
									if (diff < 0) {
										//alert('To date should be greater than From Date');
										$("#errorMsgTo").show();
										$("#errorMsg").hide();
										$("#search").attr('disabled', false);
									} else {
										$("#errorMsgTo").hide();
										$("#errorMsg").hide();
										$("#search").attr('disabled', false);
									}
								}
							}
						});

						$("#fromDate").change(function() {
							$("#errorFrom").hide();
							var diff = dateDiff($('#fromDate').datepicker("getDate"), 
									$('#toDate').datepicker("getDate"));
							if (diff < 0) {
								//alert('To date should be greater than From Date');
								$("#errorMsg").show();
								$("#errorMsgTo").hide();
								$("#search").attr('disabled', false);
							} else {
								$("#errorMsg").hide();
								$("#errorMsgTo").hide();
								$("#search").attr('disabled', false);
							}
						});
		
						$("#addOtherHosp").click(function() {
							$("#otherHospModal").modal('show');
						});

						$("#otherHospSubmit").on("click", function() {

							var otherHospNameModal = $("#otherHospNameModal").val();
							var otherHospCodeModal = $("#otherHospCodeModal").val();

							$("#otherHospNameModalText").hide();
							$("#otherHospCodeModalText").hide();
							
							if (otherHospNameModal == '') {
								$("#otherHospNameModalText").show();
								$("#otherHospNameModalText").text("Enter Other Hospital Name");
							} else if (!(charRegex.test(otherHospNameModal))) {
								$("#otherHospNameModalText").html("Enter valid Other Hospital Name");
								$("#otherHospNameModalText").show();
							} else if (otherHospCodeModal == '') {
								$("#otherHospCodeModalText").show();
								$("#otherHospCodeModalText").text("Enter Other Hospital Code");
							} else if (!(varcharRegex.test(otherHospCodeModal))) {
								$("#otherHospCodeModalText").html("Enter valid Other Hospital Code");
								$("#otherHospCodeModalText").show();
							} else {
								var url = "/<s:message code="projectName"></s:message>/patient/setOtherHospDet?otherHospName="
										+ otherHospNameModal + "&otherHospCode=" + otherHospCodeModal;
								//alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										var data = response.split("^");

										var newOption = $('<option value='+ data[0] +'>' + data[1] + '</option>');
									
										$('#otherHospId').append(newOption);
										$('#otherHospId').trigger("chosen:updated");
										$('#otherHospId').val(data[0]).trigger("chosen:updated");
									
										$("#otherHospModal").modal('hide');
									}
								});
							}
						});
						
						$("#addExtraTokens").click(function() {
							//alert(32);
						    var extraDoc = $("#idDoctor").val();
							//alert(extraDoc);
							$("#idDoctorExtraTokens").val(extraDoc).trigger("chosen:updated");
							$("#extraTokensModal").modal('show');
							var scheduleDt = $("#scheduleDt").val();
							$("#extraTokensDt").val(scheduleDt);
							
							
						});
						$("#extraTokensDt").datepicker({
							format : 'dd-M-yyyy',
							startDate : '0d',
							//endDate : '+1d',
							dateLimit: { days: 10000 },
							autoclose: true,
							todayHighlight : true
						})
					    //Timepicker
					     $('.timepicker').timepicker({
					    	 
					     });
						$("#extraStartTime").change(function(){
						        var time1 = $('#extraStartTime').val();
						        var time2 = $('#extraEndTime').val();
						        
						        
						        var sTime = moment(time1, 'hh:mm:ss a');
						        var eTime = moment(time2, 'hh:mm:ss a');
						        
						        if(eTime < sTime){
							         //alert(1);
							        //$('#startTime').css("border-color", "#A94442");
							        $('#extraStartTimeText').show();
							        $('#extraEndTimeText').hide();
							    }else{
							         
								        $('#extraStartTimeText').hide();
								        $('#extraEndTimeText').hide();
								    }
						       });
						
						
						$("#extraEndTime").change(function(){
					        var time1 = $('#extraStartTime').val();
					        var time2 = $('#extraEndTime').val();
					        
					        
					        var sTime = moment(time1, 'hh:mm:ss a');
					        var eTime = moment(time2, 'hh:mm:ss a');
					        
					        if(eTime < sTime){
						         //alert(1);
						        $('#extraStartTime').css("border-color", "#A94442");
						        $('#extraStartTimeText').show();
						        $('#extraEndTimeText').hide();
						    }else{
						         
							        $('#extraStartTimeText').hide();
							        $('#extraEndTimeText').hide();
							    }
					       });
						
						$("#extraTokensSubmit").on("click", function() {
							$('#loadarModal').modal({backdrop: 'static', keyboard: false}); 
							var docDetails = $("#idDoctorExtraTokens option:selected").val().split(":");
						  
							var idDoctorExtraTokens = docDetails[0];
							var extraTokensDt = $("#extraTokensDt").val();
							var numOfExTokens = $("#numOfExTokens").val();
							var extraStartTime = $("#extraStartTime").val();
							var extraEndTime = $("#extraEndTime").val();
						
							
							$("#doctorNameExTnModalText").hide();
							$("#ExtraTokensDtText").hide();
							$("#numOfExTokensModalText").hide();
							$("#extraStartTimeText").hide();
							$("#extraEndTimeText").hide();
							
							if (idDoctorExtraTokens == '') {
								$("#doctorNameExTnModalText").show();
								$("#doctorNameExTnModalText").text("Select Consultant");
							}  else if (extraTokensDt == '') {
								$("#ExtraTokensDtText").show();
								$("#ExtraTokensDtText").text("Select Date");
							} else if (numOfExTokens == '') {
								$("#numOfExTokensModalText").show();
								$("#numOfExTokensModalText").text("Enter no.of extra tokens required");
							}else if (extraStartTime == '') {
								$("#extraStartTimeText").show();
								$("#extraStartTimeText").text("Select start time");
							}else if (extraEndTime == '') {
								$("#extraEndTimeText").show();
								$("#extraEndTimeText").text("Select end time");
							}  else {
								var url = "/<s:message code="projectName"></s:message>/patient/setExtraTokens?idDoctorExtraTokens="
										+ idDoctorExtraTokens + "&extraTokensDt=" + extraTokensDt + "&numOfExTokens=" + numOfExTokens
										 + "&extraStartTime=" + extraStartTime + "&extraEndTime=" + extraEndTime;
								//alert(url);
								$.ajax({
									type : "POST",
									url : url,
									success : function(response) {
										//alert(response);
										var data = response.split("^");
										var scheduleDt = $("#scheduleDt").val();
										//alert(scheduleDt+"scheduleDt");
										 getDoctorExtraTokens(data[1],scheduleDt);
										 $("#extraTokensModal").modal('hide');
										// $('#loadarModal').modal('hide');
										/* $("#extraDocSlots").html(response);
										$("#extraDocSlotsDiv").show();
										$("#extraDocSlotsMainDiv").show();
										 */
										
										
									}
								});
							}
						});
						
						
						$("#addOtherStaff").click(function() {
							$("#otherStaffModal").modal('show');
						});

						$("#otherStaffSubmit").on("click", function() {

							var otherStaffNameModal = $("#otherStaffNameModal").val();
							var otherStaffCodeModal = $("#otherStaffCodeModal").val();
							var otherStaffMobModal = $("#otherStaffMobModal").val();
							var otherStaffAddrModal = $("#otherStaffAddrModal").val();
							
							$("#otherStaffNameModalText").hide();
							$("#otherStaffCodeModalText").hide();
							$("#otherStaffMobModalText").hide();
							$("#otherStaffAddrModalText").hide();
							
							if (otherStaffNameModal == '') {
								$("#otherStaffNameModalText").show();
								$("#otherStaffNameModalText").text("Enter Other Staff Name");
							} else if (!(charRegex.test(otherStaffNameModal))) {
								$("#otherStaffNameModalText").html("Enter valid Other Staff Name");
								$("#otherStaffNameModalText").show();
							} else if (otherStaffCodeModal == '') {
								$("#otherStaffCodeModalText").show();
								$("#otherStaffCodeModalText").text("Enter Other Staff Code");
							} else if (!(varcharRegex.test(otherStaffCodeModal))) {
								$("#otherStaffCodeModalText").html("Enter valid Other Staff Code");
								$("#otherStaffCodeModalText").show();
							} else {
								var url = "/<s:message code="projectName"></s:message>/patient/setOtherStaffDet?otherStaffName="
										+ otherStaffNameModal + "&otherStaffCode=" + otherStaffCodeModal + "&otherStaffMob=" + otherStaffMobModal
										 + "&otherStaffAddr=" + otherStaffAddrModal;
								//alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										var data = response.split("^");

										var newOption = $('<option value='+ data[0] +'>' + data[1] + '</option>');
									
										$('#otherStaffId').append(newOption);
										$('#otherStaffId').trigger("chosen:updated");
										$('#otherStaffId').val(data[0]).trigger("chosen:updated");
									
										$("#otherStaffModal").modal('hide');
									}
								});
							}
						});
						
						$("#addOtherDoctor").click(function() {
							//alert(32);
						
							$("#otherDoctorModal").modal('show');
						});
						
						

						$("#otherDoctorSubmit").on("click", function() {
                                   
							var otherDoctorNameModal = $("#otherDoctorNameModal").val();
							var otherDoctorCodeModal = $("#otherDoctorCodeModal").val();
							var otherDoctorMobModal = $("#otherDoctorMobModal").val();
							var otherDoctorAddrModal = $("#otherDoctorAddrModal").val();
							
							$("#otherDoctorNameModalText").hide();
							$("#otherDoctorCodeModalText").hide();
							$("#otherDoctorMobModalText").hide();
							$("#otherDoctorAddrModalText").hide();
							
							if (otherDoctorNameModal == '') {
								$("#otherDoctorNameModalText").show();
								$("#otherDoctorNameModalText").text("Enter Other Doctor Name");
							} else if (!(charRegex.test(otherDoctorNameModal))) {
								$("#otherDoctorNameModalText").html("Enter valid Other Doctor Name");
								$("#otherDoctorNameModalText").show();
							} else if (otherDoctorCodeModal == '') {
								$("#otherDoctorCodeModalText").show();
								$("#otherDoctorCodeModalText").text("Enter Other Doctor Code");
							} else {
								var url = "/<s:message code="projectName"></s:message>/patient/setOtherDoctorDet?otherDoctorName="
										+ otherDoctorNameModal + "&otherDoctorCode=" + otherDoctorCodeModal + "&otherDoctorMob=" + otherDoctorMobModal
										 + "&otherDoctorAddr=" + otherDoctorAddrModal;
								//alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										var data = response.split("^");

										var newOption = $('<option value='+ data[0] +'>' + data[1] + '</option>');
									
										$('#otherDoctorId').append(newOption);
										$('#otherDoctorId').trigger("chosen:updated");
										$('#otherDoctorId').val(data[0]).trigger("chosen:updated");
									
										$("#otherDoctorModal").modal('hide');
									}
								});
							}
						});
						
						$("#passportIssuedDt").datepicker({
							format : 'dd-M-yyyy',
							//startDate : '0d',
							//endDate : '+1d',
							//dateLimit: { days: 10000 },
				
							todayHighlight : true,
							autoclose: true
						})
						
						$("#passportExpiryDt").datepicker({
							format : 'dd-M-yyyy',
							//startDate : '0d',
							//endDate : '+1d',
							//dateLimit: { days: 10000 },
				
							todayHighlight : true,
							autoclose: true
						})
						
						/* $("#passportModal").on('click','#passportClose',function(){ 
							
							$('#passportModal').modal('hide');
						
						}); */
						
						$("#passportModal").on('click','#passportSave',function(){
							
						    var passNum = $("#passportNum").val();
						    var passIssDt = $("#passportIssuedDt").val();
						    var passExpDt = $("#passportExpiryDt").val();
						    var ticketFileNames = $("#ticketFileNames").val();
						    var descriptions = $("#descriptions").val();
						    var patientType = $("#patientType").val();
						    //alert(patientType);
						    //var fileStatus =$("#fileStatus").val();
						   // alert(ticketFileNames+"ticketFileNames.."+descriptions+"...descriptions");
						    /* $("#passportNum").val(passNum);
						    $("#passportIssuedDt").val(passIssDt);
						    $("#passportExpiryDt").val(passExpDt); */
						    $("#state").val('1').trigger('chosen:updated');
						    $("#city").val('1').trigger('chosen:updated');
						    
						    $("#fileUploadForm").ajaxForm(fileInsertFormAjax);
							$('#fileUploadForm').attr('action', "/<s:message code="projectName"></s:message>/patient/setNriFiles").submit();
						   
							
						    
						    
						    
						  });
						  
						var fileInsertFormAjax = {
								beforeSubmit : function(formData, formObj,
										options) {
									//alert(formData + "...." + formObj + "....." + options);
								},success : function(response) {
									 $('#passportModal').modal('show');
							        var data = response.split("^");
							        $("#setFilsiz").val(data[3]);
							       // alert("data[3]..."+data[3]);
							        if(data[3]=="1"){
							        	/* $("#empFileDescText").show();
							        	$("#empFileDescText").html("please enter descrip"); */
							        	$(".fileNameText").show();
							        	$(".fileNameText").html("please select file");
							        	
							        	/* $("#ageText").show();
				        	      		$("#ageText").html("Enter Patient Age"); */
							        	
							        } else if(data[2]=="1"){
							        	$("#message").html(data[1]);
							        	//alert(data[2]);
							        	//alert(data[0]);
							        	/* $("#successDiv").show();
														$("#errorDiv").hide();
														$("#successMessage").html("Resource Successfully Added."  );
														$('#loadarModal').modal('hide'); */
														var delay = 500; //Your delay in milliseconds
				                                        setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);
							        }else{
							        	//alert("in else");
							        	$("#message").html(data[1]);
							        	/* $("#errorDiv").show();
										$("#successDiv").hide();
										$("#errorMessage").html("Resource Not Added." );
										$('#loadarModal').modal('hide'); */
							        }

									
								//resetData();
								//$('#loadarModal').modal('hide');

							},
							error : function(jqXHR, textStatus, errorThrown) {
								 alert("error"); 
							}

						};
						
						
						
						
                        $("#passportModal").on('click','#passportCancel',function(){
							
                        	 $("#passportNum").val('');
 						     $("#passportIssuedDt").val('');
 						     $("#passportExpiryDt").val('');
						});
                        
                        $("#passportNum").on("keyup",function() {
							var passportNum = $("#passportNum").val();
							//alert(idNum);
			     	    	$("#passportNumberText").hide();
							if (passportNum == '') {
			     	    		$("#passportNumberText").show();
			        	      	$("#passportNumberText").html("Enter ID number");
							}else{
								$("#passportNumberText").hide();
							}
						});
                       
                        $("#passportIssuedDt").on("change",function() {
							var passportIssuedDt = $("#passportIssuedDt").val();
							//alert(idNum);
			     	    	$("#passportIssuedDateText").hide();
							if (passportIssuedDt == '') {
			     	    		$("#passportIssuedDateText").show();
			        	      	$("#passportIssuedDateText").html("Select Issue Date");
							}else{
								$("#passportIssuedDateText").hide();
							}
						});
                        
                        $("#passportExpiryDt").on("change",function() {
							var passportExpiryDt = $("#passportExpiryDt").val();
							//alert(idNum);
			     	    	$("#passportExpiryDateText").hide();
							if (passportExpiryDt == '') {
			     	    		$("#passportExpiryDateText").show();
			        	      	$("#passportExpiryDateText").html("Select Expiry Date");
							}else{
								$("#passportExpiryDateText").hide();
							}
						});
						
						
						});
							
					
	</script>

	<script>
		// Put event listeners into place
		window.addEventListener("DOMContentLoaded",
			function() {

			// Grab elements, create settings, etc.
			var canvas = document.getElementById("canvas"), context = canvas
						.getContext("2d"), video = document
						.getElementById("video"), videoObj = {
						"video" : true
			}, errBack = function(error) {
				console.log("Video capture error: ", error.code);
			};
						
			// Put video listeners into place
			if (navigator.getUserMedia) { // Standard
				//alert(navigator.getUserMedia);
				//alert(1);
				navigator.getUserMedia(videoObj, function(stream) {
					//alert(stream);
					video.srcObject = stream;
					$("#video").show();
		        	$("#canvas").hide();
					video.src = stream;
					video.play();
				}, errBack);
						
			} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
				navigator.webkitGetUserMedia(videoObj, function(stream) {
					//alert(stream);
					//alert(2);
					//video.src = window.webkitURL.createObjectURL(stream);
					video.srcObject = stream;
					$("#video").show();
			    	$("#canvas").hide();
					video.play();
				}, errBack);
						
			} else if (navigator.mozGetUserMedia) { // WebKit-prefixed
				navigator.mozGetUserMedia(videoObj, function(stream) {
					//alert(stream);
					//alert(3);
					//video.src = window.URL.createObjectURL(stream);
					video.srcObject = stream;
					$("#video").show();
			    	$("#canvas").hide();
					video.play();
				}, errBack);
			}
                          
			// Trigger photo take
			document.getElementById("snap").addEventListener("click",
				function() {
					context.drawImage(video, 0, 0, 320, 160);
					$('#canvas').fadeIn('slow');
					$('#video').fadeOut('fast');
					$('#idRetake').show();
					$('#imgDiv').hide();
					$('#img').hide();
				});


			document.getElementById("snap").addEventListener("click",
				function() {
					var dataUrl = canvas.toDataURL("image/png");
					//window.open(dataUrl);
					var url = "/<s:message code="projectName"></s:message>/patient/getPhotoDetails?";
					$.ajax({
						type : "POST",
						url : url,
						data : {
							imgBase64 : dataUrl
						},
						success : function(response) {
							
							$("#pic").val(response);
							$("#video").hide();
							$("#canvas").show();
							$("#errMsg").hide();
						}
					});
				});
		}, false);
		
		
		// Put event listeners into place
		window.addEventListener("DOMContentLoaded",
			function() {

			// Grab elements, create settings, etc.
			var canvas = document.getElementById("canvass"), context = canvas
						.getContext("2d"), video = document
						.getElementById("videoo"), videoObj = {
						"video" : true
			}, errBack = function(error) {
				console.log("Video capture error: ", error.code);
			};
						
			// Put video listeners into place
			if (navigator.getUserMedia) { // Standard
				//alert(navigator.getUserMedia);
				//alert(1);
				navigator.getUserMedia(videoObj, function(stream) {
					//alert(stream);
					video.srcObject = stream;
					$("#videoo").show();
		        	$("#canvass").hide();
					video.src = stream;
					video.play();
				}, errBack);
						
			} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
				navigator.webkitGetUserMedia(videoObj, function(stream) {
					//alert(stream);
					//alert(2);
					//video.src = window.webkitURL.createObjectURL(stream);
					video.srcObject = stream;
					$("#videoo").show();
			    	$("#canvass").hide();
					video.play();
				}, errBack);
						
			} else if (navigator.mozGetUserMedia) { // WebKit-prefixed
				navigator.mozGetUserMedia(videoObj, function(stream) {
					//alert(stream);
					//alert(3);
					//video.src = window.URL.createObjectURL(stream);
					video.srcObject = stream;
					$("#videoo").show();
			    	$("#canvass").hide();
					video.play();
				}, errBack);
			}
                          
			// Trigger photo take
			document.getElementById("snapp").addEventListener("click",
				function() {
					context.drawImage(video, 0, 0, 320, 160);
					$('#canvass').fadeIn('slow');
					$('#videoo').fadeOut('fast');
					$('#idRetakee').show();
					$('#imgDivv').hide();
					$('#img').hide();
				});


			document.getElementById("snapp").addEventListener("click",
				function() {
					var dataUrl = canvas.toDataURL("image/png");
					//window.open(dataUrl);
					var url = "/<s:message code="projectName"></s:message>/patient/getAttendeePhotoDetails?";
					$.ajax({
						type : "POST",
						url : url,
						data : {
							imgBase64 : dataUrl
						},
						success : function(response) {
							
							$("#picc").val(response);
							$("#videoo").hide();
							$("#canvass").show();
							$("#errMsg").hide();
						}
					});
				});
		}, false);
				
	</script>

	<script type="text/javascript">
/* kept by habib to hide save buttons to specific roles */
	$(document).ready(function() {
		
		var userRole = $("#userRole").val();
		//alert(userRole);
	  if(userRole == 'EDP'){
		/* alert(buttonsDiv);   */
	  
		  $("#buttonsDiv").hide();
		
		
	}
             
			//var pageUrl = window.location.pathname; // Returns path only
			var pageUrl = "/<s:message code="projectName"></s:message>/patient/patientQueue";
			
			function getUserLocDeptsFunction(locId) {
				var userDeptStatus = $("#userDeptStatus").val();
				
				var url = "/<s:message code="projectName"></s:message>/multiLoc/getUserLocDepts?locId=" + locId + "&pgUrl=" + pageUrl;
				//alert(url);
				$.ajax({ //Ajax call to display the stockist invoice details.
					url : url,
					success : function(response) {
						//alert(response);
						$("#userLocIdText").hide();
				
						$("#userDeptIdDiv").html($("#loadarDiv").html());
						$("#userDeptIdDiv").html(response);

						$("#deptCode").val("DEPT CODE");
						$("#deptMobNo").val("DEPT CONTACT NO");
						
						var deptCount = 0;
						$(".userDeptId option").each(function() {
							//alert($(this).val());
							if ($(this).val() != 0) {
								deptCount = deptCount + 1;
							} 
						});
						//alert(deptCount);
						if (deptCount == 1) {
							//alert($("#userDeptId option:eq(1)").val() + ".." + $("#userDeptId option:eq(2)").val());
							$('#userDeptId').val($("#userDeptId option:eq(1)").val()).trigger('chosen:updated');
							getUserDeptDetails($("#userDeptId option:eq(1)").val());
						} else {
							$("#userDeptIdText").html('Select Department');
							$("#userDeptIdText").show();
							$("#deptId").val("0");
			
							getUserDeptDetails(0);
						}
					}							
				});
			}
			
			var locId = $("#userLocId").val();
			//alert(locId);
			if (locId != 0) {
				getUserLocDeptsFunction(locId);
			} else {
				$("#userLocIdText").html('Select Location');
				$("#userLocIdText").show();
				$("#userDeptIdText").hide();
			}

			function getUserDeptDetails(userDeptDetails) {
				var locId = $("#locId").val();
				//alert(locId);
				//resetData();

				

				$("#userDeptIdText").hide();
				
				//alert(userDeptDetails);
				if (userDeptDetails != 0) {
					var responseOutput = userDeptDetails.split(":");
					//alert(responseOutput[0] + ":" + responseOutput[1] + ":" + responseOutput[2]);
					$("#userDeptIdDiv #deptId").val(responseOutput[0]);
					$("#deptCode").val(responseOutput[1]);
					$("#deptMobNo").val(responseOutput[2]);
				} else {
					$("#userDeptIdText").html('Select Department');
					$("#userDeptIdText").show();
					$("#deptId").val("0");
					$("#deptCode").val("DEPT CODE");
					$("#deptMobNo").val("DEPT CONTACT NO");
				}
				
				$("#apptDeptId").val($("#deptId").val());
				$("#apptDeptDet").val(userDeptDetails);
				
				var reportFromDt = $("#reportFromDt").val();
				var reportToDt = $("#reportToDt").val();
				
				var locId = $("#locId").val();
				var deptId = $("#deptId").val();
				
				getPatientReportCustom(reportFromDt, reportToDt, locId, deptId);
			}
			
			$("#userLocId").change(function() {
				var multiLocId = $(this).val();
				//alert(multiLocId + "....multiLocId");
				//resetData();
				$('#patientInfo tbody').empty();
				$("#reportRangeErr").show();
				$("#reportRangeErr").text("select date");
				//$('#alertModal').modal('show');
				$("#alertMsg").text("Please Select Date");

				/* $('#userLocId').val(multiLocId).trigger('chosen:updated'); */
				$("#locId").val(multiLocId);
				$("#apptLocId").val(multiLocId);
				
				getUserLocDeptsFunction(multiLocId);
				
				
			});
			
			//$(".userDeptId").change(function(){
			$("#userDeptIdDiv").on("change", "#userDeptId", function() {
				var userDeptDetails = $(this).val();
				//alert(userDeptDetails + ".....userDeptDetails");
				getUserDeptDetails(userDeptDetails);
			});

			var searchStatus = 0;
			
			
			/* var customerCodes = new Array();
     	  	var customerIds = {};
          	var customerNames = {};
           	var mobileNumbers = {};
          	var doctorNames = {};
           	var custAges = {};
          	var custGenders = {};
          	var custEmails = {};
          	var doctorName={};
        	var doctorNameIds={};
        	var refDoctorName={};
        	var refDoctorNameIds={};
        	var ageDays={};
        	var ageMonths={};
        	var patientTitle={};
        	var orgId={};
        	var tariffId={};
        	
           	$.getJSON("/<s:message code="projectName"></s:message>/labBilling/getCustomerDetailsList", function(jsonData){

            	$.each(jsonData.customers, function (index, customer)
                    { 
    	        		//alert(customer.customerCode);
    	        		customerCodes.push(customer.customerCode);
    	        		customerIds[customer.customerCode] = customer.customerId;        	                              
    	                customerNames[customer.customerCode] = customer.customerName;
	                    mobileNumbers[customer.customerCode] = customer.mobNum;	                              
	                    doctorNames[customer.customerCode] = customer.doctorName;
	                    custAges[customer.customerCode] = customer.customerAge;	                              
	                    custGenders[customer.customerCode] = customer.customerGender;
	                    custEmails[customer.customerCode] = customer.customerEmail;
	                    doctorName[customer.customerCode] = customer.doctorName;
	                    doctorNameIds[customer.customerCode] = customer.doctorNameId;
	                    refDoctorName[customer.customerCode] = customer.refDoctorName;
	                    refDoctorNameIds[customer.customerCode] = customer.refDoctorNameId;
	                    ageMonths[customer.customerCode] = customer.ageMonths;
	                    ageDays[customer.customerCode] = customer.ageDays;
	                    patientTitle[customer.customerCode] = customer.patientTitle;
	                    orgId[customer.customerCode] = customer.orgId;

	                    tariffId[customer.customerCode] = customer.tariffId;
	                    
	                     //alert(product.code+' '+product.type);
	                              
	        	} );

			});

            $('#customerCode').typeahead( { source:customerCodes, items:10 , showHintOnFocus:true} );
            
            $("#customerCode").change(function(){
    	    	 
     	    	$(".saveButton").hide();
     	    	
     	    	var custCode = $("#customerCode").val();
     	    	//alert(custCode);
     	    	if(custCode == ''){
     	    		 
     	    		$("#errCustomerId").html("Enter customer Id");
     	    		$("#errCustomerId").show();
     	    		$("#customerId").val('0');
	        	    $("#customerName").val('');
	        	    $("#customerMobNumOld").val('');
	        	    $("#doctorName").val('');
	        	    $("#patAgeOld").val('');
	        	    $("#patGenderOld").val('');
	        	    $("#customerEmailOld").val('');
	        	    $("#doctorName").val('');
	        	    $("#doctorRefName").val('');
	        	    $("#doctorNameId").val('');
	        	    $("#doctorRefNameId").val('');
     	    		
     	    	 }  else {
     	    		//alert(custCode);
     	    		//alert(customerCodes);
     	    	 	if(jQuery.inArray( custCode, customerCodes ) == -1){
     	    			$("#errCustomerId").show();
        	      		$("#errCustomerId").html("customer Id is invalid");
     	    			$("#customerId").val('0');
        	       		$("#customerName").val('');
        	       		$("#customerMobNumOld").val('');
    	        	    $("#doctorName").val('');
    	        	    $("#patAgeOld").val('');
    	        	    $("#patGenderOld").val('');
    	        	    $("#customerEmailOld").val('');
    	        	    $("#doctorName").val('');
    	        	    $("#doctorRefName").val('');
    	        	    $("#doctorNameId").val('');
    	        	    $("#doctorRefNameId").val('');
    	        	    $("#ipId").val("0");
    	        	   
     	    	 	}else{
     	    	 		//alert(1);
        	   	   		$("#customerId").val(customerIds[custCode]);
        	       		$("#customerName").val(customerNames[custCode]);
        	       		//alert(tariffId[custCode]);
        	       	//	alert(customerNames[custCode]);
        	       		$("#customerMobNumOld").val(mobileNumbers[custCode]);
        	       	 $("#doctorName").val(doctorNames[custCode]);
    	        	    $("#empNameVal").val(doctorNames[custCode]);
        	       		$("#patAgeOld").val(custAges[custCode]);
    	        	    $("#patGenderOld").val(custGenders[custCode]);
    	        	    $("#customerEmailOld").val(custEmails[custCode]);
    	        	    $("#doctorId").val(doctorNameIds[custCode]);
     	        	   // $("#doctorIdB").val(doctorNameIds[custCode]);
     	        	    //$("#refDoctorId").val(refDoctorNameIds[custCode]);
     	        	   $("#doctorId").val(doctorNameIds[custCode]).trigger('chosen:updated');
    	        	  // $("#refDoctorId").val(refDoctorNameIds[custCode]).trigger('chosen:updated');
    	        	   $("#patAgeMonth").val(ageMonths[custCode]);
    	        	   $("#patAgeDay").val(ageDays[custCode]);
    	        	   $("#patientTitle").val(patientTitle[custCode]);
    	        	   $("#patOrgId").val(orgId[custCode]);
       	       		   //alert(orgId[custCode]);

    	        	   $("#ipId").val("0");
    	        	   $("#tariffId").val(tariffId[custCode]);
        	      		$("#errCustomerId").html("customer Id is invalid");
        	      		$("#errCustomerId").hide();
        	      		if(doctorNames[custCode]=='SELF'){
        	      			$("#docPercent").attr('readonly', true);
        	      		}else{
        	      			
        	      			$("#docPercent").attr('readonly', false);
        	      		}
        	      		

     	    	 	}  
     	    	 
     	    	 }  
     	 	}); */
	  		
			
    function getInvsList(deptInvFromDt,deptInvToDt,labDepts){
	     	    
	     	    $('#loadarModal').modal({backdrop : 'static', keyboard : false});
     	    	var urlCharge =  '/<s:message code="projectName"></s:message>/patient/getInvsLists?fromDt='+deptInvFromDt+"&toDt="+deptInvToDt
     	    			+"&deptName="+labDepts;
					 //alert(urlCharge);
						$.ajax({
							url : urlCharge,
			        		success : function(res) {
						     	//alert(res);
						    	$("#deptInvListInter").html(res);
								$('#loadarModal').modal('hide');
								
							}
						}); 
	     	    }
	     	    
	     	   var deptInvFromDt = $("#deptInvFromDt").val();
				var deptInvToDt = $("#deptInvToDt").val();
				var labDepts = $("#labDepts option:selected").text();
				getInvsList(deptInvFromDt,deptInvToDt,labDepts);
				
				 $("#labDepts").on('change',function(){
					 	
					    var deptInvFromDt = $("#deptInvFromDt").val();
						var deptInvToDt = $("#deptInvToDt").val();
						var labDepts = $("#labDepts option:selected").text();
					//alert(labDepts);
						
						if (labDepts == 'RADIOLOGY') {
				            $("#RadiologyDiv").show();
				        } else {
				            $("#RadiologyDiv").hide();
				        }
						
						getInvsList(deptInvFromDt,deptInvToDt,labDepts);
				 });
				
            
	  		$('.deptInvRange span').html(moment().format('D MMMM, YYYY') + ' - ' + moment().format('D MMMM, YYYY'));
			$('#deptInvRangeDiv').daterangepicker({
				format: 'DD/MM/YYYY',
				startDate: moment(),
				endDate: moment(),
				minDate: '10/09/2021',
				maxDate: '31/12/2200',
				dateLimit: { days: 10000 },
				showDropdowns: true,
				showWeekNumbers: true,
				timePicker: false,
				timePickerIncrement: 1,
				timePicker12Hour: true,
				ranges: {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'month').endOf('month')]
				},
				opens: 'left',
				drops: 'down',
				buttonClasses: ['btn', 'btn-sm'],
				applyClass: 'btn-primary',
				cancelClass: 'btn-default',
				separator: ' to ',
				locale: {
					applyLabel: 'Submit',
					cancelLabel: 'Cancel',
					fromLabel: 'From',
					toLabel: 'To',
					customRangeLabel: 'Select Date Range',
					daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
					monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					firstDay: 1
				}
			},
			
			function(start, end, label) {
				console.log(start.toISOString(), end.toISOString(), label);
				searchStatus = 1;
				$('#deptInvRangeDiv span').html(start.format('D MMMM, YYYY') + ' - ' + end.format('D MMMM, YYYY'));
				$('#deptInvFromDt').val(start.format('DD-MMM-YYYY'));
				$('#deptInvToDt').val(end.format('DD-MMM-YYYY'));
				//alert($("#pntPortalRangeDiv li.active").val());
				var deptInvFromDt = $("#deptInvFromDt").val();
				var deptInvToDt = $("#deptInvToDt").val();
				var labDepts=$("#labDepts option:selected").text();
				getInvsList(deptInvFromDt,deptInvToDt,labDepts);
			});
			var numberRegex1 = /^[0-9.]*$/;
			
			
			
			
			
		     $("#labDeptId").on('change',function(){
				 
				 var deptName = $("#labDeptId option:selected").text();
				 $("#deptName").val(deptName);
				 var quantity =$("#quantity").val();
				 var tarrifId=$("#tarrifId").val();
				 var labDeptId=$("#labDeptId").val();
				// alert(deptName);
				 
				 if (deptName == 'DENTAL') {
					 
		                $("#quantityRow").show();
			            $("#quantityText").show();
			        } else {
			            $("#quantityRow").hide();
			            $("#quantityText").hide();
			        }
				  if (deptName != 'DENTAL'){
				    $("#quantity").val(1);
				 // alert("not dental''''''''''");
				    var quantity=$("#quantity").val();
				   //alert("quantity||||||||||||||||||||~~~~~~~~~"+quantity); 
				 } 
				  
				  getOpservice();
			 });
		     
		     $("#tarrifId").on('change',function(){
		    	 getOpservice();
			 });
		     
		     function getOpservice(){
		    
		    	 var deptName = $("#labDeptId option:selected").text();
				 $("#deptName").val(deptName);
				 var quantity =$("#quantity").val();
				 var tarrifId=$("#tarrifId").val();
				 var labDeptId=$("#labDeptId").val();
				 
		    	 var url = "/<s:message code="projectName"></s:message>/patient/getDeptInvList?serviceId=" +labDeptId+"&tarrifId="+tarrifId;
				alert(url);
				$.ajax({
			        url: url,
			        type: 'GET',
			        cache:false,
			        success:function(response){
                     // alert(response);                            
						$("#labInvId").html(response);
						$("#labInvId").trigger("chosen:updated");
		                 
						$("#selInvName").html(response);
						$("#selInvName").trigger("chosen:updated");
						
			        }
				});
		     
		     }
			
		     $("#selInvName").on("change", function(event) {
					
					event.preventDefault();
					
					var selInvName = $("#selInvName").val().split(":");
					//alert(selInvName);
					var serId = selInvName[0];
					//var packageId = selInvName[1];
					$("#discPercent").val('0');
					$("#discPercentage").val('0');
					$("#docPercent").val('0');
					$("#tarrifName").val($("#tarrifId option:selected").text());

					
     			 var urlCharge =  '/<s:message code="projectName"></s:message>/labBilling/getInvPriceOP?serviceId='+serId;
						
						 //alert(urlCharge);
							$.ajax({
								url : urlCharge,
				        
								success : function(priceInter) {
							     //alert(priceInter);
									$("#charge").val(priceInter);
									$("#chargeNew").val(priceInter);
									$("#discAmt").val(priceInter);
									
									
									
								}
							}); 
					
               });
		     
		     
		      $("#labDiscAmt").on('keyup',function(){
					 var billAm =  $("#labServicesTableMain #labBillAmt").val();
					 var labTotAmt = $("#labTotAmt").val();
					var totalDiscount = parseFloat($(this).val());
					
					if (isNaN(totalDiscount) || totalDiscount==0 || totalDiscount==0.00) {
						
					     $(this).val('0');
				    $(this).closest("tr").find("#labBillAmt").val(billAm);
				    $(this).closest("tr").find("#labBalAmt").val(billAm);
						
					}else{
						$("#labDiscAmtText").hide();
					}
			
					if(totalDiscount != "" && totalDiscount > 0 ){
						
				//	alert(111);
						var billAmount = parseFloat($("#labTotAmt").val());
						
						var val = (billAmount-totalDiscount);
					//	$("#discPercent").attr('readonly', true);
						var labDiscPerc = (totalDiscount * 100)/labTotAmt;
						
						$("#labDiscPerc").val(labDiscPerc.toFixed(2));
						$("#labBillAmt").val(val.toFixed(2));
						//$("#labBalAmt").val(val.toFixed(2));
						$("#labBalAmt").val(val - $("#labPaidAmt").val()).toFixed(2);
						
						$("#labDiscAmtText").hide();
					}
					else if(totalDiscount == "0.00" || totalDiscount == '0')
					{		
						
						//$("#discPercent").attr('readonly', false);
						$("#labDiscPerc").val('0.00');
						$("#labBillAmt").val(parseInt($("#labTotAmt").val() - $("#labPaidAmt").val()).toFixed(2));
						$("#labBalAmt").val(parseInt($("#labTotAmt").val() - $("#labPaidAmt").val()).toFixed(2));
						
						$("#labDiscAmtText").hide();			
					
					}
					
					var indivDiscPer = ( parseFloat(totalDiscount) * 100 ) / parseFloat(labTotAmt);
					$("#labDiscPerc").val(indivDiscPer.toFixed(2));

					
				});
				

			   $("#labDiscPerc").on('keyup',function(){
					 var billAm =  $("#labServicesTableMain #labBillAmt").val();
					 var labPaidAmt = $("#labServicesTableMain #labPaidAmt").val();
					
					var totalDiscount = parseFloat($(this).val());
					//alert("tot Disocunt..before adding...vaue."+totalDiscount);
					
					
					if (isNaN(totalDiscount) || totalDiscount < 0 || totalDiscount > 100 || totalDiscount==0 ) {
						 $(this).val('0');
				    $(this).closest("tr").find("#labBillAmt").val(billAm);
				    $(this).closest("tr").find("#labBalAmt").val(billAm);
						
					}else{
						$("#labDiscPercText").hide();
					}
			
					if(totalDiscount != "" && totalDiscount > 0 && totalDiscount <101){
						
					
						var billAmount = parseFloat($("#labTotAmt").val());
						
						var val = (billAmount-(billAmount * (totalDiscount/100)));
						//alert(val)
						$("#labDiscAmt").val(val.toFixed(2));
						$("#labBillAmt").val(val.toFixed(2));
						$("#labBalAmt").val(parseInt($("#labBillAmt").val() - $("#labPaidAmt").val()).toFixed(2));
						
						$("#labDiscPercText").hide();
					}
					else if(totalDiscount == "0.00" || totalDiscount == '0')
					{					
						$("#labBillAmt").val(parseInt($("#labTotAmt").val() - $("#labPaidAmt").val()).toFixed(2));
						$("#labBalAmt").val(parseInt($("#labTotAmt").val() - $("#labPaidAmt").val()).toFixed(2));
						
						$("#labDiscPercText").hide();			
					
					}
					var labDiscountAmnt = "0";
					 var finalTotAmt = 0.00;
					 var labDiscPerc = $("#labDiscPerc").val();
					// alert(labDiscAmt + "....labDiscAmt");
					 var labTotAmt = $("#labTotAmt").val();
					if (labDiscPerc == "") {
						labDiscountAmnt = "0";
						labDiscPerc = "0";
					} else {
					//discPercentage = ((pharDiscAmt * 100) / finalTotAmt);
					var abc = $(this).val();
					labDiscountAmnt = (labDiscPerc * labTotAmt) / 100;
					//alert(labDiscountAmnt + ".....labDiscountAmnt");
					$("#labDiscAmt").val(labDiscountAmnt.toFixed(2));
					//alert(pharDiscAmt);
					}
				});
				
			   function isNumber(n){
		        	return (parseFloat(n) == n);
		        } 
			
				$("#labPaidAmt").on('keyup',function(){
					var numberRegex2 = /^[0-9.]*$/;
		  			$("#labPaidAmtText").hide(); 
		  		    //alert("labPaidAmt");
		  			var amountReceived = parseFloat($(this).val());
		  			//alert(amountReceived);
		  			var billAmount = parseFloat($("#labBillAmt").val());
		  			
		  			if(amountReceived != "" && isNumber(amountReceived)){
		  				//alert("equal");
		  				$("#labPaidAmtText").hide();
			  			if(amountReceived == billAmount){
			  				//alert(3);
			  				$("#changeGiven").val("0.00");
			  				$("#labBalAmt").val("0.00");
			  				$("#labPaidAmtText").hide();
			  				//alert(1);
			  				
			  			}else if(amountReceived < billAmount){
			  				
			  					$("#labBalAmt").val(((billAmount)- amountReceived).toFixed(2));
			  					$("#changeGiven").val("0.00");
			  					$("#labPaidAmtText").hide();
			  					//alert(2);
			  				 
			  			}
			  			
			  			else if(amountReceived > billAmount){
			  				
			  					$("#changeGiven").val((amountReceived - billAmount).toFixed(2));
			  					$("#labBalAmt").val(billAmount);
			  					//$("#labBalAmt").val("0.00");
			  					$("#labPaidAmt").val("0.00");
			  					$("#labPaidAmtText").hide();
			  			}
			  			
			  			
		  			}
		  			else if(!(numberRegex2.test($("#labPaidAmt").val()))){
						$("#labPaidAmtText").text("invalid amount");
						$("#labPaidAmtText").show();
						$(this).focus();
						//alert(6);
					}
		  			
		  			else if(amountReceived == '0.00' || amountReceived == '0'){
		  			//	alert(7);
		  				$("#changeGiven").val('0.00');
						$("#labPaidAmtText").hide();
						$("#labBalAmt").val(((billAmount)- amountReceived).toFixed(2));
						
		  			}
		  			
		  			
		  		});
		  	
			 	var a=0;
		       	$(".cashAmt").each(function(){
		       		var amt=$(this).val();
		       		a=parseFloat(a)+parseFloat(amt);
		       	});

		       	$("#cashAmountTfoot").text(a.toFixed(2));

		    	var b=0;
		       	$(".creditAmt").each(function(){
		       		var amtb=$(this).val();
		       		//alert(amtb);
		       		b=parseFloat(b)+parseFloat(amtb);
		       	});

		       	$("#creditAmountTfoot").text(b.toFixed(2));

		    	var c=0;
		       	$(".upiAmt").each(function(){
		       		var amtc=$(this).val();
		       		c=parseFloat(c)+parseFloat(amtc);
		       	});

		       	$("#upiAmtTfoot").text(c.toFixed(2));
		       	
		     	var d=0;
		       	$(".regOpCashAmt").each(function(){
		       		var amtd=$(this).val();
		       		//alert(amtd);
		       		d=parseFloat(d)+parseFloat(amtd);
		       	});

		       	$("#cashAmttt").text(d.toFixed(2));

		    	var e=0;
		       	$(".regOpCreditAmt").each(function(){
		       		var amte=$(this).val();
		       		//alert(amtb);
		       		e=parseFloat(e)+parseFloat(amte);
		       	});

		       	$("#cardAmttt").text(e.toFixed(2));

		    	var f=0;
		       	$(".regOpUpiAmt").each(function(){
		       		var amtf=$(this).val();
		       		f=parseFloat(f)+parseFloat(amtf);
		       	});

		       	$("#upiAmttt").text(f.toFixed(2));
			   
        	$("#addInvestigation").click(function(){
        						
        						//alert("clicked..");
        						var labDeptId=$("#labDeptId").val();
        						 $("#serviceIdText").hide();
        						 $("#investigationText").hide();
        						 $("#discPercentText").hide();
        						 
        						
        			
        						 $("#discAmtText").hide();
        						 $("#finalDiscAmtText").hide();
        						 
        						 $("#successDiv").hide();
        						 $("#errorDiv").hide();

        						var numberRegex = /^[0-9]*$/;
        						$("#docPercentText").hide();
        						var docPercent = $("#docPercent").val();
        						var deptName = $("#deptName").val();
        						var serviceId = $("#serviceName").val();
        						var quantity = $("#quantity").val();
        						//alert("Quantity.........."+Quantity);
        						var serviceName = $("#serviceName option:selected").text();
        						var selInvName = $("#selInvName").val().split(":");
        						//alert(selInvName);
        						var investigationId = selInvName[0];
        						//alert(investigationId);
        						var packageId = selInvName[1];
        						var deptId = selInvName[2];
        						var tarrifId =$("#tarrifId").val();
        					    var tarrifName = $("#tarrifId option:selected").text();
        						
        		        	    var investigation = $("#selInvName option:selected").text();
        						var charge = $("#charge").val();
        						
        						
        						

    						/* 	$(".labInvestigationIds").each(function(){
    								var invId = $(this).val();
    								alert(invId);
    								if (parseInt(invId) == parseInt(investigationId)) {
    									//alert(drugId);
    									alert("in iffffffffff");
    									
    									$("#invIdDuplicateStatus").val('1');
    													
    									return false;
    								} else {
    									alert("in elseeeeeeeee");
    									$("#invIdDuplicateStatus").val('0');
    								}
    							});		 */
    							
    							
    							//functionality for not selecting the same investigation by habib from line 11038 to 11051 on feb 21 2024    							
    							$(".labInvestigationIds").each(function(){
    								var invId = $(this).val();
    								//alert(invId);
    								if (parseInt(invId) == parseInt(investigationId)) {
    									//alert(drugId);
    									$("#invIdDuplicateStatus").val('1');
    													
    									return false;
    								} else {
    									$("#invIdDuplicateStatus").val('0');
    								}
    							});
    							
    							var invIdDuplicateStatus = $("#invIdDuplicateStatus").val();  
        						//alert(appendDrugDuplicateStatus);
        						if (invIdDuplicateStatus == '1') {
        							$('#alertModal').modal('show'); 
        							$('#alertMsg').text(investigation + ' already exists in Billing'); 
        						} else {  
        							if(deptName=='DENTAL' && quantity == ''){
        		                    $("#quantityText").show();
        		                    $("#quantityText").val(1);
        		                }
        							
        							
        							
        							
        							/* //alert(deptName);
        							if(deptName=='DENTAL'){
        							   alert("in if");
        								$("#quantitys").show();
        							
        							
        							} */
        							if (investigationId == '0') {
        							//alert(1);
        		                    $("#investigationText").show();
        		                    $("#investigationText").text("Select Service");
        		                }
        							else if(quantity==''){
        			    				$("#quantityTextSmall").show();
        			    				$("#quantityTextSmall").text("Please Enter quantity");
        			    				
        			    		
        			    		  }else if (charge == '') {
        		                    $("#chargeText").show();
        		                    $("#chargeText").text("Charge should not be empty");
        		                
        		                }  else {
        					 
        		                	if(deptName=='DENTAL'){
        			                	
        								serviceId = 0;
        								$("#labServicesTableMain tbody").append(
        										'<tr>'
        											+ '<td align="left">' + investigation + '<input type="hidden" name="labInvestigationIds" class="labInvestigationIds form-controlclass res" value="'+ investigationId +'" >'
        											+ '<input type="hidden" class="labInvestigation form-controlclass res" value="'+ investigation +'" >'
        											+ '<input type="hidden" name="packIds" class="packIds form-controlclass res" value="0"  >'
        											+ '<input type="hidden" name="labDeptIds" class="deptId form-controlclass res" value="'+ deptId +'" >'
        											+ '<input type="hidden" name="labPrescIds" class="labPrescIds form-control res" value="0" ></td>'
        											+  '<td align="right">'+ quantity +'<input type="hidden" id="quantitys" name="qtys" class="qtys form-controlclass res" value="'+ quantity +'" ></td>'
        											+ '<td align="right">'+ charge +'<input type="hidden" name="labCharges" class="form-controlclass labCharges" value="'+ charge +'" >'
        											+ '<input type="hidden"  class="form-control change " value="0"  ></td>'
        											+ '<td align="center"><i class="glyphicon glyphicon-trash productDelete" data-toggle="tooltip" title="Delete Product" style="color: red; cursor: pointer;"></i></td>'
        										+ '</tr>');
        				                	}
        				                	else
        				                		{
        				                	
        				                		serviceId = 0;
        										$("#labServicesTableMain tbody").append(
        												'<tr>'
        													+ '<td align="left">' + investigation + '<input type="hidden" name="labInvestigationIds" class="labInvestigationIds form-controlclass res" value="'+ investigationId +'" >'
        													+ '<input type="hidden" class="labInvestigation form-controlclass res" value="'+ investigation +'" >'
        													+ '<input type="hidden" name="packIds" class="packIds form-controlclass res" value="0"  >'
        													+ '<input type="hidden" name="labDeptIds" class="deptId form-controlclass res" value="'+ deptId +'"  ><input type="hidden" name="tarrifIds" class="tarrifId form-controlclass res" value="'+ tarrifId +'" >'
        													+ '<input type="hidden" name="labPrescIds" class="labPrescIds form-control res" value="0" ></td>'
        													+ '<td align="right">'+ tarrifName +'</td>'
        													+  '<td align="right" hidden>'+ quantity +'<input type="hidden" id="quantitys" name="qtys" class="qtys form-controlclass res" value="'+ quantity +'" ></td>'
        													+ '<td align="right">'+ charge +'<input type="hidden" name="labCharges" class="form-controlclass labCharges" value="'+ charge +'" >'
        													+ '<input type="hidden"  class="form-control change " value="0"  ></td>'
        													+ '<td align="center"><i class="glyphicon glyphicon-trash productDelete" data-toggle="tooltip" title="Delete Product" style="color: red; cursor: pointer;"></i></td>'
        												+ '</tr>');
        				                		
        				                		
        				                		}
        								 
        						$('#selInvName').val('0').trigger('chosen:updated');
        						$('.invIds').val($(".labInvestigationIds").val());
        						
        						
        						var labPaidAmt = $("#labPaidAmt").val();
        						var labDiscAmt = $("#labDiscAmt").val();
        						 $("#quantity").val('1');
        						
        						 
        				
        					$("#labPaidAmt").val(labPaidAmt);
        					//$("#labDiscAmt").val(labDiscAmt);
        					$("#labDiscAmt").attr('readonly', false);
        		            $("#labPaidAmt").attr('readonly', false);
        					
        		 
        					var discPerc =0;
        							if($("#labDiscAmt").val() == '0' || $("#labDiscAmt").val() == '0.00'){
        								//alert("if");
        								var tot =  parseInt($("#labTotAmt").val());
        								var totBillamt= parseInt($("#labBillAmt").val());
        								var charge = parseInt($("#charge").val());
        								tot = tot+charge;
        								totBillamt=totBillamt+charge;
        								totBalance=totBillamt-labPaidAmt;
        								//discamt=totDiscamt+discamt;
        								
        								//discPerc = (discamt*100)/tot;
        								//alert("discamt...."+discamt);
        								//	alert(charge);
        								//	alert(tot);
        				   	   			    $("#labTotAmt").val(tot.toFixed(2));
        				   	   				$("#labBillAmt").val(totBillamt.toFixed(2));
        				   	   			  // $("#labBalAmt").val(tot.toFixed(2));
        				   	   		      // $("#labDiscAmt").val(discamt.toFixed(2));
        				   	   		// $("#labDiscPerc").val(discPerc.toFixed(2));
        				   	   		 
        				   	   		      $("#labBalAmt").val(totBalance.toFixed(2));	   	    		
        				   	   		
        							 }
        							else{
        								//alert("else");
        								var tot =  parseInt($("#labTotAmt").val());
        								var charge = parseInt($("#charge").val());
        								var totDiscamt=parseInt($("#labDiscAmt").val());
        								var discamt=parseInt($("#discPercent").val());
        							
        								tot = tot+charge;
        								discamt=totDiscamt+discamt;
        								totBalance=tot-labPaidAmt;
        								discPerc = (discamt*100)/tot;
        								//alert("discPerc....."+discPerc);
        								  $("#labTotAmt").val(tot.toFixed(2));
        				   	   				$("#labBillAmt").val(tot.toFixed(2));
        				   	   			//$("#labBalAmt").val(tot.toFixed(2));
        				   	   			  $("#labDiscAmt").val(discamt.toFixed(2)).attr('readonly',true);
        				   	   		    
        				   	   		     // $("#labBalAmt").val(totBalance.toFixed(2));
        				   	   		    $("#labDiscPerc").val(discPerc.toFixed(2)).attr('readonly',true);
        				   	        	
        								var totDisc= $("#labDiscAmt").val();
        								//alert("totdisc"+totDisc);
        								var billAmount = parseFloat($("#labTotAmt").val());
        								
        								var val = (billAmount-totDisc);
        								//alert(val);
        								var balAmnt = (val-labPaidAmt);
        								$("#labBillAmt").val(val.toFixed(2));
        				   	   			$("#labBalAmt").val(balAmnt.toFixed(2));
        							} 
        				   	   			
        							$("#serviceId").val('0');
        							$("#serviceName").val('');
        							$("#investigationId").val('0');
        							
        							$("#selInvName").val('0').trigger('chosen:updated');
        							//$("#charge").val('0.00');
        			        	    $("#discPercent").val('0');
        			        	    $("#discPercentage").val('0');
        			        	    $("#discAmt").val('0');
        							$("#finalDiscAmt").val('0.00');
        							 $("#docPercent").val('0');

        							
        						}
        										}
        						 $("#charge").val('0.00');
        					});
        				 
   	  $("#labDiscPerc").on('keyup',function(){
			 var billAm =  $("#labServicesTableMain #labBillAmt").val();
			 var labPaidAmt = $("#labServicesTableMain #labPaidAmt").val();
			
			var totalDiscount = parseFloat($(this).val());
			//alert("tot Disocunt..before adding...vaue."+totalDiscount);
			
			
			if (isNaN(totalDiscount) || totalDiscount < 0 || totalDiscount > 100 || totalDiscount==0 ) {
				 $(this).val('0');
		    $(this).closest("tr").find("#labBillAmt").val(billAm);
		    $(this).closest("tr").find("#labBalAmt").val(billAm);
				
			}else{
				$("#labDiscPercText").hide();
			}
	
			if(totalDiscount != "" && totalDiscount > 0 && totalDiscount <101){
				
			
				var billAmount = parseFloat($("#labTotAmt").val());
				
				var val = (billAmount-(billAmount * (totalDiscount/100)));
				//alert(val)
				$("#labDiscAmt").val(val.toFixed(2));
				$("#labBillAmt").val(val.toFixed(2));
				$("#labBalAmt").val(parseInt($("#labBillAmt").val() - $("#labPaidAmt").val()).toFixed(2));
				
				$("#labDiscPercText").hide();
			}
			else if(totalDiscount == "0.00" || totalDiscount == '0')
			{					
				$("#labBillAmt").val(parseInt($("#labTotAmt").val() - $("#labPaidAmt").val()).toFixed(2));
				$("#labBalAmt").val(parseInt($("#labTotAmt").val() - $("#labPaidAmt").val()).toFixed(2));
				
				$("#labDiscPercText").hide();			
			
			}
			var labDiscountAmnt = "0";
			 var finalTotAmt = 0.00;
			 var labDiscPerc = $("#labDiscPerc").val();
			// alert(labDiscAmt + "....labDiscAmt");
			 var labTotAmt = $("#labTotAmt").val();
			if (labDiscPerc == "") {
				labDiscountAmnt = "0";
				labDiscPerc = "0";
			} else {
			//discPercentage = ((pharDiscAmt * 100) / finalTotAmt);
			var abc = $(this).val();
			labDiscountAmnt = (labDiscPerc * labTotAmt) / 100;
			//alert(labDiscountAmnt + ".....labDiscountAmnt");
			$("#labDiscAmt").val(labDiscountAmnt.toFixed(2));
			//alert(pharDiscAmt);
			}
		});
		     
		     
			
			
	        $('.reportRange span').html(moment().format('D MMMM, YYYY') + ' - ' + moment().format('D MMMM, YYYY'));
	  		
	  		$('#reportRangeDiv').daterangepicker({
				format: 'DD-MM-YYYY',
				startDate: moment().subtract(15, 'days'),
				endDate: moment(),
				minDate: '01/01/2016',
				maxDate: '31/12/2300',
				//dateLimit: { days: 100 },
				showDropdowns: true,
				showWeekNumbers: true,
				timePicker: false,
				timePickerIncrement: 1,
				timePicker12Hour: true,
					
				ranges: {
					
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
				 	'Last 6 Months': [moment().subtract(6, 'months').startOf('days'), moment().endOf('days')],
					'': [moment().subtract(15, 'days'), moment()]
				},
						
				opens: 'left',
				drops: 'down',
				buttonClasses: ['btn', 'btn-sm'],
				applyClass: 'btn-primary',
				cancelClass: 'btn-default',
				separator: ' to ',
				
				locale: {
					applyLabel: 'Submit',
					cancelLabel: 'Cancel',
					fromLabel: 'From',
					toLabel: 'To',
					customRangeLabel: 'Select Date Range',
					daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
					monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					firstDay: 1
				}
					
			},
			function(start, end, label) {
				console.log(start.toISOString(), end.toISOString(), label);
				searchStatus = 1;
				
				     var maxRange = moment.duration(7, 'months');
				     var selectedRange = moment.duration(end.diff(start));
				    if (selectedRange > maxRange) {
				        end = moment(start).add(6, 'months').endOf('month');
				        $('#reportRangeDiv').data('daterangepicker').setEndDate(end);
				        //alert('The maximum date range allowed is 6 months.');
				        $('#alertModal').modal('show');
						$("#alertMsg").text("The maximum date range allowed is 6 months.");
				         
				       
				         setTimeout(function() {
				        	 location.reload(); 
				        	}, 2000); // 2000 milliseconds = 2 seconds
				         return;
				         
				    } 
				    
				$('#reportRangeDiv span').html(start.format('D MMMM, YYYY') + ' - ' + end.format('D MMMM, YYYY'));
				$('#reportFromDt').val(start.format('DD-MMM-YYYY'));
				$('#reportToDt').val(end.format('DD-MMM-YYYY'));
				
				//alert($("#reportRangeDiv li.active").val());
				var reportFromDt = $("#reportFromDt").val();
				var reportToDt = $("#reportToDt").val();
				
				var deptId = $("#deptId").val();
				var locId = $("#userLocId").val();
// 				alert(locId);
				if (locId!=0){
					getPatientReportCustom(reportFromDt, reportToDt, locId, deptId);
				}else{
					$('#alertModal').modal('show');
					$("#alertMsg").text("Please Select Location");
				}
				
					
		  });
			//alert("hello.....");
			function getPatientReportCustom(reportFromDt, reportToDt, locId, deptId) {
				if (searchStatus == 1) {
				
				$('#loadarModal').modal({backdrop: 'static', keyboard: false}); 

				var userOrgStatus = $("#userOrgStatus").val();
				var userLocStatus = $("#userLocStatus").val();
				var userDeptStatus = $("#userDeptStatus").val();
				
				$("#searchLocId").val($("#locId").val());
				$("#searchDeptId").val($("#deptId").val());
				$("#searchDeptDet").val($("#userDeptId").val());
				
				$("#apptFromDate").val(reportFromDt);
				$("#apptToDate").val(reportToDt);
				//alert($("#locId").val()+"loc id in get pat report funct");
	
				$("#searchApptForm").attr('action','/<s:message code="projectName"></s:message>/patient/searchAppointments').submit();
					
			
				}
			}
	
			var patApptSts = $("#patApptSts").val();
			//alert(patApptSts);
			if (patApptSts == 1) {
				//alert("in setting previous data...")
				var apptLocId = $("#apptLocId").val();
				var apptDeptId = $("#apptDeptId").val();
				var apptDeptDet = $("#apptDeptDet").val();
				
				$('#userLocId').val(apptLocId).trigger('chosen:updated'); 
				$("#locId").val(apptLocId);
				getUserLocDeptsFunction(apptLocId);
				getUserDeptDetails(apptDeptDet);
				//$('#userDeptId').val(searchDeptDet).trigger('chosen:updated');
				//$("#deptId").val(searchDeptId);

				$('#reportRangeDiv span').html($("#apptReportFromDt").val() + ' - ' + $("#apptReportToDt").val());
				$('#reportFromDt').val($("#apptReportFromDt").val());
				$('#reportToDt').val($("#apptReportFromDt").val());

				//var registerDT = $('#patientInfo').DataTable();
			} else {
				//var initialDT = $('#patientInfo').DataTable({});
			}
			
			var searchApptSts = $("#searchApptSts").val();
			//alert(searchApptSts);
			if (searchApptSts == 1) {
				//alert("in setting previous data...")
				var searchLocId = $("#searchLocId").val();
				var searchDeptId = $("#searchDeptId").val();
				var searchDeptDet = $("#searchDeptDet").val();
				
				$('#userLocId').val(searchLocId).trigger('chosen:updated'); 
				$("#locId").val(searchLocId);
				getUserLocDeptsFunction(searchLocId);
				getUserDeptDetails(searchDeptDet);
				//$('#userDeptId').val(searchDeptDet).trigger('chosen:updated');
				//$("#deptId").val(searchDeptId);

				$('#reportRangeDiv span').html($("#searchReportFromDt").val() + ' - ' + $("#searchReportToDt").val());
				$('#reportFromDt').val($("#searchReportFromDt").val());
				$('#reportToDt').val($("#searchReportToDt").val());

				//$('#reportRangeDiv li').cl.text();
				//var searchDT = $('#patientInfo').DataTable();
			}

			$(".modal").on("hidden.bs.modal", function () {
		 		//alert("in reset side-menu padding..");
		 		//$('.sidebar-mini').addClass('sideMenuPaddingReset');
		 		$(".sidebar-mini").css("padding-right", "0px");
		 		
		 		//$(".modal-backdrop").removeClass("in");
		 		//$(".modal-backdrop").addClass("out");
			});
			

	  		$('.pntPortalRange span').html(moment().format('D MMMM, YYYY') + ' - ' + moment().format('D MMMM, YYYY'));
			 
			$('#pntPortalRangeDiv').daterangepicker({
			
				format: 'DD/MM/YYYY',
				startDate: moment(),
				endDate: moment(),
				minDate: '01/01/2017',
				maxDate: '31/12/2200',
				dateLimit: { days: 10000 },
				showDropdowns: true,
				showWeekNumbers: true,
				timePicker: false,
				timePickerIncrement: 1,
				timePicker12Hour: true,
			
				ranges: {
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last 1 Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'month').endOf('month')]
				},
				
				opens: 'left',
				drops: 'down',
				buttonClasses: ['btn', 'btn-sm'],
				applyClass: 'btn-primary',
				cancelClass: 'btn-default',
				separator: ' to ',
			
				locale: {
					applyLabel: 'Submit',
					cancelLabel: 'Cancel',
					fromLabel: 'From',
					toLabel: 'To',
					customRangeLabel: 'Select Date Range',
					daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
					monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					firstDay: 1
				}
			
			},
			
			function(start, end, label) {
				console.log(start.toISOString(), end.toISOString(), label);
				searchStatus = 1;
				
				$('#pntPortalRangeDiv span').html(start.format('D MMMM, YYYY') + ' - ' + end.format('D MMMM, YYYY'));
				$('#pntPortalFromDt').val(start.format('DD-MMM-YYYY'));
				$('#pntPortalToDt').val(end.format('DD-MMM-YYYY'));
				
				//alert($("#pntPortalRangeDiv li.active").val());
				var pntPortalFromDt = $("#pntPortaltFromDt").val();
				var pntPortalToDt = $("#pntPortalToDt").val();
				
			});


			$("#portalPatientsTable").on('click', '.viewPortalPat', function() {	

				//var trId = $(this).closest('tr').prop('id');
				var pntPortalId = $(this).closest('tr').find('.pntPortalId').val();
				var portalPntCode = $(this).closest('tr').find('.portalPntCode').val();
				var portalPntTitle = $(this).closest('tr').find('.portalPntTitle').val();
				var portalPntName = $(this).closest('tr').find('.portalPntName').val();
				var portalLastName = $(this).closest('tr').find('.portalLastName').val();
				var portalPntAddr = $(this).closest('tr').find('.portalPntAddr').val();

				var portalPntGender = $(this).closest('tr').find('.portalPntGender').val();
				var portalPntAge = $(this).closest('tr').find('.portalPntAge').val();
				var portalPntDob = $(this).closest('tr').find('.portalPntDob').val();
				var portalPntMobNum = $(this).closest('tr').find('.portalPntMobNum').val();
				var portalPntBloodGrp = $(this).closest('tr').find('.portalPntBloodGrp').val();
				var portalPntNationality = $(this).closest('tr').find('.portalPntNationality').val();
				var portalPntReligion = $(this).closest('tr').find('.portalPntReligion').val();
				var portalPntIdType = $(this).closest('tr').find('.portalPntIdType').val();
				var portalPntIdNum = $(this).closest('tr').find('.portalPntIdNum').val();
				var portalPntCareBy = $(this).closest('tr').find('.portalPntCareBy').val();
				var portalPntCareByName = $(this).closest('tr').find('.portalPntCareByName').val();
				//alert(portalPntAddr + "-" + portalPntCareByName);
				
				$("#pntPortalId").val(pntPortalId);
				$("#patientTitle").val(portalPntTitle);
				//$("#patientName").val(portalPntCode + " - " + portalPntName);
				$("#patientName").val(portalPntName);
				$("#lastName").val(portalLastName);
				$("#genderVal").val(portalPntGender);
				$("#pntDob").val(portalPntDob);
				$("#age").val(portalPntAge);
				$("#pntMobNum").val(portalPntMobNum);
				$("#careBy").val(portalPntCareBy);
				$("#careByName").val(portalPntCareByName);
				$("#pntReligion").val(portalPntReligion);
				$("#pntNationality").val(portalPntNationality);
				$("#pntBloodGrp").val(portalPntBloodGrp);
				$("#addr").text(portalPntAddr);
				$("#idType").val(portalPntIdType);
				$("#idNum").val(portalPntIdNum);
				
				$("#pntPortalSts").val("1");
				
				$('.nav-tabs a[href="#apptAdd"]').tab('show');
				
			});
			 
			  $('input:radio[name="patientDetailsSplit"]').filter('[value="apptWise"]').attr('checked', true);
			  $("#regWise").click(function(){
				     
				     $("#patientNameDiv").attr('hidden' , true);
					 $("#newPatientNameDiv").attr('hidden' , true);
					 $("#regPatientNameDiv").attr('hidden' , false);	
					 $("#passPortDiv").hide();
					 $("#idRetakee").trigger('click');
					 $("#idRetake").trigger('click');
					 var src='';
					 document.getElementById("picNameId").src = src;
					 $("#picNameId").hide();
					 
					 var src='';
					 document.getElementById("picNameIdd").src = src;
					 $("#picNameIdd").hide();
					 //$("#city").hide();
					// $("#citySuv").show();
					 $("#apptPatientDetailsDiv").attr('hidden' , true);	
					 $("#regPatientDetailsDiv").attr('hidden' , false);	
					 $("#patientGender").hide();
					 $("#genderVal").show();
					 $("#maritalStatusVal").show();
					 $("#pntMaritalStatus").hide();
					 
					 $("#patInfoVisit").text('');
					 $("#patientName").val('');
					 $("#regPatientName").val('');
					 $("#patientTitleText").hide();
						$("#patientGenderText").hide();
						$("#patientNameText").hide();
						$("#lastNameText").hide();
						$("#pntDobText").hide();
						$("#ageText").hide();
						$("#careByText").hide();
						$("#careByNameText").hide();
						$("#babyParentText").hide();
						$("#parentNameText").hide();
						$("#pntMobNumText").hide();
						$("#refTypeText").hide();
						$("#refIdText").hide();
						$("#pntMaritalStatusText").hide();
						$("#pntNationalityText").hide();
						$("#pntReligionText").hide();
						$("#pntBloodGrpText").hide();
						$("#pntOccupationText").hide();
						$("#idTypeText").hide();
						$("#idNumText").hide();
						$("#stateText").hide();
						$("#errCity").hide();
						$("#villageText").hide();
						$("#patientCatText").hide();
						$("#pblmDescText").hide();
						$("#idLocationText").hide();
						$("#idDoctorText").hide();
						$("#scheduleDtText").hide();
						$("#specNameText").hide();
						$("#empCodeText").hide();
						$("#tokenValueText").hide();
						$("#errFee").hide();
						$("#feeDiscountText").hide();
						$("#feeDiscountAmtText").hide();
						$("#errConsFee").hide();
						$("#consDiscountText").hide();
						$("#consDiscountAmtText").hide();
						$("#totAmtText").hide();
						$("#totDiscountText").hide();
						$("#totDiscountAmtText").hide();
						$("#amountReceivedText").hide();
						$("#docSlotsDiv").hide();
						
						$("#patientId").val('0');
						$("#patVisitId").val('0');
						$("#regPatientId").val('0');
						$("#suvRegPatientId").val('0');
						$("#patientTitle").val("0");
						$("#patientName").val('');
						$("#newPatientName").val('');
						$("#lastName").val('');
						$("#patientGender").val("0");
						$("#pntDob").val('');
						$("#age").val('');
						$("#careBy").val("0");
						$("#careByName").val('');
						$("#babyParent").val('');
						$("#parentName").val('');
						$("#pntMobNum").val('');
						$("#refType").val("0");
						$("#refId").val('');
						$("#pntMaritalStatus").val("0");
						$("#pntNationality").val("0");
						$("#pntReligion").val("0");
						$("#pntBloodGrp").val("0");
						$("#pntOccupation").val('');
						$("#idType").val("0");
						$("#idNum").val("");
						$("#state").val("0");
						$("#city").val("0");
						$("#village").val('');
						$("#patientCat").val("0").trigger('chosen:updated');
						$("#pblmDesc").val('');
						$("#idLocation").val("0");
						$("#idDoctor").val("0").trigger('chosen:updated');
						$("#occupation").val("0").trigger('chosen:updated');
						$("#state").val('AP').trigger('chosen:updated');
						$("#scheduleDt").val('');
						$("#specName").val('');
						$("#empCode").val('');
						$("#ageMonths").val('');
						$("#ageDays").val('');
						$("#tokenValue").val('');
						$("#feeStatus").val('');
						$("#regFee").val('');
						$("#discount").val('');
						$("#discountAmount").val('');
						$("#amount").val('');
						$("#consFee").val('');
						$("#consDiscount").val('');
						$("#consDiscountAmount").val('');
						$("#consAmount").val('');
						$("#totAmt").val('');
						$("#totDiscount").val('');
						$("#totDiscountAmt").val('');
						$("#billAmt").val('');
						$("#amountReceived").val('');
						$("#chngGiven").val('');
						$("#balance").val('');
						$("#status").val('');
						$("#addr").val('');
						$("#maritalStatusVal").trigger('chosen:updated');
						$("#pntMobNum").attr("disabled",false);
						$("#newPatientName").attr('readonly', false);
						$("#pntMobNum").attr('readonly', false);
						$("#maritalStatusVal").attr('disabled', false);
						$("#idNum").attr('readonly', false);
						$("#patientName").attr('readonly', false);
						$("#regPatientName").attr('readonly', false);
						$("#pntDob").attr('disabled', false);
						$("#patientTitle").attr("disabled",false);
						$("#genderVal").attr("disabled",false);
						$("#pntMaritalStatus").attr("disabled",false);
						$("#lastName").attr("disabled",false);
						$("#age").attr("readonly",false);
						$("#ageMonths").attr("readonly",false);
						$("#ageDays").attr("readonly",false);						
						$("#pntMobNum").attr("readonly",false);
						$("#regDt").attr("readonly",false);
						$("#village").attr("disabled",false);
						$("#careBy").attr("disabled",false);
						
						$("#careByName").attr("disabled",false);
						$("#pntNationality").attr("disabled",false);
						$("#pntReligion").attr("disabled",false);
						$("#pntBloodGrp").attr("disabled",false);
						$("#occupation").attr("disabled",false);
						$("#idType").prop('disabled', false);
						$("#idNum").prop('disabled', false);
						$("#addr").prop('disabled', false);
						$("#city").prop('disabled', false);
						$("#state").prop('disabled', false);
						$("#patInfoRegValidSts").text("NO");
						$("#paymentType").val('0').trigger('chosen:updated');
						$("#refType").trigger('change');
						$("#refTypeText").hide();
						//$("#patInfoRegValidDt").hide();
						
						//$("#idDoctor").attr('disabled', true);
						
						$("#regPatientNameText").hide();
						$("#addr").html('');
						//$("#scheduleDt").attr('disabled', true);
						//$("#idDoctor").attr('disabled', true);
			});
       	  
       	 $("#apptWise").click(function(){
       		         
       		         $("#patientNameDiv").attr('hidden' , false);
					 $("#newPatientNameDiv").attr('hidden' , true);
					 $("#regPatientNameDiv").attr('hidden' , true);	
					 
					 $("#apptPatientDetailsDiv").attr('hidden' , false);	
					 $("#regPatientDetailsDiv").attr('hidden' , true);	
					 $("#patientGender").hide();
					 $("#genderVal").show();
					 $("#passPortDiv").hide();
					 $("#patientName").val('');
					// $("#patInfoVisit").text('');
					
					 $("#idRetakee").trigger('click');
					 $("#idRetake").trigger('click');
					 var src='';
					 document.getElementById("picNameId").src = src;
					 $("#picNameId").hide();
					 
					 var src='';
					 document.getElementById("picNameIdd").src = src;
					 $("#picNameIdd").hide();
					 $("#maritalStatusVal").show();
					 $("#pntMaritalStatus").hide();
					 $("#regPatientName").val('');
					 $("#patientTitleText").hide();
						$("#patientGenderText").hide();
						$("#patientNameText").hide();
						$("#lastNameText").hide();
						$("#pntDobText").hide();
						$("#ageText").hide();
						$("#careByText").hide();
						$("#careByNameText").hide();
						$("#babyParentText").hide();
						$("#parentNameText").hide();
						$("#pntMobNumText").hide();
						$("#refTypeText").hide();
						$("#refIdText").hide();
						$("#pntMaritalStatusText").hide();
						$("#pntNationalityText").hide();
						$("#pntReligionText").hide();
						$("#pntBloodGrpText").hide();
						$("#pntOccupationText").hide();
						$("#idTypeText").hide();
						$("#idNumText").hide();
						$("#stateText").hide();
						$("#errCity").hide();
						$("#villageText").hide();
						$("#patientCatText").hide();
						$("#pblmDescText").hide();
						$("#idLocationText").hide();
						$("#idDoctorText").hide();
						$("#scheduleDtText").hide();
						$("#specNameText").hide();
						$("#empCodeText").hide();
						$("#tokenValueText").hide();
						$("#errFee").hide();
						$("#feeDiscountText").hide();
						$("#feeDiscountAmtText").hide();
						$("#errConsFee").hide();
						$("#consDiscountText").hide();
						$("#consDiscountAmtText").hide();
						$("#totAmtText").hide();
						$("#totDiscountText").hide();
						$("#totDiscountAmtText").hide();
						$("#amountReceivedText").hide();
						$("#docSlotsDiv").hide();
						
						$("#patInfoVisit").text('');
						$("#patientTitle").val("0");
						$("#patientName").val('');
						$("#lastName").val('');
						$("#patientGender").val("0");
						$("#pntDob").val('');
						$("#age").val('');
						$("#careBy").val("0");
						$("#careByName").val('');
						$("#babyParent").val('');
						$("#parentName").val('');
						$("#pntMobNum").val('');
// 						$("#refType").val("0");
						$("#refId").val('');
						$("#pntMaritalStatus").val("0");
						$("#pntNationality").val("0");
						$("#pntReligion").val("0");
						$("#pntBloodGrp").val("0");
						$("#occupation").val('');
						$("#idType").val("0");
						$("#idNum").val("");
						$("#state").val("0");
						$("#city").val("0");
						$("#village").val('');
						$("#addr").html('');
// 						$("#patientCat").val("0").trigger('chosen:updated');
						$("#pblmDesc").val('');
// 						$("#idLocation").val("0");
						$("#idDoctor").val("0").trigger('chosen:updated');
						$("#scheduleDt").val('');
						$("#specName").val('');
						$("#empCode").val('');
						$("#tokenValue").val('');
						$("#feeStatus").val('');
						$("#regFee").val('');
						$("#discount").val('');
						$("#discountAmount").val('');
						$("#amount").val('');
						$("#consFee").val('');
						$("#ageMonths").val('');
						$("#ageDays").val('');
						$("#consDiscount").val('');
						$("#consDiscountAmount").val('');
						$("#consAmount").val('');
						$("#totAmt").val('');
						$("#totDiscount").val('');
						$("#totDiscountAmt").val('');
						$("#billAmt").val('');
						$("#amountReceived").val('');
						$("#chngGiven").val('');
						$("#balance").val('');
						$("#status").val('');
						$("#regPatientId").val('0');
						$("#suvRegPatientId").val('0');
						$("#patVisitId").val('0');
						$("#umrDiv").show();
						$("#occupation").val("0").trigger('chosen:updated');
						$("#state").val('AP').trigger('chosen:updated');
						$("#occupation").attr('disabled', false);
						$("#newPatientName").attr('readonly', false);
						$("#patientName").attr('readonly', false);
						$("#regPatientName").attr('readonly', false);
						$("#pntDob").attr('disabled', true);
						$("#patientTitle").attr("disabled",true);
						$("#genderVal").attr("disabled",true	);
						$("#pntMaritalStatus").attr("disabled",false);
						$("#lastName").attr("disabled",true);
						$("#age").attr("readonly",false);
						
						$("#ageMonths").attr("readonly",false);
						$("#ageDays").attr("readonly",false);						
						$("#pntMobNum").attr("readonly",true);
						$("#regDt").attr("readonly",false);
						$("#village").attr("disabled",true);
						$("#careBy").attr("disabled",true);
						$("#occupation").attr("disabled",true);
						$("#maritalStatusVal").attr("disabled",true);
						$("#careByName").attr("disabled",true);
						$("#pntNationality").attr("disabled",true);
						$("#pntReligion").attr("disabled",true);
						$("#pntBloodGrp").attr("disabled",true);
						$("#refType").prop("disabled",true);
						$("#pntOccupation").attr("disabled",false);
						$("#idType").prop('disabled', true);
						$("#idNum").attr("readonly",true);
						$("#addr").prop('disabled', true);
						$("#city").prop('disabled', true);
						$("#state").prop('disabled', true);
						$("#regPatientNameText").hide();
						$("#addr").html('');
						$("#pntMobNum").attr("disabled",false);
						$("#addr").val('');
						$("#patInfoRegValidSts").text("NO");
						//$("#patInfoRegValidDt").hide();
						$("#paymentType").val('0').trigger('chosen:updated');
						$("#refType").trigger('change');
						$("#refTypeText").hide();
						$("#idLocation").attr('disabled', true);
						//$("#idDoctor").attr('disabled', true);
						//$("#idDoctor").attr('disabled', true);
			});
       	 
       	$("#newApptWise").click(function(){
       		 
	       	 $("#idRetakee").trigger('click');
			 $("#idRetake").trigger('click');
			 var src='';
			 document.getElementById("picNameId").src = src;
			 $("#picNameId").hide();
			 
			 var src='';
			 document.getElementById("picNameIdd").src = src;
			 $("#picNameIdd").hide();
			 
       		 $("#patientNameDiv").attr('hidden' , true);
			 $("#newPatientNameDiv").attr('hidden' , false);
			 $("#regPatientNameDiv").attr('hidden' , true);	
			 $("#parefTypessPortDiv").hide();
			 $("#apptPatientDetailsDiv").attr('hidden' , false);	
			 $("#regPatientDetailsDiv").attr('hidden' , true);	
			 $("#patientGender").hide();
			 $("#patInfoVisit").text('NEW VISIT');
			 $("#patVisitId").val('174');
			 $("#genderVal").show();
			 $("#patientName").val('');
			 $("#genderVal").val('');
			 $("#patinetId").val('');
			 $("#regPatientName").val('');
			 $("#patientTitleText").hide();
			 $("#maritalStatusVal").show();
			 $("#pntMaritalStatus").hide();
				$("#patientGenderText").hide();
				$("#umrDiv").hide();
				$("#patientNameText").hide();
				$("#lastNameText").hide();
				$("#pntDobText").hide();
				$("#ageText").hide();
				$("#careByText").hide();
				$("#careByNameText").hide();
				$("#babyParentText").hide();
				$("#parentNameText").hide();
				$("#pntMobNumText").hide();
				$("#refTypeText").hide();
				$("#refIdText").hide();
				$("#pntMaritalStatusText").hide();
				$("#pntNationalityText").hide();
				$("#pntReligionText").hide();
				$("#pntBloodGrpText").hide();
				$("#pntOccupationText").hide();
				$("#idTypeText").hide();
				$("#idNumText").hide();
				$("#stateText").hide();
				$("#errCity").hide();
				$("#villageText").hide();
				$("#patientCatText").hide();
				$("#pblmDescText").hide();
				$("#idLocationText").hide();
				$("#idDoctorText").hide();
				$("#scheduleDtText").hide();
				$("#specNameText").hide();
				$("#empCodeText").hide();
				$("#tokenValueText").hide();
				$("#errFee").hide();
				$("#feeDiscountText").hide();
				$("#feeDiscountAmtText").hide();
				$("#errConsFee").hide();
				$("#consDiscountText").hide();
				$("#consDiscountAmtText").hide();
				$("#totAmtText").hide();
				$("#totDiscountText").hide();
				$("#totDiscountAmtText").hide();
				$("#amountReceivedText").hide();
				$("#docSlotsDiv").hide();
				$("#patientId").val('0');
				$("#regPatientId").val('0');
				$("#suvRegPatientId").val('0');
				$("#patientTitle").val("0");
				$("#newPatientName").val('');
				$("#lastName").val('');
				$("#patientGender").val("0");
				$("#pntDob").val('');
				$("#age").val('');
				$("#careBy").val("0");
				$("#careByName").val('');
				$("#babyParent").val('');
				$("#parentName").val('');
				$("#pntMobNum").val('');
// 				$("#refType").val("0");
				$("#refId").val('');
				$("#pntMaritalStatus").val("0");
				$("#pntNationality").val("Indian");
				$("#pntReligion").val("0");
				$("#pntBloodGrp").val("0");
				$("#pntOccupation").val('');
				$("#idType").val("0");
				$("#idNum").val("");
				$("#state").val("0");
				$("#city").val("0");
				$("#village").val('');
				$("#patientCat").val("4").trigger('chosen:updated').delay(100).trigger('change');
				$("#pblmDesc").val('');
// 				$("#idLocation").val("0");
				$("#idDoctor").val("0").trigger('chosen:updated');
				$("#scheduleDt").val('');
				$("#specName").val('');
				$("#empCode").val('');
				$("#tokenValue").val('');
				$("#feeStatus").val('');
				$("#regFee").val('');
				$("#ageMonths").val('');
				$("#ageDays").val('');
				$("#discount").val('');
				$("#discountAmount").val('');
				$("#amount").val('');
				$("#consFee").val('');
				$("#consDiscount").val('');
				$("#consDiscountAmount").val('');
				$("#consAmount").val('');
				$("#totAmt").val('');
				$("#totDiscount").val('');
				$("#totDiscountAmt").val('');
				$("#billAmt").val('');
				$("#amountReceived").val('');
				$("#chngGiven").val('');
				$("#balance").val('');
				$("#status").val('');
				$("#addr").val('');
				$("#occupation").val("0").trigger('chosen:updated');
				$("#state").val('AP').trigger('chosenrefType:updated');
				$("#pntMobNum").attr("disabled",false);
				$("#pntDob").attr('disabled', false);
				$("#newPatientName").attr('readonly', false);
				$("#patientName").attr('readonly', false);
				$("#regPatientName").attr('readonly', false);
				$("#patientTitle").attr("disabled",false);
				$("#genderVal").attr("disabled",false);
				$("#pntMaritalStatus").attr("disabled",false);
				$("#maritalStatusVal").attr("disabled",false);
				$("#lastName").attr("disabled",false);
				$("#age").attr("readonly",false);
				$("#ageMonths").attr("readonly",false);
				$("#ageDays").attr("readonly",false);						
				$("#pntMobNum").attr("readonly",false);
				$("#refType").prop("disabled",false);
				$("#idLocation").attr('disabled', false);
				$("#regDt").attr("readonly",false);
				$("#pblmDesc").attr("readonly",true);
				$("#village").attr("disabled",false);
				$("#careBy").attr("disabled",false);
				$("#careByName").attr("disabled",false);
				$("#pntNationality").attr("disabled",false);
				$("#pntReligion").attr("disabled",false);
				$("#pntBloodGrp").attr("disabled",false);
				$("#occupation").attr("disabled",false);
				$("#idType").prop('disabled', false);
				$("#idNum").prop('readonly', false);
				$("#addr").prop('disabled', false);
				$("#city").prop('disabled', false);
				$("#state").prop('disabled', false);
				$("#regPatientNameText").hide();
				$("#patientNameText").hide();
				$("#patInfoRegValidSts").text("NO");
				//$("#patInfoRegValidDt").hide();
				$("#addr").html('');
				$("#paymentType").val('0').trigger('chosen:updated');
// 				$("#refType").trigger('change');
				$("#refTypeText").hide();
				//$("#scheduleDt").attr('disabled', true);
				//$("#idDoctor").attr('disabled', true);
				//$("#idDoctor").attr('disabled', true);
// 				$("#refType").val('Walk-in').trigger('chosen:updated');
				
	});
       	 
       	$("#updtPatientTitle").change(function(){
			
			//alert($("#patientTitle option:selected").val());
				if( $("#updtPatientTitle option:selected").val() == "Mr.") {
				$("#updtPatientGender").val("Male").attr("disabled",false);
				} else if ( $("#updtPatientTitle option:selected").val() == "Miss.") {
				$("#updtPatientGender").val("Female").attr("disabled",false);
				} else if($("#updtPatientTitle option:selected").val() == "Mrs.") {
					$("#updtPatientGender").val("Female").attr("disabled",false);
				} else if($("#updtPatientTitle option:selected").val() == "Baby") {							
				$("#updtPatientGender").val("Female").attr("disabled",false);
				}else if($("#updtPatientTitle option:selected").val() == "Baby Girl") {							
				$("#updtPatientGender").val("Female").attr("disabled",false);
				}else if($("#updtPatientTitle option:selected").val() == "Baby Boy") {							
				$("#updtPatientGender").val("Male").attr("disabled",false);
				}/* else if($("#updtPatientTitle option:selected").val() == "Baby Boy") {							
				$("#updtPatientGender").val("B/O").attr("disabled",false);
				} */else if($("#updtPatientTitle option:selected").val() == "Master") {							
				$("#updtPatientGender").val("Male").attr("disabled",false);
				$("#genderVal").hide();
				$("#patientGenderText").hide();
				}else if($("#updtPatientTitle option:selected").val() == "Sister") {							
					$("#updtPatientGender").val("Female").attr("disabled",true);
					$("#genderVal").hide();
				}else{
					($("#updtPatientTitle option:selected").val() == "B/O");
					$("#updtPatientGender").val("0");
					 $("#updtPatientGender").hide();
// 					 $("#genderVal").show();
				}

			//	$("#genderVal").hide();
				$("#updtPatientGender").show();
				$("#genderVal").val($("#updtPatientGender").val());
		});	
       	 
      	var regUMRNum = new Array();
			var regPatientId = {};
			var regPname = {};
			var regLname = {};
			var regDob = {};
			var regAge = {};
			var regGender = {};
			var regMobNum = {};				
			var regMartialStatus = {};				
			var regState = {};
			var regCity = {};
			var regVillage = {};
			var regVillageNames = {};
			var regOccupation = {};
			var regAddress = {};
			var regIdProof = {};	
			var regCategory = {};			
			var regRefType = {};
			var regIdNum = {};
			//Json to get UMR details
			/*  $.getJSON("/<s:message code="projectName"></s:message>/appt/getSuvarnaUmrInfo",
				function(json) {
				$.each(json.umrs, function(index, patient) {						
					regUMRNum.push(patient.regUmrNo);						
					regPatientId[patient.regUmrNo] = patient.regPatientId;
					regPname[patient.regUmrNo] = patient.regPname;						
					regLname[patient.regUmrNo] = patient.regLname;
					regDob[patient.regUmrNo] = patient.regDob;
					regAge[patient.regUmrNo] = patient.regAge;
					regGender[patient.regUmrNo] = patient.regGender;
					
					regMobNum[patient.regUmrNo] = patient.regMobNum;						
					regMartialStatus[patient.regUmrNo] = patient.regMartialStatus;						
					regState[patient.regUmrNo] = patient.regState;						
					regCity[patient.regUmrNo] = patient.regCity;
					regVillage[patient.regUmrNo] = patient.regVillage;
					regVillageNames[patient.regUmrNo] = patient.regVillageName;
					regOccupation[patient.regUmrNo] = patient.regOccupation;
					regAddress[patient.regUmrNo] = patient.regAddress;						
					regIdProof[patient.regUmrNo] = patient.regIdProof;
					regIdNum[patient.regUmrNo] = patient.regIdNum;
					regRefType[patient.regUmrNo] = patient.regRefType;						
					regCategory[patient.regUmrNo] = patient.regCategory;
					//alert(patient.regLname);
				});
			}); */ 
			
			
			
	                    /* $('#regPatientName').autocomplete({
						source : regUMRNum,
						open : function() {
							$(this).autocomplete("widget").appendTo(".regResults").css("position", "static");
							$("#oldPatDetDiv").show();
						}, select : function(event, ui) {
							var patName = ui.item.value;
						//	alert(patName);
							if (patName == '') {
								$("#regPatientNameText").html("Enter Patient name");
								$("#regPatientNameText").show();
						    } else { 
								$('#loadarModal').modal({backdrop : 'static', keyboard : false});
								$("#regPatientNameText").hide();

								if (jQuery.inArray(patName,regUMRNum) == -1) {
								//	alert("in if");
								}else $("#patientTypeId").val("old");
								//alert("in else");
						   $("#regPatientName option:selected").text(regPname[patName]);
						   //alert(regPatientId[patName]);
						    
						    $("#lastName").val(regLname[patName]);
							$("#patientId").val(regPatientId[patName]);										
							$("#pntMobNum").val(regMobNum[patName]);
							//$("#patientCat").val(regCategory[patName]); 
							$("#genderVal").val(regGender[patName]);
							$("#age").val(regAge[patName]);
							//$("#pntDob").val(regDob[patName]);
							//alert("1111"+regDob[patName]);
							//var getdob=regDob[patName].trim();
							var getdob=regDob[patName];
							//var getdob1=getdob.trim();
						 //alert("getdob"+getdob);
							/*	alert("status"+(getdob == 'undefined'));
							alert("status"+(getdob == 'undefined'));
							 
							 if(getdob !='notavailable'){
								 $("#pntDob").datepicker("setDate", new Date(regDob[patName]));
								}
							
							
							$("#pntMaritalStatus").val(regMartialStatus[patName]);
							$("#pntOccupation").val(regOccupation[patName]);
							
							//$("#refType").val(regRefType[patName]);
							$("#addr").text(regAddress[patName]);
							if(regCity[patName] == '0')
							{
							$("#city option:selected").text('Select City');
							$("#city option:selected").val('0');
							}
						else{
						$("#city option:selected").val(regCity[patName]);
						$("#city option:selected").text(regCity[patName]);
						}
							
							
						
						var url = "/<s:message code="projectName"></s:message>/city/getVillageList?city="+regCity[patName];
						$.ajax({
							url: url,
							success:function(villagesList){
					//alert(villagesList);
								$("#village").html(villagesList);	
								if(regVillage[patName] == '0')
								{
								$("#village option:selected").text('Select Village');
								$("#village option:selected").val('0');
								}
						      	else{
						      		
						      	
							$("#village option:selected").val(regVillage[patName]);
							$("#village option:selected").text(regVillageNames[patName]);
							}
							}
						});
						//alert(villageNames[patName]);
						 
						
						//alert(villageNames[patName]);
						//alert(regState[patName]);
						//$("#city > [value="+city[patName]+"]").attr("selected", "true");
						$("#state").val(regState[patName]);
						//$("#state > [value="+state[patName]+"]")patientTitle.attr("selected", "true");
					
						$("#addr").text(regAddress[patName]);
						$("#refType").val(regRefType[patName]);
						$("#patientCat").val(regCategory[patName]); //alert(patCategorys[patName]);
						$("#categoryId").val(regCategory[patName]); //alert(patCategorys[patName]);
						var categoryPat = $("#patientCat option:selected").text();
						$("#category").val($.trim(categoryPat));
					
						/* $("#refId").val(refDocDetails[patName]).trigger('chosen:updated');
						$("#otherHospId").val(otherHospIds[patName]).trigger('chosen:updated');
						$("#otherStaffId").val(otherStaffIds[patName]).trigger('chosen:updated');
						
						var refType= $("#refType option:Selected").text();
						
						$("#refDiv").hide();
						$("#otherHospDiv").hide();
						$("#otherStaffDiv").hide();
						if ($.trim(refType) === "Staff Doctors") {
							$("#refDiv").show();
						} else if ($.trim(refType) === "Other Hospitals") {
							$("#otherHospDiv").show();
						} else if ($.trim(refType) === "Other Staff") {
							$("#otherStaffDiv").show();
						}
					
						
						
							$("#idType").val(regIdProof[patName]);
							$("#idNum").val(regIdNum[patName]);
							$("#regDivSts").val("0");
					        $('#loadarModal').modal('hide');
					        
					        
					        var url = "/<s:message code="projectName"></s:message>/patient/getPatientRegValiityFee?"
							+ "patientId=" + regPatientId[patName] + "&pntCat=" + $("#patientCat").val() 
							+ "&locId=" + $("#idLocation").val();
					//alert(url);
					$.ajax({
						url : url,
						success : function(regFeeResponse) {
							//alert("respose " + mrViewInter);
							var data = regFeeResponse.split("^");
							//alert(data);
							$("#regFee").val(data[0]);
							$("#discount").val("0.00");
							$("#discountAmount").val("0.00");
							$("#amount").val("0.00");
							
							if (data[1] == "1") {
								$("#regFeeDiv").show();  /* comment removed for this line on 21 june 2019 by saiprabhu 
								$("#feeStatus").val("REG");
								
								$("#regDivSts").val("1");
								
								$("#patInfoRegValidSts").text("NO");
							} else {
								//$("#regFeeDiv").hide();  /* comment  for this line on 21 june 2019 by saiprabhu 
								$("#feeStatus").val(null);
								
								$("#regDivSts").val("0");

								$("#patInfoRegValidSts").text("YES");
							}
							
							
							$("#patInfoRegValidDt").text(data[2]);
							//alert($("#idDoctor option:selected").val());
							var docDetails = $("#idDoctor option:selected").val().split(":");
							var docId = docDetails[0];
							$("#empCode").val(docDetails[1]);
							$("#specName").val(docDetails[2]);
							
							var locId = $("#idLocation option:selected").val();
							
							var patientIdOld = $("#patientId").val();
							var dateText = $("#scheduleDt").val();
							var patientCategoryOld;
							//alert(patientId);
							if (patientIdOld == 0) {
								//	alert("if")
								patientCategoryOld = $("#patientCat option:selected").val();
							} else {
								//	alert("else")
								patientCategoryOld = $("#categoryId").val();
							}
							
							calculateFinalBillAmt(1, 0, 0, 0);
							
							//getConsultationFeeDetails(docId, locId,patientCategory);
							
							if (docId != "0" && locId != "0" && dateText != "" && patientCategoryOld != "0") {
								getConsultationFee(docId, locId, dateText, patientIdOld, patientCategoryOld);
							}

						}, error : function(jqXhr, textStatus,errorThrown) {
							alert("in error part");
						}
						
					});
						
				    }
				}
			});  */
		    var cashAmount=$("#cashAmnt").click(function(){
				//alert(cashAmount+"==cashAmount");
				$("#cashAmntText").show();
				$('#cashAmnt').val('');
			});
			
			var chequeAmount=$("#chequeAmnt").click(function(){
				//alert(cashAmount+"==cashAmount");
				$("#chequeAmountText").show();
				$('#chequeAmnt').val('');
			});
			
			var creditAmount=$("#creditAmnt").click(function(){
				//alert(creditAmount+"==creditAmount");
				$("#creditAmntText").show();
				$('#creditAmnt').val('');
			});
			
			var phonePayAmt=$("#upiAmnt").click(function(){
				//alert(phonePayAmt+"==phonePayAmt");
				$("#upiAmntText").show();
				$('#upiAmnt').val('');
			});
		 	
		  
		    const amountFields = document.querySelectorAll('input[name="cashAmnts"]');

		    amountFields.forEach(function(field) {
		      field.addEventListener('keyup', function() {
		        const enteredValue = parseFloat(field.value) || 0.00; // Handle empty input as 0.00

		        amountFields.forEach(function(otherField) {
		          if (otherField !== field) {
		            if (otherField.value === "") {
		              // If the other field is empty, keep it at 0
		              otherField.value = 0; // Set to 0 (numeric value)
		            } else {
		              // If another field already has a value, don't reset it
		            }
		          } else {
		            // Update the clicked field with the entered value, limiting to 2 decimal places (optional)
		            field.value = enteredValue; // Use this for 2 decimal places
		          }
		        });
		      });
		    });
		    
		    
		    $("#creditPt").change(function() {
		    	var creditPt = $("#creditPt").val();
// 		    	alert(creditPt);
		    	
		    	if(creditPt == 275){
		    		$(".cardTypeeee").hide();
		    		$(".cardNOOOOOOOO").hide();
		    		$(".cardBankExpireDt").hide();
		    		$(".cardBankNameeee").hide();
		    		 $("#addPaymentTd").hide();
		    		 $("#creditAmount").val('0.00');
		    	}else if(creditPt == 276){
		    		$(".cardTypeeee").show();
		    		$(".cardNOOOOOOOO").show();
		    		$(".cardBankExpireDt").show();
		    		$(".cardBankNameeee").show();
		    		 $("#addPaymentTd").hide();
		    		 $("#creditAmount").val('0.00');
		    	}else{
		    		$(".cardTypeeee").hide();
		    		$(".cardNOOOOOOOO").show();
		    		$(".cardBankExpireDt").hide();
		    		$(".cardBankNameeee").hide();
		    		 $("#addPaymentTd").hide();
		    		 $("#creditAmount").val('0.00');
		    	}
		    });
		     $("#addPayments").click(function(e){
				 e.preventDefault();
				 var creditPtId = $("#creditPt").val();
				 var creditPt = $("#creditPt option:selected").text();
				 var creditAmount = $("#creditAmount").val();

				 var billAmt=$("#billAmt").val();
				 var cardcardType = $("#cardcardType").val();
				 var creditNo = $("#creditNo").val();
				 var cardBankName = $("#cardBankName").val();
				 var cardcardTypeNmae = $("#cardBankName option:selected").text();
				 var creditDate = $("#creditDate").val();
				
				 if (creditAmount == '' || creditAmount == '0.00') {
				        $("#creditAmountText").show().text("Enter Credit Amount");
				        return;
				    }
				    
				    if (creditPtId == '0') {
				        $("#ccreditPtText").show().text("Select Cash Mode");
				        return;
				    }
				    
				    if (creditPtId == 276) {
				        if (cardcardType == '0') {
				            $("#creditCardTypeText").show().text("Enter Card Type");
				            return;
				        }
				        
				        if (creditNo == '') {
				            $("#creditChqCardNoText").show().text("Enter Credit No");
				            return;
				        }

				        if (cardBankName == '0') {
				            $("#chqBankNameText").show().text("Enter Bank Name");
				            return;
				        }

				        if (creditDate == '') {
				            $("#creditDateText").show().text("Enter Credit Date");
				            return;
				        }
				    } else if (creditPtId == 277) {
				        if (creditNo == '') {
				            $("#creditChqCardNoText").show().text("Enter Trans Id");
				            return;
				        }
				    } 
				/*     var appendedValues = []; 
				    $(".creditPts").each(function(invDiscIndex){
					     var creditPts = parseFloat($(this).val());
// 					     alert(creditPts);
					     
					     // Check if the value has already been appended
					     if (appendedValues.indexOf(creditPts) === -1) {
					    	 
					    	 $('#alertModal').modal('show');
							    $('#alertMsg').text("please enter valid amount");
						         // Stops the .each loop and prevents further processing
							  
						         $("#manii").val(09);
					     }
					 }); */
				   
				    if(creditPtId == 275){
    	      			serviceId = 0;
				 
					$("#payModeTable tfoot").append(
							'<tr class="labinvTable">'
							+ '<td align="left">'+creditPt +'<input type="hidden" name="creditPts" class="creditPts form-control res" style="text-align: right;" value="'+ creditPtId +'" ></td>'
							+ '<td align="left">'+creditAmount +'<input type="hidden" name="creditAmounts" class="creditAmounts form-control res" style="text-align: right;" value="'+ creditAmount +'" ></td>'
							+ '<td align="left"><input type="hidden" name="cardcardTypes" class="cardcardTypes form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="left"><input type="hidden" name="creditNoss" class="creditNoss form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="left"><input type="hidden" name="cardBankNamess" class="cardBankNamess form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="left"><input type="hidden" name="creditDates" class="creditDates form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="center"><i class="glyphicon glyphicon-trash productDeleteInter" data-toggle="tooltip" title="Delete Product" style="color: red; cursor: pointer;"></i><input type="hidden" class="removeInter" value="0"></td>'
							+ '</tr>');
					serviceId++;
				} else if(creditPtId ==276){
					serviceId = 0;
					 
					$("#payModeTable tfoot").append(
							'<tr class="labinvTable">'
							+ '<td align="left">'+creditPt +'<input type="hidden" name="creditPts" class="creditPts form-control res" style="text-align: right;" value="'+ creditPtId +'" ></td>'
							+ '<td align="left">'+creditAmount +'<input type="hidden" name="creditAmounts" class="creditAmounts form-control res" style="text-align: right;" value="'+ creditAmount +'" ></td>'
							+ '<td align="left">'+cardcardType +'<input type="hidden" name="cardcardTypes" class="cardcardTypes form-control res" style="text-align: right;" value="'+ cardcardType +'" ></td>'
							+ '<td align="left">'+creditNo +'<input type="hidden" name="creditNoss" class="creditNoss form-control res" style="text-align: right;" value="'+ creditNo +'" ></td>'
							+ '<td align="left">'+cardcardTypeNmae +'<input type="hidden" name="cardBankNamess" class="cardBankNamess form-control res" style="text-align: right;" value="'+ cardBankName +'" ></td>'
							+ '<td align="left">'+creditDate +'<input type="hidden" name="creditDates" class="creditDates form-control res" style="text-align: right;" value="'+ creditDate +'" ></td>'
							+ '<td align="center"><i class="glyphicon glyphicon-trash productDeleteInter" data-toggle="tooltip" title="Delete Product" style="color: red; cursor: pointer;"></i><input type="hidden" class="removeInter" value="0"></td>'
							+ '</tr>');
					serviceId++;
				}else if(creditPtId ==277){
					serviceId = 0;
					 
					$("#payModeTable tfoot").append(
							'<tr class="labinvTable">'
							+ '<td align="left">'+creditPt +'<input type="hidden" name="creditPts" class="creditPts form-control res" style="text-align: right;" value="'+ creditPtId +'" ></td>'
							+ '<td align="left">'+creditAmount +'<input type="hidden" name="creditAmounts" class="creditAmounts form-control res" style="text-align: right;" value="'+ creditAmount +'" ></td>'
							+ '<td align="left"><input type="hidden" name="cardcardTypes" class="cardcardTypes form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="left">'+creditNo +'<input type="hidden" name="creditNoss" class="creditNoss form-control res" style="text-align: right;" value="'+ creditNo +'" ></td>'
							+ '<td align="left"><input type="hidden" name="cardBankNamess" class="cardBankNamess form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="left"><input type="hidden" name="creditDates" class="creditDates form-control res" style="text-align: right;" value="" ></td>'
							+ '<td align="center"><i class="glyphicon glyphicon-trash productDeleteInter" data-toggle="tooltip" title="Delete Product" style="color: red; cursor: pointer;"></i><input type="hidden" class="removeInter" value="0"></td>'
							+ '</tr>');
					serviceId++;
				}
					
				 
				
		    		
					$("#creditPt").val(0).trigger("chosen:updated").val(0).trigger('change');
					$("#creditAmount").val('0.00');
	        	    $("#cardcardType").val(0).trigger("chosen:updated").val(0).trigger('change');
					$("#creditNo").val('');
					 $("#cardBankName").val(0).trigger("chosen:updated").val(0).trigger('change');
					$("#creditDate").val(' ');
				 
				 finalCal();
				
				 finalCal();
				 toggleAuthorizedBy();   
				  //  $("#totalBillDiscAmt").text(totalBillDiscAmt.toFixed(2)); 

				
				
				
				
				
			}); 
			
		     $(document).ready(function () {
		    	    toggleAuthorizedBy();
		    	});
			 $("#creditAmount").keyup(function() {
				 var creditAmount = $("#creditAmount").val();
				 $("#creditAmountText").hide();
					if (creditAmount == '0') {
	     	    		//$("#chqBankNameText").show();
	        	      	//$("#chqBankNameText").html("Enter Bank Name");
					}else{
						$("#creditAmountText").hide();
					}
				});
               $("#paymentsTffotAmm").on('click','.productDeleteInter',function(){	
		 		var par = $(this).parent().parent(); 
					par.remove();
		 	    var amountReceived = $("#amountReceived").val();
		 	 //  alert(amountReceived);
		 	   var totAmt = $("#totAmt").val();
			 	//alert(totAmt);
		 		 
		 		var balance = $("#balance").val();



		 		
		 		var creditAmounts= $(this).closest('tr').find(".creditAmounts").val();
		 		var t=parseFloat(amountReceived)-parseFloat(creditAmounts);
		 		$("#amountReceived").val(t.toFixed(2));
		 		
		 		var tt=parseFloat(creditAmounts)+parseFloat(balance);
		 		$("#balance").val(tt.toFixed(2));
		 		
		 		var balance = $("#balance").val();
		 		if (balance !== '0.00' && balance !== '0' && balance !== '') {
		 		    $("#status").val("pending");
		 		} else {
		 		    $("#status").val("paid");
		 		}
		 		
		 		toggleAuthorizedBy();
		 	});
		    $("#creditPt").on("change",function() {
				var creditPt = $("#creditPt").val();
				//alert(idNum);
     	    	$("#ccreditPtText").hide();
				if (creditPt == '0') {
     	    	//	$("#ccreditPtText").show();
//         	      	$("#ccreditPtText").html("Enter Card Mode");
				}else{
					$("#ccreditPtText").hide();
				}
			});
		   
		    function  finalCal(){
			
			 var finalDiscInvAmts =0.00;
			 var finalTotAmt = 0.00;
			 var t = 0;
			

			
				$(".creditAmounts").each(function(invDiscIndex){
					 var billAmt = $("#billAmt").val();
					    var creditAmount = parseFloat($(this).val());
					    
					    // Check if the credit amount is a positive number and accumulate
					    if (creditAmount > 0) { 
					        t += creditAmount; // Add creditAmount to the total sum
					    }
// 					alert("............."+t);
				/* 	
					
	 				alert(creditAmount);
					var t=parseFloat(creditAmount);
					alert(t); */
					if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
				       this.value = this.value.replace(/[^0-9\.]/g, '');
				       $("#creditAmountText").show();
					   $("#creditAmountText").text("Enter numbers only ");
				    }else if(billAmt >= t){
						$("#amountReceived").val(t.toFixed(2));
						$("#amountReceived").trigger('keyup');
						$("#creditAmountText").hide();
					}else{
						//$("#amountReceived").val('0.00');
						$('#alertModal').modal('show');
					    $('#alertMsg').text("please enter valid amount");
				        $("#creditAmountText").show();
						$('#creditAmount').val('0.00');
						//$("#creditAmountText").html("please enter valid amount");
					}
					
					}); 
		    }
		    /* $('#creditAmount').keyup(function () {
				//alert();
				var billAmt=$("#billAmt").val();
				var creditAmount=$(this).val();
// 				alert(creditAmount);
				var t=parseFloat(creditAmount);
				//alert(t);
				if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			       this.value = this.value.replace(/[^0-9\.]/g, '');
			       $("#creditAmountText").show();
				   $("#creditAmountText").text("Enter numbers only ");
			    }else if(billAmt >= t){
					$("#amountReceived").val(t.toFixed(2));
					$("#amountReceived").trigger('keyup');
					$("#creditAmountText").hide();
				}else{
					//$("#amountReceived").val('0.00');
								$('#alertModal').modal('show');
								    $('#alertMsg').text("please enter valid amount");
			        $("#creditAmountText").show();
					$('#creditAmount').val('0.00');
					//$("#creditAmountText").html("please enter valid amount");
				}
			
				
			});
			 */
			 
				
			/* 	var duePaid = "0.00";
				var dueamtadjust = "0.00";
				var debounceTimer;

				// Attach debounced function to the keyup event
				$(".payModeTableee").on('keyup', '.amount', function () {
				    // Clear previous debounce timer.
				    //alert("in paymodetable");
				    clearTimeout(debounceTimer);

				    // Set a new debounce timer
				        debounceTimer = setTimeout(function () {
				        var pharDueAmt = $("#balance").val();
				        alert(pharDueAmt);
				        var cashAmount = $("#creditAmount").val();
				        alert(cashAmount);
				        if(dueamtadjust=="0.00"){
							//alert("in iffff");
							$("#adjustAmtdue").val(pharDueAmt);
							duePaid = parseFloat(pharDueAmt) - (parseFloat(cashAmount));
							dueamtadjust=duePaid;
						}else if(parseFloat(duePaid) > 0.00){
							
						//alert(dueamtadjust+"==================dueamtadjust");
							//alert("in else iffff");
						duePaid = parseFloat($("#adjustAmtdue").val()) - (parseFloat(cashAmount));
						alert(duePaid+"==================duePaid");
						}else{
							
							//alert(dueamtadjust+"==================Else dueamtadjust");
				         	//alert("in else");
							duePaid = parseFloat($("#adjustAmtdue").val()) - (parseFloat(cashAmount) );
							//alert(duePaid+"==================Else duePaid");
						}

				      //  alert(duePaid+"==================outSide duePaid");
				        // Ensure duePaid is not negative
				        duePaid = Math.max(0, duePaid);

				        $("#balance").val(duePaid);
				    }, 300); // Adjust the debounce time as needed (e.g., 300 milliseconds)
				}); */
				
				var duePaid = "0.00";
				var dueamtadjust = "0.00";
				var debounceTimer;

				$(".payModeTableee").on('keyup', '.amount', function (e) {
				    clearTimeout(debounceTimer);
				    $("#addPaymentTd").show();
				        debounceTimer = setTimeout(function () {
				        	var totalPaid = 0;  // Initialize total paid to 0 (assuming it's being updated dynamically)
							//var pharDueAmt = $("#dueAmt").val();


						var pharDueAmt = parseFloat($("#balance").val()); 
						//var billAmt = parseFloat($("#billAmt").val()) || 0;// Get the balance amount from the input field
						var cashAmount = parseFloat($("#creditAmount").val());  // Get the paid amount from the input field
						
						if (isNaN(pharDueAmt) || isNaN(cashAmount)) {
						    $('#alertModal').modal('show');
						    $('#alertMsg').text("Invalid input. Please enter valid numeric values.");
						    
						} else {
						    totalPaid += cashAmount;  // Adding the new payment to the total paid
						
						    if (totalPaid === pharDueAmt) {
						    } else if (totalPaid > pharDueAmt) {
						    	 $("#addPaymentTd").hide();
						    	$('#alertModal').modal('show');
							    $('#alertMsg').text("You have paid more than the balance. Overpayment of " + (totalPaid - pharDueAmt));
							   
							    $('#creditAmount').val('0.00');
							   
						    } else {
						    }
						}

						if(e.which == 13 && cashAmount!='' && cashAmount!=0 ) {
						      // alert('You pressed enter!');
						        $("#payModeTable #addPayments").trigger('click');
						    }




				    }, 300); // Adjust the debounce time as needed (e.g., 300 milliseconds)
				});
				
			var creditAmount=$("#creditAmount").click(function(){
				  $("#creditAmountText").show();
				  $('#creditAmount').val('');
				//comment by manikanta datti
				//  $('#creditAmount').val('0').trigger('click');
			});
		  
			
			/* $("#creditAmount").val('0.00');
			$("#upiAmount").val('0.00');
			$("#chequeAmount").val('0.00');
			$("#cashAmount").val('0.00');
			
			$('#cashAmount').keyup(function () {
				//alert();
				var billAmt=$("#billAmt").val();
				var cashAmount=$(this).val();
				var creditAmount=$("#creditAmount").val();
				var upiAmount=$("#upiAmount").val();
				var chequeAmount=$("#chequeAmount").val();
				
				
				
					var t=parseFloat(cashAmount)+parseFloat(creditAmount)+parseFloat(upiAmount)+parseFloat(chequeAmount);
					//alert(t);
					if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
				       this.value = this.value.replace(/[^0-9\.]/g, '');
				       $("#cashAmountText").show();
					   $("#cashAmountText").text("Enter numbers only ");
				    }else if(billAmt >= t){
						$("#amountReceived").val(t.toFixed(2));
						$("#amountReceived").trigger('keyup');
						$("#cashAmountText").hide();
					}else{
						//$("#amountReceived").val('0.00');
						
						$("#cashAmountText").show();
						$('#cashAmount').val('0.00');
					}
			});
			
			
			var cashAmount=$("#cashAmount").click(function(){
				//alert(cashAmount+"==cashAmount");
				$("#cashAmountText").show();
				$('#cashAmount').val('0');
			});
			
			
			$('#creditAmount').keyup(function () {
				//alert();
				var billAmt=$("#billAmt").val();
				var creditAmount=$(this).val();
				var cashAmount=$("#cashAmount").val();
				var upiAmount=$("#upiAmount").val();
				var chequeAmount=$("#chequeAmount").val();
				

				
				
				var t=parseFloat(cashAmount)+parseFloat(creditAmount)+parseFloat(upiAmount)+parseFloat(chequeAmount);
				//alert(t);
				if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			       this.value = this.value.replace(/[^0-9\.]/g, '');
			       $("#creditAmountText").show();
				   $("#creditAmountText").text("Enter numbers only ");
			    }else if(billAmt >= t){
					$("#amountReceived").val(t.toFixed(2));
					$("#amountReceived").trigger('keyup');
					$("#creditAmountText").hide();
				}else{
					//$("#amountReceived").val('0.00');
								$('#alertModal').modal('show');
								    $('#alertMsg').text("please enter valid amount");
			        $("#creditAmountText").show();
					$('#creditAmount').val('0.00');
					//$("#creditAmountText").html("please enter valid amount");
				}
			
				
			});
			
			var creditAmount=$("#creditAmount").click(function(){
				  $("#creditAmountText").show();
				  $('#creditAmount').val('0');
				//comment by manikanta datti
				//  $('#creditAmount').val('0').trigger('click');
			});
			
			
			$('#upiAmount').keyup(function () {
				//alert();
				var billAmt=$("#billAmt").val();
				var upiAmount=$(this).val();
				var creditAmount=$("#creditAmount").val();
				var cashAmount=$("#cashAmount").val();
				var chequeAmount=$("#chequeAmount").val();
				
				
				var t=parseFloat(cashAmount)+parseFloat(creditAmount)+parseFloat(upiAmount)+parseFloat(chequeAmount);
				//alert(t);
				if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			       this.value = this.value.replace(/[^0-9\.]/g, '');
			       $("#upiAmountText").show();
				   $("#upiAmountText").text("Enter numbers only ");
			    }else if(billAmt >= t){
					$("#amountReceived").val(t.toFixed(2));
					$("#amountReceived").trigger('keyup');
					$("#upiAmountText").hide();
				}else{
				//$("#amountReceived").val('0.00');
					$("#upiAmountText").show();
					$('#upiAmount').val('0.00');
					$('#alertModal').modal('show');
				    $('#alertMsg').text("please enter valid amount");
					//$("#upiAmountText").html("please enter valid amount");
					
				}
				
			});
			
			var upiAmount=$("#upiAmount").click(function(){
				$("#upiAmountText").show();
				$('#upiAmount').val('0');
				//comment by manikanta datti
				//$('#upiAmount').val('0').trigger('click');
			});
			
			$('#chequeAmount').keyup(function () {
				//alert();
				var billAmt=$("#billAmt").val();
				var chequeAmount=$(this).val();
				var creditAmount=$("#creditAmount").val();
				var cashAmount=$("#cashAmount").val();
				var upiAmount=$("#upiAmount").val();
				
				
				var t=parseFloat(cashAmount)+parseFloat(creditAmount)+parseFloat(upiAmount)+parseFloat(chequeAmount);
				//alert(t);
				 if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
			       this.value = this.value.replace(/[^0-9\.]/g, '');
			       $("#chequeAmountText").show();
				   $("#chequeAmountText").text("Enter numbers only ");
			    }else if(billAmt >= t){
					$("#amountReceived").val(t.toFixed(2));
					$("#amountReceived").trigger('keyup');
					$("#chequeAmountText").hide();
				}else{
					//$("#amountReceived").val('0.00');
					$("#chequeAmountText").show();
					$('#chequeAmount').val('0.00');
					$('#alertModal').modal('show');
				    $('#alertMsg').text("please enter valid amount");
					//$("#chequeAmountText").html("please enter valid amount");
					
				}
				
			
			}); */
			
			$('#creditChqCardNo').keyup(function () {
				if(creditChqCardNo!=0)
					{
					//$("#creditChqCardNo").show();
					
					$("#creditChqCardNoText").hide();
					
					}
					
			});
			 $("#creditBankCard").change(function() {
				if(creditBankCard!=' '){
					$("#creditBankNameText").hide();
					}
				
			});
				var mobNoRegx = /^[6789]\d{9}$/;
		/* 	var mobNoRegx =/[1-9]{1}[0-9]{9}/; */
			$("#upiMobNo").on("keyup",function() {	
				var upiMobNo = $("#upiMobNo").val();
						//alert(upiMobNo);
     	    	$("#upiMobNoText").hide();
     	    	
				if (upiMobNo == "") {
					//alert(1);
					$("#upiMobNoText").show();
        	      	$("#upiMobNoText").html("Enter Mobile No.");
				}
				/* else if (upiMobNo.length>10){ 
					$("#upiMobNo").val("");
					$("#upiMobNoText").show();
        	      	$("#upiMobNoText").html("Enter Correct Mobile No.");
				} */
				
				else if(!(mobNoRegx.test(upiMobNo))) {
     	    		//alert(2);
					$("#upiMobNoText").show();
				
        	    	$("#upiMobNoText").html("Enter valid Mobile No.");
        	   	}
					
			});
			 
				 $("#upiBankCard").change(function() {
					if(upiBankCard!=' ')
						{
						$("#upiBankNameText").hide();
						}
					
				});
				 
				 $('#chequeChqCardNo').keyup(function () {
						if(chequeChqCardNo!=0)
							{
							
							$("#chequeChqCardNoText").hide();
							
							}
							
					});
					 $("#chequeBankCard").change(function() {
						if(chequeBankCard!=' ')
							{
							$("#chqBankNameText").hide();
							}
						
					});
					 $('#upiDate').keyup(function () {
							if(upiDate!=' ')
								{
								$("#upiDateText").hide();
								
								}
								
						});
					 $('#chequeChqDate').keyup(function () {
							if(chequeChqDate!=' ')
								{
								$("#chequeChqDateText").hide();
								
								}
								
						});
					 
					 var disStaffId=$("#disStaffId").val();
					 $("#disStaffId").keyup(function () {
							if(disStaffId !=' ')
								{
								$("#disStaffIdText").hide();
								}
								
							
						});
					 $("#creditDate").keyup(function () {
							if(creditDate !=' ')
								{
								$("#creditDateText").hide();
								}
								
						});
		
					 var today = new Date();
						date = new Date(today.getFullYear(), today.getMonth(),1);
						$("#creditDate").datepicker({
						 	startView: "months",
							minViewMode:"months", 
							format: "M-yyyy",
							autoclose: true,
							todayHighlight: true,
							orientation: "bottom auto",
							 startDate: date

						}); 
				  		
			/*  $("#creditDate").monthpicker({pattern: 'yyyy-mm', 
				  		    selectedYear: 2017,
				  		    startYear: 2017,
				  		    finalYear: 2050,});
				  			var options = {
				  		    selectedYear: 2017,
				  		    startYear: 2017,
				  		    finalYear: 2050,
				  		    openOnFocus: true // Let's now use a button to show the widget
				  		};	
				  			  */
				 $(".vitals").click(function() {
						//alert(1);

						$("#vitalsModal").modal('show');

						});
				  			  
				  			var charRegex = /^[^\s][a-zA-Z .]*$/;
							var numberRegex = /^[^-\s][0-9]*$/;
							var numberRegexExpression = /^[^-\s][0-9 .00]*$/;
							var varcharRegex = /^[a-zA-Z0-9\s-]+$/;
							var AlphacharRegex = /^[a-zA-Z .]*$/;
							var numvarcharRegex = /^[a-zA-Z0-9]*$/;
							var specialChar = /^[a-zA-Z .]+\s/;
							
							//keyup() function On "#allergyName" - Used to validate the allergyName.
							$("#allergyName").on("keyup",function() {
								var allergyName = $("#allergyName").val();
								//alert(allergyName);
				     	    	$("#allergyIdText").hide();
								if (allergyName == '0') {
				     	    		$("#allergyIdText").show();
				        	      	$("#allergyIdText").html("Select allergy name ");
								} else if (numberRegex.test(allergyName)) {
				     	    		$("#allergyIdText").show();
				        	    	$("#allergyIdText").html("Select valid allergy name");
								}
								if (allergyName != '0') {
									$("#allergyIdText").hide();
								}
							});
							
							//keyup() function On "#allergyNote" - Used to validate the allergyNote.
							$("#allergyNote").on("keyup",function() {
								var allergyNote = $("#allergyNote").val();
								//alert(allergyNote);
				     	    	$("#allergyNoteText").hide();
								if (allergyNote == '0') {
				     	    		$("#allergyNoteText").show();
				        	      	$("#allergyNoteText").html("Enter allergy Note ");
								} else if (numberRegex.test(allergyNote)) {
				     	    		$("#allergyNoteText").show();
				        	    	$("#allergyNoteText").html("Enter valid allergy Note");
								}
								if (allergyNote != '0') {
									$("#allergyNoteText").hide();
								}
							});	
							
							$("#allergyReaction").on("keyup",function() {
								if (allergyReactionId != '0') {
									$("#allergyReactionText").hide();
								}
							});
							
							$("#allergyType").on("keyup",function() {
								if (allergyTypeId != '0') {
									$("#allergyTypeText").hide();
								}
							});
							
							function validateInputss(input) {
								  // Ensures exactly 6 digits and all numeric characters
								  return /^\d{16}$/.test(input);
								}
							
							$("#oneCreditChqCardNo").keyup(function() {
								  var cashtt = $(this).val().trim();

								  if ((!validateInputss(cashtt)) || (!(numberRegex.test(cashtt)))) {
								    $("#oneCreditChqCardNoText").show().text("Please enter a 16-digits.");
								  } else {
									    // Optional: Success message or further processing
									    $("#oneCreditChqCardNoText ").hide(); // Hide the message on successful validation
									  }
							});
							
							
							
							
						
								$("#upiChqCardNo").keyup(function() {
								  var cashtt = $(this).val().trim();
						   //alert("cashtt....."  +cashtt);
								  if (!validateInput(cashtt)) {
								    
									 // alert("in ifffffffff");
									  $("#upiChqCardNoText").show().text("Please enter a 6-digit transaction number.");
								  } else {
								    // Optional: Success message or further processing
								    //alert("in elseeeeeee");
								    $("#upiChqCardNoText").hide(); // Hide the message on successful validation
								  }
								});
							
							
							
							
							
							
							function validateInput(input) {
								  // Ensures exactly 6 digits and all numeric characters
								  return /^\d{6}$/.test(input);
								}
							
							function validateInputAmmm(input) {
								  // Ensures exactly 12 digits and all numeric characters
								  return /^\d{6}$/.test(input);
								}
						/* 	$("#creditNo").keyup(function() {
								  var cashtt = $(this).val().trim();
						   //alert("cashtt....."  +cashtt);
								  if (!validateInputAmmm(cashtt)) {
								    
									 // alert("in ifffffffff");
									  $("#creditChqCardNoText").show().text("Please enter Only Numbers.");
								  } else {
								    // Optional: Success message or further processing
								    //alert("in elseeeeeee");
								    $("#creditChqCardNoText").hide(); 
								  }
								}); */
								$("#oneUpiChqCardNo").keyup(function() {
								  var cashtt = $(this).val().trim();
						   //  alert("cashtt....."  +cashtt);
								  if (!validateInput(cashtt)) {
								    $("#oneUpiChqCardNoText").show().text("Please enter a 6-digit transaction number.");
								  } else {
								    // Optional: Success message or further processing
								    $("#oneUpiChqCardNoText").hide(); // Hide the message on successful validation
								  }
								});
							
							
							
				  			  
				 //Janardhan's code used for showing allergy modal popup window
				 
				// $(".allergy").click(function() {
					 $("#patientInfo").on('click','.allergy',function(event) {
			//	 alert(1111);
					 var rowCount = '0';
				//	 alert("allergyModal show");
				//	 alert("rowCount = "+rowCount);		
					 	

					     
					   $("#allergyModal").modal('show');  
					   //var visitId = $(this).closest('tr').find(".visitId").val();
							var patientCode = $(this).closest('tr').find(".patientCode").val();
							var patientId = $(this).closest('tr').find(".patientId").val();
							var visitId = $(this).closest('tr').find(".visitId").val();
						//alert("visitId = "+visitId);
							var patientName = $(this).closest('tr').find(".patientName").val();
							$("#allergyModal .patientId").val(patientId);
							$("#allergyModal .visitId").val(visitId);
							$("#allergyModal .patientCode").val(patientCode);
							$("#allergyModal .patientName").val(patientName);
						//	alert("Patient-id: "+patientId);
							$("#deleteConfirmAllergy #patientIds").val(patientId);
							
						//	alert("patientId = "+patientId);
							
						//	event.preventDefault();
						//alert(2);
					    //$('#loadarModal').modal({backdrop : 'static', keyboard : false});
						//var apptId = $(this).closest('tr').find('.apptId').val();	
						//var patientId = $(this).closest('tr').find('.patientId').val();	
						
						//alert("pntId/apptId-----"+patientId+"/"+patApptId);
						
						var url = "/<s:message code="projectName"></s:message>/patient/getAllergies?patientId="
						+ patientId;
					//	alert(url);
					    var rowCount = $("#allergiesListTable tr").length;
					//    alert("rowCount = "+rowCount);
					    
					//    for(let i=0; i<rowCount-2; i++){
					//    	$("#allergiesListTable tbody").remove();
					//    }
					    
					    for(let i=0; i<rowCount-2; i++){
					//    	alert("rowCount-i-1 = "+(rowCount-i-1));
					    	document.getElementById("allergiesListTable").deleteRow(rowCount-i-1);
						}
					    
					    
						$.ajax({
						url : url,
						success : function(response) {
					//		alert("Response = "+response);
								$("#allergiesListTable tbody").append(response);
								var rowCount_append = $("#allergiesListTable tr").length;
					//			alert("rowCount_append = "+rowCount_append);
						//if(dat[0]==1){
							/*  var data = dat[1].split(",");
							 alert("data = "+data);
							$("#allergyModal #allergyType").val(data[0]).trigger('chosen:updated');
							alert("allergyType = "+allergyType);
							$("#allergyModal #allergyName").val(data[1]);
							alert("allergyName = "+allergyName);
							$("#allergyModal #allergyReaction").val(data[2]).trigger('chosen:updated');
							alert("allergyReaction = "+allergyReaction);
							$("#allergyModal #allergyNote").val(data[3]);
							alert("allergyNote = "+allergyNote); */
						//	}else{
								
						//	}
							$('#loadarModal').modal('hide');
                            }
						
						});
						
						
						
				//		modalFree(); 
						
						
				//		alert("rowCount = "+rowCount);
                            
						});
				 
				 
				 $("#allergyCancels").click(function() {
						//alert(1);
						$("#allergyModal").modal('hide');
						});
				 
				 
		
	          	
	          	var count = 0;
	          //click() on #addAllergy used to hide all the drug details
				$("#allergyModal").on('click', '#addAllergy', function() {
					//alert(1);
					$("#allergyIdText").hide();
					$("#allergyTypeText").hide();
					$("#allergyReactionText").hide();
									
					var allergyId = $("#allergyId").val();
			//		alert("allergyId = "+allergyId);
					var allergyName = $("#allergyName").val();
			//		alert("allergyName = "+allergyName);
					var allergyTypeId = $("#allergyType").val();
					var allergyType = $("#allergyType option:selected").text();
			//		alert("allergyType = "+allergyType);
					var allergyReactionId = $("#allergyReaction").val();
					var allergyReaction = $("#allergyReaction option:selected").text();
			//		alert("allergyReaction = "+allergyReaction);
					var allergyNote = $("#allergyNote").val();
			//		alert("allergyNote = "+allergyNote);
					var patientId = $(".patientId").val();
			
						if (allergyTypeId == '0') {
							$("#allergyTypeText").show();
							$("#allergyTypeText").text("Select Allergy Type");
						} else if (allergyName == "") {
							$("#allergyIdText").show();
							$("#allergyIdText").text("Select Allergy Name");
						} else if (allergyReactionId == '0') {
							$("#allergyReactionText").show();
							$("#allergyReactionText").text("Select Reaction");
						} else {
							$("#tabAllergyStat").val("1");
							$("#patientId").val(patientId);
						//	alert("In table append & patientId is "+patientId);
							var allergyId = 0;
							count++;

							$("#allergyModal #allergiesListTable").append('<tr>'
								+ '<td>'+ allergyType
									+ '<input type="hidden" name="allergyTypeIds" value="' + allergyTypeId + '" class="form-control allergyTypeIds" />'
								+ '</td>'
                            	+ '<td>'+ allergyName
									+ '<input type="hidden" name="allergyIds" value="' + allergyId + '" class="form-control allergyIds" />'
									+ '<input type="hidden" name="allergyNames" value="' + allergyName + '" class="form-control allergyNames" />'
								+ '</td>'
								+ '<td>'+ allergyReaction
									+ '<input type="hidden" name="allergyReactions" value="' + allergyReactionId + '" class="form-control allergyReactions" />'
								+ '</td>'
								+ '<td>'
									+ '<textarea name="allergyNotes" class="form-control allergyNotes" autocomplete="off" >' + allergyNote + '</textarea>'
									+ '<small id="allergyNoteText" style="display: none; color: #A94442"></small><input type="hidden" class="actAmtsErrCount">'
								+ '</td>'
								/* + '<td align="center"><a  class="remove" style="cursor:pointer;color:red;"><i class="fa fa-trash" style="color:red;"></i></a>' */
								+ '<td align="center"><button type="button" class="btn btn-danger remove"> <i class="fa fa-trash"></i></button></td>'
							+ '</tr>');
							
							$("#allergyType").val('0');
							$("#allergyId").val('0');
							$("#allergyName").val('');
							$("#allergyReaction").val('0');
							$("#allergyNote").val('');
							
							$("#allergyTypeText").hide();
							$("#allergyIdText").hide();
							$("#allergyReactionText").hide();
							
						
						}
				
				});
	          	
				//$("#emptyfields").hide;
	          	$("#allergySaves").click(function() {
					//alert(1);
					if(count!=0){
					$("#allergyModal").modal('hide');
					}
													
						
						var allergyId=$("#allergyId").val();
						var patientId = $(".patientId").val();
					
						if(count!=0){
						if(patientId!=0){
					
						$("#allergyForm").ajaxForm(allergyInsertFormAjax);
						$('#allergyForm').attr('action',"/<s:message code="projectName"></s:message>/patient/setAllergyDetails").submit();
						$("#loadarModal").modal('hide');
						  }
						}
						else{
							
								$("#allergyTypeText").show();
								$("#allergyTypeText").text("select Allergy Type");
								
								$("#allergyIdText").show();
								$("#allergyIdText").text("Select Allergy Name");
								
								$("#allergyReactionText").show();
								$("#allergyReactionText").text("Select Reaction");
								
							
							
								$("#emptyfields").show;
						}
					});
	          	
	          	
	          	function myFunctionAllergy() {
	          	  //alert("Hello! I am an alert box!");
	          	  $("#alertModalAllergy").hide();
	          	  $("#allergyModal").modal('show');
	          	}
	          	
	          	
	          	var allergyInsertFormAjax = {
						beforeSubmit : function(formData, formObj,
								options) {
						
						},success : function(response) {
							
					        var data = response;
					        $('#loadarModal').modal({backdrop : 'static', keyboard : false});
					     //   if(data == "1" || data =="2"){
					        									        									        	
					        	var delay = 500; //Your delay in milliseconds
								setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);
					     //   }
							
													},
					error : function(jqXHR, textStatus, errorThrown) {
					//	 alert("error"); 
					}

				};
	          	
	          	
	          	var index = 0;
				//used to show the confirm modal.
				$("#allergiesListTable").on('click', '.remove', function() {
				//	alert("remove allergy...");
					index = $(this).closest('tr').index();
					//alert(index);
					$("#allergyModal").modal('hide');
					$("#deleteConfirmAllergy").modal('show');
					//alert($(this).closest('tr').find(".allergyNames").val());
					$("#deleteConfirmAllergy #delNameFont").text($(this).closest('tr').find(".allergyNames").val());
					$("#deleteConfirmAllergy #delIndex").val(index);
				//	$("#deleteConfirmAllergy #delNameFont").text($(this).closest('tr').find(".allergyNames").val());

					$("#deleteConfirmAllergy #delModule").val("allergies");
					
					var allergyName = $(this).closest('tr').find(".allergyNames").val();
				//	alert("allergyName = "+allergyName);
					var allergyId = $(this).closest('tr').find(".allergyIds").val();
				//	alert("allergyId = "+allergyId);
					
				//	var patientId = $(this).closest('tr').find(".patientId").val();
					var patientId = $(".patientId").val();
					//alert("patientId = "+patientId);
					$(".patientIds").val(patientId);
					
					
					$(".allergyNames").val(allergyName);
					$(".allergyIds").val(allergyId);
					$(".patientIds").val(patientId);
				});
				
				
				
				
				
				//click() function on "#yesDelete" used to delete the selected row while confirming in dialog box
				$("#yesDeleteAllergy").click(function() {
				//	alert("yes click...");
				//	var delModule = $("#deleteConfirm #delModule").val();
					var delIndex = $("#deleteConfirmAllergy #delIndex").val();
				    //alert(delIndex);
					//if (delModule == "allergies") {
						$("#tabAllergyStat").val("1");
						var par = $("#allergyModal #allergiesListTable tbody tr").eq(delIndex).find(".allergyIds").parent().parent();
					
					par.remove();
					
					
					var allergyName = $(".allergyNames").val();
					var allergyId = $(".allergyIds").val();
					var patientId = $(".patientIds").val();
					
					
					
						//$("#deleteConfirm").modal('hide');
												var url= "/<s:message code="projectName"></s:message>/patient/deleteAllergyDet?allergyName="
						+ allergyName+"&patientId="+patientId;
										//		alert(url);
												$("#deleteConfirmAllergy").modal('hide');
												
												
												
												$.ajax({
													url : url,
															async : false,
															success : function(
																	response) {
																//alert(response);
		$(this).val();														var data = response.split("^");
																if (data[0] == "1") {
																//	var ipId = $("#ipId").val();
																	//alert(ipId);
																    var patientId = $(".patientIds").val();	
																	$("#successDiv").show();
																	$("#errorDiv").hide();
																	$("#successMessage").html("Allergy Details Successfully deleted ...");
																	var delay = 20000; //Your delay in milliseconds
																	setTimeout(function() {
																				window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"
																						},delay);
																	$("#loadarModal").modal('hide');
																} else {
																	$("#errorDiv").show();
																	$("#successDiv").hide();
																	$("#errorMessage").html("Allergy Details Not deleted.");

																}

															}
														});
												$("#allergyModal").modal('show');
												$("#allergyModal").modal('show');
											
				}); 
			
				$(this).val();		
				//click() function on "#noDelete" used to hide the dialog box
				$("#noDeleteAllergy").click(function() {
					$("#deleteConfirmAllergy").modal('hide');
					$("#allergyModal").modal('show');
				});
	          	
	          	


						$(".vitalValue").on('keyup',function(){

						var id=$(this).attr('id');
						var weight=$("#Weight").val();
						var height=$("#Height").val();

						if(weight!='' && height!='' && weight!=0 && height!=0){

						
						var a=height/100;
						var b=weight/(a*a);
						$('#BMI').val(b.toFixed(2));
						}else{
						//alert("else");
							$('#BMI').val('0');

						}
						});

						$("#vCancel").click(function() {
							$(this).val();				//alert(1);
						//$("#pntBloodGrp").val('');
						$("#vitalsModal").modal('hide');
						//$("#vitalsModalDT").modal('hide');
						});

						$("#vSave").click(function() {
						//alert(1);
						$("#vitalsModal").modal('hide');

						});
						
						function modalFree(){
							
							$("#vitalsModalDT #pntId").val('');
							$("#vitalsModalDT #apptId").val('');
							
							$("#vitalsModalDT #Heights").val('');
							$("#vitalsModalDT #Weights").val('');
							$("#vitalsModalDT #BMIs").val('');
							$("#vitalsModalDT #BPs").val('');
							$("#vitalsModalDT #Pulses").val('');
							$("#vitalsModalDT #Temps").val('');
							$("#vitalsModalDT #Nutritional\\ Statuss").val('');
							$("#vitalsModalDT #BP\\ RTs").val('');
							$("#vitalsModalDT #BP\\ LTs").val('');
							$("#vitalsModalDT #SPO2s").val('');
							$("#vitalsModalDT #pntBloodGrp").val('');
							
						}
						$(this).val();				
						$("#patientInfo").on('click','.vitalss',function(event) {
						event.preventDefault();
						//alert(2);
						 $('#loadarModal').modal({backdrop : 'static', keyboard : false});
						var apptId = $(this).closest('tr').find('.apptId').val();	
						var patientId = $(this).closest('tr').find('.patientId').val();	
						var vitalStatus=$("#vitalStatus").val(0);
						//alert("pntId/apptId-----"+patientId+"/"+patApptId);
						$('#loadarModal').modal('hide');
						var url = "/<s:message code="projectName"></s:message>/patient/getVitals?patientId="
						+ patientId +"&apptId="+apptId;
						//alert(url);
						$.ajax({
						url : url,
						success : function(response) {
							//alert(response);
							//if(response != ''){
							var dat = response.split("^");	
								//alert(dat[0]);
						if(dat[0]==1){
							 var data = dat[1].split(",");
							$("#vitalsModalDT #Heights").val(data[0]);
							$("#vitalsModalDT #Weights").val(data[1]);
							$("#vitalsModalDT #BMIs").val(data[2]);
							$("#vitalsModalDT #BP\\ RTs").val(data[3]);
							$("#vitalsModalDT #Pulses").val(data[7]);
							$("#vitalsModalDT #Temps").val(data[5]);
// 							$("#vitalsModalDT #Temps").val(data[6]);
							$("#vitalsModalDT #SPO2s").val(data[6]);
							$("#vitalsModalDT #BP\\ LTs").val(data[4]);
							var a=data[6];
							//alert(data[6]);
							$("#vitalsModalDT #Nutritional\\ Statuss").val(data[6]).trigger('chosen:updated');
							
							/*  if  ID name have space then we use
								$('[id="Nutritional Statuss"]') or $('#Nutritional\\ Statuss') */
								
							$("#vitalsModalDT #pntBloodGrp").val(dat[2]);
							//alert(dat[2]);
							$("#vitalsModalDT #pntId").val(dat[3]);
							$("#vitalsModalDT #apptId").val(dat[4]);
							
							$("#vitalsModalDT").modal('show');
							//$("#vitalsModalDT #vSaves").hide();
							$(this).val();					
							
							}else{
								//alert("in else....");
								$("#vitalsModalDT #pntId").val(dat[1]);
								$("#vitalsModalDT #apptId").val(dat[2]);
								$("#vitalsModalDT").modal('show');
								
							}
							$('#loadarModal').modal('hide');
							
							}
						
						});
						
						
						$(this).val();				modalFree();
						

						});

						$(".vitalValues").on('keyup',function(){
						//alert(1);
						var id=$(this).attr('id');
						var weight=$("#Weights").val();
						var height=$("#Heights").val();

						if(weight!='' && height!='' && weight!=0 && height!=0){


						//alert("weight="+weight);
						//alert("height="+height);
						//alert("val="+weight/height);
						var a=height/100;
						var b=weight/(a*a);
						$('#BMIs').val(b.toFixed(2));
						}else{
						$('#BMIs').val('0');

						}
						});
						
						 $(".vitalValueNs").on('change',function(){
				           // alert($(this).val());
				               $("#vValNt").val($(this).val());
				 
						 });
						$("#vCancels").click(function() {
							//alert(1);
							$("#vitalsModalDT").modal('hide');
							});

							$("#vSaves").click(function() {
							//alert(1);
							$("#vitalsModalDT").modal('hide');
								var apptId=$("#apptId").val();
							    var pntId=$("#pntId").val();
							    var bloodGrp=$("#bloodGrp").val();						
								var height=$("#Heights").val();
								
								var weight=$("#Weights").val();
								var bmi=$("#BMIs").val();
								var bp=$("#BPs").val();
								var pulse=$("#Pulses").val();
								var temp=$("#Temps").val();
								var nutr=$("#Nutritional\\ Statuss").val();
								var bld=$("#pntBloodGrp").val();
								var vitalStatus=$("#vitalStatus").val();
								/* alert(vitalStatus); */
								//alert("h/w-----"+height+"/"+weight);
								$("#vitaForm").ajaxForm(vitalInsertFormAjax);
								$('#vitaForm').attr('action',"/<s:message code="projectName"></s:message>/patient/saveVitalsDT").submit();
							});
							
							  
							var vitalInsertFormAjax = {
									beforeSubmit : function(formData, formObj,
											options) {
									
									},success : function(response) {
										
								        var data = response;
								        $('#loadarModal').modal({backdrop : 'static', keyboard : false});
								        if(data == "1" || data =="2"){
								        									        									        	
								        	var delay = 300; //Your delay in milliseconds
											setTimeout(function(){ window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue"; }, delay);
								        }
										
																},
								error : function(jqXHR, textStatus, errorThrown) {
									 alert("error"); 
								}

							}; 
					 	

							$(this).val();					$("#anyEmiPay").click(function(){
								var docId = $("#idDoctor option:selected").val();																						
							  	var emp=docId.split(":");
							  	//alert(emp[0]);
								var merchantId="Indus_Hospitals";
									var random =Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
									var txtId="Indus-"+random;
									var radioValue = $("input[name='patientDetailsSplit']:checked").val();
									if(radioValue == 'apptWise'){
										//alert("if");
										var patientName=$("#patientName").val();
									}else if(radioValue == 'newApptWise'){
										//alert("else if");
										var patientName=$("#newPatientName").val();
									}else{
										//alert("else");
										var patientName=$("#regPatientName").val();
									}
									
									$(this).val();							var email="indus.hospital.vsp@gmail.com";
									var recAmt=$("#amountReceived").val();
									//alert(recAmt);
									if(recAmt=="0.00" || recAmt==""){
										var amount = $("#billAmt").val();
									}else{
										var amount = $("#balance").val();
									}
									//var amount = "1";
									var phone=$("#pntMobNum").val();
									var RU="http://"+window.location.host+"/<s:message code="projectName"></s:message>/patient/patientQueuePayment";
									var CU="https://www.google.com";
									
									var text=merchantId+"!===!"+txtId+"!===!"+amount+"!===!NA!===!"+patientName+"!===!"+email+"!===!"
									+phone+"!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!NA!===!"
									+RU+"!===!"+CU;
									
									var url = "/<s:message code="projectName"></s:message>/patient/encriptAnyEmiString?text="+text+"&empId="+emp[0];
									//alert(url);
									$.ajax({
									url : url,
									success : function(response) {
									//alert(response);
								
											var form = $(document.createElement('form'));
											$(form).attr("action", "https://payments.anyemi.com/intiate.php");
											$(form).attr("method", "POST");
											$(form).attr("target", "formresult");
											var input = $("<input>")
											    .attr("type", "hidden")
											    .attr("name", "msg")
											    .val(response);
											$(form).append($(input));

											form.appendTo(document.body)
											window.open('', 'formresult', 'scrollbars=no,menubar=no,height=700,width=800,resizable=yes,toolbar=no,status=no');
											$(form).submit();

											$("#paymentPost").hide();
											$("#paymentGet").show();
											$("#paymentrefresh").show();
									
									     }
									});							
							});
							
							
							$("#getanyEmiPay").click(function(){
								//alert(1);
								var docId = $("#idDoctor option:selected").val();																						
							  	var emp=docId.split(":");
							  	//alert(emp[0]);
								var radioValue = $("input[name='patientDetailsSplit']:checked").val();
								if(radioValue == 'apptWise'){
									//alert("if");
									var patientName=$("#patientName").val();
								}else if(radioValue == 'newApptWise'){
									//alert("else if");
									var patientName=$("#newPatientName").val();
								}else{
									//alert("else");
									var patientName=$("#regPatientName").val();
								}
								var mobNum=$("#pntMobNum").val();
								var url = "/<s:message code="projectName"></s:message>/patient/getAnyEmiPaymentDetails?mobNum="+mobNum
										+"&patientName="+patientName+"&empId="+emp[0];
								//alert(url);
								$.ajax({
								url : url,
								success : function(response) {
								//alert(response);
								var data=response.split("^");
								if(data[1]=="Cash"){
									$("#cashAmount").val("0.00");
									$("#cashAmount").trigger('keyup');
								}else if(data[1]=="WALLET"){
									$("#upiAmount").val(data[2]);
									$("#upiAmount").trigger('keyup');
									$("#upiChqCardNo").val(data[4]);
									$("#upiMobNo").val(data[5]);
								}else{
									$("#creditAmount").val(data[2]);
									$("#creditAmount").trigger('keyup');
									$("#creditChqCardNo").val(data[4]);
								}

								
								}
								});
							});
							
							// refund functionality created on 29-06-2022 by Hemanth
								$("#patientInfo").on('click','.refund',function(event) {
									event.preventDefault();
									var patientName = $(this).closest('tr').find(".patientName").val();
									var empId = $(this).closest('tr').find(".empId").val();
									var mobNum=$(this).closest('tr').find(".pntUpdtMobNum").val();
									var url = "/<s:message code="projectName"></s:message>/patient/getAnyEmiRefundPayment?mobNum="+mobNum+"&patientName="+patientName+"&empId="+empId;
									//alert(url);
									$.ajax({
									url : url,
									success : function(response) {
									//alert(response);
									var data=response.split("^");
									if(data[0]=="1"){
										alert(data[1]);
									}else{
										alert("Request Parameters does not match");
									}
								
								}
								});
							});
							
								
								$("#payrefresh").click(function(){
									
										$("#paymentPost").show();
										$("#paymentGet").hide();
										$("#paymentrefresh").hide();
									
								});
								
								
								$("#paylink").click(function(){
									
									var docId = $("#idDoctor option:selected").val();																						
								  	var emp=docId.split(":");
									var moblieNumber=$("#pntMobNum").val();
									var recAmt=$("#amountReceived").val();
									
									if(recAmt=="0.00" || recAmt==""){
										var billAmt = $("#billAmt").val();
									}else{
										var billAmt = $("#balance").val();
									}
									var radioValue = $("input[name='patientDetailsSplit']:checked").val();
									if(radioValue == 'apptWise'){
										var patientName=$("#patientName").val();
									}else if(radioValue == 'newApptWise'){
										var patientName=$("#newPatientName").val();
									}else{
										var patientName=$("#regPatientName").val();
									}
									
									
									var url = "/<s:message code="projectName"></s:message>/patient/paymentTest?mobileNum="
									            + moblieNumber+"&billAmt="+billAmt+"&patientName="+patientName+"&empId="+emp[0];
								
					                 //  alert(url);
					                    $.ajax({
											url : url,
											success : function(response) {
												//alert(response);
												$("#paymentlink").hide();
												$("#getpaymentlink").show();
												$("#paymentlinkrefresh").show();
											}
										
										});
										
										});
										
									$("#getPaylink").click(function(){
										$(this).val();							
									var docId = $("#idDoctor option:selected").val();																						
								  	var emp=docId.split(":");
									var moblieNumber=$("#pntMobNum").val();
									var recAmt=$("#amountReceived").val();
									
									if(recAmt=="0.00" || recAmt==""){
										var billAmt = $("#billAmt").val();
									}else{
										var billAmt = $("#balance").val();
									}
									
									var radioValue = $("input[name='patientDetailsSplit']:checked").val();
									if(radioValue == 'apptWise'){
										var patientName=$("#patientName").val();
									}else if(radioValue == 'newApptWise'){
										var patientName=$("#newPatientName").val();
									}else{
										var patientName=$("#regPatientName").val();
									}
									
									var url = "/<s:message code="projectName"></s:message>/patient/getPaymentEnqLink?mobileNum="
									            + moblieNumber+"&billAmt="+billAmt+"&patientName="+patientName+"&empId="+emp[0];
								
					                  //  alert(url);
					                    $.ajax({
											url : url,
											success : function(response) {
											//alert(response);
											var data=response.split("^");
											if(data[0]=="1"){
												
												$("#upiAmount").val(data[3]);
												$("#upiAmount").trigger('keyup');
												$("#upiChqCardNo").val(data[2]);
												$("#upiMobNo").val(data[4]);
											}else
												{
												
												alert("This Transcation is Faild");
												}
											}
										
										});
									});
									
									$("#paylinkrefresh").click(function(){
										$("#paymentlink").show();
										$("#getpaymentlink").hide();
										$("#paymentlinkrefresh").hide();
									
								});
									
									$("#patientInfo").on('click','.printConsult',function(event) {
										//alert("click on...");
												var patientId= $(this).closest('tr').find(".patientId").val();
												//alert("patientId"+patientId);
												var apptId=$(this).closest('tr').find(".apptId").val();
												//alert("apptId==="+apptId);
							                   var visitId=$(this).closest('tr').find(".visitId").val();
												//alert("apptId==="+visitId);
							                    var PrintUrl = "/<s:message code="projectName"></s:message>/patient/getPatientConsultationPrint?patientId=" +patientId+"&apptId="+apptId+"&visitId="+visitId;
							                  //  alert(PrintUrl);

							              
										          var url = "/<s:message code="projectName"></s:message>/patient/getBarcodeNumber?apptId="+ apptId;
										         // alert(url);
										          $.ajax({ //Ajax call to retreive the page buttons.
														url : url,
														success : function(response) {
															//alert("response"+response);
															  window.open(PrintUrl, "mywindow", "menubar=1, resizable=1, width=1100, height=650");  
													          JsBarcode("#barcode", response, {
													        	   lineColor: "#000",
													        	  width: 1,
													        	  height: 20,
													        	  displayValue: true,
													        	  marginLeft: 1,
													        	  marginTop: 1, 
													        	  format: "CODE39",
													        	  flat: true,
													        	  fontSize: 9,
													        	  
													        	});
													        
														},
														error : function() {
															alert("in error");
														}
													});	
										          
										         
											});

									$("#patientInfo").on('click','.printPrescp',function(event) {
									//	alert("click on...");
												var patientId= $(this).closest('tr').find(".patientId").val();
												//alert("patientId"+patientId);
												var apptId=$(this).closest('tr').find(".apptId").val();
												//alert("apptId==="+apptId);
							                   var visitId=$(this).closest('tr').find(".visitId").val();
												//alert("apptId==="+visitId);
							                    var PrintUrl = "/<s:message code="projectName"></s:message>/patient/getPatientPrescriptionnPrint?patientId=" +patientId+"&apptId="+apptId+"&visitId="+visitId;
							                  //  alert(PrintUrl);

							              
										          var url = "/<s:message code="projectName"></s:message>/patient/getBarcodeNumber?apptId="+ apptId;
										         // alert(url);
										          $.ajax({ //Ajax call to retreive the page buttons.
														url : url,
														success : function(response) {
															//alert("response"+response);
															  window.open(PrintUrl, "mywindow", "menubar=1, resizable=1, width=1100, height=650");  
													          JsBarcode("#barcode", response, {
													        	   lineColor: "#000",
													        	  width: 1,
													        	  height: 20,
													        	  displayValue: true,
													        	  marginLeft: 1,
													        	  marginTop: 1, 
													        	  format: "CODE39",
													        	  flat: true,
													        	  fontSize: 9,
													        	  
													        	});
													        
														},
														error : function() {
															alert("in error");
														}
													});	
										          
										         
											});
									//Rajareddy
									//$("#newApptWise").trigger('click')
								   
									//commented by sandhya
									
							    	});
							    	$("#idLocation").on("change", function() {
							        	var idLocation =$("#idLocation").val();
							        	$("#idLocationText").hide();
							        	if(idLocation =='')
							        		{
							        		$("#idLocationText").show();
							        		$("#idLocationText").html("Select Location");
							        		}
							        		});
							    	$("#idDoctor").on("change", function() {
							        	var idDoctor =$("#idDoctor").val();
							        	$("#idDoctorText").hide();
							        	if(idDoctor =='')
							        		{
							        		$("#idDoctorText").show();
							        		$("#idDoctorText").html("Select Consultant");
							        		}
							        		});
							    	$("#patientCat").on("change", function() {
							        	var patientCat =$("#patientCat").val();
							        	$("#patientCatText").hide();
							        	if(patientCat =='')
							        		{
							        		$("#patientCatText").show();
							        		$("#patientCatText").html("Selet Patient Category");
							        		}
							        		});
							    	$("#patientTitle").on("change", function() {
							        	var patientTitle =$("#patientTitle").val();
							        	$("#patientTitleText").hide();
							        	if(patientTitle =='')
							        		{
							        		$("#patientTitleText").show();
							        		$("#patientTitleText").html("Selet Patient Title");
							        		}
							        		});
				
			    	  //kept by habib from line 13447 to 13464
					/* 	 
			    	   $("#organizationsId").on('change', function () {
				    	 //alert(11);
			    	    	var organizationsId = $("#organizationsId").val();
				    	    //alert(organizationsId); // Corrected variable name
				    	    var url =  "/<s:message code="projectName"></s:message>/patient/gettarifs?orgId=" + organizationsId; 
				    	  //  alert("habi ............."+url);
				    	    $.ajax({
				    	        url: url,
				    	        success: function (response) {
				    	         
				    	        	//alert(response);
				    	           //  var id=response;
				    	           //      alert(id +".....HABIIIIIIIIIIII.............");
				    	        //	$("#patientCat").val(id).trigger('choosen:updated');
				    	        //	$("#patientCat").trigger("change");
				    	        	var data=response.split(" ^ ");
									  $("#patientCat").val(data[1]).trigger("chosen:updated");	
				    	        }
				    	  
				    	    
				    	    
				    	    
				    	    });
				    	   
				    	    
			    	    }); */

			    	

			    	    //kept by habib append remove functionality from line 13476 to 13508
			    	  
			    	  
			    	    function  finalCal(){
			   			 var finalTotAmt = 0.00;
			   				$(".labCharges").each(function(invDiscIndex){
			   					var dis =  parseInt($(this).val());
			   				//	alert("dis..."+dis);
			   					   finalTotAmt =  parseInt(parseFloat(finalTotAmt) + parseInt($(this).val()));
			   					//		alert("finalTotAmt...."+finalTotAmt);
			   					}); 
			   				$(this).val();	   				var finalTotal=parseInt(parseFloat(finalTotAmt));
			   				
			   				    $("#labTotAmt").val(finalTotal.toFixed(2));
			   		 		   	$("#labBillAmt").val(finalTotal.toFixed(2));
			   		 		   	$("#labPaidAmt").val(finalTotal.toFixed(2));
			   		 		    $("#labBalAmt").val(finalTotal.toFixed(2));
			   		        }
			    	  
			    	 
			    		
		
						$("#labServicesTableMain").on('click','.productDelete',function(){	
							
					 		var par = $(this).parent().parent(); 
								par.remove();
					 	
					 		/* $("#deldrugId").val(drugId);
					 		$("#deleteConfirmIn").modal('show'); */
					 	
					         	finalCal();
					 		
					 	});
						
						// kept by habib for hospital services credit date
						
					  	 var today = new Date();
							date = new Date(today.getFullYear(), today.getMonth());
							$("#oneCardExp").datepicker({
							 	startView: "months",
								minViewMode:"months", 
								format: "M-yyyy",
								autoclose: true,
								todayHighlight: true,
								orientation: "bottom auto"

							}); 
						
						
						
						
						
						$("#patientInfo").on('click','.view',function(event) {
							event.preventDefault();
							//alert("Habib");
							$('.nav-tabs a[href="#apptAdd"]').tab('show');
							
				
							
							var patientId = $(this).closest('tr').find(".patientId").val();
							//alert("patientId........."+patientId);
								patientViewIndex = $(this).closest('tr').index();
				                
								$("#patientViewIndex").val(patientViewIndex);
								$("#viewMode").val("1");
							var patientName = $(this).closest('tr').find(".pname").val();
		     				var gender = $(this).closest('tr').find(".pntUpdtGender").val();
							var pntUpdtDob = $(this).closest('tr').find(".pntUpdtDob").val();
							var age = $(this).closest('tr').find(".pntUpdtAge").val();
							var ageDays = $(this).closest('tr').find(".pntUpdtAgeDays").val();
							var ageMonths = $(this).closest('tr').find(".pntUpdtAgeMonths").val();
							var mobNum = $(this).closest('tr').find(".pntUpdtMobNum").val();
							var patientCode = $(this).closest('tr').find(".patientCode").val();	
							var city = $(this).closest('tr').find(".pntUpdtCity").val();
							//alert(city);
							var village = $(this).closest('tr').find(".pntUpdtVillage").val();
							var addr = $(this).closest('tr').find(".pntUpdtAddr").val();
							var maritalStatus = $(this).closest('tr').find(".pntUpdtMaritalStatus").val();
							var religion = $(this).closest('tr').find(".pntUpdtReligion").val();
							var idProofType = $(this).closest('tr').find(".pntUpdtIdProofType").val();
							var idProofNum = $(this).closest('tr').find(".pntUpdtIdProofNum").val();
							var occupation = $(this).closest('tr').find(".pntUpdtOccupation").val();
							var refType = $(this).closest('tr').find(".pntUpdtRefType").val();
							var smsStatus = $(this).closest('tr').find(".pntUpdtSmsStatus").val();
							
							var smsAlert = $(this).closest('tr').find(".pntUpdtSmsAlert").val();
							var nationality = $(this).closest('tr').find(".pntUpdtNationality").val();
							var pntUpdtBloodGrp = $(this).closest('tr').find(".pntUpdtBloodGrp").val();
							var patientCategoryId = $(this).closest('tr').find(".pntUpdtPatCatId").val();
							var state = $(this).closest('tr').find(".pntUpdtState").val();
							var bloodGrp = $(this).closest('tr').find(".pntUpdtBloodGrp").val();
							var refId = $(this).closest('tr').find(".pntUpdtRefId").val();
							var occupation = $(this).closest('tr').find(".pntUpdtOccupation").val();
							var otherHospId = $(this).closest('tr').find(".otherHospId").val();
							var otherStaffId = $(this).closest('tr').find(".otherStaffId").val();
							var paymentType = $(this).closest('tr').find(".paymentType").val();
							var ptitle = $(this).closest('tr').find(".ptitle").val();
							var lName = $(this).closest('tr').find(".lName").val();
							var careByName = $(this).closest('tr').find(".careByName").val();
							var careBy = $(this).closest('tr').find(".careBy").val();
							var pntCat = $(this).closest('tr').find(".pntCat").val();
							var organizationsId = $(this).closest('tr').find(".orgId").val();
							var problem= $(this).closest('tr').find(".problem").val();
							var problem= $(this).closest('tr').find(".problem").val();
							var billId= $(this).closest('tr').find(".billId").val();
							var billStatus= $(this).closest('tr').find(".billStatus").val();
							var authorizedBy= $(this).closest('tr').find(".authorizedBy").val();
							var regFee= $(this).closest('tr').find(".regFee").val();
							var regAmount= $(this).closest('tr').find(".regAmount").val();
							var consFee= $(this).closest('tr').find(".consFee").val();
							var consDiscount= $(this).closest('tr').find(".consDiscount").val();
							var consDiscountAmount= $(this).closest('tr').find(".consDiscountAmount").val();
							var consAmount= $(this).closest('tr').find(".consAmount").val();
							var totAmt= $(this).closest('tr').find(".totAmt").val();
							var totDiscount= $(this).closest('tr').find(".totDiscount").val();
							var totDiscountAmt= $(this).closest('tr').find(".totDiscountAmt").val();
							var amtRecd= $(this).closest('tr').find(".amtRecd").val();
							var balance= $(this).closest('tr').find(".balance").val();
							
							
							
							var billAmt= $(this).closest('tr').find(".billAmt").val();
							var disStaffId= $(this).closest('tr').find(".disStaffId").val();
							var remarks= $(this).closest('tr').find(".remarks").val();

							
							 if (parseFloat(totDiscount) == 100) {
							        $("#status").val("concession");
							    } else {
							        $("#status").val("pending");
							    }	


							//alert(authorizedBy);

//alert(billId);
						// kept by habib on july 25 2024 for doctor name view functionality
						var locationId= $(this).closest('tr').find(".locationId").val();
						var employeeId= $(this).closest('tr').find(".employeeId").val();
						var apptDt =  $(this).closest('tr').find(".apptDt").val();
						var tokenNum =   $(this).closest('tr').find(".tokenNum").val();
						var empCode =  $(this).closest('tr').find(".empCode").val();
						var specialization =  $(this).closest('tr').find(".specialization").val();
						var city =  $(this).closest('tr').find(".city").val();
						var state =  $(this).closest('tr').find(".state").val();
						
						$('#idDoctor').val(employeeId).trigger('chosen:updated');
						
						
						$('#idLocation').val(locationId).trigger('chosen:updated').trigger("change");
						$('#authorizedBy').val(authorizedBy).trigger('chosen:updated');
						$("#authorizedByDiv").show();
						$("#idDoctor").val(employeeId).trigger("chosen:updated");
						//alert(billId);

							//alert(problem);
							//alert(orgId);
													$('#state').val(state).trigger('chosen:updated');

							//$("#state").val(state);
                               $('#city').val(city).trigger('chosen:updated');

							$("#apptDt").val(apptDt);
							$("#tokenNum").val(tokenNum);
                            $("#specialization").val(specialization);
							$("#umrSec").val(patientCode);
							$("#status").val(billStatus);	
							$("#newPatientName").val(patientName);	
							$("#patientName").val(patientName);	
							//alert(patientName);
							$("#genderVal").val(gender);
							$("#patientCat").val(pntCat);
							$('#organizationsId').val(organizationsId).trigger('chosen:updated');
							//alert(organizationsId);
							$("#careByName").val(careByName);
							$("#careBy").val(careBy);
							$("#patientTitle").val(ptitle);
							$("#lastName").val(lName);
							$("#pntDob").val(pntUpdtDob);
							$("#age").val(age);
							$("#ageDays").val(ageDays);
							$("#ageMonths").val(ageMonths);
							$("#pntMobNum").val(mobNum);
							$("#city").val(city);
							$("#village").val(village);
							$("#addr").val(addr);
							$("#maritalStatusVal").val(maritalStatus);
							$("#pntReligion").val(religion);
							$("#idType").val(idProofType);
							$("#idNum").val(idProofNum);
							$("#occupation").val(occupation);
							$("#refType").val(refType);
							$("#remarks").val(remarks);
							$("#").val(smsStatus);
							$("#smsAlert").val(smsAlert);
							$("#pntNationality").val(nationality);
							$("#pntBloodGrp").val(pntUpdtBloodGrp);
							$('#authorizedBy').val(authorizedBy).prop('disabled', true).trigger('chosen:updated');
							$("#pntNationality").change(function() {
								var countryCode = $("#pntNationality option:selected").val();
								//alert(countryCode);
								if(countryCode!='Indian'){
									$("#state").val('').attr('disabled',true);
									$("#city").val('').attr('disabled',true);
									//$("#passportModal").modal('show');
								}else{
									getStatesList(countryCode);
									$("#state").attr('disabled',false);
									$("#city").attr('disabled',false);
								}
								
								
								
								
								
								//getStatesList(countryCode);
							}); 		$("#patientCat").val(patientCategoryId);
							$("#state").val(state);
							$("#pntBloodGrp").val(bloodGrp);
							$("#").val(refId);
							$("#").val(occupation);
							$("#").val(otherHospId);
							$("#").val(otherStaffId);
							$("#cashAmount").val(paymentType);
							$("#pblmDesc").val(problem);
							
							$("#regFee").val(regFee);
							$("#amount").val(amount);							
							$("#consFee").val(consFee);
							$("#consDiscount").val(consDiscount);
							$("#consDiscountAmount").val(consDiscountAmount);
							$("#consAmount").val(consAmount);							
							$("#totAmt").val(totAmt);
							$("#totDiscount").val(totDiscount);
							$("#totDiscountAmt").val(totDiscountAmt);							
							$("#amountReceived").val(amtRecd);
							$("#balance").val(balance);
							

							$("#amount").val(regFee);
							$("#billAmt").val(billAmt);
							$("#disStaffId").val(disStaffId).trigger('chosen:updated');
							$("#remarks").val(remarks).trigger('chosen:updated');
							//alert(remarks);


							if (totDiscount != '' && 
							    totDiscount != '0.00' && 
							    parseFloat(totDiscount) > 0 && 
							    !isNaN(totDiscount)) {

							    $("#discAuthDiv").show();

							} else {

							    $("#discAuthDiv").hide();
							    $("#disStaffId").val('0').trigger('chosen:updated');
							   // $("#remarks").val('');
							}

							
							
							
							
							var url = "/<s:message code="projectName"></s:message>/city/getCitiesList?stateCode="
								  + state;
			                    //alert(url);
								$.ajax({
									url : url,
									success : function(citiesList) {
										//alert(citiesList);
										$("#city").html(citiesList);
										$("#city").val(city).trigger('choosen:updated');
									}
								});
							
								var url = "/<s:message code="projectName"></s:message>/patient/viewPaymentDetailss?billId="+billId;
			                    //alert(url);
								$.ajax({
									url : url,
									success : function(response) {
										//alert(response);
										$("#addPaymentTd").show();
							    		$(".cardTypeeee").show();
							    		$(".cardNOOOOOOOO").show();
							    		$(".cardBankExpireDt").show();
							    		$(".cardBankNameeee").show();
										$("#paymentsTffotAmm").html(response);
									}
								});
								
						/* 		 var url = "/<s:message code="projectName"></s:message>/patient/viewPaymentSerDetails?billId="+billId;
									
			                        $.ajax({
			        			        url: url,
			        			        cache:false,
			        			        success:function(response){
			        			        
			        			        	var data=response.split(" ^ ");
			        			        	  
			        						if(data[0]=='1'){

			        							
			        							 var payment = data[2];
			     					        	 var payType = payment.split(",");
			     					        	
			        							 var cashAmount = data[1];
												 var amt = cashAmount.split(",");
												 
												 var cardType = data[6];
												 var card = cardType.split(",");
												 
												 
													
												 var transNo = data[3];
												 var trans = transNo.split(","); 
												 

													
												 var bankName = data[7];	
												 var mobNo = bankName.split(",");
											
												 var creditNo = data[5];
												 var num = creditNo.split(",");
												 
												 var expDate = data[4];
												 var exp = expDate.split(",");
												 
								
			        							
			        							var l = payType.length;
			        								
			        							for ( i=0 ; i < payType.length; i++){
			        							
			        							if (payType[i]== '275'){
			    							        $("#cashAmount").val(amt[i]);
			    								}else if (payType[i]== '276' ){
			    							    	$("#creditAmount").val(amt[i]);
			    							    	$("#cardcardType").val(card[i]).trigger('chosen:updated'); 
			    							     	$("#creditNo").val(num[i]);
			    							     	$("#creditDate").val(exp[i]);
			    							    
			    								}else if (payType[i]== '277' ){
			    							    
			    							    	$("#upiAmount ").val(amt[i]);
			    							        $("#upiChqCardNo").val(trans[i]);
			    							    	$("#upiMobNo").val(mobNo[i]); 


			    							    } 
			        						}
			        						
			        						}
			        						
			        			        },
			        			       
			        				});   */
			                        
			        			
						});	
						
						

			 
			//sandhya
			
		    $("#labServicesTableMain").on('click','.deleteServices',function(){	
				  //alert(111);
				   var billDetId=$(this).closest('tr').find('.billDetId').val();
		           //alert(billDetId);
		           var serviceId=$(this).closest('tr').find('.serviceId').val();
		           //alert(serviceId);
		           var billId=$(this).closest('tr').find('.billId').val();
		          // alert(billId);

		           
		           
		           $("#deleteConfirm1 #delBillDetId").val($(this).closest('tr').find(".billDetId").val());
		           $("#deleteConfirm1 #delServiceIdNew").val($(this).closest('tr').find(".serviceId").val());
		           $("#deleteConfirm1 #delBillId").val($(this).closest('tr').find(".billId").val());
		          // alert(billId);


		           
				  var rowIndex = $(this).closest('tr').index(); // Get the index of the row to be deleted
			        $("#delIndex").val(rowIndex); // Store the index in the modal input
			        $("#deleteConfirm1").modal('show');
			      	    });
		    $("#yesDelete1").click(function() {
		        //alert(3333);
				
		        var billDetId =  $("#deleteConfirm1 .delBillDetId").val();
				var serviceId =  $("#deleteConfirm1 .delServiceIdNew").val();
				var billId =  $("#deleteConfirm1 .delBillId").val();
				//alert(billId);

				
		        var url = "/<s:message code="projectName"></s:message>/patient/deleteServices?billDetId=" + billDetId 
		        		+"&serviceId=" + serviceId +"&billId=" + billId;
		        //alert(url);
		        $.ajax({
		            url: url,
		            type: 'GET',
		            success: function(outputResult) {
		              //alert(outputResult);
		            	var data = outputResult.split("^");
		                      //alert(data);
		            	if (data[1] == 1) {
		                   //alert("in iffffffff");
		            		$("#successDiv").show();
		                    $("#errDiv").hide();
		                    $("#successMessage").html("&nbsp;&nbsp;" + billDetId + " DELETED");
		                    $("#labServicesTableMain tbody tr").eq(delIndex).remove(); // Delete the correct row
		                } else {
		                    $("#successDiv").hide();
		                    $("#errDiv").show();
		                    $("#errorMessage").html("&nbsp;&nbsp;" + serviceId + "NO DELETE ");
		                }
		            }
		        });

		        var delay = 150; // Your delay in milliseconds
		        setTimeout(function() {
		            window.location = "/<s:message code="projectName"></s:message>/patient/patientQueue";
		        }, delay);

		        $("#deleteConfirm").modal('hide');
		    });

		 	
		    const amountFields = document.querySelectorAll('input[name="cashAmnts"]');

		    amountFields.forEach(function(field) {
		      field.addEventListener('keyup', function() {
		        const enteredValue = parseFloat(field.value) || 0.00; // Handle empty input as 0.00

		        amountFields.forEach(function(otherField) {
		          if (otherField !== field) {
		            if (otherField.value === "") {
		              // If the other field is empty, keep it at 0
		              otherField.value = 0; // Set to 0 (numeric value)
		            } else {
		              // If another field already has a value, don't reset it
		            }
		          } else {
		            // Update the clicked field with the entered value, limiting to 2 decimal places (optional)
		            field.value = enteredValue; // Use this for 2 decimal places
		          }
		        });
		      });
		    });

			
			
			 //SANDHYA SRAVANI ADDED NEW CODE IN HOSPITAL SEVICES KEY UP FUNCTIONALITY
			
			//CASH AMOUNT
			
			$("#cashAmnt").val('0.00');
			$("#creditAmnt").val('0.00');
			$("#upiAmnt").val('0.00');
			$("#chequeAmnt").val('0.00');

			
			$("#cashAmnt").keyup(function(){
				var cash=$(this).val();
				var credit=$("#creditAmnt").val();
				var upi=$("#upiAmnt").val();
				var cheque=$("#chequeAmnt").val();
				var labBillAmt=$("#labBillAmt").val();
				var labBalAmt=$("#labBalAmt").val();
				
				//alert(labBalAmt);

				var tot=parseFloat(cash)+parseFloat(credit)+parseFloat(upi)+parseFloat(cheque);
				
 
				if(labBillAmt >= tot){
				$("#labPaidAmt").val(tot.toFixed(2));
				}else{
					//alert(222);	
					$("#cashAmnt").val("0.00");
					$("#labPaidAmt").val(parseFloat(credit)+parseFloat(upi)+parseFloat(cheque));
				} 
				var labPaidAmt=$("#labPaidAmt").val();
				var balAmt=labBillAmt-labPaidAmt;
				$("#labBalAmt").val(balAmt.toFixed(2));
				
				
			});
			
			$("#customerCode").on("keyup",function() {
				var customerCode = $("#customerCode").val();
				//alert(patientName);
     	    	$("#errCustomerId").hide();
				if (customerCode == '') {
     	    		$("#errCustomerId").show();
        	      	$("#errCustomerId").html("Enter or Select Patient Name");
				} else if (!(charRegex.test(customerCode))) {
     	    		$("#errCustomerId").show();
        	    	$("#errCustomerId").html("Enter valid Patient Name");
				}
			});
			
			$("#buttonsDiv").on("click", ".refreshButton",function(event) {
				var currentUrl = window.location.href;
			    var newUrl = currentUrl + (currentUrl.indexOf('?') === -1 ? '?' : '&') + 'activeTab=apptAdd';
			    window.location.href = newUrl;
					
			});
		
			$("#listRefresh").click(function(event){
			    var currentUrl = window.location.href;
			    var newUrl = currentUrl + (currentUrl.indexOf('?') === -1 ? '?' : '&') + 'activeTab=apptList';
			    window.location.href = newUrl;
			});

		$(document).ready(function() {
		    var urlParams = new URLSearchParams(window.location.search);
		    var activeTab = urlParams.get('activeTab');
		    if (activeTab) {
		        $('.nav-tabs a[href="#' + activeTab + '"]').tab('show');
		        var newUrl = window.location.href.split('?')[0]; 
		        window.history.replaceState({}, document.title, newUrl);
		    }
		});
			
			
			$("#upiAmnt").keyup(function(){
				var cash=$("#cashAmnt").val();
				var credit=$("#creditAmnt").val();
				var upi=$(this).val();
				var cheque=$("#chequeAmnt").val();
				var labBillAmt=$("#labBillAmt").val();
				var tot=parseFloat(cash)+parseFloat(credit)+parseFloat(upi)+parseFloat(cheque);
				if(labBillAmt>=tot){
					//alert(33333);
					$("#labPaidAmt").val(tot.toFixed(2));
				}else{
					//alert(4444);	
					$("#upiAmnt").val("0.00");
					$("#labPaidAmt").val(parseFloat(credit)+parseFloat(cash)+parseFloat(cheque));
				}
				
				var labPaidAmt=$("#labPaidAmt").val();
				var balAmt=labBillAmt-labPaidAmt;
			
				$("#labBalAmt").val(balAmt.toFixed(2));
				
			});
			
			
			$("#chequeAmnt").keyup(function(){
				var cash=$("#cashAmnt").val();
				var credit=$("#creditAmnt").val();
				var upi=$("#upiAmnt").val();
				var cheque=$(this).val();
				var labBillAmt=$("#labBillAmt").val();
				var tot=parseFloat(cash)+parseFloat(credit)+parseFloat(upi)+parseFloat(cheque);
				if(labBillAmt>=tot){
					//alert(5555);
					$("#labPaidAmt").val(tot.toFixed(2));
				}else{
					//alert(6666);	
					$("#chequeAmnt").val("0.00");
					$("#labPaidAmt").val(parseFloat(upi)+parseFloat(cash)+parseFloat(credit));
				}
				
				var labPaidAmt=$("#labPaidAmt").val();
				var balAmt=labBillAmt-labPaidAmt;
			
				$("#labBalAmt").val(balAmt.toFixed(2));
			});
			
			
			$("#creditAmnt").keyup(function(){
				var cash=$("#cashAmnt").val();
				var credit=$(this).val();
				var upi=$("#upiAmnt").val();
			    var cheque=$("#chequeAmnt").val();
				var labBillAmt=$("#labBillAmt").val();
				var tot=parseFloat(cash)+parseFloat(credit)+parseFloat(upi)+parseFloat(cheque);
				if(labBillAmt>=tot){
					//alert(5555);
					$("#labPaidAmt").val(tot.toFixed(2));
				}else{
					//alert(6666);	
					$("#creditAmnt").val("0.00");
					$("#labPaidAmt").val(parseFloat(upi)+parseFloat(cash)+parseFloat(cheque));
				}
				var labPaidAmt=$("#labPaidAmt").val();
				var balAmt=labBillAmt-labPaidAmt;
			
				$("#labBalAmt").val(balAmt.toFixed(2));
				
			}); 
			
			
			
			
		 	 var today = new Date();
				date = new Date(today.getFullYear(), today.getMonth());
				$("#cardExpiryDt").datepicker({
				 	startView: "months",
					minViewMode:"months", 
					format: "M-yyyy",
					autoclose: true,
					todayHighlight: true,
					orientation: "bottom auto"

				}); 
				//'keyup()' function on '#patientDiv'  used to dispaly the patient details based on '#patientName'.
	          	$("#modalPatientDetails").keypress(function(e) {
				    
	          		var modalPatientDetails = $("#modalPatientDetails").val().length;
	          		if (modalPatientDetails >= "5") {
	          		if(e.which == 13) {

						$("#patientDetailsDiv").html($("#loadarDiv").html());
						
				    	var modalPatientDetails = $("#modalPatientDetails").val();
						//alert(modalPatientDetails);
						patientDetailsAjax(modalPatientDetails);
				    }
	          		}
				});
    			$("#patdet-modal").on('shown.bs.modal', function(){
                    
					$(this).find('#modalPatientDetails').focus();
					//resetData();

					});
	function patientDetailsAjax(modalPatientDetails) {
		
		var url = "/<s:message code="projectName"></s:message>/patient/getPatientDetailsSer?patientName=" + modalPatientDetails +
		"&umrNo="+modalPatientDetails+ "&mobNum="+modalPatientDetails ;
             //alert(url);
		$.ajax({
	        url: url,
	        type: 'GET',
	        cache:false,
	        success:function(response){
                 //alert(response);
				$("#patientDetailsDiv").html(response);
	        }
		});			 

	}	
	

	function toggleAuthorizedBy() {
	    var status = $("#status").val().trim().toLowerCase();

	    if (status === "paid") {
	        $("#authorizedByDiv").hide();
	        $("#authorizedByText").hide();
	        $("#authorizedBy").val('0'); // reset
	    } else {
	        $("#authorizedByDiv").show();
	    }
	}
	$(document).ready(function() {

	    $("#state").chosen({
	        search_contains: true,
	        width: "100%",
	        placeholder_text_single: "Select State"
	    });

	    $("#city").chosen({
	        search_contains: true,
	        width: "100%",
	        placeholder_text_single: "Select City"
	    });

	});
	
	
	$("#patientTitle").on("change", function () {

	    var title = $(this).val();

	    if (title === "Miss.") {

	        $("#maritalStatusVal").val("Single");
	        $("#pntMaritalStatus").val("Single");

	    } else if (title === "Mrs.") {

	        $("#maritalStatusVal").val("Married");
	        $("#pntMaritalStatus").val("Married");

	    } else {

	        $("#maritalStatusVal").val("0");
	        $("#pntMaritalStatus").val("0");
	    }

	    // Refresh chosen/select plugin if used
	    $("#maritalStatusVal").trigger("chosen:updated");
	});
	
	$("#patientInfo").on('click', '.IpRegistration', function() {

	   

	    var patientId = $(this).closest('tr').find('.patientId').val();
	    var patientCode = $(this).closest('tr').find('.patientCode').val();

	   

	    openIpRegistration(patientId, patientCode);
	});


	function openIpRegistration(patientId, patientCode) {

	    window.open(
	        "/<s:message code='projectName'></s:message>/inPatient/getIpDetails"
	        + "?patientId=" + encodeURIComponent(patientId)
	        + "&patientCode=" + encodeURIComponent(patientCode)
	    );
	    
	    
	    
	}
									
	 </script>
</body>
</html>

