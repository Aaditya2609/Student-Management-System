import React, { Component } from 'react';
import "../styles/Delete.css";
import StudentService from "../Services/StudentService";
import Loader from "./Loader";

export default class Delete extends Component {

    state = {
        studentId: "",
        idError: "",
        foundStudent: {},
        notFound: false,
        found: false,
        showLoader: false
    };

    handleChange = async (e) => {
        await this.setState({ studentId: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ found:false, notFound:false, showLoader: true });
        // let a = document.getElementsByClassName("edit");
        // for (let i = 0; i < a.length; i++) {
        //     let attr = document.createAttribute("contentEditable");
        //     attr.value = "false";
        //     a[i].setAttributeNode(attr);
        // }

        StudentService.deleteById(this.state.studentId).then((response) => {
            console.log((response.data.response));
            if ((response.data.response) === null) {
                this.setState({ foundStudent: {}, notFound: true, found: false, showLoader: false });

            }
            else {
                this.setState({ foundStudent: response.data.response, notFound: false, found: true, showLoader: false });
            }
        });
    }


    render() {
        const foundStudent = this.state.foundStudent;
        return (
            <>
                <div id="deleteContainer" className="deleteContainer">
                    <form onSubmit={this.handleSubmit} className="deleteForm">
                        <h1 className="heading">Enter Student ID</h1>

                        <input type="number" required name="studentId" id="studentId" value={this.state.studentId} onChange={this.handleChange} placeholder=" Student Id" />

                        <button onClick={this.handleSubmit} className="deleteButton">Delete</button>
                        <br />
                    </form>
                </div>

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

                {(!this.state.notFound && this.state.found) && (
                    <div className="foundContainer" id="foundContainer">
                        <div className="result">
                            <tr className="deleterow">
                                <th className="deleteHead">Id</th>
                                <td className="deleteData">{foundStudent.studentId}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Name</th>
                                <td className="deleteData">{foundStudent.studentName}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Branch</th>
                                <td className="deleteData">{foundStudent.branch}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Mobile</th>
                                <td className="deleteData edit">{foundStudent.mobile}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">DOB</th>
                                <td className="deleteData">{foundStudent.dateOfBirth}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Email</th>
                                <td className="deleteData edit">{foundStudent.email}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Address</th>
                                <td className="deleteData edit">{foundStudent.addressLine}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">City</th>
                                <td className="deleteData edit">{foundStudent.city}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Country</th>
                                <td className="deleteData edit">{foundStudent.state}</td>
                            </tr>
                            <tr className="deleterow">
                                <th className="deleteHead">Pincode</th>
                                <td className="deleteData edit">{foundStudent.pincode}</td>
                            </tr>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
