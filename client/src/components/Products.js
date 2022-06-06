import React from 'react'

const Products = ({products, handleCart}) => {
  return (
    <>
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
    </>
  )
}

export default Products