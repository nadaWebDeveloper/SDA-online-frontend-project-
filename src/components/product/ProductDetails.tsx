import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import {  fetchProducts, findProductById } from "../../redux/slices/products/productSlice"
import { FaHeart , FaCalendar, FaShapes} from "react-icons/fa";

import Error from "../Error"

const ProductDetails = () => {
  //to get name from path /products/{name}
 const {id} = useParams()
  //from name can fetch the data from store
  const navigate = useNavigate()

  const {singlePageProduct,isLoading, error} = useSelector((state: RootState) => state.productsReducer)
  const Dispatch = useDispatch<AppDispatch>()
 
  useEffect(() => {
    //fetch all data on store then fetch single page because when user refresh the page not remove all data on screen
    Dispatch(fetchProducts()).then(() => Dispatch(findProductById(Number(id)))
    )
  }, [])
 
  if(isLoading)
  {return <h1>loading ...</h1>}
  if(error)
  {return <h1>{error}</h1>}

  // console.log(singlePageProduct);

  return (
<>
{singlePageProduct &&
(
  <>
     <div id="Product" className="product">
     <div className="product">
  <div className="product-card">

  <div  className="product-image">
  <button className="btn"><FaCalendar /></button>
  <button className="btn" onClick={()=>{navigate('/')}}><FaShapes /></button>
 <img src={singlePageProduct.image} alt={singlePageProduct.name} className="product-thumb" />
 <button className="card-btn"><FaHeart /></button>
  </div>

  <div className="product-info">
  <h1 className="product-brand">{singlePageProduct.name}</h1>
  <h1 className="product-brand">{singlePageProduct.price}</h1>
  <h1 className="product-short-des">{singlePageProduct.description}</h1>
  <h1 className="actual-price">{singlePageProduct.categories && singlePageProduct.categories.join(', ')}</h1>
  <h1 className="actual-price">{singlePageProduct.sizes && singlePageProduct.sizes.join(', ')}</h1>

  </div>

</div>
  </div>

     </div>
 
</>

)}

</>  )
}

export default ProductDetails