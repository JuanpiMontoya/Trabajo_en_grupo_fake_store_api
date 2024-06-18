import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carts';

  constructor() {}

  async agregarAlCarrito(userId: number, productId: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_Id: userId, product_Id: productId, quantity: 1 })
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to add product to cart: ${errorMessage}`);
      }

      const result = await response.json();
      console.log('Producto agregado al carrito:', result);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert('Ocurrió un error al agregar el producto al carrito. Inténtelo de nuevo más tarde.');
    }
  }
  
  async vaciarCarrito() {
    try {
      await fetch(`${this.apiUrl}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  async getProductos(): Promise<Product[]> {
    try {
      const resp = await fetch(`${this.apiUrl}`);
      if (!resp.ok) {
        throw new Error('Failed to fetch cart products');
      }
      return await resp.json();
    } catch (error) {
      console.error('Error fetching cart products:', error);
      throw error;
    }
  }

  async getTotal(): Promise<number> {
    try {
      const productos = await this.getProductos();
      return productos.reduce((total, producto) => total + (producto.price * (producto.quantity || 1)), 0);
    } catch (error) {
      console.error('Error calculating cart total:', error);
      throw error;
    }
  }

  async actualizarProductoEnCarrito(producto: Product) {
    try {
      await fetch(`${this.apiUrl}/${producto.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });
    } catch (error) {
      console.error('Error updating product in cart:', error);
      throw error;
    }
  }

  async buscarProductoEnCarrito(userId: number, productId: number): Promise<Product | null> {
    try {
      const resp = await fetch(`${this.apiUrl}/search?userId=${userId}&productId=${productId}`);
      if (!resp.ok) {
        throw new Error('Failed to fetch product from cart');
      }
      const producto = await resp.json();
      return producto;
    } catch (error) {
      console.error('Error searching product in cart:', error);
      throw error;
    }
  }
}
