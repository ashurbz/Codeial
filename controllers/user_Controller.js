// rendering sign up page
module.exports.create= (req,res)=>{
    return res.render('sign_up',{
        title:'SignUp'
    })
}

// rendering sign in page
module.exports.signIn = (req,res)=>{
    return res.render('sign_in',{
        title:'Sign In'
    });
}