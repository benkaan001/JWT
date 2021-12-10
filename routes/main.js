
const router = require('express').Router();
const {login,dashboard} = require('../controllers/main');
const isAuthenticated = require('../middleware/auth')

router.route('/dashboard').get(isAuthenticated,dashboard);
router.route('/login').post(login);

module.exports = router;



