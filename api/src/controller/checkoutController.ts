
import { Request, Response, NextFunction } from "express";
const mercadopago = require("mercadopago")
mercadopago.configurations.setAccessToken("TEST-8695737586875441-070217-1a21ea4563387f8660808cc98999157e-38774956")
//console.log('preferences', mercadopago.preferences)


module.exports = {
    async postCheckout(req:Request, res:Response, next:NextFunction){
        const {  price } = req.body
        let preference = {
                items: [{
                    title: "su reserva",
                    unit_price: Number(price),
                    quantity: 1,
                }],
                back_urls: {
                    "success": "http://localhost:3001/feedback",
                    "failure": "http://localhost:3001/feedback",
                    "pending": "http://localhost:3001/feedback"
                },
                auto_return: 'approved',
        };
        mercadopago.preferences.create(preference)
        .then( function(mpres:any) {
               console.log('mp response', mpres.body)
               return res.json(mpres.body)
           
        })
        .catch(function(error:any) {
           console.log(error)
        })


    },

    async getFeedback(req:Request, res:Response, next:NextFunction){

        res.json({
         Payment: req.query.payment_id,
         Status: req.query.status,
         MerchantOrder: req.query.merchant_order_id
       })
    
      }

}





















