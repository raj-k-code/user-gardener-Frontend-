import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDescriptionComponent } from './blog-description.component';

describe('BlogDescriptionComponent', () => {
  let component: BlogDescriptionComponent;
  let fixture: ComponentFixture<BlogDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
