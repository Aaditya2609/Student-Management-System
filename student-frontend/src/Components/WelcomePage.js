import React, { Component } from 'react'
import "../styles/WelcomePage.css";
export default class WelcomePage extends Component {

    componentDidMount = () => {
        setTimeout(() => {
            document.getElementsByClassName("problem1")[0].style.width = "40vw";
            document.getElementsByClassName("problem1")[0].style.padding = "10px";
        }, 1000)
        setTimeout(() => {
            document.getElementsByClassName("problem2")[0].style.width = "40vw";
            document.getElementsByClassName("problem2")[0].style.padding = "10px";

        }, 3000)
        setTimeout(() => {
            document.getElementsByClassName("problem3")[0].style.width = "40vw";
            document.getElementsByClassName("problem3")[0].style.padding = "10px";
        }, 5000)

        
        setTimeout(() => {
            document.getElementsByClassName("problemContainer")[0].style.display = "none";
            document.getElementsByClassName("solutionContainer")[0].style.display = "flex";
        }, 8000)
        setTimeout(()=>{
            document.getElementsByClassName("sol1")[0].style.height = "8vh";
            document.getElementsByClassName("sol1")[0].style.padding = "10px";
            document.getElementsByClassName("sol1")[0].style.color = "white";
        },9000);
        setTimeout(() => {
            document.getElementsByClassName("sol2")[0].style.height = "10vh";
            document.getElementsByClassName("sol2")[0].style.padding = "10px";
            document.getElementsByClassName("sol2")[0].style.color = "white";


        }, 11000)
        setTimeout(() => {
            document.getElementsByClassName("sol3")[0].style.height = "10vh";
            document.getElementsByClassName("sol3")[0].style.padding = "10px";
            document.getElementsByClassName("sol3")[0].style.color = "white";

        }, 13000)
    }
    render() {
        return (
            <div className="welcomeContainer">
                <div className="problemContainer">
                    <div className="problem1"><p>Don't know how to manage Databases ?</p></div>
                    <div className="problem2"><p>Dont know how to write SQL queries ?</p></div>
                    <div className="problem3"><p>Still have to manage data ..........</p></div>
                </div>
                
                <div className="solutionContainer">
                    <div className="solution sol1">Dont' worry we have solved all your problem</div>
                    <div className="solution sol2">Experience the Details Management like never before</div>
                    <div className="solution sol3">Use our Student Management and get the best experience</div>
                </div>
            </div>
        );
    }
}