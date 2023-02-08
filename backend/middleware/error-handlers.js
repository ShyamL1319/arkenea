const { CustomAPIError } = require("../errors/custom-errors")

const errorHanlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res.status(500).json({ msg: `Something went wrong, try again later!` })
    next()
}

module.exports = errorHanlerMiddleware;