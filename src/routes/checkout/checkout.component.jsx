import { useContext } from 'react';

import {CartContext} from '../../context/cart.context'
import './checkout.styles.scss'
 const Checkout = () => {
    
    const { changeQuantity, cart, del, totalPrice } = useContext(CartContext)

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
                    <span>{e.price}</span>
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