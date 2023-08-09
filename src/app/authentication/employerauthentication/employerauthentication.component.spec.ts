import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerauthenticationComponent } from './employerauthentication.component';

describe('EmployerauthenticationComponent', () => {
  let component: EmployerauthenticationComponent;
  let fixture: ComponentFixture<EmployerauthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerauthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerauthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
