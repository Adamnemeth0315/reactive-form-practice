import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-questionnaire-second',
  templateUrl: './questionnaire-second.component.html',
  styleUrls: ['./questionnaire-second.component.scss']
})
export class QuestionnaireSecondComponent implements OnInit {

  simplicityArray: any[] = [
    { value: "egyertelmu", name: "Egyértelmű volt"},
    { value: "nemEgyertelmu", name: "Nem volt egyértelmű"},
  ];

  performanceArray: any[] = [
    { value: "megfelelo", name: "Megfelelő teljesítményt nyújtott"},
    { value: "atlagos", name: "Nem volta baj vele, de picit lehetett volna gyorsabb is"},
    { value: "nemMegfelelo", name: "Nem volt megfelelő a teljesítmény"},
  ];

  scoringArray: any[] = [
    { value: "one", name: "1"},
    { value: "two", name: "2"},
    { value: "three", name: "3"},
    { value: "four", name: "4"},
    { value: "five", name: "5"},
  ];

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

}
