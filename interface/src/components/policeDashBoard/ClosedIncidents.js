import React, { Component } from 'react'
import Axios from 'axios'
import '../style.css'
import {server, appName} from '../constants'
import FullScreenLoadingContainer from './tinyComponents/FullScreenLoadingContainer'
import DashboardScreen from './DashboardScreen'

export class ClosedIncidents extends Component {
    constructor(){
        super()
        this.state = {
            loading : true,
            data : [],
            //for controlling view for super and standard users
            userContolInfo : {
                district : '',
                policeStation : ''
            }
        }
    }

    componentDidMount(){
        document.body.style = 'background: white;';
        document.title = appName + " | DashBoard"
        var authToken = localStorage.getItem('authToken')
        if(authToken === null){
            window.location = "../admin/login"
        }
        else{
            let params = {
                "authToken" : authToken
            }
            Axios.post(server + "/get-closed-incidents-pc",params).then(res=>{
                console.log(res.data.desc)
                if(res.data.status === 1){
                    window.location = "../admin/login"
                }
                else{
                    var arrayToSort = res.data.desc.slice(0)
                    arrayToSort.sort(function(a,b) {
                        var x = a.dateTime;
                        var y = b.dateTime;
                        return x > y ? -1 : x < y ? 1 : 0;
                    });
                    this.setState({
                        loading : false, data : arrayToSort,
                        userContolInfo : {
                            district : res.data.district,
                            policeStation : res.data.policeStation
                        }
                    })
                }
            }).catch(err=>{console.log(err)})
        }
    }
    render() {
        return (
            this.state.loading ? 
            <FullScreenLoadingContainer/>
            :
            <DashboardScreen data={this.state.data} userControlInfo={this.state.userContolInfo} from={'closed'}/>
        )
    }
}

export default ClosedIncidents
