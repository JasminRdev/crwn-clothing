import { Fragment, useContext } from 'react';
// import {UserContext} from '../../context/user.context'
import {CartContext} from '../../context/cart.context'
import { Outlet , Link } from 'react-router-dom'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import { useSelector } from 'react-redux';
import {selectCurrentUser} from '../../store/user/user.selector'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent  as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles.scss'

const Navigation = () => {
   const currentUser = useSelector(selectCurrentUser)
    const { isOpen } = useContext(CartContext)


    return (
      <Fragment>
            <div className="navigation">
            <Link className="logo-container" to="/" >
                <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop" >
                    SHOP
                </Link>
                {currentUser ? (
                    <span className="nav-link" onClick={signOutUser} >SIGN OUT</span>
                ) : (
                    <Link className="nav-link" to='/auth'>SIGN IN</Link>
                )}
                <CartIcon  />
            </div>
            { isOpen && <CartDropdown />}
            </div>
       <Outlet />
      </Fragment>
    )
  }


  export default Navigation;