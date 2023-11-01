import { useDispatch, useSelector } from "react-redux"
import AdminSideBar from "./AdminSideBar"
import { AppDispatch, RootState } from "../../redux/store"
import { useEffect } from "react"
import { fetchOrder } from "../../redux/slices/order/order"

const AdminOrder=() => {

  const { orders, isLoading, error } = useSelector((state: RootState) => state.orderReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchOrder())
  }, [])

  if (isLoading) {
    return <h1>loading ...</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }
  return (
<>
<div className="container">
<div className="sectionAdmin">
  <AdminSideBar />
</div>
  <div className="mainContent">
    
    
  {orders.length > 0 ? (
          <div className="product">
            {orders.map((order) => {
              const { id, productId, userId, purchasedAt } = order
              return (
                <div  key={id}>
                  <h2 >{productId}</h2>
                  <p>{userId}</p>
                  <p>{purchasedAt}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <h1>Not Add orders Yet ... </h1>
        )}


  </div>
</div>
</>  )
}

export default AdminOrder