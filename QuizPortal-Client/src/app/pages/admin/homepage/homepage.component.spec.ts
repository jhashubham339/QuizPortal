import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomepageComponent } from './homepage.component';

describe('AdminHomepageComponent', () => {
  let component: AdminHomepageComponent;
  let fixture: ComponentFixture<AdminHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});