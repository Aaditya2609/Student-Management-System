package com.minor1.StudentManagement.service;

import java.util.List;

import com.minor1.StudentManagement.entities.Student;
import com.minor1.StudentManagement.exception.NullStudentException;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;

public interface StudentService {
	
	Student add(Student student) throws OperationFailedException,NullStudentException;

	Student update(long studentId, Student student) throws OperationFailedException,NullStudentException;
	
	Student updateSemResult(long studentId, int sem, float semResult) throws OperationFailedException,NullStudentException;

	Student find(long studentId) throws OperationFailedException,ResourceNotFoundException;
	
	List<Student> findByName(String studentName) throws OperationFailedException, ResourceNotFoundException;

	List<Student> findBySemester(int sem) throws OperationFailedException;

	List<Student> findAll() throws OperationFailedException,ResourceNotFoundException;
	
	String remove(long studentId) throws OperationFailedException,ResourceNotFoundException;

}
