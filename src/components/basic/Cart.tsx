import { useDispatch, useSelector } from "react-redux"

import { AppDispatch, RootState } from "../../redux/store"
import { deleteAllItemFromCart, deleteFromCart } from "../../redux/slices/cart/cartSlice"
import { faClose} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Cart = ()=> {

 const {cartItem} = useSelector((state: RootState) => state.cartReducer)
 const dispatch = useDispatch<AppDispatch>()


 const handleDeleteCart = (id: number) => {

  if(confirm("Are you sure to Add category")){

  dispatch(deleteFromCart(id))
  alert('success deleted');
  
  }else{
    return false;
}
}
const handleClearTheCart =() => {

  if(confirm("Are you sure to clear the Cart")){

    dispatch(deleteAllItemFromCart())
    alert('success deleted all items');
    
    }else{
      return false;
  }

}

const TotalForBasket = () =>
{
  let totalAmount = 0
  cartItem.map((cartItem) => (totalAmount = totalAmount +cartItem.price))
   return totalAmount;
}



  return (
    <div>
        <h1>Cart Page</h1>
        <div>
          <h2>You have {cartItem.length > 0 ? cartItem.length : 0} Item in the cart</h2>
          <div className="cartShop">
            {cartItem.length >0 && 
            <>
            <button onClick={handleClearTheCart}>Clear the Cart</button>

            <div className="cartElement">
             {cartItem.map((cartElement) => {
                const  {id, name, image, price , description} = cartElement
              return (
                <article className="product-container" key={id}>
                <div className="rightSide">
                     <FontAwesomeIcon  icon={faClose}  onClick={() => {
                      handleDeleteCart(id)
                    }}  />
                 <img src={image} className="product-thumb" alt={name} />
                </div>

                
                <div className="leftSide">
                <h4 className="product-brand">{name}</h4>
                <p>{description.substring(0, 10)} ...</p>
                  <span className="price">{price} RS</span>
                  <span className="actual-price">2000 RS</span>
               </div>
              </article>

              )
             })}
             <div>
              <h2>Total for basket : {TotalForBasket()} RS</h2>
             </div>
            </div>        
            </>
            }
          </div>
        </div>
    </div>
  )
}

export default Cart