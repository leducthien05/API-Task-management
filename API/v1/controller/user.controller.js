const User = require("../model/user.model");
const OTP = require("../model/otp.model");

const passwordHelper = require("../../../helper/password");
const generateHelper = require("../../../helper/generate");
const sendMail = require("../../../helper/sendmail");

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
// [POST] /api/v1/users/forgot-password
module.exports.forgotPassword = async (req, res) => {
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
        // tạo mã otp
        const otp = generateHelper.generateRandomNumber(6);
        const record = new OTP({
            email: req.body.email,
            otp: otp,
            expireAt: new Date()
        });
        await record.save();
        const subject = "Mã OTP xác nhận email";
        const html = `
            Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Sẽ hết hạn sau 3 phút
        `;
        const email = req.body.email;
        sendMail.sendMail(email, subject, html);
        res.json({
            code: 200,
            message: "Đã gửi OTP"
        });
    }
}
// [POST] /api/v1/users/getOTP
module.exports.getOTP = async (req, res) => {
    const otp = await OTP.findOne({
        otp: req.body.otp,
        email: req.body.email
    });
    if (!otp) {
        res.json({
            code: 400,
            message: "OTP không đúng hoặc đã hết hạn"
        });
        return;
    } else {
        res.json({
            code: 200,
            message: "OTP đã đúng"
        });
    }
}