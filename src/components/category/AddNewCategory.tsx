import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { clearError, createCategory, fetchCategory } from '../../redux/slices/category/categorySlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

const AddNewCategory = () => {
  const { error } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const navigate = useNavigate()
  const [categoryName, setCategoryName] = useState('')
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

  const handleAddChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setCategoryName(inputValue)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (confirm('Are you sure to Add category')) {
      const newCategory = { name: categoryName }
      await dispatch(createCategory(newCategory))
      navigate('/dashboard/admin/category')
    } else {
      return false
    }
  }

  return (
    <div className="mainContentCategory">
      <h1 className="titleCategory">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName"></label>

        <div className="inputField">
          <input
            type="text"
            name="categoryName"
            placeholder="Name Category"
            value={categoryName}
            onChange={handleAddChange}
          />
        </div>

        <button type="submit">
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </form>
    </div>
  )
}

export default AddNewCategory
