import {Component, OnInit} from '@angular/core';
import {Enroll} from "../../shared/model/Enroll";
import {EnrollService} from "../../shared/enroll.service";

@Component({
  selector: 'app-enroll-list',
  templateUrl: './enroll-list.component.html',
  styleUrls: ['./enroll-list.component.css']
})
export class EnrollListComponent implements OnInit {

  enrolls: Enroll[];

  constructor(private enrollService: EnrollService) {
  }

  ngOnInit() {
    this.enrollService.getAll().subscribe(res => {
      this.enrolls = res;
    })
  }

}
