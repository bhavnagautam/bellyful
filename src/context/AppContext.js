import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [headerState, setHeaderState] = useState(null);

  const updateHeader = (newState) => {
    setHeaderState(newState);
  };

  return (
    <AppContext.Provider value={{ headerState, updateHeader }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
