import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

  formValue: any[] = [];
  currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  questionnaireForm = new FormGroup({
    firstGroup : new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      quality: new FormControl('', []),
      design: new FormControl('', [])
    }),
    secondGroup : new FormGroup({
      simplicity: new FormControl('', []),
      performance: new FormControl('', []),
      opinion: new FormControl(''),
      scoring: new FormControl('', [])
    }),
  })

  onSubmit() {
    this.formValue = this.questionnaireForm.value;
    console.log(this.formValue);
  }

  onStepPage(step: number): void {
    this.currentPage += step;
  }
}
