import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'qr-generator',
    loadChildren: () => import('../qr-generator/qr-generator.module').then( m => m.QrGeneratorPageModule)
  },
  {
    path: 'date-picker',
    loadChildren: () => import('../date-picker/date-picker.module').then( m => m.DatePickerPageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('../scanner/scanner.module').then( m => m.ScannerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
