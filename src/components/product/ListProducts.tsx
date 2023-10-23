import { useDispatch, useSelector } from 'react-redux'
import {RootState} from '../../redux/store'

export function ListProducts() {

  const {items} = useSelector((state:RootState)=> state.products)
  const dispatch = useDispatch()

  return (
    <div id="Product" className="product">
      <h2 className="product-category">best selling</h2>
      <button className="pre-btn"></button>
      <button className="nxt-btn"></button>

     {items.map((product)=> {
      const { id, name,image,description,categories,variants,sizes} = product
      return(
        <div className="product-container" key={id}>
        <div className="product-card">
           <div className="product-image">
            <span className="discount-tag">50% off</span>
            <img src={image} className="product-thumb" alt={name} />
            <button className="card-btn">add to whish list</button>
          </div>

          <div className="product-info">
            <h2 className="product-brand">{name}</h2>
            <p className="product-short-des">{description}</p>
            <span className="price">{sizes} RS</span>
            <span className="actual-price">$40</span>
          </div>  
        </div>
      </div>
      )
     })}
    

    </div>
  )
}

    {/* {deleteBook.length > 0 ? ():()} */}
