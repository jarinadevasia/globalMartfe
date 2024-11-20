import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  // method to call getAllProducts api
  getAllProductsApi() {
    return this.http.get(`${this.server_url}/all-products`)
  }

  // method to call Product details by id
  getAllProductByIdApi(productId: any) {
    return this.http.get(`${this.server_url}/get-product/${productId}`)
  }

  // user register
  userRegisterApi(data: any) {
    return this.http.post(`${this.server_url}/user-register`, data)
  }

  // user login
  userLoginApi(data: any) {
    return this.http.post(`${this.server_url}/user-login`, data)
  }

  // adding products to wishlist
  addToWishlistApi(data: any) {
    return this.http.post(`${this.server_url}/add-wishlist`, data, this.addTokenToHeader())
  }

  // common function to create a custom header
  addTokenToHeader() {
    // 1) create an object of class httpHeaders
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  // get all wishlist items
  getAllWishlistApi() {
    return this.http.get(`${this.server_url}/allwishlistitems`, this.addTokenToHeader())
  }

  // delete item from wishlist
  deleteWishlistApi(id: any) {
    return this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`, this.addTokenToHeader())
  }

  // creating behavior subject to update the count of wishlist items in the header
  wishlistCount = new BehaviorSubject(0); //here initial value is set to zero

  getWishlistCount() {
    this.getAllWishlistApi().subscribe((res: any) => {
      this.wishlistCount.next(res.length)
    })
  }

  // add items in cart items
  addToCartApi(data: any) {
    return this.http.post(`${this.server_url}/add-cart`, data, this.addTokenToHeader())
  }

  // get all cart items
  getAllCartItemApi() {
    return this.http.get(`${this.server_url}/allCartitems`, this.addTokenToHeader())
  }

  // create a behaviour subject to update cart count
  cartCount = new BehaviorSubject(0);
  
  // get cart item count
  getCartCount() {
    this.getAllCartItemApi().subscribe((res: any) => {
      this.cartCount.next(res.length)
    })
  }

  // to increase the quantity
  incrementItemApi(id:any){
    return this.http.get(`${this.server_url}/cart/increment/${id}`,this.addTokenToHeader())
  }

  // to decrease the quantity
  decrementItemApi(id:any){
    return this.http.get(`${this.server_url}/cart/decrement/${id}`,this.addTokenToHeader())
  }

  // to empty the cart 
  emptyCartApi(){
    return this.http.delete(`${this.server_url}/empty-cart`,this.addTokenToHeader())
  }

  // to delete a cart item
  deleteCartItemApi(id:any){
    return this.http.delete(`${this.server_url}/delete-cartitem/${id}`,this.addTokenToHeader());
  }

}

