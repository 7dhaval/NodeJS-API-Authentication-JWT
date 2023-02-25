const express = require("express");
const createHttpError = require("http-errors");
const router = express.Router();
const User = require("../Modules/user.module");
const { authSchema} = require('../helpers/validation.schma');
const { signAccessToken } = require('../helpers/jwt_helper');

router.use(express.json());
router.post('/register', async (req, res) => {
    try {
        // const email = req.body.email;
        // const password = req.body.password;
        // const { email, password } = req.body
        const result = await authSchema.validateAsync(req.body)

        // if(!email || !password) throw createHttpError.BadRequest();

       const doesExist =  await User.findOne({email : result.email});
       if (doesExist) throw createHttpError.Conflict(`${email} is already registered`);

       const user = new User (result);
       const savedUser = await user.save();
       const accessToken = await signAccessToken(savedUser.id)
       res.send({accessToken});

    } catch (error) {
        if(error.isJoi === true)error.status =422
       console.log(error);
    }
})

router.post('/login', async (req,res,next) => {
    try {
        const result = await authSchema.validateAsync(req.body)
        const user = await User.findOne({email: result.email})

        if(!user) throw createHttpError.NotFound("User not registered")

        const isMatch = await user.isValidPassword(result.password)
        if(!isMatch) throw createHttpError.Unauthorized("username/password not valid")
        const accessToken = await signAccessToken(user.id)

        res.send({accessToken})
    } catch (error) {
        if(error.isJoi === true)
         return next(createHttpError.BadRequest("Invalid Username/Password"))
        next(error)
    }
})

router.post('/refresh-token', async (req,res,next) => {
    res.send("refresh token route");
})

router.delete('/logout', async (req,res,next) => {
    res.send("Logout Route");
})



module.exports = router