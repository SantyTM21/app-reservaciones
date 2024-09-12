'use client';
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext<any>(undefined);

const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [correo, setCorreo] = useState(''); // Define tu estado inicial

  return <MyContext.Provider value={{ correo, setCorreo }}>{children}</MyContext.Provider>;
};

export { MyContext, MyProvider };

export function useMyContext() {
  return useContext(MyContext);
}
