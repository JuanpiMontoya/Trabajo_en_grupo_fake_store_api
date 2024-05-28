import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core'; 

import { NosotrosComponent } from './nosotros.component';

describe('NosotrosComponent', () => {
  let component: NosotrosComponent;
  let fixture: ComponentFixture<NosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
