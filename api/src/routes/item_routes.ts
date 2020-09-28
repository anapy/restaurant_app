import {authFilter} from "../filters/auth.filter"

module.exports = (app: any) => {
  const items = require("../controllers/item_controller.ts");

  // Retrieve all Items
  app.get("/menu", items.findAll);

  // Retrieve a single Item with itemId
  app.get("/items/:itemId", items.findOne);
};