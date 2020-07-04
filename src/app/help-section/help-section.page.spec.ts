import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpSectionPage } from './help-section.page';

describe('HelpSectionPage', () => {
  let component: HelpSectionPage;
  let fixture: ComponentFixture<HelpSectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpSectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
