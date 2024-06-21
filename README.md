# Sakai

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Starting

Run `npm install` for install all dependencies in package.json in your project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Add Firebase in your project

1. Run `npm i firebase @angular/fire` to install firebase modules in your app.

2. Add firebase config in enviroment.prod. Open firebase console and copy config in project configuration in firebase

```json
  firebase =
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  }
```

3. Open file app.module.ts and add imports to firebase modules

```javascript
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { environment } from "../environments/environment.prod";

imports: [AngularFireModule.initializeApp(environment.firebase), AngularFireStorageModule];
```

4. In app/demo/components/pages/crud create a directory `services` and in the same add file `product.service.ts` with content:

```javascript

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Product } from './models/product.model'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  productRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPath);
  }

  getItems(): Observable<Product[]> {
    return this.productRef.valueChanges();
  }

  addItem(product: Product): void {
    this.productRef.push(product);
  }

  deleteItem(key: string): void {
    this.productRef.remove(key);
  }
}

```

5. In app/demo/components/pages/crud create a directory `models` and in the same add file `product.model.ts` with content:

```javascript
interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    key?: string;
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}
```

6. Add in `crud.component.ts` imports to new service and model files:

```javascript
import { Product } from "./models/product.model";
import { ProductService } from "./services/product.service";
```

7. Adjust function CRUD in crud.component.ts

```javascript
// in deleteProduct
this.productService.deleteProduct(product.key);

// in confirmDeleteSelected
this.selectedProducts.forEach((product) => {
    this.productService.deleteProduct(product.key);
});

// in saveProduct if
this.productService.updateProduct(this.product.key, this.product);

// in saveProduct else
this.product.inventoryStatus = 'INSTOCK';
this.productService.addProduct(this.product);
```

8. Run application with `npm start` OBS.: If present error, run `npm i --force` to install modules and solution incompatibled modules. After, run `npm start`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
