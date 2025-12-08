import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPropPage } from './add-prop.page';

describe('AddPropPage', () => {
  let component: AddPropPage;
  let fixture: ComponentFixture<AddPropPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
