import axios from '../api/axios.jsx';
import useUser from './useUser.jsx';

// Refreshes access token and user data and sets to context
const useRefreshToken = () => {
  const { setUser } = useUser();

  const refresh = async (user) => {
    const response = await axios.get('api/auth/refreshtoken');

    setUser(prev => {
      return {...prev, accessToken: response.data.accessToken}
    })
    return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken;