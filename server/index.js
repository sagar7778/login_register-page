const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeModel = require("./models/Employee");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://sagar:sagar123@cluster0.fohbshq.mongodb.net/employee"
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Login successful");
      } else {
        res.json("Incorrect password");
      }
    } else {
      res.json("no record found");
    }
  });
});

app.post("/signup", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Server started");
});
