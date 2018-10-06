import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
import CKEditor from 'react-ckeditor-component';
import  DatePicker from 'react-datepicker';
import moment from 'moment';
import './add-notification.css';

require('react-datepicker/dist/react-datepicker.css');


class AddNotification extends Component {
    constructor(props){
        super(props);
        this.state={
            startDate: moment(),
            heading:'',
            headingE:'',
            details:'',
            detailsE:'',
            test_date:'',
            test_dateE:'',
            timeStamp:''
        };

    }

    handleHeading(e){
        e.preventDefault();
        this.setState({heading:e.target.value});
        this.setState({headingE:''});
    }
    handleDate(date){
        var newDate=date;
        var abs = date.format("DD-MM-YYYY") //"2013-03-10"
        var timeStamp = new Date(newDate).getTime();
        this.setState({
            test_date: abs,
            timeStamp:timeStamp,
            test_dateE:'',
        });

    }
    handleDetails(evt){
        var newContent = evt.editor.getData();
        this.setState({details:newContent});
        this.setState({detailsE:''});
    }


    validate = () => {
        let isError = false;
        const errors = {};
        if(this.state.heading==='')
        {
            isError = true;
            errors.headingE = 'Please enter Heading * ';
        }
        if(this.state.details==='')
        {
            isError = true;
            errors.detailsE = 'Please enter Details *';
        }
        if(this.state.test_date ==='')
        {
            isError = true;
            errors.test_dateE = 'Please Enter Date *';
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
                heading:this.state.heading,
                details:this.state.details,
                test_date:this.state.test_date,
                timeStamp:this.state.timeStamp,
            };
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/addNotification',
                data: formData,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        var newContent = '';
                        alert('Topic has been Added Successfully..!!');
                        this.setState({
                            heading:'',
                            details:newContent,
                            test_date:'',
                        });
                        window.load();
                    }
                    else
                    {
                        var newContent = '';
                        alert('Something went wrong');
                        this.setState({
                            heading:'',
                            details:newContent,
                            test_date:'',
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
        else{
            alert(err);
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
                                            <label>Notification Heading</label>
                                            <input onChange={this.handleHeading.bind(this)} name="category" value={this.state.heading} type="text" placeholder="eg. Notification Heading"
                                                   title="Enter Notification Heading"
                                                   data-toggle="tooltip" data-trigger="hover"
                                                   className="form-control tooltips"/>
                                            <span className='field-error'>{this.state.headingE}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Test Date</label>
                                            <DatePicker
                                                className="form-control"
                                                dateFormat="DD/MM/YYYY"
                                                value={this.state.test_date}
                                                placeholderText="DD/MM/YYYY"
                                                onChange={this.handleDate.bind(this)} />
                                            <span className='field-error'>{this.state.subtitle_languageE}</span>
                                        </div>
                                        <div className="form-group">
                                            <label>Test Detail</label>
                                            <CKEditor content={this.state.details} events={{"change":this.handleDetails.bind(this)}} placeholder="Add Notificaiton Detail"/>
                                            <span className='field-error'>{this.state.detailsE}</span>
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

export default AddNotification;
