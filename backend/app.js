const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.config");
require("dotenv").config()
const routes = require("./routes/users")
const { notfound } = require("./middleware/not-found");
const { errorHanlerMiddleware } = require("./middleware/error-handlers");

const app = express();
app.use(express.json());
app.use(express.static("/backend/public"));
app.use(cors({ origin: "*" }));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
//         return res.status(200).json({});
//     }
//     next();
// });
app.use("/api/users", routes);
app.use("/healtcheck", (req, res) => {
    res.json({ msg: "Server check success" });
})
//app.use(notfound);
// app.use(errorHanlerMiddleware);
const URI = process.env.URI;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    connectDB(URI)
    console.log(`Server is running on ${PORT}`);
});











