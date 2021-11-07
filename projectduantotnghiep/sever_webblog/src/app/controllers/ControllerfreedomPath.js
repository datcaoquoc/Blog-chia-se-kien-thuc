import BaseError from '../commons/helper/BaseError.js';
import BaseResponse from '../commons/helper/BaseRespone.js';
import Post from '../models/post.js';
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
                poster: 0,
                updatedAt: 0
            }
            const results = await Post.find({ category: id, is_available: 'Active' }, obj).limit(limit);
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
                content: 0,
                poster: 0,
                updatedAt: 0
            }
            const results = await Post.find({ "createAt": { $ne: null } }, obj).limit(2).sort({ "createAt": -1 });
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
    }
}