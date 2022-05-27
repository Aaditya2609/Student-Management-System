package com.minor1.StudentManagement.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minor1.StudentManagement.entities.Faculty;
import com.minor1.StudentManagement.entities.Student;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;
import com.minor1.StudentManagement.payload.BaseResponse;
import com.minor1.StudentManagement.service.FacultyServiceImpl;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "http://localhost:3000")  	//as both the projects are running on different ports
@RestController
@RequestMapping("/faculty")						//@RequestMapping is used to map the web requests.
public class FacultyController {
	
	private static Logger logger=LoggerFactory.getLogger(FacultyController.class);
	
	@Autowired
	private FacultyServiceImpl facultyServiceImpl;
	
		
	/*
	 * @PostMapping is used to handle POST type of request method
	 * @RequestBody is used to bind HTTP request with an object in a method parameter.
	 */
	
	@PostMapping("/addFaculty")				
	public ResponseEntity<?> addFaculty(@RequestBody Faculty faculty) throws OperationFailedException 	 	
	{
		logger.info("Enter FacultyController :: method=addFaculty");
		faculty=facultyServiceImpl.addFaculty(faculty);
		System.out.println("Students added successfully...");
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(faculty);
		logger.info("Exit FacultyController :: method=addFaculty");
		return new ResponseEntity<>(baseResponse, HttpStatus.CREATED);
	}
	
	@GetMapping("/findFaculty/{facultyId}")				
	@ApiOperation(value = "Search a faculty with an ID",response = Faculty.class)
	public ResponseEntity<?> findFaculty(@PathVariable("facultyId") long facultyId) throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter FacultyController :: method=findFaculty");
		Faculty faculty = facultyServiceImpl.findFaculty(facultyId);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(faculty);
		logger.info("Exit FacultyController :: method=findFaculty");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
	@PutMapping("/enroll/{facultyId}/{studentId}")
	public ResponseEntity<?> enrollStudent(@PathVariable long facultyId, @PathVariable long studentId) throws OperationFailedException 	
	{
		logger.info("Enter FacultyController :: method=enrollStudent");
		facultyServiceImpl.enrollStudent(facultyId,studentId);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse("Student enrolled Successfully");
		logger.info("Exit FacultyController :: method=enrollStudent");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);	
	}
	
	@PutMapping("/changePassword/{facultyId}/{oldPassword}/{newPassword}")
	public ResponseEntity<?> changePassword(@PathVariable long facultyId, @PathVariable String oldPassword,@PathVariable  String newPassword) throws OperationFailedException,ResourceNotFoundException 	
	{
		logger.info("Enter FacultyController :: method=changePassword");
		String a=facultyServiceImpl.changePassword(facultyId,oldPassword,newPassword);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(a);
		logger.info("Exit FacultyController :: method=changePassword");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);	
	}
	
}
