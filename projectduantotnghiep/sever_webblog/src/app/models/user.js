import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ['Pending', 'Active'],
            default: 'Pending'
        },
        name: {
            type: String,
            required: true,
            lowercase: true,
            default: 'Anomimous',
            maxLength: 50,
            minlength: 1
        },
        role: {
            type: String,
            enum: ['staff', 'admin', 'censor','director'],
            required: true,
            default: 'staff',
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
            trim: true,
            minLength: 4,
        },
        validateCode: {
            type: Number,
            default: 0,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            default: '',
        },
        gender: {
            type: String,
            enum: ['male', 'female','other'],
            default: 'other'
        },
        avatar: {
            type: String,
            trim: true,
            default: 'https://hopamchuan.com/images/ava/default_avatar.png',
        },
        address: {
            type: String,
            default: '',
        },
        chucvu: {
            type: String,
            enum: ['Chuyên Viên', 'Cộng tác viên', 'Tổ trưởng', 'Trưởng đơn vị','Ban giám đốc','Admin'],
            default: 'Chuyên Viên',
        },
        is_available: {
            type: Boolean,
            default: true
        },
        createAcountAt: {
            type: Date,
            default: null,
        },
        updateAcountAt: {
            type: Date,
            default: null,
        },
       
    },
    { timestamps: true }
);


const User = mongoose.model('user', userSchema);
export default User;


