import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPropPage } from './add-prop.page';
import { IonicModule } from '@ionic/angular';

describe('AddPropPage', () => {
  let component: AddPropPage;
  let fixture: ComponentFixture<AddPropPage>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [AddPropPage],
    imports: [IonicModule.forRoot()]
  }).compileComponents();

  fixture = TestBed.createComponent(AddPropPage);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
