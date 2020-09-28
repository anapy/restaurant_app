import Order from "../models/order_model";
import item from "../models/item_model";
import deal from "../models/deal_model";

//Create and Save a new order
exports.create = (req: any, res:any) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  //Gets all items from the menu
  let menuPromise = new Promise((resolve: any, reject: any) => {
    item.getAll((err:any, data:any) => {
      if(err) {
        console.log(err);
        return reject(err)
      }
      resolve(data);
    })})

  //Gets all deals available
  let dealPromise = new Promise((resolve: any, reject: any) => {
    deal.getAll((err:any, data:any) => {
      if(err) {
        console.log(err);
        return reject(err)
      }
      resolve(data);
    })})

  let dessertType = 'dessert';
  let mainType = 'main';
  let drinkType = 'drink';
  //Search for available deals according to orders
  let dealSearcher = (items: any, menu: any, dealsList:any)  => {
    //First sort by item type
    let dessert: number = 0;
    let main: number = 0;
    let drink:number = 0;
    for(let item of items) {
      let menuItem = menu.find((menuItem: any) => menuItem.id === item.id);
      if(menuItem.type === dessertType) {
        dessert = dessert + item.quantity;
      } else if(menuItem.type === drinkType) {
        drink = drink + item.quantity;
      } else if (menuItem.type === mainType) {
        main = main + item.quantity;
      }
    }
    let totalItems = dessert + main + drink;
    let deals: Array<any> = [];
    let i = 0;
    for(let deal of dealsList) {
      deals[i] = {id: deal.id, type: deal.type, deal: deal.deal};
      for(let item of deal.items) {
        if(item.menu_item_type === mainType) {
          deals[i] = {...deals[i], main: item.quantity};
        } else if(item.menu_item_type === drinkType) {
          deals[i] = {...deals[i], drink: item.quantity};
        } else if (item.menu_item_type === (dessertType)) {
          deals[i] = {...deals[i], dessert: item.quantity};
        }
        deals[i] = {...deals[i], quantity: 0};
      }
      i++;
    };

    //Second find applicable deals
    let index = 0;
    while(main > 0 && drink > 0) {
      //Hunger offer
      if(dessert >= deals[1].dessert && main >= deals[1].main && drink >= deals[1].drink) {
        let hungerOffers = 0;
        while(dessert >= deals[1].dessert && main >= deals[1].main && drink >= deals[1].drink){
          main = main - deals[1].main;
          drink= drink - deals[1].drink;
          dessert = dessert - deals[1].dessert;
          hungerOffers++;
        }
        deals[1]= {...deals[1], quantity: deals[1].quantity + hungerOffers},
        index++;
      } else if (main >= deals[0].main && drink >= deals[0].drink) {
        if(main > drink) {
          deals[0]= {...deals[0], quantity: deals[0].quantity + drink},
          main = main - drink;
          drink = 0;
          index++;
        } else {
          deals[0]= {...deals[0], quantity: deals[0].quantity + main},
          drink = drink - main;
          main = 0;
          index++;
        }
      }
    }
    return deals;
  }
  //Calculate price and create order
  Promise.all([menuPromise, dealPromise])
  .then((result:any) => {
    let deals = dealSearcher(req.body.items, result[0], result[1]);
    let totalPrice = 0;
    //First check if there's any deal that affects the purchase
    //Option A -- No deals
    if(deals.length === 0) {
      for(let orderItem of req.body.items) {
        const element = result[0].find((menuItem: any) => menuItem.id === orderItem.id);
        totalPrice = totalPrice + (element.price * orderItem.quantity);
      }
    //Option B -- Deals
    } else {
      let newItems = [];
      //Select items with deal and delete the others
      for(let item of req.body.items) {
        let menuItem = result[0].find((menuItem: any) => menuItem.id === item.id);
        newItems.push({...item, type: menuItem.type, price: menuItem.price});
      }
      //Filter items by type and unrolling by quantity to have a list easily deletetable by splice method
      let mainItems = newItems.filter(item => item.type === mainType).flatMap(x => {
        let array: any[] = []
        for(let i = 0; i < x.quantity; i++) {
          array.push({...x, quantity:1})
        }
        return array;
      });
      let drinkItems = newItems.filter(item => item.type === drinkType).flatMap(x => {
        let array: any[] = []
        for(let i = 0; i < x.quantity; i++) {
          array.push({...x, quantity:1})
        }
        return array;
      });
      let dessertItems = newItems.filter(item => item.type === dessertType).flatMap(x => {
        let array: any[] = []
        for(let i = 0; i < x.quantity; i++) {
          array.push({...x, quantity:1})
        }
        return array;
      });

    //Generate variables handy for calculating prices for each element
    let discountType = 'discount';
    let fixedType = 'fixed';
    let sumOfferPrices = 0;
    let sumNoOfferPrices = 0;

    //Iterate deals to separate items with special prices from normal prices items
    for(let deal of deals) {
      //Quantify how many items are under a deal price
      let mainDeal = deal.main * deal.quantity;
      let drinkDeal = deal.drink * deal.quantity;
      let dessertDeal = deal.dessert * deal.quantity || 0;
      //Separate by deal type discount or fixed price
      if(deal.type === discountType && deal.quantity > 0) {
        for(let k = 0; k < mainDeal; k++ ) {
          sumOfferPrices = sumOfferPrices + (mainItems[k].price * (1 - deal.deal));
        }
        for(let k = 0; k < drinkDeal; k++ ) {
          sumOfferPrices = sumOfferPrices + (drinkItems[k].price * (1 - deal.deal));
        }
        for(let k = 0; k < dessertDeal; k++ ) {
          sumOfferPrices = sumOfferPrices + (dessertItems[k].price * (1 - deal.deal));
        }
      } else if(deal.type === fixedType && deal.quantity > 0) {
        sumOfferPrices = sumOfferPrices + (deal.quantity * deal.deal)
      }
      //Delete from each array the already
      mainItems.splice(0, mainDeal);
      drinkItems.splice(0, drinkDeal);
      dessertItems.splice(0, dessertDeal);
    }
      //Calculate items prices of those that haven't got special prices
      for(let mainItem of mainItems) {
        sumNoOfferPrices = sumNoOfferPrices + (mainItem.price);
      }
      for(let drinkItem of drinkItems) {
        sumNoOfferPrices = sumNoOfferPrices + (drinkItem.price);
      }
      for(let dessertItem of dessertItems) {
        sumNoOfferPrices = sumNoOfferPrices + (dessertItem.price);
      }
      //Sum all prices: offers + normal prices
      totalPrice = sumOfferPrices + sumNoOfferPrices;
    }

    // Create a Order
    const order = new Order(req.body.user_id, totalPrice, req.body.items, deals);

    // Save Order in the database
    Order.create(order, (err: Error, data:any) => {
      if (err) 
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Order."
        });
      else {
        const order = {id: data}
        res.send(order);
      }
    });
  });
};


// Retrieve all orders from the database.
exports.findAll = (req: any, res: any) => {
  Order.getAllByUserId(req.params.userId, (err: Error, data: any) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Find a single order with a orderId
exports.findOne = (req: any, res:any) => {
  Order.findById(req.params.orderId, (err: any, data: any) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.orderId
        });
      }
    } else
    res.send(data);
  });
};
