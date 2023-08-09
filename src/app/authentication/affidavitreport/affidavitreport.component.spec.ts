import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffidavitreportComponent } from './affidavitreport.component';

describe('AffidavitreportComponent', () => {
  let component: AffidavitreportComponent;
  let fixture: ComponentFixture<AffidavitreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffidavitreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffidavitreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
