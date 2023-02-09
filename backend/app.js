const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.config");
require("dotenv").config()
const routes = require("./routes/users")
const { notFound } = require("./middleware/not-found");
const { errorHanlerMiddleware } = require("./middleware/error-handlers");
const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};
const app = express();
app.use(express.json());
app.use(express.static('./public'));
app.use(cors({ origin: "*" }));
app.use("/api/users", routes);
app.use("/healtcheck", (req, res) => {
    res.json({ msg: "Server check success" });
});
app.use(notFound)
app.use(errorHanlerMiddleware);
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI
app.listen(PORT, () => {
    connectDB(URI)
    console.log(`Server is running on ${PORT}`);
});











