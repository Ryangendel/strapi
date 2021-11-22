import React, { useState, useContext } from 'react';
import { useQuery, gql } from '@apollo/client'
export const UserContext = React.createContext();

export const useTheme = () => useContext(UserContext);


const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </UserContext.Provider> 
  );
};

export default UserProvider;
