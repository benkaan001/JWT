// ****************** logic ==========> 
// IF we can get the userID and passoword,
// THEN we will create and send the JWT,
// ELSE we redirect the user to the login

const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async(req,res) => {
    const {username, password} = req.body
    //we have three options to validate the user
    // validate through db/mongoose
    // validate through npm package -> Joi
    // validate by checking the controller
    if(!username || !password){
        throw new CustomAPIError('Must provide email and password', 400);
    }
    // manually create an id, since we are not useing a DB to do that for us
    const id = new Date().getDate()
    // try to keep payload small for better user experience 
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn: '30d'})

    res.status(200).json({ msg: "user successfully created", token})




    res.send('Fake login/register/signup')
}

const dashboard = async(req,res) => {
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({message: `Hello, user!`,secret:` Here is your authorized data,
    your lucky number is ${luckyNumber}`});

}

module.exports = {login, dashboard}