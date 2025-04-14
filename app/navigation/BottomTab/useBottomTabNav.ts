import {useState, useEffect} from 'react';

export const useBottomTabNav = () => {
  const [currentRoute, setCurrentRoute] = useState('Home');
  const focusedId = currentRoute;

  useEffect(() => {
    if (focusedId !== '' && focusedId !== 'Home') {
      setCurrentRoute('Home');
    }
  }, []);
  return {
    focusedId,
  };
};
