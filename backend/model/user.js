const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userRole:{ 
    type:Number,
    required:true,
    default:1,
  },
  email: {
    type: String,
    required: true
  },
  refreshToken:{
    type:String,
    default:'',
  },
  emailVerified:{
    type:Boolean,
    default:false,
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  topicsDone: {
    type: Map,
    of: [String]
  }
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
