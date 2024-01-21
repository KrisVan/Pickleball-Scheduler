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
      console.log("Requst config\n")
      console.log(requestConfig);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      console.log(res);
      setResponse(res.data);
    }
    catch (err) {
      console.log(err.message);
      setError(err.message);
    }
    finally {
      setLoading(false);
    }
  }
  // Runs when component mounts
  useEffect(() => {
    console.log(controller);
    // useEffect cleanup
    return () => controller && controller.abort();
  }, [controller])

  return [response, error, loading, axiosFetch];
}

export default useAxiosFunction
