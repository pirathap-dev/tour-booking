const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const uploadToImgBB = async (filePath) => {
    const form = new FormData();
    form.append('image', fs.createReadStream(filePath));

    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, form, {
        headers: form.getHeaders()
    });

    fs.unlinkSync(filePath); // Clean temp file
    return res.data.data.url;
};


//Register User
// exports.registerUser = catchAsyncError(async (req, res, next) => {
//     const { name, email, password } = req.body;
//     let avatar;

//     if (req.file) {
//         avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
//     }

//     const user = await User.create({
//         name,
//         email,
//         password,
//         avatar
//     });

//     const token = user.getJwtToken();

//     sendToken(user, 201, res);
// })
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let avatar;

    if (req.file) {
        try {
            // Create a form data object for ImgBB API
            const formData = new FormData();
            formData.append('image', req.file.buffer, req.file.originalname); // Image buffer and name

            // Make the request to ImgBB API
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Client-API-Key ${process.env.IMGBB_API_KEY}`
                }
            });

            // If the upload is successful, get the image URL
            avatar = response.data.data.url;
        } catch (error) {
            return next(new ErrorHandler('Image upload failed, please try again!', 500));
        }
    }

    // Create the user
    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    const token = user.getJwtToken();

    sendToken(user, 201, res);
});


//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    //finding the user database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 201, res);

})

//Logout User
exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "logged Out"
    })
}

//Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email'));
    }

    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your password reset url is as follows \n\n${resetUrl}\n\nIf you have not requested this email, then ignore this mail`;

    try {

        sendEmail({
            email: user.email,
            subject: 'Password recovery request',
            message: message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message), 500)
    }
})

//Reset password - /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt: Date.now()
        }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not matched'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false })

    sendToken(user, 201, res);

})

//Get User profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

//Change Password - /api/v1/password/change
exports.changePassword = catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.user.id).select('+password');

    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old password is incorrect', 401));
    }

    user.password = req.body.password;

    await user.save();
    res.status(200).json({
        success: true
    })

})

//Update profile - /api/v1/update
// exports.updateProfile = catchAsyncError(async (req, res, next)=>{
//     let newUserData = {
//         name: req.body.name,
//         email: req.body.email
//     }

//     let avatar;

//    if (req.file) {
//     avatar = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
//     newUserData = {...newUserData, avatar}
//    }

//     const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true
//     })

//     res.status(200).json({
//         success: true,
//         user
//     })
// })
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    let newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    if (req.file) {
        const filePath = req.file.path;
        const avatar = await uploadToImgBB(filePath);
        newUserData.avatar = avatar;
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        user
    });
});


//Admin

//Admin: Get all users - /api/v1//admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//Admin: Get specific users - /admin/user/:id
exports.getUser = catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User not found with this id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Admin: Update user - /admin/user/:id
exports.updateUser = catchAsyncError(async (req, res, next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        user
    })
})

//Admin: Delete user - /admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this id: ${req.params.id}`))
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true
    })

})