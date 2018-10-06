import React, { Component } from 'react';
import './sidebar.css';
import 'font-awesome/css/font-awesome.min.css';
class Sidebar extends Component {
    render() {
        return (
            <div className="Sidebar">
                <div className="leftpanel">
                    <div className="media profile-left">
                        <a className="pull-left profile-thumb" href="profile.html">
                            <img className="img-circle" src="admin-assets/images/profile.png" alt=""/>
                        </a>
                        <div className="media-body">
                            <h4 className="media-heading">{sessionStorage.getItem('Uname')}</h4>
                            <small className="text-muted">User Account</small>
                        </div>
                    </div>


                    <h5 className="leftpanel-title">Navigation</h5>
                    <ul className="nav nav-pills nav-stacked">
                        <li className="active"><a href="/user-dashboard"><i className="fa fa-home"></i>
                            <span>Dashboard</span></a></li>
                        {/*<li><a href="messages.html"><span className="pull-right badge">5</span><i*/}
                            {/*className="fa fa-envelope-o"></i> <span>Messages</span></a></li>*/}
                        {/*<li className="parent"><a href="javascript:void(0)"><i className="fa fa-book"></i>*/}
                            {/*<span>Manage Courses</span></a>*/}
                            {/*<ul className="children">*/}
                                {/*<li><a href="/add-course-category"><i className="fa fa-plus"></i> Course Category</a></li>*/}
                                {/*/!*<li><a href="/add-course-sub-category"><i className="fa fa-plus"></i> Course Sub Category</a></li>*!/*/}
                                {/*<li><a href="/add-course"><i className="fa fa-plus"></i> Course </a></li>*/}
                                {/*<li><a href="/view-course-category"><i className="fa fa-eye"></i> Course Category</a></li>*/}
                                {/*/!*<li><a href="buttons.html"><i className="fa fa-eye"></i> Course Sub Category</a></li>*!/*/}
                                {/*<li><a href="/view-course"><i className="fa fa-eye"></i> Course </a></li>*/}
                            {/*</ul>*/}
                        {/*</li>*/}

                    </ul>

                </div>

            </div>
        );
    }
}

export default Sidebar;
