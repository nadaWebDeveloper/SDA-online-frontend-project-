import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { deleteAllItemFromCart, deleteFromCart } from '../../redux/slices/cart/cartSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
  const { cartItem } = useSelector((state: RootState) => state.cartReducer)
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteCart = (id: number) => {
    if (confirm('Are you sure to delete item')) {
      dispatch(deleteFromCart(id))
    } else {
      return false
    }
  }

  const handleClearTheCart = () => {
    if (confirm('Are you sure to clear the Cart')) {
      dispatch(deleteAllItemFromCart())
    } else {
      return false
    }
  }

  const TotalAmountOfCart = () => {
    const totalAmount = cartItem.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
    return totalAmount;
  }

  return (
    <div className="cart">
      <h1>Cart Page</h1>
      <br />
      {cartItem.length > 0 ? (
        <h2>You have {cartItem.length} Items in the cart</h2>
      ) : (
        <h2>No Item Added Yet...</h2>
      )}

      {cartItem.length > 0 && (
        <div>
          <button onClick={handleClearTheCart}>Clear the Cart</button>
          <br />
          <br />

          <div className="tableDiv">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>price</th>
                  <th> * </th>
                </tr>
              </thead>
              <tbody>
                {cartItem.map((cartElement) => {
                  const { id, name, image, price } = cartElement
                  return (
                    <tr key={id}>
                      <td>
                      <img src={image}  alt={name}  className="productCartImage"/>{' '}
                      </td>
                      <td>{name}</td>
                      <td>{price} RS</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faClose}
                          className="closeRightCart"
                          onClick={() => {
                            handleDeleteCart(id)
                          }}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <br />
          <br />

            <h2>Total for basket : {TotalAmountOfCart()} RS</h2>
         
        </div>
      )}
    </div>
  )
}

export default Cart
