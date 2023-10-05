import { NgModule } from '@angular/core';

import { WeatherComponent } from './weather/weather.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes:Routes = [
    {path: '',component:FrontpageComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'home', component:WeatherComponent},
    {path:"**" ,component:PageNotFoundComponent}
  ]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]

})
export class AppRoutingModule{}
export const routingComponents = [RegisterComponent,
    LoginComponent,
    WeatherComponent,
    PageNotFoundComponent
  ]