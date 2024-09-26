import { useState, useEffect } from 'react';

function useApi(url, method = 'GET', body = null ,token = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; 
    fetchData();
  }, [url, method, body, token]);
  

  async function fetchData() {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'token': token }), // Conditionally add Authorization header
      },
      body: method === 'GET' ? null : body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(url, options);
      // console.log("response" , response);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      // console.log("result" , result);
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error,fetchData };
}

export default useApi;
