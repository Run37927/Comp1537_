const express = require('express')
const app = express()


app.listen(process.env.PORT || 5000, function (err) {
  if (err)
    console.log(err);
})

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(express.static("./public"))

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dannygumerick:gugujiji7788@cluster0.x8vlv.mongodb.net/database?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true });

const unicornSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  loves: [String]
});

const unicornModel = mongoose.model("unicorns", unicornSchema);

app.post("/findUnicornByName", function (req, res) {
  console.log("request has been received")
  console.log(req.body.unicornName)

  unicornModel.find({ name: req.body.unicornName }, function (err, unicorns) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + JSON.stringify(unicorns));
    }
    res.send(unicorns);
  });
})


app.post("/findUnicornByFood", function (req, res) {
  console.log("request has been received")
  console.log(req.body.appleIsChecked)
  console.log(req.body.carrotIsChecked)

  a_list = []
  if (req.body.appleIsChecked == "checked")
    a_list.push("apple")

  if (req.body.carrotIsChecked == "checked")
    a_list.push("carrot")

  if (req.body.carrotIsChecked == "checked" && req.body.appleIsChecked == "checked") {
    unicornModel.find({$and: [ {loves: "apple"}, {loves: "carrot"} ] }, function (err, unicorns) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + JSON.stringify(unicorns));
      }
      res.send(unicorns);
    });
  } else {
    unicornModel.find({loves: { $in: a_list }}, function (err, unicorns) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Data " + JSON.stringify(unicorns));
      }
      res.send(unicorns);
    });
  }
})



app.post("/findUnicornByWeight", function (req, res) {
  console.log("request has been received")
  min_value = parseInt(req.body.minimum)
  max_value = parseInt(req.body.maximum)

  unicornModel.find({
    weight: { $gt: min_value }, weight: { $lt: max_value }
  }, function (err, unicorns) {

    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Data " + JSON.stringify(unicorns));
    }
    res.send(unicorns);
  });
})