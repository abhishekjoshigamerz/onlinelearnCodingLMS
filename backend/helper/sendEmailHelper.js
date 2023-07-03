require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports.sendVerificationEmail = async function(email,message){

    const msg = {
        to: email, // Change to your recipient
        from: 'abhishekjoshi9468@gmail.com',
        subject: 'Email Verification From learntocode',
        text: message,
    };

    try {
        let status = await sgMail.send(msg);
        if(status){
            console.log('email send');
            return true;
        }    
    } catch (error) {
        console.log(error);
    }
}


module.exports.forgotPassword = async function(email, message, subject){
    const msg = {
        to: email, // Change to your recipient
        from: 'abhishekjoshi9468@gmail.com',
        subject: 'Forgot your password from learntocode',
        text: message,
    };

    try {
        let status = await sgMail.send(msg);
        if(status){
            return true;
        }    
    }catch (error) {
        console.log(error);
    }
}