import {redisClient} from "../config/redis.config";


// Authentication filter
const authFilter = (req:any, res:any, next:any) => {
  const token = req.headers['AdfoodioToken'];
  next();
  // token exists
  redisClient.get(token, (err:any, result:any) => {
    if(err) {
      console.log('Redis error finding token: ', err);
    } else if(result == undefined) {
      res.status(401).send({
        message: 'Unauthorized'
      });
    } else {
      req.userAuth = result;
      next();
    }
  });

};

export {authFilter};