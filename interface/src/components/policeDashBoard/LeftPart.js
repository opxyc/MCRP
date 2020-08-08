import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import {districtWiseData} from '../constants'
import AddNewUserComponent from './tinyComponents/AddNewUserComponent'
import '../style.css'

export class LeftPart extends Component {
    constructor(){
        super()
        this.state={
            addNewUser : false
        }
    }
    
    toggleAddNewUser = () => {
        this.setState({addNewUser : !this.state.addNewUser})
    }

    logOut = () => {
        let response = confirm("Are you sure to sign out?")
        if(response){
            localStorage.clear('authToken')
            location.reload()
        }
        //clearing from db is not done as of now
        //....
    }

    render() {
        return (
            <div className="leftSide">
                <br/>
                {
                    this.props.userControlInfo.district === "*"?
                    <React.Fragment>
                        <Dropdown options={Object.keys(districtWiseData)} 
                            onChange={e=>{
                                this.props.setDistrict(e.value); 
                                this.props.setPoliceStation('');
                            }} value={this.props.district} placeholder="District" />
                        <br/>
                        {
                            this.props.district !== '' && 
                            <Dropdown options={districtWiseData[this.props.district]} onChange={e=>this.props.setPoliceStation(e.value)} value={this.props.policeStation} placeholder="Police Station" />
                        }
                        <br/>
                        {
                            this.props.district !== '' ? 
                            <button className="leftSideClearButton" onClick={()=>this.props.clearFilters()}>Clear Filters</button> 
                            : null
                        }
                    </React.Fragment>
                    :
                    <div>
                        <b>{this.props.userControlInfo.district}, {this.props.userControlInfo.policeStation}</b>
                    </div>
                }
                <br/>
                <br/>
                {
                    this.props.from === 'closed' ? null : <a target="_blank" href="../admin/closed" style={{fontSize:'12px', fontWeight:'bold'}}>CLOSED INCIDENTS</a>
                }

                <div>
                    <div className="leftSideActions">
                        <div className="pad10">
                            {
                                this.props.userControlInfo.district === "*" ? 
                                <React.Fragment>
                                    <i className="fa fa-plus" aria-hidden="true" onClick={()=>this.toggleAddNewUser()} style={{cursor:'pointer'}}></i>
                                    &emsp;
                                </React.Fragment>
                                : null
                            }
                            <i className="fa fa-sign-out" aria-hidden="true" onClick={()=>this.logOut()} style={{cursor:'pointer'}}></i>
                        </div>
                    </div>
                </div>

                {
                    this.state.addNewUser ? 
                    <AddNewUserComponent 
                        toggleAddNewUser={this.toggleAddNewUser}
                    />
                    :
                    null
                }
            </div>
        )
    }
}

export default LeftPart
