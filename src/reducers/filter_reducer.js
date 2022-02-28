import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch(action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);
      return {...state, allProducts: [...action.payload], filteredProducts: [...action.payload], filters: {...state.filters, maxPrice, price: maxPrice}}
    
    case SET_GRIDVIEW:
      return {...state, gridView: true}
    
    case SET_LISTVIEW:
      return {...state, gridView: false}

    case UPDATE_SORT:
      return {...state, sort: action.payload}
    
    case SORT_PRODUCTS:
      const {sort, filteredProducts} = state;
      let tempProducts = [];
      
      if(sort === 'price-lowest'){
        tempProducts = filteredProducts.sort((a,b) => a.price - b.price);
      }

      if(sort === 'price-highest'){
        tempProducts = filteredProducts.sort((a,b) => b.price - a.price)
      }

      if(sort === 'name-a'){
        tempProducts = filteredProducts.sort((a,b) => a.name.localeCompare(b.name))
      }

      if(sort === 'name-z'){
        tempProducts = filteredProducts.sort((a,b) => b.name.localeCompare(a.name))
      }

      return {...state, filteredProducts: tempProducts}
    
    case UPDATE_FILTERS:
      let {name, value} = action.payload;
      return {...state, filters: {...state.filters, [name]: value}}

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
