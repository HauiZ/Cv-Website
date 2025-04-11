import { createContext, useState } from "react";
export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    email: "",
    name: "",
  }

})

export function AuthWrapper(props) {
  const [auth, setAuth] = useState({
    isAuthenticated: false, 
    user: {
      email: "",
      name: "",
    }
  });
  // ...
  return (
    <AuthContext.Provider value={{
      auth, setAuth
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}