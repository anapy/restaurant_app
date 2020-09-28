import {authFilter} from "../filters/auth.filter"

module.exports = (app: any) => {
  const orders = require("../controllers/order_controller.ts");

  // Create a new Order
  app.post("/order", orders.create);

  // Retrieve all Orders
  app.get("/orders/user/:userId", orders.findAll);

  // Retrieve a single Order with itemId
  app.get("/orders/:orderId", orders.findOne);
};