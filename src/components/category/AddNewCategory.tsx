import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { ChangeEvent, FormEvent, useState } from 'react'

import { AppDispatch } from '../../redux/store'


import { addCategory } from '../../redux/slices/category/categorySlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'


const AddNewCategory = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [categoryName, setCategoryName] = useState('')

  const handleAddChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setCategoryName(inputValue)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (confirm('Are you sure to Add category')) {
      const addNewCategory = {
        id: new Date().getMilliseconds(),
        name: categoryName
      }

      dispatch(addCategory(addNewCategory))
      alert('success added category')
      navigate('/dashboard/admin/category')

    } else {
      return false
    }
  }

  return (
    <>
    <div className='mainContentCategory'> 
      <h1 className='titleCategory'>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName"></label>

         <div className='inputField'>
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
    </>
  )
}

export default AddNewCategory
