const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
    const token = req.headers.authorization.split(" ")[1];
    // JWT.DECODE
    const decoded = jwt.verify(token, process.env.JWT_KEY); // return back to the user

    req.userData = decoded; // it's not needed

    next();
    } catch(err) {
        return res.status(401).json({
            message: "Auth failed",
        });
    }
};