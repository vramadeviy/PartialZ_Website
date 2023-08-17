import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyemployeedirectoryComponent } from './modifyemployeedirectory.component';

describe('ModifyemployeedirectoryComponent', () => {
  let component: ModifyemployeedirectoryComponent;
  let fixture: ComponentFixture<ModifyemployeedirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyemployeedirectoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyemployeedirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
