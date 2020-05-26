const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    author : {
        type : String,
        trim : true,
        default : "Anonymous"
    },
    title : {
        type : String,
        trim : true,
        required : true
    }
})

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;