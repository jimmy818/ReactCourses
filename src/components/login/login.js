import React, { Component } from 'react';
import Navbar from "../navbar/navbar";
import './login.css';
import Footer from "../footer/footer";
import axios from "axios/index";
import { hashHistory } from 'react-router';


class Login extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            pass:'',
            EmailE:'',
            PassE:'',
            ErrorStatus:'',
            FieldRequired:'',
            success:''

        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail(e){
        this.setState({email:e.target.value});
        this.setState({EmailE:''});
    }
    handlePass(e){
        this.setState({pass:e.target.value});
        this.setState({PassE:''});
    }
    validate = () => {
        let isError = false;
        const errors = {};

        if(this.state.email.indexOf('@') ===-1)
        {
            isError = true;
            errors.EmailE = 'Require a valid email address';
        }
        if(this.state.pass==='')
        {
            isError = true;
            errors.PassE = 'Password cannot be blank';

        }
        if(isError){
            this.setState({
                ...this.state,
                ...errors
            })
        }
        return isError;
    }
    handleSubmit(e){
        e.preventDefault();
    const err = this.validate();
        if(!err)
        {
            var formData = {
                email:this.state.email,
                pass:this.state.pass
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/Login',
                data: formData,
            })
                .then((response) => {
                    if(response.data.success=='true')
                    {
                        sessionStorage.setItem("userId", response.data.userId);
                        alert('Login success');
                        sessionStorage.setItem("Role", response.data.role);
                        sessionStorage.setItem("Uname", response.data.username);
                        console.log(response.data);
                        if(sessionStorage.getItem("Role")=='user'){
                            window.location.href= "/user-dashboard";
                        }
                        else{
                            window.location.href= "/dashboard";
                        }


                        this.setState({email:'',pass:''});
                    }
                    else
                    {
                        alert('invalid Username/Password ');
                        this.setState({email:'',pass:''});
                    }
                    // this.setState({success:'Alert: '+response.data});
                })
                .catch((e) =>
                {
                    console.error(e);
                    this.setState({success:'Alert: Something went wrong'});
                });

        }
        else{
            this.setState({FieldRequired:'All fields are required *'});
        }
    }
    componentWillMount(){
        var Local = sessionStorage.getItem("Role");
        // console.log(Local);
    }
    render() {
        return (
            <div className="Login">
                <Navbar/>
                <section className="section-bottom-border login-signup">
                    <div className="container">
                        <div className="row">
                            <div className="login-main template-form">
                                <h4>Please Log In, or <a href="#">Login</a></h4>
                                <div className="template-space"></div>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6"><a href="#"
                                                                                   className="btn btn-facebook btn-block">Facebook</a>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6"><a href="#"
                                                                                   className="btn btn-google btn-block">Google</a>
                                    </div>
                                </div>
                                <div className="login-or">
                                    <hr className="hr-or"/>
                                        <span className="span-or">or</span>
                                </div>
                                <form onSubmit={this.handleSubmit} method="post">
                                    <div className="form-group">
                                        <label htmlFor="inputUsernameEmail">Email</label>
                                        <br/>
                                        <span className='field-error'>{this.state.EmailE}</span>
                                        <input type="text" onChange={this.handleEmail} vlaue={this.state.email} name="email" className="form-control" id="inputUsernameEmail"/>
                                    </div>
                                    <div className="form-group">{/*<a className="pull-right" href="#">Forgot password?</a>*/}
                                        <label htmlFor="inputPassword">Password</label>
                                        <br/>
                                        <span className='field-error'>{this.state.PassE}</span>
                                        <input type="password" onChange={this.handlePass} vlaue={this.state.pass} name="password" className="form-control" id="inputPassword"/>
                                    </div>
                                    <div className="checkbox pull-right">
                                        <label>
                                            <input type="checkbox"/>
                                                Remember me </label>
                                    </div>
                                    <button type="submit" className="btn btn btn-primary"> Log In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
               <Footer/>
            </div>
        );
    }
}

export default Login;
