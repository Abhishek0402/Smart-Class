const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
var cors = require("cors");
var path = require("path");
var multer = require("multer");
var forms = multer();
//routes
//@ public login- signup

const register = require("./routes/register");
const login = require("./routes/login");


const app = express();

//@ mongodb connection
const db = require("./config/mongoDb").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Mongodb Connected"))
  .catch(err => console.log(err));
mongoose.Promise = global.Promise;



// app.use(forms.array());
app.use(bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
 
//express app routes

app.use("/api/app", register);
app.use("/api/app", login);

//3.error handling middle ware
app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.field
  });
});

//listen for request
app.listen(process.env.PORT || 4230, () => {
  console.log("now listening for request");
});