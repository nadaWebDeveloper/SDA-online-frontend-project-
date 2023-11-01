import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useState } from 'react'

import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { AppDispatch } from '../../redux/store'
import { updateProduct } from '../../redux/slices/products/productSlice'

function EditProduct() {


  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useLocation()


  const [nameEditProduct, setNameEditProduct] = useState(state.nameEditProduct)
  const [imageEditProduct, setImageEditProduct] = useState(state.imageEditProduct)
  const [descriptionEditProduct, setDescriptionEditProduct] = useState(state.descriptionEditProduct)
  const [categoriesEditProduct, setCategoriesEditProduct] = useState(state.categoriesEditProduct)
  const [variantsEditProduct, setVariantsEditProduct] = useState(state.variantsEditProduct)
  const [sizesEditProduct, setSizesEditProduct] = useState(state.sizesEditProduct)
  const [priceEditProduct, setPriceEditProduct] = useState(state.priceEditProduct)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setNameEditProduct(inputValue)
  }

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setImageEditProduct(inputValue)
  }

  const handleChangeDesc = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setDescriptionEditProduct(inputValue)
  }

  const handleChangeCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setCategoriesEditProduct(inputValue)
  }

  const handleChangeVariants = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setVariantsEditProduct(inputValue)
  }

  const handleChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setSizesEditProduct(inputValue)
  }

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setPriceEditProduct(inputValue)
  }


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()


    if(confirm("Are you sure to Edit Product")){

      const editProduct = {
        id: state.id,
        name: nameEditProduct,
        image: imageEditProduct,
        description: descriptionEditProduct,
        categories: categoriesEditProduct,
        variants: variantsEditProduct,
        sizes: sizesEditProduct,
        price: priceEditProduct
      }
  
      dispatch(updateProduct(editProduct))
      navigate('/admin/products')
      alert('success edit  product');

      
    }else{
      return false;
  }}
  

  return (
    <>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} >
       <div> 
      <label htmlFor="nameEditProduct">
          Name:
        </label>
        <input
          type="text"
          name="nameEditProduct"
          id="nameEditProduct"
          value={nameEditProduct}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="imageEditProduct">
          Image URL:
        </label>
        <input
          type="text"
          name="imageEditProduct"
          id="imageEditProduct"
          value={imageEditProduct}
          onChange={handleChangeImage}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descriptionEditProduct" >
          Description:
        </label>
        <input
          type='text'
          name="descriptionEditProduct"
          id="descriptionEditProduct"
          value={descriptionEditProduct}
          onChange={handleChangeDesc}
        
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categoriesEditProduct">
          Categories: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="categoriesEditProduct"
          id="categoriesEditProduct"
          value={categoriesEditProduct}
          onChange={handleChangeCategory}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="variantsEditProduct">
          Variants: (use comma , to create multiple)
        </label>
        <input
          type="text"
          name="variantsEditProduct"
          id="variantsEditProduct"
          value={variantsEditProduct}
          onChange={handleChangeVariants}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priceEditProduct">
          Price:
        </label>
        <input
          type="text"
          name="priceEditProduct"
          id="priceEditProduct"
          value={priceEditProduct}
          onChange={handleChangePrice}
        />
        </div>
      <div className="mb-4">
        <label htmlFor="sizesEditProduct">
          Sizes: 
        </label>
        <input
          type="text"
          name="sizesEditProduct"
          id="sizesEditProduct"
          value={sizesEditProduct}
          onChange={handleChangeSize}
        />
        </div>

        <button type="submit" >
          <FaEdit />
        </button>
      </form>
    </>
  )
}

export default EditProduct
