import React, { useState } from 'react';
import '../stylesheets/itemDetails.scss';
import { Button } from '@material-ui/core';

const ItemDetails = (props:any) => {
  const[quantity, setQuantity] = useState(0);

  //Let button to increase items quantity
  const handleAddButton = (ev:any) => {
    setQuantity(quantity + 1);
    let id = ev.currentTarget.id;
    props.handleItems(id, 1);
  }

  //Let button to decrease items quantity until 0
  const handleSubstractButton = (ev:any) => {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
    let id = ev.currentTarget.id;
    const substract = quantity === 0 ? 0 : -1;
    props.handleItems(id, substract);
  }

  return (
    <div id={`item ${props.id}`}>
      <h3 className="itemName">{props.description}</h3>
      <p className="itemPrice">{props.price} €</p>
      <div>
        <Button variant="contained" className="addButon" color="primary" onClick={handleAddButton} id={props.id}>+</Button>
        <span className="quantity">{quantity}</span>
        <Button variant="contained" className="removeButon"color="primary" onClick={handleSubstractButton} id={props.id}>-</Button>
      </div>
    </div>
  );
}

export default ItemDetails;