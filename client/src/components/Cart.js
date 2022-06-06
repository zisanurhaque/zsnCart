import React from 'react'

const Cart = ({cartItem, handleQty, handleDelete}) => {
  return (
    <>
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
    </>
  )
}

export default Cart