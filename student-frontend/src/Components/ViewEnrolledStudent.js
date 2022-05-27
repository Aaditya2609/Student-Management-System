import React, { Component } from 'react'
import FacultyService from "../Services/FacultyService";
import "../styles/Search.css";
import "../styles/AddStudent.css"
import "../styles/SearchByName.css"
import ReactPaginate from 'react-paginate';

export default class ViewEnrolledStudent extends Component {
    state = {
        id:this.props.id,
        showLessDetail: true,
        showFullDetail: false,
        enrolledStudents: [],
        intoConsideration: {},




        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0
    }

    componentDidMount = () => {
        this.receivedData();
    }
    receivedData=()=>{
        FacultyService.findFaculty(Number(this.state.id)).then(async (resp) => {
            await this.setState({ enrolledStudents: resp.data.response.enrolledStudents })

            const slice = this.state.enrolledStudents.slice(this.state.offset, this.state.offset + this.state.perPage)
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
                pageCount: Math.ceil(this.state.enrolledStudents.length / this.state.perPage),

                postData
            })
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
            showLessDetail: false, showFullDetail: true, intoConsideration: this.state.enrolledStudents.filter(value => value.studentId === id)[0]
        });
        // console.log(this.state.intoConsideration)
        setTimeout(() => {
            this.showResult();
        }, 20);
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
        return (<>
            {this.state.showLessDetail && (
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
                        <div className="totalCount"><i class="fa fa-archive" style={{ fontSize: "27px", marginRight: "10px" }} />Total Students enrolled with this Course: {this.state.enrolledStudents.length}</div>
                    </div>
                </div>
            )}

            {this.state.showFullDetail && (
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
                        <button className="ok BTN" onClick={() => { this.setState({ showLessDetail: true, showFullDetail: false }) }}>Back</button>
                    </div>
                </div>
            )}
        </>
        )
    }
}
