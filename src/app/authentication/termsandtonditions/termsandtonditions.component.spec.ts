import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandtonditionsComponent } from './termsandtonditions.component';

describe('TermsandtonditionsComponent', () => {
  let component: TermsandtonditionsComponent;
  let fixture: ComponentFixture<TermsandtonditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsandtonditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsandtonditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
