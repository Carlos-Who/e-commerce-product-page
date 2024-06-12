import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatBadge} from "@angular/material/badge";

@Component({
  selector: 'element-cart',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatBadge
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  isCartDialogOpen: boolean = false;


  public toggleCartDialog(): void {
    this.isCartDialogOpen = !this.isCartDialogOpen;
  }

}
