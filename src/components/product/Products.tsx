import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import {
  deleteProduct,
  fetchProducts,
  searchProduct
} from '../../redux/slices/products/productSlice'

import SortProducts from './SortProducts'
import Search from '../Filtering/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import AddProduct from './AddProduct'

const Products = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

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

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you Delete Product')) {
      dispatch(deleteProduct(id))
      alert('success deleted  product')
    } else {
      return false
    }
  }

  if (isLoading) {
    return <h1>loading ...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      {searchProducts.length > 0 ? (
        <>
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
                const { id, name, image, price, description, variants, sizes, categories } = product
                return (
                  <div className="product-container" key={id}>
                    <div >
                      <div className="product-imageAdmin">
                        <span className="discount-tag">50% off</span>
                        <img src={image} className="product-thumb" alt={name} />
                        <div className="">
                          <FontAwesomeIcon
                            icon={faDeleteLeft}
                            onClick={() => {
                              handleDeleteProduct(id)
                            }}
                            className="iconAdminProduct"
                          />
                          <Link
                            to="/dashboard/admin/editProduct"
                            state={{
                              id,
                              name,
                              image,
                              price,
                              description,
                              variants,
                              sizes,
                              categories
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
                        <p>categories: {categories}</p>
                        <br />
                        <p>variants: {variants}</p>
                        <br />
                        <p>sizes: {sizes}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      ) : (
        <h1> Not Add Products Yet ... </h1>
      )}
    </>
  )
}

export default Products









// <>
// {searchProducts.length > 0 ? (
//         <>
//           <div className="filter">
//             <Search searchTerm={searchTerm} handleSearch={handleSearch} />
//             <SortProducts />
//           </div>

//           <div id="Product" className="homePage">
//             <Link to="/admin/addProduct">
//               <FontAwesomeIcon icon={faAdd} className="addProduct" />
//             </Link>

//             <div className="product">
//               {searchProducts.map((product) => {
//                 const { id, name, image, price, description, variants, sizes, categories } = product
//                 return (
//                   <div className="product-container" key={id}>
//                     <div className="product-card">
//                       <div className="product-imageAdmin">
//                         <span className="discount-tag">50% off</span>
//                         <img src={image} className="product-thumb" alt={name} />
//                         <div className="">
//                           <FontAwesomeIcon
//                             icon={faDeleteLeft}
//                             onClick={() => {
//                               handleDeleteProduct(id)
//                             }}
//                             className="iconAdminProduct"
//                           />
//                           <Link
//                             to="/admin/editProduct"
//                             state={{
//                               id,
//                               name,
//                               image,
//                               price,
//                               description,
//                               variants,
//                               sizes,
//                               categories
//                             }}>
//                             <FontAwesomeIcon icon={faEdit} className="iconAdminProduct1" />
//                           </Link>
//                         </div>
//                       </div>

//                       <div className="product-info">
//                         <h2 className="product-brand">{name}</h2>
//                         <span className="price">{price} RS</span>
//                         <br />
//                         <b>{description}</b>
//                         <br />
//                         <p>categories: {categories}</p>
//                         <br />
//                         <p>variants: {variants}</p>
//                         <br />
//                         <p>sizes: {sizes}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </>
//       ) : (
//         <h1> Not Add Products Yet ... </h1>
//       )}
//     </>