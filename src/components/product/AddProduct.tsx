import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch} from '../../redux/store'
import { addNewProduct } from '../../redux/slices/products/productSlice'


const AddProduct = () => {

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [name , setName] = useState('')
  const [image , setImage] = useState('')
  const [description , setDescription] = useState('')
  const [categories , setCategories] = useState('')
  const [variants , setVariants] = useState('')
  const [size , setSize] = useState('')
  const [price , setPrice] = useState('')

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setName(inputValue)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setImage(inputValue)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setDescription(inputValue)
  }

  const handleCategoriesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setCategories(inputValue)
  }

  const handleVariantsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setVariants(inputValue)
  }

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setPrice(inputValue)
  }

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setSize(inputValue)
  }



  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if(confirm("Are you sure to Add Product")){
      
      const newProduct = {id: new Date().getMilliseconds() , 
        name: name,
        image:image,
        description:description,
        categories:categories,
        variants:variants,
        sizes:size,
        price:price}

      dispatch(addNewProduct(newProduct))
      navigate('/dashboard/admin/products')

    }else{
      return false;
    }
  }


  return (
    <div>
         <div className="mainContentCategory"> 
         <h2 className='titleCategory'>Add Product</h2>
      <form onSubmit={handleSubmit} >
       
          <label htmlFor='nameAddProduct'></label>
          <div className='inputField'>
          <input
            type="text"
            name="nameAddProduct"
            placeholder='Name'
            value={name}
            onChange={handleNameChange}
          />
        </div>

          <label htmlFor='imageAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="imageAddProduct"
            placeholder='Image URL'
            value={image}
            onChange={handleImageChange}
          />
          </div>
          <label htmlFor='descAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type='text'
            name="descAddProduct"
            placeholder='Description'
            value={description}
            onChange={handleDescriptionChange}
          />
          </div>
          <label htmlFor='categoryAddProduct'>
            </label>
            <div className='inputField'>
          <input
            type="text"
            name="categoryAddProduct"
            placeholder='Categories:(use comma ,to create multiple)'
            value={categories}
            onChange={handleCategoriesChange}
          />
        </div>
          <label htmlFor='variaAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="variaAddProduct"
            placeholder='Variants:(use comma , to create multiple)'
            value={variants}
            onChange={handleVariantsChange}
          />
        </div>
          <label htmlFor='sizeAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="sizeAddProduct"
            placeholder='Sizes: (use comma ,to create multiple)'
            value={size}
            onChange={handleSizeChange}
          />
        </div>
          <label htmlFor='priceAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="priceAddProduct"
            placeholder='Price'
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        
        <button type="submit">Add Product</button>
      </form>
      </div>

    </div>
  )
}

export default AddProduct



