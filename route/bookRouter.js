const express = require("express");
const BookRouter = express.Router();
const Books = require("../utils/model/book.model");

BookRouter.route("/")
    .get((req, res) => {
        Books.find().then(books => {
            return res.status(200).send(books);
        }).catch(err=>res.send("Cant find all books"))
    })
    .post((req, res) => {
        if(req.body){
            console.log(req.body)
            const book = new Books(req.body);
            book.save().then(result => {
                return res.send(result).status(200);
            }).catch(err => res.status(501).send(err));
        }else{
            console.log("Body not parsed")
        }
    })


BookRouter.route("/:id")
    .get((req, res) => {
        Books.findById(req.params.id).then(book => {
            return res.send(book).status(200);
        }).catch(err => {return res.send(err).status(404)})
    })
    .patch((req, res)=>{
        Books.findByIdAndUpdate(req.params.id, req.body).then(book => {
            return res.send(book).status(200);
        }).catch(err=>{return res.send("Cant update")})
    })
    .delete((req, res)=>{
        Books.findByIdAndDelete(req.params.id).then(book => {
            return res.send(book).status(200);
        }).catch(err=>{return res.send("Cant Delete")})
    })

module.exports = BookRouter;