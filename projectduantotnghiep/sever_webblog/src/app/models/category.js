import mongoose from 'mongoose';

const categoryrSchema = new mongoose.Schema(
    {
        namecategory: {
            type: String,
            required: true,
            unix: true
        },
    },
    { timestamps: true }
  
);


const Category = mongoose.model('category', categoryrSchema);
export default Category;