import Deal from "../models/deal_model";

// Retrieve all deals from the database.
exports.findAll = (req: any, res: any) => {
  Deal.getAll((err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deals."
      });
    else res.send(data);
  });
};

// Find a single deal with a dealId
exports.findOne = (req: any, res:any) => {
  Deal.findById(req.params.dealId, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Deal with id ${req.params.dealId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Deal with id " + req.params.dealId
        });
      }
    } else res.send(data);
  });
};
