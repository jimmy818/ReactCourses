import React, { Component } from 'react';
import './header.css';
import 'font-awesome/css/font-awesome.min.css';
class Header extends Component {
    constructor(){
        super()

        this.logOut = this.logOut.bind(this);

    }
    logOut()
    {
        localStorage.setItem('userId','');
        window.location.href='/login';
    }
    render() {
        return (
            <div className="Header">
                <header>
                    <div className="headerwrapper">
                        <div className="header-left">
                            <a href="/user-dashboard" className="logo">
                                <p className="title-text">Welcome {localStorage.getItem('Uname')}</p>
                            </a>
                            <div className="pull-right">
                                <a href="#" className="menu-collapse">
                                    <i className="fa fa-bars"></i>
                                </a>
                            </div>
                        </div>


                        <div className="header-right">

                            <div className="pull-right">

                                {/*<form className="form form-search"*/}
                                      {/*action="http://themetrace.com/demo/chain/search-results.html">*/}
                                    {/*<input type="search" className="form-control" placeholder="Search"/>*/}
                                {/*</form>*/}

                                {/*<div className="btn-group btn-group-list btn-group-notification">*/}
                                    {/*<button type="button" className="btn btn-default dropdown-toggle"*/}
                                            {/*data-toggle="dropdown">*/}
                                        {/*<i className="fa fa-bell-o"></i>*/}
                                        {/*<span className="badge">5</span>*/}
                                    {/*</button>*/}
                                    {/*<div className="dropdown-menu pull-right">*/}
                                        {/*<a href="#" className="link-right"><i className="fa fa-search"></i></a>*/}
                                        {/*<h5>Notification</h5>*/}
                                        {/*<ul className="media-list dropdown-list">*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user1.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Nusja Nawancali</strong> likes a photo of you*/}
                                                        {/*<small className="date"><i className="fa fa-thumbs-up"></i> 15*/}
                                                            {/*minutes ago</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user2.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Weno Carasbong</strong> shared a photo of you in*/}
                                                        {/*your <strong>Mobile Uploads</strong> album.*/}
                                                        {/*<small className="date"><i className="fa fa-calendar"></i> July*/}
                                                            {/*04, 2014</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user3.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Venro Leonga</strong> likes a photo of you*/}
                                                        {/*<small className="date"><i className="fa fa-thumbs-up"></i> July*/}
                                                            {/*03, 2014</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user4.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Nanterey Reslaba</strong> shared a photo of you in*/}
                                                        {/*your <strong>Mobile Uploads</strong> album.*/}
                                                        {/*<small className="date"><i className="fa fa-calendar"></i> July*/}
                                                            {/*03, 2014</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user1.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Nusja Nawancali</strong> shared a photo of you in*/}
                                                        {/*your <strong>Mobile Uploads</strong> album.*/}
                                                        {/*<small className="date"><i className="fa fa-calendar"></i> July*/}
                                                            {/*02, 2014</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                        {/*</ul>*/}
                                        {/*<div className="dropdown-footer text-center">*/}
                                            {/*<a href="#" className="link">See All Notifications</a>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                {/*</div>*/}


                                {/*<div className="btn-group btn-group-list btn-group-messages">*/}
                                    {/*<button type="button" className="btn btn-default dropdown-toggle"*/}
                                            {/*data-toggle="dropdown">*/}
                                        {/*<i className="fa fa-envelope-o"></i>*/}
                                        {/*<span className="badge">2</span>*/}
                                    {/*</button>*/}
                                    {/*<div className="dropdown-menu pull-right">*/}
                                        {/*<a href="#" className="link-right"><i className="fa fa-plus"></i></a>*/}
                                        {/*<h5>New Messages</h5>*/}
                                        {/*<ul className="media-list dropdown-list">*/}
                                            {/*<li className="media">*/}
                                                {/*<span className="badge badge-success">New</span>*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user1.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Nusja Nawancali</strong>*/}
                                                        {/*<p>Hi! How are you?...</p>*/}
                                                        {/*<small className="date"><i className="fa fa-clock-o"></i> 15*/}
                                                            {/*minutes ago*/}
                                                        {/*</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<span className="badge badge-success">New</span>*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user2.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Weno Carasbong</strong>*/}
                                                        {/*<p>Lorem ipsum dolor sit amet...</p>*/}
                                                        {/*<small className="date"><i className="fa fa-clock-o"></i> July*/}
                                                            {/*04, 2014*/}
                                                        {/*</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user3.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Venro Leonga</strong>*/}
                                                        {/*<p>Do you have the time to listen to me...</p>*/}
                                                        {/*<small className="date"><i className="fa fa-clock-o"></i> July*/}
                                                            {/*03, 2014*/}
                                                        {/*</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user4.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Nanterey Reslaba</strong>*/}
                                                        {/*<p>It might seem crazy what I'm about to say...</p>*/}
                                                        {/*<small className="date"><i className="fa fa-clock-o"></i> July*/}
                                                            {/*03, 2014*/}
                                                        {/*</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                            {/*<li className="media">*/}
                                                {/*<img className="img-circle pull-left noti-thumb"*/}
                                                     {/*src="images/photos/user1.png" alt=""/>*/}
                                                    {/*<div className="media-body">*/}
                                                        {/*<strong>Nusja Nawancali</strong>*/}
                                                        {/*<p>Hey I just met you and this is crazy...</p>*/}
                                                        {/*<small className="date"><i className="fa fa-clock-o"></i> July*/}
                                                            {/*02, 2014*/}
                                                        {/*</small>*/}
                                                    {/*</div>*/}
                                            {/*</li>*/}
                                        {/*</ul>*/}
                                        {/*<div className="dropdown-footer text-center">*/}
                                            {/*<a href="#" className="link">See All Messages</a>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                {/*</div>*/}


                                <div className="btn-group btn-group-option">
                                    <button type="button" className="btn btn-default dropdown-toggle"
                                    data-toggle="dropdown">
                                    <i className="fa fa-user"></i>
                                        <i style={{marginLeft:"6px"}} className="fa fa-caret-down"></i>
                                    </button>
                                    {/*<button type="button" className="btn btn-default dropdown-toggle"*/}
                                            {/*data-toggle="dropdown">*/}
                                        {/*<i className="fa fa-caret-down"></i>*/}
                                    {/*</button>*/}
                                    <ul className="dropdown-menu pull-right" role="menu">
                                        {/*<li><a href="#"><i className="glyphicon glyphicon-user"></i> My Profile</a></li>*/}
                                        {/*<li><a href="#"><i className="glyphicon glyphicon-star"></i> Activity Log</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="#"><i className="glyphicon glyphicon-cog"></i> Account Settings</a>*/}
                                        {/*</li>*/}
                                        {/*<li><a href="#"><i className="glyphicon glyphicon-question-sign"></i> Help</a>*/}
                                        {/*</li>*/}
                                        <li className="divider"></li>
                                        <li><a href="javascript:void(0)" onClick={this.logOut} ><i className="glyphicon glyphicon-log-out"></i>Sign Out</a></li>
                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div>

                </header>
            </div>
        );
    }
}

export default Header;
