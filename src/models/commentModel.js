const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    name: {
        type: String,
        required: "Le titre est requis"
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    id_post: {
        type: String
    }
});

module.exports = mongoose.model('Comment', commentSchema);