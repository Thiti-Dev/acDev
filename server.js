const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
//
// ─── ROUTE ──────────────────────────────────────────────────────────────────────
//
const users = require('./routes/api/user');
// ────────────────────────────────────────────────────────────────────────────────

// Load env vars
dotenv.config({ path: './config/config.env' });

const mainThread = async () => {
	await connectDB(); // wait for the db to be connected first

	// Dev logging middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	//
	// ─── PARSER ─────────────────────────────────────────────────────────────────────
	//
	// Body
	app.use(express.json());
	// Cookie
	app.use(cookieParser());
	// ────────────────────────────────────────────────────────────────────────────────
	// ─── ROUTES ─────────────────────────────────────────────────────────────────────
	//
	app.use('/api/users', users);
	// ────────────────────────────────────────────────────────────────────────────────
	//
	// ─── CUSTOM ERROR HANDLER ───────────────────────────────────────────────────────
	//
	app.use(errorHandler);
	// ────────────────────────────────────────────────────────────────────────────────
	//

	const port = process.env.PORT || 5000;

	const server = app.listen(port, () => {
		console.log(`Server is currently running on port ${port}`.rainbow);
	});

	// Handle unhandled promise rejections
	process.on('unhandledRejection', (err, promise) => {
		console.log(`Error: ${err.message}`.red);
		// Close server & exit process
		server.close(() => process.exit(1));
	});
};

mainThread(); // calling the main thread
