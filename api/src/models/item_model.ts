const sql = require("./db.ts");

export default class Item {
  description: string;
  price: number;
  type: string;

  constructor(description: string, price: number, type:string) {
    this.description = description;
    this.price = price;
    this.type = type;
  }

  static findById = (itemId:number, result:any) => {
    sql.query(`SELECT * FROM menu_items WHERE id = ${itemId}`, (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found Item with the id
      result({ kind: "not_found" }, null);
    });
  };

  static getAll = (result: any) => {
    sql.query("SELECT * FROM menu_items", (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };
}

module.exports = Item;