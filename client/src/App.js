import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import CartHeader from './components/CartHeader'
import Cart from './components/Cart'
import Products from './components/Products'
import CartFooter from './components/CartFooter'

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
          
          <Products products={products} handleCart={handleCart}/>

          {
            !toggle ? "" : 

            <div className='cart-page'>
              
              <CartHeader/>
              <Cart cartItem={cartItem} handleQty={handleQty} handleDelete={handleDelete}/>
              <CartFooter  cartItem={cartItem}/>

            </div>
          }
        </div>
    </>
  )
}

export default App