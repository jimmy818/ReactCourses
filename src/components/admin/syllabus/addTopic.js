import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
import CKEditor from 'react-ckeditor-component';
class AddTopic extends Component {
    constructor(props){
        super(props);
        this.state={
            categoryData:[],
            courseData:[],
            category:'',
            categoryE:'',
            course:'',
            courseUrl:'',
            courseId:'',
            courseE:'',
            topic_title:'',
            topic_titleE:'',
            url:'',
            completion_time:'',
            completion_timeE:'',
            time_per_week:'',
            time_per_weekE:'',
            subtitle_language:'',
            subtitle_languageE:'',
            about_topic:'',
            about_topicE:'',
        };

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
        var url = e.target.value;
        url = url.replace(/\s+/g, '-').toLowerCase();
        this.setState({courseUrl:url});
    }
    TopicTitle(e){
        e.preventDefault();
        this.setState({topic_title:e.target.value});
        this.setState({topic_titleE:''});
        var url = e.target.value;
        url = url.replace(/\s+/g, '-').toLowerCase();
        this.setState({url:url});
    }
    CompletionTime(e){
        e.preventDefault();
        this.setState({completion_time:e.target.value});
        this.setState({completion_timeE:''});
    }
    TimePerWeek(e){
        e.preventDefault();
        this.setState({time_per_week:e.target.value});
        this.setState({time_per_weekE:''});
    }
    SubtitleLanguage(e){
        e.preventDefault();
        this.setState({subtitle_language:e.target.value});
        this.setState({subtitle_languageE:''});
    }
    AboutTopic(evt){
        var newContent = evt.editor.getData();
        this.setState({about_topic:newContent});
        this.setState({about_topicE:''});
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
        if(this.state.topic_title ==='')
        {
            isError = true;
            errors.topic_titleE = 'Please Enter Topic Title *';
        }
        if(this.state.completion_time ==='')
        {
            isError = true;
            errors.completion_timeE = 'Please Enter Completion Time *';
        }
        if(this.state.time_per_week==='')
        {
            isError = true;
            errors.time_per_weekE= 'Please Enter Time Per Week *';
        }
        if(this.state.subtitle_language==='')
        {
            isError = true;
            errors.subtitle_languageE = 'Please Enter Video Subtitle Language *';
        }
        if(this.state.about_topic==='')
        {
            isError = true;
            errors.about_topicE = 'Please Enter About Topic Content *';
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
                topic_title:this.state.topic_title,
                completion_time:this.state.completion_time,
                subtitle_language:this.state.subtitle_language,
                time_per_week:this.state.time_per_week,
                about_topic:this.state.about_topic,
                url:this.state.url,
                course_url:this.state.courseUrl,
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/addTopic',
                data: formData,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Topic has been Added Successfully..!!');
                        this.setState({
                            category:'',
                            course:'',
                            topic_title:'',
                            completion_time:'',
                            time_per_week:'',
                            subtitle_language:'',
                            about_topic:'',
                            });
                        window.load();
                    }
                    else
                    {
                        var newContent = '';
                        alert('Something went wrong');
                        this.setState({
                            category:'',
                            course:'',
                            topic_title:'',
                            completion_time:'',
                            time_per_week:'',
                            subtitle_language:'',
                            about_topic:newContent,
                        });
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
                                    <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal form-bordered" method="post">
                                        <div className="form-group">
                                            <select ref = {(input)=> this.menu = input}  onChange={this.handleCat.bind(this)} className="form-control" name="category" data-toggle="tooltip" data-trigger="hover"
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
                                            <select ref = {(input)=> this.course = input} onChange={this.handleCourse.bind(this)} className="form-control" name="course" data-toggle="tooltip" data-trigger="hover"
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
                                            <input onChange={this.TopicTitle.bind(this)} name="title" value={this.state.topic_title} type="text" placeholder="Enter Topic Title"
                                                   title="Topic Title Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.topic_titleE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.CompletionTime.bind(this)} name="completion_time" value={this.state.completion_time} type="text" placeholder="eg. 8"
                                                   title="Completion Time in Weeks"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.completion_timeE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.TimePerWeek.bind(this)} name="category" value={this.state.time_per_week} type="text" placeholder="eg. 4-5 Hours/Week "
                                                   title="Time in Hours"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.time_per_weekE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.SubtitleLanguage.bind(this)} name="category" value={this.state.subtitle_language} type="text" placeholder="eg. English"
                                                   title="Video Subtitle Language"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.subtitle_languageE}</span>
                                        </div>
                                        <div className="form-group">
                                            <CKEditor content={this.state.about_topic} events={{"change":this.AboutTopic.bind(this)}}/>
                                            <span className='field-error'>{this.state.about_topicE}</span>
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

export default AddTopic;
