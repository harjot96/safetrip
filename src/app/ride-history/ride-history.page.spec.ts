import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RideHistoryPage } from './ride-history.page';

describe('RideHistoryPage', () => {
  let component: RideHistoryPage;
  let fixture: ComponentFixture<RideHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RideHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
