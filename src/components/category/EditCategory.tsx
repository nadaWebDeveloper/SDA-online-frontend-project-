import { useLocation, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'

import { FaEdit } from 'react-icons/fa'
import { clearError, updateCategory } from '../../redux/slices/category/categorySlice'

const EditCategory = () => {
  const { error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useLocation()
  const [name, setName] = useState(state.name)

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)
    }
}, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setName(inputValue)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (confirm('Are you sure to edit category')) {
      const editCategory = { _id: state._id, name: name }
      dispatch(updateCategory(editCategory))
      navigate('/dashboard/admin/category')
    } else {
      return false
    }
  }

  return (
    <div className="mainContentCategory">
      <h2 className="titleCategory">Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="editNameCategory"></label>
        <div className="inputField">
          <input
            type="text"
            name="name"
            placeholder="Name Category"
            value={name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          <FaEdit />
        </button>
      </form>
    </div>
  )
}

export default EditCategory
