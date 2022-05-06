import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {
  category = new Category("", "", "");
  productList: Product[] = []
  page: any

  constructor(private activatedRouter: ActivatedRoute, private categoryService: CategoryService, private toaster: ToastrService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {

    let id = this.activatedRouter.snapshot.paramMap.get('id')
    this.categoryService.categoryById(id).subscribe(data => {
      this.category = data;

      this.productService.productByCategory(this.category.categoryName).subscribe(data => {
        this.productList = data
        console.log(this.productList)
      }, err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            this.toaster.info("No Products Found With This Category", "Sorry");
            this.router.navigate(['/']);
          }
          else if (err.status == 500) {
            this.toaster.error("Internal Server Error", "Error");

          }
          else if (err.status == 400) {
            this.toaster.error("Bad Request", "Error");

          }
        }
      });


    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.info("Category Not Found Yet", "Sorry");
          this.router.navigate(['/']);
        }
        else if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");

        }
      }
    });


  }

}
