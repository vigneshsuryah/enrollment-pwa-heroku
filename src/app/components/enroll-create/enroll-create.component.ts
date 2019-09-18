import {Component, OnInit, ViewChild} from '@angular/core';
import {Enroll} from "../../shared/model/Enroll";
import {EnrollCacheService} from "../../shared/enroll-cache.service";
import {InfoService} from "../../shared/info.service";
import {DictionaryItem} from "../../shared/model/DictionaryItem";
import {SwPush} from "@angular/service-worker";
import {PushNotificationService} from "../../shared/push-notification.service";
import {EnrollService} from "../../shared/enroll.service";
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-enroll-create',
  templateUrl: './enroll-create.component.html',
  styleUrls: ['./enroll-create.component.css']
})
export class EnrollCreateComponent implements OnInit {


  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  states: any[];
  plans: any[];
  enroll: Enroll = new Enroll();

  constructor(private enrollCacheService: EnrollCacheService,
              private enrollService: EnrollService,
              private infoService: InfoService,
              private swPush: SwPush,
              private pushNotificationService: PushNotificationService) {
  }

  ngOnInit() {
    this.infoService.getStates().subscribe((res) => {
      console.log(res);
      this.states = res.states.map(m => <DictionaryItem> {
        code: m,
        name: m
      });
    });

    this.infoService.getPlans().subscribe((res) => {
      console.log(res);
      this.plans = res.states.map(m => <DictionaryItem> {
        code: m,
        name: m
      });
    });

    this.enrollCacheService.get().subscribe((cachedEnroll) => {
      console.log('Retrieve data about enrolled from cache: ');
      console.log(JSON.stringify(cachedEnroll));

      if (cachedEnroll){
        this.enroll = cachedEnroll;
        this.signaturePad.fromDataURL(this.enroll.signature);
      }
    });
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', 500);
    this.signaturePad.set('canvasHeight', 80);
    this.signaturePad.clear();
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  signatureLoad(){
    this.enroll.signature = this.signaturePad.toDataURL();
    this.cacheForm();
  }
  signatureClear(){
    this.signaturePad.clear();
  }

  cacheForm() {
    this.enrollCacheService.save(this.enroll);
  }

  cachePhoto(event: any) {
    let photos = this.enroll.photos || [];
    let self = this;

    [].forEach.call(event.target.files, (file) => {
      let reader = new FileReader();

      reader.addEventListener("load", function () {
        photos.push({
          filename: file.name,
          content: this.result
        });
        self.cacheForm();
      });

      reader.readAsDataURL(file);
      console.log(photos);
    });
  }

  clearCache() {
    this.enrollCacheService.clear();
    this.enroll = new Enroll();
  }

  subscribeToNotifications() {
    this.pushNotificationService.addPushSubscriber();
  }

  sendNotificationToAll() {
    this.pushNotificationService.send();
  }

  save() {
    this.cacheForm();
    this.enrollService.save(this.enroll);
  }
}
