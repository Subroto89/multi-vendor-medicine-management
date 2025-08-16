import { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
const ThemeContext = createContext();

// Create the Provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // 1. Check for a saved theme in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }

    // 2. Check the user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Effect to update the body class whenever the theme state changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // The value provided to components
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context easily
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};