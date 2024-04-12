import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashPage } from './dash.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'qr-generator',
        loadChildren: () => import('./qr-generator/qr-generator.module').then( m => m.QrGeneratorPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashPageRoutingModule {}
