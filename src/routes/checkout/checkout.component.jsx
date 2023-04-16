import { useContext, useEffect, useState } from 'react';

import {CartContext} from '../../context/cart.context'
import './checkout.styles.scss'
 const Checkout = () => {
    
    const { cart, setCart } = useContext(CartContext)

    const [totalPrice, setTotalPrice] = useState()

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

    return (
        <div className="cart-container">
            <div className="title">
                <span>Product</span>
                <span>Description</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Remove</span>
            </div>
            <div className="items">
            {
                cart.map((e) => (
                <div className="item">
                    <img src={e.imageUrl} alt={`${e.name}`}></img>
                    <span>{e.name}</span>
                    <div className="quantityChanger">
                        <span>
                            <h1 onClick={() => changeQuantity("decrease",e.id)}>&lt;</h1>
                        </span>
                        <span>
                            {e.quantity}
                        </span>
                        <span>
                            <h1 onClick={() => changeQuantity("increase",e.id)}>&gt;</h1>
                        </span>

                    </div>
                    <span>{e.price*e.quantity}</span>
                    <span>
                    <h1 className='x' onClick={() => del(e.id)}>&#10005;</h1>
                    </span>
                </div>
                    
                ))
            }
                
            </div>
            <span className='total'>
              Total: ${totalPrice}
            </span>
           
        </div>
    )
}

export default Checkout