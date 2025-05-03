import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [persist, setPersist] = useState(JSON.parse(
    localStorage.getItem('persist'),
  ) || false);

  return (
    <UserContext.Provider value={{
      user, setUser, persist, setPersist,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
