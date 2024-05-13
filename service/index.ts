const API_URL = '/api';


const API_SERVICES = {
  users: `${API_URL}/users`,
  roles: `${API_URL}/roles`,
  materiales: `${API_URL}/materiales`,
  inventories: `${API_URL}/inventories`,
};

const fetcher = (url:string) => fetch(url).then((res)=>res.json());
export {API_SERVICES,  fetcher};