import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { clearError, deleteCategory, fetchCategory } from '../../redux/slices/category/categorySlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FaEdit } from 'react-icons/fa'

const Category = () => {
  const { categoryArray , error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)
    }
}, [error])

  const handleDelete = (_id: string) => {
    if (confirm('Are you sure to Delete Category?')) {
      dispatch(deleteCategory(_id))
    } else {
      return false
    }
  }

  return (
    <div>
      <div className="mainContentCategory">
        <Link to="/dashboard/admin/addCategory">
          <FontAwesomeIcon icon={faAdd} className="addProduct" />
        </Link>
        {categoryArray.length > 0 ? (
          <div>
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
                  {categoryArray.map((category) => {
                    const { _id, name } = category
                    return (
                      <tr key={_id}>
                        <td>{_id}</td>
                        <td>{name}</td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(_id)
                            }}>
                            Delete
                          </button>
                          <Link to="/dashboard/admin/editCategory" state={{ _id, name }}>
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
          </div>
        ) : (
          <>   
          <Link to="/dashboard/admin/addCategory">
          <FontAwesomeIcon icon={faAdd} className="addProduct" />
         </Link>
          <h2>Not Add Category Yet ...</h2>
          </>
        )}
      </div>
    </div>
  )
}

export default Category
