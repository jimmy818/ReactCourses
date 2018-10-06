import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
class AddStudyMaterial extends Component {
    constructor(){
        super();
        this.state={
            courseData:[],
            topicData:[],
            course:'',
            courseE:'',
            topic_title:'',
            topic_titleE:'',
            week_number:'',
            week_numberE:'',
            learning_file_type:'',
            learning_file_typeE:'',
            learning_file_title:'',
            learning_file_titleE:'',
            learning_file:null,
            learning_fileE:'',
            totalweeks:'',
            learning_fileError:''

        };
        this.topicTitle = this.topicTitle.bind(this);
        this.weekNumber = this.weekNumber.bind(this);
        this.learningFileType = this.learningFileType.bind(this);
        this.learningFileTitle = this.learningFileTitle.bind(this);
        this.learningFile = this.learningFile.bind(this);
        this.handleCourse = this.handleCourse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCourse(e){
        e.preventDefault();
        this.setState({course:e.target.value});
        this.setState({courseE:''});
        let res = this.course.value;
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getTopicCourse/'+res,
        })
            .then((response) => {
                console.log(response.data)
                this.setState({topicData:response.data});
            })
            .catch((e) =>
            {
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    topicTitle(e){
        e.preventDefault();
        this.setState({topic_title:e.target.value});
        this.setState({topic_titleE:''});
        let res = this.topic.value;
        res = res.replace(/\s+/g, '-').toLowerCase();
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getTopic/'+res,
        })
            .then((response) => {
                console.log(response.data);
                this.setState({totalweeks:response.data[0].completion_time});
            })
            .catch((e) =>
            {
                this.setState({success:'Alert: Something went wrong'});
            });
    }
    weekNumber(e){
        e.preventDefault();
        this.setState({week_number:e.target.value});
        this.setState({week_numberE:''});
    }
    learningFileType(e){
        e.preventDefault();
        this.setState({learning_file_type:e.target.value});
        this.setState({learning_file_typeE:''});
    }
    learningFileTitle(e){
        e.preventDefault();
        this.setState({learning_file_title:e.target.value});
        this.setState({learning_file_titleE:''});
    }


    learningFile(e){
        this.setState({ learning_file: e.target.files[0] });
        this.setState({learning_fileE:''});
        this.setState({learning_fileError:''});

    }
    validate = () => {
        var ext = this.state.learning_file.name;
        var exts = ext.split('.').pop();
        let isError = false;
        const errors = {};
        if(this.state.course==='')
        {
            isError = true;
            errors.courseE = 'Please select course *';
        }
        if(this.state.topic_title==='')
        {
            isError = true;
            errors.topic_titleE = 'Please select topic title *';
        }
        if(this.state.week_number==='')
        {
            isError = true;
            errors.week_numberE = 'Please select week number *';
        }
        if(this.state.learning_file_type==='')
        {
            isError = true;
            errors.learning_file_typeE = 'Please Select File Type *';
        }
        if(this.state.learning_file_title==='')
        {
            isError = true;
            errors.learning_file_title = 'Please Enter File Title *';
        }
        if(this.state.learning_file===null)
        {
            isError = true;
            errors.learning_fileE = 'Please select File *';
        }


        if(exts!=='pdf' && exts!=='ppt' && exts!=='pptx' && exts!=='doc'
            && exts!=='docx' && exts!=='mp4' && exts!=='flv' && exts!=='avi'
            && exts!=='mpeg' && exts!=='3gp'
        )
        {
            isError = true;
            errors.learning_fileError = '.'+exts+' File is not valid *';
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
                course:this.state.course,
                topic_title:this.state.topic_title,
                week_number:this.state.week_number,
                learning_file_title:this.state.learning_file_title,
                learning_file_type:this.state.learning_file_type,
                learning_file:this.state.learning_file,
            };
            const {
                topic_title,
                week_number,
                learning_file_title,
                learning_file_type,
                learning_file,
                course,
            } = this.state;
            let fd = new FormData();
            fd.append('Learning',this.state.learning_file,this.state.learning_file.name);
            fd.append('course',course);
            fd.append('topic_title',topic_title);
            fd.append('week_number',week_number);
            fd.append('learning_file_title',learning_file_title);
            fd.append('learning_file_type',learning_file_type);

            axios({
                method: 'post',
                url: 'http://localhost:7777/api/addStudyMaterialFiles',
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
            url: 'http://localhost:7777/api/getTopic/',
        })
            .then((response) => {
                this.setState({topicData:response.data});
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getCourses/',
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
        let weekNo = this.state.totalweeks;
        var options = [];
            for(var i = 1; i<= weekNo; i++)
            {
                options.push(<option key={i} value={i}>{i}</option>);

            }

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
                                            <li>Study Material</li>
                                        </ul>
                                        <h4>Add Study Material</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="contentpanel">
                                <div className="col-sm-5 col-sm-offset-3">
                                    <form encType="multipart/form-data" onSubmit={this.handleSubmit} className="form-horizontal form-bordered" method="post">
                                        <div className="form-group">
                                            <select ref = {(input)=> this.course = input}  onChange={this.handleCourse} className="form-control" name="category" data-toggle="tooltip" data-trigger="hover"
                                                    className="form-control tooltips" title="Select course">
                                                <option selected disabled>Select course</option>
                                                {
                                                    this.state.courseData.map((item, index) =>(
                                                        <option key={index} value={item.title}>{item.title}</option>
                                                    ))
                                                }
                                            </select>
                                            <span className='field-error'>{this.state.courseE}</span>
                                        </div>
                                        <div className="form-group">
                                            <select ref = {(input)=> this.topic = input}  onChange={this.topicTitle} className="form-control" name="category" data-toggle="tooltip" data-trigger="hover"
                                                    className="form-control tooltips" title="Select Topic">
                                                <option selected disabled>Select topic</option>
                                                {
                                                    this.state.topicData.map((item, index) =>(
                                                        <option key={index} value={item.topic_title}>{item.topic_title}</option>
                                                    ))
                                                }
                                            </select>
                                            <span className='field-error'>{this.state.topic_titleE}</span>
                                        </div>
                                        <div className="form-group">
                                            <select ref = {(input)=> this.week = input} onChange={this.weekNumber} className="form-control" name="course" data-toggle="tooltip" data-trigger="hover"
                                                    className="form-control tooltips" title="Select Week Number For which you want to add Study Material">
                                                <option selected disabled>select week number</option>
                                                {options}
                                            </select>
                                            <span className='field-error'>{this.state.courseE}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.learningFileTitle} name="title" value={this.state.learning_file_title} type="text" placeholder="Enter File Title"
                                                   title="File Title Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.learning_file_typeE}</span>
                                        </div>
                                        <div className="form-group">
                                        <select ref = {(input)=> this.fileType = input} onChange={this.learningFileType} className="form-control" name="course" data-toggle="tooltip" data-trigger="hover"
                                        className="form-control tooltips" title="Select File Type ">
                                        <option selected disabled>Select file type</option>
                                        <option value="video">Video</option>
                                        <option value="document">Document</option>
                                        </select>
                                        <span className='field-error'>{this.state.learning_file_typeE}</span>
                                        <span className='field-error'>{this.state.learning_fileError}</span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={this.learningFile} name="Learning"  type="file" placeholder="Select File Here"
                                                   title="Upload File Here"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.learning_fileE}</span>
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

export default AddStudyMaterial;
