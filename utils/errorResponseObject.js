const sendErrorWithObjectDetail = (res, data, statusCode) => {
	res.status(statusCode).json(data);
};

module.exports = sendErrorWithObjectDetail;
