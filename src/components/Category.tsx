import AdminSideBar from "./admin/AdminSideBar"

const Category = () => {
  return (
<>
<div className="container">
  <AdminSideBar />
  <div className="mainContent">
    <form action="">
      <input type="text" name="Category" />
      <button>Create Category </button>
    </form>
<h2>List all the Category here </h2> 
<div>
  <p>Category name</p>
  <button>Edit</button>
  <button>Delete</button>

</div>
 </div>
</div>
</>  )
}

export default Category