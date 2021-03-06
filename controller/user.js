const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

const sendErrorWithObjectDetail = require('../utils/errorResponseObject');

// @desc    Return current identity
// @route   GET /api/users/me
// @acess   Private
exports.getMyCredential = asyncHandler(async (req, res, next) => {
	res.status(200).json({ success: true, data: req.user });
});

// @desc    Test Route
// @route   GET /api/users/test
// @acess   Public
exports.testRoute = asyncHandler(async (req, res, next) => {
	console.log(req.cookies);
	res.status(200).json({ success: true });
});

// @desc    Register user
// @route   POST /api/users/register
// @acess   Public
exports.register = asyncHandler(async (req, res, next) => {
	const { email, firstName, lastName, username, gender, dateOfBirth, password } = req.body;
	const errors = {}; // empty object at first
	// Duplication check => avoid MongoError: E11000 custom validation from the duplicate value entered => but it doesn't give the key soooooo it's useless
	const _exist_username = await User.findOne({ username }); // check if the entered username exist
	const _exist_email = await User.findOne({ email }); // check if the entered email exist
	if (_exist_username) {
		errors.username = 'This username is already exist';
	}
	if (_exist_email) {
		errors.email = 'This email is already exist';
	}

	if (Object.keys(errors).length > 0) {
		// If the errors above is not empty
		return sendErrorWithObjectDetail(res, errors, 400);
	}

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

	// Send the response with the token attached
	sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @acess   Public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate email & password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400));
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password);

	if (!isMatch) {
		return next(new ErrorResponse('Invalid credentials', 401));
	}

	// Create token
	/*const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, token });*/

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
