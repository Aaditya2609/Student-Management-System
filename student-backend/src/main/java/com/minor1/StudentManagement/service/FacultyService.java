package com.minor1.StudentManagement.service;

import com.minor1.StudentManagement.entities.Faculty;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;

public interface FacultyService {
	
	Faculty addFaculty(Faculty faculty) throws OperationFailedException;
	
	Faculty findFaculty(long facultyId) throws OperationFailedException, ResourceNotFoundException;
	
	void enrollStudent(long facultyId, long studentId) throws OperationFailedException, ResourceNotFoundException;
	
	String changePassword(long facultyId, String oldPassword, String newPassword) throws ResourceNotFoundException;

}
