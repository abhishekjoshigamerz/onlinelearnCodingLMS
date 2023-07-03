const readXlsxFile = require('read-excel-file/node');
const async = require("async");

const Course = require('../../model/course'); 

const Topic = require('../../model/topics');

module.exports.addCourseForm = function(req, res){
    return res.render('addcourses', {
        title: "Add Course"
    });
}




module.exports.viewCourses = async function(req, res){

    try {
        const Courses = await Course.find({});
        console.log(Courses);
        return res.render('viewcourses', {
            title: "View Courses",
            courses: Courses
        });    
    } catch (error) {
        console.log(error);
    }

    
}




//delete course

module.exports.deleteCourse = async function (req,res){
    try {
        const Courses = await Course.findByIdAndDelete(req.params.id);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}
//get update course form

module.exports.editCourseForm = async function(req, res){
    let id = req.params.id;
    const course = await Course.findById(id);
    return res.render('editcoursesform', {
        title: "Edit Course",
        course: course
    });
}

//post course
module.exports.postCourse = async function(req,res){
   
    try{
        const course = new Course({
            name: req.body.courseTitle,
            description: req.body.courseDescription,
            image: req.file.filename,
            summary: req.body.courseSummary,
            price: req.body.coursePrice,
            language_code:req.body.courselanguageCode,
            primary_code:req.body.coursePrimaryCode
        });

        await course.save();
        console.log('Posted data');
        return res.redirect('back');
        
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}


//update course 

module.exports.updateCourse = async function(req, res) {
    try {
        let updatedCourse = {
            name: req.body.courseTitle,
            description: req.body.courseDescription,
            summary: req.body.courseSummary,
            price: req.body.coursePrice,
            language_code:req.body.courselanguageCode,
            primary_code:req.body.coursePrimaryCode
            
        };

        // If a new file has been uploaded, update the image field
        if (req.file) {
            updatedCourse.image = req.file.filename;
        }
        
        // Find the course by its ID and update it
        await Course.findByIdAndUpdate(req.body.courseId, updatedCourse);

        // Redirect the user back to the course view page
        return res.redirect('/admin/view-courses');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
};


//topics 

module.exports.addTopicsForm = async function(req, res){
    try {
        let courses = await Course.find({});  // Fetch courses from the database

        return res.render('addtopics', {
            title: "Add Topics",
            courses: courses  // Pass courses data to the view
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
    
    return res.render('addtopics', {
        title: "Add Topics"
    });
}


module.exports.viewTopics = async function(req, res){
    const getCourse = await Course.find({});
    console.log(getCourse);
    return res.render('viewtopics', {
        title: "View Topics",
        courses: getCourse
    });
}

//post topics 
module.exports.postTopics = async function(req, res){
    try {
        let topic = new Topic({
            name: req.body.topicName,
            courseId: req.body.courseId,
            description: req.body.topicDescription,
            isVideo: req.body.isVideo ? true : false,
            testCases: req.body.testCases ? req.body.testCases.split(',') : [],
            testInputs: req.body.testInputs ? req.body.testInputs.split(',') : []
        });

        // Save the Topic
        let savedTopic = await topic.save();

        // Add the topic to the Course's topics array
        let course = await Course.findById(req.body.courseId);
        course.topics.push(savedTopic._id);
        await course.save();

        res.redirect('/admin/view-topics');  // Redirect to home page after successful creation
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
}

module.exports.viewallTopics = async function(req, res){
    const Topics = await Topic.find({courseId: req.params.id});

    return res.render('viewalltopics', {
        title: "View All Topics",
        topics: Topics
    });
}


module.exports.deleteTopic = async function(req, res) {
    try {
        // Get the topicId from request parameters
        const topicId = req.params.id;

        // Find the topic first
        const topic = await Topic.findById(topicId);

        if(!topic){
            throw new Error('Topic not found');
        }

        // Find the course related to this topic
        const course = await Course.findById(topic.courseId);
        
        if(!course){
            throw new Error('Course not found');
        }

        // Remove the topic reference from the course's topics array
        const index = course.topics.indexOf(topicId);
        if(index > -1) {
            course.topics.splice(index, 1);
            await course.save();
        }

        // Delete the topic
        await Topic.findByIdAndDelete(topicId);

        // Redirect back or to another page after successful deletion
        res.redirect('/admin/view-topics');
    } catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

//edit topics form
module.exports.editTopicForm = async function(req, res){
    try {
        // Find the topic by its ID
        const topic = await Topic.findById(req.params.id);

        // Find all the courses
        const courses = await Course.find({});

        return res.render('edittopicsform', {
            title: "Edit Topic",
            topic: topic,
            courses: courses
        });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}

//edit topic post 
module.exports.updateTopic = async function(req, res) {
   
    const topicId = req.body.topicNumber;
    console.log(topicId);
    const { topicName, courseNumber, topicDescription, testCases, testInputs } = req.body;
    console.log('Line 231     ' + courseNumber);
    const oldTopic = await Topic.findById(topicId);
    const oldCourseId =  oldTopic.courseId;    

    // update the topic
    const topic = await Topic.findByIdAndUpdate(topicId, {
                    name: topicName,
                    courseId: courseNumber,
                    description: topicDescription,
                    testCases: testCases.split(','),
                    testInputs: testInputs.split(','),
                    isVideo: req.body.isVideo ? true : false
        });


    //now remove the topic from the old course's topic arrays 
    if(oldCourseId != courseNumber){
        console.log('should be added to the new course moron');
        const oldCourse = await Course.findByIdAndUpdate(oldCourseId, {
            $pull: { topics: topicId }
        }, { new: true });

        //now add the topic to the new course's topic arrays

        const newCourse = await Course.findByIdAndUpdate(courseNumber, {
            $push: { topics: topicId }
        }, { new: true });


    }else{
        console.log('Do nothing just chill moron!');
    }
    
        return res.redirect('/admin/view-topics');      
    
}


module.exports.importExcelData = async function(req, res){
    try{
        let courseRows = await readXlsxFile(req.file.path, { sheet: 'Courses' });
        let courseHeaders = courseRows.shift();
        
        for (let row of courseRows) {
            let courseObj = {};
            courseHeaders.forEach((header, index) => {
                courseObj[header] = row[index];
            });
            try {
                let course = await Course.findOne({ name: courseObj.name });
                if (!course) {
                    course = new Course(courseObj);
                    await course.save();
                }
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        }

        // read 'Topics' sheet
        let topicRows = await readXlsxFile(req.file.path, { sheet: 'Topics' });
        let topicHeaders = topicRows.shift();

        for (let row of topicRows) {
            let topicObj = {};
            topicHeaders.forEach((header, index) => {
                topicObj[header] = row[index];
            });
            try {
                let course = await Course.findOne({ name: topicObj.courseName });
                if (!course) {
                    console.log(`Course not found: ${topicObj.courseName}`);
                    continue;
                }
                topicObj.courseId = course._id;
                let topic = new Topic(topicObj);
                await topic.save();
                
                // Additional debugging: log the course object and topic object
                console.log(`Course: ${JSON.stringify(course)}`);
                console.log(`Topic: ${JSON.stringify(topic)}`);
                
                if(!course.topics) {
                    course.topics = [];
                }
                
                course.topics.push(topic._id);
                await course.save();
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        }
        return res.redirect('/admin/view-topics');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

