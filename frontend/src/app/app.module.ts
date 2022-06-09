import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './common/nav/nav.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroCardComponent } from './common/hero-card/hero-card.component';
import { AddHeroComponent } from './pages/add-hero/add-hero.component';
import { DialogComponent } from './common/dialog/dialog.component';
import { HeroTableComponent } from './pages/hero-table/hero-table.component';
import { HeroEditorComponent } from './pages/hero-editor/hero-editor.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { QuestionnaireFirstComponent } from './pages/questionnaire-first/questionnaire-first.component';
import { QuestionnaireSecondComponent } from './pages/questionnaire-second/questionnaire-second.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    HeroesComponent,
    HeroCardComponent,
    AddHeroComponent,
    DialogComponent,
    HeroTableComponent,
    HeroEditorComponent,
    QuestionnaireComponent,
    ConfirmDialogComponent,
    QuestionnaireFirstComponent,
    QuestionnaireSecondComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
