import {Injectable} from '@angular/core';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {Enroll} from "./model/Enroll";
import {Observable} from "rxjs/index";

@Injectable()
export class EnrollCacheService {

  constructor(private localStorage: LocalStorage) {
  }

  save(enroll: Enroll): void {
    console.log('Try save enrollment details in cache: ');
    console.log(enroll);

    this.localStorage.setItem('enroll', enroll).subscribe(() => {
      console.log('Save successfully selected enrollment details in cache');
    });
  }

  get(): Observable<Enroll> {
    return this.localStorage.getItem<Enroll>('enroll');
  }

  clear(): void {
    this.localStorage.clear().subscribe(() => {
    });
  }
}
