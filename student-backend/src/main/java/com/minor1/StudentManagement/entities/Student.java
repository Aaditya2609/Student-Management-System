package com.minor1.StudentManagement.entities;


import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="student_tbl")
public class Student{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long studentId;
	
	@NotNull(message="Name cant't be null...")
	private String studentName;

	@NotNull(message="Mobile Number cant't be null...")
	private String mobile;
	
	@NotNull(message="Semester cant't be null...")
	private int semester;

	@NotNull(message="Email cant't be null...")
	private String email;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	@NotNull(message="Date cant't be null...")
	private LocalDate dateOfBirth;
	
	@NotNull(message="Branch cant't be null...")
	private String branch;
	
	
	@NotNull(message="Address cant't be null...")
	private String addressLine;

	@NotNull(message="City cant't be null...")
	private String city;

	@NotNull(message="State cant't be null...")
	private String state;

	@NotNull(message="Pincode cant't be null...")
	private long pincode;
	
    @ElementCollection(targetClass=Float.class)
	private List<Float> result;

	
	public Student() {
		super();
	}

	
	
	public Student(long studentId, @NotNull(message = "Name cant't be null...") String studentName,
			@NotNull(message = "Mobile Number cant't be null...") String mobile,
			@NotNull(message = "Semester cant't be null...") int semester,
			@NotNull(message = "Email cant't be null...") String email,
			@NotNull(message = "Date cant't be null...") LocalDate dateOfBirth,
			@NotNull(message = "Branch cant't be null...") String branch,
			@NotNull(message = "Address cant't be null...") String addressLine,
			@NotNull(message = "City cant't be null...") String city,
			@NotNull(message = "State cant't be null...") String state,
			@NotNull(message = "Pincode cant't be null...") long pincode, List<Float> result) {
		super();
		this.studentId = studentId;
		this.studentName = studentName;
		this.mobile = mobile;
		this.semester = semester;
		this.email = email;
		this.dateOfBirth = dateOfBirth;
		this.branch = branch;
		this.addressLine = addressLine;
		this.city = city;
		this.state = state;
		this.pincode = pincode;
		this.result = result;
	}



	public long getStudentId() {
		return studentId;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public int getSemester() {
		return semester;
	}

	public void setSemester(int semester) {
		this.semester = semester;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getAddressLine() {
		return addressLine;
	}

	public void setAddressLine(String addressLine) {
		this.addressLine = addressLine;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public long getPincode() {
		return pincode;
	}

	public void setPincode(long pincode) {
		this.pincode = pincode;
	}


	public List<Float> getResult() {
		return result;
	}


	public void setResult(List<Float> result) {
		this.result = result;
	}



	@Override
	public String toString() {
		return "Student [studentId=" + studentId + ", studentName=" + studentName + ", mobile=" + mobile + ", semester="
				+ semester + ", email=" + email + ", dateOfBirth=" + dateOfBirth + ", branch=" + branch
				+ ", addressLine=" + addressLine + ", city=" + city + ", state=" + state + ", pincode=" + pincode
				+ ", result=" + result + "]";
	}
	
	
}
