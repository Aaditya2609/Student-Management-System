import React, { Component } from 'react';
import '../styles/Login.css';
import LoginService from '../Services/LoginService';
import FacultyService from '../Services/FacultyService';
import { Link } from "react-router-dom";
import LoginLoader from "./LoginLoader";
import BadRequest from "./BadRequest";

export class Login extends Component {
    formValid = false;
    state = {
        userName: "",
        password: "",
        error: {},
        showLoader: false,
        validUser: false,
        nonValidUser: false,
        formValidOrNot: true,
        foundedFaculty: {}
    }


    handleChange = async (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "userName") {
            await this.setState({ userName: value });
            if (!value) {
                let obj = { userNameError: "Required" };
                await this.setState({ error: obj });
                this.formValid = false;
            }
            else {
                let obj = { userNameError: "" };
                await this.setState({ error: obj });
                this.formValid = true;
            }

        }

        else if (name === "password") {
            await this.setState({ password: value });
            if (!value) {
                let obj = { passwordError: "Required" };
                await this.setState({ error: obj });
                this.formValid = false;
            }
            else {
                let obj = { passwordError: "" };
                await this.setState({ error: obj });
                this.formValid = true;
            }
        }
    }

    handleSubmit = (e) => {
        if (this.state.userName === "" || this.state.password === "") {
            this.formValid = false;
        }
        e.preventDefault();
        if (this.formValid) {

            //show loader if form is valid
            this.setState({ showLoader: true })
            document.getElementById("formContainer").style.filter = "blur(3px)";

            if (this.state.userName.substr(0, 3) === "ADM" && this.state.userName.length > 3) {
                // let loginReq = new LoginReq(this.state.userName.slice(3), this.state.password);
                LoginService.findAdmin(this.state.userName.slice(3)).then((response) => {
                    if (response.data.response) {
                        if (this.state.password === response.data.response.password) {
                            localStorage.removeItem("loggedInUser");


                            // take user to dashboard and change text
                            this.setState({ validUser: true, nonValidUser: false });
                            setTimeout(() => {
                                document.getElementById("loadIcon").style.color = "limegreen";
                                document.getElementById("loadingInfo").innerText = "Taking you to Dashboard";
                            }, 2000);

                            //after 2 sec go to dashboard
                            localStorage.setItem("loggedInUser", JSON.stringify({ "userName": this.state.userName.slice(3), "factor": new Date().getMinutes() }));

                            setTimeout(() => {
                                this.setState({ showLoader: false });
                                document.getElementById("adminLink").click();
                            }, 4000);


                        }
                        else {
                            //else if no admin with that username and password show cross icon
                            setTimeout(() => {
                                this.setState({ showLoader: false, nonValidUser: true, validUser: false });
                            }, 2000);

                            //after 2 sec rempve that cross window 
                            setTimeout(() => {
                                this.setState({ showLoader: false, validUser: false, nonValidUser: false })
                                document.getElementById("formContainer").style.filter = "blur(0px)";

                            }, 4000);
                        }
                    }
                    else {
                        //else if no admin with that username and password show cross icon
                        setTimeout(() => {
                            this.setState({ showLoader: false, nonValidUser: true, validUser: false });
                        }, 2000);

                        //after 2 sec rempve that cross window 
                        setTimeout(() => {
                            this.setState({ showLoader: false, validUser: false, nonValidUser: false })
                            document.getElementById("formContainer").style.filter = "blur(0px)";

                        }, 4000);
                    }
                });
            }
            else if (this.state.userName.substr(0, 3) === "FAC" && this.state.userName.length > 3) {
                FacultyService.findFaculty(Number(this.state.userName.slice(3))).then((response) => {
                    if (response.data.response) {
                        if (this.state.password === response.data.response.password) {
                            this.setState({ foundedFaculty: response.data.response })
                            localStorage.removeItem("loggedInUser");

                            // take user to dashboard and change text 
                            this.setState({ validUser: true, nonValidUser: false });
                            setTimeout(() => {
                                document.getElementById("loadIcon").style.color = "limegreen";
                                document.getElementById("loadingInfo").innerText = "Taking you to Dashboard";
                            }, 2000);

                            localStorage.setItem("loggedInUser", JSON.stringify({ "userName": response.data.response.facultyId + response.data.response.facultyName, "factor": new Date().getMinutes() }));

                            //after 2 sec go to dashboard
                            setTimeout(() => {
                                this.setState({ showLoader: false });
                                document.getElementById("facultyLink").click();
                            }, 4000);
                        }
                        else {
                            //else if no faculty with that username and password show cross icon
                            setTimeout(() => {
                                this.setState({ showLoader: false, nonValidUser: true, validUser: false });
                            }, 2000);

                            //after 2 sec remove that cross window 
                            setTimeout(() => {
                                this.setState({ showLoader: false, validUser: false, nonValidUser: false })
                                document.getElementById("formContainer").style.filter = "blur(0px)";

                            }, 4000);
                        }
                    }
                    else {
                        //else if no faculty with that usename and passord show cross window
                        setTimeout(() => {
                            this.setState({ showLoader: false, nonValidUser: true, validUser: false });
                        }, 2000);


                        //hide the cross window after 2 sec
                        setTimeout(() => {
                            this.setState({ showLoader: false, validUser: false, nonValidUser: false })
                            document.getElementById("formContainer").style.filter = "blur(0px)";
                        }, 4000);
                    }
                });
            }
            else {
                // showing loading after 3 sec show cross window
                setTimeout(() => {
                    this.setState({ showLoader: false, validUser: false, nonValidUser: true })
                }, 3000);

                //after 2 sec hide cross window
                setTimeout(() => {
                    this.setState({ showLoader: false, validUser: false, nonValidUser: false })
                    document.getElementById("formContainer").style.filter = "blur(0px)";
                }, 5000);
            }
            

        }
        else {
            let uError = "";
            let pError = "";
            if (this.state.userName === "") {
                uError = "Required";
            }
            if (this.state.password === "") {
                pError = "Required";
            }
            let obj = { userNameError: uError, passwordError: pError };
            this.setState({ error: obj });
        }

    }

    handleFocus = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "userName") {
            let passError = this.state.error.passwordError;
            if (!value) {
                let obj = { userNameError: "Required", passwordError: passError };
                this.setState({ error: obj });
            }
            else {
                let obj = { userNameError: "" };
                this.setState({ error: obj });
            }
        }

        else if (name === "password") {
            let uNameError = this.state.error.userNameError;
            if (!value) {

                let obj = { userNameError: uNameError, passwordError: "Required" }
                this.setState({ error: obj });
            }
            else {
                let obj = { passwordError: "" }
                this.setState({ error: obj });
            }
        }

    }
    render() {
        // localStorage.removeItem("loggedInUser");
        return (
            <>
                <div className="container">
                    {this.state.showLoader && (
                        <div className="loader">
                            <LoginLoader show={this.state.showLoader} />
                            <p id="loadingInfo" style={{ fontSize: "xx-large", fontWeight: "700" }}>Checking Credentials</p>
                        </div>
                    )}

                    {this.state.nonValidUser && (
                        <div className="notValidUser">
                            <BadRequest show={this.state.nonValidUser} />
                            <p id="notValidInfo" >No User With This Credentials</p>
                        </div>
                    )}


                    <div className="form-container" id="formContainer">
                        <h2 style={{ color: "white", textDecoration: "underline" }}>Fill All Credentials Unless Notified</h2><br /><br />
                        <form method="POST" className="form" onSubmit={this.handleSubmit}>

                            <label htmlFor="uName" className="userName lbl">Username
                                <input className="inpt" autoComplete="off" type="text" id="uName" name="userName" value={this.state.userName}
                                    onChange={this.handleChange.bind(this)} onBlur={this.handleFocus.bind(this)} /></label>
                            <div className="error" style={{ color: "red" }}>{this.state.error.userNameError}</div>
                            <br />

                            <label htmlFor="pw" className="password lbl" >Password
                                <input className="inpt" style={{ marginLeft: "16px" }} autoComplete="off" type="password" id="pw" name="password" value={this.state.password}
                                    onChange={this.handleChange.bind(this)} onBlur={this.handleFocus.bind(this)} /></label>
                            <div className="error" style={{ color: "red" }}>{this.state.error.passwordError}</div>
                            <br />

                            <button onClick={this.handleSubmit} className="login-btn" >LOG IN</button>
                            <Link id="adminLink" to="/adminMainPage"></Link>
                            <Link id="facultyLink" to="/facultyMainPage"></Link>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default Login

