const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.user_signup = (req, res) => { //function
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                // check if the array is not empty
                return res.status(409).json({
                    message: "Email already exists",
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });
                user
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(201).json({
                            message: "User created",
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            error: err,
                        });
                    });
        }
    });
};

exports.user_login = (req, res) => {
    User.find({email: req.body.email})
    .exec()
    .then((user) => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Auth failed",
            })
        }
        if(req.body.password != user[0].password) {
            return res.status(401).json({
                message: "Auth failed",
            })
        } else {
            const token = jwt.sign({
                //payload
                email: user[0].email,
                userId: user[0]._id,
            },
            //secret key
            process.env.JWT_KEY,
            {
                expiresIn: "1h",
            }
            );
            return res.status(200).json({
                message: "Auth successful!",
                token: token,
                email: user[0].email,
                userId: user[0]._id,
            });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
};

exports.users_get_all = (req, res) => {
    User.find()
    .select("name email password _id")
    .exec()
    .then((docs) => {
        const response = {
            count: docs.length,
            Users: docs.map((doc => {
                return {
                  name: doc.name,
                  email: doc.email,
                  password: doc.password,
                  _id: doc._id,
                }
              }))
            }
            res.status(200).json(response);
          }) //end of then
         .catch((err) => {
             console.log(err);
             res.status(500).json({
                 error: err
        });
    }); 
};