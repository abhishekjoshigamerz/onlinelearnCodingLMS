// ProductList.js
import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';

const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
]

const ProductList = () => {
    const { dispatch } = useContext(CartContext);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', item: product });
    }

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                </div>
            ))}
        </div>
    )
}

export default ProductList;
