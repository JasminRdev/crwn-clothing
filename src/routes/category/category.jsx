import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

import { Fragment,useEffect , useState} from "react";
import Spinner from '../../components/spinner/spinner.component'
import ProductCard from "../../components/product-card/product-card.component";
import './category.styles.scss'

const Category = () => {
    const { category } = useParams();
    
    // const {categoriesMap} = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)

   const [products, setProducts]= useState(categoriesMap[category]);

   useEffect(()=> {
    setProducts(categoriesMap[category])
   }, [category, categoriesMap])

   return(
    <Fragment>
        <h2 className="category-title">{category.toUpperCase()}</h2>
      { isLoading ? (<Spinner/>) :(
      <div className="category-containers">
        {products &&
            products.map((product)=> (
                <ProductCard key={product.id} product={product} />
                ))
            }
            </div> )}
    </Fragment>
        )
    }

export default Category