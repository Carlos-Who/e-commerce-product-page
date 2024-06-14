import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderReductedComponent } from './header-reducted.component';

describe('HeaderReductedComponent', () => {
  let component: HeaderReductedComponent;
  let fixture: ComponentFixture<HeaderReductedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderReductedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderReductedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
