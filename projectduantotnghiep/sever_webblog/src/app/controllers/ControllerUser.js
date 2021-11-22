import User from '../models/user.js';
import BaseResponse from '../commons/helper/BaseRespone.js';
import BaseError from '../commons/helper/BaseError.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const bcryptSalt = 10;

export default {

    async changePassword(req, res) {
        const pass = req.body;
        const idUser = req.user._id;
        await User.findOne({ _id: idUser }, (error, data) => {
            bcrypt.compare(pass.password, data.password, async (err, result) => {
                if (result) {
                    const salt = bcrypt.genSaltSync(bcryptSalt);
                    const hashPass = bcrypt.hashSync(pass.newpassword, salt);
                    const chagepass = await User.updateOne({ _id: idUser }, { password: hashPass });
                    if (chagepass) {
                        return new BaseResponse({
                            statusCode: 200,
                            data: { message: 'Đổi mật khẩu thành công' },
                        }).return(res)
                    } else {
                        new BaseError({
                            statusCode: 400,
                            error: err,
                        })
                    }
                } else {
                    return new BaseResponse({
                        statusCode: 200,
                        data: { message: 'Mật khẩu không chính xác' },
                    }).return(res);
                }
            })
        }).clone()
    },

    async getProfile(req, res) {
        const idUser = req.user._id;
        await User.findOne({ _id: idUser }, async (err, data) => {
            if (data !== null) {
                // console.log(data)
                return new BaseResponse({
                    statusCode: 200,
                    data: { message: 'success', results : data },
                }).return(res)
            }
            else {
                new BaseError({
                    statusCode: 400,
                    error: err,
                })
            }
        }).clone()
    },
    async uploadImgUser(req, res, next) {
        try {
            const path = `http://localhost:3800/imageuser/${req.file.filename}`;
            return new BaseResponse({ statusCode: 200, data: { urlimageuser: path } }).return(res);
        } catch (error) {
            next(error)
        }
    },
    async updateProfile(req, res) {
        const dataReqUser = req.body;
        const idUser = req.user._id;
        await User.findOne({ _id: idUser }, async (error, data) => {
            bcrypt.compare(dataReqUser.password, data.password, async (err, result) => {
                if (result) {
                    const changeProfile = await User.updateOne({ _id: idUser },
                        {
                            name: dataReqUser.name,
                            phoneNumber: dataReqUser.phoneNumber,
                            gender: dataReqUser.gender,
                            avatar: dataReqUser.avatar,
                            address: dataReqUser.address,
                            updateAcountAt: new Date()
                        });
                    if (changeProfile) {
                        return new BaseResponse({
                            statusCode: 200,
                            data: { message: 'Cập nhật trang cá nhân thành công' },
                        }).return(res)
                    } else {
                        new BaseError({
                            statusCode: 400,
                            error: err,
                        })
                    }
                } else {
                    return new BaseResponse({
                        statusCode: 200,
                        data: { message: 'Mật khẩu không chính xác' },
                    }).return(res);
                }

            })
        }).clone()
    },

}

