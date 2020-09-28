const ENDPOINT =
  'http://api.adfoodio.site/order';

const createUser = async (json:any) => {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  return response.json();
}

export default createUser;
