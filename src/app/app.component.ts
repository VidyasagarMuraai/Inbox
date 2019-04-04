import { Component } from '@angular/core';
import {SOAPHandlerService} from './cordysServices/soap-handler.service';
import {LoginComponent} from './login/login.component'
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lms';
  loginID:any;
  password:any;
  successlogin:any;
  constructor(private soapService:SOAPHandlerService){
  }
  /*getAppComponent(){
    let id='1';
    this.soapService.UserDetailsFromCordys(id).subscribe(
      (response:any) =>{
        console.log("the total response is"+response);
        let tupleNodes = $.cordys.json.findObjects(response, 'USER_DETAILS');
        this.successlogin=tupleNodes[0].count_user;
        console.log("the response is"+this.successlogin);
      },
      (err)=>{

      }
    )
  
    

  }*/

}
