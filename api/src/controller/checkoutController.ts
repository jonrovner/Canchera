
import { Request, Response, NextFunction } from "express";
const mercadopago = require("mercadopago")
mercadopago.configurations.setAccessToken("TEST-8695737586875441-070217-1a21ea4563387f8660808cc98999157e-38774956")
console.log(mercadopago.preferences)


module.exports = {

    async postCheckout(req:Request, res:Response, next:NextFunction){

        const { description, price, quantity} = req.body

        let preference = {
                items: [{
                    title: description,
                    unit_price: Number(price),
                    quantity: Number(quantity),
                }],
                back_urls: {
                    "success": "http://localhost:3001/feedback",
                    "failure": "http://localhost:3001/feedback",
                    "pending": "http://localhost:3001/feedback"
                },
                auto_return: 'approved',
        };

        try {
                let mpResponse = await mercadopago.preference.create(preference)
                res.json(mpResponse.data)
            }catch(err){
                console.log(err)
            }


    },

    async getFeedback(req:Request, res:Response, next:NextFunction){


        res.json({
         Payment: req.query.payment_id,
         Status: req.query.status,
         MerchantOrder: req.query.merchant_order_id
       })
    
      }

}





















