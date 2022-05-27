package com.minor1.StudentManagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minor1.StudentManagement.entities.Student;
import com.minor1.StudentManagement.exception.NullStudentException;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;
import com.minor1.StudentManagement.payload.BaseResponse;
import com.minor1.StudentManagement.service.StudentServiceImpl;

import io.swagger.annotations.ApiOperation;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@CrossOrigin(origins = "http://localhost:3000")  	//as both the projects are running on different ports
@RestController
@RequestMapping("/student")						//@RequestMapping is used to map the web requests.
public class StudentController {
	
	private static Logger logger=LoggerFactory.getLogger(StudentController.class);
	
	@Autowired
	private StudentServiceImpl studentServiceImpl;
	
		
	/*
	 * @PostMapping is used to handle POST type of request method
	 * @RequestBody is used to bind HTTP request with an object in a method parameter.
	 */
	
	@PostMapping("/register")				
	@ApiOperation(value="Add a Student")
	public ResponseEntity<?> add(@RequestBody Student student) throws NullStudentException,OperationFailedException 	 	
	{
		logger.info("Enter StudentController :: method=add");
		student=studentServiceImpl.add(student);
		System.out.println("Students added successfully...");
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=add");
		return new ResponseEntity<>(baseResponse, HttpStatus.CREATED);
	}
	
	
	@PutMapping("/update/{studentId}")
	public ResponseEntity<?> updateStudent(@PathVariable long studentId,@RequestBody Student student) throws NullStudentException,OperationFailedException 	
	{
		logger.info("Enter StudentController :: method=updateStudent");
		student=studentServiceImpl.update(studentId,student);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=updateStudent");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);	
	}
	
	
	
	
	
	@PutMapping("/updateSemResult/{studentId}/{sem}/{semResult}")
	public ResponseEntity<?> updateSemResult(@PathVariable long studentId,@PathVariable int sem,@PathVariable float semResult) throws NullStudentException,OperationFailedException 	
	{
		logger.info("Enter StudentController :: method=updateSemResult");
		Student student=studentServiceImpl.updateSemResult(studentId,sem,semResult);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=updateSemResult");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);	
	}
	
	
	
	
	/*
	 * @GetMapping: It is used to handle GET type of request method.
	 * @PathVariable: It is used to extract the values from the URI.
	 */
	
	@GetMapping("/search/{studentId}")				
	@ApiOperation(value = "Search a student with an ID",response = Student.class)
	public ResponseEntity<?> findById(@PathVariable("studentId") long studentId) throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter StudentController :: method=findById");
		Student student = studentServiceImpl.find(studentId);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=findById");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("/searchByName/{studentName}")				
	@ApiOperation(value = "Search student with name",response = Student.class)
	public ResponseEntity<?> findByStudentName(@PathVariable("studentName") String studentName) throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter StudentController :: method=findByStudentName");
		List<Student> student = studentServiceImpl.findByName(studentName);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=findByStudentName");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
	
	
	
	@GetMapping("/searchBySemester/{sem}")				
	@ApiOperation(value = "Search student with semester ",response = Student.class)
	public ResponseEntity<?> findBySemester(@PathVariable("sem") int sem) throws OperationFailedException
	{
		logger.info("Enter StudentController :: method=findBySemester");
		List<Student> student = studentServiceImpl.findBySemester(sem);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=findBySemester");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
	
	
	
	
	@GetMapping("/searchAll")				
	@ApiOperation(value = "Search all student",response = Student.class)
	public ResponseEntity<?> findAll() throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter StudentController :: method=findAll");
		List<Student> student = studentServiceImpl.findAll();
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(student);
		logger.info("Exit StudentController :: method=findAll");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
	
	
	@DeleteMapping("/delete/{studentId}")				
	@ApiOperation(value = "Delete a student with id",response = Student.class)
	public ResponseEntity<?> delete(@PathVariable("studentId") long studentId) throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter StudentController :: method=delete");
		String result = studentServiceImpl.remove(studentId);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(result);
		logger.info("Exit StudentController :: method=delete");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
}