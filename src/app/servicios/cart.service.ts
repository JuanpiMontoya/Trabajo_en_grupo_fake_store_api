import { Injectable } from '@angular/core';
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productos_carrito: Product[] = [];

  constructor() {}

  agregarAlCarrito(producto: Product) {
    const productoExistente = this.productos_carrito.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.quantity = (productoExistente.quantity || 0) + (producto.quantity || 1);
    } else {
      this.productos_carrito.push({ ...producto, quantity: producto.quantity || 1 });
    }
  }

  eliminarDelCarrito(index: number) {
    this.productos_carrito.splice(index, 1);
  }

  vaciarCarrito() {
    this.productos_carrito = [];
  }

  getProductos(): Product[] {
    return this.productos_carrito;
  }

  getTotal(): number {
    return this.productos_carrito.reduce((total, producto) => total + (producto.price * (producto.quantity || 1)), 0);
  }

  actualizarProductoEnCarrito(producto: Product) {
    const productoExistente = this.productos_carrito.find(p => p.id === producto.id);
    if (productoExistente) {
      productoExistente.quantity = producto.quantity;
    }
  }
}
