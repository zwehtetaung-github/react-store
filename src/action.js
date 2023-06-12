export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const increaseQuantity = (productId) => ({
    type: 'INCREASE_QUANTITY',
    payload: productId,
  });
  
  export const decreaseQuantity = (productId) => ({
    type: 'DECREASE_QUANTITY',
    payload: productId,
  });
  
  export const clearCart = () => ({
    type: 'CLEAR_CART',
  });