import { createContext, useState, useEffect } from 'react';

export const PlatformContext = createContext({
  platform: null,
  setPlatform: () => {}
});

export const PlatformProvider = ({ children }) => {
  const [platform, setPlatform] = useState(() => {
    return localStorage.getItem('platform');
  });

  // Sync changes to localStorage
  useEffect(() => {
    if (platform) {
      localStorage.setItem('platform', platform);
    }
  }, [platform]);

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};
