import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [persist, setPersist] = useState(JSON.parse(
        localStorage.getItem("persist")
        ) || false);

    return (
        <UserContext.Provider value={{ user, setUser, persist, setPersist }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;