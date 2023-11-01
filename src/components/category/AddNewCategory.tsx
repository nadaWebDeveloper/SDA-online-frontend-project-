import { useNavigate } from "react-router";
import { addCategory } from "../../redux/slices/category/categorySlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ChangeEvent, FormEvent, useState } from "react";
import {  toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const AddNewCategory =() => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [categoryName, setCategoryName] = useState('');

const handleAddChange = (event : ChangeEvent<HTMLInputElement>) =>
 {
    const inputValue = event.target.value
    setCategoryName(inputValue);

 }

const handleSubmit = (event: FormEvent) =>
 {
  event.preventDefault();

  if(confirm("Are you sure to Add category")){

    const addNewCategory ={
      id: new Date().getMilliseconds() ,
      name: categoryName  };
  
    dispatch(addCategory(addNewCategory));
    navigate('/admin/category');
    alert('success added category');

   
  }else{
    return false;
}

 }


  return (
<>
<h1>Add Category</h1>
 <form onSubmit={handleSubmit}>

    <label htmlFor="categoryName">Category</label>

  <input type="text" name="category" id="categoryName" 
  placeholder="Title goes Here" value={categoryName}
   onChange={handleAddChange}/>


  <button type="submit">
  <FontAwesomeIcon icon={faAdd}  />
  </button>
 </form>

</>  )
}

export default AddNewCategory