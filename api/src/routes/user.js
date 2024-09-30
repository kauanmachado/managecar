const express = require('express')
const router = express.Router()
const user = require('../controllers/User/index')

router.post('/sign-up', user.SignUp)
router.post('/sign-in', user.SignIn)
router.get('/:id', user.Get)
router.post('/:id', user.Update)

module.exports = router