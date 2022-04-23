import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Restaurantdata } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.scss']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
restaurentModelObj: Restaurantdata =new Restaurantdata;
allRestarantData: any
  constructor(private fb: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })
    this.getAllData()
  }
// Now Subscribe our data which is maped
addResto(){
  this.restaurentModelObj.name = this.formValue.value.name;
  this.restaurentModelObj.email = this.formValue.value.email;
  this.restaurentModelObj.mobile = this.formValue.value.mobile;
  this.restaurentModelObj.address = this.formValue.value.address;
  this.restaurentModelObj.services = this.formValue.value.services;

  this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
    console.log(res);
    alert("Restaurent record Added Successful");
    //clear fill form data
    let ref = document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData();// when u post any data
  },
  err=>{
    alert("mistake");
  }
  )
}

//Get all Data
getAllData(){
  this.api.getRestaurant().subscribe(res=>{
    this.allRestarantData = res;
  })
}

//Delete Records
deleteResto(data:any){
  this.api.deleteRestaurant(data.id).subscribe(res=>{
    alert("Restauarnt record delete")
    this.getAllData();// Quick Refresh data
  })
}
onEditResto(data:any){
  this.restaurentModelObj.id = data.id
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
}
UpdateResto(){
  this.restaurentModelObj.name = this.formValue.value.name;
  this.restaurentModelObj.email = this.formValue.value.email;
  this.restaurentModelObj.mobile = this.formValue.value.mobile;
  this.restaurentModelObj.address = this.formValue.value.address;
  this.restaurentModelObj.services = this.formValue.value.services;

  this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
    alert("restaurent record updated")
    this.getAllData();// Quick Refresh data
    let ref = document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData();// when u post any data
  })
}
}
