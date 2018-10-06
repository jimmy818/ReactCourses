import React, { Component } from 'react';
// import './CourseCategoty.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
import CKEditor from 'react-ckeditor-component';
import { NavLink } from 'react-router-dom';
class ViewCourse extends Component {
    constructor(props){
        super(props);
        this.state={
            categoryData:[],
            courseData:[],
            category:'',
            sub_category:'',
            title:'',
            courseDetail:'',
            courseFee:'',
            courseLang:'',
            courseLangE:'',
            courseFeeE:'',
            courseDetailE:'',
            categoryE:'',
            sub_categoryE:'',
            titleE:'',
            ErrorStatus:'',

        };
        this.handleCat = this.handleCat.bind(this);
        this.handleSubCat = this.handleSubCat.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleFee = this.handleFee.bind(this);
        this.handleLang = this.handleLang.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
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
            url: 'http://localhost:7777/api/getSubCategory/id/'+res,
        })
            .then((response) => {
               this.setState({subCategoryData:response.data});
            })
            .catch((e) =>
            {
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    handleSubCat(e){
        e.preventDefault();
        this.setState({sub_category:e.target.value});
        this.setState({ErrorStatus:''});
        this.setState({sub_categoryE:''});
    }
    handleTitle(e){
        e.preventDefault();
        this.setState({title:e.target.value});
        this.setState({ErrorStatus:''});
        this.setState({titleE:''});
    }
    handleFee(e){
        e.preventDefault();
        this.setState({courseFee:e.target.value});
        this.setState({ErrorStatus:''});
        this.setState({courseFeeE:''});
    }
    handleLang(e){
        e.preventDefault();
        this.setState({courseLang:e.target.value});
        this.setState({ErrorStatus:''});
        this.setState({courseLangE:''});
    }
    handleDetail(e){
        e.preventDefault();
        this.setState({courseDetail:e.target.value});
        this.setState({ErrorStatus:''});
        this.setState({courseDetailE:''});
    }
    handleSubmit(e)
    {
        e.preventDefault();
        if(this.state.category==='')
        {
            this.setState({categoryE:'This field is required'});
            this.setState({ErrorStatus:'invalid'});
        }
        if(this.state.sub_category==='')
        {
            this.setState({sub_categoryE:'This field is required'});
            this.setState({ErrorStatus:'invalid'});
        }
        if(this.state.title==='')
        {
            this.setState({titleE:'This field is required'});
            this.setState({ErrorStatus:'invalid'});
        }
        if(this.state.courseFee==='')
        {
            this.setState({courseFeeE:'This field is required'});
            this.setState({ErrorStatus:'invalid'});
        }
        if(this.state.courseLang==='')
        {
            this.setState({courseLangE:'This field is required'});
            this.setState({ErrorStatus:'invalid'});
        }
        if(this.state.courseDetail==='')
        {
            this.setState({courseDetailE:'This field is required'});
            this.setState({ErrorStatus:'invalid'});
        }
        if(this.state.ErrorStatus==='')
        {
            var formData = {
                category_id:this.state.category,
                title:this.state.title,
                fees:this.state.courseFee,
                language:this.state.courseLang,
                detail:this.state.courseDetail,
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/AddCourse',
                data: formData,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Course has been Added..!!');
                    this.setState({category:'',sub_category:'',title:'',courseFee:'',courseLang:'',courseDetail:''});
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
    componentWillMount()
    {

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

        axios({
            method: 'get',
            url: "http://localhost:7777/api/getCourses/",
        })
            .then((response) => {
                this.setState({courseData:response.data});

            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }

    render() {
        return (
            <div className="AddCourse">
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
                                            <li>Add Course</li>
                                        </ul>
                                        <h4>Add Course </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="contentpanel">
                                <div className="col-sm-12 ">
                                    <div className="table-responsive">
                                        <table className="table mb30">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Course Title</th>
                                                <th>Course Fees</th>
                                                <th>Languages</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.courseData.map((item, index) =>(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.title}</td>
                                                        <td>€ {item.fees}</td>
                                                        <td>{item.language}</td>
                                                        <td className="table-action">
                                                            <NavLink to={`/update-course/${item.url}`} data-toggle="tooltip" title="" className="tooltips"
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

export default ViewCourse;
