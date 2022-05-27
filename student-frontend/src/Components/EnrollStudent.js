import React, { Component } from 'react'
import FacultyService from "../Services/FacultyService";
import StudentService from "../Services/StudentService";
import Loader from './Loader';
import "../styles/Search.css";
import "../styles/ChangePassword.css";

export default class EnrollStudent extends Component {
    state = {
        facultyId: this.props.id,
        studentId: "",
        idError: "",
        showStudentIdForm: true,
        studentNotFound: false,
        studentAlreadyEnrolled: false,
        showLoader: false,
        enrolled: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.studentId) {
            this.setState({ idError: "", showLoader: true, showStudentIdForm: true, studentAlreadyEnrolled: false, studentNotFound: false, enrolled: false });

            StudentService.getById(this.state.studentId).then((res) => {
                if (res.data.response) {

                    FacultyService.findFaculty(this.state.facultyId).then((result) => {
                        let alreadyEnrolledList = result.data.response.enrolledStudents;
                        let thisIsNotEnrolled = true;
                        if (alreadyEnrolledList.length > 0) {
                            for (let i of alreadyEnrolledList) {
                                if (String(i.studentId) === this.state.studentId) {
                                    thisIsNotEnrolled = false;
                                    this.setState({ showStudentIdForm: true, studentAlreadyEnrolled: true, studentNotFound: false, showLoader: false, enrolled: false })
                                }
                                else {
                                    continue;
                                }

                            }
                            if (thisIsNotEnrolled) {
                                FacultyService.enrollStudent(this.state.facultyId, this.state.studentId).then((response) => {
                                    this.setState({ showStudentIdForm: false, studentAlreadyEnrolled: false, showLoader: false, studentNotFound: false, enrolled: true })
                                })
                            }
                        }
                        else {
                            FacultyService.enrollStudent(this.state.facultyId, this.state.studentId).then((response) => {
                                this.setState({ showStudentIdForm: false, studentAlreadyEnrolled: false, showLoader: false, studentNotFound: false, enrolled: true })
                            })
                        }
                    })
                }
                else {
                    this.setState({ showStudentIdForm: true, studentAlreadyEnrolled: false, studentNotFound: true, showLoader: false, enrolled: false })
                }
            });
        }
        else {
            this.setState({ idError: "Required", showLoader: false, showStudentIdForm: true, studentAlreadyEnrolled: false, studentNotFound: false, enrolled: false });
        }
    }

    goBack = () => {
        this.setState({ studentId: "", showStudentIdForm: true, studentNotFound: false, studentAlreadyEnrolled: false, showLoader: false, enrolled: false })
    }
    render() {
        return (<>
            {this.state.showStudentIdForm && (
                <div id="searchContainer" className="searchContainer">
                    <form className="searchForm">
                        <h1 className="heading">Enter Student ID</h1>

                        <input type="number" required name="studentId" id="studentId" value={this.state.studentId} onChange={async (e) => { await this.setState({ studentId: e.target.value }) }} placeholder=" Student Id" />
                        <div className="error" style={{ color: "red" }}>{this.state.idError}</div>

                        <button onClick={this.handleSubmit} className="searchButton">Enroll Student</button>
                        <br />
                    </form>
                </div>
            )}

            {this.state.studentNotFound && (
                <div id="notFound">
                    <p className='notFoundText' style={{ color: "red" }}>No Student with This Id</p>
                </div>
            )}

            {this.state.studentAlreadyEnrolled && (
                <div id="notFound">
                    <p className='notFoundText' style={{ color: "red" }}>Student Already Enrolled</p>
                </div>
            )}
            {this.state.showLoader && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Loader show={this.state.showLoader}></Loader>
                </div>
            )}

            {this.state.enrolled && (<>
                <div style={{ display: "flex", marginRight: "82%", fontSize: "large", cursor: "pointer" }} onClick={this.goBack}><i className='icon fa fa-arrow-left' style={{ marginRight: "7px" }}></i>Go Back</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                    <p className='notFoundText'>Student Enrolled SuccessFully</p>
                    <p className='notFoundText'>Check The Details in "View Enrolled Student" Tab</p>
                </div>
            </>)
            }
        </>
        )
    }
}
