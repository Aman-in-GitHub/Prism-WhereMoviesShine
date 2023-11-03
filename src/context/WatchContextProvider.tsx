import { createContext, useContext, useState } from 'react';

const WatchProviderContext = createContext('movie');

export function WatchContextProvider({ children }) {
  const [media, setMedia] = useState('movie');

  return (
    <WatchProviderContext.Provider value={{ media, setMedia }}>
      {children}
    </WatchProviderContext.Provider>
  );
}

export const useMedia = () => {
  const context = useContext(WatchProviderContext);

  return context;
};
