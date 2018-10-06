import React, { Component } from 'react';
import './CourseCategoty.css';
import 'font-awesome/css/font-awesome.min.css';
import  { Redirect } from 'react-router-dom'
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
import { NavLink } from 'react-router-dom';

class ViewCourseCategory extends Component {
    constructor(){
        super();
        this.state={
            categoryData:[],
            Error:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this, 'Parameter');
    }
    handleChange(e){
        e.preventDefault();
        this.setState({category:e.target.value});

    }
    handleSubmit(e)
    {
        e.preventDefault();
        if(this.state.category==='')
        {
            this.setState({Error:'Category Required'});
        }
        else
        {
            var formData = {
                category:this.state.category
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/addCourseCategory',
                data: formData,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Course Category has been Added..!!');
                        this.setState({category:''});

                    }
                    else
                    {
                        alert('Something went wrong');
                        this.setState({category:''});
                    }
                    // this.setState({success:'Alert: '+response.data});
                })
                .catch((e) =>
                {
                    console.error(e);
                    this.setState({success:'Alert: Something went wrong'});
                });
        }
    }
    handleDelete(param, e){
        axios({
            method: 'post',
            url: 'http://localhost:7777/api/deleteCourseCategory',
            data: {_id:e},
        })
            .then((response) => {
                if(response.data=='Success')
                {
                    alert('Course Category has been Deleted..!!');
                    window.location.href="/view-course-category";
                }
                else
                {
                    alert('Something went wrong');
                    this.setState({category:''});
                }
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    componentWillMount(){
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getCategory',
        })
            .then((response) => {
                this.setState({categoryData:response.data});
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    render() {
        return (
            <div className="AddCourseCategory">
                <Header/>
                <section>
                    <div className="mainwrapper">
                        <Sidebar/>

                        <div className="mainpanel">
                            <div className="pageheader">
                                <div className="media">
                                    <div className="pageicon pull-left">
                                        <i className="fa fa-home"></i>
                                    </div>
                                    <div className="media-body">
                                        <ul className="breadcrumb">
                                            <li><a href="#"><i className="glyphicon glyphicon-home"></i></a></li>
                                            <li>Dashboard</li>
                                            <li>View Course Categories</li>
                                        </ul>
                                        <h4>Course Category</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="contentpanel">
                                <div className="col-sm-5 col-sm-offset-3">
                                    <div className="table-responsive">
                                        <table className="table mb30">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Category Name</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.categoryData.map((item, index) =>(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.category}</td>
                                                        <td className="table-action">
                                                            <NavLink to={`/update-course-category/${item.category}`} data-toggle="tooltip" title="" className="tooltips"
                                                               data-original-title="Edit"><i className="fa fa-pencil"></i></NavLink>
                                                            <a href="javascript:void(0)" onClick={(e) => this.handleDelete(item._id, e)}  data-toggle="tooltip" title=""
                                                               className="delete-row tooltips" data-original-title="Delete"><i
                                                                className="fa fa-trash-o"></i></a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }


                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                </section>

            </div>
        );
    }
}

export default ViewCourseCategory;
