import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  searchText: any;
  productList: any[] = []

  constructor(private productService: ProductService, private toaster: ToastrService) {
    productService.viewProductList().subscribe(data => {
      this.productList = data
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          this.toaster.info("No Products Found", "Sorry");
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

  ngOnInit(): void {
  }

  searchTheProduct() {
    this.productService.searchProduct(this.searchText + "").subscribe(data => {
      if (data.length > 0)
        this.productList = data;
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 500) {
          this.toaster.error("Internal Server Error", "Error");

        }
        else if (err.status == 400) {
          this.toaster.error("Bad Request", "Error");

        }
      }
    });
  }

}
