const express = require("express");
const app = express();
const cors = require("cors");
const Razorpay = require('razorpay');
app.use(express.json());
app.use(cors());
const dotenv = require('dotenv')
require('dotenv').config();
// Routers
const bookRouter = require("./routes/BookDetail");
app.use("/bookdata", bookRouter);
const razorpay = new Razorpay({
  key_id: 'abc',
  key_secret: 'abc'
});
const authRouter = require("./routes/Login");
app.use("/auth", authRouter);
app.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body; 

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency,
      receipt
    });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', 'YOUR_RAZORPAY_KEY_SECRET');

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.send({ status: 'success' });
  } else {
    res.send({ status: 'failure' });
  }
});
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
