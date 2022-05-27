package com.minor1.StudentManagement.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minor1.StudentManagement.entities.Student;
import com.minor1.StudentManagement.exception.NullStudentException;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;
import com.minor1.StudentManagement.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

	private static Logger logger=LoggerFactory.getLogger(StudentServiceImpl.class);

	@Autowired
	StudentRepository studentRepository;
	
	
	public StudentServiceImpl(StudentRepository studentRepository) {
		super();
		this.studentRepository = studentRepository;
	}
	
	
	@Transactional
	@Override
	public Student add(Student student) throws NullStudentException,OperationFailedException {
		
		logger.info("Enter StudentServiceImpl:: method=add");
		if(student==null)
		{
			throw new NullStudentException("Student can't be Null...");
		}
		Student stud;
		try{
			stud= studentRepository.save(student);
		}
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		logger.info("Exit StudentServiceImpl:: method=add");
		return stud;
	}
	
	
	
	
	@Transactional
	@Override
	public Student update(long studentId, Student student) throws OperationFailedException, NullStudentException {
		logger.info("Enter StudentServiceImpl:: method=update");
		Optional<Student> stud;
		Student temp;
		try{
			stud=studentRepository.findById(studentId);
			if(!stud.isPresent())
			{
				System.out.println("Student Not found for this id : "+studentId);
				return null;
			}
			
			temp=stud.get();
			
			String a=(student.getAddressLine()!=null)?student.getAddressLine():temp.getAddressLine();
			String b=(student.getBranch()!=null)?student.getBranch():temp.getBranch();
			String c=(student.getCity()!=null)?student.getCity():temp.getCity();
			String e=(student.getEmail()!=null)?student.getEmail():temp.getEmail();
			String m=(student.getMobile()!=null)?student.getMobile():temp.getMobile();
			long p=(student.getPincode()!=0)?student.getPincode():temp.getPincode();
			int s=(student.getSemester()!=0)?student.getSemester():temp.getSemester();
			String st=(student.getState()!=null)?student.getState():temp.getState();
			
			temp.setAddressLine(a);
			temp.setBranch(b);
			temp.setCity(c);
			temp.setEmail(e);
			temp.setMobile(m);
			temp.setPincode(p);
			temp.setSemester(s);
			temp.setState(st);
					
			temp=studentRepository.save(temp);
			
		}
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		logger.info("Exit StudentServiceImpl:: method=update");
		return temp;
	}
	
	
	
	
	
	@Override
	public Student updateSemResult(long studentId, int sem, float semResult) throws OperationFailedException,NullStudentException
	{
		logger.info("Enter StudentServiceImpl:: method=updateSemResult");
		Optional<Student> stud;
		Student temp;
		try{
			stud=studentRepository.findById(studentId);
			if(!stud.isPresent()){
				System.out.println("Student Not found for this id : "+studentId);
				return null;
			}
			
			temp=stud.get();
			
			if(temp.getResult().size()+1 < sem)
			{
				throw new OperationFailedException("Please provide previous record of result.......");
			}
			temp.getResult().add(sem-1,semResult);	
			temp=studentRepository.save(temp);
			
		}
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		logger.info("Exit StudentServiceImpl:: method=updateSemResult");
		return temp;
	}

	
	
	
	
	@Override
	public Student find(long studentId) throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter StudentServiceImpl:: method=find");
		Optional<Student> student;
		try 
		{
			student = studentRepository.findById(studentId);
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		if(!student.isPresent())
		{
			System.out.println("Student Not found for this id : "+studentId);
			return null;
		}
		logger.info("Exit StudentServiceImpl:: method=find");

		return student.get();
	}
	
	
	
	
	@Override
	public List<Student> findByName(String studentName) throws OperationFailedException, ResourceNotFoundException {
		
		logger.info("Enter StudentServiceImpl:: method=findByName");
		List<Student> result;
		try 
		{
			result = studentRepository.findByName(studentName);
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		if(result.size()==0)
		{
			System.out.println(" No Students found for this Name : "+studentName);
			return null;
		}
		logger.info("Exit StudentServiceImpl:: method=findByName");

		return result;
		
	}
	
	
	
	
	@Override
	public List<Student> findBySemester(int sem) throws OperationFailedException {
		logger.info("Enter StudentServiceImpl:: method=findBySemester");
		List<Student> result;
		try 
		{
			result = studentRepository.findBySemester(sem);
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		if(result.size()==0)
		{
			System.out.println(" No Students found for this Semester : "+sem);
			return null;
		}
		logger.info("Exit StudentServiceImpl:: method=findBySemester");

		return result;
	}
	
	
	
	
	@Override
	public List<Student> findAll() throws ResourceNotFoundException,OperationFailedException
	{
		logger.info("Enter StudentServiceImpl:: method=findAll");
		List<Student> student;
		try 
		{
			student = studentRepository.findAll();
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		if(student.size()==0)
		{
			System.out.println("No Students Exist");
			return null;
		}
		logger.info("Exit StudentServiceImpl:: method=findAll");

		return student;
	}
	
	
	
	
	@Override
	public String remove(long studentId) throws OperationFailedException, ResourceNotFoundException {
		String returner;
		logger.info("Enter StudentServiceImpl:: method=remove");
		try 
		{
			studentRepository.deleteById(studentId);
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		returner="Deleted Successfully";
		logger.info("Exit StudentServiceImpl:: method=remove");

		return returner;
	}

}
