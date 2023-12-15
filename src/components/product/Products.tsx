import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import {
  baseURL,
  deleteProduct,
  fetchProducts,
  searchProduct
} from '../../redux/slices/products/productSlice'

import SortProducts from './SortProducts'
import Search from '../Filtering/Search'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons'

const Products = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categoryArray } = useSelector(
    (state: RootState) => state.categoriesReducer
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(searchProduct(inputValue))
  }

  const searchProducts = searchTerm
    ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure to Delete Product')) {
      dispatch(deleteProduct(id))
      alert('success deleted  product')
    } else {
      return false
    }
  }

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
    <div>
      {searchProducts.length > 0 ? (      //{searchProducts.length > 0 ? (
        <div>
          <div className="filter">
            <Search searchTerm={searchTerm} handleSearch={handleSearch} />
            <SortProducts />
          </div>

          <div id="Product" className="homePage">
            <Link to="/dashboard/admin/addProduct">
              <FontAwesomeIcon icon={faAdd} className="addProduct" />
              {/* <AddProduct /> */}
            </Link>

            <div className="product">
              {searchProducts.map((product) => {
                const { _id, name, image, price, description } = product
                return (
                  <div className="product-container" key={_id}>
                    <div >
                      <div className="product-imageAdmin">
                        <span className="discount-tag">50% off</span>
                        <img src={`${baseURL}/${image}`} className="product-thumb" alt={name} />
                        <div className="">
                          <FontAwesomeIcon
                            icon={faDeleteLeft}
                            onClick={() => {
                              handleDeleteProduct(_id)
                            }}
                            className="iconAdminProduct"
                          />
                          <Link
                            to="/dashboard/admin/editProduct"
                            state={{
                              _id,
                              name,
                              image,
                              price,
                              description
                            }}>
                            <FontAwesomeIcon icon={faEdit} className="iconAdminProduct1" />
                          </Link>
                        </div>
                      </div>

                      <div className="product-info">
                        <h2 className="product-brand">{name}</h2>
                        <span className="price">{price} RS</span>
                        <br />
                        <b>{description}</b>
                        <br />
                        <p>categories: {product.categories.length > 0  ? product.categories.map((category) => category.name).join(' || '): 'No categories'}</p>
                        {/* <p>{product.categories &&
                         product.categories
                         .map((categoryId) => getCategoryNameById(categoryId))
                         .join(' || ')}</p> */}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <h1> Not Add Products Yet ... </h1>
      )}
    </div>
  )
}

export default Products