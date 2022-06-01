import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParticularProductComponent } from './view-particular-product.component';

describe('ViewParticularProductComponent', () => {
  let component: ViewParticularProductComponent;
  let fixture: ComponentFixture<ViewParticularProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewParticularProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParticularProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
