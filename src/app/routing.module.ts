import {NgModule} from "@angular/core";

import {RouterModule, Routes} from "@angular/router";
import {EnrollListComponent} from "./components/enroll-list/enroll-list.component";
import {EnrollCreateComponent} from "./components/enroll-create/enroll-create.component";

const appRoutes: Routes = [
  {path: '', component: EnrollCreateComponent},
  {path: 'enrollments', component: EnrollListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
