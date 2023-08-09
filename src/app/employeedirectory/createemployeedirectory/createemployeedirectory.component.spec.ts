import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateemployeedirectoryComponent } from './createemployeedirectory.component';

describe('CreateemployeedirectoryComponent', () => {
  let component: CreateemployeedirectoryComponent;
  let fixture: ComponentFixture<CreateemployeedirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateemployeedirectoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateemployeedirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
