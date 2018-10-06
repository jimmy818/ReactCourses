import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ToggleDisplay from 'react-toggle-display';
import './navbar.css';
import axios from 'axios';

const pStyle = {
    top:0
};

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            categoryData:[],
            catName:''

        };
        this.logOut = this.logOut.bind(this);
    }
    handleClick() {
        console.log("clicked");
        this.setState({
            show: !this.state.show
        });
    }
    logOut()
    {
        localStorage.setItem('userId','');
        window.location.href='/login';
    }
    componentDidMount(){
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getCategory',
        })
            .then((response) => {
                this.setState({categoryData:response.data});
                // console.log(response.data);
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });


    }
    componentWillMount(){

    }
    render() {
        var user = localStorage.getItem('userId');
        var username = localStorage.getItem('Uname');

if(!user){
    return (
        <div className="Header">
            {/*<div className="loading">*/}
            {/*<div className="loader"></div>*/}
            {/*</div>*/}
            <div className="konnect-info">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-md-6 col-sm-8 hidden-xs">
                            {/*<ul>*/}
                            {/*<li><i className="fa fa-paper-plane"*/}
                            {/*aria-hidden="true"></i> support@konnectplugins.com*/}
                            {/*</li>*/}
                            {/*<li className="li-last"><i className="fa fa-volume-control-phone"*/}
                            {/*aria-hidden="true"></i> (040) 123-4567*/}
                            {/*</li>*/}
                            {/*</ul>*/}
                        </div>

                        <div className="col-md-6 col-sm-4">
                            {/*<ul className="konnect-float-right">*/}
                            {/*<li><a href="login.html"><i className="fa fa-user-o" aria-hidden="true"></i> Login*/}
                            {/*</a></li>*/}
                            {/*<li><a href="register.html"><i className="fa fa-file-text-o"*/}
                            {/*aria-hidden="true"></i> Register </a></li>*/}
                            {/*<li className="li-last hidden-xs hidden-sm"><a target="_blank" href="#"><i*/}
                            {/*className="fa fa-twitter" aria-hidden="true"></i></a> <a target="_blank"*/}
                            {/*href="#"><i*/}
                            {/*className="fa fa-google-plus" aria-hidden="true"></i></a> <a target="_blank"*/}
                            {/*href="#"><i*/}
                            {/*className="fa fa-facebook" aria-hidden="true"></i></a> <a target="_blank"*/}
                            {/*href="#"><i*/}
                            {/*className="fa fa-linkedin" aria-hidden="true"></i></a><a href="#"> <i*/}
                            {/*className="fa fa-instagram"></i> </a></li>*/}
                            {/*</ul>*/}
                        </div>
                    </div>
                </div>
            </div>

            <nav id="mainNav" className="navbar navbar-default navbar-fixed-top" style={pStyle}>
                <div className="container-fluid">
                    <div className="navbar-header">

                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"><span className="sr-only">Toggle navigation</span>
                            <img src="img/icons/menu.png" alt="menu" width="40"/></button>

                        <a className="navbar-brand" href="/"><img className="logo-change"
                                                                  src="img/logo-green.png"
                                                                  alt="logo"/></a></div>


                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            {/*<li><NavLink exact to={"/"}  activeStyle={{color:'#5DC560'}}>Home</NavLink></li>*/}
                            <li><a href="/">Home</a></li>
                            {/*<li><a href="about.html">About Us</a></li>*/}
                            <li className="dropdown"><a href="course.html" className="dropdown-toggle"
                                                        data-toggle="dropdown">Courses <i
                                className="fa fa-angle-down" aria-hidden="true"></i></a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.categoryData.map((item, index) => (
                                            <li key={index}><NavLink
                                                to={`/courses/${item.url}`}>{item.category}</NavLink></li>

                                            // <option key={index} value={item._id}>{item.category}</option>
                                        ))
                                    }
                                </ul>
                            </li>
                            {/*<li className="dropdown"><a href="pages.html" className="dropdown-toggle"*/}
                            {/*data-toggle="dropdown">Pages <i className="fa fa-angle-down"*/}
                            {/*aria-hidden="true"></i></a>*/}
                            {/*<ul className="dropdown-menu">*/}
                            {/*<li><a href="about.html">About Us</a></li>*/}
                            {/*<li><a href="course.html">Courses</a></li>*/}
                            {/*<li><a href="single-course.html">Single Course</a></li>*/}
                            {/*<li><a href="apply-course.html">Application</a></li>*/}
                            {/*<li><a href="gallery.html">Gallery</a></li>*/}
                            {/*<li><a href="404.html">404 page</a></li>*/}
                            {/*<li><a href="login.html">Login</a></li>*/}
                            {/*<li><a href="register.html">Register</a></li>*/}
                            {/*<li><a href="faq.html">Faq</a></li>*/}
                            {/*<li><a href="contact-one.html">Contact One</a></li>*/}
                            {/*<li><a href="contact-two.html">Contact Two</a></li>*/}
                            {/*<li><a href="terms-and-conditions.html">Terms and Conditions</a></li>*/}
                            {/*<li><a href="privacy-policy.html">Privacy Policy</a></li>*/}
                            {/*</ul>*/}
                            {/*</li>*/}
                            {/*<li className="dropdown"><a href="blog.html" className="dropdown-toggle"*/}
                            {/*data-toggle="dropdown">Blog <i className="fa fa-angle-down"*/}
                            {/*aria-hidden="true"></i></a>*/}
                            {/*<ul className="dropdown-menu">*/}
                            {/*<li><a href="blogs.html">Blogs</a></li>*/}
                            {/*<li><a href="blog-single.html">Blog Single</a></li>*/}
                            {/*</ul>*/}
                            {/*</li>*/}
                            {/*<li className="dropdown"><a href="contact.html" className="dropdown-toggle"*/}
                            {/*data-toggle="dropdown">Contact <i*/}
                            {/*className="fa fa-angle-down" aria-hidden="true"></i></a>*/}
                            {/*<ul className="dropdown-menu">*/}
                            {/*<li><a href="contact-one.html">Contact One</a></li>*/}
                            {/*<li><a href="contact-two.html">Contact Two</a></li>*/}
                            {/*</ul>*/}
                            {/*</li>*/}
                            <li>
                                <NavLink exact to={"/login"}  activeStyle={{color:'#5DC560'}}>
                                    <i className="fa fa-user-o" aria-hidden="true">
                                    </i>
                                    Login
                                </NavLink>
                            </li>,
                            <li>
                                <NavLink  exact to={"/signup"} activeStyle={{color:'#5DC560'}}>
                                    <i className="fa fa-file-text-o" aria-hidden="true">
                                    </i>
                                    Register
                                </NavLink>
                            </li>
                            <li className="search-icon"><a href="javascript:void(0)"
                                                           onClick={() => this.handleClick()}><i
                                className="fa fa-search"
                                aria-hidden="true"></i></a>


                                {/*<ToggleDisplay show={this.state.show} className="search-form" >*/}
                                {/*<form className="navbar-form" role="search">*/}
                                {/*<div className="input-group add-on">*/}
                                {/*<input className="form-control" placeholder="Search" name="srch-term"*/}
                                {/*id="srch-term" type="text"/>*/}
                                {/*<div className="input-group-btn">*/}
                                {/*<button className="btn btn-default" type="submit"><i*/}
                                {/*className="glyphicon glyphicon-search"></i></button>*/}
                                {/*</div>*/}
                                {/*</div>*/}
                                {/*</form>*/}

                                {/*</ToggleDisplay>*/}
                                <ToggleDisplay if={this.state.show} className="search-form">
                                    <form className="navbar-form" role="search">
                                        <div className="input-group add-on">
                                            <input className="form-control" placeholder="Search"
                                                   name="srch-term"
                                                   id="srch-term" type="text"/>
                                            <div className="input-group-btn">
                                                <button className="btn btn-default" type="submit"><i
                                                    className="glyphicon glyphicon-search"></i></button>
                                            </div>
                                        </div>
                                    </form>

                                </ToggleDisplay>
                            </li>
                        </ul>
                    </div>

                </div>

            </nav>

        </div>
    );
}
else{

    if(localStorage.getItem('Role')=='user') {
        return (
            <div className="Header">
                {/*<div className="loading">*/}
                {/*<div className="loader"></div>*/}
                {/*</div>*/}
                <div className="konnect-info">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-6 col-sm-8 hidden-xs">
                                {/*<ul>*/}
                                {/*<li><i className="fa fa-paper-plane"*/}
                                {/*aria-hidden="true"></i> support@konnectplugins.com*/}
                                {/*</li>*/}
                                {/*<li className="li-last"><i className="fa fa-volume-control-phone"*/}
                                {/*aria-hidden="true"></i> (040) 123-4567*/}
                                {/*</li>*/}
                                {/*</ul>*/}
                            </div>

                            <div className="col-md-6 col-sm-4">
                                {/*<ul className="konnect-float-right">*/}
                                {/*<li><a href="login.html"><i className="fa fa-user-o" aria-hidden="true"></i> Login*/}
                                {/*</a></li>*/}
                                {/*<li><a href="register.html"><i className="fa fa-file-text-o"*/}
                                {/*aria-hidden="true"></i> Register </a></li>*/}
                                {/*<li className="li-last hidden-xs hidden-sm"><a target="_blank" href="#"><i*/}
                                {/*className="fa fa-twitter" aria-hidden="true"></i></a> <a target="_blank"*/}
                                {/*href="#"><i*/}
                                {/*className="fa fa-google-plus" aria-hidden="true"></i></a> <a target="_blank"*/}
                                {/*href="#"><i*/}
                                {/*className="fa fa-facebook" aria-hidden="true"></i></a> <a target="_blank"*/}
                                {/*href="#"><i*/}
                                {/*className="fa fa-linkedin" aria-hidden="true"></i></a><a href="#"> <i*/}
                                {/*className="fa fa-instagram"></i> </a></li>*/}
                                {/*</ul>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <nav id="mainNav" className="navbar navbar-default navbar-fixed-top" style={pStyle}>
                    <div className="container-fluid">
                        <div className="navbar-header">

                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1"><span className="sr-only">Toggle navigation</span>
                                <img src="img/icons/menu.png" alt="menu" width="40"/></button>

                            <a className="navbar-brand" href="/"><img className="logo-change"
                                                                      src="img/logo-green.png"
                                                                      alt="logo"/></a></div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                {/*<li><NavLink exact to={"/"}  activeStyle={{color:'#5DC560'}}>Home</NavLink></li>*/}
                                <li><a href="/">Home</a></li>
                                {/*<li><a href="about.html">About Us</a></li>*/}
                                <li className="dropdown"><a href="course.html" className="dropdown-toggle"
                                                            data-toggle="dropdown">Courses <i
                                    className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.categoryData.map((item, index) => (
                                                <li key={index}><NavLink
                                                    to={`/courses/${item.url}`}>{item.category}</NavLink></li>

                                                // <option key={index} value={item._id}>{item.category}</option>
                                            ))
                                        }
                                    </ul>
                                </li>
                                {/*<li className="dropdown"><a href="pages.html" className="dropdown-toggle"*/}
                                {/*data-toggle="dropdown">Pages <i className="fa fa-angle-down"*/}
                                {/*aria-hidden="true"></i></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="about.html">About Us</a></li>*/}
                                {/*<li><a href="course.html">Courses</a></li>*/}
                                {/*<li><a href="single-course.html">Single Course</a></li>*/}
                                {/*<li><a href="apply-course.html">Application</a></li>*/}
                                {/*<li><a href="gallery.html">Gallery</a></li>*/}
                                {/*<li><a href="404.html">404 page</a></li>*/}
                                {/*<li><a href="login.html">Login</a></li>*/}
                                {/*<li><a href="register.html">Register</a></li>*/}
                                {/*<li><a href="faq.html">Faq</a></li>*/}
                                {/*<li><a href="contact-one.html">Contact One</a></li>*/}
                                {/*<li><a href="contact-two.html">Contact Two</a></li>*/}
                                {/*<li><a href="terms-and-conditions.html">Terms and Conditions</a></li>*/}
                                {/*<li><a href="privacy-policy.html">Privacy Policy</a></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                {/*<li className="dropdown"><a href="blog.html" className="dropdown-toggle"*/}
                                {/*data-toggle="dropdown">Blog <i className="fa fa-angle-down"*/}
                                {/*aria-hidden="true"></i></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="blogs.html">Blogs</a></li>*/}
                                {/*<li><a href="blog-single.html">Blog Single</a></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                {/*<li className="dropdown"><a href="contact.html" className="dropdown-toggle"*/}
                                {/*data-toggle="dropdown">Contact <i*/}
                                {/*className="fa fa-angle-down" aria-hidden="true"></i></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="contact-one.html">Contact One</a></li>*/}
                                {/*<li><a href="contact-two.html">Contact Two</a></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                <li className="dropdown">
                                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                                        {username}
                                        <i className="fa fa-user-o Chevron" aria-hidden="true"></i>
                                        <i className="fa fa-angle-down Chevron" aria-hidden="true"></i></a>
                                    <ul className="dropdown-menu">
                                        <li><a href='/user-dashboard'>Dashboard</a></li>
                                        <li><a href="javascript:void(0)" onClick={this.logOut}>Logout</a></li>
                                    </ul>
                                </li>
                                <li className="search-icon"><a href="javascript:void(0)"
                                                               onClick={() => this.handleClick()}><i
                                    className="fa fa-search"
                                    aria-hidden="true"></i></a>


                                    {/*<ToggleDisplay show={this.state.show} className="search-form" >*/}
                                    {/*<form className="navbar-form" role="search">*/}
                                    {/*<div className="input-group add-on">*/}
                                    {/*<input className="form-control" placeholder="Search" name="srch-term"*/}
                                    {/*id="srch-term" type="text"/>*/}
                                    {/*<div className="input-group-btn">*/}
                                    {/*<button className="btn btn-default" type="submit"><i*/}
                                    {/*className="glyphicon glyphicon-search"></i></button>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</form>*/}

                                    {/*</ToggleDisplay>*/}
                                    <ToggleDisplay if={this.state.show} className="search-form">
                                        <form className="navbar-form" role="search">
                                            <div className="input-group add-on">
                                                <input className="form-control" placeholder="Search"
                                                       name="srch-term"
                                                       id="srch-term" type="text"/>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-default" type="submit"><i
                                                        className="glyphicon glyphicon-search"></i></button>
                                                </div>
                                            </div>
                                        </form>

                                    </ToggleDisplay>
                                </li>
                            </ul>
                        </div>

                    </div>

                </nav>

            </div>
        );
    }
    else{
        return (
            <div className="Header">
                {/*<div className="loading">*/}
                {/*<div className="loader"></div>*/}
                {/*</div>*/}
                <div className="konnect-info">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-6 col-sm-8 hidden-xs">
                                {/*<ul>*/}
                                {/*<li><i className="fa fa-paper-plane"*/}
                                {/*aria-hidden="true"></i> support@konnectplugins.com*/}
                                {/*</li>*/}
                                {/*<li className="li-last"><i className="fa fa-volume-control-phone"*/}
                                {/*aria-hidden="true"></i> (040) 123-4567*/}
                                {/*</li>*/}
                                {/*</ul>*/}
                            </div>

                            <div className="col-md-6 col-sm-4">
                                {/*<ul className="konnect-float-right">*/}
                                {/*<li><a href="login.html"><i className="fa fa-user-o" aria-hidden="true"></i> Login*/}
                                {/*</a></li>*/}
                                {/*<li><a href="register.html"><i className="fa fa-file-text-o"*/}
                                {/*aria-hidden="true"></i> Register </a></li>*/}
                                {/*<li className="li-last hidden-xs hidden-sm"><a target="_blank" href="#"><i*/}
                                {/*className="fa fa-twitter" aria-hidden="true"></i></a> <a target="_blank"*/}
                                {/*href="#"><i*/}
                                {/*className="fa fa-google-plus" aria-hidden="true"></i></a> <a target="_blank"*/}
                                {/*href="#"><i*/}
                                {/*className="fa fa-facebook" aria-hidden="true"></i></a> <a target="_blank"*/}
                                {/*href="#"><i*/}
                                {/*className="fa fa-linkedin" aria-hidden="true"></i></a><a href="#"> <i*/}
                                {/*className="fa fa-instagram"></i> </a></li>*/}
                                {/*</ul>*/}
                            </div>
                        </div>
                    </div>
                </div>

                <nav id="mainNav" className="navbar navbar-default navbar-fixed-top" style={pStyle}>
                    <div className="container-fluid">
                        <div className="navbar-header">

                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1"><span className="sr-only">Toggle navigation</span>
                                <img src="img/icons/menu.png" alt="menu" width="40"/></button>

                            <a className="navbar-brand" href="/"><img className="logo-change"
                                                                      src="img/logo-green.png"
                                                                      alt="logo"/></a></div>


                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                {/*<li><NavLink exact to={"/"}  activeStyle={{color:'#5DC560'}}>Home</NavLink></li>*/}
                                <li><a href="/">Home</a></li>
                                {/*<li><a href="about.html">About Us</a></li>*/}
                                <li className="dropdown"><a href="course.html" className="dropdown-toggle"
                                                            data-toggle="dropdown">Courses <i
                                    className="fa fa-angle-down" aria-hidden="true"></i></a>
                                    <ul className="dropdown-menu">
                                        {
                                            this.state.categoryData.map((item, index) => (
                                                <li key={index}><NavLink
                                                    to={`/courses/${item.url}`}>{item.category}</NavLink></li>

                                                // <option key={index} value={item._id}>{item.category}</option>
                                            ))
                                        }
                                    </ul>
                                </li>
                                {/*<li className="dropdown"><a href="pages.html" className="dropdown-toggle"*/}
                                {/*data-toggle="dropdown">Pages <i className="fa fa-angle-down"*/}
                                {/*aria-hidden="true"></i></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="about.html">About Us</a></li>*/}
                                {/*<li><a href="course.html">Courses</a></li>*/}
                                {/*<li><a href="single-course.html">Single Course</a></li>*/}
                                {/*<li><a href="apply-course.html">Application</a></li>*/}
                                {/*<li><a href="gallery.html">Gallery</a></li>*/}
                                {/*<li><a href="404.html">404 page</a></li>*/}
                                {/*<li><a href="login.html">Login</a></li>*/}
                                {/*<li><a href="register.html">Register</a></li>*/}
                                {/*<li><a href="faq.html">Faq</a></li>*/}
                                {/*<li><a href="contact-one.html">Contact One</a></li>*/}
                                {/*<li><a href="contact-two.html">Contact Two</a></li>*/}
                                {/*<li><a href="terms-and-conditions.html">Terms and Conditions</a></li>*/}
                                {/*<li><a href="privacy-policy.html">Privacy Policy</a></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                {/*<li className="dropdown"><a href="blog.html" className="dropdown-toggle"*/}
                                {/*data-toggle="dropdown">Blog <i className="fa fa-angle-down"*/}
                                {/*aria-hidden="true"></i></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="blogs.html">Blogs</a></li>*/}
                                {/*<li><a href="blog-single.html">Blog Single</a></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                {/*<li className="dropdown"><a href="contact.html" className="dropdown-toggle"*/}
                                {/*data-toggle="dropdown">Contact <i*/}
                                {/*className="fa fa-angle-down" aria-hidden="true"></i></a>*/}
                                {/*<ul className="dropdown-menu">*/}
                                {/*<li><a href="contact-one.html">Contact One</a></li>*/}
                                {/*<li><a href="contact-two.html">Contact Two</a></li>*/}
                                {/*</ul>*/}
                                {/*</li>*/}
                                <li className="dropdown">
                                    <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="fa fa-user-o Chevron" aria-hidden="true"></i>
                                        {username}
                                        <i className="fa fa-angle-down Chevron" aria-hidden="true"></i></a>
                                    <ul className="dropdown-menu">
                                        <li><a href='/dashboard'>Dashboard</a></li>
                                        <li><a href="javascript:void(0)" onClick={this.logOut}>Logout</a></li>
                                    </ul>
                                </li>
                                <li className="search-icon"><a href="javascript:void(0)"
                                                               onClick={() => this.handleClick()}><i
                                    className="fa fa-search"
                                    aria-hidden="true"></i></a>


                                    {/*<ToggleDisplay show={this.state.show} className="search-form" >*/}
                                    {/*<form className="navbar-form" role="search">*/}
                                    {/*<div className="input-group add-on">*/}
                                    {/*<input className="form-control" placeholder="Search" name="srch-term"*/}
                                    {/*id="srch-term" type="text"/>*/}
                                    {/*<div className="input-group-btn">*/}
                                    {/*<button className="btn btn-default" type="submit"><i*/}
                                    {/*className="glyphicon glyphicon-search"></i></button>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</form>*/}

                                    {/*</ToggleDisplay>*/}
                                    <ToggleDisplay if={this.state.show} className="search-form">
                                        <form className="navbar-form" role="search">
                                            <div className="input-group add-on">
                                                <input className="form-control" placeholder="Search"
                                                       name="srch-term"
                                                       id="srch-term" type="text"/>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-default" type="submit"><i
                                                        className="glyphicon glyphicon-search"></i></button>
                                                </div>
                                            </div>
                                        </form>

                                    </ToggleDisplay>
                                </li>
                            </ul>
                        </div>

                    </div>

                </nav>

            </div>
        );
    }

}

    }
}

export default Navbar;
