import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OurServicesComponent } from './content/our-services/our-services.component';
import { PickUpComponent } from './content/pick-up/pick-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommodityResolver } from './service/resolvers';
import { TradeComponent } from './trade/trade.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'services', component: OurServicesComponent },
  {
    path: 'trade',
    component: TradeComponent,
    resolve: {
      commodities: CommodityResolver,
    },
  },
  {
    path: 'admin',
    component: AdminPageComponent,
  },

  { path: 'pickup', component: PickUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
