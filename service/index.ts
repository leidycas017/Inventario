const API_URL = '/api';


const API_SERVICES = {
  users: `${API_URL}/users`,
  roles: `${API_URL}/roles`,
};

const fetcher = (url:string) => fetch(url).then((res)=>res.json());
export {API_SERVICES,  fetcher};