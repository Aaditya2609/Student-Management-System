import React, { Component } from 'react';
import "../styles/Search.css";
import StudentService from "../Services/StudentService";
import Loader from "./Loader";
export default class UpdateSemResult extends Component {

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

        resultUser: "",
        resultUserError: "",
        semester: ""
    };

    handleChange = async (e) => {
        let elem = e.target.name;
        let value = e.target.value;
        switch (elem) {

            case "studentId": await this.setState({ studentId: value });
                break;

            case "semester": await this.setState({ semester: value });
                break;

            case "resultUser": await this.setState({ resultUser: value });
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

                if ((response.data.response) === null) {
                    this.setState({ showSearchForm: true, foundStudent: {}, notFound: true, found: false, showLoader: false, showUpdateForm: false, showFullDetails: false });

                }
                else {
                    this.setState({ showSearchForm: true, foundStudent: response.data.response, notFound: false, found: true, showLoader: false, showUpdateForm: false, showFullDetails: false, semester: response.data.response.result.length + 1 });
                }
            });
        }
        else {
            this.setState({ idError: "Required" });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.resultUser) {
            this.setState({ resultUserError: "" });
            this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: true, showUpdateForm: false, showFullDetails: false });


            // StudentService.updateSemResult(this.state.studentId, Number(this.state.semester), Number(this.state.resultUser)).then((response) => {

            //     StudentService.getById(this.state.studentId).then(async (resp) => {
            //         this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: false, showUpdateForm: false, showFullDetails: true });
            //         await this.setState({ updatedStudent: resp.data.response });
            //         setTimeout(() => {
            //             this.showResult();
            //         }, 20);
            //     });

            // });



            StudentService.updateSemResult(this.state.studentId, Number(this.state.semester), Number(this.state.resultUser))

            StudentService.getById(this.state.studentId).then(async (resp) => {
                this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: false, showUpdateForm: false, showFullDetails: true });
                await this.setState({ updatedStudent: resp.data.response });
                // console.log(this.state.updatedStudent)
                // console.log(resp.data.response)
                setTimeout(() => {
                    this.showResult();
                }, 20);
            });


        }
        else {
            this.setState({ resultUserError: "Required" });
        }

    }


    showUpdateFormFunc = () => {
        this.setState({ showSearchForm: false, found: false, notFound: false, showLoader: false, showUpdateForm: true, showFullDetails: false });
    }

    showResult = () => {
        let i = 1;
        let dummy = document.getElementById("dummy");
        if (this.state.updatedStudent.result.length === 0) {
            let data = document.createElement("div");
            let attribute = document.createAttribute("class");
            attribute.value = "data bottom";
            data.setAttributeNode(attribute);
            data.innerHTML = "Not Available";
            dummy.appendChild(data);
        }
        else {
            for (let x of this.state.updatedStudent.result) {
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

                            <input type="number" required name="studentId" id="studentId" value={this.state.studentId} onChange={this.handleChange} placeholder=" Student Id" />
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
                                <th className="SearchHead Link">Update Result</th>
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
                            <h1 style={{ textDecoration: "underline" }} className="heading firstPage">Enter {this.state.semester} semester SGPA</h1>

                            {/* <input className="addInpt " type="number" name="semester" value={this.state.semester} onChange={this.handleChange} placeholder={`Enter semester number: `} /> */}

                            <input className="addInpt " type="number" name="resultUser" value={this.state.resultUser} onChange={this.handleChange} placeholder={`Enter ${this.state.semester} Semester result: `} />
                            <div className="error" style={{ color: "red" }}>{this.state.resultUserError}</div>
                            <button onClick={this.handleSubmit} className="addBtn">Update</button>

                        </form>
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
