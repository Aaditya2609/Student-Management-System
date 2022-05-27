import React, { Component } from 'react';
import "../styles/Search.css";
import "../styles/AddStudent.css"
import "../styles/SearchByName.css"
import StudentService from "../Services/StudentService";
import Loader from "./Loader";
import ReactPaginate from 'react-paginate';
export default class SearchByName extends Component {

    state = {
        studentName: "",
        nameError: "",
        foundStudents: [],
        showForm: true,
        notFound: false,
        found: false,
        showLoader: false,
        showFullDetails: false,
        intoConsideration: {},
        deletePrompt: false,
        deleted: false,


        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0
    };

    handleChange = async (e) => {
        await this.setState({ studentName: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.studentName) {
            this.setState({ nameError: "" })

            this.setState({ showForm: true, found: false, notFound: false, showLoader: true, showFullDetails: false, deleted: false });

            StudentService.getByName(this.state.studentName).then(async (response) => {

                if ((response.data.response) == null) {
                    this.setState({ showForm: true, foundStudents: {}, notFound: true, found: false, showLoader: false, showFullDetails: false, deleted: false });

                }
                else {
                    await this.setState({ showForm: true, foundStudents: response.data.response, notFound: false, found: true, showLoader: false, showFullDetails: false, deleted: false });
                    this.receivedData();
                }
            });
        }
        else {
            this.setState({ nameError: "Required" });
        }
    }

    receivedData = () => {
        const slice = this.state.foundStudents.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(value => <React.Fragment>
            <tr className="Searchrow">
                <td className="SearchData IdData">{value.studentId}</td>
                <td className="SearchData NameData">{value.studentName}</td>
                <td className="SearchData EmailData">{value.email}</td>
                <td className="SearchData DOBData">{value.dateOfBirth}</td>
                <td className="SearchData LinkData"><div className="dataLink" onClick={() => {
                    this.showFullDetails(value.studentId)
                }}>Click Here</div></td>
            </tr>
        </React.Fragment>)

        this.setState({
            pageCount: Math.ceil(this.state.foundStudents.length / this.state.perPage),

            postData
        })
    }


    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };


    showFullDetails = (id) => {
        this.setState({
            showForm: false, found: false, notFound: false, showLoader: false, showFullDetails: true, deleted: false, intoConsideration: this.state.foundStudents.filter(value => value.studentId === id)[0]
        });
        console.log(this.state.intoConsideration)
        setTimeout(() => {
            this.showResult();
        }, 20);
    }

    goBack = () => {
        this.setState({ deletePrompt: false, showForm: true, deleted: false, found: false, notFound: false, showLoader: false, showFullDetails: false, studentName: "" });
    }
    showDeletePrompt = () => {
        this.setState({ deletePrompt: true });
    }

    deleteStudent = () => {
        this.setState({ deletePrompt: false, showLoader: true, showFullDetails: true });

        StudentService.deleteById(this.state.intoConsideration.studentId).then((response) => {
            setTimeout(() => {
                this.setState({ showForm: false, showFullDetails: false, found: false, notFound: false, showLoader: false, deleted: true });
            }, 2000);

        });
    }

    showResult = () => {
        let i = 1;
        let dummy = document.getElementById("dummy");
        if (this.state.intoConsideration.result.length === 0) {
            let data = document.createElement("div");
            let attribute = document.createAttribute("class");
            attribute.value = "data bottom";
            data.setAttributeNode(attribute);
            data.innerHTML = "Not Available";
            dummy.appendChild(data);
        }
        else {
            for (let x of this.state.intoConsideration.result) {
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
        const foundStudent = this.state.intoConsideration;
        return (
            <>
                {this.state.showForm && (
                    <div id="searchContainer" className="searchContainer">
                        <form onSubmit={this.handleSubmit} className="searchForm">
                            <h1 className="heading">Enter Student Name</h1>

                            <input type="text" required name="studentName" id="studentId" value={this.state.studentName} onChange={this.handleChange} placeholder=" Student Name : " />
                            <div className="error" style={{ color: "red" }}>{this.state.nameError}</div>

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
                        <p className='notFoundText'>No Student/s With this Name</p>
                    </div>
                )}

                {this.state.deleted && (
                    <div id="popOver">
                        <p id="popText">The Student with Id: {this.state.intoConsideration.studentId} and Name: {this.state.intoConsideration.studentName} is deleted permanently</p>
                        <button id="popButton" onClick={this.goBack}>OK</button>
                    </div>
                )}

                {(!this.state.notFound && this.state.found) && (
                    <div className="foundContainer" id="foundContainer" style={{ flexDirection: "column" }}>
                        <div className="result">
                            <tr className="Searchrow">
                                <th className="SearchHead Id">Id</th>
                                <th className="SearchHead Name">Name</th>
                                <th className="SearchHead Email">Email</th>
                                <th className="SearchHead DOB">DOB</th>
                                <th className="SearchHead Link">View Full Details</th>
                            </tr>
                            {this.state.postData}
                            <ReactPaginate
                                previousLabel={<i class="fa fa-arrow-left"></i>}
                                nextLabel={<i class="fa fa-arrow-right"></i>}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={this.state.pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"} />
                            <div className="totalCount"><i class="fa fa-archive" style={{ fontSize: "27px", marginRight: "10px" }} />Total Students enrolled with this Name: {this.state.foundStudents.length}</div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
