import React, { Component } from 'react'
export default class Loader extends Component {
    render() {
        if (this.props.show) {
            return (
                <div style={{display:"flex"}}>
                    <i className="fa fa-spinner fa-pulse" style={{fontSize:"70px"}}></i>
                </div>
            );
        }
        else{
            return(
            <>
            </>
            );
        }
    }
}
