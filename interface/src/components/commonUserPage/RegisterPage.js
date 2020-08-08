import React from 'react'
import UserForm from './UserForm'
import {appName} from '../constants'
import '../style.css'

export class RegisterPage extends React.Component {

    constructor(){
        super()

        this.state = {
            registered : false,
            referenceId : ''
        }
    }

    componentDidMount(){
        document.title = appName + " | Register Incident"
    }

    updateRegistrationStatus = (response) => {
        console.log(response)
        this.setState({
           registered : response.status,
           referenceId : response.referenceId
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="HSMainContainer">
                    <div className="useViewTopBar">
                        <div className="logoImage">{appName}</div> 
                    </div>
                    <div>
                        <div className="RSLeft">
                            <div className="RSbigBigFont">{appName}</div>
                            <div className="dash"></div>
                            <p>
                                <br/>
                                Welcome to the new Mock Case Registration Portal of Kerala Police. Here you can register your cases regarding vehicle thefts, abductions or any other cases involving a vehicle.
                            </p>
                            <p>
                                Give us the required details about the incident and our AI powered system will do the job for you.
                            </p>
                        </div>
                        <div className="RSRight">
                            <div className={!this.state.registered ? "HSRightRegistrationFormHolder" : "regSuccessMessage"}>
                                {
                                    this.state.registered ? 
                                    <React.Fragment>
                                        <div className="pad20">
                                            <b>Registration Successful</b><br/>
                                            Your can note down the reference ID <b>{this.state.referenceId}</b>.
                                        </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <div className="mdl-card__supporting-text">
                                            Fill in the details to register a new incident.
                                            <UserForm updateRegistrationStatus={this.updateRegistrationStatus}/>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default RegisterPage
