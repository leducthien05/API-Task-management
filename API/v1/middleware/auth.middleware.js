const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports.requireAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        console.log(req.headers.authorization)
        const string = req.headers.authorization.split(" ");
        const token = string.pop();

        const check = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        const user = await User.findOne({
            _id: check.id,
            deleted: false,
            status: "active"
        }).select("-password");
        if (!user) {
            res.status(403).json({
                message: "Người dùng không tồn tại"
            });
            return;
        }
        req.user = user;
        next();
    } else {
        res.status(404).json({
            message: "Vui lòng gửi token"
        });
    }
}