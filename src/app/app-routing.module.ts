import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ScannerPageModule } from './dash/scanner/scanner.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'dash',
    loadChildren: () => import('./dash/dash.module').then( m => m.DashPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
