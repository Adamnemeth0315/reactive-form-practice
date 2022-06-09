import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireSecondComponent } from './questionnaire-second.component';

describe('QuestionnaireSecondComponent', () => {
  let component: QuestionnaireSecondComponent;
  let fixture: ComponentFixture<QuestionnaireSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
