const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    }
}, { timestamps: true })

const postModel = model('posts', postSchema)
module.exports = { postModel }