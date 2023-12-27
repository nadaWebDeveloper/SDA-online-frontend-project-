import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import {
  clearError,
  deleteProduct,
  fetchProducts,
  sortProducts,
} from '../../redux/slices/products/productSlice'

import Search from '../Filtering/Search'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faDeleteLeft, faEdit, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import Sort from '../Filtering/Sort'



const Products = () => {
  const { products, error, searchTerm , pagination } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const optionArr = ['name', 'price', 'createAt', 'updateAt']

 // const [product, setProduct] = useState([products]);
  const dispatch = useDispatch<AppDispatch>()

   //filter search 
   const [search, setSearch] = useState(searchTerm);
   //filter price 
   const [filterPrice, setFilterPrice ] = useState('range0')
   //current page
   const [currentPage, setCurrentPage ] = useState(1) //1
   //how item shown in one page in this case 3 item
   const [itemPerPage] = useState(6)//3
 
 const filterProduct = async () =>{
   const inputPageApI = {page: currentPage,limit:itemPerPage , rangeId: filterPrice , search: search }
     await dispatch(fetchProducts(inputPageApI))
 }
 
   useEffect(() => {
     filterProduct()
   }, [currentPage,itemPerPage ,filterPrice ,search])
 

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000) }
}, [error])


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


 //to display number of page between next and prev button
 let buttonPageNumber = []
for (let pageNumber = 2 ; pageNumber <= pagination.totalPage -1 ; pageNumber++){
  buttonPageNumber.push
  (<button onClick={()=>{handlePageChange(pageNumber)}}>{pageNumber}</button>)
 }


 const handleSearch = async(event: ChangeEvent<HTMLInputElement>) => {
  const inputValue = event.target.value
console.log(inputValue);  
  setSearch(inputValue)
}
  const handleSortChange =async (event: ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value
    dispatch(sortProducts(inputValue))
  }
  const handleDeleteProduct = (_id: string) => {
    if (confirm('Are you sure to Delete Product')) {
      dispatch(deleteProduct({_id}))
      alert('success deleted  product')
    } else {
      return false
    }
  }

  return (
    <div>
      <div>
      <div className="filter">
            <Search searchTerm={search} handleSearch={handleSearch} />
            <div>
          <Sort optionArr={optionArr} handleSortChange={handleSortChange} />
        </div>
          </div>
      </div>
      {products.length > 0 ? (     
        <div>
          <div id="Product" className="homePage">
          <Link to="/dashboard/admin/addProduct">
            <FontAwesomeIcon icon={faAdd} className="addProduct" />
          </Link>

            <div className="product">
              {products.map((product) => {
                const { _id, name, image, price, description ,sold, quantity, categories} = product
                return (
                  <div className="product-container" key={_id}>
                    <div >
                      <div className="product-imageAdmin">
                        <span className="discount-tag">50% off</span>
                        <img src={image as string} className="product-thumb" alt={name} />
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
                              description,
                              sold,
                              quantity, 
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
          </div>
        </div>
      ) : (
        <div className="sectionAdmin">
        <Link to="/dashboard/admin/addProduct">
            <FontAwesomeIcon icon={faAdd} className="addProduct" />
          </Link>
          <h1> Not Add Products Yet ... </h1>
        </div>
      )}
    </div>
  )
}

export default Products