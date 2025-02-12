import { create } from 'zustand';

export const useProductStore = create((set) => ({
   products: [],
   setProducts: (products) => set({ products }),
   createProduct: async (newProduct) => {
    if(!newProduct.image || !newProduct.name || !newProduct.price) {
        return {success: false, message: "All fields are required"}
    }
    const res = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
        
    });
    const data = await res.json();
    if(data.success) {
        set((state)=> ({products: [...state.products, data.data]}))
        return {success: true, message: "Profuct created successfully"};
    }
    return {success: false, message: data.message};
   },
   fetchProducts: async () => {
    const res = await fetch("/api/products", {
        method: "GET",
    })
    const data = await res.json();    
    if(data.success) {
        set(() => ({
            products: data.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          }));
    }
   },
   deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
    })

    const data = await res.json();
    console.log(data);
    

    if(!data.success) return {success: false, message: data.message} 

    set(state => ({products: state.products.filter(product => product._id !== pid)}))
    return {success: true, message: data.message}
   } 
   
}));
