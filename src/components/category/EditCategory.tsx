import { useLocation, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useState } from 'react'

import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'

import { FaEdit } from 'react-icons/fa'
import { updateCategory } from '../../redux/slices/category/categorySlice'

const EditCategory = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useLocation()
  console.log(state);
  const [name, setName] = useState(state.name)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setName(inputValue)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (confirm('Are you sure to edit category')) {
      const editCategory = { id: state.id, name: name }

      dispatch(updateCategory(editCategory))
      navigate('/dashboard/admin/category')
      alert('success edited category')
    } else {
      return false
    }
  }

  return (
    <>
      <div className='mainContentCategory'>
        <h2 className='titleCategory'>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="editNameCategory"></label>
          <div className='inputField'>
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
    </>
  )
}

export default EditCategory
