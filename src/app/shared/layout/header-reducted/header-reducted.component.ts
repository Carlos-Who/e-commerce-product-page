import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {CartComponent} from "../../components/cart/cart.component";
import {MatTooltip} from "@angular/material/tooltip";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-header-reducted',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CartComponent,
    MatTooltip,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('menuAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
  templateUrl: './header-reducted.component.html',
  styleUrl: './header-reducted.component.scss'
})
export class HeaderReductedComponent {

  public isMobileMenuOpen: boolean = false;

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
