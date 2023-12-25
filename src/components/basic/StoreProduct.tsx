import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Product,
  clearError,
  fetchProducts,
  sortProducts,
} from '../../redux/slices/products/productSlice'
import { addToCart } from '../../redux/slices/cart/cartSlice'

import Search from '../Filtering/Search'
import Sort from '../Filtering/Sort'
import { prices } from '../../Price'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { fetchCategory } from '../../redux/slices/category/categorySlice'

const StoreProduct = () => {
   
  //pagination  1- current page number 2- item per page 
  const { products, searchTerm  , pagination , error} = useSelector((state: RootState) => state.productsReducer)
  const { categoryArray } = useSelector((state: RootState) => state.categoriesReducer)
  const dispatch = useDispatch<AppDispatch>()
  const [checkedCategory, setCheckedCategory] = useState<string[]>([])
  const optionArr = ['name', 'price']

  //filter search 
  const [search, setSearch] = useState(searchTerm);
  //filter price 
  const [filterPrice, setFilterPrice ] = useState('range0')
  //current page
  const [currentPage, setCurrentPage ] = useState(1) //1
  //how item shown in one page in this case 3 item
  const [itemPerPage] = useState(3)//3

const filterProduct = async () =>{
  const inputPageApI = {page: currentPage,limit:itemPerPage , rangeId: filterPrice , search: search }
    await dispatch(fetchProducts(inputPageApI))
    await dispatch(fetchCategory())
}

  useEffect(() => {
    filterProduct()
  }, [currentPage,itemPerPage ,filterPrice ,search])

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)}
}, [error])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setSearch(inputValue)
  }

  const handleSortChange =async (event: ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value
    dispatch(sortProducts(inputValue))
  }

  const handelCheckCategory = (idCategory:string) => {
    if (checkedCategory.includes(idCategory)) {
      const filteredCategory = checkedCategory.filter((category) => category !== idCategory)
      setCheckedCategory(filteredCategory)
    } else {
      setCheckedCategory((prevState) => {
        return [...prevState, idCategory]
      })
    }
  }

  const handleCheckPrice = (priceId: string) => {
    setFilterPrice(priceId)
  }


 //  pagination logic 3
 const handlePageChange =(page: number) =>
 {
  setCurrentPage( page )
 }

 const handleNextPage =() =>
  {
  setCurrentPage( currentPage + 1 )
 }

 const handlePrevPage =() =>
 {
  setCurrentPage( currentPage - 1 )
 }



 const handleAddToCart = (products:Product)=> {
  dispatch(addToCart(products))
 }

 //to display number of page between next and prev button
 let buttonPageNumber = []
for (let pageNumber = 2 ; pageNumber <= pagination.totalPage -1 ; pageNumber++){
  buttonPageNumber.push
  (<button onClick={()=>{handlePageChange(pageNumber)}}>{pageNumber}</button>)
 }

  return (
    <div>
      <div className="filter">
        <div>
          <Search searchTerm={search} handleSearch={handleSearch} />

        </div>
        <div>
          <Sort optionArr={optionArr} handleSortChange={handleSortChange} />
        </div>
      </div>

     <div className=''>  
      <div className="leftSideHome">

        <div className='filterPrice'>
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
                        handleCheckPrice(id)
                      }}
                    />
                    {name}
                  </label>
                </div>
              )
            })}
        </div>

        <div className='filterCategory'>
          <h2>Filter by Category</h2>
          {categoryArray.length > 0 &&
            categoryArray.map((categoryFilter) => {
              const { _id, name } = categoryFilter
              return (
                <div key={_id}>
                  <label htmlFor="filterCategory" >
                    <input
                      type="checkbox"
                      name="fiCategory"
                      value={name}
                      onChange={() => {
                        handelCheckCategory(_id)
                      }}
                    />
                    {name}
                  </label>
                </div>
              )
            })}
        </div>
      </div>

      <div className="homePageRight">
        <h1 className="productTitle">best selling</h1>
        {products.length > 0 ? (  
          <div className="productHome">
            {products.map((product) => {
              const { _id, name, image, price } = product
              return (
                <div className="product-container" key={_id}>
                  <div className="product-card">
                    <div className="product-image">
                      <Link to={`/products/${name}/${_id}`}>
                        <span className="discount-tag">50% off</span>
                        {/* to store image on server src={`http://localhost:5050/${image}`} */}
                        <img src={image as string} className="product-thumb" alt={name} />
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
               {/* pagination logic 1*/}
         <div className='pagination'>
         <div key='prev'>
           <button onClick={handlePrevPage}  disabled={currentPage === 1}>
           <FontAwesomeIcon icon={faArrowAltCircleLeft}  />
           </button>
         </div>
         <div key='numberPage'>
            {buttonPageNumber}
         </div>
         <div key='next'>
           <button onClick={handleNextPage} disabled={currentPage === pagination.totalPage}>
           <FontAwesomeIcon icon={faArrowAltCircleRight}  />
           </button>
         </div>
       </div>
       
          </div>

        ) : (
          <h1>Not Add Products Yet ... </h1>
        )}
      </div>

      </div>

    </div>
  )
}

export default StoreProduct
