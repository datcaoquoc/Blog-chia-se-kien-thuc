import Post from "../models/post.js";
import BaseResponse from "../commons/helper/BaseRespone.js";
import BaseError from '../commons/helper/BaseError.js'
export default {
    async creatPost(req, res) {
        try {
            const dataPost = req.body;
            const dataUser = req.user;
            let createdat = null;
            console.log(dataPost)
            const data = new Post({
                content: dataPost.content,
                title: dataPost.title,
                description: dataPost.description,
                category: dataPost.category,
                imagepost: dataPost.imagepost,
                poster: dataUser._id,
                createAt : createdat
            })
            if(dataUser.role === 'director'){
                createdat = new Date();
                const data1 = new Post({
                    content: dataPost.content,
                    title: dataPost.title,
                    description: dataPost.description,
                    category: dataPost.category,
                    imagepost: dataPost.imagepost,
                    poster: dataUser._id,
                    is_available: 'Active',
                    createAt : createdat
                })
                data1.save()
                .then(response => {
                    return new BaseResponse({
                        statusCode: 200,
                        data: { message: 'Tạo bài viết thành công' },
                    }).return(res)
                }).catch(err => {
                    new BaseError({
                        statusCode: 400,
                        errors: err,
                    })
                });
            }else{
                data.save()
                .then(response => {
                    return new BaseResponse({
                        statusCode: 200,
                        data: { message: 'Tạo bài viết thành công, Đang chờ duyệt...' },
                    }).return(res)
                }).catch(err => {
                    new BaseError({
                        statusCode: 400,
                        errors: err,
                    })
                });
            }
        } catch (error) {
            console.log(error)
            new BaseError({
                statusCode: 500,
                errors: error,
            })
        }
    },

    async updatePost(req, res) {
        const idPost = req.query.idpost;
        const idUser = req.user._id;
        const contendUpdate = req.body.contentnew;
        await Post.findById(idPost).exec()
            .then((dataPost) => {
                if (dataPost.poster.toString() === idUser.toString()) {
                    Post.findByIdAndUpdate(idPost, { content: contendUpdate, updateAt: new Date() })
                        .then(respone => {
                            return new BaseResponse({
                                statusCode: 200,
                                data: { message: 'cập nhật bài viết thành công' },
                            }).return(res)
                        }).catch(err => {
                            new BaseError({
                                statusCode: 400,
                                errors: err,
                            })
                        })
                } else {
                    return new BaseResponse({
                        statusCode: 200,
                        data: { message: 'bạn không có quyền sửa bài viết của người khác' },
                    }).return(res)
                }
            }).catch(err => {
                new BaseError({
                    statusCode: 400,
                    errors: err,
                })
            })

    },
    async uploadImg(req, res) {
        try {
                return new BaseResponse({ 
                    statusCode: 200,
                     data: { message: 'success', urlimagepost: `http://localhost:3800/imagepost/${req.file.filename}` }, 
                }).return(res);
        } catch (error) {
            new BaseError({
                statusCode: 400,
                errors: error,
            })
        }
    },

    async deletePost(req, res) {
        const idPost = req.query.idpost;
        Post.findByIdAndUpdate(idPost, { is_detroy: true })
            .then((respone) => {
                return new BaseResponse({
                    statusCode: 200,
                    data: { message: 'xóa bài viết thành công' },
                }).return(res)
            }).catch((err) => {
                new BaseError({
                    statusCode: 400,
                    errors: err,
                })
            })
    }

}
