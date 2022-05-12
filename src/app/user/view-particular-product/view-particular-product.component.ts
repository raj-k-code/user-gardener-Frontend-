import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-particular-product',
  templateUrl: './view-particular-product.component.html',
  styleUrls: ['./view-particular-product.component.css']
})
export class ViewParticularProductComponent implements OnInit {
  productId: any;
  product = new Product("", "", "", "", "", "", "");
  starRating = 0;

  constructor(private activatedRouter: ActivatedRoute, private toaster: ToastrService, private productService: ProductService, private router: Router) {
    this.productId = activatedRouter.snapshot.paramMap.get('id');

    productService.productById(this.productId).subscribe(data => {
      console.log(data);
      var total = 0;
      if (data._id) {
        for (let rating of data.productRating) {
          total = total + rating.rate;
        }

        this.starRating = total / 5;

        this.product = data;
        console.log(this.product);
      }
      else {
        toaster.info("This Is Product Not Found", "Sorry");
        router.navigate(['/']);
      }
    }, err => {

    });
  }

  ngOnInit(): void {
  }

}
