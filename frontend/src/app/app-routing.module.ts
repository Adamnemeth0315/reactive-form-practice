import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { FormGuard } from './guard/form.guard';
import { AddHeroComponent } from './pages/add-hero/add-hero.component';
import { HeroEditorComponent } from './pages/hero-editor/hero-editor.component';
import { HeroTableComponent } from './pages/hero-table/hero-table.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [FormGuard],
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'heroes-tab',
    component: HeroTableComponent,
    canActivate: [AuthGuard],
    data: { animation: 'heroes' },
  },
  {
    path: 'hero-edit/:id',
    component: HeroEditorComponent,
    canActivate: [AuthGuard],
    data: { animation: 'hero' },
  },
  {
    path: 'new-hero',
    component: AddHeroComponent,
    canActivate: [AuthGuard],
    canDeactivate: [FormGuard],
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
