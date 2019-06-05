import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from './interfaces/IProduct';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get('http://localhost:3000/products/shopee').pipe(map((res: any) => {
        return (res.data.list as any[]).map(i => {
          return {
            id: i.id,
            price: i.price,
            images: i.images,
            boostCoolDownSeconds: i.boost_cool_down_seconds,
            name: i.name
          } as IProduct;
        });
    }));
  }

  boost(id: number) {
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.post('http://localhost:3000/products/boost', {id: id});
  }
}
