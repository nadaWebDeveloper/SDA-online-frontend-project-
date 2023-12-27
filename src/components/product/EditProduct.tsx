import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../../redux/store'
import { clearError, updatedProduct} from '../../redux/slices/products/productSlice'

function EditProduct() {
  const { error } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useLocation()

  useEffect(() => {
    if(error){
   alert(error)
   setTimeout(()=>{
     dispatch(clearError())    
         }, 1000)}
}, [error])

  const [product, setProduct] = useState({
    name: state.name,
    image:state.image,
    description:state.description,
    categories:state.categories[0]._id,
    sold:state.sold,
    quantity:state.quantity,
    price:state.price
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

  const handleSubmit = async(event: FormEvent) => {
    event.preventDefault()

    if (confirm('Are you sure to Edit Product')) {
      const formData = new FormData(event.currentTarget as HTMLFormElement)
       const id: string = state._id
       const input = {id,formData}
       dispatch(updatedProduct(input))
        navigate('/dashboard/admin/products')
  
    } else {
      return false
    }
  }

  return (
    <div>
      <div className="mainContentCategory">
        <h2 className="titleCategory">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"></label>
          <div className="inputField">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="image"></label>
          <div className="inputField">
            <input
              type="file"
              name="image"
              placeholder="Image"
              accept='image/*'
              onChange={handleChange}
            />
          </div>

          <label htmlFor="description"></label>
          <div className="inputField">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="categories"></label>
          <div className="inputField">
            <input
              type="text"
              name="categories"
              placeholder="Categories"
              value={product.categories}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="quantity"></label>
          <div className="inputField">
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="price"></label>
          <div className="inputField">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="sold"></label>
          <div className="inputField">
            <input
              type="number"
              name="sold"
              placeholder="Sold"
              value={product.sold}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
