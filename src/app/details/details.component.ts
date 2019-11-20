import { Component, OnInit } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ContactService} from "../services/contact.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  // tslint:disable-next-line: object-literal-sort-keys
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
public contact;
  // tslint:disable-next-line: no-empty
  constructor(private route: ActivatedRoute,
              public contServ: ContactService) { }

  public ngOnInit() {
const id = +this.route.snapshot.params.id;
this.contServ.getResource(this.contServ.host + "/contacts/" + id)
.subscribe((data) => {
  // tslint:disable-next-line: no-console
  this.contact = data;
});
  }

}
