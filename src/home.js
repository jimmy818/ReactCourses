import React, { Component } from 'react';
import './home.css';
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios/index";
import dateFormat from 'dateformat';
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            notificationData:[],
        }


    }
    componentWillMount(){
        axios.get(`http://localhost:7777/api/getNotification`)
            .then((response) => {
                this.setState({notificationData:response.data});
            })
            .catch((e) =>
            {
                console.error(e);
                this.setState({success:'Alert: Something went wrong'});
            });
    }

  render() {
        let date = new Date();
      var timeStamp  = dateFormat(date, "dd-mm-yyyy");
      timeStamp  = new Date(timeStamp).getTime();
      const notification = (
            <div className="col-sm-12 NotificationDiv">
                <h3 className="NotificationHead">Important Notifications</h3>
                {
                    this.state.notificationData.map((item, index) =>(
                        <div key={index} className="col-sm-6">
                            <h5>Notice-{index+1}</h5>
                            <h5 className="subHeading">{item.timeStamp>timeStamp?item.heading:''}</h5>
                            <h5 className="subHeading">{item.timeStamp>timeStamp? "Test will be Conductod on: "+item.test_date:''}</h5>
                            <div className="contentClass" dangerouslySetInnerHTML={{ __html: item.timeStamp>timeStamp?item.details:''}}>
                            </div>
                        </div>
                    ))
                }

            </div>
        )
    return (
      <div className="App">

       <Navbar/>
          <div className='konnect-carousel carousel-image carousel-image-pagination carousel-image-arrows flexslider'>
              <ul className='slides'>

                  <li className='item'>
                      <div className='container'>
                          <div className='row pos-rel'>
                              <div className='col-sm-12 col-md-6 animate'>
                                  <h1 className='big fadeInDownBig animated'>Online and Class Room Training</h1>
                                  <p className='normal fadeInUpBig animated delay-point-five-s'>Lorem ipsum dolor sit
                                      amet, consectetur adipiscing elit. Mauris in tincidunt mauris. Etiam arcu enim,
                                      laoreet vitae orci vel, rutrum feugiat nibh. Integer feugiat ligula tellus, non
                                      pulvinar justo pharetra eu. Nullam vehicula lorem ut diam tincidunt sagittis.
                                      Morbi est ligula, posuere in laoreet ac, porta porttitor dui</p>
                                  <a className='btn btn-bordered btn-white btn-lg fadeInRightBig animated delay-one-s'
                                     href='#'> Show more </a></div>
                              <div className='col-md-6 animate pos-sta hidden-xs hidden-sm'><img
                                  className="img-responsive img-right fadeInUpBig animated delay-one-point-five-s"
                                  alt="iPhone" src="img/slider/student-1.png"/></div>
                          </div>
                      </div>
                  </li>


                  <li className='item'>
                      <div className='container'>
                          <div className='row pos-rel'>
                              <div className='col-md-6 animate pos-sta hidden-xs hidden-sm'><img
                                  className="img-responsive img-left fadeInUpBig animated" alt="Circle"
                                  src="img/slider/student-2.png"/></div>
                              <div className='col-sm-12 col-md-6 animate'>
                                  <h2 className='big fadeInUpBig animated delay-point-five-s'>Based on Bootstrap</h2>
                                  <p className='normal fadeInDownBig animated delay-one-s'>Lorem ipsum dolor sit amet,
                                      consectetur adipiscing elit. Mauris in tincidunt mauris. Etiam arcu enim, laoreet
                                      vitae orci vel, rutrum feugiat nibh. Integer feugiat ligula tellus, non pulvinar
                                      justo pharetra eu. Nullam vehicula lorem ut diam tincidunt sagittis. Morbi est
                                      ligula, posuere in laoreet ac, porta porttitor dui</p>
                                  <a className='btn btn-bordered btn-white btn-lg fadeInLeftBig animated delay-one-point-five-s'
                                     href='#'> Show more </a></div>
                          </div>
                      </div>
                  </li>


                  <li className='item'>
                      <div className='container'>
                          <div className='row pos-rel'>
                              <div className='col-sm-12 col-md-6 animate'>
                                  <h2 className='big fadeInLeftBig animated'>Clean and Flat</h2>
                                  <p className='normal fadeInRightBig animated delay-point-five-s'>Lorem ipsum dolor sit
                                      amet, consectetur adipiscing elit. Mauris in tincidunt mauris. Etiam arcu enim,
                                      laoreet vitae orci vel, rutrum feugiat nibh. Integer feugiat ligula tellus, non
                                      pulvinar justo pharetra eu. Nullam vehicula lorem ut diam tincidunt sagittis.
                                      Morbi est ligula, posuere in laoreet ac, porta porttitor dui</p>
                                  <a className='btn btn-bordered btn-white btn-lg fadeInUpBig animated delay-one-s'
                                     href='#'> Show more </a></div>
                              <div className='col-md-6 animate pos-sta hidden-xs hidden-sm'><img
                                  className="img-responsive img-right fadeInUpBig animated delay-one-point-five-s"
                                  alt="Man" src="img/slider/student-3.png"/></div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>

          <div className="container banner">
              {notification}
              <div className="row">
                  <div className="col-sm-4">
                      <div className="banner-bar"><img src="img/icons/classroom.png" alt="icon"/>
                          <h3><span>Experienced Trainers</span></h3>
                          <p>Answering learner questions in the discussion forums. Posting new threads to spark in-depth discussion.
                              Passing feedback to our staff.
                          </p>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="banner-bar"><img src="img/icons/certificate.png" alt="icon"/>
                          <h3><span>Certification</span></h3>
                          <p>
                              Learn how to innovate, cultivate an entrepreneurial mindset, and develop your business in this self-paced online Professional Certificate.
                          </p>
                      </div>
                  </div>
                  <div className="col-sm-4">
                      <div className="banner-bar"><img src="img/icons/job-support.png" alt="icon"/>
                          <h3><span>Job Support</span></h3>
                          <p>We provide job opportunity to our best students according to their qualification, certification and knowledge. Don't miss chance to get best job.</p>
                      </div>
                  </div>
              </div>
          </div>

          <section>
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">

                          <h2 className="section-heading">Who We Are?</h2>
                          <div className="template-space"></div>
                      </div>
                      <div className="col-md-6">
                          <h2 className="para-heading">About EduCourse Template.</h2>
                          <p>Curabitur ut est a mi fermentum tristique. Aliquam et ante odio. Donec elementum odio eget
                              ex porta, vel laoreet nisl fermentum. Nam risus purus, hendrerit id placerat sit amet,
                              tempor a urna. Maecenas id quam et dolor facilisis pulvinar.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                          <a className="service-box-button">View More</a></div>
                      <div className="col-md-6"><img src="img/students.jpg" className="img-responsive img-hide-sm"
                                                     alt="Company"/></div>
                  </div>
              </div>
          </section>


          <section className="light-bg">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <h2 className="section-heading">EduCourse Stats</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque erat, ultrices cursus
                              nisi at, hendrerit tristique.</p>
                          <div className="template-space"></div>
                      </div>
                      <div className="company-stats">
                          <div className="col-md-3 col-sm-6">
                              <div className="profile-box"><img src="img/icons/tool.png" alt="icon"/>
                                  <h4><span>500+</span> professionals trained</h4>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="profile-box"><img src="img/icons/expert.png" alt="icon"/>
                                  <h4><span>10+ Years</span> of Experience</h4>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="profile-box"><img src="img/icons/clients.png" alt="icon"/>
                                  <h4><span>15+</span> Companies Association</h4>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="profile-box"><img src="img/icons/success.png" alt="icon"/>
                                  <h4><span>99%</span> Job Guarantee</h4>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          <section className="template-news">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <h2 className="section-heading text-dark">Offering Courses</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque erat, ultrices cursus
                              nisi at, hendrerit tristique.</p>
                          <div className="template-space"></div>
                      </div>
                  </div>
                  <div className="row">

                      <div className="col-sm-4 article-box">
                          <article>
                              <div className="news-post">
                                  <div className="img-box"><span>$150</span><a href="#"><img src="img/news/news1.jpg"
                                                                                             alt="it's me Image"/></a>
                                  </div>
                                  <div className="post-content-text">
                                      <h4><span>Course One</span></h4>
                                      <h4><i className="fa fa-calendar-check-o" aria-hidden="true"></i> 3-4 Weeks</h4>
                                      <div className="post-more"><a href="single-course.html">Attend</a></div>
                                  </div>
                              </div>
                          </article>
                      </div>


                      <div className="col-sm-4 article-box">
                          <article>
                              <div className="news-post">
                                  <div className="img-box"><span>$110</span><a href="#"><img src="img/news/news2.jpg"
                                                                                             alt="it's me Image"/></a>
                                  </div>
                                  <div className="post-content-text">
                                      <h4><span>Course Two</span></h4>
                                      <h4><i className="fa fa-calendar-check-o" aria-hidden="true"></i> 3-4 Weeks</h4>
                                      <div className="post-more"><a href="single-course.html">Attend</a></div>
                                  </div>
                              </div>
                          </article>
                      </div>


                      <div className="col-sm-4 article-box">
                          <article>
                              <div className="news-post">
                                  <div className="img-box"><span>$90</span><a href="#"><img src="img/news/news3.jpg"
                                                                                            alt="it's me Image"/></a>
                                  </div>
                                  <div className="post-content-text">
                                      <h4><span>Course Three</span></h4>
                                      <h4><i className="fa fa-calendar-check-o" aria-hidden="true"></i> 4-5 Weeks</h4>
                                      <div className="post-more"><a href="single-course.html">Attend</a></div>
                                  </div>
                              </div>
                          </article>
                      </div>
                  </div>
              </div>
          </section>


          <aside className="dark-bg">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12 text-white">
                          <h2 className="section-heading text-white">Student Reviews</h2>
                          <div className="template-space"></div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-12" data-wow-delay="0.2s">
                          <div className="carousel slide" data-ride="carousel" id="quote-carousel">

                              <div className="carousel-inner text-center">

                                  <div className="item active">
                                      <blockquote>
                                          <div className="row">
                                              <div className="col-md-8 col-md-offset-2 col-xs-12">
                                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                      enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                      nulla pariatur. !</p>
                                                  <small>Someone Client</small>
                                              </div>
                                          </div>
                                      </blockquote>
                                  </div>


                                  <div className="item">
                                      <blockquote>
                                          <div className="row">
                                              <div className="col-md-8 col-md-offset-2 col-xs-12">
                                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                      enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                      nulla pariatur. </p>
                                                  <small>Someone Client</small>
                                              </div>
                                          </div>
                                      </blockquote>
                                  </div>


                                  <div className="item">
                                      <blockquote>
                                          <div className="row">
                                              <div className="col-md-8 col-md-offset-2 col-xs-12">
                                                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                                      enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                      reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                                      nulla pariatur. .</p>
                                                  <small>Someone Client</small>
                                              </div>
                                          </div>
                                      </blockquote>
                                  </div>
                              </div>


                              <a data-slide="prev" href="#quote-carousel" className="left carousel-control"><i
                                  className="fa fa-angle-left"></i></a> <a data-slide="next" href="#quote-carousel"
                                                                           className="right carousel-control"><i
                              className="fa fa-angle-right"></i></a>

                              <ol className="carousel-indicators">
                                  <li data-target="#quote-carousel" data-slide-to="0" className="active"></li>
                                  <li data-target="#quote-carousel" data-slide-to="1"></li>
                                  <li data-target="#quote-carousel" data-slide-to="2"></li>
                              </ol>
                          </div>
                      </div>
                  </div>
              </div>
          </aside>


          <section className="template-news">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <h2 className="section-heading text-dark">Gallery</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque erat, ultrices cursus
                              nisi at, hendrerit tristique.</p>
                          <div className="template-space"></div>
                      </div>
                  </div>
                  <div className="row">

                      <div className="col-sm-3 gallery-box"><a href="#" data-toggle="modal" data-target=".pop-up-1">
                          <img src="img/gallery/gallery-one.jpg" className="img-responsive center-block" alt=""/> </a>
                      </div>

                      <div className="col-sm-3 gallery-box"><a href="#" data-toggle="modal" data-target=".pop-up-2">
                          <img src="img/gallery/gallery-two.jpg" className="img-responsive center-block" alt=""/> </a>
                      </div>

                      <div className="col-sm-3 gallery-box"><a href="#" data-toggle="modal" data-target=".pop-up-3">
                          <img src="img/gallery/gallery-three.jpg" className="img-responsive center-block" alt=""/> </a>
                      </div>

                      <div className="col-sm-3 gallery-box"><a href="#" data-toggle="modal" data-target=".pop-up-4">
                          <img src="img/gallery/gallery-four.jpg" className="img-responsive center-block" alt=""/> </a>
                      </div>
                      <div className="col-md-12 text-center margin-10"><a className="service-box-button">View More
                          Gallery</a></div>


                      <div className="modal fade pop-up-1" tabIndex="-1" role="dialog" aria-hidden="true">
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-body">
                                      <button type="button" className="close" data-dismiss="modal"
                                              aria-hidden="true">×
                                      </button>
                                      <img src="img/gallery/gallery-one.jpg" className="img-responsive center-block"
                                           alt=""/></div>
                              </div>
                          </div>
                      </div>

                      <div className="modal fade pop-up-2" tabIndex="-1" role="dialog" aria-hidden="true">
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-body">
                                      <button type="button" className="close" data-dismiss="modal"
                                              aria-hidden="true">×
                                      </button>
                                      <img src="img/gallery/gallery-two.jpg" className="img-responsive center-block"
                                           alt=""/></div>
                              </div>
                          </div>
                      </div>

                      <div className="modal fade pop-up-3" tabIndex="-1" role="dialog" aria-hidden="true">
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-body">
                                      <button type="button" className="close" data-dismiss="modal"
                                              aria-hidden="true">×
                                      </button>
                                      <img src="img/gallery/gallery-three.jpg" className="img-responsive center-block"
                                           alt=""/></div>
                              </div>
                          </div>
                      </div>

                      <div className="modal fade pop-up-4" tabIndex="-1" role="dialog" aria-hidden="true">
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-body">
                                      <button type="button" className="close" data-dismiss="modal"
                                              aria-hidden="true">×
                                      </button>
                                      <img src="img/gallery/gallery-four.jpg" className="img-responsive center-block"
                                           alt=""/></div>
                              </div>
                          </div>
                      </div>


                  </div>

              </div>
          </section>
        <Footer/>
      </div>
    );
  }
}

export default Home;
