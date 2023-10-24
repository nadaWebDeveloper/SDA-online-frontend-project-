import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { AppDispatch, RootState } from '../redux/store'
import { fetchCategory } from '../redux/slices/category/categorySlice'
import { FaEdit } from "react-icons/fa";
import AdminSideBar from "./admin/AdminSideBar"

const Category = () => {

  const {categories, isLoading, error} = useSelector((state: RootState) => state.categories)
  const Dispatch: AppDispatch = useDispatch()
 
  useEffect(() => {
   Dispatch(fetchCategory())
  }, [])
 
  if(isLoading)
  {return <h1>loading ...</h1>}
  if(error)
  {return <h1>{error}</h1>}
 

  return (
<>

<AdminSideBar />
<div className="mainContent">
<form action="">
      <input type="text" name="Category" />
      <button>Create Category </button>
      </form>
      <h2>List all the Category here </h2> 
      </div>
 
 {categories.length > 0 ?(      
     categories.map((category)=> {
      const { id, name} = category
      return(
        <div className="category" key={id}>
            <h2 className="product-brand">{name}</h2>
             <button >Delete</button>
            <button ><FaEdit /></button> 
            </div>
      ) 
     })):(  <h1>Not Add Category Yet ... </h1>)}  
 
  
   

</> 
 )
}

export default Category