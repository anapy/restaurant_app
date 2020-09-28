import User from "../models/user_model";
import crypto from "crypto";
import {redisClient} from "../config/redis.config";
const redis = require("redis");
const bcrypt = require('bcryptjs');

exports.authenticate = (req: any, res:any) =>  {
  const email = req.body.email;
  const password = req.body.password;

  const userPromise = new Promise((resolve, reject) => {
    User.findByEmail(email, ((err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with email ${email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + email
        });
      }
    } else resolve(data);
  }))});

  userPromise.then((user:any) => {
    const userDbHash = user[0].password;
    let isValidUser = bcrypt.compareSync(password, userDbHash);
    if(isValidUser) {
      const token = crypto.randomBytes(20).toString('hex');
      redisClient.set(token, user[0].id, redis.print);
      res.header('AdfoodioToken', token);
      res.cookie('AdfoodioToken', token);
      res.send({
        message: "Authentication success"
      });
    } else {
      res.status(404).send({
        message: "User not found"
      })
    }
  });
}