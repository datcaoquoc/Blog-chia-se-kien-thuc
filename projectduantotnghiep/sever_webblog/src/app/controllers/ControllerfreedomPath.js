import BaseError from '../commons/helper/BaseError.js';
import BaseResponse from '../commons/helper/BaseRespone.js';
import Post from '../models/post.js';
import Category from '../models/category.js';
export default {
    async getPostByCategory(req, res) {
        try {
            const id = req.query.id;
            const limit = req.limit;
            const obj = {
                is_available: 0,
                censor: 0,
                is_detroy: 0,
                is_available: 0,
                content: 0,
                updatedAt: 0
            }
            const results = await Post.find({ category: id, is_available: 'Active' }, obj).populate('poster', 'name').populate('category', 'namecategory').limit(limit);
            if (results) {
                return new BaseResponse({
                    statusCode: 200,
                    data: { datapost: results },
                }).return(res)
            } else {
                new BaseError({
                    statusCode: 400,
                    error: err,
                })
            }
        } catch (error) {
            new BaseError({
                statusCode: 500,
                error: err,
            })
        }

    },

    async getPostnew(req, res) {
        try {
            const lm = req.limit;
            const obj = {
                is_available: 0,
                censor: 0,
                is_detroy: 0,
                is_available: 0,
                poster: 0,
                updatedAt: 0
            }
            const results = await Post.find({ is_available: "Active" }, obj).limit(lm).populate('category', 'namecategory').sort({ "createAt": -1 });
            if (results) {
                return new BaseResponse({
                    statusCode: 200,
                    data: { datapost: results },
                }).return(res)
            } else {
                new BaseError({
                    statusCode: 400,
                    error: err,
                })
            }
        } catch (error) {
            new BaseError({
                statusCode: 500,
                error: err,
            })
        }
    },

    async getcategory(req, res) {
        const obj = {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }
        Category.find({}, obj, function (err, listcategorys) {

            return new BaseResponse({
                statusCode: 200,
                data: { listcategory: listcategorys },
            }).return(res)
        })
    },

    async gethomeblogs(req, res) {
        // const obj = { password: 0, status: 0, email: 0, validateCode: 0, phoneNumber: 0, gender: 0, address: 0, is_available: 0, createAcountAt: 0, updateAcountAt: 0, createdAt: 0, updatedAt: 0 }
        // const objcategory = { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
        const results = await Category.aggregate([
            { $limit: 3 },
            { $sort: { "createdAt": -1 } },
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "category",
                    as: "productList"
                },
            },
            {
                $match: {
                    "productList.is_available": "Active"
                },
            },
            {
                $group: {
                    _id: "$_id",
                    namecategory: { $first: "$namecategory" },
                    listpost: { $push: "$productList" }
                }

            },
            { $unwind: "$listpost" },
            {
                $project: {
                    listpost: {
                        $slice: ['$listpost', 0, 4],
                    },
                    namecategory: 1

                }
            }
        ])
        return new BaseResponse({
            statusCode: 200,
            data: { listpostsbycategory: results },
        }).return(res)
    }
}