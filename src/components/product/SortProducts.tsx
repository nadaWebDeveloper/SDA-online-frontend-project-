import { ChangeEvent } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { sortProducts } from "../../redux/slices/products/productSlice"

const SortProducts = () => {
      
    const Dispatch = useDispatch<AppDispatch>()


   const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) =>
   {

    const inputValue =event.target.value
    Dispatch(sortProducts(inputValue))

   } 
  return (
<>
<div>
    <label htmlFor="sort">Sort by :</label>
    <select name="sort" id="sort" onChange={handleSortChange}>
        <option value="price" >
           Price
        </option>
        <option value="name" defaultValue="name">
        Name
        </option>
    </select>
</div>
</>  
)}

export default SortProducts