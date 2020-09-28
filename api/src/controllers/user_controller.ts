import User from "../models/user_model";
const bcrypt = require('bcryptjs');

// Create and Save a new user
exports.create = (req: any, res:any) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Encrypt password given by user
  const hashPass = bcrypt.hashSync(req.body.password, 10);

  // Create a User
  const user = new User(req.body.name, req.body.email, hashPass);

  // Save User in the database
  User.create(user, (err: Error, data:any) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all users from the database.
exports.findAll = (req: any, res: any) => {
  User.getAll((err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single user with a userId
exports.findOne = (req: any, res:any) => {
  User.findById(req.params.userId, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};
