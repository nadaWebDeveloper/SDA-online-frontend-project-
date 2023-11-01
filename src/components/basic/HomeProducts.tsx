import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ChangeEvent, useEffect, useState } from 'react'

import {
  fetchProducts,
  searchProduct,
  sortProducts
} from '../../redux/slices/products/productSlice'
import { Link } from 'react-router-dom'
import Search from '../Filtering/Search'
import Sort from '../Filtering/Sort'
import { faBasketShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { prices } from '../../Price'
import { addToCart } from '../../redux/slices/cart/cartSlice'

const HomeProducts = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categories } = useSelector((state: RootState) => state.categoriesReducer)
  const [priceRange, setPriceRange] = useState<number[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const [checkedCategory, setCheckedCategory] = useState<number[]>([])

  const optionArr = ['name', 'price']

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    dispatch(searchProduct(inputValue))
  }

  // const searchProducts = searchTerm
  // ? products.filter((product) => product.name.toLowerCase().includes
  // (searchTerm.toLowerCase()))
  // : products

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value
    dispatch(sortProducts(inputValue))
  }

  const handelCheckCategory = (idCategory: number) => {
    if (checkedCategory.includes(idCategory)) {
      const filteredCategory = checkedCategory.filter((category) => category !== idCategory)
      setCheckedCategory(filteredCategory)
    } else {
      setCheckedCategory((prevState) => {
        return [...prevState, idCategory]
      })
    }
  }

  const handelCheckPrice = (priceId: number) => {
    const selectedPrice = prices.find((price) => price.id === priceId)
    if (selectedPrice) {
      setPriceRange(selectedPrice.range)
    }
  }

  const filterProducts = products.filter((product) => {
    const categoryMatch =
      checkedCategory.length > 0
        ? checkedCategory.some((id) => product.categories.includes(Number(id)))
        : product

    const priceMatch =
      priceRange.length > 0
        ? product.price >= priceRange[0] && product.price <= priceRange[1]
        : product

    const searchMatch =
      searchTerm !== '' 
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
       : product

    return categoryMatch && searchMatch && priceMatch
  })

 const handleAddToCart = (product: product)=> {

  console.log(product);
  dispatch(addToCart(product))
 }

  if (isLoading) {
    return <h1>loading ...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
      <div className="filter">
        <div>
          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>
        <div>
          <Sort optionArr={optionArr} handleSortChange={handleSortChange} />
        </div>
      </div>

      {/* filter by category and price */}
      <div className="heroSection">
        <div>
          <h2>Filter by Price</h2>
          {prices.length > 0 &&
            prices.map((category) => {
              const { id, name } = category
              return (
                <div key={id}>
                  <label htmlFor="price">
                    <input
                      type="radio"
                      name="price"
                      value={id}
                      onChange={() => {
                        handelCheckPrice(id)
                      }}
                    />
                    {name}
                  </label>
                </div>
              )
            })}
        </div>
        <div>
          <h2>Filter by Category</h2>
          {categories.length > 0 &&
            categories.map((categoryfilter) => {
              const { id, name } = categoryfilter
              return (
                <div key={id}>
                  <label htmlFor="filterCategory" >
                    <input
                      type="checkbox"
                      name="fiCategory"
                      value={name}
                      onChange={() => {
                        handelCheckCategory(id)
                      }}
                    />
                    {name}
                  </label>
                </div>
              )
            })}
        </div>
      </div>

      <div className="homePage">
        <h1 className="productTitle">best selling</h1>

        {filterProducts.length > 0 ? (
          <div id="Product" className="product">
            {filterProducts.map((product) => {
              const { id, name, image, price } = product
              return (
                <div className="product-container" key={id}>
                  <div className="product-card">
                    <div className="product-image">
                      <Link to={`/products/${name}/${id}`}>
                        <span className="discount-tag">50% off</span>
                        <img src={image} className="product-thumb" alt={name} />
                      </Link>
                      <div className="div-card-btn">
                        <FontAwesomeIcon icon={faBasketShopping} className="card-btn" onClick={()=>{handleAddToCart(product)}} />
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
          </div>
        ) : (
          <h1>Not Add Products Yet ... </h1>
        )}
      </div>
    </>
  )
}

export default HomeProducts
