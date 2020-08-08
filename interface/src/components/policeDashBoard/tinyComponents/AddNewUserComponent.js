import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import {districtWiseData, server} from '../../constants'
import axios from 'axios'
import '../../style.css'

export class AddNewUserComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            district : '',
            policeStation : '',
            username : '',
            password : '',
            message : ''
        }
    }

    setUserName = (e) => {
        this.setState({
            username : e.target.value
        })
    }

    setPassword = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    setSuggestedUserNameAndPoliceStation = (e) => {
        this.setState({
            policeStation : e.value,
            username : this.state.district.toLocaleLowerCase() + e.value.toLocaleLowerCase().replace(/\s/g,'')
        })
    }

    setMessage = (msg) => {this.setState({message : msg})}


    submitHandler = () => {
        if(this.state.district === '' || this.state.policeStation === '' || this.state.username === '' || this.state.password === ''){
            this.setMessage('Please select/fill all fields')
            return
          }
          let values = this.state
          values['authToken'] = localStorage.getItem('authToken')
          this.setMessage("Working on it...")
          axios.post(server + '/create-new-user', { ...values })
          .then(res => {
              console.log(res.data)
              if(res.data.status === 0){
                this.setState({
                    //clear fields
                    username : '',password : ''
                }, ()=>{
                    this.setMessage("New User Created")
                })
              }
              else{
                this.setMessage(JSON.stringify(res.data.desc))
              }
          })
    }

    render() {
        return (
            <div className="popComponentWrapper">
                <div className="popUpComponent">
                    <div className="pad20">
                        Select the district and police station for which you wish to create an account for.<br/><br/>

                        <Dropdown options={Object.keys(districtWiseData)} 
                            onChange={e=>{this.setState({district : e.value, policeStation : ''})}} 
                            value={this.props.district} placeholder="District" />
                        <br/>
                        {
                            this.state.district !== '' && 
                            <Dropdown options={districtWiseData[this.state.district]} 
                                onChange={
                                    e=>{this.setSuggestedUserNameAndPoliceStation(e)}
                                } 
                                value={this.state.policeStation} placeholder="Police Station" 
                            />
                        }

                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input 
                                className="mdl-textfield__input" 
                                id="username"
                                name="username"
                                onChange={e=>this.setUserName(e)}
                                value={this.state.username}
                                placeholder="Preferred Username"
                            />
                        </div>
                        <br/>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input 
                                className="mdl-textfield__input" 
                                id="password"
                                name="password"
                                onChange={e=>this.setPassword(e)}
                                value={this.state.password}
                                placeholder="Preferred Password"
                            />
                        </div>

                        <br/>
                        <div style={{color:'red'}}>{this.state.message}<br/><br/></div>
                        <button className="HSNavButton" type="submit" style={{background:'#6200ea'}} onClick={()=>this.submitHandler()}>
                            ADD NEW USER
                        </button>
                        &emsp;
                        <button className="HSNavButton" type="button" style={{background:'#ea4335'}} onClick={()=>this.props.toggleAddNewUser()}>
                            CLOSE
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNewUserComponent
