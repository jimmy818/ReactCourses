import React, { Component } from 'react';
// import './CourseCategoty.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
import CKEditor from 'react-ckeditor-component';
class UpdateCourse extends Component {
    constructor(props){
        super(props);
        this.state={
            categoryData:[],
            courseData:[],
            category:'',
            sub_category:'',
            OrgCourse:'',
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

    validate = () => {

        let isError = false;
        const errors = {};

        if(this.state.category ==='')
        {
            isError = true;
            errors.categoryE = 'Please select category';
        }
        if(this.state.title ==='')
        {
            isError = true;
            errors.titleE = 'Please enter course Title';
        }
        if(this.state.courseFee==='')
        {
            isError = true;
            errors.courseFeeE = 'Please enter course Fee';
        }
        if(this.state.courseLang==='')
        {
            isError = true;
            errors.courseLangE = 'Please enter course Language';
        }
        if(this.state.courseDetail==='')
        {
            isError = true;
            errors.courseDetailE = 'Please enter course Detail';
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
                OrgCourse:this.state.OrgCourse,
                // category_id:this.state.category,
                title:this.state.title,
                fees:this.state.courseFee,
                language:this.state.courseLang,
                detail:this.state.courseDetail,
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/updateCourse',
                data: formData,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Course has been Updated!');
                    this.setState({category:'',sub_category:'',title:'',courseFee:'',courseLang:'',courseDetail:''});
                    window.location.href='/view-course';
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
            url: `http://localhost:7777/api/course/${this.props.match.params.title}`,
        })
            .then((response) => {
                this.setState({courseData:response.data[0]});
                this.setState({category:response.data[0].category});
                this.setState({title:response.data[0].title});
                this.setState({OrgCourse:response.data[0].title});
                this.setState({courseDetail:response.data[0].detail});
                this.setState({courseFee:response.data[0].fees});
                this.setState({courseLang:response.data[0].language});
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
                                <div className="col-sm-6 col-sm-offset-2">
                                    <form onSubmit={this.handleSubmit} className="form-horizontal form-bordered" method="post">
                                        <div className="form-group">
                                            <select disabled ref = {(input)=> this.menu = input} value={this.state.category} onChange={this.handleCat} className="form-control" name="category" data-toggle="tooltip" data-trigger="hover"
                                                    className="form-control tooltips" title="Select Course Category">
                                                <option disabled>Select Category</option>
                                                {
                                                    this.state.categoryData.map((item, index) =>(
                                                        <option key={index} value={item._id}>{item.category}</option>
                                                    ))
                                                }
                                            </select>
                                            <span className='field-error'>{this.state.categoryE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleTitle} name="title" value={this.state.title} type="text" placeholder="Enter Course Title"
                                                   title="Course Title Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.titleE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleFee} name="category" value={this.state.courseFee} type="text" placeholder="Enter Course Fees"
                                                   title="Course Fee Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.courseFeeE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.handleLang} name="category" value={this.state.courseLang} type="text" placeholder="English, Dutch "
                                                   title="Course Language Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.courseLangE}</span>
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" title="Course Details Here"
                                                      data-toggle="tooltip" data-trigger="hover"
                                                      className="form-control tooltips" placeholder="Enter Course Details here" name="courseDetail" id="" cols="50" rows="10" value={this.state.courseDetail} onChange={this.handleDetail}></textarea>
                                            {/*<CKEditor value={this.state.courseDetail} onChange={this.handleDetail}/>*/}
                                            <span className='field-error'>{this.state.courseDetailE}</span>
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

export default UpdateCourse;
