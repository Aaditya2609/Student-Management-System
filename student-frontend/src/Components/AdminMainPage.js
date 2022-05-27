import React from 'react';
import '../styles/Admin.css';
import AddStudent from './AddStudent';
import AddFaculty from './AddFaculty';
import SearchById from "./SearchById";
import SearchByName from "./SearchByName";
import SearchBySemester from "./SearchBySemester";
import UpdateSemResult from "./UpdateSemResult";
import ChangeAdminPassword from "./ChangeAdminPassword";
import Update from "./Update";
import { Redirect } from "react-router-dom";
import adminLogo from "../images/adminImage.png";

class AdminMainPage extends React.Component {
    useless;

    // componentDidMount = () => {
    //     this.disableOrNot();
    // }
    state = {
        disable: true,
        dashboard: true,
        selectValue: "",
        addStudent: false,
        update: false,
        updateresult: false,
        searchById: false,
        searchByName: false,
        searchBySemester: false,
        changePassword: false,
        logout: false,
        addFaculty: false,
        showadmin: JSON.parse(localStorage.getItem("loggedInUser"))

    };
    myState = {
        showadmin2: this.state.showadmin ? (new Date().getMinutes() === (JSON.parse(localStorage.getItem("loggedInUser")).factor)) : false
        // showadmin2: true
    }

    // disableOrNot = () => {
    //     let a = document.getElementsByClassName("leftitem")
    //     document.getElementsByClassName("leftitem-dropdown")[0].style.cursor = "no-drop";
    //     for (let c of a) {
    //         c.style.cursor = "no-drop";
    //     }
    //     setTimeout(() => {
    //         this.setState({ disable: false });
    //         let a = document.getElementsByClassName("leftitem")
    //         document.getElementsByClassName("leftitem-dropdown")[0].style.cursor = "pointer";
    //         for (let c of a) {
    //             c.style.cursor = "pointer";
    //         }
    //     // }, 14000);
    //     },200);
    // }

    handleClick = (elem) => {
        // if (elem === "dashboard") {
        //     this.setState({ dashboard:true, addStudent: false, update: false, updateResult:false, searchById: false, searchByName: false, searchBySemester: false, changePassword:false, logout: false, addFaculty:false });
        // }

        if (elem === "addStudent") {
            
                this.setState({ dashboard: false, addStudent: true, update: false, updateResult: false, searchById: false, searchByName: false, searchBySemester: false, changePassword: false, logout: false, addFaculty: false });
            
        }

        if (elem === "update") {
            
                this.setState({ dashboard: false, addStudent: false, update: true, updateResult: false, searchById: false, searchByName: false, searchBySemester: false, changePassword: false, logout: false, addFaculty: false });
            

        }

        if (elem === "updateresult") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: true, searchById: false, searchByName: false, searchBySemester: false, changePassword: false, logout: false, addFaculty: false });
            

        }

        if (elem === "id") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: false, searchById: true, searchByName: false, searchBySemester: false, changePassword: false, logout: false, addFaculty: false }); 
            
        }

        if (elem === "name") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: false, searchById: false, searchByName: true, searchBySemester: false, changePassword: false, logout: false, addFaculty: false });
            
        }

        if (elem === "semester") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: false, searchById: false, searchByName: false, searchBySemester: true, changePassword: false, logout: false, addFaculty: false });
            
        }

        if (elem === "changePassword") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: false, searchById: false, searchByName: false, searchBySemester: false, changePassword: true, logout: false, addFaculty: false });
            
        }

        if (elem === "logout") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: false, searchById: false, searchByName: false, searchBySemester: false, changePassword: false, logout: true, addFaculty: false });
            
        }
        if (elem === "addFaculty") {
            
                this.setState({ dashboard: false, addStudent: false, update: false, updateResult: false, searchById: false, searchByName: false, searchBySemester: false, changePassword: false, logout: false, addFaculty: true });
            
        }
        

    }

    goToLoginPage = () => {
        localStorage.removeItem("loggedInUser");
        return <Redirect to="/" />

    }
    render() {
        if (this.myState.showadmin2) {
            return (
                <div className="container1">
                    <div className="navbar">
                        <div id="user">
                            <img src={adminLogo} className="adminImage" alt="adminImage"></img>
                            <div className="adminName"><i className='fa fa-circle' style={{ fontSize: "18px", marginRight: "10px", color: "rgb(0, 200, 0)" }}></i>Admin</div>
                        </div>

                        {/* <div id="dashboard" className="leftitem" onClick={() => { this.handleClick("dashboard") }}><i className="fa fa-tachometer" style={{fontSize:"30px",marginRight:"10px"}}></i>Dashboard</div> */}

                        <div id="addStudent" className="leftitem" onClick={() => { this.handleClick("addStudent") }}><i className='icon fa fa-plus' ></i>Add a Student</div>

                        <div id="addFaculty" className="leftitem" onClick={() => { this.handleClick("addFaculty") }}><i className='icon fa fa-plus' ></i>Add a Faculty</div>

                        <div className="leftitem-dropdown"><i className='icon fa fa-search' ></i>
                            <div>Search Student By
                                <select className="dropdown" value={this.state.selectValue}
                                    onChange={(e) => {
                                        this.setState({ selectValue: e.target.value });
                                    }}
                                    onClick={() => {
                                        document.getElementById("remove").style.display = "none";
                                        this.handleClick(this.state.selectValue)
                                    }}>

                                    <option id="remove" value="#">Select Type</option>

                                    <option value="id">ID</option>

                                    <option value="name">Name</option>

                                    <option value="semester">Semester</option>
                                </select>
                            </div>
                        </div>

                        <div id="update" className="leftitem" onClick={() => { this.handleClick("update") }}><i className='icon fa fa-edit'></i>Update a Student</div>

                        <div id="updateresult" className="leftitem" onClick={() => { this.handleClick("updateresult") }}><i className='icon fa fa-pencil'></i>Update Result</div>

                        <div id="changePassword" className="leftitem" onClick={() => { this.handleClick("changePassword") }}><i className='icon fa fa-key' ></i>Change Password</div>

                        <div id="logout" className="leftitem rightitem" onClick={() => { this.handleClick("logout") }}><i className='icon fa fa-sign-out'></i>Logout</div>
                    </div>

                    <div className="openWindow">
                        <div className="main">
                            {/* {(this.state.dashboard) ? <WelcomePage /> : ""} */}
                            {(this.state.addStudent) ? <AddStudent /> : ""}
                            {(this.state.addFaculty) ? <AddFaculty /> : ""}
                            {(this.state.update) ? <Update /> : ""}
                            {(this.state.searchById) ? <SearchById /> : ""}
                            {(this.state.searchByName) ? <SearchByName /> : ""}
                            {(this.state.searchBySemester) ? <SearchBySemester /> : ""}
                            {(this.state.updateresult) ? <UpdateSemResult /> : ""}
                            {(this.state.changePassword) ? <ChangeAdminPassword id={this.state.showadmin.userName} /> : ""}
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

export default AdminMainPage;
