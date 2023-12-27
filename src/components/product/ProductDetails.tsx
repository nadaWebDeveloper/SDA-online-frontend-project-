import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { SingleProducts, clearError } from '../../redux/slices/products/productSlice'

import { faClose, faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductDetails = () => {
  //to get name from path /products/{name}
  const { id } = useParams()
  //from name can fetch the data from store
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { singlePageProduct, error } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const { categoryArray } = useSelector((state: RootState) => state.categoriesReducer)

  useEffect(() => {
      const ID = String(id)
      dispatch(SingleProducts(ID))
  }, [])

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)
    }
}, [error])

  const getCategoryNameById = (categoryId: string) => {
    const id = String(categoryId)
    const category = categoryArray.find((categoryTable) => categoryTable._id === id)
    const categoryName = category ? category.name : 'Not Found'
    return categoryName
  }


  return (
   
      <div className="backDetail">
         {singlePageProduct && (
      <> 
        <div className="wrapper">
          <div className="card">
            <FontAwesomeIcon
              icon={faClose}
              onClick={() => {
                navigate('/storeProducts')
              }}
              className="closeRight"
            />
            <div className="poster">
              <img
                src={singlePageProduct.image as string}
                alt={singlePageProduct.name}
                className="product-thumb"
              />
            </div>
            <FontAwesomeIcon icon={faHeart} className="heartIcon" />
            <FontAwesomeIcon icon={faBasketShopping} className="shopIcon" />
          </div>
        </div>
        <div className="backInfo">
          <h1 className="nameDetail">{singlePageProduct.name}</h1>
          <h2 className="priceDetail">{singlePageProduct.price} SR</h2>
          <p className="">{singlePageProduct.description}</p>

          <p className="categoryDetail">
          Categories:
            {Array.isArray(singlePageProduct.categories)  &&
              singlePageProduct.categories.map((categoryId: string) => getCategoryNameById(categoryId)).join(' || ')}
          </p>

          <p className="sizeDetail">
   
          </p>
        </div>
        </>
        )}
      </div>
     
  )
}

export default ProductDetails
