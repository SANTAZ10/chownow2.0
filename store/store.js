import {create} from 'zustand';

export const useStore = create((set) => ({
  //cart
  cart : {
    pizzas : []
  },

  //add to cart
  addPizza : (data) => 
  set((state) => ({
    cart: {
      pizzas: [...state.cart.pizzas, data]
    }
  })),

  removePizza : (index) => set((state) => ({
    cart : {
      pizzas: state.cart.pizzas.filter((_, i) => i !=index)
    }
  })),

}))