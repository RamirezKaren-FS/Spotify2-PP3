const express = require("express");

const passport = require('passport')
const passportServices = require('../services/passport.js')
const protectedRoute = passport.authenticate('jwt', {session: false})
const router = express.Router();
const User = require('../models/users.js');

const getUser = async (req, res, next) => {
    let user 
    try {
        user = await User.findById(req.params.id)
        if(user === null){
            return res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.user = user;
    next();
}


router.get('/', protectedRoute, async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})

router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

router.patch('/:id', getUser, async (req, res) => {
    if(req.body.email != null){
        req.user.email = req.body.email
    }
    if(req.body.password != null){
        req.user.password = req.body.password
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({message: "User Removed"})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})
module.exports = router;