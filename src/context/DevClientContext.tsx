import React from "react";
import DevClient from "../pages/api/DevClient";

const DevClientContext = React.createContext<DevClient | null>(null);

const useContextDevClient = (): DevClient | null => {
  return React.useContext(DevClientContext);
};

const DevClientContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const devClient = new DevClient();
  return (
    <DevClientContext.Provider value={devClient}>
      {children}
    </DevClientContext.Provider>
  );
};

export { useContextDevClient, DevClientContextProvider };
