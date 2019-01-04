const express = require("express");
const app = express();
const paypal = require("paypal-rest-sdk");
const engines = require("consolidate");
const router = express.Router();

const payment = require("./routes/paypal");
app.use("/payments", payment);

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

const PORT = 5000 || process.env.PORT;

paypal.configure({
  mode: "sandbox",
  client_id: "<CLIENT_ID>",
  client_secret: "<CLIENT_SECRET>"
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
