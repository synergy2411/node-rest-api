const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    label : {
        type : String,
        required : true,
        trim : true
    },
    status : {
        type : Boolean,
        trim : true,
        default : false
    }
})

const Todo = mongoose.model("Todo", TodoSchema)

module.exports = Todo;