var express = require("express");
var path = require("path");
var mongo = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var db = require("./config.js");
var bcrypt = require('bcryptjs');
var saltRounds = 10;
var app = express();
var port = process.env.port || 7777;
var dateFormat = require('dateformat');
var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));
let multer = require('multer');
var mongoose = require('mongoose');


////////////////////////      Models Starts Here       //////////////////////////

//user schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String   },
    email: { type: String   },
    pass: { type: String },
    role: { type: String },
    registration: { type: String },
    fees_paid: { type: String },
    category: { type: String },
    course: { type: String },
},{ versionKey: false });


//Users Schema
var model = mongoose.model('users', UserSchema, 'users');



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


//Category Schema
var CoursesCategorySchema = new Schema({
    category: {type: String},
    url: {type: String},
},{versionKey: false});

var categoryModel = mongoose.model('courses_category', CoursesCategorySchema, 'courses_category');


//Sub-category Schema
var CoursesSubCategorySchema = new Schema({
    category: { type: String   },
    sub_category: { type: String   },
    url: { type: String },
},{ versionKey: false });


//Course Schema
var CourseSchema  = new Schema({
    category_id:{type: String},
    title:{type: String},
    fees:{type: String},
    language:{type: String},
    detail:{type: String},
    url: { type: String},
},{versionKey:false});

var courseModel = mongoose.model('courses', CourseSchema , 'courses');

//Test Schema
var TestSchema = new Schema({
    category: {type: String},
    course: {type: String},
    file: {type: String},
    created_date:{type:String},
    created_time:{type:String},
    test_time:{type:String},
    start_time:{type:String},
    url: { type: String },
},{versionKey:false});

var testModel = mongoose.model('test', TestSchema, 'test');


//Syllabus Schema
var SyllabusSchema = new Schema({
    category:{type: String},
    course:{type: String},
    topic_title:{type: String},
    completion_time:{type: String},
    time_per_week:{type: String},
    subtitle_language:{type: String},
    about_topic:{type: String},
    url:{type: String},
    course_url:{type: String},
},{versionKey:false});

var syllabusModel = mongoose.model('syllabus', SyllabusSchema, 'syllabus');


//Material Schema
var MaterialSchema = new Schema({
    topic_title:{type: String},
    course:{type: String},
    week_number:{type: String},
    learning_file_title:{type: String},
    learning_file_type:{type: String},
    learning_file:{type: String},
},{versionKey:false});

var materialModel = mongoose.model('learning_marterial', MaterialSchema, 'learning_material');



///Notification Schema and Model
var NotificationSchema = new Schema({
    heading:{type:String},
    details:{type:String},
    test_date:{type:String},
    timeStamp:{type:String},
},{versionKey:false});

var notificationModel = mongoose.model('test_notification', NotificationSchema, 'test_notification');


//Attempt Test Schema
var AttemptTestSchema = new Schema({
    test_id:{type:String},
    user_id:{type:String},
    attempt:{type:String},
    submit:{type:String},
    start_time:{type:String},
    end_time:{type:String},
    answer_file:{type:String},
}, {versionKey:false});
var attemptTestModel = mongoose.model('attempt_test', AttemptTestSchema, 'attempt_test');

//////////////////////      Models End Here       //////////////////////////


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


//api for Register User into Database
app.post("/api/RegisterUser",function(req,res){
    var mod = new model(req.body);
    // var salt = bcrypt.genSaltSync(saltRounds);
    // var password = bcrypt.hashSync(mod.pass, salt);
    var bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.pass, salt, function(err, hash) {
            mod.pass=hash;
            mod.cpass='';
            mod.role='user';
            mod.registration='0';
            mod.fees_paid='0';
            mod.course='';
            var Uname = mod.username;
            var Em = mod.email;
            model.find({ 'username': Uname,'email':Em }, function(err, user) {
                if (err) {
                    res.send('Signup error');
                    // return done(err);
                }
                //if user found.
                if (user.length!=0) {
                    if(user[0].username){
                        res.send('Username already exists, username: ' + Uname);
                    }else{
                        res.send('EMAIL already exists, email: ' + Em);
                    }
                }
                else
                {

                    mod.save(function(err,data){
                        if(err){
                            res.send(err);
                        }
                        else{
                            res.send("User Has been registered!!");
                        }
                    });
                }
            });
        });
    });

});
//Login User
app.post("/api/Login",function(req,res){
    var mod = new model(req.body);
    var Em = mod.email;
    var pass = mod.pass;
    var result = '';
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(pass, salt);
    // res.send(pswrd);
    model.find({ 'email':Em }, function(err, user) {
        if (err) {
            res.send('Signup error');
            // return done(err);
        }
        else{
            // console.log(user)
        }
        const UserData = user[0];
        //if user found.

        if (user.length!=0) {
            bcrypt.compare(req.body.pass, UserData.pass, function(err , result) {
                if (err){
                    console.log(err);
                }
                if (result){
                    res.send({"success":"true", "userId":UserData._id,"role":UserData.role,"username":UserData.username});
                }
                else {

                    res.send({"success": "false", "message": "passwords do not match"});
                }
            });
        }
        else
        {
            res.send('Incorrect login credentials');
        }
    });



});

//api to add Course Category
app.post("/api/addCourseCategory",function(req,res){
    var catMod = new categoryModel(req.body);
    catMod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});

//api to update Course Category
app.post("/api/updateCourseCategory",function(req,res){
    categoryModel.find({"category": req.body.catOrg},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            var id = user[0]._id;
            categoryModel.collection.update({_id:id}, {$set: {category:req.body.category,url:req.body.url}},  function(err,doc) {
                if (err) { throw err; }
                else { res.send('Success'); }
            });
        }
    });

});


//Delete Category
app.post("/api/updateCourseCategory",function(req,res){

    categoryModel.deleteOne({
        category: req.body.category
    }, function(err, results) {
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});



//api for Add Course Sub Category

var subCategoryModel = mongoose.model('courses_sub_category', CoursesSubCategorySchema, 'courses_sub_category');

app.post("/api/addCourseSubCategory",function(req,res){
    var ScatMod= new subCategoryModel(req.body);
    ScatMod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});

//api for get Category from database
app.get("/api/getCategory",function(req,res){
    categoryModel.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

//api for get Sub Category from database
app.get("/api/getCourse/title/:title",function(req,res){
    var title = req.params.title;
    courseModel.find({"category_id": title},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
});
//API CourseData
app.get("/api/getTestData/:course",function(req,res){
    var course = req.params.course;
    testModel.find({"course": course},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
});


//Add Course
app.post("/api/addCourse",function(req,res){
    var courseMod= new courseModel(req.body);
    // res.send(req.body);
    courseMod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});


//api for get Sub Category into route from database
app.get("/api/courses/name/:name",function(req,res){
    var name = req.params.name;
    categoryModel.find({"url": name},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            var catId = user[0].category;
            courseModel.find({"category_id": catId},{}, function(err, result) {
                if(err){
                    res.send(err);
                }
                else{
                    res.send(result);
                }
            });

        }
    });
});




//api to get course
app.get("/api/course/:course",function(req,res){
    var course = req.params.course;
    // res.send(course);
    courseModel.find({"url": course},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);

        }
    });
});

//api for Delete data from database
app.post("/api/deleteCourseCategory",function(req,res){
    categoryModel.deleteOne({_id: req.body._id}, function(err, results) {
        res.send("Success");
    });

});


//api for get Course Data from database
app.get("/api/getCourses",function(req,res){
    courseModel.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});
//user details
app.get("/api/getUser/:uid",function(req,res) {
    var uid = req.params.uid;
    model.find({'_id': uid}, function (err, user) {
        if (err) {
            res.send('User not found');
            // return done(err);
        }
        //if user found.
        else {
            res.send(user);
            // console.log(user);
        }
    });

});
//Update Course Data
app.post("/api/updateCourse",function(req,res){
    courseModel.findOneAndUpdate({title: req.body.OrgCourse}, {$set:{title:req.body.title, fees:req.body.fees, language:req.body.language,detail:req.body.detail}}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        else{
            res.send("Success");
        }

    });
});

//api for Delete Course data from database
app.post("/api/deleteCourse",function(req,res){
    courseModel.deleteOne({_id: req.body._id}, function(err, results) {
        res.send("Success");
    });

});


//Upload Test

var TestFilename='';
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads/')
    },
    filename: function(req, file, callback) {
        // console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        TestFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    }
});

//Add test aPi
app.post('/api/uploadTest', function(req, res, next) {
    var upload = multer({
        storage: storage,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('Test')
    upload(req, res, function(err) {
        // var now = dateFormat(new Date(),"dd/mm/yy h:MM TT");
        var times = dateFormat(new Date(), "UTC:HH:MM:ss");
        var dates = dateFormat(new Date(), "dd-mm-yyyy");
        var testMod= new testModel({category:req.body.category,course:req.body.course,created_date:dates,created_time:times,start_time:req.body.start_time,test_time:req.body.test_time,file:TestFilename});
        testMod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send("Success");
            }
        });
    })

});


//api Add Topic
app.post("/api/addTopic",function(req,res){
    var topicMod = new syllabusModel(req.body);
    topicMod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});

//get Topic Data
app.get("/api/topicData",function(req,res){
    syllabusModel.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});
// get Topic By name
app.get("/api/getTopic/:topic",function(req,res){
    var title = req.params.topic;
    syllabusModel.find({"url": title},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
});
// get Topic By course
app.get("/api/getTopicCourse/:course",function(req,res){
    var title = req.params.course;
    syllabusModel.find({"course": title},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
});

//Update Topic Data
app.post("/api/updateTopic",function(req,res){
    syllabusModel.findOneAndUpdate({_id: req.body._id}, {$set:{category:req.body.category,
            course:req.body.course, topic_title:req.body.topic_title, completion_time:req.body.completion_time,
            time_per_week:req.body.time_per_week, subtitle_language:req.body.subtitle_language, url:req.body.url,
            about_topic:req.body.about_topic}}, {new: true}, function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        else{
            res.send("Success");
        }

    });
});

//Add Study Material
app.post("/api/addStudyMaterial",function(req,res){
    var topicMat = new materialModel(req.body);
    topicMat.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});

//api get all topic data
app.get("/api/getTopic",function(req,res){
    syllabusModel.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});


//Add Study Material

var StudyFilename='';
var pathName = __dirname+'/public/img/study/';
var storages = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads/learning')
    },
    filename: function(req, file, callback) {
        // console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        StudyFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    }

});
app.post('/api/addStudyMaterialFiles', function(req, res, next) {
    var upload = multer({
        storage: storages,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.mp4' && ext !== '.3gp' && ext !== '.mpeg' && ext !== '.avi' && ext !== '.flv' && ext !== '.ppt'
                && ext !== '.pdf' && ext !== '.docx') {
                return callback(res.send('Only Files are allowed'), null)
            }
            callback(null, true)
        }

    }).single('Learning');
    upload(req, res, function(err) {
        var materialMod= new materialModel({
            topic_title:req.body.topic_title,
            week_number:req.body.week_number,
            learning_file_title:req.body.learning_file_title,
            learning_file_type:req.body.learning_file_type,course:req.body.course,
            learning_file:'/uploads/learning/'+StudyFilename
        });
        materialMod.save(function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.send('Success');
            }
        });

    })
});

//get topic by using course URL
app.get("/api/syllabus/:courseUrl",function(req,res){
    var courseURL = req.params.courseUrl;
    syllabusModel.find({"course_url": courseURL},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
});

//Get Material Data
app.get("/api/getMaterial",function(req,res){
    materialModel.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});



//Add Notification
app.post("/api/addNotification",function(req,res){
    var notMod = new notificationModel(req.body);
    notMod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});
//Get Notification
app.get("/api/getNotification",function(req,res){
    notificationModel.find({},function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

//api to add Test Attempt Data
app.post("/api/AttemptTest",function(req,res){
    var  attemptMod = new attemptTestModel(req.body);
    attemptMod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send("Success");
        }
    });
});

//User Attempt Data
app.get("/api/getUserAttempt/:uid",function(req,res){
    var uid = req.params.uid;
    attemptTestModel.find({"user_id": uid},{}, function(err, user) {
        if(err){
            res.send(err);
        }
        else{
            res.send(user);
        }
    });
});

//upload Answer
var StudyFilename='';
var storages = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads/answer')
    },
    filename: function(req, file, callback) {
        // console.log(file)
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        StudyFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    }

});
app.post('/api/uploadAnswer', function(req, res, next) {
    var upload = multer({
        storage: storages,
        fileFilter: function(req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.pdf' && ext !== '.docx') {
                return callback(res.send('Only Files are allowed'), null)
            }
            callback(null, true)
        }

    }).single('answer');
    upload(req, res, function(err) {
                attemptTestModel.collection.update({user_id:req.body.user_id,test_id:req.body.test_id}, {$set: {submit:'true',answer_file:'/uploads/answer/'+StudyFilename}},  function(err,doc) {
                    if (err) { throw err; }
                    else { res.send('Success'); }
                });
        });


    });



//call by default index.html page
app.get("*",function(req,res){
    res.sendFile(srcpath +'/index.html');
});

// app.use( express.static( `${__dirname}/../build` ) );

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'build/index.html'));
// });

//server stat on given port
app.listen(port,function(){
    console.log("server start on port"+ port);
});