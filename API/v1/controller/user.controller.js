const User = require("../model/user.model");

const passwordHelper = require("../../../helper/password");

// [POST] /api/v1/users/register
module.exports.register = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        status: "active",
        deleted: false
    });
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại"
        });
    } else {
        const password = await passwordHelper.hashPassword(req.body.password);
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: password
        });
        await user.save();
        res.cookie("token", user.token);
        res.json({
            code: 200,
            message: "OK",
            token: user.token
        });
    }

}
// [POST] /api/v1/users/login
module.exports.login = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        status: "active",
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại"
        });
        return;
    } else {
        const isPassword = await passwordHelper.comparePassword(req.body.password, user.password);
        if (!isPassword) {
            res.json({
                code: 400,
                message: "Mật khẩu không đúng"
            });
            return;
        } else {
            res.cookie("token", user.token);
            res.json({
                code: 200,
                message: "Đăng nhập thành công",
                token: user.token
            });
        }

    }

}