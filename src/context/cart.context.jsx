import { createContext, useEffect, useState } from "react";

const addCartItem = (cart, productToAdd, setTotalCount) => {

    const exist = cart.find((cartItem) => 
    cartItem.id === productToAdd.id
    )

    if(exist) {
        const other = cart.map((cartItem) =>
        cartItem.id === productToAdd.id
        ? {...cartItem, quantity: cartItem.quantity +1 }
        : cartItem )
        
        return other
    }
    const newCart =  [...cart, {...productToAdd, quantity:1}];

    return newCart;
}   


export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cart: [],
    addItemToCart: () => {},
    totalCount: 0,
    setTotalCount: () => {}
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    console.log(cart)

    useEffect(()=> {
        const newCount = cart.reduce((total, item) => total + item.quantity, 0)
        setTotalCount(newCount)
    }, [cart])
    
    const addItemToCart = (productToAdd) => {
        setCart(addCartItem(cart, productToAdd, setTotalCount))
    }

    const value = {cart, setCart, isOpen, setIsOpen, addItemToCart, totalCount}
    

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}