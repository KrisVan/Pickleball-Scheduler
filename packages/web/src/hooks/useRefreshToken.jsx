import axios from '../api/axios.jsx';
import useUser from './useUser.jsx';

const useRefreshToken = () => {
  const { setUser } = useUser();

  const refresh = async (user) => {
    const response = await axios.get('api/auth/refreshtoken');

    setUser(prev => {
      console.log(JSON.stringify(prev));
      console.log(JSON.stringify(response));
      console.log(JSON.stringify(response.data.accessToken));
      return {...prev, accessToken: response.data.accessToken}
    })
    return response.data.accessToken;
  }
  return refresh;
};

export default useRefreshToken;