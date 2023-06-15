import {createContext} from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const productsContext = createContext({});

export function ProductsContextProvider({children}) {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState('cart', {
        defaultValue: []
    });
    return (
        <productsContext.Provider value={{selectedProducts, setSelectedProducts}}>{children}</productsContext.Provider>
    );
}