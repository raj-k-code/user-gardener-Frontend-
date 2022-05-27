import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenerProfileComponent } from './gardener-profile.component';

describe('GardenerProfileComponent', () => {
  let component: GardenerProfileComponent;
  let fixture: ComponentFixture<GardenerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
