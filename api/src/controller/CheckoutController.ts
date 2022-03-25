import { Request, Response, NextFunction } from "express";
const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  "TEST-8695737586875441-070217-1a21ea4563387f8660808cc98999157e-38774956"
);
//console.log('preferences', mercadopago.preferences)

let url: string;
if (process.env.NODE_ENV) {
  url = "https://canchera.vercel.app";
} else {
  url = "http://localhost:3000";
}

module.exports = {
  async postCheckout(req: Request, res: Response, next: NextFunction) {
    const { price } = req.body;
    let preference = {
      items: [
        {
          title: "su reserva",
          unit_price: Number(price),
          quantity: 1,
        },
      ],
      back_urls: {
        success: url + "/checkout",
        failure: url + "/checkout",
        pending: url + "/checkout",
      },
      auto_return: "approved",
    };
    mercadopago.preferences
      .create(preference)
      .then(function (mpres: any) {
        console.log("mp response", mpres.body);
        return res.json(mpres.body);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  },

  async getFeedback(req: Request, res: Response, next: NextFunction) {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  },
};
