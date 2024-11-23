import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({ isDark: true });

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ isDark: true }}>
      {children}
    </ThemeContext.Provider>
  );
}