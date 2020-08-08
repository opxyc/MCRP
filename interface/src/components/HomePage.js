import React from 'react'
import {appName} from './constants'
import './style.css'

function HomePage(props) {
    const changeChildArrow = ()=>{}
    return (
        <React.Fragment>
            <div className="HSMainContainer">
                <div className="useViewTopBar">
                    <div className="logoImage">{appName}</div> 
                </div>
                <div>
                    <div className="HSLeft">
                        Welcome to
                        <div className="bigBigFont">{appName}</div>
                        <div className="dash"></div>
                        <div className="bigFont">Mock Case Registration Portal</div>
                    </div>
                    <div className="HSRight">
                    Welcome to the new Mock Case Registration Portal of Kerala Police. Here you can register your cases regarding vehicle thefts, abductions or any other cases involving a vehicle. You can start by clicking register and then give us the required details about the incident and our AI powered system will do the job for you. 
                    <br/><br/>
                    <button className="HSNavButton" 
                        onClick={()=>props.history.push('register')} 
                        onMouseEnter={()=>changeChildArrow} onMouseLeave={()=>changeChildArrow}
                    >
                        REGISTER&emsp;
                        <i class="fa fa-caret-right" aria-hidden="true"></i>
                    </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default HomePage
