import './category-preview.styles.scss'
import ProductCard from '../product-card/product-card.component'
import { useNavigate } from 'react-router-dom';

const CategoryPreview = ({ title, products }) => {
    let navigate = useNavigate(); 


    const pathname = window.location.pathname 

    const handleClick = () => {
        navigate(`${pathname}/${title}`);
  };

    return ( 
        <div className="category-preview-container">
            <h2>
                <span className="title"  onClick={handleClick}>{title.toUpperCase()}</span>
            </h2>
            <div className="preview">
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    )
}

export default CategoryPreview