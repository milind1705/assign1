const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.signup = (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        return res.status(400).json("All fileds are mandetory");
    }
    User.findOne({email:email}).then((user) => {
        if(user){
            return res.status(400).json("user is already present")
        }
        //hash password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                const newUser = new User({username: username, email: email, password:hash})

                newUser
                    .save()
                    .then((user) => {
                        return res.status(200).json(user)
                    })
                    .catch((err) => {
                        return res.status(400).json("something went wrong")
                    })
            });
        });
    })
}

module.exports.login = (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('All fields are mandeory')
    }
    
    User.findOne({email: email}).then((user) => {
        if(!user){
            return res.status(400).json("user is not registered us")
        }
        //validation of password
        bcrypt.compare(password, user.password).then((isMatch) =>{
            if(!isMatch){
                return res.status(400).json("Incorect password")
            }
            //jwt sign
            jwt.sign({_id:user.id}, "process.env.JWT_KEY", {expiresIn:3600}, (err,token) =>{
                return res.status(200).json({
                    token,
                    user:{email: user.email, username: user.username}
                });
            } );
        });

    });
}