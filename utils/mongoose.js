const mongoose = require("mongoose");
const environment = require("../environment/environment");

mongoose.connect(environment.newMongoUrl,{ 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
 }).then(res => {
    console.log("Mongo Connected");
}).catch(err => {
    console.log(err);
})