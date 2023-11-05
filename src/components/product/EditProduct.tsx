import { useLocation, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useState } from 'react'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { updateProduct } from '../../redux/slices/products/productSlice'

function EditProduct() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { state } = useLocation()
  console.log(state)

  const [nameEditProduct, setNameEditProduct] = useState(state.name)
  const [imageEditProduct, setImageEditProduct] = useState(state.image)
  const [descriptionEditProduct, setDescriptionEditProduct] = useState(state.description)
  const [categoriesEditProduct, setCategoriesEditProduct] = useState(state.categories)
  const [variantsEditProduct, setVariantsEditProduct] = useState(state.variants)
  const [sizesEditProduct, setSizesEditProduct] = useState(state.sizes)
  const [priceEditProduct, setPriceEditProduct] = useState(state.price)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    switch (name) {
      case 'nameEditProduct':
        setNameEditProduct(value)
        break
      case 'imageEditProduct':
        setImageEditProduct(value)
        break
      case 'descriptionEditProduct':
        setDescriptionEditProduct(value)
        break
      case 'categoriesEditProduct':
        setCategoriesEditProduct(value)
        break
      case 'variantsEditProduct':
        setVariantsEditProduct(value)
        break
      case 'sizesEditProduct':
        setSizesEditProduct(value)
        break
      case 'priceEditProduct':
        setPriceEditProduct(value)
        break
      default:
        break
    }
  }


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (confirm('Are you sure to Edit Product')) {
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
      console.log(editProduct)
      navigate('/dashboard/admin/products')
      alert('success edit  product')
    } else {
      return false
    }
  }

  return (
    <>
      <div className="mainContentCategory">
        <h2 className="titleCategory">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              placeholder="Name"
              name="nameEditProduct"
              value={nameEditProduct}
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="imageEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              name="imageEditProduct"
              placeholder="Image URL"
              value={imageEditProduct}
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="descriptionEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              name="descriptionEditProduct"
              placeholder="Description"
              value={descriptionEditProduct}
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="categoriesEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              name="categoriesEditProduct"
              placeholder="Categories"
              value={categoriesEditProduct}
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="variantsEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              name="variantsEditProduct"
              placeholder="Variants"
              value={variantsEditProduct}
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="priceEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              name="priceEditProduct"
              placeholder="Price"
              value={priceEditProduct}
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="sizesEditProduct"></label>
          <div className="inputField">
            <input
              type="text"
              name="sizesEditProduct"
              placeholder="Sizes"
              value={sizesEditProduct}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Edit</button>
        </form>
      </div>
    </>
  )
}

export default EditProduct
