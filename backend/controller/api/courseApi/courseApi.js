const courses = require('../../../model/course');
const topics = require('../../../model/topics');
const User = require('../../../model/user');

module.exports.courses = async function(req, res){
    try {
        const Courses = await courses.find({});
        console.log(Courses);
        return res.status(200).json({
            message: "Courses",
            courses: Courses
        });    
    } catch (error) {
        console.log(error);
    } 
}

module.exports.getcourse = async function(req, res){
    try {
        const id = req.params.id;
        console.log(id);
        const Course = await courses.findById(id).populate('topics');
        const Topics = await topics.find({courseId: id}).sort({ createdAt: 1 });
        return res.status(200).json({
            message: "Course",
            course: Course,
            topics: Topics    
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        });
    }
}

module.exports.getTopicContent = async function(req, res){
    try {
        const id = req.params.id;
        console.log(id);
        const Topic = await topics.findById(id);
        return res.status(200).json({
            message: "Topic",
            topic: Topic
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error
        });
    }

}

//mark as done 

module.exports.markAsComplete = async function(req, res) {
    console.log(req.body);
    const topicId = req.body.topicId;
    const courseId = req.body.courseId;
    const userEmail = req.body.email;

    console.log(`TopicId: ${topicId}`);
    console.log(`CourseId: ${courseId}`);

    if (!topicId || !courseId) {
        return res.status(400).json({
            message: "Missing topicId or courseId"
        });
    }

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        let topics = user.topicsDone.get(courseId) || [];

        if (!topics.includes(topicId)) {
            topics.push(topicId);
            user.topicsDone.set(courseId, topics);
            user.markModified('topicsDone');

            const result = await user.save();

            if (result) {
                return res.status(200).json({
                    message: "Topic marked as done",
                    topicId:topicId
                });
            }
        }else{
            return res.status(200).json({
                message: "Topic already marked as done",
                topicId:topicId
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

//get completed topics and return that to the user
module.exports.getCompletedTopics = async function(req, res) {

    let courseId = req.params.courseId;
    let userEmail = req.params.emailId;

    if (!courseId || !userEmail) {
        return res.status(400).json({
            message: "Missing courseId or userEmail"
        });
    }

    try {
        
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        let completedTopics = user.topicsDone.get(courseId) || [];

        return res.status(200).json({
            message: "Completed Topics",
            completedTopics: completedTopics
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}



 