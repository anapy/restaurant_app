import React, { useEffect, useState } from 'react';
import getMenuFromApi from '../services/api_menu';
import FoodMenu from './FoodMenu';
import Header from './Header';
import '../stylesheets/App.scss';
import createOrder from '../services/create_order';
import getOrder from '../services/get_order';


const Main = () => {
  const[menu, setMenu] = useState ([]);
  const[types, setTypes] = useState(new Set());
  const[sortedItems, setSortedItems] = useState({});
  const[itemsList, setItemsList] = useState([]);
  const[order, setOrder] = useState({
    user_id: 1,
    items: [],
  });
  const[orderInProcess, setOrderInProcess] = useState();

  useEffect(() => {
    if(order.items !== undefined && order.items.length !== 0){
      createOrder(order).then((orderData:any) => {
        getOrder(orderData.id).then((order:any) => {
          setOrderInProcess(order);
        });
      });
    }
  }, [order]);

  //Filter the available types for the itemsList in the menu
  const filterTypes = (menu: any) => {
    let allTypes: Set<string> = new Set();
    for(let item of menu) {
      allTypes.add(item.type)
    }
    return allTypes;
  };

  //Filter itemsList by type
  const filterItems = (menu:any, types:any) => {
    let itemsList: any = {};
    for(let type of types) {
      itemsList[type] = menu.filter((item: any) => item.type === type);
    }
    return itemsList;
  }
  //Saves in the state the item added or substracted by user
  const handleItems = (idGiven:string, quantity: number) => {
    const id = parseInt(idGiven);
    const itemIndex = getItemIndex(id, quantity);
    setItemsList((prevState:any) => {
      let aux = prevState ? prevState : [];
      if(itemIndex === -1) {
        aux.push({id: id, quantity:1});
      } else {
        aux[itemIndex].quantity = aux[itemIndex].quantity + quantity;
      }
      return aux;
    },
  )};

  //Finds the index of the item added or substracted if it's already on the itemList
  const getItemIndex = (id:number, quantity: number) => {
    let item = itemsList.find((item:any) => item.id === id);
    if(item){
      const index = itemsList.indexOf(item);
      return index;
    }
    return -1;
  }

  const deleteQuantityZeroItems = () => {
    const moreThanZeroItems = itemsList.filter((item:any) => item.quantity > 0);
    return moreThanZeroItems;
  }

  const handleOrder = () => {
    const orderItems = deleteQuantityZeroItems();
    setOrder((prevState:any) => {
      return {
        ...prevState, items:orderItems
      }
    })
    setTimeout(function(){ alert("Your food is ready"); }, 5000);
  }

  //Gets data from Api about available menu
  useEffect(() => {
    getMenuFromApi().then(data => {
      setMenu(data);
      setTypes(filterTypes(data));
    });
  }, []);

  useEffect(() => {
    setSortedItems(filterItems(menu, types));
  }, [menu, types]);

  return (
    <div className="Main">
      <Header/>
        <h2 className="menuTitle">Menu</h2>
        {Object.keys(sortedItems).length !== 0 &&
          <FoodMenu
          sortedItems={sortedItems}
          handleItems={handleItems}
          itemsList={itemsList}
          handleOrder={handleOrder}
          orderInProcess={orderInProcess}/>
        }
    </div>
  );
}

export default Main;
