const { CustomAPIError } = require("../errors/custom-errors")

const errorHanlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        res.status(err.statusCode).render({ msg: err.message });
    } else {
        res.status(500).render({ msg: `Something went wrong, try again later!` })
    }
}
function errorHandler(err, req, res, next) {
    res.status(500)
    res.render('error', { error: err })
}


module.exports = { errorHanlerMiddleware, errorHandler };

