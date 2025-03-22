const ApiError = require('../error/ApiError');

module.exports = function(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({error: true, message: err.message});
    }
    return res.status(500).json({message: 'Unexpected error!'})
}