package com.minor1.StudentManagement.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minor1.StudentManagement.entities.Admin;
import com.minor1.StudentManagement.exception.OperationFailedException;
import com.minor1.StudentManagement.exception.ResourceNotFoundException;
import com.minor1.StudentManagement.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	private static Logger logger=LoggerFactory.getLogger(StudentServiceImpl.class);

	@Autowired
	AdminRepository adminRepository;
		
	
	@Transactional
	@Override
	public Admin addAdmin(Admin admin) throws OperationFailedException {
		
		logger.info("Enter AdminServiceImpl:: method=addAdmin");
		try{
			admin= adminRepository.save(admin);
		}
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		logger.info("Exit AdminServiceImpl:: method=addAdmin");
		return admin;
	}
	
	@Override
	public Admin findAdmin(String adminId) throws OperationFailedException, ResourceNotFoundException {
		
		logger.info("Enter AdminServiceImpl:: method=findAdmin");
		Optional<Admin> admin;
		try 
		{
			admin = adminRepository.findById(adminId);
		} 
		catch(Exception e)
		{
			throw new OperationFailedException(e.getMessage());
		}
		if(!admin.isPresent())
		{
			System.out.println("Admin Not found for this id : "+adminId);
			return null;
		}
		logger.info("Exit AdminServiceImpl:: method=findAdmin");

		return admin.get();
	}

	@Override
	public String changePassword(String adminId, String oldPassword, String newPassword) throws ResourceNotFoundException {

		logger.info("Enter AdminServiceImpl:: method=changePassword");
		String a;
		try {
			
			Optional<Admin> adm=adminRepository.findById(adminId);
			
			if(oldPassword.equals(adm.get().getPassword()))
			{
				adm.get().setPassword(newPassword);
				a="Password Changed Succesfully";
				adminRepository.save(adm.get());
			}
			else {
				a="Wrong Password";
			}
			
		}
		
		catch(Exception e) {
			throw new OperationFailedException(e.getMessage());
		}
		
		logger.info("Exit AdminServiceImpl:: method=changePassword");
		return a;
	}

	
}
