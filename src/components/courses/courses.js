import React, { Component } from 'react';
import './courses.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {
    constructor(props){
        super(props);
        this.state= {
            categoryData:[],
            courseData:[],
            categoryTitle:''
        };
        this.getPage = this.getPage.bind(this);
        }

    getPage(url){
        window.location.href='/courses/'+url;
    }

    componentWillMount(){
        // console.log(this.props)
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

        const { match:{params} } = this.props;

        //Convert String to UCFIrst and remove dashes
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


        var Titles = params.name.charAt(0).toUpperCase() +params.name.slice(1);
        Titles = Titles.replace(/-/g, ' ').toUpperCase();
        titleCase(Titles);
        this.setState({categoryTitle:titleCase(Titles)});
        axios.get(`http://localhost:7777/api/courses/name/${params.name}`)
            .then((response) => {
                // console.log(response.data)
                this.setState({courseData:response.data});
                // console.log(response.data);
                // console.log(response.data);
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }

    componentWillReceiveProps(props){
        const { match:{params} } = this.props;
        //Convert String to UCFIrst and remove dashes
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
        var Titles = params.name.charAt(0).toUpperCase() +params.name.slice(1);
        Titles = Titles.replace(/-/g, ' ').toUpperCase();


        // this.setState({categoryTitle:titleCase(Titles)});
        axios.get(`http://localhost:7777/api/courses/name/${params.name}`)
            .then((response) => {
                this.setState({courseData:response.data});
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });

        this.setState({ categoryTitle: titleCase(Titles)}, () => {  //here
            // console.log(params.name);
            //both will print same value
        });
    }
    render() {
        return (
            <div className="Courses">
                <Navbar/>
                    <div className="container-fluid outer-cont"  style={{backgroundColor:"#EAEAEA"}}>
                        <div className="container-fluid row-cont" >
                        <div className="container conts">
                        <div className="row rowContent">
                            <div className="col-sm-3 col-sm-offset-1 catBox">
                                <div>
                                <h5 style={{margin:"8px 5px"}}>CATEGORIES</h5>
                                <ul className="list">
                                    {
                                        this.state.categoryData.map((item, index) =>(
                                            <li key={index}><a onClick={() => this.getPage(item.url)} ><i className="fa fa-angle-right"></i>  {item.category}</a></li>
                                        ))
                                    }

                                </ul>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <h2>Courses <i className="fa fa-angle-right"></i> {this.state.categoryTitle} </h2>
                            <h3>{this.state.categoryTitle}</h3>
                            </div>
                        </div>
                        </div></div>
                            <div className="container conentCont">
                                <div className="col-sm-7 col-sm-offset-4">
                                    <ul className="sub_catList">
                                        {
                                            this.state.courseData.map((item, index) =>(
                                                <li key={index}>
                                                     <NavLink to={`${this.props.match.url}/${item.url}`} >Title: {item.title}</NavLink>
                                                    <p className="paragraphs">Languages: {item.language}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>



                <Footer/>
            </div>
            </div>
        );
    }
}

export default Courses;
