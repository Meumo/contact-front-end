import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactComponent } from "./contact/contact.component";
// tslint:disable-next-line: quotemark
// tslint:disable-next-line: ordered-imports
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { DetailsComponent } from "./details/details.component";
import { NewComponent } from './new/new.component';
import { ModifyComponent } from './modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    DetailsComponent,
    NewComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    // tslint:disable-next-line: trailing-comma
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [],
  // tslint:disable-next-line: object-literal-sort-keys
  bootstrap: [AppComponent],
})
export class AppModule { }
