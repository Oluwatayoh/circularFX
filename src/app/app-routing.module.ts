import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OurServicesComponent } from './content/our-services/our-services.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommodityResolver } from './service/resolvers';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'services', component: OurServicesComponent },
  {
    path: 'admin', component: AdminPageComponent,
    resolve: {
      // resetPassword: CommodityResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
