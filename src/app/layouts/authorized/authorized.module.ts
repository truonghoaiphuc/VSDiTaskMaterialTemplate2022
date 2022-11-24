import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { authorizedRoutes } from "./authorized.routing";

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(authorizedRoutes)],
})
export class AuthorizedModule {}
