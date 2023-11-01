import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ChangeEvent, useEffect } from "react";

import { fetchProducts, searchProduct, sortProducts } from "../../redux/slices/products/productSlice";
import { Link } from "react-router-dom"
import Search from "../Filtering/Search";
import Sort from "../Filtering/Sort";
import {  faBasketShopping , faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const  HomeProducts = () => {

  const {products, isLoading, error, searchTerm} = useSelector((state: RootState) => state.productsReducer)
  const Dispatch = useDispatch<AppDispatch>()

  const optionArr = ['name', 'price']
 
  useEffect(() => {
   Dispatch(fetchProducts())
  }, [])
 
  if(isLoading)
  {return <h1>loading ...</h1>}
  if(error)
  {return <h1>{error}</h1>}
 
  const handleSearch =(event: ChangeEvent<HTMLInputElement>)=>{
    const inputValue = event.target.value
    Dispatch(searchProduct(inputValue))
  }

  const searchProducts = searchTerm
  ? products.filter((product) => product.name.toLowerCase().includes
  (searchTerm.toLowerCase()))
  : products
 

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) =>
  {

   const inputValue =event.target.value
   Dispatch(sortProducts(inputValue))

  } 
 

  return (
<>

<div className="filter">
  <div>
  <Search searchTerm= {searchTerm} handleSearch={handleSearch}/> 
  </div>
<div>
<Sort optionArr={optionArr} handleSortChange={handleSortChange} />
</div> 
</div> 


<div className="homePage">
<h1 className="productTitle">best selling</h1>

{searchProducts.length > 0 ? 
        (
      <div id="Product" className="product">

     {searchProducts.map((product)=> {
      const { id, name,image,price} = product
      return(
        <div className="product-container" key={id}>
        <div className="product-card">


           <div className="product-image">
           <Link to={`/products/${name}/${id}` }>
            <span className="discount-tag">50% off</span>
            <img src={image} className="product-thumb" alt={name} />
            </Link>
            <div className="div-card-btn">
            <FontAwesomeIcon icon={faBasketShopping} className="card-btn" />
            </div>
          </div>


          <div className="product-info">
           
            <h4 className="product-brand">{name}</h4>
            <span className="price">{price} RS</span> 
              <span className="actual-price">2000 RS</span> 
             {/* put button inside link cause it's create single page the path change by change product in router like /Home/product/{it change for every product}
             single page  by id */}

           </div>  
        </div>
      </div>
      )
     })}
    </div>):
    (<h1>Not Add Products Yet ... </h1>) } 
</div> 
   
</>
)
}

export default HomeProducts