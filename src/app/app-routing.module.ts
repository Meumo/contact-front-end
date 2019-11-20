// tslint:disable-next-line: ordered-imports
import { NgModule, Component } from "@angular/core";
// tslint:disable-next-line: ordered-imports
import { Routes, RouterModule } from "@angular/router";
import {ContactComponent} from "./contact/contact.component";
import {DetailsComponent} from "./details/details.component";
import {NewComponent} from './new/new.component';
import {ModifyComponent} from './modify/modify.component';

const routes: Routes = [
  {path: "contact" , component: ContactComponent},
  {path: "details/:id" , component: DetailsComponent},
  {path: "new" , component: NewComponent},
  {path: "modify/:id" , component: ModifyComponent},
  {path: "" , redirectTo: "/contact", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // tslint:disable-next-line: object-literal-sort-keys
  exports: [RouterModule],
})
export class AppRoutingModule { }
