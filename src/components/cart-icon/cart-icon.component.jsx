import { useContext } from 'react';

import {CartContext} from '../../context/cart.context'


import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'


const CartIcon = () => {
    
    const { isOpen, setIsOpen, totalCount } = useContext(CartContext)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }


    return(
        <div className="cart-icon-container">
            <ShoppingIcon className='shopping-icon' onClick={handleClick} />
            <span className='item-count'>{totalCount}</span>
        </div>
    )
}

export default CartIcon