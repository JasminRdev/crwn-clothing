import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

import SHOP_DATA from '../data'

export const ProductContext = createContext({
    products: []
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])

    //set new values in db
    // useEffect(() => {
    //     addCollectionAndDocuments('categories' , SHOP_DATA)
    // },[])
    const value = {products}

    return(
        <ProductContext.Provider value={value} >{children}</ProductContext.Provider>
    )
}