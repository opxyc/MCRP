import React, { Component } from 'react'
import '../style.css'
import {appName} from '../constants'
import 'font-awesome/css/font-awesome.min.css';

export class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <div className="pad20">
                    <div className="title">
                        {appName}
                        {
                            this.props.from === 'closed' ? 
                            <span>&nbsp;&nbsp;<span className="closeIncidentButton" style={{cursor : 'auto', fontSize : '14px'}}>Closed Incidents</span></span>
                            :null
                        }
                    </div>
                    <div className="searchContainer" style={{float:'left'}}>
                        <i className="fa fa-search" aria-hidden="true" style={{float:'left', marginRight:'10px', marginTop : '5px'}}></i>
                        <input type="text" className="inputField" placeholder="search by license plate, subject line.."
                            onChange={e=>this.props.setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar
