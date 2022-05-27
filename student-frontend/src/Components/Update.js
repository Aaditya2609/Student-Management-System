import React, { Component } from 'react';
import "../styles/Search.css";

import StudentService from "../Services/StudentService";
import Loader from "./Loader";
import Student from "../Entities/Student";
export default class Update extends Component {

    state = {
        studentId: "",
        idError: "",
        foundStudent: {},
        updatedStudent: {},
        showSearchForm: true,
        notFound: false,
        found: false,
        showLoader: false,
        showUpdateForm: false,
        showFullDetails: false,

        mobile: "",
        semester: "",
        email: "",
        branch: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    };

    handleChangeSearch = (e) => {
        this.setState({ studentId: e.target.value });
    }

    handleChange = async (e) => {
        let elem = e.target.name;
        let value = e.target.value;
        switch (elem) {

            case "mobile": await this.setState({ mobile: value });
                break;

            case "semester": await this.setState({ semester: value });
                break;

            case "email": await this.setState({ email: value });
                break;

            case "branch": await this.setState({ branch: value });
                break;

            case "address": await this.setState({ address: value });
                break;

            case "city": await this.setState({ city: value });
                break;

            case "state": await this.setState({ state: value });
                break;

            case "pincode": await this.setState({ pincode: value });
                break;

            default: break;
        }

    }

    handleSubmitSearch = (e) => {
        e.preventDefault();
        if (this.state.studentId) {
            this.setState({ idError: "" });
            this.setState({ showSearchForm: true, showLoader: true, found: false, notFound: false, showUpdateForm: false, showFullDetails: false });

            StudentService.getById(this.state.studentId).then((response) => {
                // console.log((response.data.response));
                if ((response.data.response) === null) {
                    this.setState({ showSearchForm: true, foundStudent: {}, notFound: true, found: false, showLoader: false, showUpdateForm: false, showFullDetails: false });

                }
                else {
                    this.setState({ showSearchForm: true, foundStudent: response.data.response, notFound: false, found: true, showLoader: false, showUpdateForm: false, showFullDetails: false });
                }
            });
        }
        else {
            this.setState({ idError: "Required" })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: true, showUpdateForm: false, showFullDetails: false });

        //studentName, mobile, semester, email, dateOfBirth, branch, addressLine, city, state, pincode
        let sname = null;
        let sdob = null;
        let smob, ssem, semail, sbranch, saddress, scity, sstate, spincode;

        if (this.state.mobile === "") {
            smob = null;
        }
        else {
            smob = this.state.mobile;
        }



        if (this.state.semester === "") {
            ssem = null;
        }
        else {
            ssem = this.state.semester;
        }



        if (this.state.email === "") {
            semail = null;
        }
        else {
            semail = this.state.email;
        }



        if (this.state.branch === "") {
            sbranch = null;
        }
        else {
            sbranch = this.state.branch;
        }



        if (this.state.address === "") {
            saddress = null;
        }

        else {
            saddress = this.state.address;
        }



        if (this.state.city === "") {
            scity = null;
        }

        else {
            scity = this.state.city;
        }



        if (this.state.state === "") {
            sstate = null;
        }
        else {
            sstate = this.state.state;
        }



        if (this.state.pincode === "") {
            spincode = null;
        }
        else {
            spincode = this.state.pincode;
        }


        let student = new Student(sname, smob, ssem, semail, sdob, sbranch, saddress, scity, sstate, spincode);

        StudentService.updateStudent(this.state.studentId, student).then((response) => {

            this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: false, showUpdateForm: false, showFullDetails: true });
            this.setState({ updatedStudent: response.data.response });
            setTimeout(() => {
                this.showResult();
            }, 20);

        });

    }

    gotoFirstPage = () => {
        let a = document.getElementsByClassName("firstPage");
        for (let i = 0; i < a.length; i++)
            a[i].style.display = "block";

        document.getElementById("pageNumber").innerText = "1";

        let b = document.getElementsByClassName("secondPage");
        for (let i = 0; i < b.length; i++)
            b[i].style.display = "none";
    }

    gotoSecondPage = () => {
        let a = document.getElementsByClassName("firstPage");
        for (let i = 0; i < a.length; i++)
            a[i].style.display = "none";

        document.getElementById("pageNumber").innerText = "2";

        let b = document.getElementsByClassName("secondPage");
        for (let i = 0; i < b.length; i++)
            b[i].style.display = "block";
    }

    showUpdateFormFunc = () => {
        this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: false, showUpdateForm: true, showFullDetails: false });
    }

    showResult = () => {
        let i = 1;
        let dummy = document.getElementById("dummy");
        if (this.state.foundStudent.result.length === 0) {
            let data = document.createElement("div");
            let attribute = document.createAttribute("class");
            attribute.value = "data bottom";
            data.setAttributeNode(attribute);
            data.innerHTML = "Not Available";
            dummy.appendChild(data);
        }
        else {
            for (let x of this.state.foundStudent.result) {
                let data = document.createElement("div");
                let attribute = document.createAttribute("class");
                attribute.value = "data bottom";
                data.setAttributeNode(attribute);
                data.innerHTML = `Sem ${i}: ${x} SGPA`;
                dummy.appendChild(data);
                i++;
            }
        }
    }

    render() {
        const foundStudent = this.state.foundStudent;
        const updatedStudent = this.state.updatedStudent;
        return (
            <>
                {this.state.showSearchForm && (
                    <div id="searchContainer" className="searchContainer">
                        <form onSubmit={this.handleSubmitSearch} className="searchForm">
                            <h1 className="heading">Enter Student ID</h1>

                            <input type="number" required name="studentId" id="studentId" value={this.state.studentId} onChange={this.handleChangeSearch} placeholder=" Student Id" />
                            <div className="error" style={{ color: "red" }}>{this.state.idError}</div>

                            <button onClick={this.handleSubmitSearch} className="searchButton">Check Availability</button>
                            <br />
                        </form>
                    </div>
                )}

                {(this.state.notFound && !this.state.found) && (
                    <div id="notFound">
                        <p className='notFoundText'>No Student With this Id</p>
                    </div>
                )}


                {(!this.state.notFound && this.state.found) && (
                    <div className="foundContainer" id="foundContainer">
                        <div className="result">
                            <tr className="Searchrow">
                                <th className="SearchHead Id">Id</th>
                                <th className="SearchHead Name">Name</th>
                                <th className="SearchHead Branch">Branch</th>
                                <th className="SearchHead DOB">DOB</th>
                                <th className="SearchHead Link">Update Details</th>
                            </tr>

                            <tr className="Searchrow">
                                <td className="SearchData">{foundStudent.studentId}</td>
                                <td className="SearchData">{foundStudent.studentName}</td>
                                <td className="SearchData">{foundStudent.branch}</td>
                                <td className="SearchData">{foundStudent.dateOfBirth}</td>
                                <td className="SearchData"><div className="dataLink" onClick={this.showUpdateFormFunc}>Click Here</div></td>
                            </tr>
                        </div>
                    </div>
                )}


                {this.state.showUpdateForm && (
                    <div className="addContainer" id="addContainer">
                        <form method="POST" onSubmit={this.handleSubmit} className="addForm">
                            <h1 style={{ textDecoration: "underline" }} className="heading firstPage">Personal Details</h1>

                            <h2 className="firstPage">(Enter those fields which you wan't to update)</h2>

                            <input className="addInpt firstPage" type="number" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} placeholder="Mobile: " />

                            <input className="addInpt firstPage" type="number" id="semester" name="semester" value={this.state.semester} onChange={this.handleChange} placeholder="Semester: " />

                            <input className="addInpt firstPage" type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email Id: " />

                            <input className="addInpt firstPage" type="text" id="branch" name="branch" value={this.state.branch} onChange={this.handleChange} placeholder="Branch" />

                            <h1 style={{ textDecoration: "underline" }} className="heading secondPage">Address Details</h1>

                            <h2 className="secondPage">(Enter those fields which you wan't to update)</h2>

                            <input className="addInpt secondPage" type="text" id="address" name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address Line: " />

                            <input className="addInpt secondPage" type="text" id="city" name="city" value={this.state.city} onChange={this.handleChange} placeholder="City: " />

                            <input className="addInpt secondPage" type="text" id="state" name="state" value={this.state.state} onChange={this.handleChange} placeholder="state: " />

                            <input className="addInpt secondPage" type="number" id="pincode" name="pincode" value={this.state.pincode} onChange={this.handleChange} placeholder="Area Pincode: " />

                            <button onClick={this.handleSubmit} className="addBtn secondPage">Update</button>

                        </form>
                        <div className="pagination" id="pagination">
                            <div id="backward"><i class="fa fa-arrow-left" onClick={this.gotoFirstPage}></i></div>
                            <div id="pageNumber">1</div>
                            <div id="forward"><i class="fa fa-arrow-right" onClick={this.gotoSecondPage}></i></div>
                        </div>
                    </div>
                )}

                {this.state.showLoader && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Loader show={this.state.showLoader}></Loader>
                    </div>
                )}

                {this.state.showFullDetails && (
                    <div id="fullDetails">
                        <h2 className="fullDetailFormText">Updated Details are:</h2>
                        <div className="details">
                            <tr>
                                <th className="head top">ID</th>
                                <td className="data top">{updatedStudent.studentId}</td>
                            </tr>

                            <tr>
                                <th className="head">Name</th>
                                <td className="data">{updatedStudent.studentName}</td>
                            </tr>

                            <tr>
                                <th className="head">Branch</th>
                                <td className="data">{updatedStudent.branch}</td>
                            </tr>

                            <tr>
                                <th className="head">Semester</th>
                                <td className="data">{updatedStudent.semester}</td>
                            </tr>

                            <tr>
                                <th className="head">Date Of Birth</th>
                                <td className="data">{updatedStudent.dateOfBirth}</td>
                            </tr>

                            <tr>
                                <th className="head">Mobile</th>
                                <td className="data">{updatedStudent.mobile}</td>
                            </tr>

                            <tr>
                                <th className="head">Email</th>
                                <td className="data">{updatedStudent.email}</td>
                            </tr>

                            <tr>
                                <th className="head">Address Line</th>
                                <td className="data">{updatedStudent.addressLine}</td>
                            </tr>

                            <tr>
                                <th className="head">City</th>
                                <td className="data">{updatedStudent.city}</td>
                            </tr>

                            <tr>
                                <th className="head">State</th>
                                <td className="data">{updatedStudent.state}</td>
                            </tr>

                            <tr>
                                <th className="head">Pincode</th>
                                <td className="data">{updatedStudent.pincode}</td>
                            </tr>

                            <div style={{ display: "flex" }}>
                                <div className="resultCol head"> Result</div>
                                <div id="dummy"></div>
                            </div>
                        </div>
                        <button style={{ width: "20%" }} onClick={() => {
                            this.setState({ showFullDetails: false, showSearchForm: true, studentId: "" })
                        }} className="addBtn">Back</button>
                    </div>
                )}
            </>
        )
    }
}
