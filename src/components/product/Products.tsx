import { useDispatch, useSelector } from "react-redux"
import { ChangeEvent, useEffect } from "react"

import AdminSideBar from "../admin/AdminSideBar"
import { AppDispatch, RootState } from "../../redux/store"
import { fetchProducts, searchProduct } from "../../redux/slices/products/productSlice"
import { FaEdit, FaHeart } from "react-icons/fa";


const Products = () => {

 const {products, isLoading, error, searchTerm} = useSelector((state: RootState) => state.productsReducer)
 const Dispatch: AppDispatch = useDispatch()

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





  return (
<>

  <AdminSideBar />
  
 

  {searchProducts.length > 0 ? 
        (
      <div id="Product" className="product">
      <h2 className="product-category">best selling</h2>
      <button className="pre-btn"></button>
      <button className="nxt-btn"></button>

      <div>
<h3>search by Price</h3>
<input type="text" name= "search" placeholder="Search" value={searchTerm} onChange={handleSearch} />

</div>

     {searchProducts.map((product)=> {
      const { id, name,image,description,categories,variants,sizes} = product
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
            <span className="price">{sizes}</span>
            <span className="actual-price">{variants}</span>
            {/* <span className="price">{sizes} RS</span>
            <span className="actual-price">{variants}</span> */}
             <button className="card-btn">Delete</button>
            <button className="card-btn"><FaEdit /></button>
          </div>  
        </div>
      </div>
      )
     })}
    </div>):(<h1>Not Add Products Yet ... </h1>) } 
  
</>  )
}

export default Products