const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Test Route
// @route   GET /api/users/test
// @acess   Public
exports.testRoute = asyncHandler(async (req, res, next) => {
	res.status(200).json({ success: true });
});

// @desc    Register user
// @route   POST /api/users/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
	const { email, firstName, lastName, username, gender, dateOfBirth, password } = req.body;

	// Create user
	const user = await User.create({
		email,
		firstName,
		lastName,
		username,
		gender,
		dateOfBirth,
		password
	});

	sendTokenResponse(user, 200, res);
});

//
// ─── METHODS ────────────────────────────────────────────────────────────────────
//

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token
	});
};
