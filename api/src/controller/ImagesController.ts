import { Response, Request, NextFunction } from "express";
const path = require("path");

module.exports = {
  async getImage(req: Request, res: Response, next: NextFunction) {
    let fileName = req.params.fileName;
    return res.sendFile(fileName, {
      root: path.join(__dirname, "../../uploads"),
    });
  },
};
