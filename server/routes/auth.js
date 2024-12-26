const express = require("express");
const passport = require('passport')

const passportServices = require('../services/passport.js')
const protectedRoute = passport.authenticate('local', {session: false})
const router = express.Router();

const AuthenticationController = require('../controllers/authentication_controller');

router.post('/', AuthenticationController.signup)
router.post('/signin', protectedRoute, AuthenticationController.signin)



module.exports = router;