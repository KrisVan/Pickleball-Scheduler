import { useContext } from "react";
import UserContext from "../context/UserProvider.jsx";

const useUser = () => {
  return useContext(UserContext);
}

export default useUser;