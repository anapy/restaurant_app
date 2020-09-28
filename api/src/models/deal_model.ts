const sql = require("./db.ts");

export default class Deal {
  description: string;
  type: string;
  deal: string;

  constructor(description: string, type:string, deal: string) {
    this.description = description;
    this.type = type;
    this.deal = deal;
  }

  static findById = (dealId:number, result:any) => {
  let query1 = new Promise((resolve, reject) => {sql.query(`SELECT * FROM deals WHERE id = ${dealId}`,
  (err: Error, res: any) => {
  if (err) {
    console.log("error: ", err);
    return reject(err);
  }
  if (res.length) {
    resolve(res);
  }
  })});

  let query2 = new Promise((resolve, reject) => {sql.query(`SELECT di.menu_item_type, di.quantity FROM deals_items di WHERE di.deal_id = ${dealId}`,
  (err: Error, res: any) => {
  if (err) {
    console.log("error: ", err);
    return reject(err);
  }
  if (res.length) {
    resolve(res);
  }
  })});

  Promise.all([query1, query2]).then((data:any) => {
    let data2 = {...data[0][0], items: data[1]}
    console.log(data[0][0].id);
    result(null, data2);
  })

  };

  static getAll = (result: any) => {
    //Gets all deals from database
    let query1 = new Promise((resolve, reject) => {sql.query(`SELECT * FROM deals`,
    (err: Error, res: any) => {
    if (err) {
      console.log("error: ", err);
      return reject(err);
    }
    if (res.length) {
      resolve(res);
    }
    })});

    //Gets all items related with deals
    let query2 = new Promise((resolve, reject) => {sql.query(`SELECT di.deal_id, di.menu_item_type, di.quantity FROM deals_items di`,
    (err: Error, res: any) => {
    if (err) {
      console.log("error: ", err);
      return reject(err);
    }
    if (res.length) {
      resolve(res);
    }
    })});

    //Send both queries to dabase at the same time
    Promise.all([query1, query2])
    .then((data:any) => {
      let newData: Array<object> = [];
      //filter items by deal
      for(let k = 0; k < data[0].length; k++) {
        newData[k] = data[1].filter((item: any) => item.deal_id === k + 1);
      }
      //include items information deal inside each deal
      for(let k = 0; k < data[0].length; k++) {
        data[0][k] = {...data[0][k], items: newData[k]}
      }
      result(null, data[0]);
    })
  };

}





