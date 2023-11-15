import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { deleteOrder, fetchOrders } from "../../redux/slices/orders/orderSlice"
import { AppDispatch, RootState } from "../../redux/store"

const AdminOrder=() => {

  const { orders, isLoading, error } = useSelector((state: RootState) => state.orderReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const handleDelete = (id: number) => {

    if(confirm("Are you sure to delete order")){

    dispatch(deleteOrder(id))
    
    }else{
      return false;
  }

  }

  if (isLoading) {
    return <h1>loading ...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }
  
  return (

<div className="mainContent"> 
{orders.length > 0 ? (
  <div>
    <div className="tableDiv">
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>User Id</th>
            <th>purchasedAt</th>
            <th> * </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
     const { id, productId, userId, purchasedAt } = order
            return (
              <tr key={id}>
                <td>
                {productId}
                </td>
                <td>{userId}</td>
                <td>{purchasedAt}</td>
                <td>
             <button onClick={()=> {handleDelete(id)}} >Delete</button>     
                 
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
   
  </div>
) :(<h2>Not Add orders Yet ... </h2>) }
 </div>  

 )
}

export default AdminOrder




 