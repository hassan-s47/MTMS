const Login = require('../models/user');
const env = require('../config/env');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    try{
        
        const salt = await bcrypt.genSalt(10);
        const hasedpassword = await bcrypt.hash(req.body.password, salt);
        console.log(hasedpassword,salt);
        console.log(req.body);
        
        const login = new Login({
            email : req.body.email,
            password:hasedpassword,
            fname: req.body.fname,
            lname: req.body.lname,
            isSubscribed: false
        });

        login.save()
        .then(() => {
            console.log("User Registered Successfully!")
            res.redirect('/');
        })
        .catch(err => {console.log(err)});

    }
    catch(err) {
        console.error(err);
    }

}


const login = async (req, res) => {
    console.log('loginController');
    console.log(req.body);
    Login.findOne({email : req.body.email})
    .then(async result => {
        if(result == null)
         {
             
             res.json({msg: "Incorrect Email / Password", status: "failure"});
         }
        else
        {
         try{
           
            const flag =  bcrypt.compareSync(req.body.password,result.password) 
            
            if(flag)
                {
                    req.session.user = result._id;
                    req.session.fname = result.fname;
                    req.session.lname = result.lname;
                    req.session.email = result.email;
                    res.json({msg: "", status: "success"});
                }
            
            else{
                res.json({msg: "Incorrect Email / Password", status: "failure"});
            }


            }
            catch(err) {
                res.json({msg: "Server Not Responding", status: "failure"});
            }
        }
    })

}

module.exports = 
{
    register,
    login
}