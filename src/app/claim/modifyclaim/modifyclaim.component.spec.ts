import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyclaimComponent } from './modifyclaim.component';

describe('ModifyclaimComponent', () => {
  let component: ModifyclaimComponent;
  let fixture: ComponentFixture<ModifyclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
