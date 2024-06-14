import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Injectable({
  providedIn: 'root'
})
export class BreakpointsService {

  public breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  public currentScreenSize: WritableSignal<string> = signal("");


  /**
   * Breakpoints
   * -
   *
   *  XSmall  (max-width: 599.98px)
   *
   *  Small   (min-width: 600px) and (max-width: 959.98px)
   *
   *  Medium	(min-width: 960px) and (max-width: 1279.98px)
   *
   *  Large	  (min-width: 1280px) and (max-width: 1919.98px)
   *
   *  XLarge	(min-width: 1920px)
   */
  breakpointsMap: Map<string, string> = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize.set(this.breakpointsMap.get(query) ?? 'Unknown');
          }
        }
      });
  }
}
