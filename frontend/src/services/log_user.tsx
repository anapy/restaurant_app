const ENDPOINT =
  'http://api.adfoodio.site/login';

const createUser = (json:any) =>
  fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((response) => {
    response.json();
  });

export default createUser;
