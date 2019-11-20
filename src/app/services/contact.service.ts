// tslint:disable-next-line: quotemark
import {HttpClient,HttpRequest,HttpEvent} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Contact} from '../Model/contact.model';

@Injectable({
  // tslint:disable-next-line: trailing-comma
  providedIn: "root"
})
export class ContactService {
  // tslint:disable-next-line: ban-types
  public host: String="http://localhost:8080";

  // tslint:disable-next-line: no-empty
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: no-empty
  public getResource(url): Observable<any> {
    return this.http.get(url);
  }

  public deleteResource(url) {
    return this.http.delete(url);
  }

  public postResource(url,data): Observable<Contact> {
    return this.http.post<Contact>(url,data);
  }

  public patchResource(url,data) {
    return this.http.patch(url,data);
  }

  uploadPhotoProduct(file: File,idContact): Observable<HttpEvent<{}>> {
    const formdata: FormData=new FormData();
    formdata.append('file',file);
    const req=new HttpRequest('POST',this.host+'/uploadPhoto/'+idContact,formdata,{
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
