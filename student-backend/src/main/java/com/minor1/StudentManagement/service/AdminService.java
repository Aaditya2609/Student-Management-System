package com.minor1.StudentManagement.service;

import com.minor1.StudentManagement.entities.Admin;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;

public interface AdminService {

	Admin addAdmin(Admin ad) throws OperationFailedException;
	
	Admin findAdmin(String adminId) throws OperationFailedException, ResourceNotFoundException;
	
	String changePassword(String adminId, String oldPassword, String newPassword) throws ResourceNotFoundException;
}
