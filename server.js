const express = require('express');
const app = express();

const dotenv = require('dotenv');

const colors = require('colors');
// Load env vars
dotenv.config({ path: './config/config.env' });

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is currently running on port ${port}`.rainbow);
});
