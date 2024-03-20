const API_URL = 'https://demo7771177.mockable.io/destination';


const API_SERVICES = {
  users: `${API_URL}`,
};

const fetcher = (url:string) => fetch(url).then((res)=>res.json());
export {API_SERVICES,  fetcher};