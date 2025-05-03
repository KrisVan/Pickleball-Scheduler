import useAxiosPrivate from './useAxiosPrivate';
import useUser from './useUser';

// Clear user state and logout user info in backend
const useLogout = () => {
  const { setUser } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setUser({});
    try {
      const response = await axiosPrivate.delete('api/auth/logout');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
