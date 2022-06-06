import React from 'react'

const CartFooter = ({cartItem}) => {
  return (
    <>
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
    </>
  )
}

export default CartFooter