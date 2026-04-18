const User = require("../model/user.model");

module.exports.requireAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        const string = req.headers.authorization.split(" ");
        const token = string.pop();
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select("-password");
        if (!user) {
            res.json({
                code: 400,
                message: "Người dùng không tồn tại"
            });
            return;
        }
        req.user = user;
        next();
    } else {
        res.json({
            code: 400,
            message: "Vui lòng gửi token"
        });
    }
}