import {Component,OnInit} from '@angular/core';
import {Contact} from '../Model/contact.model';
import {ContactService} from '../services/contact.service';
import {HttpEventType,HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  public contact: Contact={id: null,nom: "",adresse: "",email: "",telephone: "",photo: ""};
  mode=1;
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  public currentContact: Contact;
  currentTime: number;
  constructor(public contService: ContactService) {}

  ngOnInit() {
  }
  newContact() {
    this.contService.postResource(this.contService.host+"/contacts",this.contact)
      .subscribe(data => {
        this.currentContact=data;
        console.log(this.currentContact);
        this.uploadPhoto();
        this.mode=2;
      },err => {
        console.log(err);

      })
  }

  onSelectedFiles(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress=0;
    this.currentFileUpload=this.selectedFiles.item(0);
    this.contService.uploadPhotoProduct(this.currentFileUpload,this.currentContact.id).subscribe(event => {
      if(event.type===HttpEventType.UploadProgress) {
        this.progress=Math.round(100*event.loaded/event.total);
      } else if(event instanceof HttpResponse) {
        // console.log(this.router.url);
        // this.getProducts(this.currentRequest);
        // this.refreshUpdatedProduct();
        this.currentTime=Date.now();
      }
    },err => {
      alert('Problème de chargement');
    });
    this.selectedFiles=undefined;
  }

  nouveauContact() {
    this.contact={id: null,nom: "",adresse: "",email: "",telephone: "",photo: "unknown.png"};
    this.mode=1;
  }
}
