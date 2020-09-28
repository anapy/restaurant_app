import {authFilter} from "../filters/auth.filter"

module.exports = (app: any) => {
  const users = require("../controllers/user_controller.ts");

  // Create a new Item
  app.post("/register", users.create);

  // Retrieve all Items
  app.get("/users", users.findAll);

  // Retrieve a single Item with itemId
  app.get("/users/:userId", users.findOne);
};