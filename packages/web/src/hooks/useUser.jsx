import { useContext } from 'react';
import UserContext from '../context/UserProvider.jsx';

const useUser = () => useContext(UserContext);

export default useUser;
