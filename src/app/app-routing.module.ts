import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import{ApplicationComponent} from './components/application/application.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'application', component: ApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule],
  exports: [RouterModule]
})

export class AppRoutingModule{}
