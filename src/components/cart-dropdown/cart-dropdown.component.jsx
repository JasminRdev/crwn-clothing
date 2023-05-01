import {Button} from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import {CartItem} from '../cart-item/cart-item.component';

import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    
    const {cart} = useContext(CartContext)
    const navigate = useNavigate();

    const goToCard = () => {
        navigate('/cart')
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cart.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
                
                </div>
                <Button onClick={goToCard} >CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown