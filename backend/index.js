const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express(); //server
const PORT = process.env.PORT || 7002;

//mongo connection
mongoose.Promise = global.Promise; //expect respond if it's success or failure and what it is
mongoose.connect("mongodb://localhost/bankAppPhase2_copy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
//body parser setup > transpose into sth that database can understand
app.use(bodyParser.urlencoded ({extended: true}));
app.use(bodyParser.json());

//routes
app.use("/users", userRoutes);

app.get("/", (req, res) => 
    res.send(`Our application is running on port ${PORT}`)
)

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));


module.exports = app;