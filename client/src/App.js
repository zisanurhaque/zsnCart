import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {

  const [products, setProducts] = useState([])
  const [cartItem, setCartItem] = useState([])
  const [toggle, setToggle] = useState(true)

  const handleCart = async(id) => {
    const value = {
      id: id
    }
    await axios.post('https://zsncart.herokuapp.com/addtocart', value)
  }

  const handleDelete = (id) => {
    axios.delete(`https://zsncart.herokuapp.com/deleteItem/${id}`)
  }

  const handleQty = async(value) => {
    if(value.type === "inc"){
      await axios.put("https://zsncart.herokuapp.com/increment", value)
    }
    else if(value.type === "dec"){
      await axios.put("https://zsncart.herokuapp.com/decrement", value)
    }
  }

  const handleToggle = (e) => {
    e.preventDefault()
    setToggle(!toggle)
  }

  useEffect(() => {

    fetch("https://zsncart.herokuapp.com/getProducts", {
      method: "get"
    }).then((response) => response.json()).then(response => setProducts(response))

    fetch("https://zsncart.herokuapp.com/getCartItems", {
      method: "get"
    }).then((response) => response.json()).then(response => setCartItem(response))

  }, [cartItem])

  return (
    <>
        <div className='container'>
          
          <button className='toggle' onClick={(e) => handleToggle(e)}>
            Cart({cartItem?.length})
          </button>
          <div className='product-page'>
            <h5>Products</h5>
            {
              products.map((product, index) => (
                <div className='card' key={index}>
                  <h4 className='title'>
                    {product.name}
                  </h4>
                  <h6 className='price'>{product.currency}{product.price}</h6>
                  <button onClick={() => {
                    handleCart(product._id)
                  }}>Add To Cart</button>
                </div>
              ))
            }
          </div>
          {
            !toggle ? "" : 
            <div className='cart-page'>
            <h4>Shopping Cart</h4>
            <div className='list header'>
              <p className='name'>Course Name</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total Price</p>
              <p className='delete'>X</p>
            </div>
            {
              cartItem.map((item, index) => (
                <div className='list' key={index}>
                  <p className='name'>{item.name}</p>
                  <p className='price'>{item.currency}{item.price}</p>
                  <p className='counter'>
                      <button onClick={() => handleQty({
                        id: item._id,
                        type: "dec"
                      })}>-</button>
                        <span>{item.qty}</span>
                      <button onClick={() => handleQty({
                        id: item._id,
                        type: "inc"
                      })}>+</button>
                  </p>
                  <p>{item.currency}{item.total}</p>
                  <button className='delete' onClick={() => handleDelete(item._id)}>X</button>
                </div>
              ))
            }
            {
              cartItem?.length === 0 ? "" : 
              <div className='list footer'>
                <p className='name'></p>
                <p className='price'></p>
                <p className='counter'>Total Price</p>
                <p>
                  {
                    cartItem?.reduce((a, b) => {
                      return a + b.total
                    }, 0)
                  }
                </p>
                <p className='delete'></p>
              </div>
            }
          </div>
          }
        </div>
    </>
  )
}

export default App