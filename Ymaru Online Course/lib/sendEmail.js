
const e = require('express');
var nodemailer = require('nodemailer');

//send email
exports.sendingMail = (email, token)=> {
	
    var email = email;
    var token = token;
	
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sahilugetachew19@gmail.com', // Your email id
            pass: 'apzvobzmpnnymowy' // Your password emuatgmailgech@19
        }
    });
 
    var mailOptions = {
        from: 'sahilugetachew19@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        html: '<p>You requested for reset password, kindly use this' +  
			'<a href="http://localhost:5000/reset-password?token=' + token + '">' +
			' link</a> to reset your password</p>'
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error)
            console.log('reset link sent')       
		else 
			console.log ('Error: link not sent')			
    });
	
}
exports.contactMail =  (email, description)=> {
    var email = email;

    var description=description;
	
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sahilugetachew19@gmail.com', // Your email id
            pass: 'apzvobzmpnnymowy' // Your password
        }
    });
    var mailOptions = {
        from: 'sahilugetachew19@gmail.com',
        to: email,
        subject: 'Contacting YMARU Team',
        html: '<p>User says:'+description+' </p>'
    };
    mail.sendMail(mailOptions, function(error, info) {
        if (error)
            console.log('reset link sent')       
		else 
			console.log ('Error: link not sent')			
    });

}

exports.verifyMail =  (email,token)=> {
    var email = email;
    var token=token;
    console.log(email);

    
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sahilugetachew19@gmail.com', // Your email id
            pass: 'apzvobzmpnnymowy' // Your password
        }
    });
    var mailOptions = {
        from: 'sahilugetachew19@gmail.com',
        to: email,
        subject: 'Confirm email by logging in',
        html: '<p>Kindly use this' +  
			'<a href="http://localhost:5000/auth/login?token=' + token + '">' +
			' link</a> to login </p>'
    };
    mail.sendMail(mailOptions, function(error, info) {
         if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }			
    
});

}


