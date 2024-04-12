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
      {
        path: 'date-picker',
        loadChildren: () => import('./date-picker/date-picker.module').then( m => m.DatePickerPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashPageRoutingModule {}
