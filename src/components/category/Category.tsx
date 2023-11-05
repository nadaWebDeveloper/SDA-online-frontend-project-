import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { deleteCategory, fetchCategory } from '../../redux/slices/category/categorySlice'

import { FaEdit } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import EditCategory from './EditCategory'


const Category = () => {
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure to delete category')) {
      dispatch(deleteCategory(id))
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

      <div className="mainContentCategory">
        <Link to="/dashboard/admin/ddNewCategory">
          <FontAwesomeIcon icon={faAdd} className="addProduct" />
        </Link>



        {categories.length > 0 ? (
          <>
            <div className="tableDiv">
              <table>
                <thead>
                  <tr>
                    <th>Category Id</th>
                    <th>Category Name</th>
                    <th> * </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => {
                    const { id, name } = category
                    return (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleDeleteCategory(id)
                            }}>
                            Delete
                          </button>
                          <Link to="/dashboard/admin/editCategory" state={{ id, name }}>
                            <button>
                              <FaEdit />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <h2>Not Add Category Yet ...</h2>
        )}
      </div>
    </>
  )
}

export default Category
