const express = require('express');
const router = express.Router();

const { testRoute, register, getMyCredential, login } = require('../../controller/user');

const { protect } = require('../../middleware/auth');

router.route('/').get(testRoute);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMyCredential);
module.exports = router;
