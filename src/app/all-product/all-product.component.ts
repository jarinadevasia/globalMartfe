import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  constructor(private apiService: ApiService) { }
  allProducts: any = []
  ngOnInit() {
    this.apiService.getAllProductsApi().subscribe({
      next: (res) => {
        console.log('all products', res);
        this.allProducts = res;
      },
      error: (res) => {
        console.log(res);

      }
    })
  }
  addToWishlist(product: any) {
    // alert(product)
    if (sessionStorage.getItem('token')) {
      // alert('inside')
      this.apiService.addToWishlistApi(product).subscribe({
        next: (res: any) => {
          console.log('add to wishlist', res);
          this.apiService.getWishlistCount();
          Swal.fire({
            title: 'Success',
            text: `Product added successfully`,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        error: (res) => {
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
    else {
      Swal.fire({
        title: 'Warning',
        text: 'please login',
        icon: 'warning'
      })
    }
  }
  addToCart(product: any) {
    // alert(product)
    if (sessionStorage.getItem('token')) {
      // alert('inside')
      Object.assign(product, { quantity: 1 })
      this.apiService.addToCartApi(product).subscribe({
        next: (res: any) => {
          console.log('add to cart', res);
          this.apiService.getCartCount();
          Swal.fire({
            title: 'Success',
            text: `Product added successfully`,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          
        },
        error: (res:any) => {
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
    else {
      Swal.fire({
        title: 'Warning',
        text: 'please login',
        icon: 'warning'
      })
    }
  }

}
