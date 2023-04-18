const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const Customer = require("./Customer");
const multer = require('multer')

app.use(express.json());
const storage = multer.diskStorage({
  destination: '../uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.json')
  }
})
const upload = multer({ storage: storage })
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

app.get('/edit-record', (req, res) => {
  const id = req.query.id;

  Customer.findById(id).then(customer => {

    res.send(customer)
  }
  ).catch(err => console.log(err))
})

app.get('/search', (req, res) => {
  const value = req.query.value;

  Customer.find({ $text: { $search: value } }).then(customer => res.send(customer)).catch(err => console.log(err))
})

//POST
app.post("/post-record", (req, res) => {
  const data = req.body;

  const customer = new Customer({
    ...data,
  });
  customer
    .save()
    .then(() => res.send({ success: true }))
    .catch((err) => console.log(err));
});
app.post("/post-edit", (req, res) => {
  const data = req.body;
  const customer = data;

  Customer.findByIdAndUpdate(customer.id, { ...customer }, { new: true }).then(() => {
    res.send({ success: true })
  })
    .catch((err) => console.log(err));
});


app.post('/delete-by-id', (req, res) => {
  const id = req.body.id;
  Customer.findByIdAndDelete(id).then(() => res.send({ msg: "success" })).catch(err => console.log(err))
})
app.get('/delete-all', (req, res) => {
  Customer.deleteMany().then(() => res.send({ msg: "success" })).catch(err => console.log(err))
})

app.post('/file-upload', upload.single('file'), (req, res) => {
  const data = require("../uploads/file.json")

  Customer.create(data);
  setTimeout(() => {
    res.send({ success: true })
  }, 4000);
})

