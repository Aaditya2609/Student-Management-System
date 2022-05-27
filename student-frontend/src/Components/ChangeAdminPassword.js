import React, { Component } from 'react'
import "../styles/Search.css";
import "../styles/ChangePassword.css";
import LoginService from "../Services/LoginService";
import Loader from "./Loader";

export default class ChangePassword extends Component {
    state = {
        id: this.props.id,
        oldPassword: "",
        oldPasswordError: "",
        newPassword: "",
        foundAdmin: {},
        newPasswordCorrectness: [false, false, false, false, false],
        showLoader: false,
        showOldPasswordForm: true, // true,
        showNewPasswordForm: false, //false,
        passwordDidNotMatched: false,
        errorOccured: false,
        passwordChanged: false
    }

    handleChange = async (e) => {
        let elem = e.target.name;
        let value = e.target.value;
        switch (elem) {

            case "oldPassword": await this.setState({ oldPassword: value });
                break;

            case "newPassword": await this.setState({ newPassword: value });
                this.checkPassword();
                break;

            default: break;
        }

    }

    checkOldPassword = (e) => {
        e.preventDefault();
        if (this.state.oldPassword) {
            this.setState({ oldPasswordError: "" })
            this.setState({ showLoader: true })
            LoginService.findAdmin(this.state.id).then((response) => {

                if (response.data.response.password === this.state.oldPassword) {
                    this.setState({ showLoader: false, passwordDidNotMatched: false, showOldPasswordForm: false, showNewPasswordForm: true, errorOccured: false, passwordChanged: false })
                }
                else {
                    this.setState({ showLoader: false, passwordDidNotMatched: true, showOldPasswordForm: true, showNewPasswordForm: false, errorOccured: false, passwordChanged: false })
                }

            });
        }
        else {
            this.setState({ oldPasswordError: "Required" })
        }
    }

    checkForLower = (s) => {
        for (let i = 0; i < s.length; i++) {
            if (s.charCodeAt(i) >= 96 && s.charCodeAt(i) <= 122) {
                return true;
            }
        }
        return false;
    }
    checkForUpper = (s) => {
        for (let i = 0; i < s.length; i++) {
            if (s.charCodeAt(i) >= 65 && s.charCodeAt(i) <= 90) {
                return true;
            }
        }
        return false;
    }

    checkForNumber = (s) => {
        for (let i = 0; i < s.length; i++) {
            if (s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57) {
                return true;
            }
        }
        return false;
    }

    checkForSpecial = (s) => {
        for (let i = 0; i < s.length; i++) {
            if (
                s.charAt(i) === '~' ||
                s.charAt(i) === '!' ||
                s.charAt(i) === '#' ||
                s.charAt(i) === '%' ||
                s.charAt(i) === '^' ||
                s.charAt(i) === '*' ||
                s.charAt(i) === '(' ||
                s.charAt(i) === ')' ||
                s.charAt(i) === '-' ||
                s.charAt(i) === '_' ||
                s.charAt(i) === '+' ||
                s.charAt(i) === '=' ||
                s.charAt(i) === '}' ||
                s.charAt(i) === '{' ||
                s.charAt(i) === ']' ||
                s.charAt(i) === '[' ||
                s.charAt(i) === '\\' ||
                s.charAt(i) === '|' ||
                s.charAt(i) === '"' ||
                s.charAt(i) === '\'' ||
                s.charAt(i) === ';' ||
                s.charAt(i) === ':' ||
                s.charAt(i) === '?' ||
                s.charAt(i) === '/' ||
                s.charAt(i) === '>' ||
                s.charAt(i) === '<' ||
                s.charAt(i) === '.' ||
                s.charAt(i) === ' ' ||
                s.charAt(i) === ','
            ) {
                return false;
            }
            else if (s.charCodeAt(i) === 35 || s.charCodeAt(i) === 36 || s.charCodeAt(i) === 38 || s.charCodeAt(i) === 64) {
                return true;
            }
        }
        return false;
    }

    checkPassword = () => {
        let test = this.state.newPassword;
        let lengthCheck = test.length >= 8;
        let lowerCheck = this.checkForLower(test);
        let upperCheck = this.checkForUpper(test);
        let numberCheck = this.checkForNumber(test);
        let specialCheck = this.checkForSpecial(test);


        if (lengthCheck) {
            let a = document.getElementById("lengthChecker")
            a.className = "ic fa fa-check";
            a.style.color = "#7ac142";
            let array = this.state.newPasswordCorrectness;
            array[0] = true
            this.setState({ newPasswordCorrectness: array })
        }
        else {
            let a = document.getElementById("lengthChecker")
            a.className = "ic fa fa-times";
            a.style.color = "red";
            let array = this.state.newPasswordCorrectness;
            array[0] = false
            this.setState({ newPasswordCorrectness: array })
        }


        if (lowerCheck) {
            let a = document.getElementById("lowerCaseChecker")
            a.className = "ic fa fa-check";
            a.style.color = "#7ac142";
            let array = this.state.newPasswordCorrectness;
            array[1] = true
            this.setState({ newPasswordCorrectness: array })
        }
        else {
            let a = document.getElementById("lowerCaseChecker")
            a.className = "ic fa fa-times";
            a.style.color = "red";
            let array = this.state.newPasswordCorrectness;
            array[1] = false
            this.setState({ newPasswordCorrectness: array })
        }

        if (upperCheck) {
            let a = document.getElementById("upperCaseChecker")
            a.className = "ic fa fa-check";
            a.style.color = "#7ac142";
            let array = this.state.newPasswordCorrectness;
            array[2] = true
            this.setState({ newPasswordCorrectness: array })
        }
        else {
            let a = document.getElementById("upperCaseChecker")
            a.className = "ic fa fa-times";
            a.style.color = "red";
            let array = this.state.newPasswordCorrectness;
            array[2] = false
            this.setState({ newPasswordCorrectness: array })
        }

        if (numberCheck) {
            let a = document.getElementById("numberChecker")
            a.className = "ic fa fa-check";
            a.style.color = "#7ac142";
            let array = this.state.newPasswordCorrectness;
            array[3] = true
            this.setState({ newPasswordCorrectness: array })
        }
        else {
            let a = document.getElementById("numberChecker")
            a.className = "ic fa fa-times";
            a.style.color = "red";
            let array = this.state.newPasswordCorrectness;
            array[3] = false
            this.setState({ newPasswordCorrectness: array })
        }

        if (specialCheck) {
            let a = document.getElementById("specialChecker")
            a.className = "ic fa fa-check";
            a.style.color = "#7ac142";
            let array = this.state.newPasswordCorrectness;
            array[4] = true
            this.setState({ newPasswordCorrectness: array })
        }
        else {
            let a = document.getElementById("specialChecker")
            a.className = "ic fa fa-times";
            a.style.color = "red";
            let array = this.state.newPasswordCorrectness;
            array[4] = false
            this.setState({ newPasswordCorrectness: array })
        }

        let isValidPassword = this.state.newPasswordCorrectness.every((value) => {
            return value
        })
        this.setState({ validPassword: isValidPassword })
        if (isValidPassword) {
            document.getElementById("changePass").setAttribute("style", "opacity:1");
            document.getElementById("changePass").style.cursor = "pointer";
        }
        else {
            document.getElementById("changePass").setAttribute("style", "opacity:0.7");
            document.getElementById("changePass").style.cursor = "no-drop";
        }
    }

    changePassword = (e) => {
        e.preventDefault();
        if (this.state.validPassword) {
            this.setState({ showLoader: true })
            LoginService.changePassword(this.state.id, this.state.oldPassword, this.state.newPassword).then((response) => {
                if (response.data.response === null) {
                    this.setState({ showLoader: false, passwordDidNotMatched: false, showOldPasswordForm: false, showNewPasswordForm: true, errorOccured: true, passwordChanged: false })
                }
                else {
                    this.setState({ showLoader: false, passwordDidNotMatched: false, showOldPasswordForm: false, showNewPasswordForm: false, errorOccured: false, passwordChanged: true })
                    setTimeout(() => {
                        localStorage.removeItem("loggedInUser");
                        window.location.reload();
                    }, 4000);
                }
            })
        }
        else {
            let a = document.getElementsByClassName("ic")
            for (let x of a) {
                if (x.className.indexOf("fa-times") >= 0) {
                    x.style.opacity = 0.3;
                }
                else {
                    x.style.opacity = 1;
                }
            }
            setTimeout(() => {
                for (let x of a) {
                    if (x.style.opacity === "0.3") {
                        x.style.opacity = 1;
                    }
                }
            }, 200)
        }
    }

    showPassword = () => {
        var x = document.getElementById("studentId");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    render() {
        return (
            <div>
                {this.state.showOldPasswordForm && (
                    <div id="searchContainer" className="searchContainer">
                        <form onSubmit={this.handleSubmitSearch} className="searchForm">
                            <h1 className="heading">Enter Your Current Password</h1>

                            <input type="password" required name="oldPassword" id="studentId" value={this.state.oldPassword} onChange={this.handleChange} placeholder=" Old Password: " />
                            <div className="error" style={{ color: "red" }}>{this.state.oldPasswordError}</div>

                            <button onClick={this.checkOldPassword} className="searchButton">Check</button>
                            <br />
                        </form>
                    </div>
                )}

                {this.state.passwordDidNotMatched && (
                    <div id="notFound">
                        <p className='notFoundText' style={{ color: "red" }}>Password Did Not Match</p>
                    </div>
                )}

                {this.state.showNewPasswordForm && (
                    <div id="searchContainer" className="searchContainer">
                        <form className="searchForm">
                            <h1 className="heading">Enter New Password</h1>

                            <input type="password" required name="newPassword" id="studentId" value={this.state.newPassword} onChange={this.handleChange} placeholder=" New Password: " />
                            <label className="labelbox"><input style={{ marginRight: "10px" }} type="checkbox" onClick={this.showPassword} />Show Password</label>
                            <div id="passwordChecker">
                                <div style={{ fontWeight: "700" }}><i id="lengthChecker" class="ic fa fa-times" style={{ color: "red", marginRight: "10px", fontSize: "25px" }}></i>Length greater than 8</div>
                                <div style={{ fontWeight: "700" }}><i id="lowerCaseChecker" class="ic fa fa-times" style={{ color: "red", marginRight: "10px", fontSize: "25px" }}></i>Contains Lower case Letter</div>
                                <div style={{ fontWeight: "700" }}><i id="upperCaseChecker" class="ic fa fa-times" style={{ color: "red", marginRight: "10px", fontSize: "25px" }}></i>Contains Upper case Letter</div>
                                <div style={{ fontWeight: "700" }}><i id="numberChecker" class="ic fa fa-times" style={{ color: "red", marginRight: "10px", fontSize: "25px" }}></i>Contains Numeric Digits</div>
                                <div style={{ fontWeight: "700" }}><i id="specialChecker" class="ic fa fa-times" style={{ color: "red", marginRight: "10px", fontSize: "25px" }}></i>Only Allowed Special Characters are @, $, &</div>

                            </div>
                            <button onClick={this.changePassword} id="changePass" className="searchButton" >Change Password</button>
                            <br />
                        </form>
                    </div>
                )}

                {this.state.showLoader && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Loader show={this.state.showLoader}></Loader>
                    </div>
                )}

                {this.state.errorOccured && (
                    <div id="notFound">
                        <p className='notFoundText' style={{ color: "red" }}>An Error Occured.....</p>
                    </div>
                )}


                {this.state.passwordChanged && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                        <p className='notFoundText'>Password Changed Successfully</p>
                        <p className='notFoundText'>Please Login Again To Continue</p>
                    </div>
                )}
            </div>
        )
    }
}
