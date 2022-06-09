import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireFirstComponent } from './questionnaire-first.component';

describe('QuestionnaireFirstComponent', () => {
  let component: QuestionnaireFirstComponent;
  let fixture: ComponentFixture<QuestionnaireFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireFirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
