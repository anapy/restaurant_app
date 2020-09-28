const sql = require("./db.ts");

export default class Order {
  user_id: number;
  price: number;
  items: [object];
  deals: any[];

  constructor(user_id: number, price: number, items: [object], deals: any[]) {
    this.user_id = user_id;
    this.price = price;
    this.items = items;
    this.deals = deals;
  }

  static create = (newOrder: Order, result: any) => {
    const createOrder = new Promise((resolve, reject) => {
    sql.query(`INSERT INTO orders VALUES (NULL, ${newOrder.user_id}, ${newOrder.price})`, (err:any, res:any) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
        return;
      }
      resolve(res.insertId);
    })});

    function createUserOrder(id: number) {
      new Promise ((resolve:any, reject:any) => {
      sql.query(`INSERT INTO users_orders VALUES (${newOrder.user_id}, ${id})`, (err:any, res:any) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      resolve(id);
    })})};

    function createOrderMenuItems(id: number, items:[any]) {
      for( let item of items) {
        sql.query(`INSERT INTO order_menu_items VALUES (${id}, ${item.id}, ${item.quantity})`, (err:any, res:any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        return;
      })}};

    function createOrderDeal(id: number, deals:any[]) {
      for( let deal of deals) {
        sql.query(`INSERT INTO order_deal VALUES (${id}, ${deal.id}, ${deal.quantity})`, (err:any, res:any) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        return;
      })}};

    let id = 0;
    createOrder
    .then((orderId:any) => {
      id = orderId;
      createUserOrder(orderId)}).then(() => {
      createOrderMenuItems(id, newOrder.items);
      createOrderDeal(id, newOrder.deals);
      result(null, id);
    });
  };

  static findById = (orderId:number, result:any) => {

    //Search in database the order with id given
    let orderQuery = new Promise((resolve, reject) => {sql.query(`SELECT * FROM orders WHERE id = ${orderId}`,
        (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }
        if (res.length) {
          resolve(res);
        }
      })});

    //Search in menu_ and order_menu_items the details of the order with the id given
    let itemQuery = new Promise((resolve, reject) => {
      sql.query(`SELECT omi.quantity, mi.description, mi.price FROM order_menu_items omi, menu_items mi WHERE omi.order_id = ${orderId} && omi.menu_item_id = mi.id`,
      (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }
      if (res.length) {
        resolve(res);
      }
    })});

    //Search in menu_ and order_menu_items the details of the order with the id given
    let dealQuery = new Promise((resolve, reject) => {
      sql.query(`SELECT d.description, d.type, od.quantity FROM order_deal od, deals d WHERE od.order_id = ${orderId} && od.deal_id = d.id`,
      (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }
      if (res.length) {
        resolve(res);
      }
  })});

    Promise.all([orderQuery, itemQuery, dealQuery]).then((data:any) => {
      let data2 = {...data[0][0], items: data[1], deals: data[2]}
      result(null, data2);
    });
  };

  static getAllByUserId = (userId:number, result: any) => {
    //Gets all orders from database by the userId given
    let orderQuery = new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM orders WHERE user_id = ${userId}`,
    (err: Error, res: any) => {
      if (err) {
        console.log("error: ", err);
        return reject(err);
      }
      if (res.length) {
        resolve(res);
      }
      })});

      let itemQuery = new Promise((resolve, reject) => {
      sql.query(`SELECT omi.quantity, mi.description, mi.price FROM order_menu_items omi, menu_items mi, orders o WHERE omi.order_id = o.id && mi.id`,
      (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }
        if (res.length) {
          resolve(res);
        }
        })});

      let dealQuery = new Promise((resolve, reject) => {
      sql.query(`SELECT d.description, d.type FROM order_deal od, deals d, orders o WHERE od.order_id = o.id && od.deal_id = d.id`,
      (err: Error, res: any) => {
        if (err) {
          console.log("error: ", err);
          return reject(err);
        }
        if (res.length) {
          resolve(res);
        }
        })});

    Promise.all([orderQuery, itemQuery, dealQuery]).then((data:any) => {
      let data2 = {...data[0][0], items: data[1], deals: data[2]}
      result(null, data2);
    });
    ;
  };
}

module.exports = Order;