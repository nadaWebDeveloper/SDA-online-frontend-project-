import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { SingleProducts, baseURL, fetchProducts } from '../../redux/slices/products/productSlice'
import { fetchCategory } from '../../redux/slices/category/categorySlice'

import { faClose, faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductDetails = () => {
  //to get name from path /products/{name}
  const { id } = useParams()
  //from name can fetch the data from store
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [singleproduct, setSingleproduct] = useState({});

  const { singlePageProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  console.log('singlePageProduct',singlePageProduct);

  const { categoryArray } = useSelector((state: RootState) => state.categoriesReducer)


  useEffect(() => {
 
      const ID = String(id)
      dispatch(SingleProducts(ID))
      fetchProducts()

  }, [])

  const getCategoryNameById = (categoryId: string) => {
    const id = String(categoryId)
    const category = categoryArray.find((categoryTable) => categoryTable._id === id)
    const categoryName = category ? category.name : 'Not Found'
    return categoryName
  }

  if (isLoading) {
    return <h1>loading ...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
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
                src={`${baseURL}/${singlePageProduct.image}`}
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
            {singlePageProduct.categories &&
              singlePageProduct.categories
                .map((categoryId: string) => getCategoryNameById(categoryId))
                .join(' || ')
                }
          </p>

          <p className="sizeDetail">
            {' '}
          </p>
        </div>
        </>
        )}
      </div>
     
  )
}

export default ProductDetails
