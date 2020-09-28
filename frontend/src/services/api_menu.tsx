const URL = 'http://api.adfoodio.site/menu';

const getMenuFromApi = async () => {
  const response = await fetch(
    URL, {
      headers: {
       'AdfoodioToken': localStorage["AdfoodioToken"]
      }
    });
  return response.json();
}

export default getMenuFromApi;

