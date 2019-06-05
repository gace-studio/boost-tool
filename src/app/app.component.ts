import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './interfaces/IProduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: IProduct[];
  constructor(private productSvc: ProductService) {
    this.productSvc.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  boost(id: number) {
    this.productSvc.boost(id).subscribe((res: any) => {
      console.log(res);
      if (res.code !== 0) {
        alert(res.user_message);
      }
    });
  }
}
