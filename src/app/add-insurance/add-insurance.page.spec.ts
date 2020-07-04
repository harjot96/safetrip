import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddInsurancePage } from './add-insurance.page';

describe('AddInsurancePage', () => {
  let component: AddInsurancePage;
  let fixture: ComponentFixture<AddInsurancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsurancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddInsurancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
