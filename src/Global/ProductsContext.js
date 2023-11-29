import React, { createContext, useEffect, useState } from 'react';
import { db } from '../Config/Config';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('Products').onSnapshot((snapshot) => {
      const updatedProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(updatedProducts);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
