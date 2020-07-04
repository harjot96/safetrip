import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverCardComponent } from './driver-card.component';

describe('DriverCardComponent', () => {
  let component: DriverCardComponent;
  let fixture: ComponentFixture<DriverCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
