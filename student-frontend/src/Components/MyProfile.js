import React, { Component } from 'react'
import FacultyService from "../Services/FacultyService";
import "../styles/MyProfile.css";

export default class MyProfile extends Component {
    state = {
        id: this.props.id,
        faculty: {},
        view:true
    }
    componentDidMount = () => {
        FacultyService.findFaculty(this.state.id).then(async (response) => {
            await this.setState({ faculty: response.data.response })
        })
    }
    render() {
        const foundFaculty = this.state.faculty;
        console.log(this.state.faculty)
        return (<>
            {this.state.view && (
                <div id="fullDetails" style={{padding: "5% 0"}}>
                    <div className="details">
                        <tr>
                            <th className="myheading top">ID</th>
                            <td className="mydating top">{foundFaculty.facultyId}</td>
                        </tr>

                        <tr>
                            <th className="myheading">Name</th>
                            <td className="mydating">{foundFaculty.facultyName}</td>
                        </tr>

                        <tr>
                            <th className="myheading">UserName</th>
                            <td className="mydating">{foundFaculty.userName}</td>
                        </tr>

                        <tr>
                            <th className="myheading">Course</th>
                            <td className="mydating">{foundFaculty.course}</td>
                        </tr>
                    </div>
                </div>
            )}
        </>
        )
    }
}
