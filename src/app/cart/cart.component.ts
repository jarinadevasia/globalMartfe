import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCartItems: any = [];
  totalPrice: any = 0;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getAllCartItems();
  }
  getAllCartItems() {
    this.apiService.getAllCartItemApi().subscribe({
      next: (res) => {
        console.log('cart item', res);
        this.allCartItems = res;
        this.getTotalPrice()
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
  decrementCartProduct(id: any) {
    // alert('decrement')
    this.apiService.decrementItemApi(id).subscribe({
      next:(res)=>{
        this.getAllCartItems();
        this.apiService.getCartCount();
        console.log(res);
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  incrementCartProduct(id: any) {
    // alert('increment')
    this.apiService.incrementItemApi(id).subscribe({
      next:(res)=>{
        this.getAllCartItems();
        this.apiService.getCartCount();
        console.log(res);
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  removeItem(id: any) {
    this.apiService.deleteCartItemApi(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllCartItems();
        this.apiService.getCartCount();
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
  getTotalPrice() {
    this.totalPrice=0;
    this.allCartItems.map((item: any) => {
      this.totalPrice = this.totalPrice + item.grandTotal
    })
    Math.ceil(this.totalPrice);
  }
  emptyCart(){
    this.apiService.emptyCartApi().subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllCartItems();
        this.apiService.getCartCount()
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  checkout(){
    sessionStorage.setItem('total Cart Value',JSON.stringify(this.totalPrice));
  }
}
