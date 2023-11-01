import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {FaEdit} from 'react-icons/fa'
import { ToastContainer,toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import { updateCategory } from "../../redux/slices/category/categorySlice";



function EditCategory() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {state} = useLocation()
     const [name, setName] = useState(state.name);
    
     const handleChange = (event : ChangeEvent<HTMLInputElement>) =>
     {
         const inputValue = event.target.value
        setName(inputValue);
    
     }
    
     const handleSubmit = (event: FormEvent) =>
     {
      event.preventDefault();

      if(confirm("Are you sure to Add category")){

        const editCategory =
        {id: state.id ,
         nameCategory:name };

        dispatch(updateCategory(editCategory));
       navigate('/admin/category');
       alert('success edited category');

        
        }else{
          return false;
      }

    }


  return (
<>
<h2>Edit Category</h2>
    <form onSubmit={handleSubmit} >
        <label htmlFor="editNameCategory"></label>
    <input type="text" id='editNameCategory' name="name" placeholder="Name Category" value={name} onChange={handleChange}/>
    <button type="submit"><FaEdit /></button>
    </form>
</>  )
}

export default EditCategory