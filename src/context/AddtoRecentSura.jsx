import React, { createContext, useContext, useState, useEffect } from 'react';

// Create SuraContext
const SuraContext = createContext();

// Create SuraProvider to wrap your application with
export const SuraProvider = ({ children }) => {
  const [sura, setSura] = useState([]);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedSura = JSON.parse(localStorage.getItem('sura'));
    if (storedSura) {
      setSura(storedSura);
    }
  }, []);

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('sura', JSON.stringify(sura));
  }, [sura]);

  const addToSuraRread = (item) => {
    if (!sura.some(existingItem => existingItem.id === item.id)) {
      setSura([...sura, item]);
    }
  };
  

  const removeFromSuraRread = (index) => {
    const updatedSura = [...sura];
    updatedSura.splice(index, 1);
    setSura(updatedSura);
  };

  return (
    <SuraContext.Provider value={{ sura, addToSuraRread, removeFromSuraRread }}>
      {children}
    </SuraContext.Provider>
  );
};

// Custom hook to use SuraContext
export const useRread = () => {
  return useContext(SuraContext);
};
