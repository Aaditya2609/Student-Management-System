import React, { Component } from 'react'
import "../styles/WelcomePageFaculty.css";

export default class WelcomePageFaculty extends Component {
    render() {
        return (
            <>
            <div className="announcement">Important Announcement</div>
            <br/>
            <br/>
            <div className="header">
                <marquee class="marque" direction="left" scrollamount="20">All Faculties are Requested to Immediately Change their Password after 1st Login . . . . . . .</marquee>
            </div>
            </>
        )
    }
}
