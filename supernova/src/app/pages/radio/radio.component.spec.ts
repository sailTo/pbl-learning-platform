import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
