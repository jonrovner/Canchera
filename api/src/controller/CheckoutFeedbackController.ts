import { Request, Response, NextFunction } from "express";

module.exports = {

    async getFeedback(req:Request, res:Response, next:NextFunction){


    res.json({
     Payment: req.query.payment_id,
     Status: req.query.status,
     MerchantOrder: req.query.merchant_order_id
   })

  }

}