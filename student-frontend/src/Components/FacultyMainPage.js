import React from 'react';
import '../styles/Admin.css';
import ViewEnrolledStudent from "./ViewEnrolledStudent";
import EnrollStudent from "./EnrollStudent";
import ChangePassword from "./ChangePassword"
import MyProfile from "./MyProfile"
import WelcomePageFaculty from "./WelcomePageFaculty";
import { Redirect } from "react-router-dom";
import adminLogo from "../images/adminImage.png";

class FacultyMainPage extends React.Component {
    useless;

    componentDidMount = () => {
        this.disableOrNot();
    }
    state = {
        disable: true,
        dashboard: true,
        viewEnrolledStudent:false,
        enrollStudent:false,
        findFaculty: false,
        changePassword:false,
        logout: false,
        showfaculty: JSON.parse(localStorage.getItem("loggedInUser"))

    };
    myState = {
        showfaculty2: this.state.showfaculty ? (new Date().getMinutes() === (JSON.parse(localStorage.getItem("loggedInUser")).factor)) : false
        // showfaculty2: true
    }

    disableOrNot = () => {
        this.setState({ disable: false });
    }

    handleClick = (elem) => {
        // if (elem === "dashboard") {
        //     this.setState({ dashboard:true, addStudent: false, update: false, delete: false, search: false, logout: false, addFaculty:false });
        // }

        if (elem === "findFaculty") {
            if (!this.state.disable) {
                this.setState({ dashboard: false, viewEnrolledStudent:false, findFaculty: true, changePassword: false, enrollStudent: false, logout: false});
            }
        }

        if (elem === "changePassword") {
            if (!this.state.disable) {
                this.setState({ dashboard: false, viewEnrolledStudent:false, findFaculty: false, changePassword: true, enrollStudent: false, logout: false});
            }
        }

        if (elem === "enrollStudent") {
            if (!this.state.disable) {
                this.setState({ dashboard: false, viewEnrolledStudent:false, findFaculty: false, changePassword: false, enrollStudent: true, logout: false});
            }
        }
        if (elem === "viewEnrolledStudent") {
            if (!this.state.disable) {
                this.setState({ dashboard: false, viewEnrolledStudent:true, findFaculty: false, changePassword: false, enrollStudent: false, logout: false});
            }
        }

        if (elem === "logout") {
            if (!this.state.disable) {
                this.setState({ dashboard: false, viewEnrolledStudent:false, findFaculty: false, changePassword: false, enrollStudent: false, logout: true});
            }
        }

    }

    goToLoginPage = () => {
        localStorage.removeItem("loggedInUser");
        return <Redirect to="/" />

    }
    render() {
        if (this.myState.showfaculty2) {
            return (
                <div className="container1">
                    <div className="navbar">
                        <div id="user">
                            <img src={adminLogo} className="adminImage" alt="adminImage"></img>
                            <div className="adminName"><i className='fa fa-circle' style={{ fontSize: "18px", marginRight: "10px", color: "rgb(0, 200, 0)" }}></i>{this.state.showfaculty.userName.slice(1)}</div>
                        </div>

                        {/* <div id="dashboard" className="leftitem" onClick={() => { this.handleClick("dashboard") }}><i className="fa fa-tachometer" style={{fontSize:"30px",marginRight:"10px"}}></i>Dashboard</div> */}

                        <div id="viewEnrollStudent" className="leftitem" onClick={() => { this.handleClick("viewEnrolledStudent") }}><i className='icon fa fa-eye' ></i>View Enrolled Student</div>

                        <div id="enrollStudent" className="leftitem" onClick={() => { this.handleClick("enrollStudent") }}><i className='icon fa fa-plus' ></i>Enroll Students</div>

                        <div id="findFaculty" className="leftitem" onClick={() => { this.handleClick("findFaculty") }}><i className='icon fa fa-id-badge'></i>View My profile</div>

                        <div id="changePassword" className="leftitem" onClick={() => { this.handleClick("changePassword") }}><i className='icon fa fa-key'></i>Change Password</div>

                        <div id="logout" className="leftitem" onClick={() => { this.handleClick("logout") }}><i className='icon fa fa-sign-out'></i>Logout</div>
                    </div>

                    <div className="openWindow">
                        <div className="main">
                            {(this.state.dashboard) ? <WelcomePageFaculty /> : ""}
                            {(this.state.viewEnrolledStudent) ? <ViewEnrolledStudent id={this.state.showfaculty.userName.slice(0,1)} /> : ""}
                            {(this.state.enrollStudent) ? <EnrollStudent id={this.state.showfaculty.userName.slice(0,1)} /> : ""}
                            {(this.state.findFaculty) ? <MyProfile id={this.state.showfaculty.userName.slice(0,1)} /> : ""}
                            {(this.state.changePassword) ? <ChangePassword id={this.state.showfaculty.userName.slice(0,1)} /> : ""}
                            {(this.state.logout) ? (this.goToLoginPage()) : ""}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (<Redirect to="/" />);
        }
    }
}

export default FacultyMainPage;

