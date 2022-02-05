const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Login = require('../models/user');
const env = require('../config/env');

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hasedpassword = await bcrypt.hash(req.body.password, salt);
    console.log(hasedpassword, salt);
    console.log(req.body);

    const login = new Login({
      email: req.body.email,
      password: hasedpassword,
      fname: req.body.fname,
      lname: req.body.lname,
      isSubscribed: false,
    });

    login.save()
      .then(() => {
        console.log('User Registered Successfully!');
        res.redirect('/');
      })
      .catch((err) => { console.log(err); });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req, res) => {
  console.log('loginController');
  console.log(req.body);
  Login.findOne({ email: req.body.email })
    .then(async (result) => {
      if (result == null) {
        res.json({ msg: 'Incorrect Email / Password', status: 'failure' });
      } else {
        try {
          const flag = bcrypt.compareSync(req.body.password, result.password);

          if (flag) {
            req.session.user = result._id;
            req.session.fname = result.fname;
            req.session.lname = result.lname;
            req.session.email = result.email;
            res.json({ msg: '', status: 'success' });
          } else {
            res.json({ msg: 'Incorrect Email / Password', status: 'failure' });
          }
        } catch (err) {
          res.json({ msg: 'Server Not Responding', status: 'failure' });
        }
      }
    });
};

const sendPasswordChangeRequest = (req, res) => {
  Login.findOne({ email: req.body.email })
    .then(async (userExist) => {
      const userEmail = req.body.email;
      console.log(userExist._id);
      if (userExist) {
        link = `localhost:3000/create-new-password/${userExist._id}`;
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'abdullahaslammatrix@gmail.com', // email address
            pass: '4321Abdullah', // generated ethereal password
          },
        });
        // send mail with defined transport object
        const result = await transporter.sendMail({
          from: '"Abdullah Aslam 👻" <abdullahaslammatrix@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: 'MTMS Change Password', // ✔", // Subject line
          text: link, // plain text body
          html: `<a href='${link}'> Change Password </a>`, //  html: null, // ht ml body
        }).then((resutlt) => {
          console.log(resutlt);
          res.redirect('/');
        });
        return result;
      }

      console.log('User Not Exist');
    });
};

const createNewPassword = async (req, res) => {
  ifValidUser = await Login.findOne({ _id: req.params.id });
  if (ifValidUser) {
    res.render('createNewPassword', { userID: req.params.id });
  } else {
    console.log('UnAuthorized Access');
  }
};

const resetPassword = (req, res) => {
  if (req.body.newPassword === req.body.newPassword2) {
    isUpdated = Login.findByIdAndUpdate({ _id: req.body.userID }, { password: req.body.newPassword });
    if (isUpdated) {
      res.redirect('/');
    } else {
      console.log('Something went Wrong');
    }
  } else {
    console.log('Password Doesn\'t Match');
  }
};
module.exports = {
  register,
  login,
  sendPasswordChangeRequest,
  createNewPassword,
  resetPassword,
};
