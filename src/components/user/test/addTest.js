import React, { Component } from 'react';
import './test.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
class AddTest extends Component {
    constructor(){
        super();
        this.state={
            categoryData:[],
            courseData:[],
            category:'',
            course:'',
            testFile:null,
            categoryE:'',
            courseE:'',
            testFileE:'',
            ErrorStatus:''

        };
        this.handleFile = this.handleFile.bind(this);
        this.handleCat = this.handleCat.bind(this);
        this.handleCourse = this.handleCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCat(e){
        e.preventDefault();
        this.setState({category:e.target.value});
        this.setState({ErrorStatus:''});
        this.setState({categoryE:''});
        let res = this.menu.value;
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getCourse/title/'+res,
        })
            .then((response) => {
                this.setState({courseData:response.data});
            })
            .catch((e) =>
            {
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    handleCourse(e){
        let cour = this.course.value;
        this.setState({course:e.target.value});
        this.setState({courseE:''});
    }

    handleFile(e){
        this.setState({ testFile: e.target.files[0] });
        this.setState({testFileE:''});

    }
    validate = () => {
        let isError = false;
        const errors = {};
        if(this.state.category==='')
        {
            isError = true;
            errors.categoryE = 'Please select category';
        }
        if(this.state.course==='')
        {
            isError = true;
            errors.courseE = 'Please select course';
        }
        if(this.state.testFile===null)
        {
            isError = true;
            errors.testFileE = 'Please Select a File';
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
        {
            var formData = {
                category:this.state.category,
                course:this.state.course,
            };
            const {category,course} = this.state;
            let fd = new FormData();
            fd.append('Test',this.state.testFile,this.state.testFile.name);
            fd.append('category',category);
            fd.append('course',course);
            console.log(fd);
           axios({
                method: 'post',
                url: 'http://localhost:7777/api/uploadTest',
                data: fd,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Test has been Added..!!');

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
                                            <li>Manage Test</li>
                                        </ul>
                                        <h4>Upload Test</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="contentpanel">
                                <div className="col-sm-5 col-sm-offset-3">
                                    <form encType="multipart/form-data" onSubmit={this.handleSubmit} className="form-horizontal form-bordered" method="post">
                                        <div className="form-group">
                                            <select ref = {(input)=> this.menu = input}  onChange={this.handleCat} className="form-control" name="category" data-toggle="tooltip" data-trigger="hover"
                                                    className="form-control tooltips" title="Select Course Category">
                                                <option selected disabled>Select Category</option>
                                                {
                                                    this.state.categoryData.map((item, index) =>(
                                                        <option key={index} value={item.category}>{item.category}</option>
                                                    ))
                                                }
                                            </select>
                                            <span className='field-error'>{this.state.categoryE}</span>
                                        </div>
                                        <div className="form-group">
                                        <select ref = {(input)=> this.course = input} onChange={this.handleCourse} className="form-control" name="course" data-toggle="tooltip" data-trigger="hover"
                                        className="form-control tooltips" title="Select Course ">
                                        <option selected disabled>Select Course</option>
                                        {
                                        this.state.courseData.map((item, index) =>(
                                        <option key={index} value={item.title}>{item.title}</option>
                                        ))
                                        }
                                        </select>
                                        <span className='field-error'>{this.state.courseE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleFile} name="testFile"  type="file" placeholder="Select File Here"
                                                   title="Upload Test Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.testFileE}</span>
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

export default AddTest;
