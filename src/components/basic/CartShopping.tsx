
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const CartShopping = ({value}: {value:number}) => {
  return (
<>

<FontAwesomeIcon icon={faCartShopping}  className='cartIcon' />
<span className='countCart'>{value}</span>

</>  )
}

export default CartShopping