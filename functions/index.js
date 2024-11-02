const stripe = require("stripe")(
  "sk_test_51Q39DlAMrFqnm9DlohNCaV3Ljz2c86OaGOrWUsdiGiO7NJHA7hWuj2k9Ql1x81qQw1H8y0QzTwEyt0IVhg1pVEh800WAH3hpep"
);
const cors = require("cors");
const express = require("express");
const functions = require("firebase-functions");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello, world!"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.myFunction = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
