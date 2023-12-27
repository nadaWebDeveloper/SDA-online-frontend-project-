import { useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { clearError, createProduct } from '../../redux/slices/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchCategory } from '../../redux/slices/category/categorySlice'


const AddProduct = () => {

  const { error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const { categoryArray } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState({
    name: '',
    image: undefined,
    description:'',
    categories:'',
    sold:'0',
    quantity:'0',
    price:'0'
  })


  useEffect(() => {
    dispatch(fetchCategory())
 if(categoryArray.length > 0) {  
      setProduct((prevProduct) =>{
      return{ ...prevProduct, ['categories'] : categoryArray[0]._id}
    })}
  }, [])

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)
    }
}, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {value, name} = event.target
    const {type} = event.target
    if(type === 'file'){
    const fileInput = (event.target as HTMLInputElement) || ''
    setProduct((prevProduct) => {
   return { ...prevProduct,[name]: fileInput.files?.[0].name}})
    }
   else{
  setProduct((prevProduct) => {
    return { ...prevProduct,[name]:value}  })
}
}


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if(confirm("Are you sure to Add Product")){
    const formData = new FormData(event.currentTarget as HTMLFormElement)
   await dispatch(createProduct(formData))
    navigate('/dashboard/admin/products')
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



