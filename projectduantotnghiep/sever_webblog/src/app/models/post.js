import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            maxLength: 150,
            minlength: 10
        },
        title:{
            type: String,
            required: true,
            maxLength: 8000,
            minlength: 10
        },
        imagepost: {
            type: String,
            default: 'http://dangky3gmobi.vn/wp-content/uploads/2018/04/1685973.jpg'
        },
        poster: { type: Schema.Types.ObjectId, ref: 'user' },
        category: { type: Schema.Types.ObjectId, ref: 'category' },
        likecount: {
            type: Number,
            default: 0
        },
        is_available: {
            type: String,
            enum: ['Pending', 'Active'],
            default: 'Pending'
        },
        censor: { 
            type: Schema.Types.ObjectId, 
            ref: 'user', 
            default: null 
        },
        createAt: {
            type: Date,
            default: null,
        }, 
        updateAt: {
            type: Date,
            default: null,
        },
        is_detroy: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);


const Post = mongoose.model('post', postSchema);
export default Post;


