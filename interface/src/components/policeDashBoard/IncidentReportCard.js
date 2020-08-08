import React, {useState, useEffect} from 'react'
import IdentificationsList from './IdentificationsList'
import {server} from '../constants'
import '../style.css'
import Axios from 'axios'

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

function IncidentReportCard(props) {
    let authToken = ""
    useEffect(()=>{
        authToken = localStorage.getItem('authToken')
        if(authToken === undefined){
            window.location = "../login"
        }
    })
    const [showFullDetails, changeShowFullDetails] = useState(false)
    const [closeIncidentStatusText, changeStatusText] = useState('Close this Incident')

    const closeIncident = (incidentId) => {
        if (confirm("Press a button!")) {
            changeStatusText('Working on it...')
            let params = {
                "authToken" : authToken,
                "incidentId" : incidentId
            }
            Axios.post(server + "/close-incident",params).then(res=>{
                if(res.data.status === 1){
                    changeStatusText('Could not Close. Some error occured.')
                }
                else{
                    props.removeClosedIncident(incidentId)
                    changeStatusText('Closed')
                }
            }).catch(err=>{
                console.log(err)
                changeStatusText('Could not Close. Some error occured.')
            })
        }
    }

    let {
        aadharNumber, body, dateTime, identifications, name, district, localPoliceStation,
        phoneNumber, status, subject, vehicleNumber, _id
    } = props.incident

    return (
        <div className="incidentCard">
            <div className="pad20">
                <code style={{color:'#888'}}>{_id}</code>
                <div className="incidentCard-title">{subject}</div>
                <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{dateTime}
                <div>
                    <button className="showFullDetailsButton" onClick={()=>changeShowFullDetails(prevState => !prevState)}>
                        Details&nbsp; <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
                    </button>
                    {
                        showFullDetails ? 
                        <div className="fullDetailsContainer">
                            {body}
                            <br/><br/>
                            <b>Details</b><br/><br/>
                            <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" style={{width : '100%'}}>
                                <tbody>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Reporter&apos;s Name</td>
                                        <td className="mdl-data-table__cell--non-numeric">{name}</td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Phone Number</td>
                                        <td className="mdl-data-table__cell--non-numeric">{phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Aadhar Number</td>
                                        <td className="mdl-data-table__cell--non-numeric">{aadharNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric"><b>Vechicle Number</b></td>
                                        <td className="mdl-data-table__cell--non-numeric"><b>{vehicleNumber}</b></td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">District</td>
                                        <td className="mdl-data-table__cell--non-numeric">{titleCase(district)}</td>
                                    </tr>
                                    <tr>
                                        <td className="mdl-data-table__cell--non-numeric">Police Station</td>
                                        <td className="mdl-data-table__cell--non-numeric">{titleCase(localPoliceStation)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                            Status : &nbsp;
                            {status === 0 && <span style={{color : '#00c853'}}>Fresh</span>}
                            {status === 1 && <span style={{color : 'orange'}}>Identified</span>}
                            {status === 2 && <span style={{color : '#e53935'}}>Closed</span>}
                            {
                                identifications.length > 0 ? 
                                <IdentificationsList identifications={identifications}/>
                                : <div>No identifications reported</div>
                            }
                            {
                                props.from !== 'closed' ? 
                                <React.Fragment>
                                    <br/><br/>
                                    <button className="closeIncidentButton" onClick={()=>{closeIncident(_id)}}>{closeIncidentStatusText}</button>
                                </React.Fragment>
                                :
                                null
                            }
                            
                        </div> 
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default IncidentReportCard
