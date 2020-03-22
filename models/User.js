const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: [ true, 'Please add an email' ],
		unique: true,
		match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email' ]
	},
	username: {
		type: String,
		required: [ true, 'Please add a username' ]
	},
	password: {
		type: String,
		required: [ true, 'Please add a password' ],
		minlength: 6,
		select: false // not returning the password [HIDING]
	},
	dateOfBirth: {
		type: Date,
		required: [ true, 'Please add a the date of birth' ]
	},
	firstName: {
		type: String,
		required: [ true, 'Please add a firstName' ]
	},
	lastName: {
		type: String,
		required: [ true, 'Please add a lastName' ]
	},
	gender: {
		type: String,
		enum: [ 'male', 'female' ],
		required: [ true, 'Please select a gender' ]
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
	// If using have nothing to do with password => calling nxt middleware
	if (!this.isModified('password')) {
		next();
	}

	// Gen salt and applied to the current password
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
