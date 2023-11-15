
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const CartShopping = ({value}: {value:number}) => {
  return (
<div> 
<FontAwesomeIcon icon={faCartShopping}  className='cartIcon' />
<span className='countCart'>{value}</span>
</div>
 )
}

export default CartShopping