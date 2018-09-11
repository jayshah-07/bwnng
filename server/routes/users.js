const expess = require('express');
const router = expess.Router();
const User = require('../controllers/user');

router.post('/auth', User.auth)

router.post('/register', User.register)

module.exports = router;