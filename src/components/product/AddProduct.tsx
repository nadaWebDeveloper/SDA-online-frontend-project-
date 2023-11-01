import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch} from '../../redux/store'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

import { addNewProduct } from '../../redux/slices/products/productSlice'


const AddProduct = () => {


  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [addProduct, setAddProduct] = useState({
    name: '',
    image: '',
    description: '',
    categories: [],
    variants: [],
    sizes: [],
    price: 0
  })

  
 
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: nameInput, value: valueInput } = event.target;
    setAddProduct((prevState) => {
      return { ...prevState, [nameInput]: valueInput }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

  
    if(confirm("Are you sure to Add Product")){
      
      const newProduct = {
        name: addProduct.name,
        image: addProduct.image ,
        description: addProduct.description,
        categories: addProduct.categories,
        variants: addProduct.variants,
        sizes: addProduct.sizes,
        price: addProduct.price
      }
      dispatch(addNewProduct(newProduct))
      navigate('/admin')
     
      setAddProduct({
        name: '',
        image: '',
        description: '',
        categories: [],
        variants: [],
        sizes: [],
        price: 0
      })
      alert('success added  product');


    }else{
      return false;
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label htmlFor='nameAddProduct'>Name:</label>
          <input
            type="text"
            name="name"
            
            id='nameAddProduct'
            value={addProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='imageAddProduct'>
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            
            id='imageAddProduct'
            value={addProduct.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='descAddProduct'>
            Description:
          </label>
          <input
            type='text'
            name="description"
            id='descAddProduct'
            
            value={addProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='categoryAddProduct'>Categories: (use comma , to create multiple)</label>
          <input
            type="text"
            name="categories"
            id='categoryAddProduct'
           
            value={Array.isArray(addProduct.categories) ? addProduct.categories.join(',') : ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='variaAddProduct'>
            Variants: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="variants"
            id='variaAddProduct'
           
            value={Array.isArray(addProduct.variants) ? addProduct.variants.join(',') : ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='sizeAddProduct'>
            Sizes: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="sizes"
            id='sizeAddProduct'
           
            value={Array.isArray(addProduct.sizes) ? addProduct.sizes.join(',') : ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor='priceAddProduct'>
            Price: 
          </label>
          <input
            type="text"
            name="price"
            id='priceAddProduct'
       
            value={addProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </>
  )
}

export default AddProduct
