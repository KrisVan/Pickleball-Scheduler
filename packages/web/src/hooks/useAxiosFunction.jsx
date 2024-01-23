import { useState, useEffect } from 'react';

// Callable inside functions
const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const {
      axiosInstance,
      method,
      url,
      requestConfig = {},
    } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
        withCredentials: true,// FIXME: Only login&refresh?
      });
      setResponse(res.data);
      setError('');
    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }
  // Runs when component mounts
  useEffect(() => {
    // useEffect cleanup
    return () => controller && controller.abort();
  }, [controller])

  return [response, error, loading, axiosFetch];
}

export default useAxiosFunction
