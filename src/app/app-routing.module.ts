import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

// const authRoutes: Routes = [
//   { path: '/', component: LoginComponent }
// ];
//
// @NgModule({
//   imports: [
//     RouterModule.forRoot(
//       authRoutes,
//       { enableTracing: true }
//     )
//   ],
//   exports: [
//     RouterModule
//   ]
// })

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
