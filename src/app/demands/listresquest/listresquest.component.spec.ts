import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListresquestComponent } from './listresquest.component';

describe('ListresquestComponent', () => {
  let component: ListresquestComponent;
  let fixture: ComponentFixture<ListresquestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListresquestComponent]
    });
    fixture = TestBed.createComponent(ListresquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
