import React, { Component } from 'react';
import "../styles/Search.css";
import StudentService from "../Services/StudentService";
import Loader from "./Loader";
export default class SearchById extends Component {

    state = {
        studentId: "",
        idError: "",
        foundStudent: {},
        showForm: true,
        notFound: false,
        found: false,
        showLoader: false,
        showFullDetails: false,
        deletePrompt: false,
        deleted: false
    };

    handleChange = async (e) => {
        await this.setState({ studentId: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.studentId) {
            this.setState({ idError: "" });

            this.setState({ showForm: true, found: false, notFound: false, showLoader: true, showFullDetails: false, deleted: false });

            StudentService.getById(this.state.studentId).then((response) => {
                if ((response.data.response) === null) {
                    this.setState({ showForm: true, foundStudent: {}, notFound: true, found: false, showLoader: false, showFullDetails: false, deleted: false });

                }
                else {
                    this.setState({ showForm: true, foundStudent: response.data.response, notFound: false, found: true, showLoader: false, showFullDetails: false, deleted: false });
                }
            });
        }
        else {
            this.setState({ idError: "Required" });
        }
    }

    showFullDetails = () => {
        this.setState({ showForm: false, found: false, notFound: false, showLoader: false, showFullDetails: true, deleted: false });
        setTimeout(() => {
            this.showResult();
        }, 20);
    }

    goBack = () => {
        this.setState({ deletePrompt: false, showForm: true, deleted: false, found: false, notFound: false, showLoader: false, showFullDetails: false, studentId: "" });
    }
    showDeletePrompt = () => {
        this.setState({ deletePrompt: true });
    }

    deleteStudent = () => {
        this.setState({ deletePrompt: false, showLoader: true, showFullDetails: true });

        StudentService.deleteById(this.state.studentId).then((response) => {
            setTimeout(() => {
                this.setState({ showForm: false, showFullDetails: false, found: false, notFound: false, showLoader: false, deleted: true });
            }, 2000);

        });
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
        return (
            <>
                {this.state.showForm && (
                    <div id="searchContainer" className="searchContainer">
                        <form className="searchForm">
                            <h1 className="heading">Enter Student ID</h1>

                            <input type="number" required name="studentId" id="studentId" value={this.state.studentId} onChange={this.handleChange} placeholder=" Student Id" />
                            <div className="error" style={{ color: "red" }}>{this.state.idError}</div>

                            <button onClick={this.handleSubmit} className="searchButton">Get Details</button>
                            <br />
                        </form>
                    </div>
                )}

                {this.state.showFullDetails && (
                    <div id="fullDetails">
                        <div className="details">
                            <tr>
                                <th className="head top">ID</th>
                                <td className="data top">{foundStudent.studentId}</td>
                            </tr>

                            <tr>
                                <th className="head">Name</th>
                                <td className="data">{foundStudent.studentName}</td>
                            </tr>

                            <tr>
                                <th className="head">Branch</th>
                                <td className="data">{foundStudent.branch}</td>
                            </tr>

                            <tr>
                                <th className="head">Semester</th>
                                <td className="data">{foundStudent.semester}</td>
                            </tr>

                            <tr>
                                <th className="head">Date Of Birth</th>
                                <td className="data">{foundStudent.dateOfBirth}</td>
                            </tr>

                            <tr>
                                <th className="head">Mobile</th>
                                <td className="data">{foundStudent.mobile}</td>
                            </tr>

                            <tr>
                                <th className="head">Email</th>
                                <td className="data">{foundStudent.email}</td>
                            </tr>

                            <tr>
                                <th className="head">Address Line</th>
                                <td className="data">{foundStudent.addressLine}</td>
                            </tr>

                            <tr>
                                <th className="head">City</th>
                                <td className="data">{foundStudent.city}</td>
                            </tr>

                            <tr>
                                <th className="head">State</th>
                                <td className="data">{foundStudent.state}</td>
                            </tr>

                            <tr>
                                <th className="head">Pincode</th>
                                <td className="data">{foundStudent.pincode}</td>
                            </tr>

                            <div style={{ display: "flex" }}>
                                <div className="resultCol head"> Result</div>
                                <div id="dummy"></div>
                            </div>

                        </div>
                        <div className="buttons">
                            {/* <button className="update BTN" onClick={this.gotoUpdatedTab} >Update</button> */}
                            <button className="delete BTN" onClick={this.showDeletePrompt}>Delete</button>
                            <button className="ok BTN" onClick={this.goBack}>Back</button>
                        </div>
                    </div>
                )}

                {this.state.deletePrompt && (
                    <div className="prompt">Do You Wish to Continue ? <br />
                        <button className="sure-btn" onClick={this.deleteStudent}>Yes</button>
                        <button className="cancel-btn" onClick={() => { this.setState({ deletePrompt: false }); }}>Cancel</button>
                    </div>
                )}
                {this.state.showLoader && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Loader show={this.state.showLoader}></Loader>
                    </div>
                )}

                {(this.state.notFound && !this.state.found) && (
                    <div id="notFound">
                        <p className='notFoundText'>No Student With this Id</p>
                    </div>
                )}

                {this.state.deleted && (
                    <div id="popOver">
                        <p id="popText">The Student with Id: {this.state.studentId} is deleted permanently</p>
                        <button id="popButton" onClick={this.goBack}>OK</button>
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
                                <th className="SearchHead Link">View Full Details</th>
                            </tr>

                            <tr className="Searchrow">
                                <td className="SearchData IdData">{foundStudent.studentId}</td>
                                <td className="SearchData NameData">{foundStudent.studentName}</td>
                                <td className="SearchData BranchData">{foundStudent.branch}</td>
                                <td className="SearchData DOBData">{foundStudent.dateOfBirth}</td>
                                <td className="SearchData LinkData"><div className="dataLink" onClick={() => {
                                    this.showFullDetails(foundStudent)
                                }}>Click Here</div></td>
                            </tr>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
