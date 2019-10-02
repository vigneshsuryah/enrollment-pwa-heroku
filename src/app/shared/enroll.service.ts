import {environment} from "../../environments/environment";
import {Observable} from "rxjs/index";
import {Enroll} from "./model/Enroll";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class EnrollService {

  constructor(private http: HttpClient) {
  }

  save(enroll: Enroll): Observable<any> {
    console.log('Try save enrollment details in database: ');
    console.log(enroll);

    return this.http.post(environment.main_api_url + "/api/enrollments", this.prepareEnroll(enroll));
  }

  /*save(enroll: Enroll): void {
    console.log('Try save enrollment details in database: ');
    console.log(enroll);

  this.http.post(environment.main_api_url + "/api/enrollments", this.prepareEnroll(enroll)).subscribe(
      () => {
        console.log('Enrollment details saved successfully!');
        alert('Enrollment details saved successfully!');
      },
      err => {
        console.log('Enrollment details saved successfully!');
        alert('Enrollment details saved successfully!');
        console.error('Failed, reason: ', err)
      }
    );
  }*/

  getAll(): Observable<Enroll[]> {
    return this.http.get<Enroll[]>(environment.main_api_url + "/api/enrollments");
  }

  private prepareEnroll(enroll: Enroll) {
    enroll.numberOfPhotos = enroll.photos.length;
    let enrollCopy = JSON.parse(JSON.stringify(enroll));
    enrollCopy.photos = [];
    return enrollCopy;
  }
}
