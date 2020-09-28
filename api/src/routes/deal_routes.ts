module.exports = (app: any) => {
  const deals = require("../controllers/deal_controller.ts");

  // Retrieve all Deals
  app.get("/deals", deals.findAll);

  // Retrieve a single Deal with itemId
  app.get("/deals/:dealId", deals.findOne);
};