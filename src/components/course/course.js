import React, { Component } from 'react';
import './course.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
class Course extends Component {
    constructor(props){
        super(props);
        this.state= {
            courseData:[],
            syllabusData:[],
            materialData:[],
            categoryTitle:'',
            courseTitle:'',
        };

    }

    handleModel(e){
        e.preventDefault();

    }

    componentWillMount(){
        const { match:{params} } = this.props;

        function titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            // Directly return the joined string
            return splitStr.join(' ');
        }
        var Category = params.name.charAt(0).toUpperCase() +params.name.slice(1);
        Category = Category.replace(/-/g, ' ').toUpperCase();
        this.setState({category:titleCase(Category)});

        function titleCourse(str) {
            var splitStr1 = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr1.length; i++) {
                // You do not need to check if i is larger than splitStr length, as your for does that for you
                // Assign it back to the array
                splitStr1[i] = splitStr1[i].charAt(0).toUpperCase() + splitStr1[i].substring(1);
            }
            // Directly return the joined string
            return splitStr1.join(' ');
        }
        var Course = params.course.charAt(0).toUpperCase() +params.course.slice(1);
        Course = Course.replace(/-/g, ' ').toUpperCase();
        this.setState({categoryTitle:titleCourse(Course)});
        axios.get(`http://localhost:7777/api/course/${params.course}`)
            .then((response) => {
                this.setState({courseData:response.data[0]});
                // console.log(response.data[0])
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });

        axios.get(`http://localhost:7777/api/syllabus/${params.course}`)
            .then((response) => {
                this.setState({syllabusData:response.data});
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
        axios.get(`http://localhost:7777/api/getMaterial`)
            .then((response) => {
                this.setState({materialData:response.data});
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });


    }
     render() {

        return (
            <div className="Courses">
                <Navbar/>
                <div className="container-fluid outer-cont" style={{backgroundColor:"#fff"}}>
                    <div className="container-fluid row-conts" >
                        <div className="container conts">
                            <div className="row rowContent">
                                <div className="col-sm-2 col-sm-offset-1 catBox">
                                    <ul className="list">
                                        <li><NavLink to="#overview"><i className="fa fa-angle-right"></i> Overview</NavLink></li>
                                        <li><NavLink to="#syllabus"><i className="fa fa-angle-right"></i> Syllabus</NavLink></li>
                                        {/*<li><NavLink to={``}><i className="fa fa-angle-right"></i> FAQs</NavLink></li>*/}
                                        {/*<li><NavLink to={``}><i className="fa fa-angle-right"></i> Creators</NavLink></li>*/}
                                        <li><button data-toggle="modal" data-target="#myModal" className="btn btn-lg btn-primary btnEnroll">Enroll</button></li>
                                    </ul>
                                </div>
                                <div className="col-sm-8">
                                    <h5 className="textLight">Home <i className="fa fa-angle-right"></i> Courses <i className="fa fa-angle-right"></i> {this.state.category}  </h5>

                                    <h2 className="bigTextLight"> {this.state.categoryTitle}</h2>
                                </div>
                            </div>
                        </div></div>
                    <div className="container conentCont">
                        <div className="col-sm-8 col-sm-offset-3 dataCol">
                            <div className="trialDiv">
                                <p>Start Your Free Trial now</p>
                                <button data-toggle="modal" data-target="#myModal" className="btn btn-lg btn-primary btnEnroll">Enroll</button>
                            </div>
                            <div className="overview" id="overview">
                                <h3 className="headingAbout">Overview</h3>
                            <p className="paragraphSize"><b>Language : </b>  {this.state.courseData.language}.</p>
                            <p className="paragraphSize"><b>Course Fee : </b> € {this.state.courseData.fees}/-</p>
                            <p className="paragraphSize"><b>About Course : </b>  {this.state.courseData.detail}</p>
                            </div>
                            <div className="overview" id="syllabus">
                                <h3 className="headingAbout">Syllabus</h3>
                                {/*<h4 className="SubHead">Topics to be Cover in Syllabus</h4>*/}
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Topic Name</th>
                                        <th>Time</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {

                                        this.state.syllabusData.map((item, index) =>(
                                            <tr key={index}>
                                            <td>Topic-{index+1}</td>
                                            <td>{item.topic_title}</td>
                                            <td>{item.completion_time} Weeks</td>
                                            </tr>
                                        ))

                                    }

                                    </tbody>
                                </table>
                                <hr/>
                                {

                                    this.state.syllabusData.map((item, index) =>(
                                        <div key={index} className="FullDiv">
                                            <span className="TopicNo">Topic- {index+1}</span>
                                            <div className="TopicDiv">
                                                <h2 className="topicTitle">{item.topic_title}</h2>
                                                <table className="table tbls">
                                                    <thead>
                                                    <tr>
                                                        <th>Commitment</th>
                                                        <th>Subtitles</th>
                                                        <th>Time/Week</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>{item.completion_time} Weeks</td>
                                                        <td>{item.subtitle_language}</td>
                                                        <td>{item.time_per_week}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <h4 className="topicTitles">About The Topic</h4>
                                            <div dangerouslySetInnerHTML={{ __html: item.about_topic}}>
                                            </div>

                                        </div>
                                    ))

                                }
                                <h4 className="topicTitles">Study Material</h4>
                                <ul className="filesTitle">
                                    {

                                        this.state.materialData.map((item1, index) =>(

                                            <li key={index}>
                                                <a target = "_blank" href={item1.learning_file} >
                                                    {item1.learning_file_title}
                                                </a>
                                            </li>
                                        ))

                                    }
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h3 className="modal-title">7-day Free Trial</h3>
                                </div>
                                <div className="modal-body">
                                    <ul className="listModal">
                                        <li>
                                            <div className="col-sm-12 nopadding mainDiv">
                                                <div className="col-sm-1 nopadding">
                                                    <i className="fa fa-check fa-color"></i>
                                                </div>
                                                <div className="col-sm-11 nopadding">
                                                    <h4 className="firstHead">Unlimited access to all courses in the Specialization</h4>
                                                    <p>Watch lectures, try assignments, participate in discussion forums, and more.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="col-sm-12 nopadding mainDiv">
                                                <div className="col-sm-1 nopadding">
                                                    <i className="fa fa-check fa-color"></i>
                                                </div>
                                                <div className="col-sm-11 nopadding">
                                                    <h4 className="firstHead">
                                                        Cancel anytime.</h4>
                                                    <p>No penalties - simply cancel before the trial ends if it's not right for you.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="col-sm-12 nopadding mainDiv">
                                                <div className="col-sm-1 nopadding">
                                                    <i className="fa fa-check fa-color"></i>
                                                </div>
                                                <div className="col-sm-11 nopadding">
                                                    <h4 className="firstHead">
                                                        €200 per month to continue learning after trial ends.</h4>
                                                    <p>Go as fast as you can - the faster you go, the more you save.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="col-sm-12 nopadding mainDiv">
                                                <div className="col-sm-1 nopadding">
                                                    <i className="fa fa-check fa-color"></i>
                                                </div>
                                                <div className="col-sm-11 nopadding">
                                                    <h4 className="firstHead">
                                                        Certificate when you complete.</h4>
                                                    <p>Share on your resume, LinkedIn, and CV.</p>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success btn-lg" data-dismiss="modal">Start Free Trial
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Course;
