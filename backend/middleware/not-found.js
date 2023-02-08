function notFound(err, req, res, next) {
    res.status(404).render({msg: "URL does not exist"});
}
module.exports = { notFound };


