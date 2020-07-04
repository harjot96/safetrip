import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgetotpPage } from './forgetotp.page';

describe('ForgetotpPage', () => {
  let component: ForgetotpPage;
  let fixture: ComponentFixture<ForgetotpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetotpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
