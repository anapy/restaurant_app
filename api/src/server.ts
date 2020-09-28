import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const port = process.env.NODE_PORT || 4848;


export function run () {
  const app = express();

  app.use(cookieParser());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://api.adfoodio.site:3000");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  })

  // parse requests of content-type: application/json
  app.use(bodyParser.json());

  app.get("/", function(_, res) {
    res.type('text/plain').send("Food can be served");
  });

  require("./routes/item_routes.ts")(app);
  require("./routes/deal_routes.ts")(app);
  require("./routes/order_routes.ts")(app);
  require("./routes/user_routes.ts")(app);
  require("./routes/login_routes.ts")(app);

  return app.listen(port, () => {
    // Port is forwarded by docker to 80.
    console.log(`Listening on http://localhost:${port}`);
  })
}

if(process.env.NODE_ENV !== 'testing') {
  run();
}


