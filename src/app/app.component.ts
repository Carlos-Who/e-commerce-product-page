import {Component, effect, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/layout/header/header.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";
import {HeaderReductedComponent} from "./shared/layout/header-reducted/header-reducted.component";
import {BreakpointsService} from "./core/services/breakpoints/breakpoints.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderReductedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public breakpointsService: BreakpointsService  = inject(BreakpointsService);
  public currentBreakpoint: string = "";

  constructor() {
    effect(() => {
      this.currentBreakpoint = this.breakpointsService.currentScreenSize();
    });
  }

}
