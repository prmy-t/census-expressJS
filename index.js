const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const Customer = require("./Customer");

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
    console.log("listening...");
  });

app.get("/all-records", (req, res) => {
  Customer.find()
    .then((customers) => {

      res.send(customers)
    })
    .catch((err) => console.log(err));
});


//POST
app.post("/post-record", (req, res) => {
  const data = req.body;
  console.log(data);
  const customer = new Customer({
    ...data,
  });
  customer
    .save()
    .then((customer) => res.send("saved"))
    .catch((err) => console.log(err));
});
app.post("/post-edit", (req, res) => {
  const data = req.body;
  const customer = data;
  console.log(customer);
  Customer.findByIdAndUpdate(customer.id, { ...customer }, { new: true }).then((cus) => {
    console.log(cus);
    res.send({ msg: "updated" })
  })
    .catch((err) => console.log(err));
});

app.get('/edit-record', (req, res) => {
  const id = req.query.id;
  console.log(id);
  Customer.findById(id).then(customer => {
    console.log(customer);
    res.send(customer)
  }
  ).catch(err => console.log(err))


})

app.post('/delete-by-id', (req, res) => {
  const id = req.body.id;
  Customer.findByIdAndDelete(id).then(() => res.send({ msg: "success" })).catch(err => console.log(err))
})

