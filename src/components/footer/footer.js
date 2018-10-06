import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <aside className="theme-bg aside-cta">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col-sm-6 col-xs-12 text-white">
                                <h3 className="margin-10 text-white">Do you really like our community ?</h3>
                            </div>
                            <div className="col-sm-6 col-xs-12 text-center text-white purchase-button"><a
                                href="/signup" className="template-button"><i className="fa fa-star"
                                                                                         aria-hidden="true"></i> Join Now</a></div>
                        </div>
                    </div>
                </aside>

                <section className="main-footer">
                    <div className="container">
                        <div className="row">

                            <div className="col-md-4 col-sm-6">
                                <div className="footer-widget"><img src="img/logo-green.png" alt=""
                                                                    className="img-responsive logo-change"/>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa consectetur
                                        assumenda est unde animi. Repellat quibusdam et ad aut molestias, facere maxime
                                        expedita aperiam sint.</p>
                                    <span><a href="#" className="read-more">Read more</a></span></div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                                <div className="footer-widget address">
                                    <h3>Contact</h3>
                                    <p><i className="fa fa-address-card-o" aria-hidden="true"></i> <span>#Koramangala, Banglore <br/>
            Karnataka, INDIA</span></p>
                                    <p><i className="fa fa-envelope-o" aria-hidden="true"></i>
                                        <span>youremail@yourdomain.com</span></p>
                                    <p><i className="fa fa-volume-control-phone" aria-hidden="true"></i> <span>+88 (0) 101 0000 000 <br/>
            +88 (0) 202 0000 001</span></p>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-6">
                                <div className="footer-widget quicl-links">
                                    <h3>Quick Links</h3>
                                    <ul>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Online Classes</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Class Room Classes</a>
                                        </li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Events</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">About Us</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Contact Us</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Faq</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Login</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Sign Up</a></li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Terms And Conditions</a>
                                        </li>
                                        <li><i className="fa  fa-angle-right"></i> <a href="#">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <footer>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 text-left">


                                <div className="contact-social">
                                    <p><a href="#"> <i className="fa fa-twitter"></i> </a> <a href="#"> <i
                                        className="fa fa-facebook"></i> </a> <a href="#"> <i
                                        className="fa fa-google-plus"></i> </a> <a href="#"> <i
                                        className="fa fa-rss"></i> </a> <a href="#"> <i className="fa fa-instagram"></i>
                                    </a></p>
                                </div>
                            </div>


                            <div className="col-md-6 col-sm-6 text-right">
                                <p> &copy; Copyright 2017 Konnect plugins </p>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

export default Footer;

