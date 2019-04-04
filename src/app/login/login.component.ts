import { Component, OnInit } from '@angular/core';
import {SOAPHandlerService} from '../cordysServices/soap-handler.service';
import {MatCardModule} from '@angular/material/card';
import {AppRoutingModule} from '../app-routing.module';
import {Router} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;
  loginID:any;
  username:any;
  status:any;
  
 

  successlogin:any;
  ngOnInit() {
    this.route.navigate(['/login']);
  
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        
      });
  

  }
  get f() { return this.registerForm.controls; }

  constructor(private soapService:SOAPHandlerService,private route:Router,private formBuilder: FormBuilder ){
  }
  onSubmit() {
    
    this.submitted = true;
    console.log("The register form is "+this.registerForm.controls);
    console.log(this.registerForm.controls)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)')
}
checkValidUser(){
 
  this.soapService.UserDetailsFromCordys(this.registerForm.controls.username.value).subscribe(
     (response:any) =>{
      let tupleNodes = $.cordys.json.findObjects(response, 'RS_LMS_User_Details');
      console.log(tupleNodes);
      localStorage.setItem("username",this.registerForm.controls.username.value);
      if(tupleNodes.length<=0){
           alert("Invalid User Id");
           return;
      }
      this.status=tupleNodes[0].UD_STATUS;
      if(this.status=="false")
			{
        alert("User Id not Activated");
        return;
      }
      if(this.registerForm.controls.username.value=="" && this.registerForm.controls.password.value=="")
			{
			  alert("Username and password cannot be blank");
			  return;
      }
      this.route.navigate(['/portal']);
      
     },
     (err)=>{

    }
  )
}
 
}
