import React, { Component } from 'react';
import './CourseCategoty.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
class AddCourseCategory extends Component {
    constructor(){
        super();
        this.state={
            category:'',
            url:'',
            Error:''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        var url = e.target.value;
        url = url.replace(/\s+/g, '-').toLowerCase();
        this.setState({category:e.target.value});
        this.setState({Error:''});
        this.setState({url:url});

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
                category:this.state.category,
                url:this.state.url
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
                                            <li>Add Course Category</li>
                                        </ul>
                                        <h4>Course Category</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="contentpanel">
                                <div className="col-sm-4 col-sm-offset-3">
                                <form onSubmit={this.handleSubmit} className="form-horizontal form-bordered" method="post">
                                    <div className="form-group">
                                            <input onChange={this.handleChange} name="category" value={this.state.category} type="text" placeholder="Enter Course Category"
                                                   title="Course Category Name Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                        <span className='field-error'>{this.state.Error}</span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-info">Save</button>
                                    </div>
                                </form>
                                </div>
                            </div>


                        </div>
                    </div>

                </section>

            </div>
        );
    }
}

export default AddCourseCategory;
