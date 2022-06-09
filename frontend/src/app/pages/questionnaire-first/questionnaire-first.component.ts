import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-questionnaire-first',
  templateUrl: './questionnaire-first.component.html',
  styleUrls: ['./questionnaire-first.component.scss']
})
export class QuestionnaireFirstComponent implements OnInit {

  qualityArray: any[] = [
    { value: "nagyonJó", name: "Nagyon jó" },
    { value: "jó", name: "Jó" },
    { value: "átlagos", name: "Átlagos" },
    { value: "Rossz", name: "Rossz" }
  ];

  designArray: any[] = [
    { value: "nagyonJo", name: "Nagyon jó" },
    { value: "jo", name: "Jó" },
    { value: "atlagos", name: "Átlagos" },
    { value: "rossz", name: "Rossz" }
  ];

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

}
