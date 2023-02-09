const User = require("../models/User");
const createUser = async (req, res) => {
    const { firstName, lastName, email, phoneNo } = req.body;
    const profileImg = req?.file?.filename;
    console.log(req.file);
    if (!isValidPhoneNo(phoneNo)) { 
        return res.status(422).send({ status: 422, msg: "PhoneNo. must be a valid number", data: {email} });
    }
    let dupUser = await User.find({ email });
    console.log(dupUser)
    if (dupUser && Array.isArray(dupUser) && dupUser.length > 0) {
        return res.status(223).send({ status: 223, msg: "User email already exist !" ,data:dupUser});
    }
    const user = new User({ profileImg, firstName, lastName, email, phoneNo });
    await user.save()
        .then((data => {
            res.status(201).send({ status: 201, msg: "User created successfully", data },);
            console.log(data);
        }))
        .catch((err) => {
            res.status(500).json({ status: 500, msg: "Internal Server Error", data: {} });
        });

}

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const profileImg = req.file.filename ? req.file.filename : null;
    const isUserValidId = await User.findById({ _id: id });
    if (!isUserValidId) { 
        return res.status(404).send({ status: 404, msg: "User does not exist !" });
    }
    const result = await User.findByIdAndUpdate({ _id: id }, { ...req.body, profileImg }, { new: true });
    if (result) {
        res.status(200).json({ status: 200, msg: "User record updated successfully", data: result });
    } 
    res.status(500).json({ status: 500, msg: "Internal Server Error", data: {} });
}

const getUsers = async (req, res) => {
    const result = await User.find();
    if (result) {
        return res.status(200).json({ status: 200, msg: "User Fetched Successfully", data: result });
    } 
    return res.status(500).end({ status: 500, msg: "Internal Server Error", data: {} });
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const result = await User.findById({ _id: id });
    if (!result) {
        return res.status(404).send({ status: 404, msg: "User does not exist !", data: {id} });
    }
    return res.status(200).json({ status: 200, msg: "User details fetched Successfully", data: result});
}


const deleteUser = async (req, res) => {
    const { id } = req.params
    const isUserValidId = await User.findById({ _id: id });
    if (!isUserValidId) {
        return res.status(404).send({ status: 404, msg: "User does not exist !" });
    }
    const result = await User.findByIdAndDelete({ _id: id });
    res.json({ status: 200, msg: "User deleted Successfully", data: result });
}


module.exports = {
    createUser,
    updateUser,
    getUsers,
    getUserById,
    deleteUser
}

function isValidPhoneNo(value) {
    return /^\d+$/.test(value);
}
