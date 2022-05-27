package com.minor1.StudentManagement.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "admin_tbl")
public class Admin {

	@Id
	private String userName;

	private String password;

	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public Admin(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
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

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
