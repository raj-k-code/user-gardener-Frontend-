import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurserySignupComponent } from './nursery-signup.component';

describe('NurserySignupComponent', () => {
  let component: NurserySignupComponent;
  let fixture: ComponentFixture<NurserySignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurserySignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NurserySignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
