const sql = require("./db.ts");

export default class User {
  name: string;
  email: string;
  password: string;


  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;

  }

  static create = (newUser: User, result: any) => {
    sql.query("INSERT INTO users SET ?", newUser, (err:string, res:any) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId});
    });
  };

  static findById = (userId:number, result:any) => {
    sql.query(`SELECT id, name, email, password FROM users WHERE id = ${userId}`, (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  static findByEmail = (userEmail:string, result:any) => {
    sql.query(`SELECT id, name, email, password FROM users WHERE email = '${userEmail}'`, (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };


  static getAll = (result: any) => {
    sql.query("SELECT id, name, email, password FROM users", (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("users: ", res);
      result(null, res);
    });
  };
}

module.exports = User;