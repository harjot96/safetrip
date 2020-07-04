import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindingDriverComponent } from './finding-driver.component';

describe('FindingDriverComponent', () => {
  let component: FindingDriverComponent;
  let fixture: ComponentFixture<FindingDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingDriverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindingDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
