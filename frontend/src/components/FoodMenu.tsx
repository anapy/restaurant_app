import React from 'react';
import ItemDetails from './ItemDetails';
import Order from './Order';
import { Button } from '@material-ui/core';
import '../stylesheets/FoodMenu.scss';

const MenuList = ((props: any) => {
  let {sortedItems} = props;
  const items = Object.keys(sortedItems).map((type:any) => {
    return (
      <ul className={type} key={type}>
        <h2 className="sectionTitle">{type}</h2>
        {sortedItems[type].map((item:any) => (
          <li className="item" key={item.id}>
            <ItemDetails
            id={item.id}
            description={item.description}
            price={item.price}
            handleItems={props.handleItems}
            itemsList={props.itemsList}
            />
          </li>
        ))}
      </ul>
  )});

  const handleSendOrder = () => {
    props.handleOrder();
  }

  return (
    <div className="foodMenu">
      <div className="menu">
        {items}
      </div>
      <Button variant="contained" className="orderButton" onClick={handleSendOrder} color="primary">Send Order</Button>
      {props.orderInProcess !== undefined &&
        <Order orderInProcess={props.orderInProcess}/>
        }
    </div>
  );
});
export default MenuList;