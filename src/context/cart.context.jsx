import { createContext, useState } from "react";


export const CartContext = createContext({
    cart: []
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const value = {cart, setCart, isOpen, setIsOpen}
    

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}