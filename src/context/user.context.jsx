import { createContext, useState } from "react";

//actual value that i want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null    
})


//user provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}