import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
    if(action.type === ADD_TO_CART){
      const {id, color, amount, product} = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);
      if(tempItem){
        // Already present in cart
        const tempCart = state.cart.map((item) => {
          if(item.id === id + color){
            let newAmount = item.amount + amount;
            if(newAmount > item.max){
              newAmount = item.max
            }

            return {...item, amount: newAmount}
          }else{
            return item;
          }
        })

        return {...state, cart: tempCart}
      }else{
        // Not present in cart
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock
        }

        return {...state, cart: [...state.cart, newItem]}
      }
    }

    if(action.type === REMOVE_CART_ITEM){
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return {...state, cart: tempCart}
    }
      
    if(action.type === CLEAR_CART){
      return {...state, cart: []}
    }

    if(action.type === TOGGLE_CART_ITEM_AMOUNT){
      const {id, value} = action.payload;
      const tempCart = state.cart.map((item) => {
        if(item.id === id){
          if(value === "increase"){
            let newAmount = item.amount + 1;
            if(newAmount > item.max){
              newAmount = item.max;
            }
            return {...item, amount: newAmount}
          }else{
            let newAmount = item.amount - 1;
            if(newAmount < 1){
              newAmount = 1;
            }
            return {...item, amount: newAmount}
          }
        }else{
          return item;
        }
      });
      return {...state, cart: tempCart}
    }

    if(action.type === COUNT_CART_TOTALS){
      const {totalItems, totalPrice} = state.cart.reduce((acc, currItem) => {
          const {amount, price} = currItem;
          acc.totalItems += amount;
          acc.totalPrice += price * amount;
          return acc;
      }, {totalItems: 0, totalPrice: 0})

      return {...state, totalItems, totalPrice}
    }

    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
