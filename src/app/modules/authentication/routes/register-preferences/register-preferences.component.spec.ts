import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPreferencesComponent } from './register-preferences.component';

describe('RegisterPreferencesComponent', () => {
  let component: RegisterPreferencesComponent;
  let fixture: ComponentFixture<RegisterPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
