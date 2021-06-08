const musicClass= require('../models/class')

const addClass=async (req, res) => {
    
    var classObj= new musicClass({
        teacher : req.session.user,
        className : req.body.className
    });
    classObj.save()
    .then((response)=>{
       res.redirect('/student');
    })
    .catch((err)=>{
        console.log(err)
    })

}
module.exports={
    addClass
}