import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect, useState } from "react"
import {  fetchProducts, findProductById } from "../../redux/slices/products/productSlice"
import { fetchCategory } from "../../redux/slices/category/categorySlice"
import { faClose, faBasketShopping , faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductDetails = () => {
  //to get name from path /products/{name}
 const {id} = useParams()
  //from name can fetch the data from store
  const navigate = useNavigate()

  const {singlePageProduct,isLoading, error , products} = useSelector((state: RootState) => state.productsReducer);
  const {categories} = useSelector((state: RootState) => state.categoriesReducer);
  const [focus, setFocus] = useState(false)


  const Dispatch = useDispatch<AppDispatch>()
 
  useEffect(() => {
    //fetch all data on store then fetch single page because when user refresh the page not remove all data on screen
    Dispatch(fetchProducts()).then( () => Dispatch(findProductById(Number(id))) )
    Dispatch(fetchCategory())
  }, [])
 
  if(isLoading)
  {return <h1>loading ...</h1>}
  if(error)
  {return <h1>{error}</h1>}

  // console.log(singlePageProduct);


  const getCategoryNameById = (categoryId: number) => {
    const category = categories.find((categoryTable) => categoryTable.id === categoryId);
    const categoryName = !category? 'Not Found' : category.name 
    return categoryName

  }

  const categorySize = (size: string )=>
{

}
  return (
<>
<div className="backDetail" > 

<div  className="wrapper">
  <div className="card">
  <FontAwesomeIcon  icon={faClose}  onClick={()=>{navigate('/')}} className="closeRight" />
  <div  className="poster">
 <img src={singlePageProduct.image} alt={singlePageProduct.name} className="product-thumb" />
  </div >
 <FontAwesomeIcon icon={faHeart}  className="heartIcon" />
 <FontAwesomeIcon icon={faBasketShopping} className="shopIcon" />
</div>
  </div>


  <div className="backInfo">
  <h1 className="nameDetail">{singlePageProduct.name}</h1>
  <h2 className="priceDetail">{singlePageProduct.price} SR</h2>
  <p className="descDetail">{singlePageProduct.description}</p>
  
  <p className="categoryDetail"> 
    {singlePageProduct.categories && singlePageProduct.categories.map((categoryId) => getCategoryNameById(categoryId)).join(' | ') }
  </p>

  <p className="sizeDetail"> <br /> {singlePageProduct.sizes && singlePageProduct.sizes.join('  |  ')}</p>
  </div>

  </div>




</>  )
}

export default ProductDetails