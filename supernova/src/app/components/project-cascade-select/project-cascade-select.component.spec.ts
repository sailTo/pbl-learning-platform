import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCascadeSelectComponent } from './project-cascade-select.component';

describe('ProjectCascadeSelectComponent', () => {
  let component: ProjectCascadeSelectComponent;
  let fixture: ComponentFixture<ProjectCascadeSelectComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCascadeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCascadeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
