const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

module.exports.requireAuth = async (req, res, next) => {
    if (req.headers.authorization) {
        console.log(req.headers.authorization)
        const string = req.headers.authorization.split(" ");
        const token = string.pop();
        if (!token) {
            return res.status(401).json({
                message: "Không tìm thấy token"
            });
        }
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;
            next();

        } catch (error) {

            // token hết hạn
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    code: "TOKEN_EXPIRED",
                    message: "Access token expired"
                });
            }

            // token bị sửa / invalid
            return res.status(403).json({
                code: "INVALID_TOKEN",
                message: "Invalid token"
            });
        }
    } else {
        res.status(401).json({
            message: "Vui lòng gửi token"
        });
    }
}