const User = require('../../model/user');
const Course = require('../../model/course');

//enroll in a course 

module.exports.enrollCourse = async function(req, res){

    let courseId = req.body.courseId;
    let email = req.body.email;
    try{
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({error: "Course not found"});
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        //check if user has already enrolled in the course 
        if(user.enrolledCourses.includes(courseId)){
            return res.status(200).json({error: "User already enrolled in the course"});
        }

        user.enrolledCourses.push(courseId);
        course.students.push(user._id);
        await user.save();
        await course.save();
        return res.status(204).json({message: "Course enrolled successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({error: error});
    }

}

//get enrolled courses data 

module.exports.getEnrolledCourses = async function(req, res){
    

}