import React from 'react'

const CartHeader = () => {
  return (
    <>
        <h4>Shopping Cart</h4>
        
        <div className='list header'>
            <p className='name'>Course Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total Price</p>
            <p className='delete'>X</p>
        </div>
    </>
  )
}

export default CartHeader