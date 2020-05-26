const express = require("express");
const todoRouter = express.Router();
const Todo = require("../utils/model/todo.model");

todoRouter
  .route("/")
  .get((req, res) => {
    Todo.find({})
      .then((resp) => {
        return res.send(resp);
      })
      .catch((err) => res.send(err));
  })
  .post((req, res) => {
    if (req.body) {
      const todo = new Todo(req.body);
      todo
        .save()
        .then((resp) => {
          return res.status(201).send(resp);
        })
        .catch((err) => res.status(501).send({err}));
    }
  });

todoRouter
  .route("/:id")
  .get((req, res) => {
    const _id = req.params.id;
    Todo.findById(_id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send("Not Found");
        } else {
          return res.status(200).send(todo);
        }
      })
      .catch((err) => {
        return res.status(404).send(err);
      });
  })
  .patch((req, res) => {
    if (req.params && req.params.id) {
      Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((todo) => {
          if (!todo) return res.status(400).send("Can't update");
          return res.status(200).send(todo);
        })
        .catch((err) => {
          return res.status(400).send(err);
        });
    }
  })
  .delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(501);
        } else {
          return res.status(200).send(todo);
        }
      })
      .catch((err) => {
        return res.status(501).send(err);
      });
  });

module.exports = todoRouter;
