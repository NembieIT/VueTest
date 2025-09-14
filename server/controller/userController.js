const UserModal = require('../modal/userModal.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const UserController = {
    addUser: async (req, res) => {
        try {
            console.log(UserModal);
            const valid = await UserModal.findOne({
                username: req.body.username
            })
            if (!valid) {
                const salt = await bcrypt.genSalt(10);
                const hashedPwd = await bcrypt.hash(req.body.password, salt);
                const account = new UserModal({
                    ...req.body,
                    password: hashedPwd
                })
                await account.save();
                console.log('Da save data');
                return res.status(200).json({
                    EC: 0,
                    message: "Success"
                })
            } else {
                return res.json({
                    EC: 1,
                    message: "Exist username"
                })
            }
        } catch (err) {
            res.status(500).json({
                EC: 1,
                message: "Failed in backed",
                error: err.message
            })
        }
    },
    loginUser: async (req, res) => {
        try {
            const valid = await UserModal.findOne({
                username: req.body.username
            })
            if (valid) {
                const hashed = await bcrypt.compare(req.body.password, valid.password);
                if (hashed) {
                    const access_token = jwt.sign({
                        username: valid.username
                    }, process.env.SECRET_ACCESSTOKEN, { expiresIn: process.env.EXPIRE_IN });
                    return res.status(200).json({
                        EC: 0,
                        message: "Success",
                        user:valid.username,
                        access_token
                    })
                }else{
                    return res.status(401).json({
                        EC:1,
                        message:"Sai mat khau"
                    })
                }
            } else {
                return res.status(401).json({
                    EC: 1,
                    message: "Sai tai khoan"
                })
            }
        } catch (err) {
            return res.status(403).json({
                EC: 1,
                message: "Failed in backed",
                error: err.message
            })
        }
    }
}

module.exports = UserController;