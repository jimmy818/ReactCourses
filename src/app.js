import React, { Component } from 'react';
import  { BrowserRouter as Router,  Route, Redirect} from 'react-router-dom';
import Login from './components/login/login'
import Signup from "./components/signup/signup";
import Home from "./home";
import Dashboard from "./components/admin/dashboard/dashboard";
import AddCourseCategory from "./components/admin/CourseCategory/addCourseCategory";
import AddCourseSubCategory from "./components/admin/CourseCategory/addCourseSubCategory";
import AddCourse from "./components/admin/Course/addCourse";
import Courses from "./components/courses/courses";
import Course from "./components/course/course";
import ViewCourseCategory from "./components/admin/CourseCategory/viewCourseCat";
import UpdateCourseCategory from "./components/admin/CourseCategory/updateCourseCat";
import ViewCourse from "./components/admin/Course/viewCourse";
import UpdateCourse from "./components/admin/Course/update-course";
import AddTest from "./components/admin/test/addTest";
import UserDashboard from "./components/user/dashboard/dashboard";
import AddTopic from "./components/admin/syllabus/addTopic";
import ViewTopics from "./components/admin/syllabus/view-topics";
import UpdateTopic from "./components/admin/syllabus/update-topic";
import AddStudyMaterial from "./components/admin/StudyMaterial/add-study-material";
import AddNotification from "./components/admin/notification/add-notification";

class App extends Component {

    render() {

        const AdminRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                sessionStorage.getItem('userId') !== '' && sessionStorage.getItem('Role') ==='#%&^$@dm!N##@$#'
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        );
        const UserRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                sessionStorage.getItem('userId') !== '' && sessionStorage.getItem('Role') ==='user'
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />

        );

        return (
            <Router>
                <div>
                    <Route exact  path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/courses/:name" component={Courses}/>
                    <Route exact path="/courses/:name/:course" component={Course}/>
                    <AdminRoute exact  path="/dashboard" component={Dashboard}/>
                    <AdminRoute exact path="/add-course-category" component={AddCourseCategory}/>
                    <AdminRoute exact path="/add-course-sub-category" component={AddCourseSubCategory}/>
                    <AdminRoute exact path="/add-course" component={AddCourse}/>
                    <AdminRoute exact path="/view-course-category" component={ViewCourseCategory}/>
                    <AdminRoute exact path="/update-course-category/:category" component={UpdateCourseCategory}/>
                    <AdminRoute exact path="/view-course" component={ViewCourse}/>
                    <AdminRoute exact path="/update-course/:title" component={UpdateCourse}/>
                    <AdminRoute exact path="/add-test" component={AddTest}/>
                    <AdminRoute exact path="/add-topic" component={AddTopic}/>
                    <AdminRoute exact path="/view-topics" component={ViewTopics}/>
                    <AdminRoute exact path="/update-topic/:topic" component={UpdateTopic}/>
                    <AdminRoute exact path="/add-study-material" component={AddStudyMaterial}/>
                    <AdminRoute exact path="/add-notification" component={AddNotification}/>
                    <UserRoute exact path="/user-dashboard" component={UserDashboard}/>

                </div>
            </Router>
        );
    }
}

export default App;