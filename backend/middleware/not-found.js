const notFound = (err,req, res,next) => {
    return res.status(404).end("URL does not exist");
}
module.exports = notFound;