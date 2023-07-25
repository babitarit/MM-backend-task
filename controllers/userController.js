//here we write all the logics like for registering the user
const User = require('../models/UserModel');
var mailer = require('../utils/Mailer');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');


//here we are going to create register user api
const registerUser = async (req, res,next) => {
try{
const {name, email, password} = req.body;
const userExists = await User.findOne({email});
if(userExists && userExists.active){
   return res.status(400).json({
        success: false,
        msg: 'User Already Exists'
    })
}
else if(userExists && !userExists.active){
    return res.status(400).json({
        success: false,
        msg: 'account created but need to activate. a link send with your registerd mobile no.'
    })
}

const user = new User({
    name,email,password
    });

//generate 20 bit activation code, crypto is build in package of node.js
crypto.randomBytes(20, async (err, buf) => {
    //ensure that activation link is unique
    user.activeToken = user._id + buf.toString('hex');
    //set the expire time of activation link as 24hr
    user.activeExpires = Date.now() + 24*60*60*1000;
    var link = process.env.NODE_ENV =='development' ? `http://localhost:${process.env.PORT}/api/users/activate/${user.activeToken}` : `${process.env.api_host}/api/users/activate/${user.activeToken}`;

    //send the activation link to the user
     mailer.send({
        to: req.body.email,
        subject: 'Account Activation Link',
        html: `Please click <a href = "' + link + '">here</a> to activate your account.`
    });
    //save user object
    user.save(
        function(err,user){
            if(err) return next(err);
                res.status(201).json({
                    success: true,
                    msg: 'the activation email has been sent to ' + user.email + '. It will be expire after one day.',
                });
            })
        }); 

}
catch(error){
    console.error(error);
    res.status(500).json({
        success: false,
        msg: 'Internal Server Error'
    });
}
};
