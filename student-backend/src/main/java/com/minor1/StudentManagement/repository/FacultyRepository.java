package com.minor1.StudentManagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.minor1.StudentManagement.entities.Faculty;

@Repository
public interface FacultyRepository  extends JpaRepository <Faculty,Long>{	
	
}
