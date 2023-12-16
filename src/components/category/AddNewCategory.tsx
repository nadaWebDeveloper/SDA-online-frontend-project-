import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useState } from 'react'

import { createCategory } from '../../redux/slices/category/categorySlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'


const AddNewCategory = () => {
  const navigate = useNavigate()
  const [categoryName, setCategoryName] = useState('')

  const handleAddChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setCategoryName(inputValue)

  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

 if (confirm('Are you sure to Add category')) {    
try{
  const newCategory = {name :categoryName}
      const response = await createCategory(newCategory)
      alert(response.message);
      navigate('/dashboard/admin/category')
}catch (error) {
    if(categoryName === ''){
      const errors = `
      ${error.response.data.errors[0]}
      ${error.response.data.errors[1]}
     `
    alert(errors);
    }else{
      alert(error.response.data.msg);
    }
   }

    } else {
      return false
    }
  }

  return (
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

  )
}

export default AddNewCategory
