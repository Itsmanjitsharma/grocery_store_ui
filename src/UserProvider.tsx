// UserProvider.tsx

import { SetStateAction, createContext, useContext, useState } from "react";

// ... (existing imports)

// Context interface and initial context values
interface UserContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  username: string | null;
  login: (userData: { userRole: string; username: string }) => void;
  logout: () => void;
}

const initialUserContext: UserContextType = {
  isAuthenticated: false,
  userRole: null,
  username: null,
  login: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

export function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialUserContext.isAuthenticated);
  const [userRole, setUserRole] = useState(initialUserContext.userRole);
  const [username, setUsername] = useState(initialUserContext.username);

  const login = (userData: { userRole: SetStateAction<string>; username: SetStateAction<string>; }) => {
    setIsAuthenticated(true);
    setUserRole(userData.userRole);
    setUsername(userData.username);
    localStorage.setItem("auth",'true'); 
    localStorage.setItem("role",userData.userRole.toString());
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
  };

  const contextValue = {
    isAuthenticated,
    userRole,
    username,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
