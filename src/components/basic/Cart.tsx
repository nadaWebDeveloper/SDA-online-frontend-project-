import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import { Link } from "react-router-dom"

const Cart = ()=> {

 const {cartItem} = useSelector((state: RootState) => state.cartReducer)
  return (
    <div>
        <h1>Cart Page</h1>
        <div>
          <h2>You have {cartItem.length > 0 ? cartItem.length : 0} Item in the cart</h2>
          <div className="cartShop">
            {cartItem.length >0 && 
            <>
            <div className="cartElement">
             {cartItem.map((cartElement) => {
                const  {id, name, image, price , description} = cartElement
              return (
                <article className="product-container" key={id}>
                <div className="rightSide">
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
            </div>        
            </>
            }
          </div>
        </div>
    </div>
  )
}

export default Cart