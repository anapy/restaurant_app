import React from 'react';
import '../stylesheets/order.scss';

const Order = (props:any) => {
  const orderDeals = props.orderInProcess.deals.map((deal:any) => {
    if(deal.quantity > 0){
    return (
      <li className="deals_order">
        <h3 className="itemName">{deal.description}</h3>
        <p className="deals_quantity">Quantity applied = {deal.quantity}</p>
      </li>
    )
    }
  });
  const orderItems = props.orderInProcess.items.map((item:any) => {
    return (
      <li className="items_order">
        <h3 className="itemName">{item.description}</h3>
        <p className="itemPrice">{item.price} € X{item.quantity}</p>
      </li>
    )
  });

  return (
    <div className="order">
      <h3 className="order_title">Ticket</h3>
      <ul className="orderItems">
        {orderItems}
      </ul>
      <ul className="orderDeals">
        {orderDeals}
      </ul>
      <p className="order_price">Price: {props.orderInProcess.price.toFixed(2)}€</p>
    </div>
  );
}

export default Order;