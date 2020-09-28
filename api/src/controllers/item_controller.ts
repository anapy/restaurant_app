import Item from "../models/item_model";

// Retrieve all items from the database.
exports.findAll = (req: any, res: any) => {
  Item.getAll((err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    else res.send(data);
  });
};

// Find a single item with a itemId
exports.findOne = (req: any, res:any) => {
  Item.findById(req.params.itemId, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Item with id ${req.params.itemId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Item with id " + req.params.itemId
        });
      }
    } else res.send(data);
  });
};

