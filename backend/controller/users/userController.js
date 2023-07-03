const User = require('../../model/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendVerificationEmail, forgotPassword } = require('../../helper/sendEmailHelper');


module.exports.registerUser = async function(req, res){
    console.log(req.body);
    
    try{
        const userExist = await User.findOne({email: req.body.email});
      console.log(userExist);
        if(userExist){
            return res.status(400).json({error: "Email already exists"});
        }
        else{
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(req.body.password, salt);
            console.log(salt);
            const user = new User({
                fullname: req.body.fullName,
                email: req.body.email,
                userRole:1,
                password: hash,
                topicsDone: new Map()
            });
            
            let data = await user.save();
            if(data){
                let msg = `Please verify your email by clicking on the link below \n https://www.codemaster99.xyz/users/verify-email/${user._id}`;
                await sendVerificationEmail(req.body.email, msg);
                
                return res.status(200).json({status:200,message: "User registered successfully"});
            }
            
            
        }
    }catch(err){
        console.log(err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
    }
      // Request is coming from an API
      
    
   
        
module.exports.showUsers = async function(req, res){
    const usersdata = await User.find({userRole:1});
    return res.render('viewusers', {
        title: "Users",
        users: usersdata
    });
    
}
    

module.exports.deleteUserByAdmin = async function(req, res){
    console.log(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}



module.exports.loginUser = async function(req, res){

    try{
        const {email,password} = req.body;
        const user = await User.findOne({email: email});



        if(!user){
            return res.status(400).json({error: "Invalid Username or password "});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid Username or password "});
        }

        const accessToken = await jwt.sign({userId: user._id} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = await jwt.sign({userId: user._id} , process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        console.log(user._id);

        let userRole = user.userRole;
       
        let id = user._id.toString();
        let emailVerified = user.emailVerified;
        const updatedUser = await User.findByIdAndUpdate(id, { refreshToken: refreshToken }, { new: true });
        if(updatedUser){
            res.cookie('jwt',refreshToken,{httpOnly:true,maxAge: 24*60*60*1000});
            return res.status(200).json({accessToken,refreshToken,email,userRole,id,emailVerified});
        }else{
            return res.status(400).json({error: "We are facing some error here"});
        }
        

    }catch(error){
        res.status(500).json({error: "Server Error" + error});
    }

}

module.exports.logoutUser = async function(req, res){
    //on client also delete the access token on front end side

    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.status(204);
    }

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});

    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.status(204);
    }

    //delete refresh token in database 

    const updateUsers = await User.findByIdAndUpdate(foundUser._id, { refreshToken: null }, { new: true });
    if(updateUsers){
        res.clearCookie('jwt',{httpOnly:true});
        return res.status(204).json({message: "Logout Successfull"});
    }else{
        return res.status(401).json({error: "We are facing some error here"});
    }
}


//
module.exports.getUserById = async function(req, res){
    let id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    if(user){
        return res.json(user);
    }else{
        return res.json({error: "User not found"});
    }
}


module.exports.changePassword = async function(req, res) {
    const email = req.body.email;
    const newPassword = req.body.password;
    console.log(req.body); 
   
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(newPassword, salt);
    
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: hash } },
        { new: true, useFindAndModify: false }
      );
  
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
  
      console.log('Password changed successfully');
      return res.status(204).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log(error); 
      return res.status(500).json({ error: error });
    }
  }


module.exports.sendPasswordChangeEmail = async function(req, res){
    console.log(req.body);    
    
    let email = req.body.email;

    //write find user by email
    // const cryptoRandomString = await import('crypto-random-string');
    // const randomPassword = cryptoRandomString({length: 10, type: 'base64'});
    const importCryptoRandomString = await import('crypto-random-string');
    const cryptoRandomString = importCryptoRandomString.default;
    const randomPassword = cryptoRandomString({length: 10, type: 'base64'});
    // Hash the new password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, 
      { password: hashedPassword }, 
      { new: true } // This option returns the modified document rather than the original
    );

     if (!updatedUser) {
      console.log('User not found');
      return;
    }    


   //send email to user/
    console.log('Password generated is ' + randomPassword); 
    console.log(hashedPassword);

    let message = `Your new password is ${randomPassword} . Please login with this password and change your password.`;

    await forgotPassword(email, message,'Password Change Request . New Password Send');


    return res.status(200).json({message: "Email sent successfully"});

}


  //user verification 

    module.exports.verifyEmail = async function(req, res){
        console.log(req.params.token);
        let id = req.params.token;
        const user = await User.findById(id);
        if(user){
            console.log(user);
            user.emailVerified = true;
            await user.save();
            return res.status(204).json({message: "User verified successfully"});
        }else{
            return res.json({error: "User not found"});
        }
    }

//get user by email

module.exports.getUserByEmail = async function(req, res){
    let email = req.params.email;

    //find user by email
    // const record = await User.findOne({email: email});
    const record = await User.findOne({ email: email }).populate('enrolledCourses');


    if(record){
       
        
        return res.status(200).json(record);
    }else{
        return res.status(404).json({error: "User not found"});
    }

}

//send email to the user 

module.exports.sendVerificationEmail = async function(req, res){
    let id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    
    if(!user){
        return res.status(404).json({error: "User not found"});
    }
    
    let msg = `Please verify your email by clicking on the link below \n http://localhost:3000/users/verify-email/${user._id}`;
    await sendVerificationEmail(user.email, msg);
    return res.status(200).json({message: "Email sent successfully"});

}