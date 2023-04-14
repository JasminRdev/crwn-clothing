import {Button} from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {CartItem} from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    
    const {cart} = useContext(CartContext)
    
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cart.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
                <Button>GO TO CHECK OUT</Button>
            </div>
        </div>
    )
}

export default CartDropdown