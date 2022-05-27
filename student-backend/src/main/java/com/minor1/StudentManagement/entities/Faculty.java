package com.minor1.StudentManagement.entities;


import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="faculty_tbl")
public class Faculty 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long facultyId;
	
	private String facultyName;
	
	private String userName;
	
	private String password;
	
	private String course;
	
	@OneToMany(targetEntity=Student.class)
	private List<Student> enrolledStudents;

	
	public Faculty() {
		super();
	}

	
	public Faculty(long facultyId, String facultyName, String userName, String password, String course,
			List<Student> enrolledStudents) {
		super();
		this.facultyId = facultyId;
		this.facultyName = facultyName;
		this.userName = userName;
		this.password = password;
		this.course = course;
		this.enrolledStudents = enrolledStudents;
	}



	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getPassword() {
		return password;
	}


	public String getCourse() {
		return course;
	}


	public void setCourse(String course) {
		this.course = course;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public long getFacultyId() {
		return facultyId;
	}

	public void setFacultyId(long facultyId) {
		this.facultyId = facultyId;
	}

	public String getFacultyName() {
		return facultyName;
	}

	public void setFacultyName(String facultyName) {
		this.facultyName = facultyName;
	}

	public List<Student> getEnrolledStudents() {
		return enrolledStudents;
	}

	public void setEnrolledStudents(List<Student> enrolledStudents) {
		this.enrolledStudents = enrolledStudents;
	}

	
}
