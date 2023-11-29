import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db , auth } from '../Config/Config';

export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, totalQty } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {
        case 'ADD_TO_CART':
                return {
                    totalQty: totalQty+1
                };

            case 'INC':
                
                return {
                    totalQty: totalQty+1,
                };
                

    
            case 'DEC':
                product = action.cart;
                if (totalQty > 1) {
                    return {
                        totalQty: totalQty-1,
                    }
                }
                else {
                    return state;
                }
    
            case 'DELETE':
                const filtered = shoppingCart.filter(product => product.ProductID !== action.id);
                product = action.cart;
                updatedQty = totalQty - product.qty;
                updatedPrice = totalPrice - product.qty * product.ProductPrice;
                return {
                    shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
                }
    
            case 'EMPTY':
                return {
                    shoppingCart: [], totalPrice: 0, totalQty: 0
                }
    
            default:
                return state;
    }
};
