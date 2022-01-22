const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const User = require("../Schema/userSchema");
const Info = require("../Schema/infoSchema");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class UserController {
  constructor() {
    console.log("UserController init");
  }

  signup(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Email and Password cann't be empty" });
    } else {
      User.find({ email }, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: err.message });
        } else {
          if (user.length !== 0) {
            return res.status(400).json({ msg: "Email already taken" });
          } else {
            User.find({ email: email }, (err, user) => {
              if (err) {
                return res.status(400).json({ msg: err.message });
              } else {
                if (user.length !== 0) {
                  return res
                    .status(400)
                    .json({ msg: "Email has already been taken" });
                } else {
                  bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                      return res
                        .status(400)
                        .json({ msg: "Password is not secure" });
                    } else {
                      const newUser = User({
                        _id: new mongoose.Types.ObjectId(),
                        email: email,
                        password: hash,
                      });
                      newUser
                        .save()
                        .then((result) => {
                          res.status(200).json({ msg: "SignUp successfull" });
                        })
                        .catch((err) => {
                          return res
                            .status(400)
                            .json({ msg: "Opps! Something went wrong" });
                        });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }

  signin(req, res) {
    console.log("SignIn api called");
    const { email, password } = req.body;
    User.find({ email: email }, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: err.message, logged: false });
      } else {
        if (user.length === 0) {
          return res.status(400).json({ msg: "User not found", logged: false });
        } else {
          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
              return res.status(400).json({ msg: err.message, logged: false });
            } else {
              if (result === false) {
                return res.status(400).json({
                  msg: "Email & Password did not matched",
                  logged: false,
                });
              } else {
                const token = jwt.sign(
                  {
                    _id: user[0]._id,
                    email: user[0].email,
                    created_at: user[0].created_at,
                  },
                  process.env.SECRET_KEY,
                  { expiresIn: "7d" }
                );
                res.status(200).json({
                  msg: "Successfully signIn",
                  token: token,
                  userId: user[0]._id,
                  logged: true,
                });
              }
            }
          });
        }
      }
    });
  }

  update(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      const file = req.files.photo;
      const { company_name, address, country, city, description, userID } =
        req.body;
      User.findById(req.params.id, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: err.message });
        } else {
          if (!user) {
            return res.status(400).json({ msg: "User not found" });
          } else {
            cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
              if (err) {
                return res.status(400).json({ msg: err.message });
              } else {
                if (!result) {
                  return res.status(400).json({ msg: "Logo cannot uploaded" });
                } else {
                  const newPost = Info({
                    _id: new mongoose.Types.ObjectId(),
                    company_name: company_name,
                    address: address,
                    country: country,
                    city: city,
                    description: description,
                    userID: req.params.id,
                    photo: result.url,
                  });
                  newPost
                    .save()
                    .then((result) => {
                      res.status(201).json({ msg: "Successfully created!" });
                    })
                    .catch((err) => {
                      res
                        .status(400)
                        .json({ msg: "Cannot save your image in database" });
                    });
                }
              }
            });
          }
        }
      });
    }
  }

  getPosts(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: "User not found" });
    } else {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: err.message });
        } else {
          Info.find({ userID: req.params.id }, (err, result) => {
            if (err) {
              return res.status(400).json({ msg: err.message });
            } else {
              res.status(200).json(result);
            }
          });
        }
      });
    }
  }

  getPost(req, res) {
    if (!req.params.id) {
      return res.status(400).json({ msg: "Post not found" });
    } else {
      Info.findById(req.params.id, (err, result) => {
        if (err || result === null) {
          return res.status(400).json({ msg: "Post not found" });
        } else {
          res.status(200).json({ result });
        }
      });
    }
  }

  loginWithGoogle(req, res) {
    const { email } = req.body;
    User.find({ email: email }, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      } else {
        if (user.length !== 0) {
          return res
            .status(200)
            .json({ msg: "Welcome back", userId: user._id });
        } else {
          bcrypt.hash(email + process.env.SECRET_KEY, 10, (err, hash) => {
            if (err) {
              return res.status(400).json({ msg: err.message });
            } else {
              const newUser = User({
                _id: new mongoose.Types.ObjectId(),
                email: email,
                password: hash,
              });
              newUser
                .save()
                .then((result) => {
                  return res.status(201).json({
                    msg: "Successfully signUp with GOOGLE",
                    userId: result._id,
                  });
                })
                .catch((err) => {
                  return res.status(400).json({ msg: "Google signUp failed" });
                });
            }
          });
        }
      }
    });
  }
}

module.exports = new UserController();
