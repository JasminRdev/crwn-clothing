import ProductCard from '../../components/product-card/product-card.component';
import {ProductContext} from '../../context/products.context'
import { useContext } from 'react'
import './shop.styles.scss'

const Shop = () =>  {
    const {products}= useContext(ProductContext)

    return(
        <div className='product-container'>
        {products.map((product) => (
           <ProductCard key={product.id} product={product} />
        ))}
        </div>
    )
}

export default Shop;