const { Schema, model } = require('mongoose');
const blogshema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: false,
        default: './images/default.png'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });



const Blog = model('Blog', blogshema);
module.exports = Blog;