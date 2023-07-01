const User = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports.admin = function(req, res){
    return res.render('dashboard', {
        title: "Admin"
    });

}   




//for admin logout
module.exports.adminLogout = function(req, res){
    req.session.user = '';
    req.session.isLoggedIn = false;
    // req.flash('success','Successfully logged out!');

    return res.redirect('/');
}

//for admin login create session after successful validation
module.exports.adminLoginSession = async function(req, res){
    let password = req.body.password;
    let email = req.body.email;
    console.log(email);
    console.log(password);

    const user = await User.findOne({email:email});
   
    if(!user){
        // req.flash('error','Invalid Email or Password');
        return res.redirect('/');
    }

    let result = await bcrypt.compare(password, user.password);
    if(!result){
        // req.flash('error','Invalid Email or Password');
        return res.redirect('/');
    }

    req.session.isLoggedIn = true;
    req.session.user = user;

    return res.redirect('/admin');
}

module.exports.viewUserByAdmin = async function(req, res){

    //get user id from url
    let id = req.params.id;

    //now find the user by id and course data as well. 

    let user = await User.findById(id).populate('enrolledCourses');
    if(user){
        return res.render('viewuserdetailsbyadmin',{
            title: "User",
            user: user
        });
    }else{
        // req.flash('error','User not found!');
        return res.redirect('/admin/view-users');
    }

}
