// here we accept the email id where /in which email we want to send the activation link 


var _ = require('lodash');
const nodemailer = require('nodemailer');

var config ={
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'ayushmanj138@gmail.com',
        pass: 'ayush@123'
    }
};

var transporter = nodemailer.createTransport(config);
var defaultMail = {
    from: 'ayushmanj138@gmail.com',
    text: 'test test test',

}

const send  = (to, subject, html) => {
    //use default setting
    mail = _.merge({html}, defaultMail,to);
    transporter.sendMail(mail, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ', info.response);
    });
}

module.exports = {
    send
}
