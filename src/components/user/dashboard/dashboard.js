import React, { Component } from 'react';
import './dashboard.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import axios from "axios/index";
import dateFormat from "dateformat";
import Countdown from 'react-countdown-now';
import moment from 'moment';
class UserDashboard extends Component {
    constructor(){
        super();
        this.state = {
            userData:[],
            testData:[],
            isAttempt:false,
            attemptData:[],
            user_id:'',
            test_file:null,
            test_fileE:'',
            file_error:'',
            test_id:'',
        }
        this.StartTest = this.StartTest.bind(this);
        this.testSubmit = this.testSubmit.bind(this);
    }
    StartTest(e){
        var timeStamp  = new Date().toISOString();
        var endTime = moment().add(2, 'h').toISOString();
        alert('Time has begun for your test');
    var formData ={
        test_id:e,
        user_id:this.state.user_id,
        attempt:'true',
        submit:'false',
        start_time:timeStamp,
        end_time:endTime,
        answer_file:'',
    }
        axios({
            method: 'post',
            url: 'http://localhost:7777/api/AttemptTest/',
            data:formData,
        })
            .then((response) => {
                if(response.data=='Success')
                {
                    this.setState({
                        isAttempt:true,
                    });

                    window.location.reload();

                }
            })
    }
    testFile(e){
        this.setState({ test_file: e.target.files[0] });
        this.setState({test_fileE:''});
        this.setState({fileError:''});

    }
    validate = () => {

        let isError = false;
        const errors = {};

        if(this.state.test_file===null)
        {
            isError = true;
            errors.test_fileE = 'Please Select a File';
        }
        if(this.state.test_file!==null)
        {
            var ext = this.state.test_file.name;
            var exts = ext.split('.').pop();
            if(exts!=='pdf' && exts!=='ppt' && exts!=='pptx' && exts!=='doc' && exts!=='docx')
            {
                isError = true;
                errors.fileError = '.'+exts+' File is not valid *';
            }
        }
        if(isError){
            this.setState({
                ...this.state,
                ...errors
            })
        }

        return isError;
    }
    testSubmit(e){
            e.preventDefault();
        const err = this.validate();
        if(!err) {
            let fd = new FormData();
            fd.append('answer',this.state.test_file,this.state.test_file.name);
            fd.append('test_id',this.state.test_id);
            fd.append('user_id',this.state.user_id);
            axios({
                method: 'post',
                url: 'http://localhost:7777/api/uploadAnswer',
                data: fd,
            })
                .then((response) => {
                    if(response.data=='Success')
                    {
                        alert('Answers has been Submited..!!');

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
        var Uid = sessionStorage.getItem('userId');
        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getUser/'+Uid,
        })
            .then((response) => {
                this.setState({
                    userData:response.data[0],
                    user_id:response.data[0]._id,
                });
                sessionStorage.setItem('Uname',response.data[0].username);
                sessionStorage.setItem('Email',response.data[0].email);

                axios({
                    method: 'get',
                    url: 'http://localhost:7777/api/getTestData/'+response.data[0].course,
                })
                    .then((response) => {
                        this.setState({
                            testData:response.data[0],
                            test_id:response.data[0]._id
                        });

                    })
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });

        axios({
            method: 'get',
            url: 'http://localhost:7777/api/getUserAttempt/'+Uid,
        })
            .then((response) => {
                if(response.data && response.data.length==0 ){
                    this.setState({
                        attemptData:{
                            end_time:''
                        }
                    });
                }
                else{
                    this.setState({
                        attemptData:response.data[0],

                    });

                }

                console.log(response.data);

            })
    };
    render() {
        var link = "/uploads/" + this.state.testData.file;
        let date = new Date();
        var LocaltimeStamp = new Date().toISOString();
        LocaltimeStamp = new Date(LocaltimeStamp).getTime();
        var SDate = this.state.testData.start_time;
        var ServertimeStamp = new Date(SDate).getTime();
        var SubmitFile ='';
        if (this.state.attemptData.end_time==='') {

            var AttmtTime = "2017-05-08";
            var SubmitFile ="false";
        }
        else {
            var AttmtTime = this.state.attemptData.end_time;
            var AttmtTime = new Date(AttmtTime).getTime();
        }

        if(AttmtTime>LocaltimeStamp && this.state.attemptData.attempt=='true'){
            if(this.state.attemptData.submit=='false'){

                var testDiv = (
                    <div>
                        <h3 className="timeColor">Remaining Time: <Countdown date={AttmtTime} /></h3>
                        <form method="post" encType="multipart/form-data" onSubmit={ (e) => this.testSubmit(e)}>
                            <div className="form-group col-sm-6 col-sm-offset-3">
                                <label>Upload Answer File</label>
                                <input onChange={(e) =>this.testFile(e)} name="testFile"  type="file" placeholder="Select File Here"
                                       title="Upload Test Here"
                                       data-toggle="tooltip" data-trigger="hover"
                                       className="form-control tooltips"/>
                                <span className='field-error'>{this.state.test_fileE}</span>
                                <span className='field-error'>{this.state.fileError}</span>
                            </div>
                            <div className="form-group col-sm-6 col-sm-offset-3">
                                <button type="submit" className="btn btn-info">Save</button>
                            </div>
                        </form>
                    </div>
                )
            }
            else{
                var testDiv = (
                    <div></div>
                )
            }
        }
        else {
            if (this.state.userData.registration !== 0 && this.state.userData.fees_paid > 0) {
                if (this.state.userData.course == this.state.testData.course && LocaltimeStamp < ServertimeStamp) {
                    var testDiv = (
                        <div className="col-sm-12">
                            <h3>Download File and Start Your Test</h3>
                            <a href={link} onClick={() => this.StartTest(this.state.testData._id)} target="_blank"> <i
                                className="fa fa-file-pdf-o"></i> Click Here and Download File</a>
                            <h4 className="Note">Note:</h4>
                            <ul className="testNote">
                                <li>you have to upload file before {this.state.testData.test_time} Hours</li>
                                <li>When You will click on above link your time will be start.</li>
                            </ul>
                        </div>
                    )
                }

            }

        }
        return (
            <div className="Dashboard">
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
                                        </ul>
                                        <h4>Dashboard</h4>
                                    </div>
                                </div>
                            </div>

<div className="contentpanel">
    <div className="jumbotron">
        <h3 style={{padding:"15px"}}>Welcome {sessionStorage.getItem('Uname')} !!</h3>
    </div>
    {testDiv}
</div>
                            {/*<div className="contentpanel">*/}
                        
                                {/*<div className="row row-stat">*/}
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-success-alt noborder">*/}
                                            {/*<div className="panel-heading noborder">*/}
                                                {/*<div className="panel-btns">*/}
                                                    {/*<a href="#" className="panel-close tooltips" data-toggle="tooltip"*/}
                                                       {/*title="Close Panel"><i className="fa fa-times"></i></a>*/}
                                                {/*</div>*/}
                        
                                                {/*<div className="panel-icon"><i className="fa fa-dollar"></i></div>*/}
                                                {/*<div className="media-body">*/}
                                                    {/*<h5 className="md-title nomargin">Today's Earnings</h5>*/}
                                                    {/*<h1 className="mt5">$8,102.32</h1>*/}
                                                {/*</div>*/}
                        
                                                {/*<hr/>*/}
                                                    {/*<div className="clearfix mt20">*/}
                                                        {/*<div className="pull-left">*/}
                                                            {/*<h5 className="md-title nomargin">Yesterday</h5>*/}
                                                            {/*<h4 className="nomargin">$29,009.17</h4>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="pull-right">*/}
                                                            {/*<h5 className="md-title nomargin">This Week</h5>*/}
                                                            {/*<h4 className="nomargin">$99,103.67</h4>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                        
                        
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-primary noborder">*/}
                                            {/*<div className="panel-heading noborder">*/}
                                                {/*<div className="panel-btns">*/}
                                                    {/*<a href="#" className="panel-close tooltips" data-toggle="tooltip"*/}
                                                       {/*title="Close Panel"><i className="fa fa-times"></i></a>*/}
                                                {/*</div>*/}
                        
                                                {/*<div className="panel-icon"><i className="fa fa-users"></i></div>*/}
                                                {/*<div className="media-body">*/}
                                                    {/*<h5 className="md-title nomargin">New User Accounts</h5>*/}
                                                    {/*<h1 className="mt5">138,102</h1>*/}
                                                {/*</div>*/}
                        
                                                {/*<hr/>*/}
                                                    {/*<div className="clearfix mt20">*/}
                                                        {/*<div className="pull-left">*/}
                                                            {/*<h5 className="md-title nomargin">Yesterday</h5>*/}
                                                            {/*<h4 className="nomargin">10,009</h4>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="pull-right">*/}
                                                            {/*<h5 className="md-title nomargin">This Week</h5>*/}
                                                            {/*<h4 className="nomargin">178,222</h4>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                        
                        
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-dark noborder">*/}
                                            {/*<div className="panel-heading noborder">*/}
                                                {/*<div className="panel-btns">*/}
                                                    {/*<a href="#" className="panel-close tooltips" data-toggle="tooltip"*/}
                                                       {/*data-placement="left" title="Close Panel"><i*/}
                                                        {/*className="fa fa-times"></i></a>*/}
                                                {/*</div>*/}
                        
                                                {/*<div className="panel-icon"><i className="fa fa-pencil"></i></div>*/}
                                                {/*<div className="media-body">*/}
                                                    {/*<h5 className="md-title nomargin">New User Posts</h5>*/}
                                                    {/*<h1 className="mt5">153,900</h1>*/}
                                                {/*</div>*/}
                        
                                                {/*<hr/>*/}
                                                    {/*<div className="clearfix mt20">*/}
                                                        {/*<div className="pull-left">*/}
                                                            {/*<h5 className="md-title nomargin">Yesterday</h5>*/}
                                                            {/*<h4 className="nomargin">144,009</h4>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="pull-right">*/}
                                                            {/*<h5 className="md-title nomargin">This Week</h5>*/}
                                                            {/*<h4 className="nomargin">987,212</h4>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                        
                        
                                    {/*</div>*/}
                        
                                {/*</div>*/}
                        
                        
                                {/*<div className="row">*/}
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-default">*/}
                                            {/*<div className="panel-body padding15">*/}
                                                {/*<h5 className="md-title mt0 mb10">Site Statistics</h5>*/}
                                                {/*<div id="basicFlotLegend" className="flotLegend"></div>*/}
                                                {/*<div id="basicflot" className="flotChart"></div>*/}
                                            {/*</div>*/}
                        
                                            {/*<div className="panel-footer">*/}
                                                {/*<div className="tinystat pull-left">*/}
                                                    {/*<div id="sparkline" className="chart mt5"></div>*/}
                                                    {/*<div className="datainfo">*/}
                                                        {/*<span className="text-muted">Average</span>*/}
                                                        {/*<h4>$9,201</h4>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                        
                                                {/*<div className="tinystat pull-right">*/}
                                                    {/*<div id="sparkline2" className="chart mt5"></div>*/}
                                                    {/*<div className="datainfo">*/}
                                                        {/*<span className="text-muted">Total</span>*/}
                                                        {/*<h4>$8,201</h4>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                        
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-default">*/}
                                            {/*<div className="panel-body padding15">*/}
                                                {/*<h5 className="md-title mt0 mb10">Site Visitors</h5>*/}
                                                {/*<div id="basicFlotLegend2" className="flotLegend"></div>*/}
                                                {/*<div id="basicflot2" className="flotChart"></div>*/}
                                            {/*</div>*/}
                        
                                            {/*<div className="panel-footer">*/}
                                                {/*<div className="tinystat pull-left">*/}
                                                    {/*<div id="sparkline3" className="chart mt5"></div>*/}
                                                    {/*<div className="datainfo">*/}
                                                        {/*<span className="text-muted">Average</span>*/}
                                                        {/*<h4>52,201</h4>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                        
                                                {/*<div className="tinystat pull-right">*/}
                                                    {/*<div id="sparkline4" className="chart mt5"></div>*/}
                                                    {/*<div className="datainfo">*/}
                                                        {/*<span className="text-muted">Total</span>*/}
                                                        {/*<h4>11,201</h4>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                        
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-default">*/}
                                            {/*<div className="panel-body padding15">*/}
                                                {/*<h5 className="md-title mt0 mb10">Site Impressions</h5>*/}
                                                {/*<div id="basicFlotLegend3" className="flotLegend"></div>*/}
                                                {/*<div id="basicflot3" className="flotChart"></div>*/}
                                            {/*</div>*/}
                        
                                            {/*<div className="panel-footer">*/}
                                                {/*<div className="tinystat pull-left">*/}
                                                    {/*<div id="sparkline5" className="chart mt5"></div>*/}
                                                    {/*<div className="datainfo">*/}
                                                        {/*<span className="text-muted">Average</span>*/}
                                                        {/*<h4>37,101</h4>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                        
                                                {/*<div className="tinystat pull-right">*/}
                                                    {/*<div id="sparkline6" className="chart mt5"></div>*/}
                                                    {/*<div className="datainfo">*/}
                                                        {/*<span className="text-muted">Total</span>*/}
                                                        {/*<h4>18,899</h4>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                        
                                {/*</div>*/}
                        
                        
                                {/*<div className="row">*/}
                                    {/*<div className="col-md-8">*/}
                                        {/*<div className="panel panel-default">*/}
                                            {/*<div className="panel-body">*/}
                                                {/*<div className="row">*/}
                                                    {/*<div className="col-md-7">*/}
                                                        {/*<h5 className="lg-title">Network Performance</h5>*/}
                                                        {/*<p className="mb15">Duis autem vel eum iriure dolor in*/}
                                                            {/*vulputate...</p>*/}
                                                        {/*<div id="bar-chart"></div>*/}
                                                    {/*</div>*/}
                        
                                                    {/*<div className="col-md-5">*/}
                                                        {/*<h5 className="lg-title">Server Status</h5>*/}
                                                        {/*<p className="mb15">Summary of the status of your server.</p>*/}
                        
                                                        {/*<span className="sublabel">CPU Usage (40.05 - 32 cpus)</span>*/}
                                                        {/*<div className="progress progress-xs progress-metro">*/}
                                                            {/*<div className="progress-bar progress-bar-primary"*/}
                                                                 {/*role="progressbar" aria-valuenow="40" aria-valuemin="0"*/}
                                                                 {/*aria-valuemax="100" style={{width:"40%"}}></div>*/}
                                                        {/*</div>*/}
                        
                        
                                                        {/*<span className="sublabel">Memory Usage (32.2%)</span>*/}
                                                        {/*<div className="progress progress-xs progress-metro">*/}
                                                            {/*<div className="progress-bar progress-bar-primary"*/}
                                                                 {/*role="progressbar" aria-valuenow="40" aria-valuemin="0"*/}
                                                                 {/*aria-valuemax="100" style={{width:"32%"}}></div>*/}
                                                        {/*</div>*/}
                        
                        
                                                        {/*<span className="sublabel">Disk Usage (82.2%)</span>*/}
                                                        {/*<div className="progress progress-xs progress-metro">*/}
                                                            {/*<div className="progress-bar progress-bar-primary"*/}
                                                                 {/*role="progressbar" aria-valuenow="40" aria-valuemin="0"*/}
                                                                 {/*aria-valuemax="100" style={{width:"82%"}}></div>*/}
                                                        {/*</div>*/}
                        
                        
                                                        {/*<span className="sublabel">Databases (63/100)</span>*/}
                                                        {/*<div className="progress progress-xs progress-metro">*/}
                                                            {/*<div className="progress-bar progress-bar-primary"*/}
                                                                 {/*role="progressbar" aria-valuenow="40" aria-valuemin="0"*/}
                                                                 {/*aria-valuemax="100" style={{width:"63%"}}></div>*/}
                                                        {/*</div>*/}
                        
                        
                                                        {/*<span className="sublabel">Domains (2/10)</span>*/}
                                                        {/*<div className="progress progress-xs progress-metro">*/}
                                                            {/*<div className="progress-bar progress-bar-primary"*/}
                                                                 {/*role="progressbar" aria-valuenow="40" aria-valuemin="0"*/}
                                                                 {/*aria-valuemax="100" style={{width:"20%"}}></div>*/}
                                                        {/*</div>*/}
                        
                        
                                                        {/*<span className="sublabel">Email Account (13/50)</span>*/}
                                                        {/*<div className="progress progress-xs progress-metro">*/}
                                                            {/*<div className="progress-bar progress-bar-primary"*/}
                                                                 {/*role="progressbar" aria-valuenow="40" aria-valuemin="0"*/}
                                                                 {/*aria-valuemax="100" style={{width:"26%"}}></div>*/}
                                                        {/*</div>*/}
                        
                        
                        
                                                    {/*</div>*/}
                        
                                                {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                        
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="panel panel-success-head widget-todo">*/}
                                            {/*<div className="panel-heading">*/}
                                                {/*<div className="pull-right">*/}
                                                    {/*<a title="" data-toggle="tooltip" className="tooltips mr5" href="#"*/}
                                                       {/*data-original-title="Settings"><i*/}
                                                        {/*className="glyphicon glyphicon-cog"></i></a>*/}
                                                    {/*<a title="" data-toggle="tooltip" className="tooltips"*/}
                                                       {/*id="addnewtodo" href="#" data-original-title="Add New"><i*/}
                                                        {/*className="glyphicon glyphicon-plus"></i></a>*/}
                                                {/*</div>*/}
                        
                                                {/*<h3 className="panel-title">To-Do List Widget</h3>*/}
                                            {/*</div>*/}
                                            {/*<ul className="panel-body list-group nopadding">*/}
                                                {/*<li className="list-group-item">*/}
                                                    {/*<div className="ckbox ckbox-default">*/}
                                                        {/*<input type="checkbox" id="washcar" value="1"/>*/}
                                                            {/*<label htmlFor="washcar">Wash car in neighbors house</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li className="list-group-item">*/}
                                                    {/*<div className="ckbox ckbox-default">*/}
                                                        {/*<input type="checkbox" checked="checked" id="eatpizza"*/}
                                                               {/*value="1"/>*/}
                                                            {/*<label htmlFor="eatpizza">Find and eat pizza*/}
                                                                {/*anywhere</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li className="list-group-item">*/}
                                                    {/*<div className="ckbox ckbox-default">*/}
                                                        {/*<input type="checkbox" checked="checked" id="washdish"*/}
                                                               {/*value="1"/>*/}
                                                            {/*<label htmlFor="washdish">Wash the dishes and map the*/}
                                                                {/*floor</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li className="list-group-item">*/}
                                                    {/*<div className="ckbox ckbox-default">*/}
                                                        {/*<input type="checkbox" id="buyclothes" value="1"/>*/}
                                                            {/*<label htmlFor="buyclothes">Buy some clothes</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li className="list-group-item">*/}
                                                    {/*<div className="ckbox ckbox-default">*/}
                                                        {/*<input type="checkbox" checked="checked" id="throw" value="1"/>*/}
                                                            {/*<label htmlFor="throw">Throw the garbage</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li className="list-group-item">*/}
                                                    {/*<div className="ckbox ckbox-default">*/}
                                                        {/*<input type="checkbox" id="reply" value="1"/>*/}
                                                            {/*<label htmlFor="reply">Reply all emails for this*/}
                                                                {/*week</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                        
                                {/*</div>*/}
                        
                        
                                {/*<div className="row row-dashboard">*/}
                                    {/*<div className="col-md-6">*/}
                        
                                        {/*<form method="post" id="basicWizard" className="panel-wizard">*/}
                                            {/*<ul className="nav nav-justified nav-wizard mt0">*/}
                                                {/*<li><a href="#tab1" data-toggle="tab"><strong>Step 1:</strong> Basic*/}
                                                    {/*Info</a></li>*/}
                                                {/*<li><a href="#tab2" data-toggle="tab"><strong>Step 2:</strong> Product*/}
                                                    {/*Info</a></li>*/}
                                                {/*<li><a href="#tab3" data-toggle="tab"><strong>Step*/}
                                                    {/*3:</strong> Payment</a></li>*/}
                                            {/*</ul>*/}
                        
                                            {/*<div className="tab-content">*/}
                                                {/*<div className="tab-pane" id="tab1">*/}
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Firstname</label>*/}
                                                        {/*<div className="col-sm-8">*/}
                                                            {/*<input type="text" name="firstname"*/}
                                                                   {/*className="form-control"/>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                        
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Lastname</label>*/}
                                                        {/*<div className="col-sm-8">*/}
                                                            {/*<input type="text" name="lastname"*/}
                                                                   {/*className="form-control"/>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                        
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Gender</label>*/}
                                                        {/*<div className="col-sm-8">*/}
                                                            {/*<div className="rdio rdio-primary">*/}
                                                                {/*<input type="radio" checked="checked" id="male"*/}
                                                                       {/*value="m" name="radio"/>*/}
                                                                    {/*<label htmlFor="male">Male</label>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="rdio rdio-primary">*/}
                                                                {/*<input type="radio" value="f" id="female" name="radio"/>*/}
                                                                    {/*<label htmlFor="female">Female</label>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                                                {/*</div>*/}
                        
                        
                                                {/*<div className="tab-pane" id="tab2">*/}
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Product ID</label>*/}
                                                        {/*<div className="col-sm-5">*/}
                                                            {/*<input type="text" name="product_id"*/}
                                                                   {/*className="form-control"/>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                        
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Product Name</label>*/}
                                                        {/*<div className="col-sm-8">*/}
                                                            {/*<input type="text" name="product_name"*/}
                                                                   {/*className="form-control"/>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                        
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Category</label>*/}
                                                        {/*<div className="col-sm-4">*/}
                                                            {/*<select className="width100p" data-placeholder="Choose One">*/}
                                                                {/*<option value="">Choose One</option>*/}
                                                                {/*<option value="">3D Animation</option>*/}
                                                                {/*<option value="">Web Design</option>*/}
                                                                {/*<option value="">Software Engineering</option>*/}
                                                            {/*</select>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                                                {/*</div>*/}
                        
                        
                                                {/*<div className="tab-pane" id="tab3">*/}
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Card No</label>*/}
                                                        {/*<div className="col-sm-8">*/}
                                                            {/*<input type="text" name="cardno" className="form-control"/>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                        
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">Expiration</label>*/}
                                                        {/*<div className="col-sm-4">*/}
                                                            {/*<select className="width100p" data-placeholder="Month">*/}
                                                                {/*<option value="">Choose One</option>*/}
                                                                {/*<option value="">January</option>*/}
                                                                {/*<option value="">February</option>*/}
                                                                {/*<option value="">March</option>*/}
                                                                {/*<option value="">...</option>*/}
                                                            {/*</select>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="col-sm-4">*/}
                                                            {/*<select className="width100p" data-placeholder="Year">*/}
                                                                {/*<option value="">Choose One</option>*/}
                                                                {/*<option value="">2013</option>*/}
                                                                {/*<option value="">2014</option>*/}
                                                                {/*<option value="">2015</option>*/}
                                                                {/*<option value="">...</option>*/}
                                                            {/*</select>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                        
                                                    {/*<div className="form-group">*/}
                                                        {/*<label className="col-sm-4">CSV</label>*/}
                                                        {/*<div className="col-sm-4">*/}
                                                            {/*<input type="text" name="csv" className="form-control"/>*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                        
                                                {/*</div>*/}
                        
                                            {/*</div>*/}
                        
                        
                                            {/*<ul className="list-unstyled wizard">*/}
                                                {/*<li className="pull-left previous">*/}
                                                    {/*<button type="button" className="btn btn-default">Previous</button>*/}
                                                {/*</li>*/}
                                                {/*<li className="pull-right next">*/}
                                                    {/*<button type="button" className="btn btn-primary">Next</button>*/}
                                                {/*</li>*/}
                                                {/*<li className="pull-right finish hide">*/}
                                                    {/*<button type="submit" className="btn btn-primary">Finish</button>*/}
                                                {/*</li>*/}
                                            {/*</ul>*/}
                        
                                        {/*</form>*/}
                        
                                    {/*</div>*/}
                        
                        
                                    {/*<div className="col-md-6">*/}
                                        {/*<div className="panel-group" id="accordion2">*/}
                                            {/*<div className="panel panel-primary">*/}
                                                {/*<div className="panel-heading">*/}
                                                    {/*<h4 className="panel-title">*/}
                                                        {/*<a data-toggle="collapse" data-parent="#accordion2"*/}
                                                           {/*href="#collapseOne2">*/}
                                                            {/*Collapsible Group Item #1*/}
                                                        {/*</a>*/}
                                                    {/*</h4>*/}
                                                {/*</div>*/}
                                                {/*<div id="collapseOne2" className="panel-collapse collapse in">*/}
                                                    {/*<div className="panel-body">*/}
                                                        {/*<p>Anim pariatur cliche reprehenderit, enim eiusmod high life*/}
                                                            {/*accusamus terry richardson ad squid. 3 wolf moon officia*/}
                                                            {/*aute, non cupidatat skateboard dolor brunch.</p>*/}
                                                        {/*<p>Anim pariatur cliche reprehenderit, enim eiusmod high life*/}
                                                            {/*accusamus terry richardson ad squid. 3 wolf moon officia*/}
                                                            {/*aute, non cupidatat skateboard dolor brunch.</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                        
                        
                                            {/*<div className="panel panel-primary">*/}
                                                {/*<div className="panel-heading">*/}
                                                    {/*<h4 className="panel-title">*/}
                                                        {/*<a data-toggle="collapse" className="collapsed"*/}
                                                           {/*data-parent="#accordion2" href="#collapseTwo2">*/}
                                                            {/*Collapsible Group Item #2*/}
                                                        {/*</a>*/}
                                                    {/*</h4>*/}
                                                {/*</div>*/}
                                                {/*<div id="collapseTwo2" className="panel-collapse collapse">*/}
                                                    {/*<div className="panel-body">*/}
                                                        {/*Anim pariatur cliche reprehenderit, enim eiusmod high life*/}
                                                        {/*accusamus terry richardson ad squid. 3 wolf moon officia aute,*/}
                                                        {/*non cupidatat skateboard dolor brunch. Food truck quinoa*/}
                                                        {/*nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua*/}
                                                        {/*put a bird on it squid single-origin coffee nulla assumenda*/}
                                                        {/*shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore*/}
                                                        {/*wes anderson cred nesciunt sapiente ea proident. Ad vegan*/}
                                                        {/*excepteur butcher vice lomo. Leggings occaecat craft beer*/}
                                                        {/*farm-to-table, raw denim aesthetic synth nesciunt you probably*/}
                                                        {/*haven't heard of them accusamus labore sustainable VHS.*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                        
                        
                                            {/*<div className="panel panel-primary">*/}
                                                {/*<div className="panel-heading">*/}
                                                    {/*<h4 className="panel-title">*/}
                                                        {/*<a data-toggle="collapse" className="collapsed"*/}
                                                           {/*data-parent="#accordion2" href="#collapseThree2">*/}
                                                            {/*Collapsible Group Item #3*/}
                                                        {/*</a>*/}
                                                    {/*</h4>*/}
                                                {/*</div>*/}
                                                {/*<div id="collapseThree2" className="panel-collapse collapse">*/}
                                                    {/*<div className="panel-body">*/}
                                                        {/*<p>Anim pariatur cliche reprehenderit, enim eiusmod high life*/}
                                                            {/*accusamus terry richardson ad squid. 3 wolf moon officia*/}
                                                            {/*aute, non cupidatat skateboard dolor brunch.</p>*/}
                                                        {/*<p>Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf*/}
                                                            {/*moon tempor, sunt aliqua put a bird on it squid*/}
                                                            {/*single-origin coffee nulla assumenda shoreditch et. Nihil*/}
                                                            {/*anim keffiyeh helvetica, craft beer labore wes anderson cred*/}
                                                            {/*nesciunt sapiente ea proident.</p>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                        
                        
                                        {/*</div>*/}
                        
                                    {/*</div>*/}
                                {/*</div>*/}
                        
                        
                            {/*</div>*/}
                        
                        
                        {/*</div>*/}

                    </div>
                    </div>

                </section>

            </div>
        );
    }
}

export default UserDashboard;
