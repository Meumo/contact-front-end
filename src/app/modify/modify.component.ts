import {Component,OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../services/contact.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Contact} from '../Model/contact.model';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  public currentContact;
  selectedFiles: any;
  progress: number;
  currentFileUpload: any;
  currentTime: number;

  constructor(private route: ActivatedRoute,
    public contactService: ContactService,
    private router:Router) {}

  ngOnInit() {
    let id=+this.route.snapshot.params.id;
    console.log(id);
    this.contactService.getResource(this.contactService.host+"/contacts/"+id)
      .subscribe(data => {
        console.log(data);
        this.currentContact=data;
        this.uploadPhoto();
      },err => {
        console.log(err);
      });
  }
  onSelectedFiles(event){
    this.selectedFiles=event.target.files;
      }
      uploadPhoto() {
        this.progress = 0;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.contactService.uploadPhotoProduct(this.currentFileUpload, this.currentContact.id).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            // console.log(this.router.url);
            // this.getProducts(this.currentRequest);
            // this.refreshUpdatedProduct();
            this.currentTime = Date.now();
          }
        }, err => {
          alert('Problème de chargement');
        });
        this.selectedFiles = undefined;
      }


  onMofify(data) {
    const url = this.currentContact._links.self.href;
    this.contactService.patchResource(url,data)
      .subscribe(data => {
        console.log(data);
        this.uploadPhoto();
this.router.navigateByUrl("/contact");
      },err => {
        console.log(err);

      });
  }
}
