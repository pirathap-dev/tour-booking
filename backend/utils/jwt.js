const sendToken = (user, statusCode, res) => {
    //Creating JWT Token
    const token = user.getJwtToken();

    //Setting cookies
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Required for Vercel
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;