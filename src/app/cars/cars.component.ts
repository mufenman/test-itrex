import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {LocalStorageUpdateService} from "../services/local-storage-update.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {


  constructor(
      private lsUpdate: LocalStorageUpdateService,
      private fb: FormBuilder
  ) { }

  @Output() refresh: EventEmitter<any> = new EventEmitter();
  public flightForm = this.fb.group({
    startdate: ['', Validators.required],
    enddate: ['', Validators.required],
    item1: ['', Validators.required],
    item2: ['', Validators.required],
  });

  public error: boolean = false;
  public success: boolean = false;


  ngOnInit() {

  }

  /***

   знаю что все повторяется и много чего можно вынести в отдельный сервис , но а если каждая форма начнет
   маштабироватся в своем, отдельном направлении

   */

  formSubmit(listName:string){
    if(this.flightForm.status === 'VALID'){
      let objSend = {
        start:`${this.flightForm.value.startdate.getDay()} - ${this.flightForm.value.startdate.getMonth()} - ${this.flightForm.value.startdate.getFullYear()}`,
        end: `${this.flightForm.value.enddate.getDay()} - ${this.flightForm.value.enddate.getMonth()} - ${this.flightForm.value.enddate.getFullYear()}`,
        item1: this.flightForm.value.item1,
        item2: this.flightForm.value.item2
      };
      this.lsUpdate.addNewItem(listName,objSend);
      this.flightForm.reset();
      this.success = true;
      setTimeout(()=>{
        this.success = false;
      },3000)
    }else{
      this.error = true;
      setTimeout(()=>{
        this.error = false;
      },3000)
    }
    this.refresh.emit();
  }
  resetMyForm(){
    this.flightForm.reset();
  }

}