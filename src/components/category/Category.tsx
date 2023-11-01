import { useDispatch, useSelector } from 'react-redux'
import {  useEffect } from 'react'


import { AppDispatch, RootState } from '../../redux/store'

import { deleteCategory, fetchCategory } from '../../redux/slices/category/categorySlice'
import { FaEdit } from 'react-icons/fa'
import AdminSideBar from '../admin/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Category = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <h1>loading ...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }

  const handleDeleteCategory = (id: number) => {

    if(confirm("Are you sure to Add category")){

    dispatch(deleteCategory(id))
    alert('success deleted');
    
    }else{
      return false;
  }

  }

  return (
    <>
      <div className="sectionAdmin">
        <AdminSideBar />
      </div>
      <div className="mainContent">
        <h2>List all the Category here </h2>
      </div>

      <div className="mainContentCategory">
      <Link to='admin/addProduct' >
       <FontAwesomeIcon icon={faAdd}  className="addProduct" />
        </Link>
        {categories.length > 0 ? (
          <div className="product">
            {categories.map((category) => {
              const { id, name } = category
              return (
                <div className="category" key={id}>
                  <h2 className="product-brand">{name}</h2>
                  <button
                    onClick={() => {
                      handleDeleteCategory(id)
                    }}>
                    {' '}
                    Delete
                  </button>
                  <Link to="admin/editCategory" state={{ id,name }}>
                    <button>
                      <FaEdit />
                    </button>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <h1>Not Add Category Yet ... </h1>
        )}
      </div>
    </>
  )
}

export default Category
