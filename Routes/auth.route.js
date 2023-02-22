const express = require("express");
const createHttpError = require("http-errors");
const router = express.Router();
const User = require("../Modules/user.module");
const { authSchema} = require('../helpers/validation.schma');


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
       res.send(savedUser);

    } catch (error) {
        if(error.isJoi === true)error.status =422
       console.log(error);
    }
})

router.post('/login', async (req,res,next) => {
    res.send("Login Route");
})

router.post('/refresh-token', async (req,res,next) => {
    res.send("refresh token route");
})

router.delete('/logout', async (req,res,next) => {
    res.send("Logout Route");
})



module.exports = router