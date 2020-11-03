import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TopscorersComponent } from './topscorers/topscorers.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';
import { MyteamComponent } from './myteam/myteam.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"", component: PocetnaComponent, canActivate: [AuthGuard]},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"topscorers", component: TopscorersComponent, canActivate: [AuthGuard]},
  {path:"standings", component: StandingsComponent, canActivate: [AuthGuard]},
  {path:"teams", component: TeamsComponent, canActivate: [AuthGuard]},
  {path:"myteam", component: MyteamComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [PocetnaComponent, LoginComponent, RegisterComponent, NavbarComponent, TopscorersComponent, StandingsComponent, TeamsComponent, MyteamComponent, FooterComponent];