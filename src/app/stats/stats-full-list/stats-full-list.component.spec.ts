import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StatsFullListComponent } from './stats-full-list.component';

describe('StatsFullListComponent', () => {
  let component: StatsFullListComponent;
  let fixture: ComponentFixture<StatsFullListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsFullListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsFullListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
