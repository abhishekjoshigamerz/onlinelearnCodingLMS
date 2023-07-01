const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
    },
    description:{
        type: String,
        required: true,
        minlength:20,
    },
    image:{
        type: String,
        required: true,
    },
    summary:{
        type:String,
        required:true,
        minlength:50,
        default:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis feugiat congue. Integer nec odio vestibulum, aliquet ligula et, consequat nisl. Suspendisse potenti. Vivamus aliquet, diam at ullamcorper blandit, nulla nunc faucibus erat, id ullamcorper nunc nisl et diam. Fusce nec elementum dolor. Nulla at'       
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    language_code:{
        type:Number,
        required:true,
    },
    primary_code:{
        type:String,
        required:true,
    }    
},{
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;