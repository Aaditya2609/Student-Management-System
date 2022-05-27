package com.minor1.StudentManagement.repository;

import org.springframework.stereotype.Repository;
import com.minor1.StudentManagement.entities.Student;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface StudentRepository  extends JpaRepository <Student,Long>{

	@Query(value="SELECT s FROM Student s WHERE s.studentName= :studentName")
	List<Student> findByName(@Param("studentName")String studentName);
	
	@Query(value="SELECT s FROM Student s WHERE s.semester= :sem")
	List<Student> findBySemester(@Param("sem")int sem);
	
//	@Query(value="SELECT s FROM Student s WHERE s.semester= :sem")
//	List<Student> getSemesterResult(@Param("sem")int sem);
	
	
}
