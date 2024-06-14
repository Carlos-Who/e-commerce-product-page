import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {CartComponent} from "../../components/cart/cart.component";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header-reducted',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CartComponent,
    MatTooltip,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header-reducted.component.html',
  styleUrl: './header-reducted.component.scss'
})
export class HeaderReductedComponent {

  public isMobileMenuOpen: boolean = false;

  public toggleMobileMenu(): void {

  }

}
