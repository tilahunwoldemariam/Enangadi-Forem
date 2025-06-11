import { createContext, useReducer } from "react";

// Create the context
const AuthContext = createContext();

// Provider component
function AuthProvider({ children, reducer, initialState }) {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
