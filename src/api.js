import axios from 'axios';
import { useState } from 'react';
import config from './config';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('adminToken'); 

  const authHeaders = { authorization: token };
  const baseURL = `${config.baseURL}`

  const fetchData = async (url, method = 'get', data = null) => {
    setLoading(true);
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await axios.get(baseURL+url, { headers: authHeaders });
          break;
        case 'post':
          response = await axios.post(baseURL+url, data, { headers: authHeaders });
          break;
        case 'put':
          response = await axios.put(baseURL+url, data, { headers: authHeaders });
          break;
        case 'delete':
          response = await axios.delete(baseURL+url, { headers: authHeaders });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading,setLoading, error, fetchData,token };
};

export default useApi;
