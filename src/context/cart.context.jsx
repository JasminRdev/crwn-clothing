import { createContext, useEffect, useReducer} from "react";
import {createAction} from '../utils/reducer/reducer.utils'

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
    setTotalCount: () => {},
    totalPrice: 0,
    setTotalPrice: () => {},
    changeQuantity: () => {}
})

export const CART_ACTION_TYPES = {
    SET_CURRENT_CART: 'SET_CURRENT_CART',
    SET_CART_OPEN: 'SET_CART_OPEN',
    SET_CART_COUNT:'SET_CART_COUNT',
    SET_CART_PRICE:'SET_CART_PRICE',


}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CURRENT_CART:
            return {
                ...state,
                cart: payload
            }
            case CART_ACTION_TYPES.SET_CART_OPEN:
            return {
                ...state,
                isOpen: payload
            }
            case CART_ACTION_TYPES.SET_CART_COUNT:
                return {
                    ...state,
                    totalCount: payload
                }
            case CART_ACTION_TYPES.SET_CART_PRICE:
                return {
                    ...state,
                    totalPrice: payload
                }
            default:
                throw new Error(`Unhandled type ${type} in cartReducer`)
    }

}

const INITIAL_STATE = {
    cart:[],
    isOpen: false,
    totalCount:0,
    totalPrice:0
}

export const CartProvider = ({ children }) => {

    const [{ cart, isOpen, totalCount, totalPrice }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
      );
    
      const setCart = (cart) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CURRENT_CART,cart ));
      };
    
      const setIsOpen = (isOpen) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN,isOpen ));
      };
    
      const setTotalCount = (totalCount) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_COUNT, totalCount
        ));
      };
    
      const setTotalPrice = (totalPrice) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_PRICE, totalPrice
        ));
      };

    useEffect(()=> {
        const newCount = cart.reduce((total, item) => total + item.quantity, 0)
        setTotalCount(newCount)
    }, [cart])
    
    const addItemToCart = (productToAdd) => {
        setCart(addCartItem(cart, productToAdd, setTotalCount))
    }


    useEffect(()=> {
    const newPrice = cart.reduce((total, item) => total + (item.price*item.quantity), 0)
    setTotalPrice(newPrice)

    }, [cart])

     const changeQuantity = (operation, id) => {
        const updatedCart = cart.map(item => {
          if (item.id === id) {
            if (operation === 'increase') {
              item.quantity += 1;
            } else if (operation === 'decrease') {
              item.quantity -= 1;
            }
          }
          return item;
        }).filter(item => item.quantity > 0);
      
        setCart(updatedCart);
      };

    const del = (id) => {
        const updatedCart = cart.map(item => {
            return item;
          }).filter(item => item.id !== id);
        
          setCart(updatedCart);
    }

    const value = {del, changeQuantity, totalPrice, cart, setCart, isOpen, setIsOpen, addItemToCart, totalCount}
    

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}