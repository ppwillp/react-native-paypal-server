const paypal = require("paypal-rest-sdk");
const express = require("express");
const router = express.Router();

router.get("/paypal", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: "http://localhost:5000/payments/success",
      cancel_url: "http://localhost:5000/cancel"
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "USD",
          total: "1.00"
        },
        description: "This is the payment description."
      }
    ]
  };

  paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
      throw error;
    } else {
      console.log(payment);
      res.redirect(payment.links[1].href);
    }
  });
});

router.get("/success", (req, res) => {
  const PayerID = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: PayerID
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(
    error,
    payment
  ) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log(payment);
      res.render("payments/success");
    }
  });
});

router.get("/cancel", (req, res) => {
  res.render("payments/cancel");
});

module.exports = router;
