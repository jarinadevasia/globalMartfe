import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  // inject Activated class, for extracting id from url
  constructor(private router: ActivatedRoute, private apiService:ApiService) { }
  productData:any;
  ngOnInit(): void {
    this.router.params.subscribe((res: any) => {
      const id = res.id;
      console.log("id", id);
      this.getProductById(id);
    })
  }
  getProductById(id:any){
this.apiService.getAllProductByIdApi(id).subscribe({
  next:(res)=>{
    console.log('product detalis',res);
    this.productData = res;
  },
  error:(res)=>{
    console.log(res);
    
  }
})
  }
  addToWishlist(data:any){}
  addToCart(data:any){}
}
