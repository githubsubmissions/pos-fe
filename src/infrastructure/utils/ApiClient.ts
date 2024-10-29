import axios, {AxiosInstance} from 'axios';

const server_endpoint = process.env.NODE_ENV === "development" ?
  process.env.REACT_APP_DEV_BACKEND_API_URL :
  process.env.REACT_APP_USE_PROD_DOCKER_BACKEND === "true" ?
    process.env.REACT_APP_PROD_DOCKER_BACKEND_API_URL :
    process.env.REACT_APP_PROD_BACKEND_API_URL

console.log(server_endpoint)
console.log(process.env.NODE_ENV)

export const createApiClient = (auth: string | null = '') => {
  return axios.create({
    baseURL: server_endpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth,
    },
  });
};

// Create the initial apiClient object
let apiClient = createApiClient(localStorage.getItem('token'));

export const updateApiClientHeaders = (headers: any) => {

  // Update the authorization header with the provided token
  apiClient.defaults.headers.Authorization = headers.Authorization;

  // Update any other headers as needed
  // apiClient.defaults.headers.<headerName> = headers.<headerValue>;
};

export const updateAuthorization = (apiClient: AxiosInstance, authorization: string) => {
  apiClient.defaults.headers.Authorization = authorization;
};

export default apiClient;
