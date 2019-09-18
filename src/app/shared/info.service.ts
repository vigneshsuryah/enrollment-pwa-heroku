import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/index";

@Injectable()
export class InfoService {

  constructor(private http: HttpClient) {
  }

  getStates(): Observable<any> {
    return this.http.get(environment.main_api_url + '/api/states');
  }

  getPlans(): Observable<any> {
    return this.http.get(environment.main_api_url + '/api/plans');
  }

}
