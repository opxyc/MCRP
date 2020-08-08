import React from 'react'
import Axios from 'axios'
import '../style.css'
import {server, appName} from '../constants'

class Login extends React.Component{
    state = {
        username : '',
        password : '',
        loginError : ''
    }

    componentDidMount(){
        document.title=appName
        var authToken = localStorage.getItem('authToken')
        if(authToken === null){
            console.log("Token do not exist")
        }
        else{
            console.log("Token Exists")
            let params = {
                "authToken" : authToken
            }
            Axios.post(server + "/verify",params).then(res=>{
                console.log(res.data)
                if(res.data.status === 0){
                    window.location = "../admin"
                }
            }).catch(err=>{console.log(err)})
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        let params = {
            "username" : this.state.username,
            "password" : this.state.password
        }
        this.setState({loginError : "Working on it.."})
        Axios.post(server + "/login",params).then(res=>{
            console.log(res.data)
            if(res.data.status === 1){
                this.setState({loginError : res.data.tinyDesc})
            }
            else if(res.data.status === 0){
                //logged in
                this.setState({loginError : ""})
                localStorage.setItem('authToken', res.data.token)
                window.location = "../admin/"
            }
        }).catch(err=>{console.log(err);this.setState({loginError : "Some error occured. Try again."})})
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    
    render(){
        return(
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <main className="mdl-layout__content">
                <center>
                <div className="loginCard">
                    <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={{width:'100%'}}>
                        <div className="mdl-card__title">
                            <h2 className="mdl-card__title-text">Login to continue</h2>
                        </div>
                        <div className="mdl-card__supporting-text">
                            <form action="#"onSubmit={this.handleSubmit}>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="text" id="username" onChange={this.handleChange}/>
                                    <label className="mdl-textfield__label" htmlFor="username">username</label>
                                </div>
                                <br/>
                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                    <input className="mdl-textfield__input" type="password" id="password" onChange={this.handleChange}/>
                                    <label className="mdl-textfield__label" htmlFor="password">password</label>
                                </div>
                                <div style={{marginTop:10, marginBottom:10, color:"#ea4335"}}>
                                    {this.state.loginError}
                                </div>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={this.handleSubmit}>
                                LogIn
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                </center>
            </main>
            </div>
        )
    }
}


export default Login