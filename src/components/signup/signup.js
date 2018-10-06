import React, { Component } from 'react';

import './signup.css';
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import axios from 'axios';



class Signup extends Component {
    constructor () {
        super();
        this.state = {
            username: '',
            email: '',
            pass: '',
            cpass:'',
            success:'',
            error:'',
            EmailE:'',
            EmailTest:'',
            UnameE:'',
            PassE:'',
            CpassE:'',
            NotMacth:'',
            ErrorStatus:'',
            message: undefined,
            error: undefined,
            FieldRequired:''
        };
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleCpass = this.handleCpass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName (e) {
        this.setState({username: e.target.value});
        this.setState({UnameE:''});

    }
    handleEmail (e) {
        this.setState({email: e.target.value});
        this.setState({EmailE:''});
    }
    handlePass (e) {
        this.setState({pass: e.target.value});
        this.setState({PassE:''});
    }
    handleCpass (e) {
        this.setState({cpass: e.target.value});
        this.setState({CpassE:''});
    }

    validate = () => {
        let isError = false;
        const errors = {};

        if(this.state.username ==='')
        {
            isError = true;
            errors.UnameE = 'Username Cannot be blank';
        }
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
        if(this.state.pass !== this.state.cpass)
        {
            isError = true;
            errors.PassE = 'Password does not match';
            errors.CpassE = 'Password does not match';
        }

        if(isError){
            this.setState({
                ...this.state,
                ...errors
            })
        }
        return isError;
    }
    handleSubmit(e)
    {
        e.preventDefault();
        const err = this.validate();

        if(!err)
            // if(this.state.ErrorStatus=='')
        {
            var formData = {
                username:this.state.username,
                email:this.state.email,
                pass:this.state.pass
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/RegisterUser',
                data: formData,
            })
                .then((response) => {
                    console.log(response.data);
                    this.setState({success:'Alert: '+response.data});
                })
                .catch((e) =>
                {
                    console.error(e);
                    this.setState({success:'Alert: Something went wrong'});
                });

            this.setState({username:'',email:'',pass:'',cpass:''});
        }
        else
        {
            this.setState({FieldRequired:'All fields are required *'});
            this.setState({pass:'',cpass:''});
        }



    }
    componentWillUnmount() {

    }
    render() {


        return (

            <div className="Signup">
                <Navbar/>
                <section className="section-bottom-border login-signup">
                    <div className="container">
                        <div className="row">
                            <h4 className="error">{this.state.error}</h4>
                            <h4 className="message">{this.state.message}</h4>
                            <div className="login-main template-form">
                                <h2>{this.state.usernameE}</h2>
                                <h4>Please Register, or <a href="#">Sign Up</a></h4>
                                <div className="template-space"></div>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <a href="#"className="btn btn-facebook btn-block">Facebook</a>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <a href="#"className="btn btn-google btn-block">Google</a>
                                    </div>
                                </div>
                                <div className="login-or">
                                    <hr className="hr-or"/>
                                    <span className="span-or">or</span>
                                </div>
                                <div className="alert alert-info alert-dismissible " role="alert" style={{display: this.state.success ? 'block' : 'none' }}>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <strong>{this.state.success}</strong>
                                </div>

                                <form onSubmit={this.handleSubmit} method="post">
                                    <div className="form-group">
                                        <label htmlFor="inputUsername">Username</label>
                                        <br/>
                                        <span className='field-error'>{this.state.UnameE}</span>
                                        <input id="inputUsername" onChange={this.handleName}  name="username" value={this.state.username} type="text" className="form-control" validate={['required']}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">Email</label><br/>
                                        <span className='field-error'>{this.state.EmailE}</span>
                                        {/*<span className='field-error'>{this.state.EmailTest}</span>*/}
                                        <input id="inputEmail" onChange={this.handleEmail}  name="email" value={this.state.email} type="text" className='form-control'/>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Passwords</label>
                                        <br/>
                                        <span className='field-error'>{this.state.PassE}</span><br/>
                                        <span className='field-error'>{this.state.NotMacth}</span>
                                        {/*<span className='field-error'>{this.state.minPass}</span>*/}
                                        <input type="password" onChange={this.handlePass} name="pass" value={this.state.pass} className="form-control" id="inputPassword"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputRePassword">Re Enter Password</label>
                                        <br/>
                                        <span className='field-error'>{this.state.CpassE}</span>
                                        <span className='field-error'>{this.state.NotMacth}</span>
                                        <input id="inputRePassword" onChange={this.handleCpass} name="cpass" value={this.state.cpass} type="password" className="form-control"/>
                                    </div>

                                    <button type="submit" className="btn btn btn-primary"> Sign Up</button>
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

export default Signup;
