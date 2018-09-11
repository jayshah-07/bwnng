const User = require('../models/user');
const {normalizeErrors} = require("../helpers/mongoose");
const config = require('../config/dev');

const jwt = require('jsonwebtoken');

exports.auth = (req,res) => {

    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).send({
            errors:[{ title: "Data missing", details:"Please provide valid email & password"}]
        });
    }

    User.findOne({email}, (err, user) => {
        if(err){
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }

        if(!user){
            return res.status(422).send({
                errors: [{title:"Invalid user", details:"User doesn't exist"}]
            });
        }

        if(user.hasSamePassword(password)){
            // return JWT Token
            const token = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, {expiresIn: '1h'});

            return res.json(token);
        }else{
            return res.status(422).send({
                errors: [{title:"Incorrect data", details:"Wrong email and password combination"}]
            });
        }
    });
}

exports.register = (req,res) => {
    const {username, email, password, confirmPassword } = req.body;

    if(!password || !email){
        return res.status(200).send({
            errors: [{ title: "Data missing",
            details: "Please provide valid email and password"
        }]});
    }

    if(password !== confirmPassword){
        return res.status(422).send({
            errors:[{
                title:"Invalid password",
                details: "password is not same as confirm password."
            }]
        });
    }

    User.findOne({email}, (err, existingUser) => {
        if(err){
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }

        if(existingUser) {
            return res.status(422).send({
                errors:[{
                    title:"Already in use",
                    details: "This email already exists in our database."
                }]
            });
        }

        const user = new User({
            username,
            email,
            password
        });
        user.save(function(err){
            if(err){
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                });
            }

            res.json({"registered": true})
        });
    });
    // res.json({
    //     username,email
    // })
}

exports.authMiddleware = function(req, res, next){
const token = req.headers.authorization;

    if(token){
        const user = parseToken(token);
        User.findById(user.userId, function (err, user){
            if(err){
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                });
            }
            if(user){
                res.locals.user = user;
                next();
            }else{
                return notAutorized(res);
            }
        });
    }else{
        return notAutorized(res);
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAutorized(res){
    res.status(401).send({
        errors: [{
            title:"Not authorized!",
            details:"Please login to get access"
        }]
    });
}