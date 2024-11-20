import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getAllWishlistItems();
  }
  allWishlistItems: any = [];
  getAllWishlistItems() {
    this.apiService.getAllWishlistApi().subscribe({
      next: (res) => {
        this.allWishlistItems = res;
        console.log('all wishlist items', this.allWishlistItems);
      },
      error: (res) => {
        console.log(res);
      }
    })
  }
  deleteWishlistItem(id:any) {
    // alert(id)
    this.apiService.deleteWishlistApi(id).subscribe({
      next:(res:any)=>{
        // console.log('deleted item',res);
        alert(`${id} Deleted Successfully`)
        // for refreshing the page
        this.getAllWishlistItems();
        this.apiService.getWishlistCount();
      },
      error:(res)=>{
        console.log(res); 
      }
    })
   }
   addToCart(data:any){
    Object.assign(data,{quantity:1})
    this.apiService.addToCartApi(data).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: 'Success',
          text: `Product added successfully`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.deleteWishlistItem(data._id);
        this.apiService.getCartCount();
        this.apiService.getWishlistCount();
      },
      error:(res)=>{
        console.log(res);
        Swal.fire({
          title: 'Warning',
          text: `Product already exits in your wishlist`,
          icon: 'warning',
          confirmButtonText: 'got it'
        });
      }
    })
   }
}
