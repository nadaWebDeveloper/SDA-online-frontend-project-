import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useState } from 'react'

import { createProduct } from '../../redux/slices/products/productSlice'


const AddProduct = () => {

  const navigate = useNavigate()
  const [product, setProduct] = useState({
    name: '',
    image:'',
    description:'',
    categories:'',
    sold:0,
    quantity:0,
    price:0
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = event.target
    const {type} = event.target
    if(type === 'file'){
    const fileInput = (event.target as HTMLInputElement) || ''
    setProduct((prevProduct) => {
   return { ...prevProduct,[name]: fileInput.files?.[0].name}})
    }
   else{
  setProduct((prevProduct) => {
    return { ...prevProduct,[name]:[value]}  })
}
}


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if(confirm("Are you sure to Add Product")){
    const formData = new FormData(event.currentTarget)
     try {
      const response = await createProduct(formData)
      alert(response.message);
      navigate('/dashboard/admin/products')

     } catch (error) {
       const values = [...formData.values()]
      const isEmpty = values.includes('')
      if(isEmpty){
        const errors = `
        ${error.response.data.errors[0]}
        ${error.response.data.errors[1]}
        ${error.response.data.errors[2]}
        ${error.response.data.errors[3]}
        ${error.response.data.errors[4]}
        ${error.response.data.errors[5]}
       `
      alert(errors);
      }else{
        alert(error.response.data.msg)
      }
     }
   
    }else{
      return false;
    }
  }


  return (
    <div>
         <div className="mainContentCategory"> 
         <h2 className='titleCategory'>Add Product</h2>
      <form onSubmit={handleSubmit}   >
       
          <label htmlFor='nameAddProduct'></label>
          <div className='inputField'>
          <input
            type="text"
            name="name"
            placeholder='Name'
            value={product.name}
            onChange={handleChange}
          />
        </div>

          <label htmlFor='imageAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="file"
            name="image"
            placeholder='Image'
            accept='image/*'
            // value={product.image}
            onChange={handleChange}
          />
          </div>
          <label htmlFor='descAddProduct'>
          </label>
          <div className='inputField'>
          <textarea
            name="description"
            placeholder='Description'
            value={product.description}
            onChange={handleChange}
          ></textarea>
          </div>
          <label htmlFor='categoryAddProduct'>
            </label>
            <div className='inputField'>
          <textarea
            name="categories"
            placeholder='Categories:(use comma ,to create multiple)'
            value={product.categories}
            onChange={handleChange}
          ></textarea>
        </div>
          <label htmlFor='quantityAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="quantity"
            placeholder='quantity'
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
          <label htmlFor='SoldAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="sold"
            placeholder='Sold'
            value={product.sold}
            onChange={handleChange}
          />
        </div>
          <label htmlFor='priceAddProduct'>
          </label>
          <div className='inputField'>
          <input
            type="text"
            name="price"
            placeholder='Price'
            value={product.price}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Add Product</button>
      </form>
      </div>

    </div>
  )
}

export default AddProduct



