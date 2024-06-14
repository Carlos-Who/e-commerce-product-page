import { Routes } from '@angular/router';
import {ProductComponent} from "./site/collections/product/product.component";

export const routes: Routes = [
  {
    path: "collections/products/fall-limited-edition-sneakers",
    component: ProductComponent
  },
  {
    path: "**",
    redirectTo: "/collections/products/fall-limited-edition-sneakers",
  }
];
