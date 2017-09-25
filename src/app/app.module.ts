import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms"; // <-- #1 import module
import {HttpModule, JsonpModule} from "@angular/http";
import {LoginComponent} from "./login.component";
import {AppComponent} from "./app.component";
import {BearsComponent} from "./bears/bears.component";
import {BearsService} from "./bears.service";
import {AspectsService} from "./aspects.service";
import {AspectsComponent} from "./aspects/aspects.component";
import {BearDetailComponent} from "./bear-detail/bear-detail.component";
import {BearFormComponent} from "./bear-form/bear-form.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RoutingModule} from "./routing/routing.module";
import {FileSelectDirective} from "ng2-file-upload/ng2-file-upload";
import {BearCreateComponentComponent} from "./bear-create-component/bear-create-component.component";
import {BearCreateComponent} from "./bear-create/bear-create.component";
import {HeroFormComponent} from "./hero-form.component";
import {MaterialModule} from "@angular/material";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RoutingModule, // Add routes to the app
    ReactiveFormsModule,
    MaterialModule
  ],
    declarations: [
    AppComponent,
    BearsComponent,
    BearDetailComponent,
    AspectsComponent,
    BearFormComponent,
    LoginComponent,
    PageNotFoundComponent,
    FileSelectDirective,
    BearCreateComponentComponent,
    BearCreateComponent,
    HeroFormComponent
  ],
  providers: [BearsService,
  AspectsService],
  bootstrap: [AppComponent],

})
export class AppModule { }
