import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateclaimComponent } from './createclaim.component';

describe('CreateclaimComponent', () => {
  let component: CreateclaimComponent;
  let fixture: ComponentFixture<CreateclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
