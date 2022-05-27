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

import com.minor1.StudentManagement.entities.Admin;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;
import com.minor1.StudentManagement.payload.BaseResponse;
import com.minor1.StudentManagement.service.AdminServiceImpl;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "http://localhost:3000")  	//as both the projects are running on different ports
@RestController
@RequestMapping("/admin")
public class AdminLoginController {

	private static Logger logger=LoggerFactory.getLogger(AdminLoginController.class);
	
	@Autowired
	private AdminServiceImpl adminServiceImpl;

	@PostMapping("/addAdmin")				
	public ResponseEntity<?> addAdmin(@RequestBody Admin admin) throws OperationFailedException 	 	
	{
		logger.info("Enter AdminController :: method=addAdmin");
		admin=adminServiceImpl.addAdmin(admin);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(admin);
		logger.info("Exit AdminController :: method=addAdmin");
		return new ResponseEntity<>(baseResponse, HttpStatus.CREATED);
	}
	
	@GetMapping("/findAdmin/{adminId}")				
	@ApiOperation(value = "Search a Admin with an ID",response = Admin.class)
	public ResponseEntity<?> findAdmin(@PathVariable("adminId") String adminId) throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter AdminController :: method=findAdmin");
		Admin admin = adminServiceImpl.findAdmin(adminId);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(admin);
		logger.info("Exit AdminController :: method=findAdmin");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);
	}
	
	@PutMapping("/changePassword/{adminId}/{oldPassword}/{newPassword}")
	public ResponseEntity<?> changePassword(@PathVariable String adminId, @PathVariable String oldPassword,@PathVariable  String newPassword) throws OperationFailedException,ResourceNotFoundException 	
	{
		logger.info("Enter AdminController :: method=changePassword");
		String a=adminServiceImpl.changePassword(adminId,oldPassword,newPassword);
		BaseResponse baseResponse = new BaseResponse();
		baseResponse.setStatusCode(1);
		baseResponse.setResponse(a);
		logger.info("Exit AdminController :: method=changePassword");
		return new ResponseEntity<>(baseResponse, HttpStatus.OK);	
	}
}
