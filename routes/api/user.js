const express = require('express');
const router = express.Router();

const { testRoute, register } = require('../../controller/user');

router.route('/').get(testRoute);
router.route('/register').post(register);
module.exports = router;
