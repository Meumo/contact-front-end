import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ContactService} from "../services/contact.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  // tslint:disable-next-line: object-literal-sort-keys
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  taille: number
  public page: number=0;
  size: number=5;
  public pages: Array<number>=[];
  public motCle: string="";
  public contacts;
  // tslint:disable-next-line: no-empty
  constructor(public contactService: ContactService,
    private router: Router) {}

  // tslint:disable-next-line: no-empty
  public ngOnInit() {
    this.getAllContacts();
  }
  public getAllContacts() {
    this.contactService.getResource(this.contactService.host+"/contacts?page="+this.page+"&size="+this.size)
      .subscribe((data) => {
        this.contacts=data;
        this.taille=data["page"].totalPages;
        // this.taille=(this.contacts.page.totalElements/this.size);
        // if(this.contacts.page.totalElements%this.size!=0)
        //   this.taille+=1;
        this.pages=new Array(this.taille);
      },(err) => {
        // tslint:disable-next-line: no-console
        console.log(err);

      });
  }
  public onDetails(id) {
    this.router.navigateByUrl("/details/"+id);
  }

  onModify(id) {
    this.router.navigateByUrl("/modify/"+id);
  }
  public onDelete(id) {
    let conf=confirm("Etes vous sure");
    if (conf) {
      this.contactService.deleteResource(this.contactService.host+"/contacts/"+id)
      .subscribe((data) => {
        this.ngOnInit();
      });
    }
  }
  onSearch(form: any) {
    this.page=0;
    this.motCle=form.mc;
    this.search();
  }
  search() {
    this.contactService.getResource(this.contactService.host+"/contacts/search/contactByKeyword?mc="+this.motCle+"&page="+this.page+"&size="+this.size)
      .subscribe(data => {
        this.contacts=data;
        this.motCle="";
      },err => {
        console.log(err);

      });
  }

  goToPage(i: number) {
    this.page=i;
    console.log(i);
    this.search();
  }
}
