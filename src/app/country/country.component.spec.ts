import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { CountryComponent } from './country.component';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
let form:NgForm;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryComponent ],
      imports:[HttpClientModule,FormsModule,ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be reset', () => {
    const debugElement = fixture.debugElement;
    const form: NgForm = debugElement.children[0].injector.get(NgForm);
    const spy = spyOn(form, 'resetForm');
    component.resetFormValue(form);
    expect(spy).toHaveBeenCalled();
    // expect(component.isTrue).toBeTruthy();
    // expect(component.check).toBeFalsy();
    // expect(component.toggles).toBeFalsy();
    // expect(component.latitude).toBeNull();
    // expect(component.longitude).toBeNull();
  })
});
