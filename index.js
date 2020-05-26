const express = require("express");
const bodyParser = require("body-parser");
const environment = require("./environment/environment");
require("./utils/mongoose");
const BookRouter = require("./route/bookRouter");
const TodoRouter = require("./route/todoRouter");

const app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended : true}));
app.use("/books", BookRouter);
app.use("/todos", TodoRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(environment.PORT, () =>
  console.log("Server listening on Port " + environment.PORT)
);



// ALL TODO ITEMS
// app.get("/todos", (req, res) => {
//   Todo.find({})
//     .then((resp) => {
//       return res.send(resp);
//     })
//     .catch((err) => res.send(err));
// });

// // SINGLE TODO ITEM
// app.get("/todos/:id", (req, res) => {
//   console.log(req.params);

//   if (req.params && req.params.id) {
//     const _id = req.params.id;
//     Todo.findById(_id)
//       .then((todo) => {
//         console.log(todo);
//         if (!todo) {
//           return res.status(404).send("Not Found");
//         } else {
//           return res.status(200).send(todo);
//         }
//       })
//       .catch((err) => {
//         return res.status(404).send(err);
//       });
//   }
// });

// // CREATE NEW TODO ITEM
// app.post("/todos", (req, res) => {
//   if (req.body) {
//     const todo = new Todo(req.body);
//     todo
//       .save()
//       .then((resp) => {
//         return res.status(201).send(resp);
//       })
//       .catch((err) => res.status(501).send(err));
//   }
// });

// // UPDATE EXISTING TODO ITEM
// app.patch("/todos/:id", (req, res) => {
//   if (req.params && req.params.id) {
//     Todo.findByIdAndUpdate(req.params.id, req.body)
//       .then((todo) => {
//         if (!todo) return res.status(400).send("Can't update");
//         return res.status(200).send(todo);
//       })
//       .catch((err) => {
//         return res.status(400).send(err);
//       });
//   }
// });

// // DELETE TODO ITEM
// app.delete("/todos/:id", (req, res) => {
//   console.log(req.params.id);
//   Todo.findByIdAndDelete(req.params.id)
//     .then((todo) => {
//       console.log(todo);
//       if (!todo) {
//         return res.status(501);
//       } else {
//         return res.status(200).send(todo);
//       }
//     })
//     .catch((err) => {
//       return res.status(501).send(err);
//     });
// });

