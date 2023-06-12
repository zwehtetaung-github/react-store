const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || [],
  };
  
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item._id === newItem._id);

            if (existingItem) {
                // If the item already exists in the cart, update its quantity
                return {
                ...state,
                items: state.items.map((item) =>
                    item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                };
            } else {
                // If the item doesn't exist in the cart, add it with quantity 1
                return {
                    ...state,
                    items: [...state.items, { ...newItem, quantity: 1 }],
                };
            }

        case 'INCREASE_QUANTITY':
            const increasedItemId = action.payload;
            return {
                ...state,
                items: state.items.map((item) =>
                    item._id === increasedItemId ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };

        case 'DECREASE_QUANTITY':
            const decreasedItemId = action.payload;
            return {
                ...state,
                items: state.items.map((item) => 
                    item._id === decreasedItemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                ),
            };

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
            };

        default:
            return state;
}
};
