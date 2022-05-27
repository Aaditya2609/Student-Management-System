import React, { Component } from 'react'
import StudentService from '../Services/StudentService';
import Student from "../Entities/Student"
import "../styles/AddStudent.css";
import Loader from './Loader';
import { Country, State, City } from 'country-state-city';
export default class AddStudent extends Component {
    state = {
        allCountries: [],
        countryCode: "",

        allStates: [],
        stateCode: "",

        allCities: [],
        name: "",
        mobile: "",
        semester: "",
        email: "",
        dateOfBirth: "",
        branch: "CSE",
        country: "",
        state: "",
        city: "",
        address: "",
        pincode: "",
        nameError: "",
        mobileError: "",
        semesterError: "",
        emailError: "",
        dateOfBirthError: "",
        branchError: "",
        countryError: "",
        stateError: "",
        cityError: "",
        addressError: "",
        pincodeError: "",
        firstPageErrorSolved: false,
        secondPageErrorSolved: false,
        addedStudentId: "",
        showLoader: false,
        showPopOver: false
    }
    handleChange = async (e) => {
        let elem = e.target.name;
        let value = e.target.value;
        switch (elem) {
            case "name": await this.setState({ name: value });
                break;

            case "mobile": await this.setState({ mobile: value });
                break;

            case "semester": await this.setState({ semester: value });
                break;

            case "email": await this.setState({ email: value });
                break;

            case "dateOfBirth": await this.setState({ dateOfBirth: value });
                break;

            // case "branch": await this.setState({ branch: value });
            //     break;
            case "country": await this.setState({ country: value });
                await this.setState({ countryCode: e.target.options[e.target.options.selectedIndex].id })
                break;

            case "state": await this.setState({ state: value });
                await this.setState({ stateCode: e.target.options[e.target.options.selectedIndex].id })
                break;

            case "city": await this.setState({ city: value });
                break;

            case "address": await this.setState({ address: value });
                break;

            case "pincode": await this.setState({ pincode: value });
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




            case "mobile": if (value === "") {
                await this.setState({ mobileError: "Required" });
            }
            else if (value.length !== 10) {
                await this.setState({ mobileError: "Must be of 10 Digit" });
            }
            else {
                await this.setState({ mobileError: "" });
            }
                break;



            case "semester": if (value === "") {
                await this.setState({ semesterError: "Required" });
            }
            else if (value > 8 || value < 1) {
                await this.setState({ semesterError: "Should be between 1-8" });
            }
            else {
                await this.setState({ semesterError: "" });
            }
                break;




            case "email": if (value === "") {
                await this.setState({ emailError: "Required" });
            }
            else {
                let atposition = value.indexOf("@")
                let dotposition = value.lastIndexOf(".")
                if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= value.length) {
                    await this.setState({ emailError: "Enter a Valid Email address" });
                }
                else {
                    await this.setState({ emailError: "" });
                }
            }
                break;



            case "dateOfBirth": if (value === "") {
                await this.setState({ dateOfBirthError: "Required" });
            }
            else {
                await this.setState({ dateOfBirthError: "" });
            }
                break;



            case "branch": if (value === "") {
                await this.setState({ branchError: "Required" });
            }
            else {
                await this.setState({ branchError: "" });
            }
                break;


            case "country": if (value === "") {
                await this.setState({ countryError: "Required" });
            }
            else {
                await this.setState({ countryError: "" });
            }
                break;



            case "state": if (value === "") {
                await this.setState({ stateError: "Required" });
            }
            else {
                await this.setState({ stateError: "" });
            }
                break;


            case "city": if (value === "") {
                await this.setState({ cityError: "Required" });
            }
            else {
                await this.setState({ cityError: "" });
            }
                break;



            case "address": if (value === "") {
                await this.setState({ addressError: "Required" });
            }
            else {
                await this.setState({ addressError: "" });
            }
                break;



            case "pincode": if (value.length !== 6) {
                await this.setState({ pincodeError: "Pincode must be of 6 digits" });
            }
            else {
                await this.setState({ pincodeError: "" });
            }
                break;
            default: break;
        }

    }

    clearAllInputs = () => {
        this.setState({
            name: "", mobile: "", semester: "", email: "", dateOfBirth: "", branch: "CSE", country: "", state: "", city: "", address: "",
            pincode: "", showPopOver: false, showLoader: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let assurance = [false, false, false, false, false]

        if (this.state.countryError) {
            assurance[0] = false;
        }
        else if (!this.state.country) {
            assurance[0] = false
            this.setState({ countryError: "Required" })
        }
        else {
            assurance[0] = true
        }



        if (this.state.stateError) {
            assurance[1] = false;
        }
        else if (!this.state.state) {
            assurance[1] = false
            this.setState({ stateError: "Required" })
        }
        else {
            assurance[1] = true
        }



        if (this.state.cityError) {
            assurance[2] = false;
        }
        else if (!this.state.city) {
            assurance[2] = false
            this.setState({ cityError: "Required" })
        }
        else {
            assurance[2] = true
        }



        if (this.state.addressError) {
            assurance[3] = false;
        }
        else if (!this.state.address) {
            assurance[3] = false
            this.setState({ addressError: "Required" })
        }
        else {
            assurance[3] = true
        }



        if (this.state.pincodeError) {
            assurance[4] = false;
        }
        else if (!this.state.pincode) {
            assurance[4] = false
            this.setState({ pincodeError: "Required" })
        }
        else {
            assurance[4] = true
        }

        let temp = assurance.every((value) => {
            return value
        });

        if (temp) {

            this.setState({ showLoader: true });

            let student = new Student(this.state.name, this.state.mobile, this.state.semester, this.state.email, this.state.dateOfBirth, this.state.branch, this.state.address, this.state.city, this.state.state, this.state.pincode);

            console.log(student);
            StudentService.addStudent(student).then((response) => {
                this.setState({ showLoader: false, showPopOver: true, addedStudentId: response.data.response.studentId });
            });
        }

    }

    gotoFirstPage = () => {
        let a = document.getElementsByClassName("firstPage");
        for (let i = 0; i < a.length; i++)
            a[i].style.display = "block";

        document.getElementById("pageNumber").innerText = "1";

        let b = document.getElementsByClassName("secondPage");
        for (let i = 0; i < b.length; i++)
            b[i].style.display = "none";
    }

    gotoSecondPage = () => {
        let assurance = [false, false, false, false, false, false]

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



        if (this.state.mobileError) {
            assurance[1] = false;
        }
        else if (!this.state.mobile) {
            assurance[1] = false
            this.setState({ mobileError: "Required" })
        }
        else {
            assurance[1] = true
        }




        if (this.state.semesterError) {
            assurance[2] = false;
        }
        else if (!this.state.semester) {
            assurance[2] = false
            this.setState({ semesterError: "Required" })
        }
        else {
            this.setState({ semesterError: "" })
            assurance[2] = true
        }



        if (this.state.emailError) {
            assurance[3] = false;
        }
        else if (!this.state.email) {
            assurance[3] = false
            this.setState({ emailError: "Required" })
        }
        else {
            assurance[3] = true
        }





        if (this.state.dateOfBirthError) {
            assurance[4] = false;
        }
        else if (!this.state.dateOfBirth) {
            assurance[4] = false
            this.setState({ dateOfBirthError: "Required" })
        }
        else {
            assurance[4] = true
        }




        if (this.state.branchError) {
            assurance[5] = false;
        }
        else if (!this.state.branch) {
            assurance[5] = false
            this.setState({ branchError: "Required" })
        }
        else {
            assurance[5] = true
        }

        let temp = assurance.every((value) => {
            return value
        })

        if (temp) {
            let a = document.getElementsByClassName("firstPage");
            for (let i = 0; i < a.length; i++)
                a[i].style.display = "none";

            document.getElementById("pageNumber").innerText = "2";

            let b = document.getElementsByClassName("secondPage");
            for (let i = 0; i < b.length; i++)
                b[i].style.display = "block";
        }
    }

    callCountryApi = async () => {
        let a = Country.getAllCountries()
        await this.setState({ allCountries: a });
        const postCountry = a.map(value => <option id={value.isoCode} value={value.name}>{value.name}</option>)
        await this.setState({ postCountry })

    }

    callStateApi = async () => {
        let a = State.getStatesOfCountry(this.state.countryCode)
        await this.setState({ allStates: a });
        const postStates = a.map(value => <option id={value.isoCode} value={value.name}>{value.name}</option>)
        await this.setState({ postStates })
    }

    callCityApi = async () => {
        let a = City.getCitiesOfState(this.state.countryCode, this.state.stateCode)
        await this.setState({ allCities: a });
        const postCities = a.map(value => <option id={value.isoCode} value={value.name}>{value.name}</option>)
        await this.setState({ postCities })

    }

    render() {

        return (
            <>
                {this.state.showLoader && <Loader show={this.state.showLoader}></Loader>}
                {(!this.state.showLoader && !this.state.showPopOver) && (
                    <>
                        <div className="addContainer" id="addContainer">
                            <form onSubmit={this.handleSubmit} className="addForm">
                                <h1 style={{ textDecoration: "underline" }} className="heading firstPage">Personal Details</h1>

                                <input className="addInpt firstPage" type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Full Name: " />
                                <div className="error firstPage" style={{ color: "red" }}>{this.state.nameError}</div>

                                <input className="addInpt firstPage" type="number" id="mobile" name="mobile" value={this.state.mobile} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Mobile: " />
                                <div className="error firstPage" style={{ color: "red" }}>{this.state.mobileError}</div>

                                {/* <input className="addInpt firstPage" type="number" id="semester" name="semester" value={this.state.semester} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Semester: " /> */}
                                <select className="addInpt firstPage" value={this.state.semester} name="semester"
                                    // onMouseDown={(e)=>{
                                    //     console.log(e.target.size)
                                    //     if(e.target.options.length>2){      
                                    //         e.target.size=2;
                                    //     }
                                    // }}
                                    onBlur={this.validateForm}
                                    onChange={this.handleChange}>
                                    <option value="" disabled selected hidden>Semester: </option>
                                    <option className="semesterValues" value="1">1</option>
                                    <option className="semesterValues" value="2">2</option>
                                    <option className="semesterValues" value="3">3</option>
                                    <option className="semesterValues" value="4">4</option>
                                    <option className="semesterValues" value="5">5</option>
                                    <option className="semesterValues" value="6">6</option>
                                    <option className="semesterValues" value="7">7</option>
                                    <option className="semesterValues" value="8">8</option>
                                </select>
                                <div className="error firstPage" style={{ color: "red" }}>{this.state.semesterError}</div>

                                <input className="addInpt firstPage" type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Email Id: " />
                                <div className="error firstPage" style={{ color: "red" }}>{this.state.emailError}</div>

                                <input className="addInpt firstPage" type="date" id="dateOfBirth" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} onBlur={this.validateForm} placeholder="  Date Of Birth: " />
                                <div className="error firstPage" style={{ color: "red" }}>{this.state.dateOfBirthError}</div>

                                <input className="addInpt firstPage" type="text" id="branch" name="branch" value={this.state.branch} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Branch" />
                                <div className="error firstPage" style={{ color: "red" }}>{this.state.branchError}</div>

                                <h1 style={{ textDecoration: "underline" }} className="heading secondPage">Address Details</h1>

                                <select className="addInpt secondPage" value={this.state.country} name="country"
                                    onMouseDown={this.callCountryApi}
                                    onBlur={this.validateForm}
                                    onChange={this.handleChange}>
                                    <option value="" disabled selected hidden>Country: </option>
                                    {this.state.postCountry}
                                </select>
                                <div className="error secondPage" style={{ color: "red" }}>{this.state.countryError}</div>


                                {/* <input className="addInpt secondPage" type="text" id="state" name="state" value={this.state.state} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" State: " /> */}
                                <select className="addInpt secondPage" value={this.state.state} name="state"
                                    onMouseDown={(e) => {
                                        if (this.state.countryCode === "") {
                                            this.setState({ countryError: "Please Select Country First" })
                                        }
                                        else {
                                            this.setState({ countryError: "" })
                                            this.callStateApi(e);
                                        }
                                    }}
                                    onBlur={this.validateForm}
                                    onChange={this.handleChange}>
                                    <option value="" disabled selected hidden>State: </option>
                                    {this.state.postStates}
                                </select>
                                <div className="error secondPage" style={{ color: "red" }}>{this.state.stateError}</div>

                                {/* <input className="addInpt secondPage" type="text" id="city" name="city" value={this.state.city} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" City: " /> */}
                                <select className="addInpt secondPage" value={this.state.city} name="city"
                                    onMouseDown={(e) => {
                                        if (this.state.countryCode === "") {
                                            this.setState({ countryError: "Please Select Country First" })
                                        }
                                        else {
                                            this.setState({ countryError: "" })
                                            if (this.state.stateCode === "") {
                                                this.setState({ stateError: "Please Select State First" })
                                            }
                                            else {
                                                this.setState({ stateError: "" })
                                                this.callCityApi(e);
                                            }
                                        }
                                    }}
                                    onBlur={this.validateForm}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}>
                                    <option value="" disabled selected hidden>City: </option>
                                    {this.state.postCities}
                                </select>
                                <div className="error secondPage" style={{ color: "red" }}>{this.state.cityError}</div>

                                <input className="addInpt secondPage" type="text" id="address" name="address" value={this.state.address} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Address Line: " />
                                <div className="error secondPage" style={{ color: "red" }}>{this.state.addressError}</div>

                                <input className="addInpt secondPage" type="number" id="pincode" name="pincode" value={this.state.pincode} onChange={this.handleChange} onBlur={this.validateForm} placeholder=" Area Pincode: " />
                                <div className="error secondPage" style={{ color: "red" }}>{this.state.pincodeError}</div>

                                <button onClick={this.handleSubmit} className="addBtn secondPage">Add Student</button>

                            </form>

                            <div className="pagination" id="pagination">
                                <div id="backward"><i className="fa fa-arrow-left" onClick={this.gotoFirstPage}></i></div>
                                <div id="pageNumber">1</div>
                                <div id="forward"><i className="fa fa-arrow-right" onClick={this.gotoSecondPage}></i></div>
                            </div>
                        </div>
                    </>
                )}
                {this.state.showPopOver && (
                    <div id="popOver">
                        <p id="popText">The Student with the given details are added with the Id as: {this.state.addedStudentId}</p>
                        <button id="popButton" onClick={() => {
                            this.clearAllInputs();
                            setTimeout(() => {
                                this.gotoFirstPage();
                            }, 1000)
                        }}>OK</button>
                    </div>
                )}

            </>
        );
    }
}









