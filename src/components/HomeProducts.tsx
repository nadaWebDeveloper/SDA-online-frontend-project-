import { useDispatch, useSelector } from "react-redux";
import ListProducts from "./product/ListProducts";
import { AppDispatch, RootState } from "../redux/store";
import { ChangeEvent, useEffect } from "react";
import { fetchProducts, searchProduct, sortProducts } from "../redux/slices/products/productSlice";
import { Link } from "react-router-dom"
import {  FaHeart } from "react-icons/fa";
import SortProducts from "./product/SortProducts";
import Search from "./Filtering/Search";
import Sort from "./Filtering/Sort";



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
<div>
  <h3>Filter by Price</h3>
  <h3>Filter by Category</h3>
</div>
<div className="filter">
  <Search searchTerm= {searchTerm} handleSearch={handleSearch}/>
{/* <SortProducts /> */}

<Sort optionArr={optionArr} handleSortChange={handleSortChange} />
</div>

<div>
{searchProducts.length > 0 ? 
        (
      <div id="Product" className="product">
      <h2 className="product-category">best selling</h2>
      <button className="pre-btn"></button>
      <button className="nxt-btn"></button>

     {searchProducts.map((product)=> {
      const { id, name,image,description,categories,variants,sizes, price} = product
      return(
        <div className="product-container" key={id}>
        <div className="product-card">
           <div className="product-image">
            <span className="discount-tag">50% off</span>
            <img src={image} className="product-thumb" alt={name} />
            <button className="card-btn"><FaHeart /></button>
          </div>

          <div className="product-info">
            <h2 className="product-brand">{name}</h2>
            <p className="product-short-des">{description}</p>
            <span className="price">{price} $</span>
            <span className="price">{sizes}</span>
            <span className="actual-price">{variants}</span>
            {/* <span className="price">{sizes} RS</span>
            <span className="actual-price">{variants}</span> */}
            <button> Add to Card</button>
            {/* put button inside link cause it's create single page the path change by change product in router like /Home/product/{it change for every product} */}
            {/* single page  by id */}
            <Link to={`/products/${name}/${id}` }>
            <button> Show details</button>
            </Link>

          </div>  
        </div>
      </div>
      )
     })}
    </div>):(<h1>Not Add Products Yet ... </h1>) } 
</div>
    {/* <ListProducts /> */}
</>
)
}

export default HomeProducts