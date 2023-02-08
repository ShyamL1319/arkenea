const express = require("express");
const upload = require("../middleware/upload");
const { createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser } = require("../controller/users");
const router = express.Router();
router.post("/",upload ,createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", upload, updateUser);
router.delete("/:id", deleteUser);
module.exports = router;