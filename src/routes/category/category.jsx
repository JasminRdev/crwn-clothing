import { useParams } from "react-router-dom";
import { Fragment,useEffect , useState} from "react";
import ProductCard from "../../components/product-card/product-card.component";
import './category.styles.scss'
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Category = () => {
    const { category } = useParams();
    console.log("render/re-render category")
    const categoriesMap = useSelector(selectCategoriesMap)
   const [products, setProducts]= useState(categoriesMap[category]);

   useEffect(()=> {
       console.log("effect fired, setProducts")
    setProducts(categoriesMap[category])
   }, [category, categoriesMap])

   return(
    <Fragment>
        <h2 className="category-title">{category.toUpperCase()}</h2>
        <div className="category-containers">
        {products &&
            products.map((product)=> (
                <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
    </Fragment>
        )
    }

export default Category