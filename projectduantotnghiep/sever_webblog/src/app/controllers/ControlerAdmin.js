import BaseError from '../commons/helper/BaseError.js';
import BaseResponse from '../commons/helper/BaseRespone.js';
import User from '../models/user.js';
import Category from '../models/category.js';

export default {
    async getListUser(req, res) {
        const limit = 5;
        const role = req.params.role;
        let pageNumber = req.params.page;
        console.log(pageNumber)
        pageNumber = pageNumber - 1; //2
        await User.find({})
            .where('role').equals(role)
            .limit(limit) //5
            .skip(limit * pageNumber) //0 5 10
            .then((results) => {
                return new BaseResponse({
                    statusCode: 200,
                    data: { datauser: results },
                }).return(res)
            })
            .catch((err) => {
                new BaseError({
                    statusCode: 500,
                    error: err,
                })
            });
    },
    async deleteUser(req, res) {
        const idUser = req.query.Id;
        await User.findByIdAndUpdate(idUser, { is_available: false },
            function (err, docs) {
                if (err) {
                    new BaseError({
                        statusCode: 500,
                        error: err,
                    })
                }
                else {
                    return new BaseResponse({
                        statusCode: 200,
                        data: { message: "đã vô hiệu hóa tài khoản" },
                    }).return(res)
                }
            });
    },

    async findUsersByName(req, res) {
        const nameUser = req.query.nameUser;
        await User.find({ name: { $regex: nameUser } }, { password: 0 }, function (err, data) {
            if (err) {
                new BaseError({
                    statusCode: 500,
                    error: err,
                })
            }
            else {
                return new BaseResponse({
                    statusCode: 200,
                    data: { message: "sucsess", data },
                }).return(res)
            }
        });
    },
    async findUsersByEmail(req, res) {
        const email = req.query.email;
        await User.find({ email: { $regex: email } }, { password: 0 }, function (err, data) {
            if (err) {
                new BaseError({
                    statusCode: 500,
                    error: err,
                })
            }
            else {
                return new BaseResponse({
                    statusCode: 200,
                    data: { message: "sucsess", data },
                }).return(res)
            }
        });
    },

    async addCategory(req, res) {
        const nameCategory = req.query.nameCategory;
        const data = await Category.findOne({ namecategory: nameCategory });
        if (data) {
            return new BaseResponse({
                statusCode: 200,
                data: { message: 'thể loại này đã tồn tại' },
            }).return(res)
        } else {
            const newCategory = new Category({
                namecategory: nameCategory,
            })
            newCategory
            .save()
            .then(response => {
                return new BaseResponse({
                    statusCode: 200,
                    data: { message: 'Thêm thể loại thành công !' },
                }).return(res)
            }).catch(err => {
                new BaseError({
                    statusCode: 400,
                    error: err,
                })
            });
        }
    }







}
