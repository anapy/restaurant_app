const URL = 'http://api.adfoodio.site/order/';

const getOrder = async (id:any) => {
  const response = await fetch(`http://api.adfoodio.site/orders/${id}`)
  return response.json();
}

export default getOrder;
