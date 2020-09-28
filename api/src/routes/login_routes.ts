module.exports = (app: any) => {
  const login = require("../controllers/login_controller.ts");

  // Create a new Item
  app.post("/login", login.authenticate);

};