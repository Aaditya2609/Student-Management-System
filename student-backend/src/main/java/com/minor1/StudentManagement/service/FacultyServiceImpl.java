package com.minor1.StudentManagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minor1.StudentManagement.entities.Faculty;
import com.minor1.StudentManagement.entities.Student;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;
import com.minor1.StudentManagement.repository.FacultyRepository;
import com.minor1.StudentManagement.repository.StudentRepository;

@Service
public class FacultyServiceImpl implements FacultyService {

	private static Logger logger=LoggerFactory.getLogger(StudentServiceImpl.class);

	@Autowired
	FacultyRepository facultyRepository;
	
	@Autowired
	StudentRepository studentRepository;
	
	
	public FacultyServiceImpl(FacultyRepository facultyRepository, StudentRepository studentRepository) {
		super();
		this.facultyRepository = facultyRepository;
		this.studentRepository=studentRepository;
	}
	
	@Transactional
	@Override
	public Faculty addFaculty(Faculty faculty) throws OperationFailedException {
		
		logger.info("Enter FacultyServiceImpl:: method=addFaculty");
		try{
			faculty= facultyRepository.save(faculty);
		}
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		logger.info("Exit FacultyServiceImpl:: method=addFaculty");
		return faculty;
	}
	
	@Override
	public Faculty findFaculty(long facultyId) throws OperationFailedException, ResourceNotFoundException {
		
		logger.info("Enter FacultyServiceImpl:: method=findFaculty");
		Optional<Faculty> faculty;
		try 
		{
			faculty = facultyRepository.findById(facultyId);
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		if(!faculty.isPresent())
		{
			System.out.println("Faculty Not found for this id : "+facultyId);
			return null;
		}
		logger.info("Exit FacultyServiceImpl:: method=findFaculty");

		return faculty.get();
	}

	@Transactional
	@Override
	public void enrollStudent(long facultyId, long studentId) throws OperationFailedException, ResourceNotFoundException {
		
		logger.info("Enter FacultyServiceImpl:: method=enrollStudent");
		
		try {
			
			Optional<Student> st=studentRepository.findById(studentId);
			
			Optional<Faculty> fac=facultyRepository.findById(facultyId);
			
			Student student=st.get();
			
			if(student==null)
				throw new ResourceNotFoundException("No student with this id");
			
			List<Student> previous=fac.get().getEnrolledStudents();
			previous.add(student);
			
			fac.get().setEnrolledStudents(previous);
		}
		
		catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.info("Exit FacultyServiceImpl:: method=enrollStudent");
			
	}

	@Override
	public String changePassword(long facultyId, String oldPassword, String newPassword) throws ResourceNotFoundException {

		logger.info("Enter FacultyServiceImpl:: method=changePassword");
		String a;
		try {
			
			Optional<Faculty> fac=facultyRepository.findById(facultyId);
			
			if(oldPassword.equals(fac.get().getPassword()))
			{
				fac.get().setPassword(newPassword);
				a="Password Changed Succesfully";
				facultyRepository.save(fac.get());
			}
			else {
				a="Wrong Password";
			}
			
		}
		
		catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.info("Exit FacultyServiceImpl:: method=changePassword");
		return a;
	}
	
}
	
