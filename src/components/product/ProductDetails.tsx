import { useNavigate, useParams } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { baseURL, fetchProducts, fetchSingleProducts } from '../../redux/slices/products/productSlice'
import { fetchCategory } from '../../redux/slices/category/categorySlice'

import { faClose, faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductDetails = () => {
  //to get name from path /products/{name}
  const { id } = useParams()
  //from name can fetch the data from store
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const { singlePageProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  console.log('singlePageProduct',singlePageProduct);
  const { categoryArray } = useSelector((state: RootState) => state.categoriesReducer)

  // const singlePage = async (id: string) => {
  //   try {
  //     await fetchSingleProducts(id)
  //   } catch (error) {
      
  //   }
  // }

  useEffect(() => {
    //fetch all data on store then fetch single page because when user refresh the page not remove all data on screen
    try {
      const ID = String(id)
      dispatch(fetchProducts()).then(() =>  fetchSingleProducts(ID))
      dispatch(fetchCategory())
      // fetchSingleProducts(ID)
      console.log(fetchSingleProducts(ID));
    } catch (error) {
      
    }
  }, [])

  const getCategoryNameById = (categoryId: string) => {
    const category = categoryArray.find((categoryTable) => categoryTable._id === categoryId)
    const categoryName = !category ? 'Not Found' : category.name
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
            {singlePageProduct.categories &&
              singlePageProduct.categories
                .map((categoryId) => getCategoryNameById(categoryId))
                .join(' || ')}
     {/* <p>categories: {singlePageProduct.categories ? singlePageProduct.categories.map((category) => category.name).join(','): 'No categories'}</p> */}

          </p>

          <p className="sizeDetail">
            {' '}
          </p>
        </div>
      </div>
   
  )
}

export default ProductDetails
