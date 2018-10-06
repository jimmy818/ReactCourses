import React, { Component } from 'react';
import './CourseCategoty.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
class AddCourseSubCategory extends Component {
    constructor(){
        super();
        this.state={
            categoryData:[],
            category:'',
            sub_category:'',
            categoryE:'',
            sub_categoryE:'',
            ErrorStatus:''

        };
        this.handleCat = this.handleCat.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCat(e){
        e.preventDefault();
        this.setState({category:e.target.value});
        this.setState({ErrorStatus:''});
    }
    handleChange(e){
        e.preventDefault();
        this.setState({sub_category:e.target.value});

    }
    handleSubmit(e)
    {
        e.preventDefault();
        if(this.state.category==='')
        {
            this.setState({categoryE:'Select Category'});
        }
        if(this.state.sub_category==='')
        {
            this.setState({sub_categoryE:'Sub Category Required'});
        }
        if(this.state.ErrorStatus==='')
        {
            var formData = {
                category:this.state.category,
                sub_category:this.state.sub_category
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/addCourseSubCategory',
                data: formData,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Course Category has been Added..!!');
                        this.setState({sub_category:'',category:''});

                    }
                    else
                    {
                        alert('Something went wrong');
                        this.setState({sub_category:'',category:''});
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
    componentWillMount() {
        // axios.get('http://localhost:7777/api/getCategory')
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getCategory',
        })
            .then((response) => {
                this.setState({categoryData: response.data});
            })
            .catch((e) => {
                console.error(e);
                this.setState({success: 'Alert: Something went wrong'});
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
                                            <li>Add Course Sub-Category</li>
                                        </ul>
                                        <h4>Course Sub-Category</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="contentpanel">
                                <div className="col-sm-4 col-sm-offset-3">
                                    <form onSubmit={this.handleSubmit} className="form-horizontal form-bordered" method="post">
                                        <div className="form-group">
                                            <select onChange={this.handleCat} className="form-control" name="category" data-toggle="tooltip" data-trigger="hover"
                                                    className="form-control tooltips" title="Select Course Category">
                                                <option selected disabled>Select Category</option>
                                                {
                                                    this.state.categoryData.map((item, index) =>(
                                                        <option value={item._id}>{item.category}</option>
                                                    ))
                                                }
                                            </select>
                                            <span className='field-error'>{this.state.categoryE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleChange} name="sub_category" value={this.state.sub_category} type="text" placeholder="Enter Course Sub-Category"
                                                   title="Course Sub-Category Name Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.sub_categoryE}</span>
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

export default AddCourseSubCategory;
