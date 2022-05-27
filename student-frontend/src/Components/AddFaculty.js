import React, { Component } from 'react'
import FacultyService from '../Services/FacultyService';
import Faculty from "../Entities/Faculty"
import "../styles/AddStudent.css";
import Loader from './Loader';
export default class AddFaculty extends Component {
    state = {
        name: "", username: "", password: "", course: "",
        nameError: "", usernameError: "", passwordError: "", courseError: "",
        showLoader: false, addedFacultyId: "", showPopOver: false
    }
    handleChange = async (e) => {
        let elem = e.target.name;
        let value = e.target.value;
        switch (elem) {
            case "name": await this.setState({ name: value });
                break;

            case "username": await this.setState({ username: value });
                break;

            case "password": await this.setState({ password: value });
                break;

            case "course": await this.setState({ course: value });
                break;

            default: break;
        }

    }

    validateForm = async (e) => {
        let elem = e.target.name;
        let value = e.target.value;
        switch (elem) {
            case "name": let s = value
                if (s === "") {
                    await this.setState({ nameError: "Required" });
                }
                else {
                    for (let i = 0; i < s.length; i++) {
                        if (
                            s.charAt(i) === '~' ||
                            s.charAt(i) === '!' ||
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
                            s.charAt(i) === ',' ||
                            s.charCodeAt(i) === 35 ||
                            s.charCodeAt(i) === 36 ||
                            s.charCodeAt(i) === 38 ||
                            s.charCodeAt(i) === 64
                        ) {
                            await this.setState({ nameError: "Can't Contain Special Characters" });
                        }
                        else {
                            await this.setState({ nameError: "" });
                        }
                    }
                }
                break;




            case "username": if (value === "") {
                await this.setState({ usernameError: "Required" });
            }
            else {
                await this.setState({ usernameError: "" });
            }
                break;



            case "password": if (value === "") {
                await this.setState({ passwordError: "Required" });
            }
            else {
                await this.setState({ passwordError: "" });
            }
                break;




            case "course": if (value === "") {
                await this.setState({ courseError: "Required" });
            }
            else {
                await this.setState({ courseError: "" });
            }
                break;


            default: break;
        }

    }


    clearAllInputs = () => {
        this.setState({
            name: "", username: "", password: "", course: "", showPopOver: false, showLoader: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let assurance = [false, false, false, false]


        if (this.state.nameError) {
            assurance[0] = false;
        }
        else if (!this.state.name) {
            assurance[0] = false
            this.setState({ nameError: "Required" })
        }
        else {
            assurance[0] = true
        }


        if (this.state.usernameError) {
            assurance[1] = false;
        }
        else if (!this.state.username) {
            assurance[1] = false
            this.setState({ usernameError: "Required" })
        }
        else {
            assurance[1] = true
        }



        if (this.state.passwordError) {
            assurance[2] = false;
        }
        else if (!this.state.password) {
            assurance[2] = false
            this.setState({ passwordError: "Required" })
        }
        else {
            assurance[2] = true
        }



        if (this.state.courseError) {
            assurance[3] = false;
        }
        else if (!this.state.course) {
            assurance[3] = false
            this.setState({ courseError: "Required" })
        }
        else {
            assurance[3] = true
        }

        let temp = assurance.every((value) => {
            return value
        });
        if (temp) {
            this.setState({ showLoader: true });

            let faculty = new Faculty(this.state.name, this.state.username, this.state.password, this.state.course);

            FacultyService.addFaculty(faculty).then((response) => {
                this.setState({ showLoader: false, showPopOver: true, addedFacultyId: response.data.response.facultyId });
            });
            
        }

    }

    render() {

        return (
            <>
                {this.state.showLoader && <Loader show={this.state.showLoader}></Loader>}
                {(!this.state.showLoader && !this.state.showPopOver) && (
                    <>
                        <div className="addContainer" id="addContainer">
                            <form method="POST" onSubmit={this.handleSubmit} className="addForm">
                                <h1 style={{ textDecoration: "underline" }} className="heading">Faculty Details</h1>

                                <input className="addInpt" type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Full Name: " />
                                <div className="error" style={{ color: "red" }}>{this.state.nameError}</div>

                                <input className="addInpt" type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" UserName: " />
                                <div className="error" style={{ color: "red" }}>{this.state.usernameError}</div>

                                <input className="addInpt" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Password: " />
                                <div className="error" style={{ color: "red" }}>{this.state.passwordError}</div>

                                <input className="addInpt" type="text" id="course" name="course" value={this.state.course} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Course: " />
                                <div className="error" style={{ color: "red" }}>{this.state.courseError}</div>

                                <button onClick={this.handleSubmit} className="addBtn">Add Faculty</button>

                            </form>

                        </div>
                    </>
                )}
                {this.state.showPopOver && (
                    <div id="popOver">
                        <p id="popText">The Faculty with the given details are added with the Id as: {this.state.addedFacultyId}</p>
                        <button id="popButton" onClick={() => {
                            this.clearAllInputs();
                        }}>OK</button>
                    </div>
                )}
            </>
        );
    }
}









